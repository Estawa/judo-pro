import React, { useMemo, useState } from 'react';
import { QCM, COURTES, THEMES, melanger } from '../data/quiz.js';
import { useStore } from '../store.js';
import { PROGRAMMES } from '../data/programme.js';
import { Icon, Seg, toast } from '../ui.jsx';

export function Quiz({ prof }) {
  const [vue, setVue] = useState('train');
  return (
    <div>
      <h1 className="no-print" style={{ marginBottom: 2 }}>Quiz et évaluation théorique</h1>
      <div className="muted small no-print" style={{ marginBottom: 10 }}>{QCM.length} QCM et {COURTES.length} questions courtes avec corrigés</div>
      {prof && <div className="row no-print" style={{ marginBottom: 12 }}><Seg value={vue} onChange={setVue} options={[['train', 'S\'entraîner'], ['exam', 'Passer l\'écrit sur l\'appareil'], ['sujet', 'Sujet à imprimer'], ['banque', 'Banque de questions']]} /></div>}
      {vue === 'train' && <Entrainement />}
      {vue === 'exam' && prof && <Examen />}
      {vue === 'sujet' && prof && <Sujet />}
      {vue === 'banque' && prof && <Banque />}
    </div>
  );
}

function Entrainement() {
  const { st } = useStore();
  const [cfg, setCfg] = useState({ th: [], n: st.parcours === 'staps' ? 'tout' : 'base', nb: 10 });
  const [serie, setSerie] = useState(null);
  const pool = QCM.filter((q) => (cfg.n === 'tout' || q.n === cfg.n) && (!cfg.th.length || cfg.th.includes(q.th)));
  if (serie) return <Serie qs={serie} onEnd={() => setSerie(null)} />;
  const togTh = (k) => setCfg((c) => ({ ...c, th: c.th.includes(k) ? c.th.filter((x) => x !== k) : [...c.th, k] }));
  return (
    <div className="card">
      <h3>Choisir son entraînement</h3>
      <label className="f">Contenu</label>
      <Seg value={cfg.n} onChange={(v) => setCfg({ ...cfg, n: v })} options={[['base', 'Fiche théorie (écrit)'], ['staps', 'Approfondissement STAPS'], ['tout', 'Tout']]} />
      <label className="f" style={{ marginTop: 12 }}>Thèmes (aucun = tous)</label>
      <div className="row">{Object.entries(THEMES).map(([k, l]) => <button key={k} className={'chip' + (cfg.th.includes(k) ? ' on' : '')} onClick={() => togTh(k)}>{l}</button>)}</div>
      <label className="f" style={{ marginTop: 12 }}>Nombre de questions</label>
      <Seg value={cfg.nb} onChange={(v) => setCfg({ ...cfg, nb: v })} options={[[8, '8 (comme à l\'écrit)'], [10, '10'], [20, '20'], [999, 'Toutes']]} />
      <div className="row between" style={{ marginTop: 14 }}>
        <span className="small muted">{pool.length} questions disponibles</span>
        <button className="btn primary" disabled={!pool.length} onClick={() => setSerie(melanger(pool).slice(0, cfg.nb))}><Icon n="play" />Commencer</button>
      </div>
    </div>
  );
}

