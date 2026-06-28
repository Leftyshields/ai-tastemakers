import { describe, it, expect } from "vitest";
import { labNavHtml, labSitePaths } from "../../../scripts/edition-pages.js";

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
