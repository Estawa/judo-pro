import React, { useEffect, useMemo, useState } from 'react';
import { COMBAT, SCORES, REGLES_SCORES, ANNONCES, PENALITES, NOUVEAUTES_2026, SITUATIONS } from '../data/arbitrage.js';
import { Icon, Seg, bip, fmt } from '../ui.jsx';
import { Referee } from '../Diagrams.jsx';
import { Illus } from '../Illus.jsx';
import { melanger } from '../data/quiz.js';

export function Arbitrage() {
  const [vue, setVue] = useState('regles');
  return (
    <div>
      <h1 style={{ marginBottom: 2 }}>Arbitrage</h1>
      <div className="muted small" style={{ marginBottom: 10 }}>Règlement FIJ 2026 (yuko réintroduit, ajustements du 21 février 2026)</div>
      <div className="row" style={{ marginBottom: 12 }}>
        <Seg value={vue} onChange={setVue} options={[['regles', 'Règles'], ['gestes', 'Annonces et gestes'], ['quiz', 'S\'entraîner'], ['table', 'Table de marque']]} />
      </div>
      {vue === 'regles' && <Regles />}
      {vue === 'gestes' && <Gestes />}
      {vue === 'quiz' && <QuizArbitre />}
      {vue === 'table' && <TableMarque />}
    </div>
  );
}

function Regles() {
  return (
    <div className="stack">
      <div className="card"><h3>Le combat</h3><ul>{COMBAT.map((x) => <li key={x}>{x}</li>)}</ul></div>
      <div className="card">
        <h3>Valeurs des scores</h3>
        <div className="tablewrap"><table className="t"><thead><tr><th>Score</th><th>Debout (tachi-waza)</th><th>Au sol (ne-waza)</th></tr></thead>
          <tbody>{SCORES.map((s) => <tr key={s.nom}><td><b>{s.nom}</b><div className="small muted">{s.trad}</div></td><td>{s.debout}</td><td>{s.sol}</td></tr>)}</tbody></table></div>
        <ul style={{ marginTop: 10 }}>{REGLES_SCORES.map((x) => <li key={x}>{x}</li>)}</ul>
      </div>
      <div className="card">
        <h3>Shido (pénalité) — exemples</h3><ul>{PENALITES.shido.map((x) => <li key={x}>{x}</li>)}</ul>
        <h3>Hansoku-make direct (disqualification)</h3><ul>{PENALITES.hansoku.map((x) => <li key={x}>{x}</li>)}</ul>
        <h3>À savoir</h3><ul>{PENALITES.divers.map((x) => <li key={x}>{x}</li>)}</ul>
      </div>
      <div className="card"><h3>Ce qui a changé en 2026</h3><ul>{NOUVEAUTES_2026.map((x) => <li key={x}>{x}</li>)}</ul>
        <p className="small muted">À vérifier en début de saison : la note d'arbitrage de la FFSU et le règlement national de France Judo, qui peuvent adapter ces règles. En cours, les durées de randori évalués sont adaptées au niveau (2 à 4 min).</p></div>
    </div>
  );
}

