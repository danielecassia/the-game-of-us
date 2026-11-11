// Progresso salvo no navegador (localStorage).
const Progress = {
  key: 'the-game-of-us-v2',
  state: { unlocked: 1, completed: [], hearts: [], items: [] },
  load() { try { const s = JSON.parse(localStorage.getItem(this.key) || 'null'); if (s) this.state = s; } catch (e) {} },
  save() { try { localStorage.setItem(this.key, JSON.stringify(this.state)); } catch (e) {} },
  reset() { this.state = { unlocked: 1, completed: [], hearts: [], items: [] }; this.save(); },
  hasStarted() { const s = this.state; return s.completed.length || s.hearts.length || s.items.length; },
  completePhase(id) {
    if (!this.state.completed.includes(id)) this.state.completed.push(id);
    this.state.unlocked = Math.max(this.state.unlocked, Math.min(id + 1, PHASES.length));
    this.save();
  },
  allDone() { return this.state.completed.length >= PHASES.length; }
};
