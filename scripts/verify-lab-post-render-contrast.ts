/**
 * Lab post + index render gate: WCAG AA contrast on key elements and panel chrome
 * (Back border, dark shell background) at desktop and 390 in light and dark.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import { listLabWriteupPostIds } from "./lab/lab-format.js";
import { findBuiltStylesheet, readStylesheetHrefFromHtml } from "./site-css-path.js";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const MIN_RATIO = 4.5;
const VIEWPORTS = [
  { label: "desktop", width: 1280, height: 900 },
  { label: "390", width: 390, height: 844 },
] as const;

const CHECK_JS = `
(function(minRatio) {
  function parseRgbString(css) {
    var m = css.match(/rgba?\\(([^)]+)\\)/);
    if (!m) return null;
    var parts = m[1].split(",").map(function(p) { return p.trim(); });
    if (parts.length < 3) return null;
    return {
      r: Number(parts[0]) / 255,
      g: Number(parts[1]) / 255,
      b: Number(parts[2]) / 255,
      a: parts[3] != null ? Number(parts[3]) : 1
    };
  }
  function oklchToRgb(L, C, h) {
    var hr = (h * Math.PI) / 180;
    var a = C * Math.cos(hr);
    var b = C * Math.sin(hr);
    var l_ = L + 0.3963377774 * a + 0.2158037573 * b;
    var m_ = L - 0.1055613458 * a - 0.0638541728 * b;
    var s_ = L - 0.0894841775 * a - 1.291485548 * b;
    var l = l_ * l_ * l_;
    var m = m_ * m_ * m_;
    var s = s_ * s_ * s_;
    var r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
    var g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
    var b2 = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;
    function toSrgb(c) {
      return c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
    }
    return {
      r: Math.min(1, Math.max(0, toSrgb(r))),
      g: Math.min(1, Math.max(0, toSrgb(g))),
      b: Math.min(1, Math.max(0, toSrgb(b2))),
      a: 1
    };
  }
  function oklabToRgb(L, a, b) {
    var l_ = L + 0.3963377774 * a + 0.2158037573 * b;
    var m_ = L - 0.1055613458 * a - 0.0638541728 * b;
    var s_ = L - 0.0894841775 * a - 1.291485548 * b;
    var l = l_ * l_ * l_;
    var m = m_ * m_ * m_;
    var s = s_ * s_ * s_;
    var r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
    var g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
    var b2 = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;
    function toSrgb(c) {
      return c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
    }
    return {
      r: Math.min(1, Math.max(0, toSrgb(r))),
      g: Math.min(1, Math.max(0, toSrgb(g))),
      b: Math.min(1, Math.max(0, toSrgb(b2))),
      a: 1
    };
  }
  function cssToRgb(css) {
    if (!css || css === "transparent") return null;
    var rgb = parseRgbString(css);
    if (rgb) return rgb;
    var oklab = css.match(/oklab\\(\\s*([\\d.]+)\\s+([-\\d.]+)\\s+([-\\d.]+)/i);
    if (oklab) return oklabToRgb(Number(oklab[1]), Number(oklab[2]), Number(oklab[3]));
    var ok = css.match(/oklch\\(\\s*([\\d.]+)\\s+([\\d.]+)\\s+([\\d.]+)/i);
    if (ok) return oklchToRgb(Number(ok[1]), Number(ok[2]), Number(ok[3]));
    return null;
  }
  function relativeLuminance(c) {
    function lin(x) {
      return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
    }
    return 0.2126 * lin(c.r) + 0.7152 * lin(c.g) + 0.0722 * lin(c.b);
  }
  function contrastRatio(fg, bg) {
    var l1 = relativeLuminance(fg);
    var l2 = relativeLuminance(bg);
    var lighter = Math.max(l1, l2);
    var darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
  }
  function effectiveBackground(el) {
    var node = el;
    while (node) {
      var c = cssToRgb(getComputedStyle(node).backgroundColor);
      if (c && c.a >= 0.99) return c;
      if (c && c.a > 0.01) return c;
      node = node.parentElement;
    }
    return { r: 1, g: 1, b: 1, a: 1 };
  }
  function checkContrast(el, label, optional) {
    if (!el) return optional ? [] : [label + " missing"];
    var cs = getComputedStyle(el);
    var fg = cssToRgb(cs.color);
    if (!fg) return [label + " fg unparsed (" + cs.color + ")"];
    var bg = effectiveBackground(el);
    var ratio = contrastRatio({ r: fg.r, g: fg.g, b: fg.b, a: 1 }, bg);
    if (ratio < minRatio) {
      return [label + " " + ratio.toFixed(2) + ":1 (fg " + cs.color + ")"];
    }
    return [];
  }
  var failures = [];
  var isPost = !!document.querySelector(".lab-post-panel");
  if (isPost) {
    var back = document.getElementById("lab-post-back-btn");
    if (back) {
      var bcs = getComputedStyle(back);
      if (parseFloat(bcs.borderTopWidth) < 0.5 || bcs.borderTopStyle === "none") {
        failures.push("Back button missing panel border (stale CSS?)");
      }
    } else {
      failures.push("Back button missing");
    }
    var shell = document.querySelector(".lab-post-shell");
    if (document.documentElement.classList.contains("dark") && shell) {
      var shellBg = cssToRgb(getComputedStyle(shell).backgroundColor);
      if (shellBg && relativeLuminance(shellBg) > 0.35) {
        failures.push("lab-post-shell background too light in dark mode (" + getComputedStyle(shell).backgroundColor + ")");
      }
    }
    failures = failures.concat(checkContrast(document.querySelector(".lab-post-panel__title"), "h1", false));
    failures = failures.concat(checkContrast(document.querySelector(".lab-post-back-btn__text"), "Back", false));
    failures = failures.concat(checkContrast(document.querySelector(".lab-post-panel__status-text"), "status", false));
    failures = failures.concat(checkContrast(document.querySelector(".lab-post-panel__lead"), "lead", false));
    var h2 = document.querySelector(".lab-content h2, .lab-main h2");
    failures = failures.concat(checkContrast(h2, "h2", true));
    var td = document.querySelector(".lab-content table td, .lab-main table td");
    failures = failures.concat(checkContrast(td, "table cell", true));
  } else {
    failures = failures.concat(checkContrast(document.querySelector("header h1"), "h1", false));
    var lead = document.querySelector(".lab-intro article p, .lab-intro .brief-content p");
    failures = failures.concat(checkContrast(lead, "lead", false));
    var td = document.querySelector(".lab-table td");
    failures = failures.concat(checkContrast(td, "table cell", true));
  }
  return failures;
})
`;

function labPages(): string[] {
  const posts = listLabWriteupPostIds(repoRoot)
    .filter((id) => id.startsWith("EXP-"))
    .map((id) => path.join("site/lab/posts", `${id}.html`));
  return ["site/lab/index.html", ...posts];
}

async function main(): Promise<void> {
  const assetsDir = path.join(repoRoot, "site/assets");
  findBuiltStylesheet(assetsDir);

  const samplePost = path.join(repoRoot, "site/lab/posts/EXP-20260716-firecrawl-enrich-skills.html");
  if (fs.existsSync(samplePost)) {
    const href = readStylesheetHrefFromHtml(fs.readFileSync(samplePost, "utf8"));
    if (!href || !href.includes("style.") || !href.endsWith(".css")) {
      console.error("verify: lab post render contrast — stylesheet href is not content-hashed:", href);
      process.exit(1);
    }
  }

  const browser = await chromium.launch();
  const allFailures: string[] = [];

  for (const rel of labPages()) {
    const abs = path.join(repoRoot, rel);
    if (!fs.existsSync(abs)) {
      console.error(`missing ${rel} (run npm run build:pages first)`);
      process.exit(1);
    }
    const fileUrl = `file://${abs}`;
    for (const vp of VIEWPORTS) {
      for (const mode of ["light", "dark"] as const) {
        const page = await browser.newPage({
          viewport: { width: vp.width, height: vp.height },
          colorScheme: mode,
        });
        await page.goto(fileUrl, { waitUntil: "networkidle" });
        await page.evaluate((dark) => {
          document.documentElement.classList.toggle("dark", dark);
        }, mode === "dark");
        const failures = (await page.evaluate(`${CHECK_JS}(${MIN_RATIO})`)) as string[];
        for (const f of failures) {
          allFailures.push(`[${rel} ${vp.label} ${mode}] ${f}`);
        }
        await page.close();
      }
    }
  }

  await browser.close();

  if (allFailures.length > 0) {
    console.error("verify: lab post render contrast failed:");
    for (const f of allFailures.slice(0, 50)) console.error(`  ${f}`);
    if (allFailures.length > 50) console.error(`  …and ${allFailures.length - 50} more`);
    process.exit(1);
  }
  console.log(
    `verify: lab post render contrast ok (${labPages().length} pages × ${VIEWPORTS.length} viewports × light/dark)`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
