// js/artist.js
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(location.search);
  const slug = params.get("slug");
  if (!slug || !Array.isArray(window.ARTISTS)) return;

  const artist = window.ARTISTS.find(a => a && a.slug === slug);
  if (!artist) return;

  const nameEl = document.querySelector("#artistName");
  const roleEl = document.querySelector("#artistRole");
  const bioEl  = document.querySelector("#artistBio");
  const kwEl   = document.querySelector("#artistKeywords");

  // ✅ 輪播 DOM（你 artist.html 要有這些 id）
  const track = document.querySelector("#artistCarouselTrack");
  const dotsWrap = document.querySelector("#artistCarouselDots");
  const prevBtn = document.querySelector("#artistCarousel .workCarouselPrev");
  const nextBtn = document.querySelector("#artistCarousel .workCarouselNext");

  // 把 <br> / HTML tag 去掉做 title
  const plainName = String(artist.name || "")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]*>/g, "")
    .trim();

  document.title = `${plainName}｜藝術家｜Student Art Collective`;

  // ✅ 名字支援 <br>（英文 / 中文分行）
  if (nameEl) nameEl.innerHTML = artist.name || "";
  if (roleEl) roleEl.textContent = artist.role || "";

  // ✅ 詳細介紹：空行分段成 <p>
  const detailIntro =
    (artist.detail && artist.detail.intro)
      ? artist.detail.intro
      : (artist.cardBio || "");

  if (bioEl) {
    const paragraphs = String(detailIntro)
      .split(/\n\s*\n/g)
      .map(p => p.trim())
      .filter(Boolean);

    bioEl.innerHTML = paragraphs.map(p => `<p>${escapeHTML(p)}</p>`).join("");
  }

  if (kwEl) {
    kwEl.innerHTML = (artist.keywords || [])
      .map(k => `<span class="kwPill">${escapeHTML(String(k))}</span>`)
      .join("");
  }

  // =========================
  // ✅ 詳細頁輪播：只吃 artist.images
  // =========================
  const images = Array.isArray(artist.images) ? artist.images.filter(Boolean) : [];

  if (track && images.length) {
    track.innerHTML = images.map((src) => {
      const safe = escapeAttr(src);
      return `
        <div class="workCarouselSlide">
          <img class="workCarouselImg" src="${safe}" alt="${escapeAttr(plainName)} 圖片">
        </div>
      `;
    }).join("");

    if (dotsWrap) {
      dotsWrap.innerHTML = images.map((_, i) =>
        `<button class="workCarouselDot ${i === 0 ? "is-active" : ""}" type="button" aria-label="第 ${i + 1} 張"></button>`
      ).join("");
    }

    let idx = 0;
    const dots = dotsWrap ? Array.from(dotsWrap.querySelectorAll(".workCarouselDot")) : [];

    const go = (nextIdx) => {
      idx = (nextIdx + images.length) % images.length;
      track.style.transform = `translateX(-${idx * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle("is-active", i === idx));
    };

    if (prevBtn) prevBtn.addEventListener("click", () => go(idx - 1));
    if (nextBtn) nextBtn.addEventListener("click", () => go(idx + 1));
    dots.forEach((d, i) => d.addEventListener("click", () => go(i)));

    // 只有一張就隱藏控制項
    if (images.length <= 1) {
      if (prevBtn) prevBtn.style.display = "none";
      if (nextBtn) nextBtn.style.display = "none";
      if (dotsWrap) dotsWrap.style.display = "none";
    }
  }

  // ========= helpers =========
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
    return escapeHTML(s);
  }
});
