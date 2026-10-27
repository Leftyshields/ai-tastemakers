/**
 * Lab combined header nav at 390px: horizontal scroll, visible edge fade, tab peek.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const labIndex = path.join(repoRoot, "site/lab/index.html");

async function main(): Promise<void> {
  if (!fs.existsSync(labIndex)) {
    console.error("missing site/lab/index.html");
    process.exit(1);
  }

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 800 } });
  await page.goto(`file://${labIndex}`, { waitUntil: "networkidle" });

  const layout = await page.evaluate(() => {
    const wrap = document.querySelector(".lab-nav-scroll-wrap");
    const nav = document.querySelector(".lab-nav--combined");
    const skills = nav?.querySelector('a[href*="skills"]');
    if (!wrap || !nav || !skills) {
      return { ok: false, reason: "missing lab mobile nav nodes" };
    }

    const wrapRect = wrap.getBoundingClientRect();
    const fadeAfter = getComputedStyle(wrap, "::after");
    const fadeWidth = parseFloat(fadeAfter.width) || 0;

    const scrollable = nav.scrollWidth > nav.clientWidth + 2;
    nav.scrollLeft = 0;
    nav.setAttribute("data-scroll-end", "false");

    const pills = nav.querySelectorAll("a");
    let peeking = false;
    const clipRight = wrapRect.right;
    for (const pill of pills) {
      const r = pill.getBoundingClientRect();
      if (r.right > clipRight + 2 && r.left < clipRight - 4) {
        peeking = true;
        break;
      }
    }

    const fadeVisible =
      fadeWidth >= 24 &&
      fadeAfter.opacity !== "0" &&
      fadeAfter.content !== "none";

    nav.scrollLeft = nav.scrollWidth;
    nav.dispatchEvent(new Event("scroll"));
    const skillsAfterScroll = skills.getBoundingClientRect();
    const skillsVisible =
      skillsAfterScroll.right <= window.innerWidth + 1 &&
      skillsAfterScroll.left >= wrapRect.left - 1;

    return {
      ok: scrollable && fadeVisible && peeking && skillsVisible,
      wrapWidth: wrapRect.width,
      fadeWidth,
      fadeVisible,
      peeking,
      navScrollWidth: nav.scrollWidth,
      navClientWidth: nav.clientWidth,
      skillsVisible,
      scrollable,
    };
  });

  await browser.close();

  if (!layout.ok) {
    console.error("verify: lab header mobile nav failed at 390px:", layout);
    process.exit(1);
  }
  console.log(
    "verify: lab header mobile nav ok (390px scroll, fade, peek, Skills reachable)",
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
