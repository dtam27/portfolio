(() => {
  const nav = document.getElementById("site-nav");
  const toggle = document.querySelector(".nav-toggle");
  const year = document.getElementById("year");
  const navLinks = nav ? Array.from(nav.querySelectorAll('a[href^="#"]')) : [];

  if (year) year.textContent = String(new Date().getFullYear());

  const setMenuOpen = (open) => {
    if (!nav || !toggle) return;
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      setMenuOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    navLinks.forEach((link) => link.addEventListener("click", () => setMenuOpen(false)));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setMenuOpen(false);
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

  if ("IntersectionObserver" in window && navLinks.length) {
    const sections = ["about", "skills", "projects", "contact"]
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          navLinks.forEach((link) => {
            if (link.getAttribute("href") === `#${id}`) link.setAttribute("aria-current", "true");
            else link.removeAttribute("aria-current");
          });
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    sections.forEach((section) => observer.observe(section));
  }
})();


/* resume highlight */
(() => {
  const row = document.getElementById("resume");
  if (!row) return;

  const highlight = () => {
    row.classList.add("is-highlighted");
    row.focus({ preventScroll: true });
    window.setTimeout(() => row.classList.remove("is-highlighted"), 1600);
  };

  if (window.location.hash === "#resume") {
    highlight();
  }

  document.querySelectorAll('a[href="#resume"]').forEach((link) => {
    link.addEventListener("click", () => {
      window.setTimeout(highlight, 50);
    });
  });

  window.addEventListener("hashchange", () => {
    if (window.location.hash === "#resume") highlight();
  });
})();
