// js/works.js
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("worksGrid");
  if (!grid || !window.WORKS) return;

  const escapeHtml = (s="") =>
    String(s).replace(/[&<>"']/g, (m) => ({
      "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;"
    }[m]));

  grid.innerHTML = window.WORKS.map((w) => {
    const title = escapeHtml(w.title);
    const artist = escapeHtml(w.artist);
    const year = escapeHtml(w.year);
    const medium = escapeHtml(w.medium);
    const size = escapeHtml(w.size);
    const cover = escapeHtml(w.cover);

    return `
      <article class="workCardItem">
        <a class="workCardLink" href="work.html?id=${encodeURIComponent(w.id)}" aria-label="查看作品：${title}">
          <div class="workThumb" style="background-image:url('${cover}')"></div>

          <div class="workPad">
            <div class="workTop">
              <h3 class="workName">${title}</h3>
              <span class="workBadge">${artist}</span>
            </div>

            <p class="workSub">${year}｜${medium}｜${size}</p>

            <div class="workMeta">
              <span>點進去看詳細</span>
              <span class="workMore">→</span>
            </div>
          </div>
        </a>
      </article>
    `;
  }).join("");
});
