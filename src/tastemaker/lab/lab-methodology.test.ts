import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  buildLabPublicFile,
  renderLabDashboardHtml,
} from "../../../scripts/lab/build-lab-public.js";
import { labAboutRedirectScript } from "../../../scripts/lab/lab-about-redirect.js";
import { labNavHtml, labSitePaths, pageShell, renderLabHomeIntroBlock } from "../../../scripts/edition-pages.js";
import { prepareLabProseHtmlFromMarkdown } from "../../../scripts/lab/lab-format.js";
import { applyLabIntroVonRestorff } from "../../../scripts/lab/lab-loop-strip.js";
import { seoPage } from "../../../scripts/seo-copy.js";
import { LAB_HOME_LEGACY_INTRO_TEXT } from "../../../scripts/lab/lab-home-copy.js";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");

function escapeHtml(t: string): string {
  return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

describe("Lab methodology layout (round 7 revised)", () => {
  it("keeps dashboard layout without experiment registry section", () => {
    const pub = buildLabPublicFile(repoRoot, "2026-10-19");
    const html = renderLabDashboardHtml(pub, escapeHtml, { asOfIsoDate: "2026-10-19" });
    expect(html).not.toContain('id="lab-experiment-registry"');
    const panelIdx = html.indexOf('id="lab-control-panel"');
    const timelineIdx = html.indexOf('id="lab-timeline"');
    expect(panelIdx).toBeGreaterThan(-1);
    expect(panelIdx).toBeLessThan(timelineIdx);
  });

  it("Lab nav exposes Methodology instead of About", () => {
    const nav = labNavHtml("home", escapeHtml);
    expect(nav).toContain("Methodology");
    expect(nav).toContain("methodology.html");
    expect(nav).not.toContain(">About<");
    expect(nav).not.toContain("about.html");
  });

  it("places How experiments work link after the loop strip with PostHog section", () => {
    const article = applyLabIntroVonRestorff(
      prepareLabProseHtmlFromMarkdown(fs.readFileSync(path.join(repoRoot, "briefings/lab/index.md"), "utf8")),
    );
    const block = renderLabHomeIntroBlock(article, "<nav>loop</nav>", "2026-10-19", escapeHtml);
    const loopEnd = block.indexOf("</nav>") + "</nav>".length;
    const methodologyPos = block.indexOf('href="methodology.html"');
    expect(loopEnd).toBeGreaterThan(-1);
    expect(methodologyPos).toBeGreaterThan(loopEnd);
    expect(block).toContain("lab-experiments-how");
    expect(block).toContain("How experiments work");
    expect(block).toContain('data-lab-section="about"');
    expect(block).toContain("evaluates them");
    expect(block).toContain("almost automatically");
  });

  it("Lab home SEO copy includes hero lead and social title", () => {
    const copy = seoPage("lab_index");
    expect(copy.title).toBe("Tastemakers Lab: Real AI Tool Tests, Including the Misses");
    expect(copy.lead).toContain("earn their keep");
    expect(LAB_HOME_LEGACY_INTRO_TEXT).toContain("evaluates them");
    const html = pageShell(
      copy.title ?? "Lab",
      labNavHtml("home", escapeHtml),
      labSitePaths(),
      { name: "Tastemakers Lab", tagline: "Public notes subtitle fixture" },
      copy.description,
      escapeHtml,
      {
        labLayout: true,
        labHomePage: true,
        documentH1: copy.h1,
        documentH1Visible: true,
        documentH1Lead: copy.lead,
        seo: {
          siteBaseUrl: "https://leftyshields.github.io/ai-tastemakers",
          canonicalPath: "lab/",
          ogImageUrl: "https://leftyshields.github.io/ai-tastemakers/og.png",
        },
      },
    );
    expect(html).toContain("<h1");
    expect(html.indexOf("</h1>")).toBeLessThan(html.indexOf("earn their keep"));
    expect(html).toContain('class="lab-home-lead"');
    expect(html).not.toMatch(/lab-home-lead[^"]*text-sm/);
    expect(html).not.toContain("Public notes subtitle fixture");
    expect(html).not.toMatch(/site-brand[\s\S]*Tastemakers Lab/);
    expect(html).toContain('property="og:title" content="Tastemakers Lab: Real AI Tool Tests, Including the Misses"');
    expect(html).toContain('name="twitter:title" content="Tastemakers Lab: Real AI Tool Tests, Including the Misses"');
    expect(html).toContain(
      'property="og:image:alt" content="Tastemakers Lab: Real AI Tool Tests, Including the Misses"',
    );
  });

  it("Methodology source page keeps the GitHub repo link", () => {
    const md = fs.readFileSync(path.join(repoRoot, "briefings/lab/about.md"), "utf8");
    const html = prepareLabProseHtmlFromMarkdown(md);
    expect(html).toContain("https://github.com/Leftyshields/ai-tastemakers");
  });

  it("about redirect script preserves hash fragments with meta refresh fallback path", () => {
    const script = labAboutRedirectScript();
    expect(script).toContain("methodology.html");
    expect(script).toContain("location.hash");
    expect(script).toContain("location.replace");
  });

  it("methodology page shell includes canonical URL when site base is set", () => {
    const html = pageShell(
      "Methodology · Tastemakers",
      "<p>x</p>",
      labSitePaths(),
      { name: "Tastemakers", tagline: "Lab" },
      undefined,
      escapeHtml,
      {
        labLayout: true,
        seo: { siteBaseUrl: "https://leftyshields.github.io/ai-tastemakers", canonicalPath: "lab/methodology.html" },
      },
    );
    expect(html).toContain('rel="canonical"');
    expect(html).toContain("https://leftyshields.github.io/ai-tastemakers/lab/methodology.html");
  });
});
