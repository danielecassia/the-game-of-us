// Cena base orientada a dados. Cada FaseNScene informa o índice e pode sobrescrever:
//   setup()  – cria sistemas da fase     tick(dt,L,F) – lógica por frame
//   handle(o) – interações especiais     hudText()    – texto da missão
//   onQuestComplete() – ao completar a missão padrão
const SOLID = '#BVKFSTPDCOELMU';

function drawTile(c, ch, x, y, th) {
  const px = x * T, py = y * T;
  R(c, px, py, T, T, (x + y) % 2 ? th.floor[0] : th.floor[1]);
  const r = (a, b, w, h, col) => R(c, px + a, py + b, w, h, col);
  switch (ch) {
    case '#': r(0, 0, T, T, th.wall); r(0, T - 3, T, 3, 'rgba(0,0,0,.25)'); break;
    case 'B': r(0, 0, T, T, th.wall); r(1, 2, 14, 10, '#f4f1ea'); r(3, 4, 6, 1, '#e0556a'); r(3, 7, 9, 1, '#3a86c8'); r(3, 9, 5, 1, '#3fa65a'); break;
    case 'V': r(0, 0, T, T, '#2a2a33'); r(1, 2, 14, 10, '#6a8fd8'); r(2, 3, 5, 2, '#a9c4f5'); break;
    case 'K': r(0, 0, T, T, '#8d95a3'); r(0, 2, T, 12, '#cfd4dc'); r(2, 5, 5, 3, '#a8b0bd'); break;
    case 'F': r(0, 0, T, T, '#e8eef5'); r(0, 7, T, 1, '#9aa5b5'); r(11, 2, 2, 4, '#7a8596'); r(11, 9, 2, 4, '#7a8596'); break;
    case 'O': r(0, 0, T, T, '#4a4f5c'); r(2, 3, 12, 10, '#2b2e36'); r(3, 5, 10, 6, '#ff9a3c'); r(3, 1, 2, 1, '#ddd'); r(7, 1, 2, 1, '#ddd'); break;
    case 'U': r(0, 0, T, T, '#9b7653'); r(1, 1, 14, 14, '#b58a62'); r(7, 6, 2, 4, '#e8d8b8'); break;
    case 'S': r(0, 3, T, 11, '#b24a5d'); r(1, 5, 14, 7, '#d4687c'); r(0, 3, T, 2, '#8c3547'); break;
    case 'T': r(6, 9, 4, 7, '#6b4423'); r(1, 0, 14, 11, '#2f7d3a'); r(3, 1, 10, 6, '#47a855'); break;
    case 'P': r(4, 9, 8, 6, '#b5542f'); r(3, 2, 10, 8, '#3f9e4f'); r(5, 1, 6, 4, '#56c066'); break;
    case 'D': r(0, 0, T, T, '#a9743f'); r(0, 0, T, 2, '#c48a52'); r(0, T - 2, T, 2, '#7a5028'); break;
    case 'C': r(0, 0, T, T, '#a9743f'); r(0, 0, T, 2, '#c48a52'); r(3, 1, 10, 8, '#222'); r(4, 2, 8, 6, '#6fd3ff'); r(5, 3, 4, 1, '#fff'); r(6, 9, 4, 2, '#222'); break;
    case 'E': r(0, 2, T, 12, '#e8e4f0'); r(0, 7, T, 7, '#6a8fd8'); r(1, 3, 6, 3, '#fff'); break;
    case 'L': r(0, 0, T, T, '#8b5a2b'); r(1, 1, 14, 5, '#c98a4b'); r(1, 9, 14, 5, '#c98a4b');
      r(2, 2, 3, 4, '#e0556a'); r(6, 2, 3, 4, '#3a86c8'); r(10, 2, 3, 4, '#f4c430'); r(2, 10, 4, 4, '#3fa65a'); r(8, 10, 4, 4, '#fff'); break;
    case 'M': r(1, 1, 14, 14, '#7b5233'); r(1, 1, 14, 4, '#4caf50'); r(3, 8, 3, 3, '#5a3d25'); r(9, 9, 3, 3, '#5a3d25'); break;
    case 'R': r(0, 0, T, T, '#c9556b'); r(1, 1, T - 2, T - 2, '#e07a90'); break;
    case 'p': r(0, 0, T, T, '#dccaa0'); r(3, 4, 2, 1, '#c9b78a'); r(10, 11, 2, 1, '#c9b78a'); break;
    case 'H': r(2, 4, 12, 10, '#2a7a3a'); r(4, 2, 8, 6, '#3ea34e'); r(5, 5, 1, 1, '#e0556a'); r(10, 8, 1, 1, '#e0556a'); break;
  }
}

