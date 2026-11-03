import React, { useEffect, useState } from 'react';
import { useStore } from '../store.js';
import { SEANCES } from '../data/seances.js';
import { Icon, Seg, toast, download } from '../ui.jsx';
import { VERSION, CHANGELOG } from '../version.js';
import { allIllus, exportIllus } from '../media.js';

export function Reglages() {
  const { st, upd, replace } = useStore();
  const [pin, setPin] = useState('');
  const [debut, setDebut] = useState(st.dateDebut || '');
  const [sauter, setSauter] = useState('');
  const planifier = () => {
    if (!debut) { toast('Choisissez la date de la première séance'); return; }
    const skip = sauter.split(/[\s,;]+/).filter(Boolean);
    const dates = {}; let d = new Date(debut + 'T12:00');
    for (const s of SEANCES[st.prog]) {
      while (skip.includes(d.toISOString().slice(0, 10))) d.setDate(d.getDate() + 7);
      dates[s.n] = d.toISOString().slice(0, 10); d.setDate(d.getDate() + 7);
    }
    upd((x) => { x.dateDebut = debut; x.dates[st.prog] = dates; });
    toast('Dates des séances calculées (une par semaine)');
  };
  const sauver = () => download(`judo-pro-sauvegarde-${new Date().toISOString().slice(0, 10)}.json`, JSON.stringify(st, null, 1), 'application/json');
  const restaurer = (e) => {
    const f = e.target.files[0]; e.target.value = '';
    if (!f) return;
    f.text().then((t) => { try { const s = JSON.parse(t); if (!s || s.v !== 1) throw new Error(); if (confirm('Remplacer toutes les données actuelles par cette sauvegarde ?')) { replace(s); toast('Sauvegarde restaurée'); } } catch (err) { toast('Fichier de sauvegarde non reconnu'); } });
  };
  return (
    <div className="stack">
      <h1>Réglages</h1>
      <div className="card">
        <h3>Groupe et programmation</h3>
        <div className="grid g2">
          <div><label className="f">Nom du groupe</label><input type="text" value={st.groupeNom} onChange={(e) => upd((d) => { d.groupeNom = e.target.value; })} /></div>
          <div><label className="f">Programmation</label><Seg value={st.prog} onChange={(v) => upd((d) => { d.prog = v; })} options={[['p24', '24 séances (année)'], ['p12', '12 séances (semestre)']]} /></div>
        </div>
        <h3 style={{ marginTop: 14 }}>Calendrier</h3>
        <div className="grid g2">
          <div><label className="f">Date de la première séance</label><input type="date" value={debut} onChange={(e) => setDebut(e.target.value)} /></div>
          <div><label className="f">Semaines sans cours (dates à sauter, séparées par des virgules)</label><input type="text" value={sauter} onChange={(e) => setSauter(e.target.value)} placeholder="2026-12-22, 2026-12-29" /></div>
        </div>
        <button className="btn sm" style={{ marginTop: 8 }} onClick={planifier}><Icon n="calendar" />Calculer les dates (une séance par semaine)</button>
        <p className="tiny muted">Chaque date reste modifiable dans la fiche de la séance.</p>
      </div>
      <div className="card">
        <h3>Barème de l'écrit</h3>
        <div className="grid g3">
          <div><label className="f">Nombre de QCM</label><input type="number" min="1" max="30" value={st.bareme.qcm} onChange={(e) => upd((d) => { d.bareme.qcm = Math.max(1, Number(e.target.value) || 1); })} /></div>
          <div><label className="f">Points par QCM</label><input type="number" min="0.25" step="0.25" value={st.bareme.ptQcm} onChange={(e) => upd((d) => { d.bareme.ptQcm = Number(e.target.value) || 0.5; })} /></div>
          <div><label className="f">Questions courtes</label><input type="number" min="0" max="6" value={st.bareme.courtes} onChange={(e) => upd((d) => { d.bareme.courtes = Math.max(0, Number(e.target.value) || 0); })} /></div>
          <div><label className="f">Points par question courte</label><input type="number" min="0.5" step="0.5" value={st.bareme.ptCourte} onChange={(e) => upd((d) => { d.bareme.ptCourte = Number(e.target.value) || 1; })} /></div>
        </div>
        <p className="tiny muted">Par défaut : 8 QCM à 0,5 pt + 2 questions courtes à 1 pt = 6 points.</p>
      </div>
      <div className="card">
        <h3>Accès et affichage</h3>
        <div className="row">
          <input type="password" inputMode="numeric" maxLength={4} value={pin} onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))} placeholder="Nouveau code (4 chiffres)" style={{ maxWidth: 220 }} />
          <button className="btn sm" disabled={pin.length !== 4} onClick={() => { upd((d) => { d.pin = pin; }); setPin(''); toast('Code d\'accès modifié'); }}><Icon n="lock" />Changer le code</button>
        </div>
        <p className="tiny muted">Code par défaut : 1234. Les étudiants accèdent sans code aux techniques, à la théorie, à l'arbitrage et aux quiz.</p>
        <div className="row" style={{ marginTop: 8 }}><span className="small">Thème</span><Seg value={st.theme} onChange={(v) => upd((d) => { d.theme = v; })} options={[['light', 'Jour'], ['dark', 'Nuit']]} /></div>
      </div>
      <div className="card">
        <h3>Sauvegarde</h3>
        <p className="small muted">Les données (groupe, appels, notes, réglages) sont enregistrées sur cet appareil. Faites une sauvegarde régulière, et avant de changer d'appareil. Les photos et vidéos personnelles ne sont pas incluses dans la sauvegarde.</p>
        <div className="row">
          <button className="btn sm primary" onClick={sauver}><Icon n="download" />Sauvegarder (fichier)</button>
          <label className="btn sm"><Icon n="upload" />Restaurer<input type="file" accept="application/json,.json" hidden onChange={restaurer} /></label>
        </div>
      </div>
      <Illustrations />
      <div className="card">
        <h3>Journal des versions</h3>
        {CHANGELOG.map((c) => <div key={c.v}><b>Version {c.v}</b> <span className="muted small">— {c.d}</span><ul className="small">{c.l.map((x) => <li key={x}>{x}</li>)}</ul></div>)}
        <a className="btn sm" href="docs/Notice_Judo_Pro.pdf" target="_blank" rel="noreferrer"><Icon n="book" />Notice d'utilisation (PDF)</a>
      </div>
      <div className="card">
        <button className="btn sm ghost" style={{ color: 'var(--accent)' }} onClick={() => { if (confirm('Effacer toutes les données de l\'appli sur cet appareil ? Faites une sauvegarde avant.')) { localStorage.removeItem('judopro-v1'); location.reload(); } }}><Icon n="trash" />Tout effacer</button>
        <p className="tiny muted">Judo Pro by C. Guilhem · version {VERSION}</p>
      </div>
    </div>
  );
}

