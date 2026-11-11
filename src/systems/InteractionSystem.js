// Encontra o objeto interativo mais próximo do personagem.
class InteractionSystem {
  constructor(list, reach = 26) { this.list = list; this.reach = reach; }
  nearest(x, y) {
    let best = null, bd = this.reach;
    for (const o of this.list) {
      const d = Math.hypot(x - (o.tx * T + 8), y - (o.ty * T + 8));
      if (d < bd) { bd = d; best = o; }
    }
    return best;
  }
}
