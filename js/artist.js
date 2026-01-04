// js/artist.js
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(location.search);
  const slug = params.get("slug");
  if (!slug || !window.ARTISTS) return;

  const artist = window.ARTISTS.find(a => a.slug === slug);
  if (!artist) return;

  const hero = document.querySelector("#artistHero");
  const nameEl = document.querySelector("#artistName");
  const roleEl = document.querySelector("#artistRole");
  const bioEl  = document.querySelector("#artistBio");
  const detailEl = document.querySelector("#artistDetail");

  // ✅ title 不要帶 <br>，所以把 <br> 去掉
  const plainName = String(artist.name || "").replace(/<br\s*\/?>/gi, " ");
  document.title = `${plainName}｜藝術家｜Student Art Collective`;

  if (hero) {
    hero.style.backgroundImage =
      `linear-gradient(180deg, rgba(0,0,0,.18), rgba(0,0,0,.38)), url('${artist.image}')`;
  }

  if (nameEl) nameEl.textContent = plainName;
  if (roleEl) roleEl.textContent = artist.role || "";
  if (bioEl)  bioEl.textContent  = artist.cardBio || "";

  // ✅ 把 detail.intro 的換行切成段落
  if (detailEl) {
    const raw = (artist.detail && artist.detail.intro) ? String(artist.detail.intro) : "";
    const paragraphs = raw
      .split(/\n{2,}/)                 // 兩個以上換行 => 新段落
      .map(s => s.trim())
      .filter(Boolean)
      .map(p => `<p>${escapeHTML(p).replace(/\n/g, "<br>")}</p>`)
      .join("");

    detailEl.innerHTML = paragraphs || `<p>（尚未提供詳細內容）</p>`;
  }

  function escapeHTML(s = "") {
    return String(s).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[c]));
  }
});
