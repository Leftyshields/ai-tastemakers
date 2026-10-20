/**
 * UX24: Lab index contrast check in explicit light and dark (html.dark class).
 * Requires built site/lab/index.html and Playwright Chromium.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const LAB_PAGES = ["site/lab/index.html", "site/lab/methodology.html"];
const MIN_RATIO = 4.5;

const CONTRAST_CHECK_JS = `
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
  function cssToRgb(css) {
    if (!css || css === "transparent") return null;
    var rgb = parseRgbString(css);
    if (rgb) return rgb;
    var ok = css.match(/oklch\\(\\s*([\\d.]+)\\s+([\\d.]+)\\s+([\\d.]+)/i);
    if (ok) return oklchToRgb(Number(ok[1]), Number(ok[2]), Number(ok[3]));
    return null;
  }
  function blend(fg, bg) {
    var a = fg.a + bg.a * (1 - fg.a);
    if (a <= 0) return { r: 0, g: 0, b: 0, a: 1 };
    return {
      r: (fg.r * fg.a + bg.r * bg.a * (1 - fg.a)) / a,
      g: (fg.g * fg.a + bg.g * bg.a * (1 - fg.a)) / a,
      b: (fg.b * fg.a + bg.b * bg.a * (1 - fg.a)) / a,
      a: a
    };
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
      if (c && c.a > 0) return c;
      node = node.parentElement;
    }
    return { r: 1, g: 1, b: 1, a: 1 };
  }
  var root = document.querySelector(".lab-main");
  if (!root) return ["missing .lab-main"];
  var failures = [];
  var seen = {};
  var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  var node = walker.nextNode();
  while (node) {
    var raw = (node.textContent || "").replace(/\\s+/g, " ").trim();
    if (raw.length > 0) {
      var el = node.parentElement;
      if (el) {
        var cs = getComputedStyle(el);
        var rect = el.getBoundingClientRect();
        if (rect.width >= 1 && rect.height >= 1 && cs.display !== "none" && cs.visibility !== "hidden" && Number(cs.opacity) > 0) {
          var tag = el.tagName.toLowerCase();
          if (tag !== "script" && tag !== "style") {
            var fg = cssToRgb(cs.color);
            if (fg) {
              var bg = effectiveBackground(el);
              var ratio = contrastRatio({ r: fg.r, g: fg.g, b: fg.b, a: 1 }, bg);
              var label = raw.length > 80 ? raw.slice(0, 77) + "…" : raw;
              var key = label + "|" + cs.color;
              if (!seen[key] && ratio < minRatio) {
                seen[key] = true;
                failures.push(ratio.toFixed(2) + ':1 "' + label + '" (' + cs.fontSize + ", fg " + cs.color + ")");
              }
            }
          }
        }
      }
    }
    node = walker.nextNode();
  }
  return failures;
})
`;

async function main(): Promise<void> {
  const browser = await chromium.launch();
  const allFailures: string[] = [];

  for (const rel of LAB_PAGES) {
    const labHtml = path.join(repoRoot, rel);
    if (!fs.existsSync(labHtml)) {
      console.error(`missing ${rel} (run npm run build:pages first)`);
      process.exit(1);
    }
    const fileUrl = `file://${labHtml}`;
    for (const mode of ["light", "dark"] as const) {
      const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
      await page.goto(fileUrl, { waitUntil: "networkidle" });
      await page.evaluate((dark) => {
        document.documentElement.classList.toggle("dark", dark);
      }, mode === "dark");
      const failures = (await page.evaluate(
        `${CONTRAST_CHECK_JS}(${MIN_RATIO})`,
      )) as string[];
      for (const f of failures) allFailures.push(`[${rel} ${mode}] ${f}`);
      await page.close();
    }
  }

  await browser.close();

  if (allFailures.length > 0) {
    console.error("verify: lab color contrast failed (need 4.5:1):");
    for (const f of allFailures.slice(0, 40)) console.error(`  ${f}`);
    if (allFailures.length > 40) console.error(`  …and ${allFailures.length - 40} more`);
    process.exit(1);
  }
  console.log("verify: lab color contrast ok (light and dark)");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
