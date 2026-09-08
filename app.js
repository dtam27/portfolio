(() => {
  const nav = document.getElementById("site-nav");
  const toggle = document.querySelector(".nav-toggle");
  const year = document.getElementById("year");

  if (year) year.textContent = String(new Date().getFullYear());

  const setOpen = (open) => {
    if (!nav || !toggle) return;
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setOpen(false));
    });
  }

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    });
  });

  const portrait = document.querySelector(".portrait-frame img");
  if (portrait) {
    const swap = () => {
      const fallback = document.createElement("div");
      fallback.className = "portrait-fallback";
      fallback.textContent = "DT";
      portrait.replaceWith(fallback);
    };
    portrait.addEventListener("error", swap);
    if (portrait.complete && portrait.naturalWidth === 0) swap();
  }
})();
