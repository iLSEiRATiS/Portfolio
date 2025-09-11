// theme.js
(function(){
  const STORAGE_KEY = "theme";
  const root = document.documentElement;
  const btn = document.getElementById("theme-toggle");

  function preferredTheme(){
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "dark" || stored === "light") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function apply(theme){
    const isDark = theme === "dark";
    root.classList.toggle("dark", isDark);
    if (btn) btn.setAttribute("aria-pressed", String(isDark));
  }

  // init
  apply(preferredTheme());

  // listen to toggle
  if (btn) {
    btn.addEventListener("click", () => {
      const next = root.classList.contains("dark") ? "light" : "dark";
      localStorage.setItem(STORAGE_KEY, next);
      apply(next);
    });
  }

  // respond to system changes if user no guardó preferencia
  const mql = window.matchMedia("(prefers-color-scheme: dark)");
  mql.addEventListener("change", () => {
    if (!localStorage.getItem(STORAGE_KEY)) apply(preferredTheme());
  });
})();
