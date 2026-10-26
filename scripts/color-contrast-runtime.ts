/** Shared in-page contrast audit (4.5:1) for Playwright verify scripts. */
export const CONTRAST_CHECK_JS = `
(function(minRatio, rootSelector) {
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
      if (c && c.a > 0) return c;
      node = node.parentElement;
    }
    return { r: 1, g: 1, b: 1, a: 1 };
  }
  var root = document.querySelector(rootSelector);
  if (!root) return ["missing " + rootSelector];
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

/** Dark-mode active home index tab: no light pill fill; label vs effective bg >= minRatio. */
export const HOME_INDEX_ACTIVE_TAB_DARK_JS = `
(function(minRatio, tabSelectorArg) {
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
      if (c && c.a > 0) return c;
      node = node.parentElement;
    }
    return { r: 1, g: 1, b: 1, a: 1 };
  }
  if (!document.documentElement.classList.contains("dark")) return [];
  var tab = null;
  if (tabSelectorArg === "__lab_visible__") {
    var candidates = document.querySelectorAll(".lab-nav a[aria-current=\\"page\\"]");
    for (var i = 0; i < candidates.length; i++) {
      if (candidates[i].offsetParent !== null) {
        tab = candidates[i];
        break;
      }
    }
    if (!tab && candidates.length) tab = candidates[0];
    if (!tab) return ["missing visible lab nav active tab"];
  } else {
    var tabSelector =
      typeof tabSelectorArg === "string" && tabSelectorArg
        ? tabSelectorArg
        : ".home-index-edition-nav a[aria-current=\\"page\\"]";
    tab = document.querySelector(tabSelector);
    if (!tab) return ["missing active tab: " + tabSelector];
  }
  var cs = getComputedStyle(tab);
  var bgCss = cs.backgroundColor;
  var bgDirect = cssToRgb(bgCss);
  if (bgDirect && bgDirect.a > 0.08 && relativeLuminance(bgDirect) > 0.75) {
    return [
      "active tab light fill in dark mode (computed bg " +
        bgCss +
        ", luminance " +
        relativeLuminance(bgDirect).toFixed(3) +
        ")"
    ];
  }
  var fg = cssToRgb(cs.color);
  if (!fg) return ["active tab foreground not parseable: " + cs.color];
  var bg = effectiveBackground(tab);
  var ratio = contrastRatio(fg, bg);
  if (ratio < minRatio) {
    return [
      "active tab contrast " +
        ratio.toFixed(2) +
        ":1 (fg " +
        cs.color +
        ", effective bg from ancestor)"
    ];
  }
  return [];
})
`;
