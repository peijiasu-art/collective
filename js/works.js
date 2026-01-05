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

  // 卡片允許 artist/title 內有 <br>，所以我們做一個「安全的 br 允許版」
  const safeWithBR = (s = "") => {
    const str = String(s);
    // 先暫時保留 <br>
    const keepBR = str.replace(/<br\s*\/?>/gi, "___BR___");
    // 其他都 escape
    const escaped = escapeHTML(keepBR);
    // 再還原 <br>
    return escaped.replace(/___BR___/g, "<br>");
  };

  grid.innerHTML = window.WORKS.map((w) => {
    const title = safeWithBR(w.title || "");
    const artist = safeWithBR(w.artist || "");
    const year = escapeHTML(w.year || "");
    const medium = escapeHTML(w.medium || "");
    const size = escapeHTML(w.size || "—");
    const img = escapeHTML(w.image || "");
    const cardBio = escapeHTML(w.cardBio || "");

    return `
      <article class="workCardItem" role="article">
        <a class="workCardLink" href="work.html?slug=${encodeURIComponent(w.slug)}" aria-label="前往 ${escapeHTML(w.title || "")} 的作品頁">
          <div class="workThumb" style="background-image:url('${img}')"></div>

          <div class="workPad">
            <div class="workTop">
              <h3 class="workName">${title}</h3>
              <span class="workBadge">${year}</span>
            </div>

            <p class="workArtist">${artist}</p>

            <div class="workSpecs">
              <span class="specPill">${medium}</span>
              <span class="specPill">${size}</span>
            </div>

            <p class="workSub">${cardBio}</p>

            <div class="workMeta">
              <span class="workMore">閱讀更多 →</span>
            </div>
          </div>
        </a>
      </article>
    `;
  }).join("");
});
