import React, { useMemo, useState } from 'react';
import { CHAPITRES, GLOSSAIRE } from '../data/theorie.js';
import { Icon, Seg, Back, Search } from '../ui.jsx';
import { Decodeur } from './Techniques.jsx';
import { melanger } from '../data/quiz.js';

export function Theorie() {
  const [vue, setVue] = useState('chap');
  const [filtre, setFiltre] = useState('tout');
  const [sel, setSel] = useState(null);
  if (sel) return <div><Back onClick={() => setSel(null)} label="Tous les chapitres" /><ChapitreView id={sel} /></div>;
  return (
    <div>
      <h1 style={{ marginBottom: 2 }}>Théorie</h1>
      <div className="muted small" style={{ marginBottom: 10 }}>Fiche théorie de l'évaluation, plus les approfondissements de niveau L2 STAPS</div>
      <div className="row" style={{ marginBottom: 12 }}>
        <Seg value={vue} onChange={setVue} options={[['chap', 'Chapitres'], ['glo', 'Lexique'], ['flash', 'Cartes mémoire'], ['dec', 'Décodeur']]} />
      </div>
      {vue === 'chap' && (
        <>
          <div className="row" style={{ marginBottom: 10 }}>
            <Seg value={filtre} onChange={setFiltre} options={[['tout', 'Tout'], ['base', 'Fiche théorie'], ['staps', 'Approfondissement STAPS']]} />
          </div>
          <div className="grid g2">
            {CHAPITRES.filter((c) => filtre === 'tout' || c.niveau === filtre).map((c, i) => (
              <div key={c.id} className="card" style={{ cursor: 'pointer', margin: 0 }} onClick={() => setSel(c.id)}>
                <div className="row between"><span className="muted small">Chapitre {CHAPITRES.indexOf(c) + 1}</span><span className={'chip ' + (c.niveau === 'staps' ? 'red' : 'green')}>{c.niveau === 'staps' ? 'STAPS' : 'Fiche théorie'}</span></div>
                <h2 style={{ margin: '6px 0 4px' }}>{c.titre}</h2>
                <p className="small muted" style={{ margin: 0 }}>{c.resume}</p>
              </div>
            ))}
          </div>
        </>
      )}
      {vue === 'glo' && <Lexique />}
      {vue === 'flash' && <Flash />}
      {vue === 'dec' && <div className="card"><Decodeur /></div>}
    </div>
  );
}

export function ChapitreView({ id }) {
  const c = CHAPITRES.find((x) => x.id === id);
  if (!c) return null;
  return (
    <div className="stack">
      <div className="row"><span className={'chip ' + (c.niveau === 'staps' ? 'red' : 'green')}>{c.niveau === 'staps' ? 'Approfondissement L2 STAPS' : 'Fiche théorie (évaluation)'}</span></div>
      <h1>{c.titre}</h1>
      {c.sections.map((s, i) => (
        <div key={i} className="card">
          <h3>{s.t}</h3>
          {(s.p || []).map((p, j) => <p key={j}>{p}</p>)}
          {s.l && <ul>{s.l.map((x, j) => <li key={j}>{x}</li>)}</ul>}
          {s.tab && <div className="tablewrap"><table className="t"><thead><tr>{s.tab.h.map((h) => <th key={h}>{h}</th>)}</tr></thead><tbody>{s.tab.r.map((r, j) => <tr key={j}>{r.map((x, k) => <td key={k}>{k === 0 ? <b>{x}</b> : x}</td>)}</tr>)}</tbody></table></div>}
        </div>
      ))}
      {c.retenir && <div className="card" style={{ borderColor: 'var(--accent)' }}><h3>À retenir</h3><ul>{c.retenir.map((x) => <li key={x}>{x}</li>)}</ul></div>}
    </div>
  );
}

function Lexique() {
  const [q, setQ] = useState('');
  const n = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const l = GLOSSAIRE.filter(([a, b]) => n(a + ' ' + b).includes(n(q)));
  return (
    <div className="card">
      <Search value={q} onChange={setQ} placeholder="Chercher un mot japonais ou français" />
      <table className="t" style={{ marginTop: 8 }}><tbody>{l.map(([a, b]) => <tr key={a}><td style={{ width: '40%' }}><b>{a}</b></td><td>{b}</td></tr>)}</tbody></table>
    </div>
  );
}

function Flash() {
  const [seed, setSeed] = useState(() => Date.now());
  const [sens, setSens] = useState('jp');
  const cartes = useMemo(() => melanger(GLOSSAIRE, seed), [seed]);
  const [i, setI] = useState(0);
  const [vu, setVu] = useState(false);
  const c = cartes[i];
  const next = (d) => { setVu(false); setI((x) => (x + d + cartes.length) % cartes.length); };
  return (
    <div className="card">
      <div className="row between">
        <Seg value={sens} onChange={(v) => { setSens(v); setVu(false); }} options={[['jp', 'Japonais → français'], ['fr', 'Français → japonais']]} />
        <button className="btn sm" onClick={() => { setSeed(Date.now()); setI(0); setVu(false); }}><Icon n="shuffle" />Mélanger</button>
      </div>
      <div className="flash" onClick={() => setVu((v) => !v)}>
        <div>
          <div>{sens === 'jp' ? c[0] : c[1]}</div>
          <div style={{ fontSize: '1.05rem', color: vu ? 'var(--green)' : 'var(--ink2)', marginTop: 10, fontFamily: 'var(--sans)' }}>{vu ? (sens === 'jp' ? c[1] : c[0]) : 'Toucher pour retourner'}</div>
        </div>
      </div>
      <div className="row between">
        <button className="btn" onClick={() => next(-1)}><Icon n="left" />Précédente</button>
        <span className="small muted">{i + 1} / {cartes.length}</span>
        <button className="btn" onClick={() => next(1)}>Suivante<Icon n="right" /></button>
      </div>
    </div>
  );
}
