// Helpers de interface em DOM (painéis, HUD, prompt).
const $ = id => document.getElementById(id);
const UI = {
  panel(html) { const u = $('ui'); u.innerHTML = '<div class="overlay">' + html + '</div>'; return u; },
  clear() { $('ui').innerHTML = ''; },
  on(id, fn) { const e = $(id); if (e) e.onclick = fn; },
  hud(show) { $('mission').style.display = $('hearts').style.display = show ? 'block' : 'none';
    if (!show) { $('prompt').style.display = 'none'; $('dialog').style.display = 'none'; } },
  setHud(mission, hearts) { $('mission').textContent = mission; $('hearts').textContent = hearts; },
  prompt(show) { $('prompt').style.display = show ? 'block' : 'none'; }
};
