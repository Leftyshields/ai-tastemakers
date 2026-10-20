/** Redirect legacy lab/about.html to methodology.html, preserving URL hash fragments. */

export function labAboutRedirectScript(): string {
  return `<script>
(function(){
  var target = "methodology.html" + (window.location.hash || "");
  window.location.replace(target);
})();
</script>`;
}
