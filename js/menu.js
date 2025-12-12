document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");

  // 如果頁面沒有手機選單，就直接不執行（避免炸掉）
  if (!toggle || !mobileMenu) return;

  toggle.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("show");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  // 點擊選單項目後自動收合（畢展等級體驗）
  mobileMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("show");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
});
