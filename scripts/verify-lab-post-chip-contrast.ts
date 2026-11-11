/**
 * UX47: WCAG contrast on Lab post split chip (repo link + Lab tested pill) in light and dark.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const MIN_RATIO = 4.5;

const FIRECRAWL_POST = path.join(
  repoRoot,
  "site/lab/posts/EXP-20260716-firecrawl-enrich-skills.html",
);

const CHIP_CONTRAST_JS = `
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
  function checkEl(el, label) {
    if (!el) return [label + " missing"];
    var target = el;
    var cs = getComputedStyle(target);
    var fg = cssToRgb(cs.color);
    if (!fg) {
      var textEl = el.querySelector(".lab-tested-badge__text") || el;
      cs = getComputedStyle(textEl);
      fg = cssToRgb(cs.color);
      target = textEl;
    }
    if (!fg) return [label + " fg unparsed (" + cs.color + ")"];
    var bg = effectiveBackground(el);
    var ratio = contrastRatio({ r: fg.r, g: fg.g, b: fg.b, a: 1 }, bg);
    if (ratio < minRatio) {
      return [label + " " + ratio.toFixed(2) + ":1 (fg " + cs.color + ", bg " + getComputedStyle(el).backgroundColor + ")"];
    }
    return [];
  }
  var failures = [];
  failures = failures.concat(checkEl(document.querySelector(".lab-post-split-chip__repo"), "repo chip"));
  failures = failures.concat(checkEl(document.querySelector(".lab-post-split-chip__pill"), "Lab tested pill"));
  return failures;
})
`;

async function main(): Promise<void> {
  if (!fs.existsSync(FIRECRAWL_POST)) {
    console.error(`missing ${FIRECRAWL_POST} (run npm run build:pages first)`);
    process.exit(1);
  }

  const browser = await chromium.launch();
  const allFailures: string[] = [];

  for (const mode of ["light", "dark"] as const) {
    const page = await browser.newPage({
      viewport: { width: 1280, height: 900 },
      colorScheme: mode,
    });
    await page.goto(`file://${FIRECRAWL_POST}`, { waitUntil: "networkidle" });
    await page.evaluate((dark) => {
      document.documentElement.classList.toggle("dark", dark);
    }, mode === "dark");
    const failures = (await page.evaluate(`${CHIP_CONTRAST_JS}(${MIN_RATIO})`)) as string[];
    for (const f of failures) allFailures.push(`[firecrawl ${mode}] ${f}`);
    await page.close();
  }

  await browser.close();

  if (allFailures.length > 0) {
    console.error("verify: lab post chip contrast failed (need 4.5:1):");
    for (const f of allFailures) console.error(`  ${f}`);
    process.exit(1);
  }
  console.log("verify: lab post chip contrast ok (light and dark)");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
