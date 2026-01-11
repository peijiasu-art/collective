document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(location.search);
  const slug = params.get("slug");
  if (!slug || !Array.isArray(window.ARTISTS)) return;

  const artist = window.ARTISTS.find(a => a && a.slug === slug);
  if (!artist) return;

  const hero = document.querySelector("#artistHero");
  const nameEl = document.querySelector("#artistName");
  const roleEl = document.querySelector("#artistRole");
  const bioEl  = document.querySelector("#artistBio");
  const kwEl   = document.querySelector("#artistKeywords");

  // ✅ 輪播相關（請確認 artist.html 有這些 id）
  const carousel = document.querySelector("#artistCarousel");
  const track = document.querySelector("#artistCarouselTrack");
  const dotsWrap = document.querySelector("#artistCarouselDots");
  const btnPrev = document.querySelector(".artistCarouselPrev");
  const btnNext = document.querySelector(".artistCarouselNext");

  // ---- title：把 <br> 與 tag 拿掉 ----
  const plainName = String(artist.name || "")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]*>/g, "")
    .trim();

  document.title = `${plainName}｜藝術家｜Student Art Collective`;

  // ✅ 名字支援 <br>
  if (nameEl) nameEl.innerHTML = artist.name || "";
  if (roleEl) roleEl.textContent = artist.role || "";

  // ✅ 介紹文字：做法A（空行分段）
  const intro =
    (artist.detail && artist.detail.intro) ? artist.detail.intro :
    (artist.bio || artist.cardBio || "");

  if (bioEl) {
    const paragraphs = String(intro)
      .split(/\n\s*\n/g)
      .map(p => p.trim())
      .filter(Boolean);

    bioEl.innerHTML = paragraphs.map(p => `<p>${escapeHTML(p)}</p>`).join("");
  }

  // 關鍵字
  if (kwEl) {
    kwEl.innerHTML = (artist.keywords || [])
      .map(k => `<span class="kwPill">${escapeHTML(String(k))}</span>`)
      .join("");
  }

  // =========================
  // ✅ 輪播圖資料來源（最重要）
  // 支援：artist.images / artist.detail.images / artist.image
  // =========================
  const images = normalizeImages(artist);

  // ✅ 如果你仍然有 hero 背景要顯示，也可以用第一張
  if (hero) {
    const first = images[0] || artist.image || "";
    if (first) {
      hero.style.backgroundImage =
        `linear-gradient(180deg, rgba(0,0,0,.18), rgba(0,0,0,.38)), url('${first}')`;
    }
  }

  // ✅ 輪播容器存在才渲染（避免你還沒放輪播 HTML 就報錯）
  if (carousel && track && images.length) {
    // 塞 slides
    track.innerHTML = images.map(src => `
      <div class="artistCarouselSlide">
        <img class="artistCarouselImg" src="${escapeAttr(src)}" alt="${escapeAttr(plainName)}">
      </div>
    `).join("");

    // dots
    if (dotsWrap) {
      dotsWrap.innerHTML = images.map((_, i) => `
        <button class="artistCarouselDot ${i === 0 ? "is-active" : ""}" type="button" aria-label="第 ${i + 1} 張"></button>
      `).join("");
    }

    // 輪播控制
    let index = 0;
    const slidesCount = images.length;

    const go = (i) => {
      index = (i + slidesCount) % slidesCount;
      track.style.transform = `translateX(-${index * 100}%)`;

      if (dotsWrap) {
        [...dotsWrap.querySelectorAll(".artistCarouselDot")].forEach((dot, di) => {
          dot.classList.toggle("is-active", di === index);
        });
      }
    };

    if (btnPrev) btnPrev.addEventListener("click", () => go(index - 1));
    if (btnNext) btnNext.addEventListener("click", () => go(index + 1));

    if (dotsWrap) {
      dotsWrap.addEventListener("click", (e) => {
        const btn = e.target.closest(".artistCarouselDot");
        if (!btn) return;
        const all = [...dotsWrap.querySelectorAll(".artistCarouselDot")];
        const i = all.indexOf(btn);
        if (i >= 0) go(i);
      });
    }
  } else {
    // ✅ 如果輪播沒有成功渲染，通常原因是：
    // 1) artist.html 沒有 #artistCarouselTrack
    // 2) images 是空陣列（資料欄位沒對）
    // 3) 路徑錯誤（圖片 404）
    // 這邊不做 alert，避免干擾；你可以自行 console.log
  }

  // ========= helpers =========
  function normalizeImages(a) {
    // 依優先序：images > detail.images > image
    const arr =
      (Array.isArray(a.images) ? a.images :
       (a.detail && Array.isArray(a.detail.images) ? a.detail.images : null));

    if (arr && arr.length) {
      return arr.filter(Boolean).map(String);
    }

    // fallback：單張
    if (a.image) return [String(a.image)];
    return [];
  }

  function escapeHTML(s = "") {
    return String(s).replace(/[&<>"']/g, c => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[c]));
  }

  // 給 src/alt 用（避免引號炸掉）
  function escapeAttr(s = "") {
    return String(s).replace(/"/g, "&quot;");
  }
});
