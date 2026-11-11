// Missão principal da fase: coletar todos os itens em phase.need.
class QuestSystem {
  constructor(phase) { this.phase = phase; }
  k(id) { return this.phase.id + ':' + id; }
  has(id) { return Progress.state.items.includes(this.k(id)); }
  give(id) { if (!this.has(id)) { Progress.state.items.push(this.k(id)); Progress.save(); return true; } return false; }
  count() { return this.phase.need.filter(i => this.has(i)).length; }
  done() { return this.count() >= this.phase.need.length; }
  label() { return `Missão: ${this.phase.quest} (${this.count()}/${this.phase.need.length})`; }
}
