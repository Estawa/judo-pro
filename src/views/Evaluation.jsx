import React, { useState } from 'react';
import { useStore, noteTheo, notePrat, grille } from '../store.js';
import { GRILLE_PRATIQUE, DEMO, DUREE_RANDORI, PROGRAMMES } from '../data/programme.js';
import { COURTES } from '../data/quiz.js';
import { NIVEAUX, tech } from '../data/techniques.js';
import { DEMO_P15 } from '../data/progEleves.js';
import { Icon, Lvl, Seg, download } from '../ui.jsx';

export const maxP = (st) => grille(st).reduce((a, g) => a + g.total, 0);
export const maxT = (st) => st.bareme.qcm * st.bareme.ptQcm + st.bareme.courtes * st.bareme.ptCourte;
const v2 = (x) => (x === null || x === undefined || x === '' ? '—' : String(Math.round(x * 100) / 100).replace('.', ','));

export function Evaluation() {
  const [vue, setVue] = useState('prat');
  const { st } = useStore();
  const p = PROGRAMMES[st.prog];
  return (
    <div>
      <h1 style={{ marginBottom: 2 }}>Évaluation</h1>
      <div className="muted small" style={{ marginBottom: 10 }}>{st.parcours === 'eleves' ? `Parcours Prog Élèves : pratique /${maxP(st)} en S${p.prat.join(' et S')} (démonstration, combat arbitré, arbitrage) + écrit /${maxT(st)} en S${p.theo} (QCM + question de didactique).` : st.parcours === 'staps' ? `Parcours L2 STAPS : pratique et intervention pédagogique /${maxP(st)} (S${p.prat.join(' et S')}) + écrit /${maxT(st)} (S${p.theo}).` : `Pratique /${maxP(st)} (S${p.prat.join(' et S')}) + théorie /${maxT(st)} (S${p.theo}).`} Chaque étudiant est noté sur le programme de son niveau : un débutant peut obtenir la note maximale.</div>
      <div className="row no-print" style={{ marginBottom: 12 }}><Seg value={vue} onChange={setVue} options={[['prat', (st.parcours === 'staps' ? 'Pratique et intervention /' : 'Pratique /') + maxP(st)], ['theo', 'Théorie /' + maxT(st)], ['recap', 'Récapitulatif']]} /></div>
      {!st.eleves.length ? <div className="card empty">Ajoutez d'abord vos étudiants dans l'onglet « Groupe ».</div> : (
        <>
          {vue === 'prat' && <Pratique />}
          {vue === 'theo' && <TheorieEval />}
          {vue === 'recap' && <Recap />}
        </>
      )}
    </div>
  );
}

