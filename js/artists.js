document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector("#artistsGrid");
  if (!grid || !window.ARTISTS) return;

  // 只轉義一般文字（避免 XSS）
  const escapeHTML = (s = "") =>
    String(s).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[c]));

  // 允許 <br> 換行（其他照樣轉義）
  // 你 data 裡如果用 <br>，就用這個來輸出 name
  const escapeAllowBR = (s = "") => {
    const token = "__BR__TOKEN__";
    return escapeHTML(String(s).replace(/<br\s*\/?>/gi, token)).replaceAll(token, "<br>");
  };

  grid.innerHTML = window.ARTISTS.map((a) => {
    const kw = (a.keywords || []).slice(0, 3).map(escapeHTML).join(" · ");

    // ✅ 卡片短介紹：優先用 cardBio，沒有就退回 bio
    const cardBio = a.cardBio ?? a.bio ?? "";

    return `
      <article class="artistCard" role="article">
        <a class="artistCardLink"
           href="artist.html?slug=${encodeURIComponent(a.slug)}"
           aria-label="前往 ${escapeHTML(a.name)} 的介紹頁">
          <div class="artistThumb" style="background-image:url('${escapeHTML(a.image)}')"></div>
          <div class="artistPad">
            <div class="artistTop">
              <!-- ✅ 這裡改成允許 <br> -->
              <h3 class="artistName">${escapeAllowBR(a.name)}</h3>
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
