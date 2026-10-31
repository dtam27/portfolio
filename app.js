(() => {
  const header = document.querySelector(".site-header");
  const nav = document.getElementById("site-nav");
  const toggle = document.querySelector(".nav-toggle");
  const year = document.getElementById("year");
  const compact = window.matchMedia("(max-width: 600px)");
  const navLinks = Array.from(nav.querySelectorAll('a[href^="#"]'));
  year.textContent = String(new Date().getFullYear());
  toggle.hidden = false;
  header.classList.add("has-menu");
  const setMenuOpen = (open, restoreFocus = false) => {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    if (!open && restoreFocus) {
      toggle.focus();
    }
  };
  toggle.addEventListener("click", () =>
    setMenuOpen(toggle.getAttribute("aria-expanded") !== "true")
  );
  nav.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (!link || !compact.matches) return;
    const hash = link.getAttribute("href");
    setMenuOpen(false);
    if (hash.startsWith("#")) {
      const section = document.getElementById(hash.slice(1));
      if (section) {
        section.setAttribute("tabindex", "-1");
        section.focus({ preventScroll: true });
      }
    } else {
      toggle.focus();
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setMenuOpen(false, true);
    }
  });
  document.addEventListener("click", (event) => {
    if (!header.contains(event.target)) {
      setMenuOpen(false);
    }
  });
  header.addEventListener("focusout", (event) => {
    if (!header.contains(event.relatedTarget)) {
      setMenuOpen(false);
    }
  });
  compact.addEventListener("change", () => setMenuOpen(false));
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        for (const link of navLinks) {
          if (link.hash === `#${entry.target.id}`) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        }
      }
    }, { rootMargin: "-15% 0px -60% 0px", threshold: 0 });
    for (const link of navLinks) {
      const section = document.getElementById(link.hash.slice(1));
      if (section) {
        observer.observe(section);
      }
    }
  }
})();
