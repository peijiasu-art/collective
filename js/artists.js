document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector("#artistsGrid");
  if (!grid || !window.ARTISTS) return;

  const escapeHTML = (s = "") =>
    s.replace(/[&<>"']/g, (c) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[c]));

  grid.innerHTML = window.ARTISTS.map((a) => {
    const kw = (a.keywords || []).slice(0, 3).map(escapeHTML).join(" · ");
    return `
      <article class="artistCard" role="article">
        <a class="artistCardLink" href="artist.html?slug=${encodeURIComponent(a.slug)}" aria-label="前往 ${escapeHTML(a.name)} 的介紹頁">
          <div class="artistThumb" style="background-image:url('${escapeHTML(a.image)}')"></div>
          <div class="artistPad">
            <div class="artistTop">
              <h3 class="artistName">${escapeHTML(a.name)}</h3>
              <span class="artistRole">${escapeHTML(a.role || "")}</span>
            </div>
            <p class="artistBio">${escapeHTML(a.bio || "")}</p>
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
