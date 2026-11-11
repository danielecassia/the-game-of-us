// Corações colecionáveis: abrem uma memória, não bloqueiam o avanço.
class CollectibleSystem {
  constructor(scene, hearts) {
    this.hearts = hearts.map(h => {
      if (Progress.state.hearts.includes(h.id)) return { h, s: null };
      const s = scene.add.image(h.tx * T + 8, h.ty * T + 8, 'heart').setDepth(500);
      scene.tweens.add({ targets: s, y: s.y - 3, yoyo: true, repeat: -1, duration: 600 });
      return { h, s };
    });
  }
  pick(x, y) {
    for (const e of this.hearts) {
      if (e.s && Math.hypot(x - e.s.x, y - e.s.y) < 10) {
        e.s.destroy(); e.s = null;
        Progress.state.hearts.push(e.h.id); Progress.save();
        return e.h;
      }
    }
    return null;
  }
  total(phase) { return phase.hearts.filter(h => Progress.state.hearts.includes(h.id)).length; }
}
