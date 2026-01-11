// js/artists.js
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector("#artistsGrid");
  if (!grid || !Array.isArray(window.ARTISTS)) return;

  const escapeHTML = (s = "") =>
    String(s).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[c]));

  // ✅ 允許 <br>（英文/中文分行）
  const safeWithBR = (s = "") => {
    const str = String(s);
    const keepBR = str.replace(/<br\s*\/?>/gi, "___BR___");
    const escaped = escapeHTML(keepBR);
    return escaped.replace(/___BR___/g, "<br>");
  };

  grid.innerHTML = window.ARTISTS.map((a) => {
    const kw = (a.keywords || []).slice(0, 3).map(escapeHTML).join(" · ");

    // ✅ 卡片圖只吃 cardImage（避免跟詳細頁混用）
    const cardImg = escapeHTML(a.cardImage || "");

    // ✅ 卡片短文只吃 cardBio
    const cardBio = escapeHTML(a.cardBio || "");

    // aria label 用純文字（去掉 <br>）
    const plainName = String(a.name || "")
      .replace(/<br\s*\/?>/gi, " ")
      .replace(/<[^>]*>/g, "")
      .trim();

    return `
      <article class="artistCard" role="article">
        <a class="artistCardLink" href="artist.html?slug=${encodeURIComponent(a.slug)}" aria-label="前往 ${escapeHTML(plainName)} 的介紹頁">
          <div class="artistThumb" style="background-image:url('${cardImg}')"></div>

          <div class="artistPad">
            <div class="artistTop">
              <h3 class="artistName">${safeWithBR(a.name || "")}</h3>
              <span class="artistRole">${escapeHTML(a.role || "")}</span>
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
