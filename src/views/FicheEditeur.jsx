import React, { useMemo, useState } from 'react';
import { FAMILLES, NIVEAUX, KUZUSHI, CHAMPS_FICHE, TECHNIQUES_BASE, tech, ficheOrigine } from '../data/techniques.js';
import { SEANCES } from '../data/seances.js';
import { useStore, uid } from '../store.js';
import { Icon, toast } from '../ui.jsx';

// Croquis disponibles : chaque gabarit est nommé d'après une technique qui l'utilise.
const CROQUIS = (() => {
  const vus = {};
  for (const t of TECHNIQUES_BASE) if (t.anim && !vus[t.anim]) vus[t.anim] = t.nom;
  const groupe = (a) => (a.startsWith('chute') ? 'Chutes' : a.startsWith('sol') ? 'Au sol' : 'Debout (placement des pieds)');
  return Object.entries(vus).map(([anim, nom]) => ({ anim, label: `Comme ${nom}`, groupe: groupe(anim) }))
    .sort((a, b) => a.groupe.localeCompare(b.groupe) || a.label.localeCompare(b.label));
})();
const PROGS = [['p24', '24 séances (SUAPS / L2 STAPS)'], ['p12', '12 séances (SUAPS / L2 STAPS)'], ['p15', 'Prog Élèves (15 séances)']];
const LISTES = ['etapes', 'points', 'erreurs', 'educ'];

// Séances où une fiche apparaît d'origine (d'après les programmations)
export function seancesParDefaut(id) {
  const r = {};
  for (const [p] of PROGS) r[p] = (SEANCES[p] || []).filter((s) => (s.tech || []).includes(id)).map((s) => s.n);
  return r;
}
const memes = (a, b) => JSON.stringify([...(a || [])].sort((x, y) => x - y)) === JSON.stringify([...(b || [])].sort((x, y) => x - y));

