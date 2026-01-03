// js/work.js
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(location.search);
  const id = params.get("id");

  const w = (window.WORKS || []).find(x => x.id === id);

  // DOM
  const navTitle = document.getElementById("workNavTitle");
  const hero = document.getElementById("workHeroMedia");
  const title = document.getElementById("workTitle");
  const artist = document.getElementById("workArtist");
  const year = document.getElementById("workYear");
  const medium = document.getElementById("workMedium");
  const size = document.getElementById("workSize");
  const body = document.getElementById("workBody");

  const setText = (el, val) => { if (el) el.textContent = val ?? ""; };

  if (!w) {
    setText(navTitle, "找不到作品");
    setText(title, "找不到作品");
    if (body) body.innerHTML = `<p>作品不存在或連結錯誤。請回到作品列表重新選擇。</p>`;
    return;
  }

  document.title = `${w.title}｜Student Art Collective`;

  setText(navTitle, w.title);
  setText(title, w.title);
  setText(artist, w.artist);
  setText(year, w.year);
  setText(medium, w.medium);
  setText(size, w.size);

  if (hero) {
    hero.style.backgroundImage = `url('${w.hero || w.cover}')`;
  }

  if (body) {
    const paras = (w.desc || []).map(t => `<p>${t}</p>`).join("");
    body.innerHTML = paras || "<p>（尚未提供作品敘述）</p>";
  }
});
