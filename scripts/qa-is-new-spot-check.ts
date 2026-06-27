import {
  loadAllPriorBriefingRepos,
  loadBriefingFeaturedSets,
} from "../src/tastemaker/rank/score.js";

const target = "Kilo-Org/kilocode";

async function main(): Promise<void> {
  for (const [label, dir, exclude] of [
    ["OSS before 2026-06-25", "briefings", "2026-06-25"],
    ["Skills before 2026-06-25", "briefings/skills", "2026-06-25"],
  ] as const) {
    const prior = await loadAllPriorBriefingRepos(dir, exclude);
    console.log(`${label}: kilocode seen=${prior.has(target)}`);
  }

  const { recentlyFeatured, previouslyFeatured } = await loadBriefingFeaturedSets(
    "briefings",
    5,
    "2026-06-25",
  );
  console.log(
    `OSS 2026-06-25: in recent(5)=${recentlyFeatured.has(target)}, in all-prior=${previouslyFeatured.has(target)}`,
  );
  console.log(`Would is_new=${!previouslyFeatured.has(target)} (expect false)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
