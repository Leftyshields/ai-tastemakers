/**
 * Gate: new brief prose must not contain U+2014 after publish-path sanitization.
 * Does not scan archived briefings/ (many pre-policy digests still have em dashes).
 */
import { NO_EM_DASH_VOICE_LINE, containsEmDash, stripEmDashesFromProse } from "../src/tastemaker/narrate/brief-voice.js";
import { sanitizeBriefOutput } from "../src/tastemaker/narrate/sanitize.js";
import { NARRATION_SYSTEM_PROMPT } from "../src/tastemaker/narrate/claude.js";
import { HUMANIZER_POLISH_SYSTEM_PROMPT } from "../src/tastemaker/narrate/humanizer-polish.js";
import { WEEKLY_EMAIL_SYSTEM_PROMPT, WEEKLY_SYSTEM_PROMPT } from "../src/tastemaker/narrate/weekly.js";

const errors: string[] = [];

function requirePrompt(name: string, prompt: string) {
  if (!prompt.includes(NO_EM_DASH_VOICE_LINE)) {
    errors.push(`${name} is missing the verbatim no-em-dash voice line`);
  }
}

requirePrompt("NARRATION_SYSTEM_PROMPT", NARRATION_SYSTEM_PROMPT);
requirePrompt("HUMANIZER_POLISH_SYSTEM_PROMPT", HUMANIZER_POLISH_SYSTEM_PROMPT);
requirePrompt("WEEKLY_SYSTEM_PROMPT", WEEKLY_SYSTEM_PROMPT);
requirePrompt("WEEKLY_EMAIL_SYSTEM_PROMPT", WEEKLY_EMAIL_SYSTEM_PROMPT);

const sampleWithEmDash = [
  "**What it does:** Demo tool \u2014 small CLI.",
  "**Why now:** HN thread this week.",
  "**Build with it:** Run export.",
].join("\n\n");

const sanitized = sanitizeBriefOutput(sampleWithEmDash);
if (!sanitized || containsEmDash(sanitized)) {
  errors.push("sanitizeBriefOutput must strip U+2014 from generated repo brief text");
}

const weeklySample = `One thread \u2014 two repos.`;
if (containsEmDash(stripEmDashesFromProse(weeklySample))) {
  errors.push("stripEmDashesFromProse must remove U+2014 from weekly prose");
}

if (errors.length) {
  console.error("verify-brief-no-em-dash FAILED:");
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

console.log("verify-brief-no-em-dash: ok");
