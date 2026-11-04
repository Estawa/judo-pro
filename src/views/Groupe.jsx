import React, { useMemo, useState } from 'react';
import { useStore, uid, noteTheo, notePrat } from '../store.js';
import { maxP, maxT } from './Evaluation.jsx';
import { NIVEAUX, TECHNIQUES, FAMILLES } from '../data/techniques.js';
import { EXIGENCES_BILAN, PROGRAMMES, DEMO } from '../data/programme.js';
import { Icon, Lvl, Seg, Modal, toast, download } from '../ui.jsx';
import { melanger } from '../data/quiz.js';
import { lireTableur } from '../tableur.js';

const sansAccent = (x) => String(x || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();
const nouvelEleve = (nom, prenom, groupe, lv) => ({ id: uid(), nom, prenom, groupe, niveau: 'DICA'.includes(lv) && lv ? lv : 'D', tokui: '', demo: [], bilan: { forts: ['', ''], axes: ['', ''] }, notes: '' });
// « DUPONT Marie » ou « DE LA TOUR Jean-Paul » → nom en majuscules, puis prénom
const couperNomPrenom = (x) => { const m = String(x).trim().split(/\s+/); let i = 0; while (i < m.length - 1 && m[i] === m[i].toUpperCase() && /\p{L}/u.test(m[i])) i++; return i ? [m.slice(0, i).join(' '), m.slice(i).join(' ')] : [m[0], m.slice(1).join(' ')]; };

// Transforme les lignes d'un tableur (csv, xlsx, xls, ods) en étudiants, dans l'ordre du fichier
export function lignesEnEleves(lignes) {
  lignes = lignes.map((l) => l.map((x) => String(x ?? '').trim())).filter((l) => l.some(Boolean));
  if (!lignes.length) return [];
  // la ligne d'en-tête peut être précédée d'un titre : on la cherche dans les 10 premières lignes
  let h = -1, iN = -1, iP = -1, iC = -1, iL = -1, iNP = -1;
  for (let r = 0; r < Math.min(10, lignes.length); r++) {
    const head = lignes[r].map(sansAccent);
    const n = head.findIndex((x) => /^nom( de famille| d'usage)?$/.test(x) || x === 'nom eleve'), pr = head.findIndex((x) => /^prenom/.test(x));
    const np = head.findIndex((x) => /^(eleve|eleves|nom et prenom|nom prenom|nom - prenom|etudiant|nom complet)$/.test(x));
    if ((n >= 0 && pr >= 0) || np >= 0) {
      h = r; iN = n; iP = pr; iNP = n >= 0 && pr >= 0 ? -1 : np;
      iC = head.findIndex((x) => /classe|groupe|division|td/.test(x)); iL = head.findIndex((x) => /^niveau/.test(x));
      break;
    }
  }
  if (h < 0) { iN = 0; iP = 1; iC = lignes[0].length > 2 ? 2 : -1; }
  return lignes.slice(h + 1).map((c) => {
    let nom, prenom;
    if (iNP >= 0) [nom, prenom] = couperNomPrenom(c[iNP] || '');
    else if (h < 0 && lignes[0].length === 1) [nom, prenom] = couperNomPrenom(c[0] || '');
    else { nom = c[iN] || ''; prenom = c[iP] || ''; }
    const lv = iL >= 0 ? sansAccent(c[iL]).toUpperCase()[0] : '';
    return nom ? nouvelEleve(nom, prenom, iC >= 0 ? c[iC] || '' : '', lv) : null;
  }).filter(Boolean);
}

export function Groupe() {
  const { st, upd } = useStore();
  const [f, setF] = useState('');
  const [open, setOpen] = useState(null);
  const [ajout, setAjout] = useState(false);
  const [bin, setBin] = useState(false);
  const prog = st.prog;
  const nbSeances = Object.keys(st.appel[prog] || {}).length;
  const pres = (id) => { let p = 0, t = 0; Object.values(st.appel[prog] || {}).forEach((s) => { if (s[id]) { t++; if (s[id] === 'p') p++; } }); return t ? `${p}/${t}` : '—'; };
  const list = st.eleves.filter((e) => !f || e.niveau === f);
  const cpt = (n) => st.eleves.filter((e) => e.niveau === n).length;

  const importer = (e) => {
    const file = e.target.files[0]; e.target.value = '';
    if (!file) return;
    lireTableur(file).then((lignes) => {
      const l = lignesEnEleves(lignes);
      if (!l.length) { toast('Aucun étudiant trouvé dans le fichier'); return; }
      const deja = new Set(st.eleves.map((x) => sansAccent(x.nom + ' ' + x.prenom)));
      const nouveaux = l.filter((x) => !deja.has(sansAccent(x.nom + ' ' + x.prenom)));
      upd((d) => { d.eleves.push(...nouveaux); });
      const doublons = l.length - nouveaux.length;
      toast(`${nouveaux.length} étudiant(s) importé(s), dans l'ordre du fichier${doublons ? ` · ${doublons} déjà présent(s), ignoré(s)` : ''}`);
    }).catch((err) => toast('Lecture impossible : ' + (err.message || 'format non reconnu')));
  };
  const exporter = () => {
    const rows = [['nom', 'prenom', 'groupe', 'niveau', 'presences', 'pratique_14', 'theorie_6', 'total_20']];
    st.eleves.forEach((e) => { const p = notePrat(st, e.id), t = noteTheo(st, e.id); rows.push([e.nom, e.prenom, e.groupe, NIVEAUX[e.niveau].label, pres(e.id), p ?? '', t ?? '', p !== null && t !== null ? p + t : '']); });
    download('judo-pro-groupe.csv', '﻿' + rows.map((r) => r.join(';')).join('\n'), 'text/csv');
  };

  return (
    <div>
      <div className="row between" style={{ marginBottom: 10 }}>
        <div><h1 style={{ marginBottom: 2 }}>Groupe</h1><div className="muted small">{st.eleves.length} étudiant(s) · {nbSeances} appel(s) fait(s)</div></div>
        <div className="row">
          <button className="btn sm primary" onClick={() => setAjout(true)}><Icon n="plus" />Ajouter</button>
          <label className="btn sm"><Icon n="upload" />Importer (CSV, Excel, ODS)<input type="file" accept=".csv,.txt,.xlsx,.xls,.ods,text/csv,text/plain,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,application/vnd.oasis.opendocument.spreadsheet" hidden onChange={importer} /></label>
          <button className="btn sm" onClick={exporter} disabled={!st.eleves.length}><Icon n="download" />Exporter</button>
          <button className="btn sm" onClick={() => setBin(true)} disabled={st.eleves.length < 2}><Icon n="shuffle" />Binômes</button>
        </div>
      </div>
      <div className="card" style={{ marginBottom: 12 }}>
        <div className="row">
          <Seg value={f} onChange={setF} options={[['', `Tous (${st.eleves.length})`], ['D', `Débutants (${cpt('D')})`], ['I', `Inter. (${cpt('I')})`], ['C', `Confirmés (${cpt('C')})`], ['A', `Avancés (${cpt('A')})`]]} />
        </div>
        <p className="tiny muted" style={{ marginTop: 8 }}>Import d'un fichier .csv, .xlsx, .xls (Excel) ou .ods (LibreOffice) : première feuille, colonnes Nom, Prénom, Classe (ou Groupe) et éventuellement Niveau (D, I, C, A ou Débutant, Intermédiaire…). Une seule colonne « Élève » au format « NOM Prénom » marche aussi. Une ligne de titre au-dessus des en-têtes est ignorée. L'ordre du fichier est conservé, comme dans EPS Pro ; un étudiant déjà présent n'est pas ajouté deux fois. Le niveau est fixé en S1 (test de positionnement) et réajustable en S{PROGRAMMES[prog].reajust}.</p>
      </div>
      <div className="card">
        {!list.length ? <div className="empty">Aucun étudiant. Ajoutez-les un par un ou importez votre fichier de classe.</div> : (
          <div className="list">
            {list.map((e) => {
              const p = notePrat(st, e.id), t = noteTheo(st, e.id);
              return (
                <div key={e.id} className="li" onClick={() => setOpen(e.id)}>
                  <Lvl n={e.niveau} />
                  <div className="grow"><b>{e.nom.toUpperCase()}</b> {e.prenom} <span className="small muted">{e.groupe}</span>
                    <div className="tiny muted">Présences {pres(e.id)}{e.tokui ? ' · tokui-waza : ' + (TECHNIQUES.find((x) => x.id === e.tokui)?.nom || '') : ''}</div></div>
                  <div className="small" style={{ textAlign: 'right' }}>{p !== null || t !== null ? <b>{((p || 0) + (t || 0)).toString().replace('.', ',')} / {maxP(st) + maxT(st)}</b> : <span className="muted">—</span>}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {ajout && <Modal title="Ajouter un étudiant" onClose={() => setAjout(false)}><AjoutEleve onDone={() => setAjout(false)} /></Modal>}
      {open && <Modal title="Fiche étudiant" onClose={() => setOpen(null)}><FicheEleve id={open} onDelete={() => setOpen(null)} /></Modal>}
      {bin && <Modal title="Former des binômes" onClose={() => setBin(false)}><Binomes /></Modal>}
    </div>
  );
}

function AjoutEleve({ onDone }) {
  const { upd } = useStore();
  const [e, setE] = useState({ nom: '', prenom: '', groupe: '', niveau: 'D' });
  const ok = e.nom.trim() && e.prenom.trim();
  const save = (again) => { upd((d) => { d.eleves.push({ id: uid(), ...e, nom: e.nom.trim(), prenom: e.prenom.trim(), tokui: '', demo: [], bilan: { forts: ['', ''], axes: ['', ''] }, notes: '' }); }); toast('Étudiant ajouté'); if (again) setE({ ...e, nom: '', prenom: '' }); else onDone(); };
  return (
    <div className="stack">
      <div><label className="f">Nom</label><input type="text" value={e.nom} onChange={(x) => setE({ ...e, nom: x.target.value })} autoFocus /></div>
      <div><label className="f">Prénom</label><input type="text" value={e.prenom} onChange={(x) => setE({ ...e, prenom: x.target.value })} /></div>
      <div><label className="f">Groupe / classe</label><input type="text" value={e.groupe} onChange={(x) => setE({ ...e, groupe: x.target.value })} placeholder="ex. L2 STAPS TD2" /></div>
      <div><label className="f">Niveau</label><Seg value={e.niveau} onChange={(v) => setE({ ...e, niveau: v })} options={[['D', 'Débutant'], ['I', 'Intermédiaire'], ['C', 'Confirmé'], ['A', 'Avancé']]} /></div>
      <div className="row"><button className="btn primary" disabled={!ok} onClick={() => save(false)}>Enregistrer</button><button className="btn" disabled={!ok} onClick={() => save(true)}>Enregistrer et ajouter un autre</button></div>
    </div>
  );
}

function FicheEleve({ id, onDelete }) {
  const { st, upd } = useStore();
  const e = st.eleves.find((x) => x.id === id);
  if (!e) return null;
  const set = (k, v) => upd((d) => { const x = d.eleves.find((y) => y.id === id); x[k] = v; });
  const setB = (k, i, v) => upd((d) => { const x = d.eleves.find((y) => y.id === id); x.bilan = x.bilan || { forts: ['', ''], axes: ['', ''] }; x.bilan[k][i] = v; });
  const accessibles = TECHNIQUES.filter((t) => t.niv !== 'X' && FAMILLES[t.fam].cat !== 'ukemi' && 'DICA'.indexOf(t.niv) <= 'DICA'.indexOf(e.niveau));
  const togDemo = (tid) => set('demo', (e.demo || []).includes(tid) ? e.demo.filter((x) => x !== tid) : [...(e.demo || []), tid]);
  const prog = st.prog;
  const hist = SEANCES_N(prog).map((n) => [n, st.appel[prog]?.[n]?.[id]]).filter(([, v]) => v);
  return (
    <div className="stack">
      <div className="grid g2">
        <div><label className="f">Nom</label><input type="text" value={e.nom} onChange={(x) => set('nom', x.target.value)} /></div>
        <div><label className="f">Prénom</label><input type="text" value={e.prenom} onChange={(x) => set('prenom', x.target.value)} /></div>
        <div><label className="f">Groupe / classe</label><input type="text" value={e.groupe || ''} onChange={(x) => set('groupe', x.target.value)} /></div>
        <div><label className="f">Tokui-waza (technique préférée)</label>
          <select value={e.tokui || ''} onChange={(x) => set('tokui', x.target.value)}><option value="">—</option>{TECHNIQUES.filter((t) => FAMILLES[t.fam].cat === 'nage').map((t) => <option key={t.id} value={t.id}>{t.nom}</option>)}</select></div>
      </div>
      <div><label className="f">Niveau</label><Seg value={e.niveau} onChange={(v) => set('niveau', v)} options={[['D', 'Débutant'], ['I', 'Intermédiaire'], ['C', 'Confirmé'], ['A', 'Avancé']]} /></div>
      <div className="card">
        <h3>Bilan de mi-parcours (S{PROGRAMMES[prog].bilan})</h3>
        <p className="small muted">Exigence : {EXIGENCES_BILAN[e.niveau]}</p>
        <div className="grid g2">
          <div><label className="f">Points forts</label>{[0, 1].map((i) => <input key={i} type="text" value={e.bilan?.forts?.[i] || ''} onChange={(x) => setB('forts', i, x.target.value)} style={{ marginBottom: 6 }} />)}</div>
          <div><label className="f">Axes de travail</label>{[0, 1].map((i) => <input key={i} type="text" value={e.bilan?.axes?.[i] || ''} onChange={(x) => setB('axes', i, x.target.value)} style={{ marginBottom: 6 }} />)}</div>
        </div>
      </div>
      <div className="card">
        <h3>Programme de démonstration choisi</h3>
        <p className="small muted">{DEMO[e.niveau]}</p>
        <div className="row">{accessibles.map((t) => <button key={t.id} className={'chip' + ((e.demo || []).includes(t.id) ? ' on' : '')} onClick={() => togDemo(t.id)}>{t.nom}</button>)}</div>
      </div>
      <div><label className="f">Notes</label><textarea rows={3} value={e.notes || ''} onChange={(x) => set('notes', x.target.value)} /></div>
      {st.parcours === 'staps' && (() => { const l = Object.entries(st.interv[prog] || {}).flatMap(([n, x]) => [...(x.echauf || []).includes(id) ? [`S${n} échauffement`] : [], ...(x.situation || []).includes(id) ? [`S${n} situation`] : []]); return <div className="small"><b>Interventions prévues : </b>{l.length ? l.join(' · ') : 'aucune'}</div>; })()}
      {hist.length > 0 && <div className="small muted">Appels : {hist.map(([n, v]) => `S${n} ${{ p: 'présent', a: 'absent', d: 'dispensé' }[v]}`).join(' · ')}</div>}
      <button className="btn ghost" style={{ color: 'var(--accent)' }} onClick={() => { if (confirm(`Supprimer ${e.prenom} ${e.nom} et ses notes ?`)) { upd((d) => { d.eleves = d.eleves.filter((x) => x.id !== id); delete d.evalPrat[id]; delete d.evalTheo[id]; }); onDelete(); } }}><Icon n="trash" />Supprimer cet étudiant</button>
    </div>
  );
}
const SEANCES_N = (prog) => Array.from({ length: prog === 'p24' ? 24 : 12 }, (_, i) => i + 1);

function Binomes() {
  const { st } = useStore();
  const [mode, setMode] = useState('niveau');
  const [seed, setSeed] = useState(Date.now());
  const [presents, setPresents] = useState(true);
  const prog = st.prog;
  const derniers = Object.keys(st.appel[prog] || {}).map(Number).sort((a, b) => b - a)[0];
  const base = st.eleves.filter((e) => !presents || !derniers || st.appel[prog][derniers]?.[e.id] === 'p' || !st.appel[prog][derniers]?.[e.id]);
  const paires = useMemo(() => {
    const out = [];
    if (mode === 'niveau') {
      ['D', 'I', 'C', 'A'].forEach((n) => { const l = melanger(base.filter((e) => e.niveau === n), seed); for (let i = 0; i < l.length; i += 2) out.push(l.slice(i, i + 2)); });
    } else {
      const forts = melanger(base.filter((e) => e.niveau === 'A' || e.niveau === 'C'), seed);
      const deb = melanger(base.filter((e) => e.niveau === 'D' || e.niveau === 'I'), seed + 1);
      while (forts.length && deb.length) out.push([forts.shift(), deb.shift()]);
      const reste = [...forts, ...deb]; for (let i = 0; i < reste.length; i += 2) out.push(reste.slice(i, i + 2));
    }
    return out;
  }, [mode, seed, base.length]);
  return (
    <div className="stack">
      <div className="row"><Seg value={mode} onChange={setMode} options={[['niveau', 'Même niveau'], ['tutorat', 'Tutorat (gradé + débutant)']]} /><button className="btn sm" onClick={() => setSeed(Date.now())}><Icon n="shuffle" />Refaire</button></div>
      {derniers && <label className="row small"><input type="checkbox" checked={presents} onChange={(e) => setPresents(e.target.checked)} />Seulement les présents de la séance {derniers}</label>}
      <p className="tiny muted">Pensez à rapprocher les gabarits. En tutorat, le gradé est uke et conseiller.</p>
      <div className="list">{paires.map((p, i) => <div key={i} className="li" style={{ cursor: 'default' }}><span className="num" style={{ width: 30, height: 30, fontSize: '.9rem' }}>{i + 1}</span><div className="grow">{p.map((e) => <span key={e.id} style={{ marginRight: 12 }}><Lvl n={e.niveau} /> {e.prenom} {e.nom}</span>)}{p.length === 1 && <span className="small muted">(seul : groupe de 3 ou avec l'enseignant)</span>}</div></div>)}</div>
    </div>
  );
}
