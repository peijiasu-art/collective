// js/work.js
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(location.search);
  const slug = params.get("slug");
  if (!slug || !Array.isArray(window.WORKS)) return;

  const work = window.WORKS.find(w => w && w.slug === slug);
  if (!work) return;

  const hero = document.querySelector("#workHeroMedia");
  const titleEl = document.querySelector("#workTitle");
  const artistEl = document.querySelector("#workArtist");
  const yearEl = document.querySelector("#workYear");
  const mediumEl = document.querySelector("#workMedium");
  const sizeEl = document.querySelector("#workSize");
  const bodyEl = document.querySelector("#workBody");

  const escapeHTML = (s = "") =>
    String(s).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[c]));

  const safeWithBR = (s = "") => {
    const str = String(s);
    const keepBR = str.replace(/<br\s*\/?>/gi, "___BR___");
    const escaped = escapeHTML(keepBR);
    return escaped.replace(/___BR___/g, "<br>");
  };

  // 做法A：把純文字的換行分段 -> <p>
  const textToParagraphs = (text = "") => {
    const raw = String(text).trim();
    if (!raw) return "";

    // 以「空行」切段：兩個以上換行視為新段落
    const paras = raw.split(/\n\s*\n+/g).map(p => p.trim()).filter(Boolean);

    return paras.map(p => `<p>${escapeHTML(p)}</p>`).join("");
  };

  // title for document (去掉 br / html)
  const plainTitle = String(work.title || "").replace(/<br\s*\/?>/gi, " ").replace(/<[^>]*>/g, "").trim();
  document.title = `${plainTitle}｜作品｜Student Art Collective`;

  if (hero) {
    const img = work.image || "";
    hero.style.backgroundImage =
      `linear-gradient(180deg, rgba(0,0,0,.18), rgba(0,0,0,.38)), url('${img}')`;
  }

  if (titleEl) titleEl.innerHTML = safeWithBR(work.title || "");
  if (artistEl) artistEl.innerHTML = safeWithBR(work.artist || "");
  if (yearEl) yearEl.textContent = work.year || "—";
  if (mediumEl) mediumEl.textContent = work.medium || "—";
  if (sizeEl) sizeEl.textContent = work.size || "—";

  const intro = work.detail && work.detail.intro ? work.detail.intro : (work.cardBio || "");
  if (bodyEl) bodyEl.innerHTML = textToParagraphs(intro);
});