function Serie({ qs, onEnd }) {
  const [i, setI] = useState(0);
  const [rep, setRep] = useState(null);
  const [score, setScore] = useState(0);
  const [erreurs, setErreurs] = useState([]);
  const ordres = useMemo(() => qs.map((q) => melanger(q.c.map((c, k) => ({ c, k })))), [qs]);
  if (i >= qs.length) {
    return (
      <div className="card">
        <h2>Résultat : {score} / {qs.length}</h2>
        <div className="progress" style={{ margin: '6px 0 14px' }}><div style={{ width: (100 * score / qs.length) + '%' }} /></div>
        {erreurs.length > 0 && <><h3>À revoir</h3>{erreurs.map((q) => <div key={q.q} className="li" style={{ cursor: 'default', display: 'block' }}><div>{q.q}</div><div className="small" style={{ color: 'var(--green)', fontWeight: 600 }}>{q.c[q.r]}</div><div className="small muted">{q.e}</div></div>)}</>}
        <button className="btn primary" style={{ marginTop: 12 }} onClick={onEnd}>Nouvel entraînement</button>
      </div>
    );
  }
  const q = qs[i];
  const choose = (k) => { if (rep !== null) return; setRep(k); if (k === q.r) setScore((s) => s + 1); else setErreurs((e) => [...e, q]); };
  return (
    <div className="card">
      <div className="row between"><span className="chip">{THEMES[q.th]}</span><span className="small muted">{i + 1} / {qs.length} · {score} bonne(s)</span></div>
      <div className="progress" style={{ margin: '10px 0' }}><div style={{ width: (100 * i / qs.length) + '%' }} /></div>
      <p style={{ fontFamily: 'var(--serif)', fontSize: '1.25rem' }}>{q.q}</p>
      {ordres[i].map(({ c, k }) => <button key={k} className={'qopt' + (rep !== null ? (k === q.r ? ' ok' : rep === k ? ' ko' : '') : '')} onClick={() => choose(k)}>{c}</button>)}
      {rep !== null && (
        <div style={{ marginTop: 12 }}>
          <p className="small"><b>{rep === q.r ? 'Bonne réponse. ' : 'Pas tout à fait. '}</b>{q.e}</p>
          <button className="btn primary" onClick={() => { setRep(null); setI(i + 1); }}>{i + 1 < qs.length ? 'Question suivante' : 'Voir le résultat'}<Icon n="right" /></button>
        </div>
      )}
      <button className="linkbtn" style={{ marginTop: 10, display: 'block' }} onClick={onEnd}>Arrêter</button>
    </div>
  );
}

export function tirage(st, seed, contenu = 'base') {
  const b = st.bareme;
  const qs = QCM.filter((q) => contenu === 'tout' || q.n === contenu);
  const cs = st.parcours === 'eleves' ? COURTES.filter((q) => q.n === 'didac') : COURTES.filter((q) => q.n !== 'didac' && (contenu === 'tout' || q.n === contenu));
  const qcm = melanger(qs, seed).slice(0, b.qcm).map((q, i) => {
    const o = melanger(q.c.map((c, k) => ({ c, k })), seed + 31 * (i + 1));
    return { ...q, c: o.map((x) => x.c), r: o.findIndex((x) => x.k === q.r) };
  });
  return { qcm, courtes: melanger(cs, seed + 7).slice(0, b.courtes) };
}

