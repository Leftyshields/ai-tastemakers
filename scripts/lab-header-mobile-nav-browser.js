const hasRightPeek = (nav, clipRight) => {
  for (const pill of nav.querySelectorAll("a")) {
    const r = pill.getBoundingClientRect();
    if (r.right > clipRight + 2 && r.left < clipRight - 4) return true;
  }
  return false;
};

const hasLeftLabPeek = (nav, clipLeft, divider) => {
  for (const pill of nav.querySelectorAll("a")) {
    if (divider.compareDocumentPosition(pill) & 4) {
      continue;
    }
    const r = pill.getBoundingClientRect();
    if (r.left < clipLeft - 2 && r.right > clipLeft + 4) return true;
  }
  return false;
};

const wrap = document.querySelector(".lab-nav-scroll-wrap");
const nav = document.querySelector(".lab-nav--combined");
const skills = nav?.querySelector('a[href*="skills"]');
const divider = nav?.querySelector(".lab-nav__divider");
if (!wrap || !nav || !skills || !divider) {
  return { ok: false, reason: "missing lab mobile nav nodes" };
}

const wrapRect = wrap.getBoundingClientRect();
const fadeAfter = getComputedStyle(wrap, "::after");
const fadeWidth = parseFloat(fadeAfter.width) || 0;

const scrollable = nav.scrollWidth > nav.clientWidth + 2;
nav.scrollLeft = 0;
nav.setAttribute("data-scroll-end", "false");
nav.setAttribute("data-scroll-start", "true");

const rightPeeking = hasRightPeek(nav, wrapRect.right);
const fadeVisible =
  fadeWidth >= 24 && fadeAfter.opacity !== "0" && fadeAfter.content !== "none";
const leftFadeHidden = parseFloat(getComputedStyle(wrap, "::before").opacity) < 0.01;

nav.scrollLeft = nav.scrollWidth;
nav.dispatchEvent(new Event("scroll"));
const skillsAfterScroll = skills.getBoundingClientRect();
const skillsVisible =
  skillsAfterScroll.right <= window.innerWidth + 1 &&
  skillsAfterScroll.left >= wrapRect.left - 1;

const labHome = {
  ok: scrollable && fadeVisible && rightPeeking && skillsVisible && leftFadeHidden,
  rightPeeking,
  leftFadeHidden,
  skillsVisible,
  scrollable,
};

const measureEdition = (scenario) => {
  nav.scrollLeft = 0;
  nav.setAttribute("data-scroll-start", "true");
  nav.setAttribute("data-scroll-end", "false");
  const hrefByTarget = {
    ai: "../",
    skills: "../skills/",
  };
  const want = hrefByTarget[scenario];
  nav.querySelectorAll("a").forEach((a) => {
    a.removeAttribute("aria-current");
    a.classList.remove("lab-nav-pill--active", "font-semibold");
    for (const c of idle.split(" ")) a.classList.add(c);
  });
  const active = nav.querySelector(`a[href="${want}"]`);
  if (!active) {
    return { ok: false, reason: "missing edition pill" };
  }
  for (const c of idle.split(" ")) active.classList.remove(...idle.split(" "));
  active.classList.add("lab-nav-pill--active", "font-semibold");
  active.setAttribute("aria-current", "page");

  const leftPeekInset = 28;
  nav.style.setProperty("scroll-snap-type", "none");
  nav.scrollLeft = Math.max(0, active.offsetLeft - leftPeekInset);
  let guard = 0;
  while (nav.scrollLeft > 0 && guard++ < 24 && !hasLeftLabPeek(nav, wrapRect.left, divider)) {
    nav.scrollLeft = Math.max(0, nav.scrollLeft - 2);
  }
  const atEnd = nav.scrollWidth - nav.scrollLeft - nav.clientWidth < 4;
  const atStart = nav.scrollLeft < 4;
  nav.setAttribute("data-scroll-end", atEnd ? "true" : "false");
  nav.setAttribute("data-scroll-start", atStart ? "true" : "false");
  nav.dispatchEvent(new Event("scroll"));

  const fadeBefore = getComputedStyle(wrap, "::before");
  const leftFadeWidth = parseFloat(fadeBefore.width) || 0;
  const leftFadeVisible =
    leftFadeWidth >= 24 &&
    parseFloat(fadeBefore.opacity) > 0.01 &&
    fadeBefore.content !== "none";

  const leftPeeking = hasLeftLabPeek(nav, wrapRect.left, divider);
  const activeRect = active.getBoundingClientRect();
  const activeNotClipped =
    activeRect.left >= wrapRect.left - 1 && activeRect.right <= wrapRect.right + 1;

  return {
    ok:
      leftFadeVisible &&
      leftPeeking &&
      activeNotClipped &&
      nav.getAttribute("data-scroll-start") === "false",
    leftFadeVisible,
    leftPeeking,
    activeNotClipped,
    scrollLeft: nav.scrollLeft,
  };
};

const ai = measureEdition("ai");
const skillsEdition = measureEdition("skills");

return {
  ok: labHome.ok && ai.ok && skillsEdition.ok,
  labHome,
  ai,
  skillsEdition,
};