class GameScene extends Phaser.Scene {
  constructor(key, idx) { super(key); this.idx = idx; }
  setup() {} tick() {} handle() { return false; }
  hudText() { return this.quest.label(); }
  onQuestComplete() { this.finishPhase(); }

  create() {
    const P = this.P = PHASES[this.idx];
    this.rows = P.map; this.MW = P.map[0].length; this.MH = P.map.length;
    const mk = 'map' + this.idx;
    if (this.textures.exists(mk)) this.textures.remove(mk);
    const tex = this.textures.createCanvas(mk, this.MW * T, this.MH * T), c = tex.getContext();
    for (let y = 0; y < this.MH; y++) for (let x = 0; x < this.MW; x++) drawTile(c, this.rows[y][x], x, y, P.theme);
    tex.refresh(); this.add.image(0, 0, mk).setOrigin(0);

    // NPCs: sprites parados que bloqueiam o tile e viram interações
    this.blocked = new Set(); const list = P.interactables.slice();
    (P.npcs || []).forEach(n => {
      this.blocked.add(n.tx + ',' + n.ty);
      new Character(this, 'p' + n.pal, n.tx * T + 8, n.ty * T + 8).render();
      list.push({ tx: n.tx, ty: n.ty, say: n.say });
    });

    this.quest = new QuestSystem(P);
    this.dialogue = new DialogueSystem();
    this.inter = new InteractionSystem(list);
    this.collect = new CollectibleSystem(this, P.hearts);
    this.dani = new Character(this, 'dani', P.start[0] * T + 8, P.start[1] * T + 8);
    this.be = new Character(this, 'be', (P.start[0] + 1) * T + 8, P.start[1] * T + 8);
    this.lead = this.dani; this.trail = []; this.state = 'play';
    this.dani.render(); this.be.render();

    const cam = this.cameras.main;
    cam.setBounds(0, 0, this.MW * T, this.MH * T); cam.startFollow(this.dani.sprite, true, .12, .12); cam.roundPixels = true;

    this.keys = this.input.keyboard.addKeys('W,A,S,D,UP,DOWN,LEFT,RIGHT,E,SPACE,Q,TAB,ESC');
    this.input.keyboard.addCapture('TAB,SPACE,UP,DOWN,LEFT,RIGHT');
    this.setup();
    UI.hud(true); this.refreshHud();
    this.events.once('shutdown', () => UI.hud(false));
    cam.fadeIn(500);
    if (P.hint) this.time.delayedCall(700, () => this.dialogue.show('<b>Dica</b><br>' + P.hint));
  }

  refreshHud() { UI.setHud(this.hudText(), `♥ ${this.collect.total(this.P)}/${this.P.hearts.length}`); }

  charAt(px, py) {
    const tx = Math.floor(px / T), ty = Math.floor(py / T);
    return (ty < 0 || tx < 0 || ty >= this.MH || tx >= this.MW) ? '#' : this.rows[ty][tx];
  }
  solidAt(px, py) {
    return SOLID.includes(this.charAt(px, py)) || this.blocked.has(Math.floor(px / T) + ',' + Math.floor(py / T));
  }
  free(x, y) { return ![[-4, 0], [4, 0], [-4, -3], [4, -3]].some(([ox, oy]) => this.solidAt(x + ox, y + oy - .01)); }

  resetPositions() {
    const s = this.P.start;
    Object.assign(this.dani, { x: s[0] * T + 8, y: s[1] * T + 8, dir: 'down', f: 0 });
    Object.assign(this.be, { x: (s[0] + 1) * T + 8, y: s[1] * T + 8, dir: 'down', f: 0 });
    this.trail = []; this.dani.render(); this.be.render();
  }

