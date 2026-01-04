document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector("#artistsGrid");
  if (!grid || !window.ARTISTS) return;

  const escapeHTML = (s = "") =>
    String(s).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[c]));

  grid.innerHTML = window.ARTISTS.map((a) => {
    const kw = (a.keywords || []).slice(0, 3).map(escapeHTML).join(" · ");

    // ✅ 你現在用的是 cardBio；也兼容舊的 bio
    const cardBio = a.cardBio ?? a.bio ?? "";

    return `
      <article class="artistCard" role="article">
        <a class="artistCardLink" href="artist.html?slug=${encodeURIComponent(a.slug)}"
           aria-label="前往 ${escapeHTML(a.name.replace(/<br\s*\/?>/g, " "))} 的介紹頁">
          <div class="artistThumb" style="background-image:url('${escapeHTML(a.image)}')"></div>
          <div class="artistPad">
            <div class="artistTop">
              <h3 class="artistName">${a.name || ""}</h3>
              <span class="artistRole">${escapeHTML(a.role || "")}</span>
            </div>
            <p class="artistBio">${escapeHTML(cardBio)}</p>
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
