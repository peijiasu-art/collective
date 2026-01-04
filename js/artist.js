document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(location.search);
  const slug = params.get("slug");
  if (!slug || !window.ARTISTS) return;

  const artist = window.ARTISTS.find(a => a.slug === slug);
  if (!artist) return;

  const hero = document.querySelector("#artistHero");
  const nameEl = document.querySelector("#artistName");
  const roleEl = document.querySelector("#artistRole");
  const bioEl  = document.querySelector("#artistBio");        // 簡介
  const detailEl = document.querySelector("#artistDetail");  // ⭐ 詳細內容
  const kwEl   = document.querySelector("#artistKeywords");

  // 分頁標題
  document.title = `${artist.name.replace(/<br\s*\/?>/g, " ")}｜藝術家｜Student Art Collective`;

  // Hero 圖
  if (hero) {
    hero.style.backgroundImage =
      `linear-gradient(180deg, rgba(0,0,0,.18), rgba(0,0,0,.38)), url('${artist.image}')`;
  }

  // ⭐ 允許 name 使用 <br>
  if (nameEl) nameEl.innerHTML = artist.name || "";

  if (roleEl) roleEl.textContent = artist.role || "";

  // 簡短介紹（卡片用的那段）
  if (bioEl) bioEl.textContent = artist.bio || "";

  // ⭐⭐⭐ 這行就是你要的重點：每個藝術家不同的詳細內容
  if (detailEl) {
    detailEl.innerHTML = (artist.detail || "")
      .trim()
      .split("\n")
      .map(p => `<p>${p.trim()}</p>`)
      .join("");
  }

  // 關鍵字（你已設定在詳細頁隱藏，這裡留著不影響）
  if (kwEl) {
    kwEl.innerHTML = (artist.keywords || [])
      .map(k => `<span class="kwPill">${k}</span>`)
      .join("");
  }
});
