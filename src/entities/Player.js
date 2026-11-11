// Sprites procedurais (16x16) + classe Character.
const R = (c, x, y, w, h, col) => { c.fillStyle = col; c.fillRect(x, y, w, h); };

function drawChar(c, p, dir, f) {
  R(c, 4, 14, 8, 2, 'rgba(0,0,0,.25)');
  R(c, 5, 12, 3, f == 1 ? 2 : 3, p.pants); R(c, 9, 12, 3, f == 2 ? 2 : 3, p.pants);
  R(c, 4, 8, 8, 5, p.shirt);
  if (dir == 'side') { R(c, 6, 9, 4, 4, p.shirt); R(c, 7, 9, 2, 3, p.skin); }
  else { R(c, 3, 9, 1, 3, p.skin); R(c, 12, 9, 1, 3, p.skin); }
  R(c, 4, 2, 8, 6, p.skin);
  if (dir == 'down') {
    R(c, 4, 1, 8, 3, p.hair);
    if (p.curly) { R(c, 3, 1, 1, 8, p.hair); R(c, 12, 1, 1, 8, p.hair); R(c, 5, 0, 2, 1, p.hair); R(c, 9, 0, 2, 1, p.hair); }
    R(c, 6, 5, 1, 1, '#222'); R(c, 9, 5, 1, 1, '#222');
    if (p.glasses) { for (const x of [5, 9]) { R(c, x, 4, 3, 1, '#000'); R(c, x, 6, 3, 1, '#000'); R(c, x, 4, 1, 3, '#000'); R(c, x + 2, 4, 1, 3, '#000'); } R(c, 8, 5, 1, 1, '#000'); }
  } else if (dir == 'up') {
    R(c, 4, 1, 8, 7, p.hair);
    if (p.curly) { R(c, 3, 1, 1, 9, p.hair); R(c, 12, 1, 1, 9, p.hair); R(c, 4, 8, 8, 2, p.hair); }
  } else {
    R(c, 4, 1, 8, 3, p.hair); R(c, 4, 2, 3, 5, p.hair);
    if (p.curly) { R(c, 3, 1, 4, 9, p.hair); R(c, 5, 0, 3, 1, p.hair); }
    R(c, 10, 5, 1, 1, '#222');
    if (p.glasses) { R(c, 9, 4, 3, 1, '#000'); R(c, 9, 6, 3, 1, '#000'); R(c, 9, 4, 1, 3, '#000'); R(c, 11, 4, 1, 3, '#000'); R(c, 6, 5, 3, 1, '#000'); }
  }
}

// Pessoas do parque / colegas (paletas variadas)
const PEOPLE = [
  { skin: '#e0ac82', hair: '#4a2c17', shirt: '#c0392b', pants: '#34495e' },
  { skin: '#8d5a3b', hair: '#111111', shirt: '#8e44ad', pants: '#2c3e50' },
  { skin: '#f3cfb0', hair: '#c9a227', shirt: '#2980b9', pants: '#555555', curly: true },
  { skin: '#b5754a', hair: '#222222', shirt: '#e67e22', pants: '#3d3d5c' },
  { skin: '#f3cfb0', hair: '#6b3a1e', shirt: '#16a085', pants: '#444444', glasses: true },
  { skin: '#e0ac82', hair: '#222222', shirt: '#d35400', pants: '#2c3e50', curly: true }
];

function makeCharSet(scene, name, pal) {
  for (const d of ['down', 'up', 'side']) for (let f = 0; f < 3; f++) {
    const t = scene.textures.createCanvas(`${name}_${d}_${f}`, 16, 16);
    drawChar(t.getContext(), pal, d, f); t.refresh();
  }
}

function makeCharTextures(scene) {
  makeCharSet(scene, 'dani', DANI); makeCharSet(scene, 'be', BE);
  PEOPLE.forEach((p, i) => makeCharSet(scene, 'p' + i, p));
  const h = scene.textures.createCanvas('heart', 8, 8), hc = h.getContext();
  ['01100110', '11111111', '11111111', '11111111', '01111110', '00111100', '00011000']
    .forEach((r, y) => [...r].forEach((v, x) => { if (v == '1') R(hc, x, y, 1, 1, (y == 1 && x == 1) ? '#fff' : '#ff4d7d'); }));
  h.refresh();
}

class Character {
  constructor(scene, name, x, y) {
    this.name = name; this.x = x; this.y = y; this.dir = 'down'; this.f = 0; this.t = 0;
    this.sprite = scene.add.image(x, y, `${name}_down_0`).setOrigin(.5, 1);
  }
  step(dt, moving) { // animação de caminhada: 0,1,0,2
    if (moving) { this.t += dt; this.f = [0, 1, 0, 2][Math.floor(this.t / 140) % 4]; } else { this.f = 0; this.t = 0; }
  }
  render() {
    const side = this.dir == 'left' || this.dir == 'right';
    this.sprite.setTexture(`${this.name}_${side ? 'side' : this.dir}_${this.f}`)
      .setPosition(this.x, this.y).setDepth(this.y);
    this.sprite.flipX = this.dir == 'left';
  }
}
