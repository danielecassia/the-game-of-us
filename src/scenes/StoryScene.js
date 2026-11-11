// Tela de introdução narrativa de cada fase.
class StoryScene extends Phaser.Scene {
  constructor() { super('StoryScene'); }
  init(d) { this.idx = d.idx || 0; }
  create() {
    const p = PHASES[this.idx];
    UI.hud(false);
    UI.panel(`<h1>${p.title}</h1><h2>${p.subtitle}</h2><p>${p.intro}</p>
      <button id="go">Pressione ENTER</button>`);
    const start = () => { UI.clear(); this.scene.start(p.key); };
    UI.on('go', start);
    this.input.keyboard.once('keydown-ENTER', start);
  }
}