function Gestes() {
  const [quiz, setQuiz] = useState(false);
  if (quiz) return <QuizGestes onBack={() => setQuiz(false)} />;
  return (
    <div>
      <div className="row" style={{ marginBottom: 10 }}><button className="btn sm primary" onClick={() => setQuiz(true)}><Icon n="help" />Quiz des gestes</button></div>
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))' }}>
        {ANNONCES.map((a) => (
          <div key={a.nom} className="card" style={{ margin: 0, textAlign: 'center' }}>
            <Illus slot={'geste:' + a.nom} compact><Referee g={a.g} size={110} /></Illus>
            <div style={{ fontFamily: 'var(--serif)', fontSize: '1.2rem', fontWeight: 600 }}>{a.nom}</div>
            <div className="small" style={{ color: 'var(--accent)' }}>{a.trad}</div>
            <div className="small muted">{a.geste}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function QuizGestes({ onBack }) {
  const pool = ANNONCES.filter((a) => a.g !== 'none');
  const [ordre, setOrdre] = useState(() => melanger(pool));
  const [i, setI] = useState(0); const [rep, setRep] = useState(null); const [score, setScore] = useState(0);
  const a = ordre[i];
  const choix = useMemo(() => melanger([a, ...melanger(pool.filter((x) => x.nom !== a.nom && x.g !== a.g)).slice(0, 3)]), [a]);
  if (i >= ordre.length) return <div className="card" style={{ textAlign: 'center' }}><h2>Score : {score} / {ordre.length}</h2><button className="btn primary" onClick={() => { setOrdre(melanger(pool)); setI(0); setScore(0); setRep(null); }}>Recommencer</button> <button className="btn" onClick={onBack}>Retour</button></div>;
  return (
    <div className="card">
      <div className="row between"><button className="btn sm ghost" onClick={onBack}><Icon n="left" />Gestes</button><span className="small muted">{i + 1} / {ordre.length} · score {score}</span></div>
      <div style={{ textAlign: 'center' }}><Illus slot={'geste:' + a.nom}><Referee g={a.g} size={170} /></Illus></div>
      <p style={{ textAlign: 'center' }}>Quelle annonce correspond à ce geste ?</p>
      {choix.map((c) => <button key={c.nom} className={'qopt' + (rep ? (c.nom === a.nom ? ' ok' : rep === c.nom ? ' ko' : '') : '')} onClick={() => { if (rep) return; setRep(c.nom); if (c.nom === a.nom) setScore((s) => s + 1); }}><b>{c.nom}</b> — {c.trad}</button>)}
      {rep && <button className="btn primary" style={{ marginTop: 10 }} onClick={() => { setRep(null); setI(i + 1); }}>Suivant<Icon n="right" /></button>}
    </div>
  );
}

function QuizArbitre() {
  const [ordre, setOrdre] = useState(() => melanger(SITUATIONS));
  const [i, setI] = useState(0); const [rep, setRep] = useState(null); const [score, setScore] = useState(0);
  if (i >= ordre.length) return <div className="card" style={{ textAlign: 'center' }}><h2>Score : {score} / {ordre.length}</h2><button className="btn primary" onClick={() => { setOrdre(melanger(SITUATIONS)); setI(0); setScore(0); setRep(null); }}><Icon n="shuffle" />Recommencer</button></div>;
  const s = ordre[i];
  return (
    <div className="card">
      <div className="row between"><b>Que décide l'arbitre ?</b><span className="small muted">{i + 1} / {ordre.length} · score {score}</span></div>
      <div className="progress" style={{ margin: '8px 0 12px' }}><div style={{ width: (100 * i / ordre.length) + '%' }} /></div>
      <p style={{ fontFamily: 'var(--serif)', fontSize: '1.2rem' }}>{s.s}</p>
      {s.choix.map((c) => <button key={c} className={'qopt' + (rep ? (c === s.r ? ' ok' : rep === c ? ' ko' : '') : '')} onClick={() => { if (rep) return; setRep(c); if (c === s.r) setScore((x) => x + 1); }}>{c}</button>)}
      {rep && <button className="btn primary" style={{ marginTop: 10 }} onClick={() => { setRep(null); setI(i + 1); }}>Suivant<Icon n="right" /></button>}
    </div>
  );
}

// ─────────── Table de marque (entraînement à l'arbitrage, S20) ───────────
const vide = () => ({ wazaari: 0, yuko: 0, shido: 0, ippon: false, hansoku: false });
export function TableMarque() {
  const [duree, setDuree] = useState(240);
  const [t, setT] = useState(240);
  const [gs, setGs] = useState(false);
  const [run, setRun] = useState(false);
  const [S, setS] = useState({ blanc: vide(), bleu: vide() });
  const [ok, setOk] = useState(null); // { cote, t }
  const [fin, setFin] = useState(null);
  const [noms, setNoms] = useState({ blanc: 'Blanc', bleu: 'Bleu' });

  useEffect(() => { if (!run) return; const i = setInterval(() => setT((x) => (gs ? x + 1 : x - 1)), 1000); return () => clearInterval(i); }, [run, gs]);
  useEffect(() => { if (!ok) return; const i = setInterval(() => setOk((o) => o && ({ ...o, t: o.t + 1 })), 1000); return () => clearInterval(i); }, [!!ok]);

  const autre = (c) => (c === 'blanc' ? 'bleu' : 'blanc');
  const verdict = (st) => {
    for (const c of ['blanc', 'bleu']) {
      if (st[c].ippon || st[c].wazaari >= 2) return `${noms[c]} gagne par ippon`;
      if (st[autre(c)].hansoku || st[autre(c)].shido >= 3) return `${noms[c]} gagne par hansoku-make de l'adversaire`;
    }
    return null;
  };
  const termine = (msg) => { setFin(msg); setRun(false); setOk(null); bip(440, 0.5, 2); };
  const apply = (fn) => setS((prev) => {
    const n = structuredClone(prev); fn(n);
    const v = verdict(n);
    if (v) setTimeout(() => termine(v), 0);
    else if (gs) {
      const diff = ['blanc', 'bleu'].find((c) => n[c].wazaari > prev[c].wazaari || n[c].yuko > prev[c].yuko);
      if (diff) setTimeout(() => termine(`${noms[diff]} gagne au golden score`), 0);
    }
    return n;
  });

  // Osae-komi : seuils 5 / 10 / 20 s
  useEffect(() => {
    if (!ok) return;
    const lim = gs ? 5 : 20;
    if (ok.t >= lim) { const c = ok.cote; setOk(null); bip(880, 0.6, 1); apply((n) => { if (gs) n[c].yuko++; else n[c].ippon = true; }); return; }
    if (!gs && ok.t === 10 && S[ok.cote].wazaari >= 1) { const c = ok.cote; setOk(null); bip(880, 0.6, 1); apply((n) => { n[c].wazaari++; }); }
  }, [ok]);
  const toketa = () => {
    if (!ok) return; const { cote, t: s } = ok; setOk(null);
    apply((n) => { if (s >= 10) n[cote].wazaari++; else if (s >= 5) n[cote].yuko++; });
  };

  // fin du temps réglementaire
  useEffect(() => {
    if (gs || t > 0 || !run) return;
    if (ok) return; // l'immobilisation continue jusqu'à son terme
    setRun(false);
    const a = S.blanc, b = S.bleu;
    if (a.wazaari !== b.wazaari) termine(`${noms[a.wazaari > b.wazaari ? 'blanc' : 'bleu']} gagne aux avantages (waza-ari)`);
    else if (a.yuko !== b.yuko) termine(`${noms[a.yuko > b.yuko ? 'blanc' : 'bleu']} gagne aux avantages (yuko)`);
    else { setGs(true); setT(0); bip(660, 0.4, 2); }
  }, [t, run, gs, ok]);

  const reset = () => { setRun(false); setGs(false); setT(duree); setS({ blanc: vide(), bleu: vide() }); setOk(null); setFin(null); };
  const Side = ({ c }) => {
    const x = S[c];
    return (
      <div className={'side ' + c}>
        <input value={noms[c]} onChange={(e) => setNoms({ ...noms, [c]: e.target.value })} style={{ background: 'transparent', border: 0, textAlign: 'center', fontWeight: 700, color: 'inherit', padding: 2 }} aria-label="Nom du combattant" />
        <div className="pts">
          <div>{x.ippon ? 'I' : x.wazaari}<small>WAZA-ARI</small></div>
          <div>{x.yuko}<small>YUKO</small></div>
        </div>
        <div className="shidos">{Array.from({ length: x.shido }).map((_, i) => <i key={i} className={i >= 2 ? 'r' : ''} />)}</div>
        <div className="btns">
          <button onClick={() => apply((n) => { n[c].ippon = true; })} disabled={!!fin}>Ippon</button>
          <button onClick={() => apply((n) => { n[c].wazaari++; })} disabled={!!fin}>Waza-ari</button>
          <button onClick={() => apply((n) => { n[c].yuko++; })} disabled={!!fin}>Yuko</button>
          <button onClick={() => apply((n) => { n[c].shido++; })} disabled={!!fin}>Shido</button>
          <button onClick={() => setOk(ok ? null : { cote: c, t: 0 })} disabled={!!fin || (ok && ok.cote !== c)} style={{ gridColumn: 'span 2', fontWeight: 700 }}>{ok && ok.cote === c ? `Osae-komi ${ok.t} s` : 'Osae-komi'}</button>
          <button onClick={() => apply((n) => { if (n[c].wazaari) n[c].wazaari--; else if (n[c].yuko) n[c].yuko--; n[c].ippon = false; })} style={{ gridColumn: 'span 2', fontSize: '.72rem', opacity: .75 }}>Annuler un score</button>
        </div>
      </div>
    );
  };
  return (
    <div className="card">
      <div className="row between" style={{ marginBottom: 6 }}>
        <Seg value={duree} onChange={(v) => { setDuree(v); setT(v); setGs(false); }} options={[[120, '2 min'], [180, '3 min'], [240, '4 min']]} />
        <button className="btn sm" onClick={reset}><Icon n="reset" />Nouveau combat</button>
      </div>
      <div style={{ textAlign: 'center' }}>
        {gs && <div className="chip red">Golden score</div>}
        <div className="big-timer" style={{ fontSize: 'clamp(3rem, 16vw, 6rem)' }}>{fmt(t)}</div>
        {fin ? <div style={{ fontFamily: 'var(--serif)', fontSize: '1.3rem', color: 'var(--accent)', marginBottom: 10 }}>Sore-made — {fin}</div> : (
          <div className="row" style={{ justifyContent: 'center', marginBottom: 10 }}>
            {run ? <button className="btn dark" onClick={() => { setRun(false); }}>Matte</button> : <button className="btn primary" onClick={() => { setRun(true); bip(880, 0.3); }}>Hajime</button>}
            {ok && <button className="btn" onClick={toketa}>Toketa ({ok.t} s)</button>}
          </div>
        )}
      </div>
      <div className="score-board"><Side c="blanc" /><Side c="bleu" /></div>
      <p className="tiny muted" style={{ marginTop: 10 }}>Osae-komi : 5 à 9 s = yuko, 10 à 19 s = waza-ari, 20 s = ippon (calcul automatique au toketa). Deux waza-ari = ippon ; trois shido = hansoku-make. Égalité à la fin du temps : golden score, le premier avantage gagne (osae-komi de 5 s).</p>
    </div>
  );
}
