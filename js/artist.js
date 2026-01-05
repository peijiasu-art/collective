// js/artist.js
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

  // 把 <br> / HTML tag 去掉做 title
  const plainName = String(artist.name || "")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]*>/g, "")
    .trim();

  document.title = `${plainName}｜藝術家｜Student Art Collective`;

  // Hero 背景
  if (hero) {
    const img = artist.image || "";
    hero.style.backgroundImage =
      `linear-gradient(180deg, rgba(0,0,0,.18), rgba(0,0,0,.38)), url('${img}')`;
  }

  // ✅ 名字支援 <br>（英文 / 中文分行）
  if (nameEl) nameEl.innerHTML = artist.name || "";

  // 年代
  if (roleEl) roleEl.textContent = artist.role || "";

  // ✅ 做法A：用「空行」分段，輸出成多個 <p>
  const detailIntro =
    (artist.detail && artist.detail.intro)
      ? artist.detail.intro
      : (artist.cardBio || "");

  if (bioEl) {
    const paragraphs = String(detailIntro)
      .split(/\n\s*\n/g)   // 兩個以上換行 = 新段落
      .map(p => p.trim())
      .filter(Boolean);

    bioEl.innerHTML = paragraphs
      .map(p => `<p>${escapeHTML(p)}</p>`)
      .join("");
  }

  // 關鍵字
  if (kwEl) {
    kwEl.innerHTML = (artist.keywords || [])
      .map(k => `<span class="kwPill">${escapeHTML(String(k))}</span>`)
      .join("");
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
});
