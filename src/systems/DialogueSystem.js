// Caixa de diálogo inferior. Avance com E/Espaço (a cena chama advance()).
class DialogueSystem {
  constructor() { this.el = $('dialog'); this.q = null; }
  get isOpen() { return !!this.q; }
  show(lines, cb) { this.q = { lines: [].concat(lines), i: 0, cb }; this.render(); }
  render() { this.el.innerHTML = this.q.lines[this.q.i] + '<small>E ▶</small>'; this.el.style.display = 'block'; }
  advance() {
    if (!this.q) return;
    this.q.i++;
    if (this.q.i < this.q.lines.length) return this.render();
    const cb = this.q.cb; this.q = null; this.el.style.display = 'none'; if (cb) cb();
  }
}
