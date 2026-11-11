// Fase 2 — Operação Discrição: pessoas patrulham com cone de visão.
// Arbustos (H) escondem. Os DOIS personagens precisam chegar ao esconderijo.
const VIS_R = 58, VIS_HALF = Math.PI * 0.2;

class StealthSystem {
  constructor(scene, phase) {
    this.s = scene; this.phase = phase; this.grace = 0; this.over = false;
    this.g = scene.add.graphics().setDepth(400);
    this.people = phase.patrols.map((pt, i) => ({
      ch: new Character(scene, 'p' + (i % PEOPLE.length), pt.path[0][0] * T + 8, pt.path[0][1] * T + 8),
      path: pt.path, i: 1 % pt.path.length, speed: pt.speed || 26, a: 0
    }));
    // goal marker
    const gl = phase.goal;
    scene.add.rectangle(gl.tx * T + 8, gl.ty * T + 8, 20, 20, 0xff6b9a, .25).setDepth(5);
    scene.add.image(gl.tx * T + 8, gl.ty * T + 8, 'heart').setDepth(6).setAlpha(.7);
  }

  hidden(c) { return this.s.charAt(c.x, c.y - 2) == 'H'; }

  sees(p, c) {
    if (this.hidden(c)) return false;
    const px = p.ch.x, py = p.ch.y - 6, dx = c.x - px, dy = c.y - 6 - py, d = Math.hypot(dx, dy);
    if (d > VIS_R) return false;
    let diff = Math.abs(Math.atan2(dy, dx) - p.a); if (diff > Math.PI) diff = 2 * Math.PI - diff;
    if (diff > VIS_HALF) return false;
    for (let t = .1; t < 1; t += .1) if (this.s.solidAt(px + dx * t, py + dy * t)) return false; // linha de visão
    return true;
  }

  update(dt, chars) {
    this.g.clear(); this.grace = Math.max(0, this.grace - dt);
    for (const p of this.people) {
      const c = p.ch, [tx, ty] = p.path[p.i], gx = tx * T + 8, gy = ty * T + 8;
      const dx = gx - c.x, dy = gy - c.y, d = Math.hypot(dx, dy), st = p.speed * dt / 1000;
      if (d <= st) { c.x = gx; c.y = gy; p.i = (p.i + 1) % p.path.length; }
      else { c.x += dx / d * st; c.y += dy / d * st; c.dir = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up'); }
      c.step(dt, true); c.render();
      p.a = { right: 0, down: Math.PI / 2, left: Math.PI, up: -Math.PI / 2 }[c.dir];
      this.g.fillStyle(0xffe066, this.grace > 0 ? .08 : .25);
      this.g.slice(c.x, c.y - 6, VIS_R, p.a - VIS_HALF, p.a + VIS_HALF); this.g.fillPath();
    }
    if (this.grace > 0 || this.over) return;
    for (const p of this.people) for (const c of chars) if (this.sees(p, c)) return this.caught(p);
    const gl = this.phase.goal, gx = gl.tx * T + 8, gy = gl.ty * T + 8;
    if (chars.every(c => Math.hypot(c.x - gx, c.y - gy) < 28)) this.reached();
  }

  caught(p) {
    const s = this.s; s.state = 'busy'; UI.prompt(false);
    const t = s.add.text(p.ch.x - 3, p.ch.y - 32, '!', { fontFamily: 'monospace', fontSize: '16px', color: '#ff4d4d', fontStyle: 'bold' }).setDepth(2000);
    s.time.delayedCall(800, () => {
      t.destroy();
      const l = DIALOGUES.caught; s.dialogue.show(l[Math.floor(Math.random() * l.length)], () => {
        s.resetPositions(); s.state = 'play'; this.grace = 1500;
      });
    });
  }

  reached() {
    const s = this.s; this.over = true; s.state = 'busy';
    s.dialogue.show(DIALOGUES.p2_win, () => { s.state = 'play'; s.finishPhase(); });
  }
}
