// Fase 4 — lista de compras (mercado) e guardar compras (casa).
const PLACES = { fridge: 'geladeira', pantry: 'despensa', cabinet: 'armário' };
const DECOYS = { chocolate: 'Chocolate', miojo: 'Miojo' };

class ShoppingSystem {
  constructor(phase) { this.list = phase.list; }
  k(t, id) { return `4:${t}:${id}`; }
  bought(id) { return Progress.state.items.includes(this.k('buy', id)); }
  stored(id) { return Progress.state.items.includes(this.k('store', id)); }
  entry(id) { return this.list.find(i => i.id == id); }
  allBought() { return this.list.every(i => this.bought(i.id)); }
  allStored() { return this.list.every(i => this.stored(i.id)); }
  buy(id) { Progress.state.items.push(this.k('buy', id)); Progress.save(); }
  storeAt(place) { // guarda tudo que pertence a este lugar; devolve os nomes
    const mine = this.list.filter(i => i.place == place && this.bought(i.id) && !this.stored(i.id));
    mine.forEach(i => Progress.state.items.push(this.k('store', i.id)));
    if (mine.length) Progress.save();
    return mine.map(i => i.name);
  }
  hud() {
    if (!this.allBought()) return 'Lista de compras:\n' + this.list.map(i => (this.bought(i.id) ? '✔ ' : '☐ ') + i.name).join('\n');
    return 'Guardar as compras:\n' + this.list.map(i => (this.stored(i.id) ? '✔ ' : '☐ ') + i.name + ' → ' + PLACES[i.place]).join('\n');
  }
}
