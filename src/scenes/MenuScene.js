// Menu inicial + tela de capítulos.
class MenuScene extends Phaser.Scene {
  constructor() { super('MenuScene'); }
  create() { UI.hud(false); this.main(); }
  go(idx) { UI.clear(); this.scene.start('StoryScene', { idx }); }
  main() {
    const s = Progress.state;
    UI.panel(`<h1>THE GAME OF US</h1>
      <p>Uma aventura, duas pessoas e muitas memórias.</p>
      <button id="new">Novo jogo</button>
      <button id="cont" ${Progress.hasStarted() ? '' : 'disabled'}>Continuar</button>
      <button id="chap">Capítulos</button>
      <p>WASD/setas: andar · E/Espaço: interagir<br>Q/Tab: alternar Dani e Bê · Esc: pausa</p>`);
    UI.on('new', () => { Progress.reset(); this.go(0); });
    UI.on('cont', () => this.go(Math.min(s.unlocked, PHASES.length) - 1));
    UI.on('chap', () => this.chapters());
  }
  chapters() {
    const s = Progress.state;
    const rows = PHASES.map((p, i) => {
      const ok = p.id <= s.unlocked, done = s.completed.includes(p.id);
      const hearts = p.hearts.filter(h => s.hearts.includes(h.id)).length;
      return `<button id="c${i}" ${ok ? '' : 'disabled'}>${ok ? '' : '🔒 '}${p.title}<br>
        <span class="${done ? 'done' : ''}">${done ? '✔ Concluída' : ok ? 'Disponível' : 'Bloqueada'} · ♥ ${hearts}/${p.hearts.length}</span></button>`;
    }).join('');
    UI.panel(`<h2>Capítulos</h2><div class="chapters">${rows}</div><button id="back">Voltar</button>`);
    PHASES.forEach((p, i) => UI.on('c' + i, () => this.go(i)));
    UI.on('back', () => this.main());
  }
}
