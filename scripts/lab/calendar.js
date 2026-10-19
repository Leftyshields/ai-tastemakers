/**
 * Read-only Lab experiment calendar (Jantt standalone).
 * Loaded by site/lab/calendar/index.html.
 */
(function () {
  const root = document.getElementById("jantt-root");
  if (!root || typeof window.Jantt === "undefined") {
    return;
  }

  fetch("experiments.jantt.json")
    .then((res) => {
      if (!res.ok) {
        throw new Error("Could not load experiments.jantt.json (" + res.status + ")");
      }
      return res.json();
    })
    .then((plan) => {
      window.Jantt.mount(root, plan, {
        readOnly: true,
        className: "jantt-lab-calendar",
        themeClassName: "jantt-theme-swiss-light",
      });
    })
    .catch((err) => {
      root.innerHTML =
        '<p class="font-sans text-sm text-red-700 dark:text-red-300">Calendar failed to load: ' +
        String(err.message || err) +
        "</p>";
    });
})();
