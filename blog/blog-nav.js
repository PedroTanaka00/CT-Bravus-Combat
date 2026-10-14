(() => {
  const header = document.querySelector("[data-blog-header]");
  const menu = document.querySelector("[data-menu]");
  const menuToggle = document.querySelector("[data-menu-toggle]");

  const closeMenu = () => {
    menu?.classList.remove("is-open");
    menuToggle?.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Abrir menu");
  };

  const toggleMenu = () => {
    const isOpen = menu?.classList.toggle("is-open");
    menuToggle?.classList.toggle("is-open", Boolean(isOpen));
    menuToggle?.setAttribute("aria-expanded", String(Boolean(isOpen)));
    menuToggle?.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  };

  const updateHeader = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 24);
  };

  menuToggle?.addEventListener("click", toggleMenu);
  menu?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  window.addEventListener("resize", closeMenu);
  window.addEventListener("scroll", updateHeader, { passive: true });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  updateHeader();
})();
