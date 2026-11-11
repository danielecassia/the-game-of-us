// Fase 3: juntar ingredientes e preparar o bolo no minigame (systems/CakeMinigame.js)
class Phase3Scene extends GameScene {
  constructor() { super('Phase3Scene', 2); }
  hudText() {
    return this.quest.done() ? 'Missão: preparar o bolo no forno!'
      : `Missão: juntar os ingredientes (${this.quest.count()}/${this.P.need.length})`;
  }
  onQuestComplete() { this.dialogue.show(DIALOGUES.p3_all); }
  handle(o) {
    if (o.action != 'cake') return false;
    if (!this.quest.done()) { this.dialogue.show(`${DIALOGUES.p3_missing} (${this.quest.count()}/${this.P.need.length})`); return true; }
    this.state = 'busy'; UI.prompt(false);
    new CakeMinigame(() => { this.state = 'play'; this.finishPhase(); }).start();
    return true;
  }
}
