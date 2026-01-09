// js/hero-carousel.js
document.addEventListener("DOMContentLoaded", () => {
  const carousels = document.querySelectorAll(".heroCarousel");
  if (!carousels.length) return;

  carousels.forEach(setupHeroCarousel);

  function setupHeroCarousel(root) {
    const track = root.querySelector(".heroCarouselTrack");
    const dotsWrap = root.querySelector(".heroCarouselDots");
    const prevBtn = root.querySelector(".heroCarouselPrev");
    const nextBtn = root.querySelector(".heroCarouselNext");

    if (!track) return;

    // 讀取 data-images: 用 | 分隔
    const raw = root.getAttribute("data-images") || "";
    const images = raw.split("|").map(s => s.trim()).filter(Boolean);

    // 沒有圖片就不做
    if (!images.length) return;

    // 讀取輪播秒數（預設 4500ms）
    const intervalMs = parseInt(root.getAttribute("data-interval") || "4500", 10);

    let idx = 0;
    let timer = null;

    // 建 slides
    track.innerHTML = images.map((src, i) => `
      <div class="heroCarouselSlide" role="group" aria-label="第 ${i + 1} 張，共 ${images.length} 張">
        <img class="heroCarouselImg" src="${escapeAttr(src)}" alt="" loading="lazy">
      </div>
    `).join("");

    // 建 dots
    if (dotsWrap) {
      dotsWrap.innerHTML = images.map(() => `<button type="button" class="heroDot" aria-label="切換輪播"></button>`).join("");
    }
    const dots = dotsWrap ? Array.from(dotsWrap.querySelectorAll(".heroDot")) : [];

    function render() {
      track.style.transform = `translateX(${-idx * 100}%)`;

      dots.forEach((d, i) => {
        d.classList.toggle("is-active", i === idx);
      });

      // 只有一張就隱藏控制
      const isSingle = images.length <= 1;
      if (prevBtn) prevBtn.style.display = isSingle ? "none" : "";
      if (nextBtn) nextBtn.style.display = isSingle ? "none" : "";
      if (dotsWrap) dotsWrap.style.display = isSingle ? "none" : "";
    }

    function go(nextIndex) {
      const n = images.length;
      idx = (nextIndex + n) % n;
      render();
    }

    function start() {
      stop();
      if (images.length <= 1) return;
      timer = setInterval(() => go(idx + 1), intervalMs);
    }

    function stop() {
      if (timer) clearInterval(timer);
      timer = null;
    }

    // 按鈕
    if (prevBtn) prevBtn.addEventListener("click", () => { go(idx - 1); start(); });
    if (nextBtn) nextBtn.addEventListener("click", () => { go(idx + 1); start(); });

    // dots click
    dots.forEach((d, i) => d.addEventListener("click", () => { go(i); start(); }));

    // hover 暫停（桌機友善）
    root.addEventListener("mouseenter", stop);
    root.addEventListener("mouseleave", start);

    // 手機滑動
    let startX = 0;
    let down = false;
    const viewport = root.querySelector(".heroCarouselViewport");

    if (viewport) {
      viewport.addEventListener("touchstart", (e) => {
        down = true;
        startX = e.touches[0].clientX;
      }, { passive: true });

      viewport.addEventListener("touchend", (e) => {
        if (!down) return;
        down = false;
        const endX = e.changedTouches[0].clientX;
        const dx = endX - startX;
        if (Math.abs(dx) > 40) {
          if (dx > 0) go(idx - 1);
          else go(idx + 1);
          start();
        }
      }, { passive: true });
    }

    render();
    start();
  }

  function escapeAttr(s = "") {
    return String(s).replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
});
