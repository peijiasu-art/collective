// js/artists.js
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector("#artistsGrid");
  if (!grid || !window.ARTISTS) return;

  const esc = (s = "") =>
    String(s).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[c]));

  grid.innerHTML = window.ARTISTS.map((a) => {
    const kw = (a.keywords || []).slice(0, 3).map(escapeHTML).join(" · ");
    return `
      <article class="artistCard">
        <a class="artistCardLink" href="artist.html?slug=${encodeURIComponent(a.slug)}">
          <div class="artistThumb" style="background-image:url('${escapeHTML(a.image)}')"></div>
          <div class="artistPad">
            <div class="artistTop">
              <h3 class="artistName">${a.name}</h3>
              <span class="artistRole">${escapeHTML(a.role || "")}</span>
            </div>
            <p class="artistBio">${escapeHTML(a.cardBio || "")}</p>
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

