(() => {
  document.documentElement.classList.add("js-ready");

  const progress = document.querySelector("[data-reading-progress]");
  const copyButtons = document.querySelectorAll("[data-copy-link]");
  const backTop = document.querySelector("[data-back-top]");
  const revealItems = document.querySelectorAll("[data-reveal]");

  const updateProgress = () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const percent = maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0;

    if (progress) {
      progress.style.transform = `scaleX(${percent})`;
    }

    if (backTop) {
      backTop.classList.toggle("is-visible", window.scrollY > 620);
    }
  };

  const copyToClipboard = async () => {
    const text = window.location.href;

    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }

    const field = document.createElement("textarea");
    field.value = text;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();
    document.execCommand("copy");
    field.remove();
  };

  copyButtons.forEach((button) => {
    const label = button.textContent;

    button.addEventListener("click", async () => {
      try {
        await copyToClipboard();
        button.textContent = "Link copiado";
      } catch {
        button.textContent = "Copie pela barra";
      }

      window.setTimeout(() => {
        button.textContent = label;
      }, 1800);
    });
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  updateProgress();
  window.addEventListener("scroll", updateProgress, { passive: true });
})();