// Éditeur d'une fiche : modifier une fiche existante, partir d'une copie, ou d'une fiche vierge.
// mode : 'modifier' (id existant), 'copie' (nouvelle fiche à partir de id), 'vierge'
export function FicheEditeur({ id, mode, onClose, onSaved }) {
  const { st, upd } = useStore();
  const depart = mode === 'vierge' ? null : tech(id);
  const nouvelle = mode !== 'modifier';
  const perso = !nouvelle && depart && depart.perso;
  const [f, setF] = useState(() => {
    const x = {};
    for (const k of CHAMPS_FICHE) {
      const v = depart ? depart[k] : undefined;
      x[k] = LISTES.includes(k) ? (v || []).join('\n') : (v ?? '');
    }
    if (!depart) { x.fam = 'te'; x.niv = 'D'; x.nom = ''; }
    if (mode === 'copie') x.nom = `${x.nom} (copie)`;
    return x;
  });
  const defaut = useMemo(() => (mode === 'modifier' && !perso ? seancesParDefaut(id) : { p24: [], p12: [], p15: [] }), [id, mode, perso]);
  const [seances, setSeances] = useState(() => {
    const deja = mode === 'modifier' ? (st.fiches?.[id]?.seances || depart?.seances) : null;
    const r = {};
    for (const [p] of PROGS) r[p] = deja && Array.isArray(deja[p]) ? [...deja[p]] : [...(defaut[p] || [])];
    return r;
  });
  const [masquee, setMasquee] = useState(!!(depart && depart.masquee && mode === 'modifier'));
  const set = (k, v) => setF((o) => ({ ...o, [k]: v }));
  const cat = FAMILLES[f.fam]?.cat;
  const basculer = (p, n) => setSeances((o) => ({ ...o, [p]: o[p].includes(n) ? o[p].filter((x) => x !== n) : [...o[p], n].sort((a, b) => a - b) }));

  const enregistrer = () => {
    if (!f.nom.trim()) { toast('Donnez un titre à la fiche'); return; }
    const fiche = {};
    for (const k of CHAMPS_FICHE) {
      const v = f[k];
      fiche[k] = LISTES.includes(k) ? String(v).split('\n').map((x) => x.trim()).filter(Boolean) : String(v).trim();
    }
    if (cat !== 'nage') fiche.kz = '';
    if (nouvelle || perso) { if (!fiche.anim) delete fiche.anim; if (!fiche.kz) delete fiche.kz; }
    // Les séances ne sont notées que si elles changent de la programmation d'origine.
    const places = {};
    for (const [p] of PROGS) if (nouvelle || perso || !memes(seances[p], defaut[p])) places[p] = seances[p];
    if (Object.keys(places).length) fiche.seances = places;
    if (masquee) fiche.masquee = true;
    let cible = id;
    if (nouvelle) { cible = 'perso-' + uid(); fiche.cree = true; }
    else if (perso) fiche.cree = true;
    else {
      // Fiche d'origine : on ne garde que ce qui a changé.
      const o = ficheOrigine(id);
      for (const k of CHAMPS_FICHE) {
        const a = o[k] ?? (LISTES.includes(k) ? [] : '');
        if (JSON.stringify(a) === JSON.stringify(fiche[k])) delete fiche[k];
      }
    }
    upd((d) => { d.fiches = { ...(d.fiches || {}), [cible]: fiche }; });
    toast(nouvelle ? 'Fiche créée' : 'Fiche enregistrée');
    onSaved && onSaved(cible);
  };

  const zone = (k, label, rows = 3, aide) => (
    <div><label className="f">{label}</label><textarea rows={rows} value={f[k]} onChange={(e) => set(k, e.target.value)} />{aide && <div className="tiny muted">{aide}</div>}</div>
  );
  return (
    <div className="stack fiche-editeur">
      <p className="small muted">{mode === 'vierge' ? 'Une fiche vierge, à remplir comme vous voulez.' : mode === 'copie' ? 'Une nouvelle fiche, à partir de celle-ci : changez ce que vous voulez.' : 'Modifiez ce que vous voulez. « Revenir à la fiche d\'origine » reste possible ensuite.'}
        {' '}Les listes (étapes, points clés…) : une ligne par élément. Les champs laissés vides n'apparaissent pas sur la fiche.</p>
      <div className="card">
        <h3>Titre et place de la fiche</h3>
        <div className="grid g2">
          <div><label className="f">Titre</label><input type="text" value={f.nom} onChange={(e) => set('nom', e.target.value)} placeholder="Ex. : O-soto-gari en déplacement" /></div>
          <div><label className="f">Sous-titre (traduction)</label><input type="text" value={f.trad} onChange={(e) => set('trad', e.target.value)} placeholder="Ex. : Grand fauchage extérieur" /></div>
          <div><label className="f">Famille (où ranger la fiche)</label>
            <select value={f.fam} onChange={(e) => set('fam', e.target.value)}>{Object.entries(FAMILLES).map(([k, x]) => <option key={k} value={k}>{x.label}</option>)}</select></div>
          <div><label className="f">Niveau</label>
            <select value={f.niv} onChange={(e) => set('niv', e.target.value)}>{Object.entries(NIVEAUX).map(([k, x]) => <option key={k} value={k}>{x.label}</option>)}</select></div>
        </div>
        {zone('desc', 'Description', 3)}
      </div>

      <div className="card">
        <h3>Croquis</h3>
        <div className="grid g2">
          <div><label className="f">Schéma animé</label>
            <select value={f.anim} onChange={(e) => set('anim', e.target.value)}>
              <option value="">Aucun schéma (photo ou vidéo seulement)</option>
              {['Chutes', 'Debout (placement des pieds)', 'Au sol'].map((g) => (
                <optgroup key={g} label={g}>{CROQUIS.filter((c) => c.groupe === g).map((c) => <option key={c.anim} value={c.anim}>{c.label}</option>)}</optgroup>
              ))}
            </select></div>
          {cat === 'nage' && <div><label className="f">Direction du déséquilibre (kuzushi)</label>
            <select value={f.kz} onChange={(e) => set('kz', e.target.value)}><option value="">—</option>{Object.entries(KUZUSHI).map(([k, x]) => <option key={k} value={k}>{x}</option>)}</select></div>}
        </div>
        <p className="tiny muted">Pour mettre votre photo, votre vidéo ou un croquis dessiné à la main (photographié) : enregistrez la fiche, puis utilisez « Photo / vidéo » ou « Album » sous le schéma. Vos autres photos, vidéos, GIF et liens YouTube s'ajoutent en bas de la fiche.</p>
      </div>

      {cat === 'nage' && (
        <div className="card">
          <h3>Les trois phases</h3>
          {zone('kuzushi', 'Kuzushi (déséquilibre)', 2)}
          {zone('tsukuri', 'Tsukuri (placement)', 2)}
          {zone('kake', 'Kake (exécution)', 2)}
        </div>
      )}
      <div className="card">
        <h3>Contenu</h3>
        {zone('etapes', 'Étapes (une par ligne)', 4)}
        {zone('points', 'Points clés (un par ligne)', 4)}
        {zone('erreurs', 'Erreurs fréquentes (une par ligne)', 3)}
        {zone('secu', 'Sécurité', 2)}
        {zone('educ', 'Éducatifs, progression (un par ligne)', 3)}
        {zone('liaisons', 'Enchaînements', 2)}
        {zone('contres', 'Contres possibles', 2)}
        {zone('sorties', 'Sorties pour uke', 2)}
      </div>

      <div className="card">
        <h3>Séances où elle apparaît</h3>
        <p className="tiny muted">Cochez les séances : la fiche s'affiche dans « Techniques de la séance ».{!nouvelle && !perso ? ' Les séances déjà cochées sont celles de la programmation d\'origine.' : ''}</p>
        {PROGS.map(([p, label]) => (
          <details key={p} open={seances[p].length > 0}>
            <summary className="small"><b>{label}</b> — {seances[p].length ? `séance(s) ${seances[p].join(', ')}` : 'aucune'}</summary>
            <div className="choix-seances">
              {(SEANCES[p] || []).map((s) => (
                <label key={s.n} className="small" title={s.titre}>
                  <input type="checkbox" checked={seances[p].includes(s.n)} onChange={() => basculer(p, s.n)} /> S{s.n} <span className="muted">{s.titre.length > 42 ? s.titre.slice(0, 40) + '…' : s.titre}</span>
                </label>
              ))}
            </div>
          </details>
        ))}
      </div>

      {!nouvelle && !perso && (
        <label className="small"><input type="checkbox" checked={masquee} onChange={(e) => setMasquee(e.target.checked)} /> Masquer cette fiche (elle n'apparaît plus dans les listes ni dans les séances ; on peut la remettre)</label>
      )}
      <div className="row">
        <button className="btn primary" onClick={enregistrer}><Icon n="check" />{nouvelle ? 'Créer la fiche' : 'Enregistrer'}</button>
        <button className="btn ghost" onClick={onClose}>Annuler</button>
      </div>
    </div>
  );
}
