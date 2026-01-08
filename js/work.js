// js/work.js
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(location.search);
  const slug = params.get("slug");
  if (!slug || !Array.isArray(window.WORKS)) return;

  const work = window.WORKS.find(w => w && w.slug === slug);
  if (!work) return;

  // ===== 文字區 =====
  const titleEl = document.querySelector("#workTitle");
  const artistEl = document.querySelector("#workArtist");
  const yearEl = document.querySelector("#workYear");
  const mediumEl = document.querySelector("#workMedium");
  const sizeEl = document.querySelector("#workSize");
  const bodyEl = document.querySelector("#workBody");

  // title
  const plainTitle = String(work.title || "").replace(/<[^>]*>/g, "").trim();
  document.title = `${plainTitle}｜作品｜異化/液化-何而為人？`;

  if (titleEl) titleEl.textContent = work.title || "";
  if (artistEl) artistEl.textContent = work.artist || "—";
  if (yearEl) yearEl.textContent = work.year || "—";
  if (mediumEl) mediumEl.textContent = work.medium || "—";
  if (sizeEl) sizeEl.textContent = work.size || "—";

  // ✅ 做法A：空行分段 -> 多個 <p>
  const intro =
    (work.detail && work.detail.intro)
      ? work.detail.intro
      : "";

  if (bodyEl) {
    const paragraphs = String(intro)
      .split(/\n\s*\n/g)
      .map(p => p.trim())
      .filter(Boolean);

    bodyEl.innerHTML = paragraphs
      .map(p => `<p>${escapeHTML(p)}</p>`)
      .join("");
  }

  // ===== 輪播區 =====
  const track = document.querySelector("#workCarouselTrack");
  const dotsWrap = document.querySelector("#workCarouselDots");
  const btnPrev = document.querySelector(".workCarouselPrev");
  const btnNext = document.querySelector(".workCarouselNext");

  // images 優先；沒有就用 thumb 當單張
  const images = Array.isArray(work.images) && work.images.length
    ? work.images
    : (work.thumb ? [work.thumb] : []);

  if (!track || images.length === 0) return;

  let idx = 0;

  // 建立 slides
  track.innerHTML = images.map((src, i) => `
    <div class="workCarouselSlide" role="group" aria-label="第 ${i + 1} 張，共 ${images.length} 張">
      <img class="workCarouselImg" src="${escapeAttr(src)}" alt="${escapeAttr(work.title || "作品圖片")}" loading="lazy">
    </div>
  `).join("");

  // 建立 dots
  if (dotsWrap) {
    dotsWrap.innerHTML = images.map((_, i) => `
      <button type="button" class="workCarouselDot" aria-label="切換到第 ${i + 1} 張"></button>
    `).join("");
  }

  const dots = dotsWrap ? Array.from(dotsWrap.querySelectorAll(".workCarouselDot")) : [];

  function render() {
    // 0%, -100%, -200%...
    track.style.transform = `translateX(${-idx * 100}%)`;

    dots.forEach((d, i) => {
      if (i === idx) d.classList.add("is-active");
      else d.classList.remove("is-active");
    });

    // 單張就隱藏左右鍵 + dots（避免醜）
    const isSingle = images.length <= 1;
    if (btnPrev) btnPrev.style.display = isSingle ? "none" : "";
    if (btnNext) btnNext.style.display = isSingle ? "none" : "";
    if (dotsWrap) dotsWrap.style.display = isSingle ? "none" : "";
  }

  function go(nextIndex) {
    const n = images.length;
    idx = (nextIndex + n) % n;
    render();
  }

  if (btnPrev) btnPrev.addEventListener("click", () => go(idx - 1));
  if (btnNext) btnNext.addEventListener("click", () => go(idx + 1));

  // dots click
  dots.forEach((d, i) => d.addEventListener("click", () => go(i)));

  // 支援鍵盤左右
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") go(idx - 1);
    if (e.key === "ArrowRight") go(idx + 1);
  });

  // 手機滑動（簡單版）
  let startX = 0;
  let isDown = false;
  const viewport = document.querySelector(".workCarouselViewport");
  if (viewport) {
    viewport.addEventListener("touchstart", (e) => {
      isDown = true;
      startX = e.touches[0].clientX;
    }, { passive: true });

    viewport.addEventListener("touchend", (e) => {
      if (!isDown) return;
      isDown = false;
      const endX = (e.changedTouches && e.changedTouches[0]) ? e.changedTouches[0].clientX : startX;
      const dx = endX - startX;
      if (Math.abs(dx) > 40) {
        if (dx > 0) go(idx - 1);
        else go(idx + 1);
      }
    }, { passive: true });
  }

  render();

  // ===== helpers =====
  function escapeHTML(s = "") {
    return String(s).replace(/[&<>"']/g, c => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[c]));
  }

  function escapeAttr(s = "") {
    // attribute 用：把 " 轉成 &quot;
    return String(s).replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
});
