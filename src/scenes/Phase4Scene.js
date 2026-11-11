// Fase 4: lista de compras no mercado + guardar tudo em casa (systems/ShoppingSystem.js)
class Phase4Scene extends GameScene {
  constructor() { super('Phase4Scene', 3); }
  setup() { this.shop = new ShoppingSystem(this.P); }
  hudText() { return this.shop.hud(); }
  handle(o) {
    const sh = this.shop, d = this.dialogue;
    if (o.item) {
      const it = sh.entry(o.item);
      if (!it) { d.show(`<b>${DECOYS[o.item]}</b><br>Isso não está na lista! (Mas parece bom...)`); return true; }
      if (sh.bought(o.item)) { d.show(DIALOGUES.already); return true; }
      sh.buy(o.item); this.refreshHud();
      d.show(`<b>${it.name}</b> na cesta! ✔`, () => { if (sh.allBought()) d.show(DIALOGUES.p4_gostore); });
      return true;
    }
    if (o.place) {
      if (!sh.allBought()) { d.show(DIALOGUES.p4_first); return true; }
      const names = sh.storeAt(o.place); this.refreshHud();
      if (!names.length) { d.show(DIALOGUES.p4_nothing); return true; }
      d.show(`Guardado na ${PLACES[o.place]}: <b>${names.join(', ')}</b>`, () => { if (sh.allStored()) this.finishPhase(); });
      return true;
    }
    return false;
  }
}
