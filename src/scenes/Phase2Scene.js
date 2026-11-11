// Fase 2: Operação Discrição (furtividade) — veja systems/StealthSystem.js
class Phase2Scene extends GameScene {
  constructor() { super('Phase2Scene', 1); }
  setup() { this.stealth = new StealthSystem(this, this.P); }
  hudText() { return 'Missão: levar os dois ao esconderijo sem ser visto'; }
  tick(dt, L, F) { this.stealth.update(dt, [L, F]); }
}
