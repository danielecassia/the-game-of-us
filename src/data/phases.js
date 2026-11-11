// Dados das fases (Etapa 3: mapas finais 30x20 gerados por retângulos).
// Tiles: # parede, B quadro, V TV/monitor, K bancada, F geladeira, O forno, U armário,
// S sofá/banco, T árvore, P planta, D mesa, C computador, E cama, L estante, M bloco Minecraft,
// R tapete, p caminho, H arbusto (esconde), . chão.
const T = 16;

function buildMap(w, h, wall, rects) {
  const g = Array.from({ length: h }, () => Array(w).fill('.'));
  for (let x = 0; x < w; x++) g[0][x] = g[h - 1][x] = wall;
  for (let y = 0; y < h; y++) g[y][0] = g[y][w - 1] = wall;
  for (const [x, y, ww, hh, ch] of rects)
    for (let j = y; j < y + hh; j++) for (let i = x; i < x + ww; i++) g[j][i] = ch;
  return g.map(r => r.join(''));
}
const I = (tx, ty, say, o) => Object.assign({ tx, ty, say }, o);

const PHASES = [
{
  id: 1, key: 'Phase1Scene',
  title: 'FASE 1 — THE BEGINNING', subtitle: 'Onde tudo começou: iJúnior',
  intro: 'Dani e Bê começam como colegas na iJúnior. Sem perceber, estão iniciando a história que será contada aqui.',
  theme: { floor: ['#d9c9a8', '#d2c19e'], wall: '#5b4b7a' },
  map: buildMap(30, 20, '#', [
    [1, 1, 28, 1, '#'], [3, 1, 4, 1, 'B'], [10, 1, 4, 1, 'B'], [17, 1, 4, 1, 'B'], [24, 1, 3, 1, 'B'],
    [11, 9, 8, 4, 'R'], [12, 10, 6, 2, 'D'],
    [3, 4, 2, 1, 'C'], [3, 5, 2, 1, 'D'], [8, 4, 2, 1, 'C'], [8, 5, 2, 1, 'D'], [13, 4, 2, 1, 'C'], [13, 5, 2, 1, 'D'],
    [18, 4, 2, 1, 'C'], [18, 5, 2, 1, 'D'], [23, 4, 2, 1, 'C'], [23, 5, 2, 1, 'D'],
    [8, 14, 3, 1, 'C'], [8, 15, 3, 1, 'D'], [20, 14, 3, 1, 'C'], [20, 15, 3, 1, 'D'],
    [3, 15, 2, 2, 'D'], [25, 15, 2, 2, 'D'], [24, 8, 4, 1, 'K'],
    [1, 2, 1, 1, 'P'], [28, 2, 1, 1, 'P'], [1, 17, 1, 1, 'P'], [28, 17, 1, 1, 'P']]),
  start: [14, 17],
  quest: 'Reunir as peças do projeto', need: ['code', 'design', 'deploy'],
  interactables: [
    I(3, 4, 'p1_code', { give: 'code' }), I(4, 4, 'p1_tabs'), I(8, 4, 'p1_theme'),
    I(13, 4, 'p1_design', { give: 'design' }), I(18, 4, 'p1_bug'), I(23, 4, 'p1_deploy', { give: 'deploy' }),
    I(24, 4, 'p1_tabs'), I(25, 8, 'p1_coffee'), I(4, 1, 'p1_board'), I(11, 1, 'p1_board'),
    I(8, 14, 'p1_bug'), I(20, 14, 'p1_theme')],
  npcs: [{ tx: 6, ty: 8, pal: 0, say: 'p1_npc1' }, { tx: 23, ty: 11, pal: 1, say: 'p1_npc2' }, { tx: 16, ty: 13, pal: 2, say: 'p1_npc3' }],
  hearts: [{ id: 'p1h1', tx: 14, ty: 7 }, { id: 'p1h2', tx: 26, ty: 12 }, { id: 'p1h3', tx: 5, ty: 10 }],
  hint: 'Os três computadores marcados guardam as peças do projeto: <b>código</b>, <b>design</b> e <b>deploy</b>. Converse com os colegas e explore o escritório!',
  achievement: '<b>PROJETO CONCLUÍDO!</b>',
  complete: '“Who knew that building projects together would be the beginning of our greatest adventure?”'
},
{
  id: 2, key: 'Phase2Scene',
  title: 'FASE 2 — THE FIRST KISS', subtitle: 'Operação Discrição',
  intro: 'Chegou a hora do primeiro encontro. Mas a Dani tinha muita vergonha de beijar perto de outras pessoas!',
  theme: { floor: ['#8fcf7a', '#85c670'], wall: '#3f7a3a' },
  map: buildMap(30, 20, 'T', [
    [1, 9, 28, 2, 'p'], [14, 1, 2, 18, 'p'],
    [5, 3, 3, 2, 'T'], [11, 3, 2, 3, 'T'], [20, 4, 3, 2, 'T'], [3, 12, 3, 3, 'T'], [22, 12, 3, 3, 'T'], [17, 14, 4, 2, 'T'],
    [23, 2, 1, 1, 'T'], [23, 4, 1, 2, 'T'], [24, 5, 5, 1, 'T'],
    [8, 8, 2, 1, 'S'], [19, 8, 2, 1, 'S'], [8, 11, 2, 1, 'S'], [19, 11, 2, 1, 'S'],
    [9, 6, 1, 1, 'H'], [17, 6, 1, 1, 'H'], [7, 12, 1, 1, 'H'], [13, 12, 1, 1, 'H'], [20, 16, 1, 1, 'H'],
    [24, 8, 1, 1, 'H'], [26, 16, 1, 1, 'H'], [25, 6, 1, 1, 'H'], [10, 16, 1, 1, 'H']]),
  start: [3, 17],
  quest: 'Chegar ao esconderijo sem ser visto', need: [],
  goal: { tx: 26, ty: 3 },
  patrols: [
    { path: [[3, 9], [26, 9]], speed: 28 }, { path: [[14, 3], [14, 17]], speed: 26 },
    { path: [[7, 17], [16, 17], [16, 12], [7, 12]], speed: 24 }, { path: [[18, 2], [22, 2]], speed: 22 },
    { path: [[22, 6], [22, 11]], speed: 24 }],
  interactables: [I(8, 8, 'p2_bench'), I(19, 8, 'p2_bench'), I(12, 4, 'p2_tree'), I(8, 11, 'p2_bench')],
  hearts: [{ id: 'p2h1', tx: 9, ty: 4 }, { id: 'p2h2', tx: 27, ty: 10 }, { id: 'p2h3', tx: 14, ty: 18 }],
  hint: 'Evite o <b>cone de visão</b> das pessoas. Arbustos escondem vocês! Leve os <b>dois</b> até o cantinho secreto no canto superior direito.',
  achievement: '<b>FIRST KISS UNLOCKED!</b>',
  complete: '“A little shy, a little nervous, and the beginning of everything.”'
},
{
  id: 3, key: 'Phase3Scene',
  title: 'FASE 3 — STRAWBERRY CAKE', subtitle: 'Our Little World',
  intro: 'Bolo de morango, filmes, séries, jogos e conversas. Momentos simples que construíram muita coisa.',
  theme: { floor: ['#e3c9a0', '#dcc097'], wall: '#7a5c8a' },
  map: buildMap(30, 20, '#', [
    [12, 1, 1, 6, '#'], [2, 1, 6, 1, 'K'], [8, 1, 1, 1, 'F'], [9, 1, 1, 1, 'K'], [10, 1, 1, 1, 'O'], [11, 1, 1, 1, 'K'],
    [4, 5, 4, 1, 'D'], [17, 3, 10, 6, 'R'], [20, 1, 5, 1, 'V'], [20, 5, 4, 1, 'D'], [19, 8, 6, 1, 'S'],
    [15, 1, 3, 1, 'L'], [2, 15, 2, 2, 'M'], [4, 16, 1, 1, 'M'], [24, 14, 4, 1, 'D'], [24, 13, 3, 1, 'V'],
    [1, 18, 1, 1, 'P'], [28, 18, 1, 1, 'P'], [13, 18, 1, 1, 'P']]),
  start: [14, 17],
  quest: 'Preparar o bolo de morango', need: ['morango', 'farinha', 'ovos', 'leite'],
  interactables: [
    I(8, 1, 'p3_fridge', { give: 'morango' }), I(3, 1, 'p3_flour', { give: 'farinha' }),
    I(4, 1, 'p3_eggs', { give: 'ovos' }), I(6, 1, 'p3_milk', { give: 'leite' }),
    I(10, 1, 'p3_oven', { action: 'cake' }), I(22, 1, 'p3_tv'), I(21, 8, 'p3_sofa'),
    I(16, 1, 'p3_games'), I(2, 15, 'p3_mc'), I(25, 13, 'p3_console'), I(5, 5, 'p3_island')],
  hearts: [{ id: 'p3h1', tx: 14, ty: 10 }, { id: 'p3h2', tx: 22, ty: 12 }, { id: 'p3h3', tx: 6, ty: 12 }],
  hint: 'Junte os <b>4 ingredientes</b> na cozinha e depois use o <b>forno</b> para preparar o bolo. Há referências a Minecraft escondidas por aí...',
  achievement: '<b>OUR LITTLE WORLD UNLOCKED!</b>',
  complete: '“Sometimes the best adventures are just ordinary afternoons with your favorite person.”'
},
{
  id: 4, key: 'Phase4Scene',
  title: 'FASE 4 — OUR HOME', subtitle: 'Building Together',
  intro: 'No último ano, Dani e Bê foram morar juntos. Agora a aventura é construir uma vida compartilhada.',
  theme: { floor: ['#e8d3b0', '#e0cba8'], wall: '#4a6a8a' },
  map: buildMap(30, 20, '#', [
    [14, 1, 1, 8, '#'], [14, 12, 1, 7, '#'],
    [2, 3, 4, 1, 'L'], [8, 3, 4, 1, 'L'], [2, 7, 4, 1, 'L'], [8, 7, 4, 1, 'L'], [2, 11, 4, 1, 'L'], [8, 11, 4, 1, 'L'],
    [4, 15, 6, 1, 'K'], [16, 1, 2, 1, 'F'], [18, 1, 2, 1, 'K'], [20, 1, 2, 1, 'U'], [22, 1, 2, 1, 'K'], [24, 1, 2, 1, 'U'],
    [17, 10, 8, 4, 'R'], [19, 11, 4, 2, 'D'], [17, 6, 6, 1, 'S'], [25, 15, 3, 2, 'E'],
    [27, 6, 1, 1, 'P'], [16, 18, 1, 1, 'P']]),
  start: [6, 17],
  quest: 'Fazer as compras e guardar tudo', need: [],
  list: [
    { id: 'leite', name: 'Leite', place: 'fridge' }, { id: 'frutas', name: 'Frutas', place: 'fridge' },
    { id: 'pao', name: 'Pão', place: 'pantry' }, { id: 'arroz', name: 'Arroz', place: 'pantry' },
    { id: 'sabao', name: 'Sabão', place: 'cabinet' }],
  interactables: [
    I(2, 3, 'p4_item', { item: 'leite' }), I(3, 3, 'p4_item', { item: 'frutas' }), I(8, 3, 'p4_item', { item: 'pao' }),
    I(9, 3, 'p4_item', { item: 'chocolate' }), I(2, 7, 'p4_item', { item: 'arroz' }), I(3, 7, 'p4_item', { item: 'miojo' }),
    I(8, 7, 'p4_item', { item: 'sabao' }), I(10, 3, 'p4_flavor'), I(2, 11, 'p4_flavor'), I(9, 11, 'p4_flavor'),
    I(4, 15, 'p4_cashier'), I(16, 1, 'p4_place', { place: 'fridge' }), I(20, 1, 'p4_place', { place: 'pantry' }),
    I(24, 1, 'p4_place', { place: 'cabinet' }), I(19, 6, 'p4_sofa'), I(26, 15, 'p4_bed')],
  hearts: [{ id: 'p4h1', tx: 7, ty: 9 }, { id: 'p4h2', tx: 21, ty: 16 }, { id: 'p4h3', tx: 16, ty: 12 }],
  hint: 'Primeiro, vá ao <b>mercado</b> (lado esquerdo) e pegue só o que está na <b>lista</b>. Depois volte para casa e guarde cada item no lugar certo.',
  achievement: '<b>WE BUILT A HOME!</b>',
  complete: '“Life isn’t always an exciting adventure. Sometimes it’s groceries, dishes, bills and figuring things out. But everything feels lighter when we’re doing it together.”'
}];