function Pratique() {
  const { st, upd } = useStore();
  const [idx, setIdx] = useState(0);
  const e = st.eleves[Math.min(idx, st.eleves.length - 1)];
  const g = st.evalPrat[e.id] || {};
  const set = (k, v) => upd((d) => { d.evalPrat[e.id] = { ...(d.evalPrat[e.id] || {}), [k]: v }; });
  const tot = notePrat(st, e.id);
  return (
    <div className="stack">
      <div className="card">
        <div className="row between">
          <button className="iconbtn" onClick={() => setIdx(Math.max(0, idx - 1))} disabled={idx === 0} aria-label="Précédent"><Icon n="left" /></button>
          <select value={e.id} onChange={(x) => setIdx(st.eleves.findIndex((y) => y.id === x.target.value))} style={{ flex: 1, maxWidth: 380 }}>
            {st.eleves.map((y) => <option key={y.id} value={y.id}>{y.nom.toUpperCase()} {y.prenom}{st.evalPrat[y.id] ? ' ✓' : ''}</option>)}
          </select>
          <button className="iconbtn" onClick={() => setIdx(Math.min(st.eleves.length - 1, idx + 1))} disabled={idx >= st.eleves.length - 1} aria-label="Suivant"><Icon n="right" /></button>
        </div>
        <div className="row" style={{ marginTop: 10 }}><Lvl n={e.niveau} /><b>{NIVEAUX[e.niveau].label}</b><span className="small muted">· {st.parcours === 'eleves' ? '2 combats de 2 min' : `randori de ${DUREE_RANDORI[e.niveau]}`}</span></div>
        <p className="small" style={{ marginTop: 6 }}><b>Démonstration attendue : </b>{st.parcours === 'eleves' ? DEMO_P15 : DEMO[e.niveau]}</p>
        {(e.demo || []).length > 0 && <div className="row">{e.demo.map((t) => <span key={t} className="chip">{tech(t)?.nom}</span>)}{e.tokui && <span className="chip red">Tokui : {tech(e.tokui)?.nom}</span>}</div>}
      </div>
      {grille(st).map((ep) => (
        <div key={ep.epreuve} className="card">
          <div className="row between"><h3 style={{ margin: 0 }}>{ep.epreuve}</h3><span className="small muted">/{ep.total}</span></div>
          {ep.criteres.map((c) => (
            <div key={c.id} style={{ marginTop: 10 }}>
              <div className="row between small"><span>{c.label}</span><b>{v2(g[c.id] ?? null)} / {v2(c.max)}</b></div>
              <div className="row" style={{ gap: 4, marginTop: 4 }}>
                {Array.from({ length: c.max * 2 + 1 }, (_, i) => i / 2).map((v) => (
                  <button key={v} className={'chip' + (g[c.id] === v ? ' on' : '')} onClick={() => set(c.id, v)} style={{ minWidth: 40, justifyContent: 'center' }}>{v2(v)}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
      <div className="card">
        <div className="row between"><span>{st.parcours === 'staps' ? 'Note pratique et intervention' : 'Note pratique'}</span><span className="total">{v2(tot)} / {maxP(st)}</span></div>
        <label className="f" style={{ marginTop: 8 }}>Commentaire</label>
        <textarea rows={2} value={g.com || ''} onChange={(x) => set('com', x.target.value)} />
      </div>
    </div>
  );
}

function TheorieEval() {
  const { st, upd } = useStore();
  const b = st.bareme;
  const [open, setOpen] = useState(null);
  const setT = (id, fn) => upd((d) => { d.evalTheo[id] = d.evalTheo[id] || { qcmBonnes: 0, qcmTotal: b.qcm, courtes: Array(b.courtes).fill(null), papier: true }; fn(d.evalTheo[id]); });
  return (
    <div className="card">
      <p className="small muted">Copies passées sur l'appareil : le QCM est déjà corrigé, il reste les questions courtes. Copies papier : saisissez le nombre de bonnes réponses au QCM et les points des questions courtes.</p>
      <div className="list">
        {st.eleves.map((e) => {
          const t = st.evalTheo[e.id];
          const n = noteTheo(st, e.id);
          const aCorriger = t && (t.courtes || []).some((x) => x === null);
          return (
            <div key={e.id}>
              <div className="li" onClick={() => setOpen(open === e.id ? null : e.id)}>
                <Lvl n={e.niveau} />
                <div className="grow"><b>{e.nom.toUpperCase()}</b> {e.prenom}<div className="tiny muted">{!t ? 'Pas encore de note' : t.papier ? 'Copie papier' : `Copie sur l'appareil · QCM ${t.qcmBonnes}/${t.qcmTotal}`}{aCorriger ? ' · questions courtes à corriger' : ''}</div></div>
                <b>{t ? v2(n) + ' / ' + maxT(st) : '—'}</b>
              </div>
              {open === e.id && (
                <div className="card" style={{ margin: '4px 0 12px' }}>
                  <div className="row"><label className="f" style={{ margin: 0 }}>Bonnes réponses au QCM</label>
                    <input type="number" min="0" max={b.qcm} value={t?.qcmBonnes ?? ''} onChange={(x) => setT(e.id, (o) => { o.qcmBonnes = Math.max(0, Math.min(b.qcm, Number(x.target.value))); })} style={{ width: 80 }} />
                    <span className="small muted">/ {b.qcm} (× {String(b.ptQcm).replace('.', ',')} pt)</span></div>
                  {t?.reponses && <details style={{ marginTop: 8 }}><summary className="small">Voir les réponses au QCM</summary>{t.reponses.map((r, i) => <div key={i} className="small" style={{ marginTop: 4 }}>{r.ok ? '✓' : '✗'} {r.q} — <i>{r.rep}</i>{!r.ok && <> (attendu : {r.bonne})</>}</div>)}</details>}
                  {Array.from({ length: b.courtes }).map((_, i) => {
                    const q = t?.courtesQ?.[i]; const c = COURTES.find((x) => x.q === q);
                    return (
                      <div key={i} style={{ marginTop: 10 }}>
                        <b className="small">Question courte {i + 1}{q ? ' : ' + q : ''}</b>
                        {t?.courtesTextes?.[i] !== undefined && <div className="quote small" style={{ margin: '6px 0', fontStyle: 'normal', whiteSpace: 'pre-wrap' }}>{t.courtesTextes[i] || '(pas de réponse)'}</div>}
                        {c && <ul className="tiny muted">{c.corrige.map((x) => <li key={x}>{x}</li>)}</ul>}
                        <div className="row" style={{ gap: 4 }}>{Array.from({ length: b.ptCourte * 4 + 1 }, (_, k) => k / 4).map((v) => <button key={v} className={'chip' + (t?.courtes?.[i] === v ? ' on' : '')} onClick={() => setT(e.id, (o) => { o.courtes = o.courtes || []; o.courtes[i] = v; })}>{v2(v)}</button>)}</div>
                      </div>
                    );
                  })}
                  {t && <button className="btn sm ghost" style={{ marginTop: 10 }} onClick={() => { if (confirm('Effacer la note théorique de cet étudiant ?')) upd((d) => { delete d.evalTheo[e.id]; }); }}><Icon n="trash" />Effacer</button>}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Recap() {
  const { st } = useStore();
  const rows = st.eleves.map((e) => { const p = notePrat(st, e.id), t = noteTheo(st, e.id); return { e, p, t, tot: p !== null && t !== null ? p + t : null }; });
  const exp = () => {
    const out = [['nom', 'prenom', 'groupe', 'niveau', ...grille(st).flatMap((g) => g.criteres.map((c) => c.id)), 'pratique_' + maxP(st), 'qcm_bonnes', 'courtes', 'theorie_' + maxT(st), 'total_' + (maxP(st) + maxT(st)), 'commentaire']];
    rows.forEach(({ e, p, t, tot }) => { const g = st.evalPrat[e.id] || {}; const th = st.evalTheo[e.id] || {}; out.push([e.nom, e.prenom, e.groupe || '', NIVEAUX[e.niveau].label, ...grille(st).flatMap((x) => x.criteres.map((c) => v2(g[c.id] ?? ''))), v2(p), th.qcmBonnes ?? '', (th.courtes || []).map(v2).join(' + '), v2(t), v2(tot), (g.com || '').replace(/;/g, ',')]); });
    download('judo-pro-notes.csv', '﻿' + out.map((r) => r.join(';')).join('\n'), 'text/csv');
  };
  const moy = (k) => { const v = rows.map((r) => r[k]).filter((x) => x !== null); return v.length ? v.reduce((a, b) => a + b, 0) / v.length : null; };
  return (
    <div className="card">
      <div className="row between no-print" style={{ marginBottom: 8 }}>
        <span className="small muted">Moyennes : pratique {v2(moy('p'))} · théorie {v2(moy('t'))} · total {v2(moy('tot'))}</span>
        <div className="row"><button className="btn sm" onClick={() => window.print()}><Icon n="printer" />Imprimer</button><button className="btn sm primary" onClick={exp}><Icon n="download" />Exporter CSV</button></div>
      </div>
      <div className="print-only"><h2>Judo — notes {st.groupeNom}</h2></div>
      <div className="tablewrap">
        <table className="t">
          <thead><tr><th>Étudiant</th><th>Niveau</th>{grille(st).map((g) => <th key={g.epreuve}>{g.epreuve.split(' ')[1].replace(/[()]/g, '')} /{g.total}</th>)}<th>Pratique /{maxP(st)}</th><th>Théorie /{maxT(st)}</th><th>Total /{maxP(st) + maxT(st)}</th></tr></thead>
          <tbody>{rows.map(({ e, p, t, tot }) => {
            const g = st.evalPrat[e.id] || {};
            const sub = (ids) => (ids.some((k) => g[k] !== undefined) ? ids.reduce((a, k) => a + (g[k] || 0), 0) : null);
            return <tr key={e.id}><td><b>{e.nom.toUpperCase()}</b> {e.prenom}</td><td>{NIVEAUX[e.niveau].label}</td>{grille(st).map((gr) => <td key={gr.epreuve}>{v2(sub(gr.criteres.map((c) => c.id)))}</td>)}<td>{v2(p)}</td><td>{v2(t)}</td><td><b>{v2(tot)}</b></td></tr>;
          })}</tbody>
        </table>
      </div>
    </div>
  );
}
