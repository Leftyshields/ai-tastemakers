import { describe, it, expect } from "vitest";
import { labNavHtml, labSitePaths, renderShadowCompareBody } from "../../../scripts/edition-pages.js";

describe("lab site paths", () => {
  it("depth 0 resolves assets from lab/", () => {
    const paths = labSitePaths(0);
    expect(paths.css).toBe("../assets/style.css");
    expect(paths.home).toBe("../");
    expect(paths.subscribe).toBe("../subscribe.html");
  });

  it("depth 1 resolves assets from lab/posts/", () => {
    const paths = labSitePaths(1);
    expect(paths.css).toBe("../../assets/style.css");
    expect(paths.home).toBe("../../");
    expect(paths.subscribe).toBe("../../subscribe.html");
    expect(paths.lab).toBe("../");
  });

  it("labNavHtml at depth 1 links to parent lab pages", () => {
    const html = labNavHtml("posts", (t) => t, 1);
    expect(html).toContain('href="../"');
    expect(html).toContain('href="../tools.html"');
    expect(html).toContain('href="../experiments.html"');
    expect(html).toContain('aria-current="page"');
  });
});

describe("shadow compare view", () => {
  it("renders side-by-side columns when control and treatment exist", () => {
    const html = renderShadowCompareBody(
      {
        run_id: "run-1",
        date: "2026-06-28",
        edition: "skills",
        enrich_web_requested: true,
        generated_at: "2026-06-28T00:00:00.000Z",
        ranking_mode: "delta_7d",
        repos: [
          {
            rank: 1,
            full_name: "acme/one",
            html_url: "https://github.com/acme/one",
            brief_control: "**What it does:** control",
            brief_treatment: "**What it does:** treatment",
          },
        ],
      },
      (t) => t,
    );

    expect(html).toContain("Control (README only)");
    expect(html).toContain("Treatment (README + web/HN)");
    expect(html).toContain("control");
    expect(html).toContain("treatment");
    expect(html).toContain("../shadow-rubric.html");
  });

  it("shows legacy notice when enrich was requested but only brief exists", () => {
    const html = renderShadowCompareBody(
      {
        run_id: "run-legacy",
        date: "2026-06-28",
        edition: "skills",
        enrich_web_requested: true,
        generated_at: "2026-06-28T00:00:00.000Z",
        ranking_mode: "delta_7d",
        repos: [
          {
            rank: 1,
            full_name: "acme/one",
            html_url: "https://github.com/acme/one",
            brief: "**What it does:** legacy only",
          },
        ],
      },
      (t) => t,
    );

    expect(html).toContain("predates side-by-side shadow output");
    expect(html).toContain("legacy only");
  });
});