  update(_, dt) {
    const K = this.keys, J = Phaser.Input.Keyboard.JustDown, act = J(K.E) || J(K.SPACE);
    if (J(K.ESC) && !this.dialogue.isOpen && (this.state == 'play' || this.state == 'pause')) return this.togglePause();
    if (this.dialogue.isOpen) { if (act) this.dialogue.advance(); return; }
    if (this.state != 'play') return;

    const L = this.lead, F = L === this.dani ? this.be : this.dani;
    if (J(K.Q) || J(K.TAB)) { this.lead = F; this.trail = []; this.cameras.main.startFollow(F.sprite, true, .12, .12); return; }

    let dx = (K.D.isDown || K.RIGHT.isDown ? 1 : 0) - (K.A.isDown || K.LEFT.isDown ? 1 : 0);
    let dy = (K.S.isDown || K.DOWN.isDown ? 1 : 0) - (K.W.isDown || K.UP.isDown ? 1 : 0);
    const moving = !!(dx || dy);
    if (moving) {
      const n = Math.hypot(dx, dy), sp = 62 * dt / 1000; dx = dx / n * sp; dy = dy / n * sp;
      if (this.free(L.x + dx, L.y)) L.x += dx;
      if (this.free(L.x, L.y + dy)) L.y += dy;
      L.dir = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up');
      this.trail.push({ x: L.x, y: L.y, dir: L.dir }); if (this.trail.length > 40) this.trail.shift();
    }
    L.step(dt, moving);
    if (this.trail.length > 14) {
      const p = this.trail[this.trail.length - 14], mv = p.x != F.x || p.y != F.y;
      if (mv) F.dir = p.dir; F.x = p.x; F.y = p.y; F.step(dt, mv);
    } else F.step(dt, false);
    L.render(); F.render();

    this.tick(dt, L, F);
    if (this.state != 'play' || this.dialogue.isOpen) return;

    const body = L.y - 6, h = this.collect.pick(L.x, body);
    if (h) {
      this.refreshHud();
      return this.dialogue.show(`<b>Coração ${this.collect.total(this.P)}/${this.P.hearts.length}</b><br>${MEMORIES[h.id].text}`);
    }
    const o = this.inter.nearest(L.x, body);
    UI.prompt(!!o);
    if (o && act) { UI.prompt(false); this.interact(o); }
  }

  interact(o) {
    if (this.handle(o)) return;
    const isNew = o.give && !this.quest.has(o.give);
    if (o.give && !isNew) return this.dialogue.show(DIALOGUES.already);
    const text = DIALOGUES[o.say] + (isNew ? `<br>(${this.quest.count() + 1}/${this.P.need.length})` : '');
    this.dialogue.show(text, () => {
      if (!isNew) return;
      this.quest.give(o.give); this.refreshHud();
      if (this.quest.done()) this.onQuestComplete();
    });
  }

  finishPhase() {
    this.dialogue.show([this.P.achievement, this.P.complete], () => {
      Progress.completePhase(this.P.id);
      this.state = 'busy'; UI.prompt(false);
      this.cameras.main.fadeOut(700);
      this.cameras.main.once('camerafadeoutcomplete', () =>
        this.scene.start(this.idx + 1 < PHASES.length ? 'StoryScene' : 'EndingScene', { idx: this.idx + 1 }));
    });
  }

  togglePause() {
    if (this.state == 'pause') { this.state = 'play'; return UI.clear(); }
    this.state = 'pause'; UI.prompt(false);
    UI.panel('<h1>PAUSA</h1><button id="r">Continuar</button><button id="m">Menu / Capítulos</button><button id="x">Reiniciar jogo</button>');
    UI.on('r', () => this.togglePause());
    UI.on('m', () => { UI.clear(); this.scene.start('MenuScene'); });
    UI.on('x', () => { Progress.reset(); UI.clear(); this.scene.start('StoryScene', { idx: 0 }); });
  }
}