function Examen() {
  const { st, upd } = useStore();
  const [eleve, setEleve] = useState('');
  const [contenu, setContenu] = useState(st.parcours === 'staps' ? 'tout' : 'base');
  const [ex, setEx] = useState(null);
  const [rep, setRep] = useState({});
  const [txt, setTxt] = useState({});
  const el = [...st.eleves].sort((a, b) => (a.nom + a.prenom).localeCompare(b.nom + b.prenom));
  const start = () => { const seed = Math.floor(Math.random() * 1e9); setEx({ ...tirage(st, seed, contenu), seed }); setRep({}); setTxt({}); };
  const finir = () => {
    const bonnes = ex.qcm.filter((q, i) => rep[i] === q.r).length;
    upd((d) => {
      d.evalTheo[eleve] = { qcmBonnes: bonnes, qcmTotal: ex.qcm.length, seed: ex.seed, contenu, date: new Date().toISOString(), reponses: ex.qcm.map((q, i) => ({ q: q.q, rep: rep[i] !== undefined ? q.c[rep[i]] : '—', ok: rep[i] === q.r, bonne: q.c[q.r] })), courtesQ: ex.courtes.map((c) => c.q), courtesTextes: ex.courtes.map((_, i) => txt[i] || ''), courtes: ex.courtes.map(() => null) };
    });
    setEx(null); setEleve(''); toast('Copie enregistrée. Les questions courtes sont à corriger dans « Évaluation ».');
  };
  if (!ex) {
    return (
      <div className="card">
        <h3>Écrit sur l'appareil (tablette ou téléphone du professeur)</h3>
        <p className="small muted">L'étudiant répond seul : {st.bareme.qcm} QCM tirés au sort ({st.bareme.ptQcm} pt chacun, corrigés automatiquement) et {st.bareme.courtes} questions courtes ({st.bareme.ptCourte} pt chacune) que vous corrigerez ensuite.</p>
        {!el.length ? <div className="empty">Ajoutez d'abord vos étudiants dans l'onglet « Groupe ».</div> : (
          <>
            <label className="f">Étudiant</label>
            <select value={eleve} onChange={(e) => setEleve(e.target.value)}><option value="">Choisir…</option>{el.map((e) => <option key={e.id} value={e.id}>{e.nom.toUpperCase()} {e.prenom}{st.evalTheo[e.id] ? ' (déjà passé)' : ''}</option>)}</select>
            <label className="f" style={{ marginTop: 10 }}>Contenu</label>
            <Seg value={contenu} onChange={setContenu} options={[['base', 'Fiche théorie'], ['tout', 'Fiche + STAPS'], ['staps', 'STAPS seul']]} />
            <div style={{ marginTop: 14 }}><button className="btn primary" disabled={!eleve} onClick={start}><Icon n="play" />Commencer l'écrit</button></div>
          </>
        )}
      </div>
    );
  }
  const e = st.eleves.find((x) => x.id === eleve);
  return (
    <div className="stack">
      <div className="card"><b>{e.nom.toUpperCase()} {e.prenom}</b> — évaluation théorique. Réponds à toutes les questions puis touche « Rendre ma copie ».</div>
      {ex.qcm.map((q, i) => (
        <div key={i} className="card">
          <b>{i + 1}. {q.q}</b>
          {q.c.map((c, k) => <button key={k} className={'qopt' + (rep[i] === k ? ' ok' : '')} style={rep[i] === k ? { borderColor: 'var(--ink)', background: 'var(--bg2)' } : {}} onClick={() => setRep({ ...rep, [i]: k })}>{c}</button>)}
        </div>
      ))}
      {ex.courtes.map((q, i) => (
        <div key={'c' + i} className="card"><b>{ex.qcm.length + i + 1}. {q.q}</b><textarea rows={6} value={txt[i] || ''} onChange={(ev) => setTxt({ ...txt, [i]: ev.target.value })} style={{ marginTop: 8 }} /></div>
      ))}
      <div className="row"><button className="btn primary" onClick={() => { if (Object.keys(rep).length < ex.qcm.length && !confirm('Certaines questions sont sans réponse. Rendre quand même ?')) return; finir(); }}><Icon n="check" />Rendre ma copie</button>
        <button className="btn" onClick={() => setEx(null)}>Annuler</button></div>
    </div>
  );
}

