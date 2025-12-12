document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");

  // 防呆：任何頁面缺元件都不要炸
  if (!toggle || !mobileMenu) return;

  const setExpanded = (open) => toggle.setAttribute("aria-expanded", String(open));

  toggle.addEventListener("click", () => {
    const open = mobileMenu.classList.toggle("show");
    setExpanded(open);
  });

  // 點連結後收合（更像正式網站）
  mobileMenu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      mobileMenu.classList.remove("show");
      setExpanded(false);
    });
  });
});
