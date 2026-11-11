// Fase 3 — minigame do bolo em 3 etapas: memorizar a receita, mexer a massa e decorar.
class CakeMinigame {
  constructor(onDone) {
    this.onDone = onDone;
    this.order = ['farinha', 'ovos', 'leite', 'morango'];
    this.info = { farinha: ['🌾', 'Farinha'], ovos: ['🥚', 'Ovos'], leite: ['🥛', 'Leite'], morango: ['🍓', 'Morangos'] };
  }
  start() { this.memorize(); }

  memorize(msg) {
    const r = this.order.map(k => this.info[k].join(' ')).join(' → ');
    UI.panel(`<h2>🍰 Receita do bolo</h2><p>${msg || 'Decore a ordem dos ingredientes!'}</p><h2>${r}</h2><p id="cd">3</p>`);
    let n = 3;
    this.iv = setInterval(() => { n--; if (n <= 0) { clearInterval(this.iv); this.pick(); } else $('cd').textContent = n; }, 1000);
  }

  pick() {
    let step = 0;
    const keys = [...this.order].sort(() => Math.random() - .5);
    UI.panel(`<h2>Qual é o próximo ingrediente?</h2><p id="prog">Passo 1/${this.order.length}</p>
      <div class="row">${keys.map(k => `<button data-k="${k}">${this.info[k].join(' ')}</button>`).join('')}</div>`);
    document.querySelectorAll('#ui button[data-k]').forEach(b => b.onclick = () => {
      if (b.dataset.k == this.order[step]) {
        step++; b.disabled = true;
        if (step >= this.order.length) this.mix(); else $('prog').textContent = `Passo ${step + 1}/${this.order.length}`;
      } else this.memorize('Ops, ordem errada! Olhe a receita de novo.');
    });
  }

  mix() {
    let v = 0;
    UI.panel(`<h2>Mexa a massa!</h2><p>Aperte ESPAÇO (ou clique) bem rápido!</p>
      <div class="bar"><div id="fill"></div></div><button id="mixb">🥄 Mexer!</button>`);
    const push = () => { v = Math.min(100, v + 7); };
    const key = e => { if (e.code == 'Space') push(); };
    window.addEventListener('keydown', key); $('mixb').onclick = push;
    this.iv = setInterval(() => {
      v = Math.max(0, v - 2.5); $('fill').style.width = v + '%';
      if (v >= 100) { clearInterval(this.iv); window.removeEventListener('keydown', key); this.decorate(); }
    }, 100);
  }

  decorate() {
    let n = 0;
    UI.panel(`<h2>Decore com morangos!</h2><p>Clique no bolo para colocar 5 morangos.</p>
      <div class="cake" id="cake"></div><p id="cnt">0/5</p>`);
    $('cake').onclick = e => {
      if (n >= 5) return;
      const r = e.currentTarget.getBoundingClientRect(), s = document.createElement('span');
      s.className = 'st'; s.textContent = '🍓'; s.style.left = (e.clientX - r.left) + 'px'; s.style.top = (e.clientY - r.top) + 'px';
      e.currentTarget.appendChild(s); n++; $('cnt').textContent = n + '/5';
      if (n == 5) setTimeout(() => this.finish(), 600);
    };
  }

  finish() {
    UI.panel('<h1>BOLO PRONTO! 🍰</h1><p>Cheiro de bolo de morango pela casa toda.</p><button id="ok">Continuar</button>');
    $('ok').onclick = () => { UI.clear(); this.onDone(); };
  }
}
