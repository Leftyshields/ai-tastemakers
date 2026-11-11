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

const clipRight = wrapRect.right;
let peeking = false;
for (const pill of nav.querySelectorAll("a")) {
  const r = pill.getBoundingClientRect();
  if (r.right > clipRight + 2 && r.left < clipRight - 4) {
    peeking = true;
    break;
  }
}

const fadeVisible =
  fadeWidth >= 24 && fadeAfter.opacity !== "0" && fadeAfter.content !== "none";

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