function Sujet() {
  const { st } = useStore();
  const [seed, setSeed] = useState(() => Math.floor(Math.random() * 1e6));
  const [contenu, setContenu] = useState(st.parcours === 'staps' ? 'tout' : 'base');
  const [corr, setCorr] = useState(false);
  const s = useMemo(() => tirage(st, seed, contenu), [st.bareme, seed, contenu]);
  const b = st.bareme;
  const total = b.qcm * b.ptQcm + b.courtes * b.ptCourte;
  return (
    <div>
      <div className="card no-print" style={{ marginBottom: 12 }}>
        <div className="row">
          <Seg value={contenu} onChange={setContenu} options={[['base', 'Fiche théorie'], ['tout', 'Fiche + STAPS'], ['staps', 'STAPS seul']]} />
          <button className="btn sm" onClick={() => setSeed(Math.floor(Math.random() * 1e6))}><Icon n="shuffle" />Autre tirage</button>
          <label className="row small"><input type="checkbox" checked={corr} onChange={(e) => setCorr(e.target.checked)} />Afficher le corrigé</label>
          <button className="btn sm primary" onClick={() => window.print()}><Icon n="printer" />Imprimer</button>
        </div>
        <p className="tiny muted" style={{ marginTop: 6 }}>Sujet n° {seed} · imprimez une fois sans corrigé (sujet) et une fois avec (corrigé). Impression en noir et blanc.</p>
      </div>
      <div className="card">
        <h2 style={{ marginBottom: 2 }}>Judo — évaluation théorique{corr ? ' — CORRIGÉ' : ''}</h2>
        <div className="small">{st.groupeNom} · durée {PROGRAMMES[st.prog]?.dureeEcrit || 30} min · noté sur {total} · sujet n° {seed}</div>
        {!corr && <div className="small" style={{ marginTop: 8 }}>Nom : ........................................ Prénom : .................................... Niveau : ..........</div>}
        <h3 style={{ marginTop: 14 }}>Partie 1 — QCM ({b.qcm} × {String(b.ptQcm).replace('.', ',')} pt) : cochez la bonne réponse</h3>
        {s.qcm.map((q, i) => (
          <div key={i} className="qprint" style={{ marginBottom: 10 }}>
            <b>{i + 1}. {q.q}</b>
            <div>{q.c.map((c, k) => <div key={k} className="small" style={{ marginLeft: 12, fontWeight: corr && k === q.r ? 700 : 400 }}>{corr && k === q.r ? '☒' : '☐'} {c}</div>)}</div>
          </div>
        ))}
        <h3 style={{ marginTop: 14 }}>Partie 2 — Questions courtes ({b.courtes} × {String(b.ptCourte).replace('.', ',')} pt)</h3>
        {s.courtes.map((q, i) => (
          <div key={i} className="qprint" style={{ marginBottom: 12 }}>
            <b>{b.qcm + i + 1}. {q.q}</b>
            {corr ? <ul className="small">{q.corrige.map((x) => <li key={x}>{x}</li>)}</ul> : <div style={{ height: 150, borderBottom: '1px dotted var(--ink2)', backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, var(--line) 28px)' }} />}
          </div>
        ))}
      </div>
    </div>
  );
}

function Banque() {
  const [th, setTh] = useState('');
  return (
    <div className="stack">
      <div className="card no-print"><div className="row">
        <select value={th} onChange={(e) => setTh(e.target.value)} style={{ maxWidth: 300 }}><option value="">Tous les thèmes</option>{Object.entries(THEMES).map(([k, l]) => <option key={k} value={k}>{l}</option>)}</select>
        <button className="btn sm" onClick={() => window.print()}><Icon n="printer" />Imprimer la banque</button>
      </div></div>
      <div className="card">
        <h3>QCM</h3>
        {QCM.filter((q) => !th || q.th === th).map((q, i) => (
          <div key={i} className="li qprint" style={{ display: 'block', cursor: 'default' }}>
            <div className="row between"><b>{q.q}</b><span className={'chip ' + (q.n === 'fiche' || q.n === 'base' ? 'green' : 'red')}>{{ staps: 'STAPS', didac: 'Didactique' }[q.n] || 'Fiche'}</span></div>
            <div className="small">Réponse : <b>{q.c[q.r]}</b> — {q.e}</div>
          </div>
        ))}
      </div>
      {!th && (
        <div className="card">
          <h3>Questions courtes et éléments de corrigé</h3>
          {COURTES.map((q, i) => (
            <div key={i} className="li qprint" style={{ display: 'block', cursor: 'default' }}>
              <div className="row between"><b>{q.q}</b><span className={'chip ' + (q.n === 'fiche' || q.n === 'base' ? 'green' : 'red')}>{{ staps: 'STAPS', didac: 'Didactique' }[q.n] || 'Fiche'}</span></div>
              <ul className="small">{q.corrige.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
