// Interactive enhancements for Shreya's portfolio
document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector(".menu");
  const nav = document.querySelector("#nav");
  const topButton = document.querySelector(".top");
  const year = document.querySelector("#year");

  // Keep the copyright year current.
  if (year) year.textContent = new Date().getFullYear();

  // Accessible mobile menu; close after choosing a section or pressing Escape.
  if (menu && nav) {
    menu.addEventListener("click", () => {
      const expanded = menu.getAttribute("aria-expanded") === "true";
      menu.setAttribute("aria-expanded", String(!expanded));
      nav.classList.toggle("open", !expanded);
      menu.textContent = expanded ? "☰" : "✕";
    });
    nav.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("open");
      menu.setAttribute("aria-expanded", "false");
      menu.textContent = "☰";
    }));
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        nav.classList.remove("open");
        menu.setAttribute("aria-expanded", "false");
        menu.textContent = "☰";
      }
    });
  }

  // Reveal cards and sections as they enter the viewport.
  const revealItems = document.querySelectorAll(".section, .cards article, .project, .timeline article, .contact .wrap, .internship-panel");
  revealItems.forEach(item => item.classList.add("reveal"));
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("visible"));
  }

  // Highlight the navigation link for the section currently on screen.
  if ("IntersectionObserver" in window && nav) {
    const links = [...nav.querySelectorAll('a[href^="#"]')];
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) links.forEach(link =>
          link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id)
        );
      });
    }, { rootMargin: "-35% 0px -55% 0px" });
    document.querySelectorAll("main section[id]").forEach(section => sectionObserver.observe(section));
  }

  // Back-to-top control.
  const updateTop = () => topButton?.classList.toggle("show", window.scrollY > 450);
  window.addEventListener("scroll", updateTop, { passive: true });
  updateTop();
  topButton?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
});
