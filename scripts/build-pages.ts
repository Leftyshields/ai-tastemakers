import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { config as loadDotenv } from "dotenv";
import {
  allEditions,
  buildEditionSite,
  buildMonthlySite,
  buildWeeklySite,
  editionSitePaths,
  pageShell,
} from "./edition-pages.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
loadDotenv({ path: path.join(ROOT, ".env") });
const SITE_DIR = path.join(ROOT, "site");

interface FirebaseWebConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  appId: string;
}

function loadFirebaseWebConfig(): FirebaseWebConfig | null {
  const apiKey = process.env.FIREBASE_API_KEY?.trim();
  const authDomain = process.env.FIREBASE_AUTH_DOMAIN?.trim();
  const projectId = process.env.FIREBASE_PROJECT_ID?.trim();
  const appId = process.env.FIREBASE_APP_ID?.trim();
  if (!apiKey || !authDomain || !projectId || !appId) return null;
  return { apiKey, authDomain, projectId, appId };
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function subscribeFormScript(firebase: FirebaseWebConfig | null): string {
  if (!firebase) {
    return `<script>
(function () {
  var form = document.getElementById("subscribe-form");
  var status = document.getElementById("subscribe-status");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    status.textContent = "Online signup is not configured yet. Check back soon.";
    status.className = "mt-4 font-sans text-sm text-red-700 dark:text-red-400";
  });
})();
</script>`;
  }

  const configJson = JSON.stringify(firebase);
  return `<script type="module">
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getFirestore, doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

const firebaseConfig = ${configJson};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const form = document.getElementById("subscribe-form");
const emailInput = document.getElementById("subscribe-email");
const submitBtn = document.getElementById("subscribe-submit");
const status = document.getElementById("subscribe-status");

function setStatus(message, kind) {
  status.textContent = message;
  status.className = "mt-4 font-sans text-sm " + (kind === "error"
    ? "text-red-700 dark:text-red-400"
    : kind === "success"
      ? "text-green-800 dark:text-green-400"
      : "text-stone-500 dark:text-stone-400");
}

function subscriberDocId(email) {
  return email.trim().toLowerCase();
}

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  const email = (emailInput.value || "").trim();
  if (!email || !email.includes("@")) {
    setStatus("Enter a valid email address.", "error");
    return;
  }

  submitBtn.disabled = true;
  setStatus("Subscribing…", "info");

  try {
    const normalized = subscriberDocId(email);
    await setDoc(doc(db, "tastemakers_subscribers", normalized), {
      email: normalized,
      subscribedAt: serverTimestamp(),
      source: "ai-tastemakers",
    }, { merge: false });
    emailInput.value = "";
    setStatus("You are subscribed. The next digest will land in your inbox.", "success");
  } catch (err) {
    const code = err && err.code ? String(err.code) : "";
    if (code === "permission-denied") {
      setStatus("You are already subscribed.", "success");
    } else {
      setStatus("Something went wrong. Please try again.", "error");
    }
  } finally {
    submitBtn.disabled = false;
  }
});
</script>`;
}

function unsubscribeFormScript(firebase: FirebaseWebConfig | null): string {
  if (!firebase) {
    return `<script>
(function () {
  var form = document.getElementById("unsubscribe-form");
  var status = document.getElementById("unsubscribe-status");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    status.textContent = "Online unsubscribe is not configured yet. Contact the list owner.";
    status.className = "mt-4 font-sans text-sm text-red-700 dark:text-red-400";
  });
})();
</script>`;
  }

  const configJson = JSON.stringify(firebase);
  return `<script type="module">
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getFirestore, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

const firebaseConfig = ${configJson};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const form = document.getElementById("unsubscribe-form");
const emailInput = document.getElementById("unsubscribe-email");
const submitBtn = document.getElementById("unsubscribe-submit");
const status = document.getElementById("unsubscribe-status");

function setStatus(message, kind) {
  status.textContent = message;
  status.className = "mt-4 font-sans text-sm " + (kind === "error"
    ? "text-red-700 dark:text-red-400"
    : kind === "success"
      ? "text-green-800 dark:text-green-400"
      : "text-stone-500 dark:text-stone-400");
}

function subscriberDocId(email) {
  return email.trim().toLowerCase();
}

var params = new URLSearchParams(window.location.search);
var prefill = params.get("email");
if (prefill) {
  emailInput.value = prefill;
}

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  const email = (emailInput.value || "").trim();
  if (!email || !email.includes("@")) {
    setStatus("Enter a valid email address.", "error");
    return;
  }

  submitBtn.disabled = true;
  setStatus("Unsubscribing…", "info");

  try {
    const normalized = subscriberDocId(email);
    await deleteDoc(doc(db, "tastemakers_subscribers", normalized));
    emailInput.value = "";
    setStatus("You are unsubscribed. You will not receive further digests at this address.", "success");
  } catch (err) {
    const code = err && err.code ? String(err.code) : "";
    if (code === "not-found" || code === "permission-denied") {
      setStatus("That address is not on the list (or was already removed).", "success");
    } else {
      setStatus("Something went wrong. Please try again.", "error");
    }
  } finally {
    submitBtn.disabled = false;
  }
});
</script>`;
}

async function buildSubscribePage(): Promise<void> {
  const paths = editionSitePaths("", 0);
  paths.editionNav.active = undefined;
  const brand = {
    name: "Tastemakers",
    tagline: "Daily GitHub digests for AI open source and agent skills",
  };
  const firebase = loadFirebaseWebConfig();
  const configNote = firebase
    ? ""
    : `<p class="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 font-sans text-sm text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200">Firebase signup is not configured for this build. Set FIREBASE_* env vars when running build:pages.</p>`;

  const body = `
    <a class="mb-6 inline-block font-sans text-sm text-stone-500 no-underline hover:text-blue-800 dark:text-stone-400 dark:hover:text-blue-400" href="${paths.home}">&larr; AI Tastemakers</a>

    <section class="mb-8">
      <p class="mb-3 font-sans text-xs font-semibold uppercase tracking-widest text-stone-500 dark:text-stone-400">Daily email</p>
      <h2 class="mb-4 font-sans text-2xl font-bold tracking-tight">Subscribe to AI Tastemakers</h2>
      <p class="mb-0 text-base leading-relaxed text-stone-600 dark:text-stone-400">
        One email each morning with the top ten AI-derivative repos gaining momentum on GitHub&mdash;ranked by 7-day star growth, with a short Claude-written brief for each pick.
      </p>
    </section>

    <section class="mb-8 rounded-xl border border-stone-200 bg-stone-50 p-5 dark:border-stone-700 dark:bg-stone-950/40">
      <p class="mb-1 font-sans text-xs font-semibold uppercase tracking-widest text-stone-500">Web only</p>
      <p class="mb-3 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
        <a class="font-medium text-blue-800 no-underline hover:underline dark:text-blue-400" href="${paths.editionNav.skillsHref}">Skill Tastemakers</a> covers agent skills, Claude Code plugins, and installable capabilities&mdash;updated daily on the site, no email yet.
      </p>
      <a class="font-sans text-sm font-medium text-blue-800 no-underline hover:underline dark:text-blue-400" href="${paths.editionNav.skillsHref}">Browse Skill Tastemakers &rarr;</a>
    </section>

    ${configNote}

    <form id="subscribe-form" class="rounded-xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-700 dark:bg-stone-950/50" novalidate>
      <label for="subscribe-email" class="mb-2 block font-sans text-sm font-medium text-stone-800 dark:text-stone-200">Email address</label>
      <div class="flex flex-col gap-3 sm:flex-row">
        <input
          id="subscribe-email"
          name="email"
          type="email"
          autocomplete="email"
          required
          placeholder="you@example.com"
          class="min-w-0 flex-1 rounded-lg border border-stone-300 bg-white px-4 py-3 font-sans text-sm text-stone-900 outline-none ring-blue-800/30 focus:border-blue-800 focus:ring-2 dark:border-stone-600 dark:bg-stone-900 dark:text-stone-100 dark:focus:border-blue-500"
        />
        <button
          id="subscribe-submit"
          type="submit"
          class="rounded-lg bg-blue-800 px-6 py-3 font-sans text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-blue-600 dark:hover:bg-blue-500"
        >
          Subscribe
        </button>
      </div>
      <p id="subscribe-status" class="mt-4 font-sans text-sm text-stone-500 dark:text-stone-400" aria-live="polite"></p>
      <p class="mt-4 mb-0 font-sans text-xs leading-relaxed text-stone-500 dark:text-stone-400">
        No spam. One digest per day. <a class="text-blue-800 no-underline hover:underline dark:text-blue-400" href="unsubscribe.html">Unsubscribe</a> anytime.
      </p>
    </form>

    ${subscribeFormScript(firebase)}`;

  await fs.writeFile(
    path.join(SITE_DIR, "subscribe.html"),
    pageShell(
      "Subscribe · Tastemakers",
      body,
      paths,
      brand,
      "Get the AI Tastemakers daily digest by email — top trending AI open source repos with Claude briefs.",
      escapeHtml,
    ),
  );
}

async function buildUnsubscribePage(): Promise<void> {
  const paths = editionSitePaths("", 0);
  paths.editionNav.active = undefined;
  const brand = {
    name: "Tastemakers",
    tagline: "Daily GitHub digests for AI open source and agent skills",
  };
  const firebase = loadFirebaseWebConfig();
  const configNote = firebase
    ? ""
    : `<p class="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 font-sans text-sm text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200">Firebase unsubscribe is not configured for this build. Set FIREBASE_* env vars when running build:pages.</p>`;

  const body = `
    <a class="mb-6 inline-block font-sans text-sm text-stone-500 no-underline hover:text-blue-800 dark:text-stone-400 dark:hover:text-blue-400" href="${paths.home}">&larr; AI Tastemakers</a>

    <section class="mb-8">
      <h2 class="mb-4 font-sans text-2xl font-bold tracking-tight">Unsubscribe from AI Tastemakers</h2>
      <p class="mb-0 text-base leading-relaxed text-stone-600 dark:text-stone-400">
        Enter the email address that receives the daily digest. We&rsquo;ll remove it from the mailing list immediately.
      </p>
    </section>

    ${configNote}

    <form id="unsubscribe-form" class="rounded-xl border border-stone-200 bg-white p-6 shadow-sm dark:border-stone-700 dark:bg-stone-950/50" novalidate>
      <label for="unsubscribe-email" class="mb-2 block font-sans text-sm font-medium text-stone-800 dark:text-stone-200">Email address</label>
      <div class="flex flex-col gap-3 sm:flex-row">
        <input
          id="unsubscribe-email"
          name="email"
          type="email"
          autocomplete="email"
          required
          placeholder="you@example.com"
          class="min-w-0 flex-1 rounded-lg border border-stone-300 bg-white px-4 py-3 font-sans text-sm text-stone-900 outline-none ring-blue-800/30 focus:border-blue-800 focus:ring-2 dark:border-stone-600 dark:bg-stone-900 dark:text-stone-100 dark:focus:border-blue-500"
        />
        <button
          id="unsubscribe-submit"
          type="submit"
          class="rounded-lg border border-stone-300 bg-white px-6 py-3 font-sans text-sm font-semibold text-stone-800 transition hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-stone-600 dark:bg-stone-900 dark:text-stone-100 dark:hover:bg-stone-800"
        >
          Unsubscribe
        </button>
      </div>
      <p id="unsubscribe-status" class="mt-4 font-sans text-sm text-stone-500 dark:text-stone-400" aria-live="polite"></p>
      <p class="mt-4 mb-0 font-sans text-xs leading-relaxed text-stone-500 dark:text-stone-400">
        Changed your mind? <a class="text-blue-800 no-underline hover:underline dark:text-blue-400" href="subscribe.html">Subscribe again</a>.
      </p>
    </form>

    ${unsubscribeFormScript(firebase)}`;

  await fs.writeFile(
    path.join(SITE_DIR, "unsubscribe.html"),
    pageShell(
      "Unsubscribe · Tastemakers",
      body,
      paths,
      brand,
      "Unsubscribe from the AI Tastemakers daily digest email.",
      escapeHtml,
    ),
  );
}

async function main(): Promise<void> {
  await fs.mkdir(path.join(SITE_DIR, "assets"), { recursive: true });
  await fs.writeFile(path.join(SITE_DIR, ".nojekyll"), "");

  let total = 0;
  for (const edition of allEditions()) {
    total += await buildEditionSite(ROOT, SITE_DIR, edition, escapeHtml);
  }
  const weeklyCount = await buildWeeklySite(ROOT, SITE_DIR, escapeHtml);
  total += weeklyCount;
  const monthlyCount = await buildMonthlySite(ROOT, SITE_DIR, escapeHtml);
  total += monthlyCount;

  await buildSubscribePage();
  await buildUnsubscribePage();
  console.log(
    `Built ${total} page(s) (briefings + weekly + monthly) across editions + subscribe + unsubscribe → site/`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
