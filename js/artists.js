// js/artists.js
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector("#artistsGrid");
  if (!grid || !Array.isArray(window.ARTISTS)) return;

  const escapeHTML = (v = "") =>
    String(v).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[c]));

  grid.innerHTML = window.ARTISTS.map((a) => {
    // 防呆：避免某一筆資料不是物件導致整頁爆掉
    if (!a || typeof a !== "object") return "";

    const slug = encodeURIComponent(a.slug || "");
    const img = escapeHTML(a.image || "");
    const role = escapeHTML(a.role || "");
    const cardBio = escapeHTML(a.cardBio || ""); // ✅ 用 cardBio
    const kw = (a.keywords || []).slice(0, 3).map(escapeHTML).join(" · ");

    // ✅ name 允許 <br>，不要 escape
    const nameHtml = a.name || "";

    return `
      <article class="artistCard" role="article">
        <a class="artistCardLink" href="artist.html?slug=${slug}" aria-label="前往 ${escapeHTML(a.slug || "")} 的介紹頁">
          <div class="artistThumb" style="background-image:url('${img}')"></div>
          <div class="artistPad">
            <div class="artistTop">
              <h3 class="artistName">${nameHtml}</h3>
              <span class="artistRole">${role}</span>
            </div>
            <p class="artistBio">${cardBio}</p>
            <div class="artistMeta">
              <span class="artistKw">${kw}</span>
              <span class="artistMore">閱讀更多 →</span>
            </div>
          </div>
        </a>
      </article>
    `;
  }).join("");
});
