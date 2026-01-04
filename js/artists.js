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
    const kw = (a.keywords || []).slice(0, 3).map(esc).join(" · ");
    const safeNameHTML = String(a.name || ""); // 允許 <br>（你如果不想用 <br> 就直接存純文字）
    return `
      <article class="artistCard">
        <a class="artistCardLink" href="artist.html?slug=${encodeURIComponent(a.slug)}" aria-label="前往 ${esc(a.name)} 的介紹頁">
          <div class="artistThumb" style="background-image:url('${esc(a.image)}')"></div>
          <div class="artistPad">
            <div class="artistTop">
              <h3 class="artistName">${safeNameHTML}</h3>
              <span class="artistRole">${esc(a.role || "")}</span>
            </div>
            <p class="artistBio">${esc(a.cardBio || "")}</p>
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

