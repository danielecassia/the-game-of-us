// Final: TO BE CONTINUED... + carta (só abre depois de concluir tudo).
class EndingScene extends Phaser.Scene {
  constructor() { super('EndingScene'); }
  create() {
    UI.hud(false); this.cameras.main.fadeIn(800);
    const unlocked = Progress.allDone();
    UI.panel(`<h1>${FINAL.title}</h1><p>${FINAL.message}</p><h2>${FINAL.signature}</h2>
      <button id="letter" ${unlocked ? '' : 'disabled'}>${unlocked ? '💌 Abrir a carta' : '🔒 Carta bloqueada'}</button>
      <button id="menu">Voltar ao menu</button>`);
    UI.on('letter', () => {
      UI.panel(`<div class="letter">${FINAL.letter.replace(/</g, '&lt;')}</div><button id="back">Voltar</button>`);
      UI.on('back', () => this.create());
    });
    UI.on('menu', () => { UI.clear(); this.scene.start('MenuScene'); });
  }
}
