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

  // 允許 <br>（但這裡 title 通常不需要）
  const safeWithBR = (s = "") => {
    const str = String(s);
    const keepBR = str.replace(/<br\s*\/?>/gi, "___BR___");
    const escaped = escapeHTML(keepBR);
    return escaped.replace(/___BR___/g, "<br>");
  };

  grid.innerHTML = window.WORKS.map((w) => {
    const title = safeWithBR(w.title || "");
    const medium = escapeHTML(w.medium || "—");
    const size = escapeHTML(w.size || "—");
    const year = escapeHTML(w.year || "—");
    const img = escapeHTML(w.image || "");

    // 顯示：名稱｜媒材｜大小｜年份
    const metaLine = `${medium}｜${size}｜${year}`;

    return `
      <article class="workCardItem" role="article">
        <a class="workCardLink" href="work.html?slug=${encodeURIComponent(w.slug)}" aria-label="前往 ${escapeHTML(w.title || "")} 的作品頁">
          <div class="workThumb" style="background-image:url('${img}')"></div>

          <div class="workPad">
            <h3 class="workName">${title}</h3>
            <p class="workLine">${escapeHTML(metaLine)}</p>
            <div class="workMeta">
              <span class="workMore">點擊了解更多 →</span>
            </div>
          </div>
        </a>
      </article>
    `;
  }).join("");
});

