// js/works.js
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector("#worksGrid");
  if (!grid || !Array.isArray(window.WORKS)) return;

  const escapeHTML = (s = "") =>
    String(s).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[c]));

  grid.innerHTML = window.WORKS.map((w) => {
    const title = escapeHTML(w.title || "");
    const artist = escapeHTML(w.artist || "");
    const year = escapeHTML(w.year || "");
    const medium = escapeHTML(w.medium || "");
    const size = escapeHTML(w.size || "");
    const thumb = escapeHTML(w.thumb || (w.images && w.images[0]) || "");

    return `
      <article class="workCardItem" role="article">
        <a class="workCardLink" href="work.html?slug=${encodeURIComponent(w.slug)}" aria-label="前往 ${title} 作品介紹頁">
          <div class="workThumb" style="background-image:url('${thumb}')"></div>

          <div class="workPad">
            <div class="workTop">
              <h3 class="workName">${title}</h3>
              <span class="workBadge">${year}</span>
            </div>

            <p class="workSub">
              ${artist}<br>
              ${medium}<br>
              ${size}
            </p>

            <div class="workMeta">
              <span></span>
              <span class="workMore">點擊了解更多 →</span>
            </div>
          </div>
        </a>
      </article>
    `;
  }).join("");
});


