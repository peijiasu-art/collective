document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(location.search);
  const slug = params.get("slug");
  if (!slug || !window.ARTISTS) return;

  const artist = window.ARTISTS.find(a => a.slug === slug);
  if (!artist) return;

  const hero = document.querySelector("#artistHero");
  const nameEl = document.querySelector("#artistName");
  const roleEl = document.querySelector("#artistRole");
  const bioEl  = document.querySelector("#artistBio");
  const kwEl   = document.querySelector("#artistKeywords");

  document.title = `${artist.name}｜藝術家｜Student Art Collective`;

  if (hero) {
    hero.style.backgroundImage =
      `linear-gradient(180deg, rgba(0,0,0,.18), rgba(0,0,0,.38)), url('${artist.image}')`;
  }

  if (nameEl) nameEl.textContent = artist.name || "";
  if (roleEl) roleEl.textContent = artist.role || "";
  if (bioEl) bioEl.textContent = artist.bio || "";

  if (kwEl) {
    kwEl.innerHTML = (artist.keywords || []).map(k => `<span class="kwPill">${k}</span>`).join("");
  }
});
