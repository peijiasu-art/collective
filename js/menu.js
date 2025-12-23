document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");

  // 防呆：任何頁面缺元件都不要炸
  if (!toggle || !mobileMenu) return;

  const setExpanded = (open) => toggle.setAttribute("aria-expanded", String(open));

  const closeMenu = () => {
    mobileMenu.classList.remove("show");
    setExpanded(false);
  };

  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    const open = mobileMenu.classList.toggle("show");
    setExpanded(open);
  });

  // 點連結後收合
  mobileMenu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => closeMenu());
  });

  // 點空白處收合
  document.addEventListener("click", (e) => {
    if (!mobileMenu.classList.contains("show")) return;
    const clickedInside = mobileMenu.contains(e.target) || toggle.contains(e.target);
    if (!clickedInside) closeMenu();
  });

  // ESC 收合（加分）
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
});
