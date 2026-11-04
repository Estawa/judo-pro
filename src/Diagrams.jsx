import React, { useEffect, useState } from 'react';

// ─────────── Animation pas à pas (boucle) ───────────
function useFrame(n, ms = 1700, run = true) {
  const [f, setF] = useState(0);
  useEffect(() => {
    if (!run || n < 2) return;
    const t = setInterval(() => setF((x) => (x + 1) % n), ms);
    return () => clearInterval(t);
  }, [n, ms, run]);
  return [f, setF];
}

// Interpolation fluide entre deux poses (effet GIF)
function useTween(target, ms = 650) {
  const [cur, setCur] = useState(target);
  const from = React.useRef(target);
  useEffect(() => {
    const start = performance.now(); const a = from.current; let raf;
    const step = (now) => {
      const k = Math.min(1, (now - start) / ms); const e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      const o = {}; for (const key in target) { const p0 = a[key] || target[key]; o[key] = [p0[0] + (target[key][0] - p0[0]) * e, p0[1] + (target[key][1] - p0[1]) * e]; }
      setCur(o); from.current = o;
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return cur;
}

const DIRS = { av: [0, 1], ar: [0, -1], d: [-1, 0], g: [1, 0], avd: [-0.71, 0.71], avg: [0.71, 0.71], ard: [-0.71, -0.71], arg: [0.71, -0.71] };

function Defs({ id }) {
  return (
    <defs>
      <marker id={'ah' + id} viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" fill="var(--accent)" />
      </marker>
      <pattern id={'hatch' + id} width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="5" stroke="var(--ink2)" strokeWidth="1" opacity=".5" />
      </pattern>
    </defs>
  );
}

// ─────────── Rose des 8 directions de kuzushi ───────────
export function KuzushiRose({ dir, size = 200 }) {
  const id = 'r' + (dir || 'x');
  return (
    <svg viewBox="0 0 200 200" width={size} role="img" aria-label={'Direction du déséquilibre'}>
      <Defs id={id} />
      <circle cx="100" cy="100" r="78" fill="none" stroke="var(--line)" strokeDasharray="3 4" />
      {Object.entries(DIRS).map(([k, [dx, dy]]) => {
        const on = k === dir;
        return (
          <line key={k} x1={100 + dx * 26} y1={100 + dy * 26} x2={100 + dx * 70} y2={100 + dy * 70}
            stroke={on ? 'var(--accent)' : 'var(--line)'} strokeWidth={on ? 6 : 2.5} strokeLinecap="round"
            markerEnd={on ? `url(#ah${id})` : undefined} className={on ? 'pulse' : ''} />
        );
      })}
      <Foot x={88} y={100} a={180} who="u" s={0.7} txt="D" />
      <Foot x={112} y={100} a={180} who="u" s={0.7} txt="G" />
      <text x="100" y="196" textAnchor="middle" fontSize="11" fill="var(--ink2)">avant de uke (vers tori)</text>
      <text x="100" y="12" textAnchor="middle" fontSize="11" fill="var(--ink2)">arrière de uke</text>
      <text x="4" y="104" fontSize="11" fill="var(--ink2)">droite</text>
      <text x="196" y="104" textAnchor="end" fontSize="11" fill="var(--ink2)">gauche</text>
    </svg>
  );
}

// ─────────── Pieds (vue de dessus) ───────────
function Foot({ x, y, a, who, lifted, s = 1, txt, knee }) {
  const style = { transform: `translate(${x}px, ${y}px) rotate(${a}deg) scale(${s})`, transition: 'transform .8s cubic-bezier(.5,.1,.3,1), opacity .5s' };
  if (knee) {
    return (
      <g style={style}>
        <circle r="9" fill="var(--tori)" /><circle r="4" fill="var(--bg2)" />
      </g>
    );
  }
  const tori = who === 't';
  return (
    <g style={style} opacity={lifted ? 0.55 : 1}>
      <path d="M0,-14 C7,-14 8,-4 7,4 C6,11 4,14 0,14 C-4,14 -6,11 -7,4 C-8,-4 -7,-14 0,-14 Z"
        fill={tori ? 'var(--tori)' : 'var(--card)'} stroke="var(--ink)" strokeWidth="1.6" strokeDasharray={lifted ? '3 2' : undefined} />
      {txt && <text y="4" textAnchor="middle" fontSize="9" fontWeight="700" fill={tori ? 'var(--bg)' : 'var(--ink)'} transform={`rotate(${-a})`}>{txt}</text>}
    </g>
  );
}

const B = { tL: [85, 160, 0], tR: [135, 160, 0], uR: [85, 60, 180], uL: [135, 60, 180] };
const fr = (label, o = {}) => ({ label, ...o, p: { ...B, ...(o.p || {}) } });

// Gabarits de placement (tori droitier). p = positions [x, y, angle], up = pieds levés, ar = flèches [x1,y1,cx,cy,x2,y2], hip = bassin de tori, kz = afficher le kuzushi
export const GABARITS = {
  osoto: [fr('Garde : main droite au revers, main gauche à la manche'), fr('Kuzushi : poids de uke sur son talon droit ; pied gauche de tori à côté du pied droit de uke', { kz: 1, p: { tL: [52, 82, 10] } }),
    fr('Tsukuri : la jambe droite passe devant puis derrière la jambe droite de uke', { kz: 1, p: { tL: [52, 82, 10], tR: [72, 30, 0] }, up: ['tR'], ar: [[135, 150, 150, 60, 74, 34]] }),
    fr('Kake : fauchage d\'avant en arrière avec la cuisse', { p: { tL: [52, 82, 10], tR: [100, 122, 0], uR: [92, 100, 180] }, up: ['tR', 'uR'], ar: [[72, 36, 70, 90, 98, 116]] })],
  ouchi: [fr('Garde'), fr('Kuzushi : uke recule sur son talon gauche ; tori se rapproche', { kz: 1, p: { tR: [118, 106, 0], tL: [140, 134, 0] } }),
    fr('Tsukuri : la jambe droite crochète l\'intérieur de la jambe gauche de uke', { kz: 1, p: { tR: [124, 70, 20], tL: [140, 134, 0] }, up: ['tR'] }),
    fr('Kake : fauchage en arc de cercle vers l\'arrière', { p: { tR: [166, 48, 40], tL: [140, 134, 0], uL: [170, 40, 200] }, up: ['tR', 'uL'], ar: [[124, 74, 165, 85, 166, 52]] })],
  kouchi: [fr('Garde'), fr('Kuzushi : uke pose son pied droit, poids vers l\'arrière-droit', { kz: 1, p: { tL: [100, 126, 0], tR: [128, 128, 0] } }),
    fr('Tsukuri : la plante du pied droit derrière le talon droit de uke (intérieur)', { kz: 1, p: { tL: [100, 126, 0], tR: [96, 50, -20] }, up: ['tR'] }),
    fr('Kake : fauchage dans le sens des orteils de uke', { p: { tL: [100, 126, 0], tR: [92, 94, -20], uR: [86, 96, 180] }, up: ['tR', 'uR'], ar: [[97, 50, 104, 72, 93, 90]] })],
  kosoto: [fr('Garde'), fr('Kuzushi vers l\'arrière-droit ; pied droit de tori avance sur le côté', { kz: 1, p: { tR: [120, 114, 0] } }),
    fr('Tsukuri : plante du pied gauche derrière le talon droit de uke (extérieur)', { kz: 1, p: { tR: [120, 114, 0], tL: [60, 48, 20] }, up: ['tL'] }),
    fr('Kake : fauchage dans le sens des orteils, mains en cercle', { p: { tR: [120, 114, 0], tL: [78, 96, 20], uR: [86, 98, 180] }, up: ['tL', 'uR'], ar: [[60, 52, 58, 80, 78, 92]] })],
  deashi: [fr('Garde, déplacement'), fr('Uke avance le pied droit ; tori recule en l\'accompagnant', { kz: 1, p: { uR: [85, 96, 180], tL: [78, 182, 0] } }),
    fr('Tsukuri : la plante du pied gauche vient vers l\'extérieur de sa cheville', { kz: 1, p: { uR: [85, 96, 180], tL: [58, 98, 90] }, up: ['tL'] }),
    fr('Kake : balayage dans le sens du pas, avant que le pied se pose', { p: { uR: [120, 100, 180], tL: [104, 102, 90] }, up: ['tL', 'uR'], ar: [[50, 98, 80, 110, 116, 100]] })],
  okuri: [fr('Garde'), fr('Uke se déplace sur le côté ; tori suit en pas chassés', { kz: 1, p: { uL: [165, 60, 180], uR: [118, 60, 180], tR: [165, 160, 0], tL: [118, 160, 0] } }),
    fr('Uke rapproche ses pieds : la plante du pied gauche de tori vient au contact', { kz: 1, p: { uL: [165, 60, 180], uR: [148, 60, 180], tR: [165, 160, 0], tL: [124, 68, 90] }, up: ['uR', 'tL'] }),
    fr('Kake : balayer les deux pieds ensemble dans la direction du déplacement', { p: { uL: [200, 58, 180], uR: [186, 60, 180], tR: [165, 160, 0], tL: [172, 70, 90] }, up: ['uR', 'uL', 'tL'], ar: [[124, 70, 150, 80, 184, 64]] })],
  sasae: [fr('Garde'), fr('Kuzushi vers l\'avant-droit ; pivot sur le pied droit', { kz: 1, p: { tR: [128, 124, -30] } }),
    fr('Tsukuri : la plante du pied gauche bloque la jambe droite de uke', { kz: 1, p: { tR: [128, 124, -30], tL: [66, 90, 60] }, up: ['tL'] }),
    fr('Kake : rotation des mains comme un volant ; uke tourne par-dessus le blocage', { p: { tR: [128, 124, -30], tL: [66, 90, 60], uL: [126, 100, 180] }, up: ['tL', 'uL'], ar: [[150, 50, 150, 130, 70, 132]] })],
  hanche: [fr('Garde'), fr('Kuzushi vers l\'avant : pied droit devant le pied droit de uke', { kz: 1, p: { tR: [92, 106, 150] } }),
    fr('Tsukuri : pivot, dos à uke, bassin plus bas que le sien', { kz: 1, p: { tR: [92, 100, 180], tL: [128, 100, 180] }, hip: [110, 90] }),
    fr('Kake : extension des jambes et rotation des épaules', { p: { tR: [92, 100, 180], tL: [128, 100, 180], uR: [66, 134, 180], uL: [100, 150, 180] }, up: ['uR', 'uL'], hip: [110, 90], ar: [[140, 45, 50, 40, 60, 150]] })],
  'hanche-balaye': [fr('Garde'), fr('Kuzushi vers l\'avant-droit', { kz: 1, p: { tR: [92, 106, 150] } }),
    fr('Tsukuri : pivot sur le pied gauche, hanche droite contre uke', { kz: 1, p: { tR: [92, 100, 180], tL: [126, 100, 180] }, hip: [110, 90] }),
    fr('Kake : la jambe droite tendue balaie la cuisse droite de uke', { p: { tR: [70, 58, 170], tL: [126, 100, 180], uR: [60, 122, 180] }, up: ['tR', 'uR'], hip: [110, 90], ar: [[92, 100, 70, 90, 70, 62]] })],
  epaule: [fr('Garde'), fr('Kuzushi : tirer la manche vers l\'avant et le haut', { kz: 1, p: { tR: [92, 106, 150] } }),
    fr('Tsukuri : pivot, dos collé, genoux très fléchis', { kz: 1, p: { tR: [94, 96, 180], tL: [126, 98, 180] }, hip: [110, 88] }),
    fr('Kake : uke passe par-dessus l\'épaule droite', { p: { tR: [94, 96, 180], tL: [126, 98, 180], uR: [92, 152, 180], uL: [124, 156, 180] }, up: ['uR', 'uL'], hip: [110, 88], ar: [[110, 40, 40, 90, 100, 165]] })],
  'epaule-genou': [fr('Garde'), fr('Kuzushi vers l\'avant-bas', { kz: 1, p: { tR: [92, 106, 150] } }),
    fr('Tsukuri : pivot puis descente sur les genoux, dos droit', { kz: 1, knees: 1, p: { tR: [94, 100, 180], tL: [126, 100, 180] }, hip: [110, 90] }),
    fr('Kake : rotation des épaules vers l\'avant-bas', { knees: 1, p: { tR: [94, 100, 180], tL: [126, 100, 180], uR: [92, 152, 180], uL: [124, 156, 180] }, up: ['uR', 'uL'], hip: [110, 90], ar: [[110, 40, 40, 90, 100, 165]] })],
  'tai-otoshi': [fr('Garde'), fr('Kuzushi vers l\'avant-droit ; pied droit devant', { kz: 1, p: { tR: [96, 110, 150] } }),
    fr('Tsukuri : pied gauche recule, jambe droite tendue en barrage devant la cheville de uke', { kz: 1, p: { tL: [150, 134, 190], tR: [64, 84, 240] } }),
    fr('Kake : rotation du buste, traction circulaire : uke bascule par-dessus la jambe', { p: { tL: [150, 134, 190], tR: [64, 84, 240], uL: [118, 122, 180], uR: [74, 112, 180] }, up: ['uL', 'uR'], ar: [[140, 48, 120, 140, 50, 130]] })],
  uchimata: [fr('Garde'), fr('Kuzushi vers l\'avant ; pied droit devant', { kz: 1, p: { tR: [108, 112, 150] } }),
    fr('Tsukuri : pivot, pied gauche entre les pieds de uke', { kz: 1, p: { tL: [112, 92, 180], tR: [96, 118, 180] } }),
    fr('Kake : la cuisse droite fauche l\'intérieur de la cuisse gauche vers le haut', { p: { tL: [112, 92, 180], tR: [130, 44, 170], uL: [162, 40, 180] }, up: ['tR', 'uL'], ar: [[96, 118, 125, 95, 128, 48]] })],
  'sutemi-av': [fr('Garde'), fr('Kuzushi vers l\'avant : uke avance pour résister', { kz: 1, p: { uR: [85, 74, 180], uL: [135, 74, 180], tL: [112, 106, 0] } }),
    fr('Tsukuri : tori s\'assoit près des talons de uke, pied droit sur la ceinture', { kz: 1, p: { uR: [85, 74, 180], uL: [135, 74, 180], tL: [112, 106, 0], tR: [110, 84, 0] }, up: ['tR'], sit: [112, 132] }),
    fr('Kake : traction des mains, jambe qui se tend ; uke passe au-dessus', { p: { uR: [86, 196, 180], uL: [134, 196, 180], tL: [112, 106, 0], tR: [110, 84, 0] }, up: ['tR', 'uR', 'uL'], sit: [112, 132], ar: [[110, 60, 195, 120, 120, 200]] })],
  'sutemi-cote': [fr('Garde'), fr('Kuzushi vers l\'arrière', { kz: 1, p: { tR: [140, 120, 0] } }),
    fr('Tsukuri : la jambe gauche glisse derrière les deux talons de uke', { kz: 1, p: { tR: [140, 120, 0], tL: [110, 34, 90] }, up: ['tL'] }),
    fr('Kake : tori s\'assoit en entraînant uke vers l\'arrière', { p: { tR: [140, 120, 0], tL: [110, 34, 90], uR: [85, 40, 180], uL: [135, 40, 180] }, up: ['uR', 'uL'], sit: [140, 90], ar: [[110, 95, 90, 60, 110, 18]] })],
  'leve-ar': [fr('Garde'), fr('Uke attaque en pivotant devant tori', { p: { uR: [130, 112, 0], uL: [92, 112, 0] } }),
    fr('Tori abaisse son bassin et enlace la taille de uke', { p: { uR: [130, 112, 0], uL: [92, 112, 0], tL: [88, 152, 0], tR: [132, 152, 0] }, hip: [110, 140] }),
    fr('Kake : soulever uke et le projeter vers l\'arrière', { p: { uR: [130, 112, 0], uL: [92, 112, 0], tL: [88, 152, 0], tR: [132, 152, 0] }, up: ['uR', 'uL'], hip: [110, 140], ar: [[110, 100, 175, 150, 110, 205]] })],
  contre: [fr('Garde'), fr('Uke attaque : sa jambe vient faucher', { p: { uR: [100, 140, 180] }, up: ['uR'] }),
    fr('Tori absorbe l\'attaque, centre bas, jambe esquivée ou ancrée', { p: { uR: [100, 140, 180], tR: [146, 172, 0], tL: [78, 172, 0] }, up: ['uR'] }),
    fr('Tori retourne l\'attaque sur la jambe d\'appui de uke', { p: { uR: [100, 140, 180], tR: [112, 46, 0], tL: [78, 172, 0], uL: [152, 40, 180] }, up: ['uR', 'tR', 'uL'], ar: [[146, 160, 150, 90, 116, 50]] })],
  'genou-sol': [fr('Garde, déplacement'), fr('Uke avance ; tori l\'accompagne en reculant', { kz: 1, p: { uR: [85, 86, 180], uL: [135, 80, 180], tL: [78, 176, 0] } }),
    fr('Tori pose le genou gauche au sol, hors de la trajectoire', { kz: 1, knees: 1, p: { uR: [85, 86, 180], uL: [135, 80, 180], tL: [70, 172, 0] } }),
    fr('Kake : traction en cercle vers l\'avant-bas', { knees: 1, p: { uR: [62, 150, 180], uL: [100, 172, 0], tL: [70, 172, 0] }, up: ['uR', 'uL'], ar: [[130, 60, 170, 160, 70, 140]] })],
};

export function Footwork({ tpl, kz, run = true }) {
  const frames = GABARITS[tpl];
  const [f, setF] = useFrame(frames ? frames.length : 0, 1900, run);
  if (!frames) return null;
  const F = frames[f];
  const id = 'fw' + tpl;
  const up = new Set(F.up || []);
  const uc = [(F.p.uR[0] + F.p.uL[0]) / 2, (F.p.uR[1] + F.p.uL[1]) / 2];
  const d = DIRS[kz];
  return (
    <div className="diag">
      <svg viewBox="-30 -30 280 275" role="img" aria-label={'Schéma animé : ' + F.label}>
        <Defs id={id} />
        <g transform="translate(110 108) scale(1.28) translate(-110 -108)">
        {F.hip && <ellipse cx={F.hip[0]} cy={F.hip[1]} rx="26" ry="11" fill="none" stroke="var(--ink)" strokeWidth="1.5" strokeDasharray="4 3" />}
        {F.sit && <ellipse cx={F.sit[0]} cy={F.sit[1]} rx="24" ry="18" fill="var(--tori)" opacity=".25" />}
        {F.kz && d && <line x1={uc[0]} y1={uc[1]} x2={uc[0] + d[0] * 48} y2={uc[1] + d[1] * 48} stroke="var(--accent)" strokeWidth="5" strokeLinecap="round" markerEnd={`url(#ah${id})`} className="pulse" />}
        {(F.ar || []).map((a, i) => <path key={f + '-' + i} d={`M${a[0]},${a[1]} Q${a[2]},${a[3]} ${a[4]},${a[5]}`} fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeDasharray="5 4" markerEnd={`url(#ah${id})`} />)}
        <Foot x={F.p.uR[0]} y={F.p.uR[1]} a={F.p.uR[2]} who="u" lifted={up.has('uR')} txt="D" s={1.1} />
        <Foot x={F.p.uL[0]} y={F.p.uL[1]} a={F.p.uL[2]} who="u" lifted={up.has('uL')} txt="G" s={1.1} />
        <Foot x={F.p.tL[0]} y={F.p.tL[1]} a={F.p.tL[2]} who="t" lifted={up.has('tL')} txt="G" knee={F.knees} s={1.1} />
        <Foot x={F.p.tR[0]} y={F.p.tR[1]} a={F.p.tR[2]} who="t" lifted={up.has('tR')} txt="D" knee={F.knees} s={1.1} />
        </g>
      </svg>
      <div className="tiny muted">○ pieds de uke · ● pieds de tori · pointillés = pied levé</div>
      <div className="steps">{frames.map((_, i) => <span key={i} className={i === f ? 'on' : ''} onClick={() => setF(i)} style={{ cursor: 'pointer' }} />)}</div>
      <div className="cap">{F.label}</div>
    </div>
  );
}

// ─────────── Positions au sol (vue de dessus) ───────────
function Body({ x, y, r, tori, legs = 'droit', arms = 'cote', op = 1 }) {
  const fill = tori ? 'var(--tori)' : 'var(--card)';
  const L = { droit: [[-12, 32, -16, 92], [12, 32, 16, 92]], ecart: [[-12, 30, -46, 80], [12, 30, 46, 80]], genoux: [[-12, 30, -30, 52], [12, 30, 30, 52]], plie: [[-12, 30, -30, 60], [12, 30, 22, 82]] }[legs];
  const A = { cote: [[-15, -24, -38, 6], [15, -24, 38, 6]], haut: [[-15, -24, -30, -64], [15, -24, 30, -64]], avant: [[-15, -24, -26, -50], [15, -24, 26, -50]], serre: [[-15, -24, -6, 4], [15, -24, 6, 4]], tendu: [[-15, -24, -40, -56], [15, -24, 38, 6]] }[arms];
  return (
    <g transform={`translate(${x},${y}) rotate(${r})`} opacity={op}>
      {L.map((l, i) => <line key={'l' + i} x1={l[0]} y1={l[1]} x2={l[2]} y2={l[3]} stroke="var(--ink)" strokeWidth={tori ? 9 : 8} strokeLinecap="round" />)}
      {!tori && L.map((l, i) => <line key={'lw' + i} x1={l[0]} y1={l[1]} x2={l[2]} y2={l[3]} stroke="var(--card)" strokeWidth="5" strokeLinecap="round" />)}
      {A.map((l, i) => <line key={'a' + i} x1={l[0]} y1={l[1]} x2={l[2]} y2={l[3]} stroke="var(--ink)" strokeWidth={tori ? 7 : 6.5} strokeLinecap="round" />)}
      {!tori && A.map((l, i) => <line key={'aw' + i} x1={l[0]} y1={l[1]} x2={l[2]} y2={l[3]} stroke="var(--card)" strokeWidth="3.5" strokeLinecap="round" />)}
      <rect x="-18" y="-32" width="36" height="66" rx="15" fill={fill} stroke="var(--ink)" strokeWidth="1.8" />
      <circle cx="0" cy="-45" r="10" fill={fill} stroke="var(--ink)" strokeWidth="1.8" />
    </g>
  );
}

const SOL = {
  'sol-kesa': { cap: 'Tori assis contre le flanc droit de uke, jambes écartées, bras autour du cou, bras de uke coincé sous l\'aisselle', tori: [78, 96, 60, 'ecart', 'avant'], uke: [128, 104, 0, 'droit', 'cote'], p: [[112, 82]] },
  'sol-yoko': { cap: 'Tori en travers, perpendiculaire, poitrine sur poitrine, hanches basses ; un bras sous la nuque, l\'autre entre les jambes', tori: [84, 96, 90, 'genoux', 'avant'], uke: [124, 104, 0, 'droit', 'cote'], p: [[124, 90]] },
  'sol-kami': { cap: 'Tori à la tête de uke, dans l\'axe, bras sous les épaules, mains à la ceinture', tori: [110, 30, 180, 'ecart', 'avant'], uke: [110, 128, 0, 'droit', 'cote'], p: [[110, 108]] },
  'sol-tate': { cap: 'Tori à cheval sur uke, dans le même axe, poids bas ; contrôle de la tête et d\'un bras', tori: [110, 108, 0, 'genoux', 'haut'], uke: [110, 112, 0, 'droit', 'haut'], p: [[110, 96]], top: true },
  'sol-juji': { cap: 'Tori perpendiculaire (en croix), bassin contre l\'épaule de uke, jambes sur la poitrine, bras de uke tendu, pouce vers le haut', tori: [54, 80, -90, 'droit', 'serre'], uke: [128, 108, 0, 'droit', 'tendu'], p: [[90, 72]] },
  'sol-dos': { cap: 'Tori dans le dos de uke, poitrine contre son dos ; avant-bras sur le côté du cou, jamais sur la trachée', tori: [110, 130, 0, 'ecart', 'avant'], uke: [110, 100, 0, 'plie', 'cote'], p: [[110, 56]], ukeTop: true },
  'sol-tortue-tete': { cap: 'Uke à quatre pattes ; tori face à sa tête, poitrine sur ses épaules, un bras sous l\'aisselle jusqu\'à la ceinture : il roule sur le côté du bras bloqué', tori: [128, 36, 180, 'genoux', 'avant'], uke: [128, 120, 0, 'genoux', 'serre'], p: [[128, 80]] },
  'sol-tortue-dos': { cap: 'Uke à quatre pattes ; tori derrière et sur le côté, poitrine sur son dos, pied crocheté à l\'intérieur de la cuisse de uke : il roule sur l\'épaule en entraînant uke', tori: [96, 150, 20, 'plie', 'avant'], uke: [128, 100, 0, 'genoux', 'serre'], p: [[140, 135]] },
  'sol-tortue': { cap: 'Uke à quatre pattes, compact ; tori sur le côté, poitrine sur son dos, contrôle d\'un bras et de la ceinture', tori: [60, 104, 90, 'genoux', 'avant'], uke: [128, 104, 0, 'genoux', 'serre'], p: [[110, 110]] },
};

export function Ground({ tpl }) {
  const T = SOL[tpl];
  if (!T) return null;
  const tori = <Body x={T.tori[0]} y={T.tori[1]} r={T.tori[2]} legs={T.tori[3]} arms={T.tori[4]} tori op={T.top ? 0.8 : 1} />;
  const uke = <Body x={T.uke[0]} y={T.uke[1]} r={T.uke[2]} legs={T.uke[3]} arms={T.uke[4]} op={T.ukeTop ? 0.92 : 1} />;
  return (
    <div className="diag">
      <svg viewBox="0 0 220 230" role="img" aria-label={T.cap}>
        {T.ukeTop ? <>{tori}{uke}</> : <>{uke}{tori}</>}
        {T.p.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r="8" fill="none" stroke="var(--accent)" strokeWidth="3" className="pulse" />)}
        <text x="8" y="16" fontSize="10" fill="var(--ink2)">uke (blanc) · tori (noir) · ◯ zone de contrôle</text>
      </svg>
      <div className="cap">{T.cap}</div>
    </div>
  );
}

// ─────────── Chutes (vue de profil, bonhomme articulé) ───────────
const UK = {
  'chute-ar': [
    ['Départ debout, bras devant', { H: [100, 36], N: [100, 54], P: [100, 104], K1: [100, 140], F1: [100, 178], K2: [104, 140], F2: [106, 178], E1: [118, 58], M1: [138, 58], E2: [116, 62], M2: [136, 62] }],
    ['Fléchir, menton rentré (regarder la ceinture)', { H: [110, 90], N: [104, 106], P: [90, 140], K1: [118, 136], F1: [106, 178], K2: [120, 140], F2: [110, 178], E1: [122, 110], M1: [142, 106], E2: [120, 114], M2: [140, 110] }],
    ['Rouler sur le dos arrondi, la tête ne touche pas', { H: [62, 148], N: [72, 160], P: [96, 172], K1: [118, 150], F1: [140, 136], K2: [122, 154], F2: [144, 142], E1: [80, 150], M1: [88, 136], E2: [82, 154], M2: [92, 142] }],
    ['Frapper le tapis bras tendus à 45°, paumes vers le sol', { H: [58, 160], N: [70, 172], P: [106, 175], K1: [124, 152], F1: [144, 134], K2: [128, 156], F2: [148, 140], E1: [88, 178], M1: [104, 180], E2: [90, 178], M2: [106, 180] }],
  ],
  'chute-cote': [
    ['Départ debout', { H: [100, 36], N: [100, 54], P: [100, 104], K1: [100, 140], F1: [100, 178], K2: [104, 140], F2: [106, 178], E1: [108, 80], M1: [110, 104], E2: [94, 80], M2: [92, 104] }],
    ['Lancer la jambe en diagonale, fléchir la jambe d\'appui', { H: [96, 82], N: [96, 98], P: [98, 136], K1: [112, 150], F1: [100, 178], K2: [126, 124], F2: [152, 132], E1: [112, 106], M1: [126, 116], E2: [90, 112], M2: [86, 124] }],
    ['Arriver sur le côté, menton rentré', { H: [68, 150], N: [80, 164], P: [112, 172], K1: [132, 160], F1: [152, 174], K2: [134, 152], F2: [156, 142], E1: [84, 150], M1: [92, 136], E2: [86, 154], M2: [94, 142] }],
    ['Frapper du bras côté chute, à 45° du corps', { H: [66, 158], N: [80, 172], P: [112, 175], K1: [132, 162], F1: [152, 176], K2: [134, 154], F2: [156, 144], E1: [96, 179], M1: [112, 180], E2: [86, 158], M2: [96, 146] }],
  ],
  'chute-av': [
    ['Départ à genoux, bras pliés devant le visage', { H: [100, 78], N: [100, 94], P: [98, 140], K1: [100, 178], F1: [72, 178], K2: [104, 178], F2: [76, 178], E1: [112, 112], M1: [116, 94], E2: [110, 116], M2: [114, 98] }],
    ['Se laisser tomber vers l\'avant, corps gainé', { H: [136, 106], N: [124, 118], P: [100, 146], K1: [100, 178], F1: [72, 178], K2: [104, 178], F2: [76, 178], E1: [140, 132], M1: [152, 124], E2: [138, 136], M2: [150, 128] }],
    ['Recevoir sur les avant-bras et les paumes, visage tourné', { H: [156, 158], N: [142, 166], P: [104, 168], K1: [84, 174], F1: [58, 178], K2: [86, 176], F2: [60, 178], E1: [148, 179], M1: [168, 179], E2: [146, 179], M2: [166, 179] }],
  ],
  'chute-roulee': [
    ['Pied droit devant, main droite posée devant en arc de cercle', { H: [104, 52], N: [102, 68], P: [98, 112], K1: [112, 146], F1: [118, 178], K2: [90, 146], F2: [84, 178], E1: [118, 100], M1: [130, 132], E2: [108, 100], M2: [118, 128] }],
    ['Regarder sous l\'aisselle, rouler sur le bras arrondi', { H: [124, 120], N: [114, 126], P: [96, 118], K1: [114, 150], F1: [118, 178], K2: [84, 152], F2: [80, 178], E1: [134, 150], M1: [140, 178], E2: [126, 150], M2: [134, 176] }],
    ['Diagonale épaule-hanche opposée, la tête ne touche jamais', { H: [146, 158], N: [134, 170], P: [126, 132], K1: [110, 108], F1: [94, 90], K2: [140, 108], F2: [152, 90], E1: [148, 179], M1: [166, 179], E2: [120, 160], M2: [112, 150] }],
    ['Finir sur le côté en frappant du bras (ou se relever)', { H: [186, 158], N: [174, 170], P: [138, 174], K1: [118, 162], F1: [96, 176], K2: [116, 152], F2: [94, 146], E1: [154, 179], M1: [136, 180], E2: [170, 154], M2: [164, 140] }],
  ],
};

export function UkemiAnim({ tpl, run = true }) {
  const frames = UK[tpl];
  const [f, setF] = useFrame(frames ? frames.length : 0, 1600, run);
  if (!frames) return null;
  const [cap, target] = frames[f];
  const q = useTween(target);
  const seg = (a, b, w = 6) => <line x1={q[a][0]} y1={q[a][1]} x2={q[b][0]} y2={q[b][1]} stroke="var(--ink)" strokeWidth={w} strokeLinecap="round" />;
  return (
    <div className="diag">
      <svg viewBox="0 0 220 195" role="img" aria-label={cap}>
        <rect x="10" y="181" width="200" height="8" rx="2" fill="var(--line)" />
        <g style={{ transition: 'all .7s' }}>
          {seg('N', 'P', 9)}{seg('P', 'K2')}{seg('K2', 'F2')}{seg('N', 'E2', 5)}{seg('E2', 'M2', 5)}
          {seg('P', 'K1')}{seg('K1', 'F1')}{seg('N', 'E1', 5)}{seg('E1', 'M1', 5)}
          <circle cx={q.H[0]} cy={q.H[1]} r="10" fill="var(--card)" stroke="var(--ink)" strokeWidth="3" />
        </g>
      </svg>
      <div className="steps">{frames.map((_, i) => <span key={i} className={i === f ? 'on' : ''} onClick={() => setF(i)} style={{ cursor: 'pointer' }} />)}</div>
      <div className="cap">{cap}</div>
    </div>
  );
}

export function Schema({ t, run }) {
  if (!t.anim) return null;
  if (t.anim.startsWith('chute')) return <UkemiAnim tpl={t.anim} run={run} />;
  if (t.anim.startsWith('sol')) return <Ground tpl={t.anim} />;
  return <Footwork tpl={t.anim} kz={t.kz} run={run} />;
}

// ─────────── Gestes de l'arbitre ───────────
const G = {
  none: { R: [[88, 86], [86, 112]], L: [[112, 86], [114, 112]] },
  ippon: { R: [[94, 32], [92, 6]] , L: [[112, 86], [114, 112]] },
  wazaari: { R: [[74, 58], [46, 58]], L: [[112, 86], [114, 112]] },
  yuko: { R: [[80, 74], [60, 92]], L: [[112, 86], [114, 112]] },
  matte: { R: [[76, 58], [52, 58]], L: [[112, 86], [114, 112]], palm: [46, 50] },
  osaekomi: { R: [[80, 80], [58, 102]], L: [[112, 86], [114, 112]], lean: 1 },
  toketa: { R: [[80, 80], [58, 102]], L: [[112, 86], [114, 112]], wave: 1 },
  shido: { R: [[82, 74], [64, 86]], L: [[112, 86], [114, 112]], finger: 1 },
  hansoku: { R: [[94, 32], [92, 6]], L: [[112, 86], [114, 112]], seq: 'shido' },
  sonomama: { R: [[84, 84], [72, 106]], L: [[116, 84], [128, 106]] },
};
export function Referee({ g = 'none', size = 120 }) {
  const [alt, setAlt] = useState(false);
  useEffect(() => { if (G[g] && G[g].seq) { const t = setInterval(() => setAlt((a) => !a), 1100); return () => clearInterval(t); } setAlt(false); }, [g]);
  const k = G[g] && G[g].seq && alt ? G[g].seq : g;
  const s = G[k] || G.none;
  const S = [100, 58];
  return (
    <svg viewBox="0 0 200 180" width={size} role="img" aria-label={'Geste : ' + g}>
      <g transform={s.lean ? 'rotate(-12 100 170)' : undefined}>
        <line x1="100" y1="110" x2="88" y2="172" stroke="var(--ink)" strokeWidth="7" strokeLinecap="round" />
        <line x1="100" y1="110" x2="112" y2="172" stroke="var(--ink)" strokeWidth="7" strokeLinecap="round" />
        <rect x="86" y="52" width="28" height="62" rx="10" fill="var(--card)" stroke="var(--ink)" strokeWidth="3" />
        <circle cx="100" cy="38" r="11" fill="var(--card)" stroke="var(--ink)" strokeWidth="3" />
        <g style={{ transformOrigin: '100px 58px' }} className={s.wave ? 'wave' : ''}>
          <polyline points={`${S[0] - 10},${S[1]} ${s.R[0][0]},${s.R[0][1]} ${s.R[1][0]},${s.R[1][1]}`} fill="none" stroke="var(--accent)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'all .4s' }} />
          {s.finger && <line x1={s.R[1][0]} y1={s.R[1][1]} x2={s.R[1][0] - 12} y2={s.R[1][1] + 6} stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" />}
        </g>
        {s.palm && <g transform={`translate(${s.palm[0]},${s.palm[1]})`}>{[-6, -3, 0, 3, 6].map((x) => <line key={x} x1={x} y1="0" x2={x} y2="12" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />)}</g>}
        <polyline points={`${S[0] + 10},${S[1]} ${s.L[0][0]},${s.L[0][1]} ${s.L[1][0]},${s.L[1][1]}`} fill="none" stroke="var(--ink)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}
