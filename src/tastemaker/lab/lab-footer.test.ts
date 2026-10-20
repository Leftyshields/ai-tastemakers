import { describe, it, expect } from "vitest";
import { LAB_FOOTER_ABOUT_LABEL, labPublishFooterHtml } from "../../../scripts/lab/lab-dashboard-copy.js";
import { footerLinkRowHtml, labAboutFooterHref } from "../../../scripts/edition-pages.js";

function escapeHtml(t: string): string {
  return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

describe("Lab footer About link label", () => {
  it("uses Tastemaker Lab on the Lab publish footer with about.html target", () => {
    const html = labPublishFooterHtml(escapeHtml);
    expect(html).toContain(`>${LAB_FOOTER_ABOUT_LABEL}<`);
    expect(html).toContain('href="about.html"');
    expect(html).not.toContain("About the Lab");
  });

  it("uses Tastemaker Lab on the main site footer row", () => {
    const paths = {
      subscribe: "subscribe.html",
      css: "assets/style.css",
      home: "./",
      lab: "lab/",
      brief: (d: string) => `briefings/${d}.html`,
      crossEdition: { href: "skills/", label: "Skill Tastemakers" },
      editionNav: { ossHref: "./", skillsHref: "skills/", active: "oss" as const },
    };
    const row = footerLinkRowHtml(paths, escapeHtml);
    expect(row).toContain(`>${LAB_FOOTER_ABOUT_LABEL}<`);
    expect(row).toContain(labAboutFooterHref(paths));
    expect(row).not.toContain("About the Lab");
  });
});
