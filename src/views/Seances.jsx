import React, { useState, useMemo } from 'react';
import { SEANCES } from '../data/seances.js';
import { PROGRAMMES, STRUCTURE, PRINCIPES, OBJECTIFS_NIVEAU } from '../data/programme.js';
import { LIENS_STAPS_24, LIENS_STAPS_12, CHAPITRES } from '../data/theorie.js';
import { tech, NIVEAUX } from '../data/techniques.js';
import { useStore } from '../store.js';
import { Icon, Lvl, Seg, Modal, Back } from '../ui.jsx';
import { TechDetail } from './Techniques.jsx';
import { ChapitreView } from './Theorie.jsx';
import { Chrono } from './Chrono.jsx';
import { VOLET } from '../data/staps.js';
import { FondamentauxSeance } from './Fondamentaux.jsx';
import { ETAPES_P15, PUBLIC_P15, CONTENUS_P15, STRUCTURE_P15, SECURITE_P15 } from '../data/progEleves.js';

const OPTIONS_PROG = { suaps: [['p24', '24 séances'], ['p12', '12 séances']], staps: [['p24', '24 séances'], ['p12', '12 séances']], eleves: [['p15', '15 séances']] };

const isEval = (prog, n) => { const p = PROGRAMMES[prog]; return n === p.theo || p.prat.includes(n) || n === p.bilan && prog === 'p24'; };
const cap = (x) => (x ? x.charAt(0).toUpperCase() + x.slice(1) : x);
const dateFr = (d) => (d ? new Date(d + 'T12:00').toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' }) : '');

export function Seances({ prof }) {
  const { st, upd } = useStore();
  const prog = st.prog;
  const [sel, setSel] = useState(null);
  const [niv, setNiv] = useState(st.niveauVue || 'tous');
  const list = SEANCES[prog];
  const faites = st.faites[prog] || {};
  const nbFaites = Object.values(faites).filter(Boolean).length;
  const [info, setInfo] = useState(false);
  const prochaine = list.find((s) => !faites[s.n]);

  if (sel) return <SeanceDetail s={list.find((x) => x.n === sel)} prof={prof} niv={niv} onBack={() => setSel(null)} onGo={(n) => setSel(n)} />;

  let lastBloc = null;
  return (
    <div>
      <div className="row between" style={{ marginBottom: 10 }}>
        <div>
          <h1 style={{ marginBottom: 2 }}>Programmation</h1>
          <div className="muted small">{st.groupeNom || 'Groupe'} · {PROGRAMMES[prog].label} · séances de 1 h 30{prog === 'p15' ? ' · progression pour débutants, présentée comme à des élèves' : ''}</div>
        </div>
        <div className="row">
          {prof && prog !== 'p15' && <Seg value={prog} onChange={(v) => upd((d) => { d.prog = v; })} options={OPTIONS_PROG[st.parcours || 'suaps']} />}
          <button className="btn sm" onClick={() => setInfo(true)}><Icon n="info" />Cadre</button>
        </div>
      </div>
      <div className="card" style={{ marginBottom: 12 }}>
        <div className="row between">
          {prog === 'p15' ? <span className="muted small">Progression unique pour un groupe débutant : 5 étapes, du sol au debout, puis évaluation en S14 et S15.</span> : (
          <div className="row"><span className="muted small">Voir le contenu du niveau</span>
            <Seg value={niv} onChange={(v) => { setNiv(v); upd((d) => { d.niveauVue = v; }); }} options={[['tous', 'Tous'], ['D', 'Débutant'], ['I', 'Inter.'], ['C', 'Confirmé'], ['A', 'Avancé']]} />
          </div>)}
          {prof && <div className="small"><b>{nbFaites}</b> / {list.length} séances faites</div>}
        </div>
        {prof && <div className="progress" style={{ marginTop: 10 }}><div style={{ width: (100 * nbFaites / list.length) + '%' }} /></div>}
        {prof && prochaine && (
          <button className="btn primary" style={{ marginTop: 12 }} onClick={() => setSel(prochaine.n)}><Icon n="play" />Prochaine séance : S{prochaine.n} — {prochaine.titre.split(' (')[0]}</button>
        )}
      </div>
      <div className="card">
        <div className="list">
          {list.map((s) => {
            const head = s.bloc !== lastBloc ? (lastBloc = s.bloc) : null;
            const pres = st.appel[prog]?.[s.n];
            const nbP = pres ? Object.values(pres).filter((x) => x === 'p').length : null;
            return (
              <React.Fragment key={s.n}>
                {head && <div className="bloc-h">{head}</div>}
                <div className="li" onClick={() => setSel(s.n)}>
                  <span className={'num' + (faites[s.n] ? ' done' : '') + (isEval(prog, s.n) ? ' eval' : '')}>{s.n}</span>
                  <div className="grow">
                    <div style={{ fontWeight: 500 }}>{s.titre}</div>
                    <div className="muted small">{cap(s.objectif)}</div>
                    {(st.dates[prog]?.[s.n] || nbP !== null) && <div className="tiny muted" style={{ marginTop: 2 }}>{dateFr(st.dates[prog]?.[s.n])}{nbP !== null && prof ? ` · ${nbP} présent(s)` : ''}</div>}
                  </div>
                  <Icon n="right" style={{ width: 18, color: 'var(--ink2)' }} />
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
      {info && <Modal title="Cadre de la programmation" onClose={() => setInfo(false)}><Cadre prog={prog} /></Modal>}
    </div>
  );
}

export function Cadre({ prog }) {
  if (prog === 'p15') return <CadreP15 />;
  return (
    <div className="stack">
      <p>{PROGRAMMES[prog].blocs}</p>
      <h3>Principes</h3>
      <ul>{PRINCIPES.map((p) => <li key={p}>{p}</li>)}</ul>
      <h3>Les 4 niveaux</h3>
      <p className="small muted">Fixés en S1 par un test de positionnement (chutes + randori au sol), réajustables en S{PROGRAMMES[prog].reajust}.</p>
      <table className="t"><thead><tr><th>Niveau</th><th>Profil</th><th>Objectif de fin de cycle</th></tr></thead>
        <tbody>{['D', 'I', 'C', 'A'].map((n) => <tr key={n}><td><Lvl n={n} /> {NIVEAUX[n].label}</td><td>{NIVEAUX[n].grade}</td><td>{OBJECTIFS_NIVEAU[n]}</td></tr>)}</tbody></table>
      <h3>Structure type d'une séance (1 h 30)</h3>
      <table className="t"><tbody>{STRUCTURE.map(([a, m, b], i) => <tr key={i}><td><b>{i + 1}. {a}</b><div className="small muted">{b}</div></td><td style={{ whiteSpace: 'nowrap' }}>{m} min</td></tr>)}</tbody></table>
    </div>
  );
}

function CadreP15() {
  return (
    <div className="stack">
      <p>{PROGRAMMES.p15.blocs}</p>
      <h3>Public et finalité</h3>
      <ul>{PUBLIC_P15.map((p) => <li key={p}>{p}</li>)}</ul>
      <h3>Contenus à acquérir sur le cycle</h3>
      <ul>{CONTENUS_P15.map(([a, b]) => <li key={a}><b>{a} : </b>{b}</li>)}</ul>
      <h3>Progression générale</h3>
      <table className="t"><thead><tr><th>Séances</th><th>Étape</th><th>Contenus dominants</th></tr></thead>
        <tbody>{ETAPES_P15.map(([a, b, c]) => <tr key={a}><td style={{ whiteSpace: 'nowrap' }}>{a}</td><td><b>{b}</b></td><td>{c}</td></tr>)}</tbody></table>
      <h3>Organisation type d'une séance (1 h 30)</h3>
      <table className="t"><tbody>{STRUCTURE_P15.map(([a, m, b], i) => <tr key={i}><td><b>{i + 1}. {a}</b><div className="small muted">{b}</div></td><td style={{ whiteSpace: 'nowrap' }}>{m} min</td></tr>)}</tbody></table>
      <h3>Règles de sécurité permanentes</h3>
      <ul>{SECURITE_P15.map((p) => <li key={p}>{p}</li>)}</ul>
    </div>
  );
}

function SeanceDetail({ s, prof, niv, onBack, onGo }) {
  const { st, upd } = useStore();
  const prog = st.prog;
  const [techOpen, setTechOpen] = useState(null);
  const [chap, setChap] = useState(null);
  const [appel, setAppel] = useState(false);
  const [chrono, setChrono] = useState(false);
  const [rev, setRev] = useState({});
  const liens = ({ p24: LIENS_STAPS_24, p12: LIENS_STAPS_12 }[prog] || {})[s.n] || [];
  const fait = !!st.faites[prog]?.[s.n];
  const total = SEANCES[prog].length;
  const techs = (s.tech || []).map(tech).filter(Boolean);
  const th = s.theorie;

  return (
    <div>
      <Back onClick={onBack} label="Toutes les séances" />
      <div className="row between" style={{ alignItems: 'flex-start' }}>
        <div style={{ flex: 1, minWidth: 220 }}>
          <div className="muted small">{s.bloc}</div>
          <h1>Séance {s.n} — {s.titre}</h1>
        </div>
        <div className="row no-print">
          <button className="iconbtn" disabled={s.n <= 1} onClick={() => onGo(s.n - 1)} aria-label="Séance précédente"><Icon n="left" /></button>
          <button className="iconbtn" disabled={s.n >= total} onClick={() => onGo(s.n + 1)} aria-label="Séance suivante"><Icon n="right" /></button>
        </div>
      </div>

      {prof && (
        <div className="card no-print" style={{ marginBottom: 12 }}>
          <div className="row">
            <button className={'btn ' + (fait ? 'dark' : '')} onClick={() => upd((d) => { d.faites[prog][s.n] = !fait; })}><Icon n="check" />{fait ? 'Séance faite' : 'Marquer comme faite'}</button>
            <button className="btn" onClick={() => setAppel(true)}><Icon n="users" />Appel</button>
            <button className="btn" onClick={() => setChrono(true)}><Icon n="timer" />Chrono randori</button>
            <button className="btn" onClick={() => window.print()}><Icon n="printer" />Imprimer</button>
            <div style={{ flex: 1 }} />
            <input type="date" value={st.dates[prog]?.[s.n] || ''} onChange={(e) => upd((d) => { d.dates[prog][s.n] = e.target.value; })} style={{ width: 170 }} aria-label="Date de la séance" />
          </div>
        </div>
      )}

      <div className="grid g2" style={{ alignItems: 'start' }}>
        <div className="stack">
          <div className="card">
            <h3>Objectif</h3>
            <p>{cap(s.objectif)}</p>
            <h3>Déroulement</h3>
            <div className="list">
              {s.deroule.map(([l, t], i) => <div key={i} className="li" style={{ cursor: 'default', alignItems: 'flex-start' }}><div className="grow"><b>{l}</b><div className="small">{cap(t)}</div></div></div>)}
            </div>
            {s.criteres && <><h3 style={{ marginTop: 10 }}>Critères de réussite</h3><p className="small">{cap(s.criteres)}</p></>}
          </div>
          {s.didac && (
            <div className="card">
              <h3>Point didactique (pour enseigner à des débutants)</h3>
              <p className="small">{s.didac}</p>
            </div>
          )}
          {Object.keys(s.niveaux).length > 0 && (
            <div className="card">
              <h3>Déclinaison par niveau</h3>
              <div className="stack">
                {['D', 'I', 'C', 'A'].filter((n) => s.niveaux[n]).map((n) => (
                  <div key={n} className={'lvlbox' + (niv === n ? ' hl' : '')} style={{ opacity: niv !== 'tous' && niv !== n ? 0.55 : 1 }}>
                    <div className="row" style={{ marginBottom: 2 }}><Lvl n={n} /><b>{NIVEAUX[n].label}</b></div>
                    <div className="small">{cap(s.niveaux[n])}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="stack">
          {techs.length > 0 && (
            <div className="card">
              <h3>Techniques de la séance</h3>
              <div className="row">
                {techs.filter((t) => niv === 'tous' || t.niv === niv || (niv !== 'tous' && 'DICA'.indexOf(t.niv) <= 'DICA'.indexOf(niv))).map((t) => (
                  <button key={t.id} className="chip" onClick={() => setTechOpen(t.id)}><Lvl n={t.niv} />{t.nom}</button>
                ))}
              </div>
              <p className="tiny muted" style={{ marginTop: 8 }}>Touchez une technique pour voir le schéma animé, les points clés et les vidéos.</p>
            </div>
          )}
          <FondamentauxSeance prog={prog} n={s.n} onOpen={() => window.dispatchEvent(new CustomEvent('goto-tab', { detail: 'fond' }))} />
          {th && (
            <div className="card">
              <h3>Théorie en 5 minutes : {th.titre}</h3>
              {th.dire && <div className="quote small" style={{ marginBottom: 10 }}>{th.dire}</div>}
              {th.quiz.length > 0 ? (
                <>
                  <div className="small muted" style={{ marginBottom: 4 }}>{th.quizTitre.replace(/:$/, '')} — poser la question, laisser 3 secondes, interroger quelqu'un</div>
                  {th.quiz.map(([q, a], i) => (
                    <div key={i} className="li" style={{ alignItems: 'flex-start' }} onClick={() => setRev((r) => ({ ...r, [i]: !r[i] }))}>
                      <div className="grow"><div>{q}</div>{rev[i] ? <div className="small" style={{ color: 'var(--green)', fontWeight: 600 }}>{a}</div> : <div className="tiny muted">Toucher pour voir la réponse</div>}</div>
                    </div>
                  ))}
                </>
              ) : th.quizTitre && <p className="small muted">{th.quizTitre}</p>}
            </div>
          )}
          {st.parcours === 'staps' && VOLET[prog]?.[s.n] && <VoletStaps n={s.n} prof={prof} />}
          {liens.length > 0 && (
            <div className="card">
              <h3>Pour aller plus loin (L2 STAPS)</h3>
              <div className="row">{liens.map((id) => { const c = CHAPITRES.find((x) => x.id === id); return <button key={id} className="chip" onClick={() => setChap(id)}><Icon n="book" style={{ width: 14 }} />{c.titre}</button>; })}</div>
            </div>
          )}
          {prof && (
            <div className="card">
              <h3>Mes notes de séance</h3>
              <textarea rows={4} value={st.notesSeance[prog]?.[s.n] || ''} placeholder="Ce qui a marché, à reprendre, binômes…" onChange={(e) => upd((d) => { d.notesSeance[prog][s.n] = e.target.value; })} />
            </div>
          )}
        </div>
      </div>
      {techOpen && <Modal title="Technique" onClose={() => setTechOpen(null)}><TechDetail id={techOpen} prof={prof} /></Modal>}
      {chap && <Modal title="Théorie" onClose={() => setChap(null)}><ChapitreView id={chap} /></Modal>}
      {appel && <Modal title={`Appel — séance ${s.n}`} onClose={() => setAppel(false)}><Appel n={s.n} /></Modal>}
      {chrono && <Modal title="Chrono randori" onClose={() => setChrono(false)}><Chrono /></Modal>}
    </div>
  );
}

function Appel({ n }) {
  const { st, upd } = useStore();
  const prog = st.prog;
  const a = st.appel[prog]?.[n] || {};
  const el = st.eleves;
  if (!el.length) return <div className="empty">Aucun étudiant. Ajoutez votre groupe dans l'onglet « Groupe ».</div>;
  const set = (id, v) => upd((d) => { d.appel[prog][n] = { ...(d.appel[prog][n] || {}), [id]: v }; });
  const tous = () => upd((d) => { d.appel[prog][n] = Object.fromEntries(st.eleves.map((e) => [e.id, 'p'])); });
  const cpt = (v) => Object.values(a).filter((x) => x === v).length;
  return (
    <div>
      <div className="row between" style={{ marginBottom: 6 }}>
        <span className="small">Présents {cpt('p')} · Absents {cpt('a')} · Dispensés {cpt('d')}</span>
        <button className="btn sm" onClick={tous}>Tous présents</button>
      </div>
      <div className="list">
        {el.map((e) => (
          <div key={e.id} className="li" style={{ cursor: 'default' }}>
            <Lvl n={e.niveau || 'D'} />
            <div className="grow">{e.nom.toUpperCase()} {e.prenom}</div>
            <div className="att">
              {[['p', 'P'], ['a', 'A'], ['d', 'D']].map(([v, l]) => <button key={v} className={(a[e.id] === v ? 'on ' : '') + v} onClick={() => set(e.id, a[e.id] === v ? null : v)} title={{ p: 'Présent', a: 'Absent', d: 'Dispensé' }[v]}>{l}</button>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function VoletStaps({ n, prof }) {
  const { st, upd } = useStore();
  const prog = st.prog;
  const [obj, tache] = VOLET[prog][n];
  const iv = st.interv?.[prog]?.[n] || {};
  const nom = (id) => { const e = st.eleves.find((x) => x.id === id); return e ? `${e.prenom} ${e.nom}` : '?'; };
  const tog = (role, id) => upd((d) => { d.interv = d.interv || { p24: {}, p12: {}, p15: {} }; d.interv[prog] = d.interv[prog] || {}; const x = d.interv[prog][n] || {}; const l = x[role] || []; x[role] = l.includes(id) ? l.filter((y) => y !== id) : [...l, id]; d.interv[prog][n] = x; });
  const nb = (id) => Object.values(st.interv?.[prog] || {}).reduce((a, x) => a + ((x.echauf || []).includes(id) ? 1 : 0) + ((x.situation || []).includes(id) ? 1 : 0), 0);
  return (
    <div className="card" style={{ borderColor: 'var(--ink)' }}>
      <h3>Volet L2 STAPS</h3>
      <p className="small"><b>Objectif de formation : </b>{obj}</p>
      <p className="small"><b>Tâche des étudiants : </b>{tache}</p>
      {[['echauf', 'Conduisent l\'échauffement'], ['situation', 'Conduisent une situation']].map(([r, l]) => (
        <div key={r} style={{ marginTop: 8 }}>
          <div className="small"><b>{l} : </b>{(iv[r] || []).length ? iv[r].map(nom).join(', ') : <span className="muted">personne</span>}</div>
          {prof && st.eleves.length > 0 && (
            <select value="" onChange={(e) => e.target.value && tog(r, e.target.value)} style={{ marginTop: 4 }}>
              <option value="">Ajouter ou retirer un étudiant…</option>
              {st.eleves.map((e) => <option key={e.id} value={e.id}>{(iv[r] || []).includes(e.id) ? '✓ ' : ''}{e.nom.toUpperCase()} {e.prenom} ({nb(e.id)} intervention(s))</option>)}
            </select>
          )}
        </div>
      ))}
      <p className="tiny muted" style={{ marginTop: 8 }}>L'intervention se note dans Évaluation (critère C) ; l'onglet « Observer » contient la fiche de préparation et la fiche d'observation.</p>
    </div>
  );
}
