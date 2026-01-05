// js/artist.js
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(location.search);
  const slug = params.get("slug");
  if (!slug || !Array.isArray(window.ARTISTS)) return;

  const artist = window.ARTISTS.find(a => a && a.slug === slug);
  if (!artist) return;

  const hero = document.querySelector("#artistHero");
  const nameEl = document.querySelector("#artistName");
  const roleEl = document.querySelector("#artistRole");
  const bioEl  = document.querySelector("#artistBio");
  const kwEl   = document.querySelector("#artistKeywords");

  // 把 <br> 去掉做 title
  const plainName = String(artist.name || "").replace(/<br\s*\/?>/gi, " ").replace(/<[^>]*>/g, "").trim();
  document.title = `${plainName}｜藝術家｜Student Art Collective`;

  if (hero) {
    hero.style.backgroundImage =
      `linear-gradient(180deg, rgba(0,0,0,.18), rgba(0,0,0,.38)), url('${artist.image || ""}')`;
  }

  // ✅ 讓名字可以換行（支援 <br>）
  if (nameEl) nameEl.innerHTML = artist.name || "";

  if (roleEl) roleEl.textContent = artist.role || "";

  // ✅ 詳細內容：優先用 detail.intro
  const detailIntro = artist.detail && artist.detail.intro ? artist.detail.intro : "";
  if (bioEl) bioEl.textContent = detailIntro || artist.cardBio || "";

  if (kwEl) {
    kwEl.innerHTML = (artist.keywords || [])
      .map(k => `<span class="kwPill">${String(k)}</span>`)
      .join("");
  }
});