function Illustrations() {
  const [n, setN] = useState(null);
  useEffect(() => { allIllus().then((l) => setN(l.length)); }, []);
  const exp = async () => {
    const z = await exportIllus();
    if (!z) { toast('Aucune illustration personnelle sur cet appareil'); return; }
    download(`judo-pro-illustrations-${new Date().toISOString().slice(0, 10)}.zip`, z);
  };
  return (
    <div className="card">
      <h3>Mes illustrations (photos et vidéos à la place des dessins)</h3>
      <p className="small">{n === null ? '…' : n === 0 ? 'Aucun dessin remplacé pour l\'instant.' : `${n} dessin(s) remplacé(s) sur cet appareil.`}</p>
      <p className="small muted">Pour remplacer un dessin : ouvrez une technique ou un geste d'arbitrage, puis « Photo / vidéo » (appareil photo) ou « Album » (galerie, fichiers du PC). « Dessin » remet le schéma d'origine. Ces illustrations restent sur cet appareil. Pour qu'elles apparaissent aussi chez les étudiants et sur vos autres appareils, exportez-les et envoyez le fichier pour qu'il soit publié avec l'appli.</p>
      <button className="btn sm" onClick={exp} disabled={!n}><Icon n="download" />Exporter mes illustrations (zip)</button>
    </div>
  );
}
