import React, { useContext, useEffect, useState } from 'react';
import { useStore, RoleCtx, uid } from '../store.js';
import { OBS_ITEMS, PREP_CHAMPS } from '../data/staps.js';
import { TECHNIQUES, FAMILLES } from '../data/techniques.js';
import { Icon, Seg, toast, download } from '../ui.jsx';

// Onglet « Observer » du parcours STAPS : fiche d'observation de randori et fiche de préparation d'intervention
export function Staps() {
  const [vue, setVue] = useState('obs');
  return (
    <div>
      <h1 className="no-print" style={{ marginBottom: 2 }}>Observer et intervenir</h1>
      <div className="muted small no-print" style={{ marginBottom: 10 }}>Outils du parcours L2 STAPS : relever des données en randori, préparer la situation que l'on va conduire.</div>
      <div className="row no-print" style={{ marginBottom: 12 }}><Seg value={vue} onChange={setVue} options={[['obs', 'Fiche d\'observation'], ['prep', 'Préparer une intervention'], ['vierges', 'Fiches vierges à imprimer']]} /></div>
      {vue === 'obs' && <Observation />}
      {vue === 'prep' && <Preparation />}
      {vue === 'vierges' && <Vierges />}
    </div>
  );
}

const vide = () => Object.fromEntries(OBS_ITEMS.map(([k]) => [k, 0]));
const lsGet = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch (e) { return d; } };
const lsSet = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* */ } };

function Observation() {
  const prof = useContext(RoleCtx);
  const { st, upd } = useStore();
  const [obs, setObs] = useState(() => lsGet('judopro-obs-cours', { qui: '', eleve: '', c: vide(), tech: [], notes: '', debut: null }));
  const [hist, setHist] = useState(() => lsGet('judopro-obs-etu', []));
  const [t, setT] = useState(0);
  useEffect(() => { lsSet('judopro-obs-cours', obs); }, [obs]);
  useEffect(() => { if (!obs.debut) return; const i = setInterval(() => setT(Math.floor((Date.now() - obs.debut) / 1000)), 1000); return () => clearInterval(i); }, [obs.debut]);
  const add = (k, d) => setObs((o) => ({ ...o, c: { ...o.c, [k]: Math.max(0, o.c[k] + d) } }));
  const nomObs = prof ? (st.eleves.find((e) => e.id === obs.eleve) ? `${st.eleves.find((e) => e.id === obs.eleve).prenom} ${st.eleves.find((e) => e.id === obs.eleve).nom}` : '') : obs.qui;
  const att = obs.c.atAv + obs.c.atAr + obs.c.atCo;
  const eff = att ? Math.round(100 * obs.c.proj / att) : 0;
  const enregistrer = () => {
    if (!nomObs) { toast('Indiquez qui est observé'); return; }
    const rec = { id: uid(), date: new Date().toISOString(), eleve: obs.eleve || null, nom: nomObs, c: obs.c, tech: obs.tech, notes: obs.notes, duree: t };
    if (prof) upd((d) => { d.obs = [rec, ...(d.obs || [])]; });
    else { const h = [rec, ...hist].slice(0, 50); setHist(h); lsSet('judopro-obs-etu', h); }
    setObs({ ...obs, c: vide(), tech: [], notes: '', debut: null }); setT(0);
    toast('Observation enregistrée');
  };
  const liste = prof ? (st.obs || []) : hist;
  const techs = TECHNIQUES.filter((x) => FAMILLES[x.fam].cat !== 'ukemi' && x.niv !== 'X');
  return (
    <div className="stack">
      <div className="card">
        <div className="grid g2">
          {prof ? (
            <div><label className="f">Étudiant observé</label><select value={obs.eleve} onChange={(e) => setObs({ ...obs, eleve: e.target.value })}><option value="">Choisir…</option>{st.eleves.map((e) => <option key={e.id} value={e.id}>{e.nom.toUpperCase()} {e.prenom}</option>)}</select></div>
          ) : (
            <div><label className="f">Camarade observé</label><input type="text" value={obs.qui} onChange={(e) => setObs({ ...obs, qui: e.target.value })} placeholder="Prénom Nom" /></div>
          )}
          <div><label className="f">Durée observée</label>
            <div className="row"><span style={{ fontFamily: 'var(--serif)', fontSize: '1.4rem', minWidth: 60 }}>{Math.floor(t / 60)}:{String(t % 60).padStart(2, '0')}</span>
              {obs.debut ? <button className="btn sm" onClick={() => setObs({ ...obs, debut: null })}><Icon n="pause" />Stop</button> : <button className="btn sm" onClick={() => setObs({ ...obs, debut: Date.now() - t * 1000 })}><Icon n="play" />Départ</button>}
            </div></div>
        </div>
      </div>
      <div className="card">
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))' }}>
          {OBS_ITEMS.map(([k, l]) => (
            <div key={k} className="row between" style={{ border: '1px solid var(--line)', borderRadius: 10, padding: '6px 8px' }}>
              <span className="small" style={{ flex: 1 }}>{l}</span>
              <button className="iconbtn" style={{ width: 34, height: 34 }} onClick={() => add(k, -1)} aria-label="Moins">−</button>
              <b style={{ minWidth: 26, textAlign: 'center', fontSize: '1.2rem' }}>{obs.c[k]}</b>
              <button className="iconbtn" style={{ width: 40, height: 40, background: 'var(--ink)', color: 'var(--bg)' }} onClick={() => add(k, 1)} aria-label="Plus"><Icon n="plus" /></button>
            </div>
          ))}
        </div>
        <p className="small" style={{ marginTop: 10 }}>Attaques : <b>{att}</b> · efficacité (projections / attaques) : <b>{eff} %</b>{t > 0 && att ? <> · une attaque toutes les <b>{Math.round(t / att)} s</b></> : null}</p>
        <label className="f">Techniques vues</label>
        <select value="" onChange={(e) => e.target.value && setObs({ ...obs, tech: [...obs.tech, e.target.value] })}><option value="">Ajouter une technique…</option>{techs.map((x) => <option key={x.id} value={x.id}>{x.nom}</option>)}</select>
        <div className="row" style={{ marginTop: 6 }}>{obs.tech.map((id, i) => <button key={i} className="chip on" onClick={() => setObs({ ...obs, tech: obs.tech.filter((_, j) => j !== i) })}>{TECHNIQUES.find((x) => x.id === id)?.nom} ×</button>)}</div>
        <label className="f" style={{ marginTop: 8 }}>Remarques (points forts, conseil à donner)</label>
        <textarea rows={2} value={obs.notes} onChange={(e) => setObs({ ...obs, notes: e.target.value })} />
        <div className="row" style={{ marginTop: 10 }}><button className="btn primary" onClick={enregistrer}><Icon n="check" />Enregistrer l'observation</button><button className="btn" onClick={() => { setObs({ ...obs, c: vide(), tech: [], notes: '', debut: null }); setT(0); }}><Icon n="reset" />Effacer</button></div>
      </div>
      {liste.length > 0 && (
        <div className="card">
          <div className="row between"><h3 style={{ margin: 0 }}>Observations enregistrées</h3>
            {prof && <button className="btn sm" onClick={() => download('judo-pro-observations.csv', '﻿' + [['date', 'etudiant', 'duree_s', ...OBS_ITEMS.map(([k]) => k), 'techniques', 'remarques'], ...liste.map((r) => [r.date.slice(0, 10), r.nom, r.duree, ...OBS_ITEMS.map(([k]) => r.c[k]), r.tech.map((id) => TECHNIQUES.find((x) => x.id === id)?.nom).join(' / '), (r.notes || '').replace(/[;\n]/g, ' ')])].map((x) => x.join(';')).join('\n'), 'text/csv')}><Icon n="download" />Exporter CSV</button>}
          </div>
          <div className="list">{liste.slice(0, 30).map((r) => (
            <div key={r.id} className="li" style={{ cursor: 'default', display: 'block' }}>
              <div className="row between"><b>{r.nom}</b><span className="tiny muted">{new Date(r.date).toLocaleDateString('fr-FR')} · {Math.floor(r.duree / 60)} min {r.duree % 60} s</span></div>
              <div className="small">Avant {r.c.atAv} · arrière {r.c.atAr} · côté {r.c.atCo} · projections {r.c.proj} · liaisons {r.c.liai} · immobilisations {r.c.immo} · chutes subies {r.c.chute}</div>
              {r.notes && <div className="small muted">{r.notes}</div>}
              <button className="linkbtn tiny" onClick={() => { if (!confirm('Supprimer cette observation ?')) return; if (prof) upd((d) => { d.obs = d.obs.filter((x) => x.id !== r.id); }); else { const h = hist.filter((x) => x.id !== r.id); setHist(h); lsSet('judopro-obs-etu', h); } }}>Supprimer</button>
            </div>
          ))}</div>
        </div>
      )}
    </div>
  );
}

function Preparation() {
  const [f, setF] = useState(() => lsGet('judopro-prep', {}));
  useEffect(() => { lsSet('judopro-prep', f); }, [f]);
  return (
    <div className="card">
      <div className="row between no-print"><span className="small muted">Les champs sont gardés sur cet appareil.</span>
        <div className="row"><button className="btn sm" onClick={() => { if (confirm('Vider la fiche ?')) setF({}); }}><Icon n="reset" />Vider</button><button className="btn sm primary" onClick={() => window.print()}><Icon n="printer" />Imprimer</button></div></div>
      <h2 style={{ marginTop: 10 }}>Fiche de préparation d'intervention — judo</h2>
      <div className="grid g2">
        {PREP_CHAMPS.map(([k, l, h]) => (
          <div key={k} className="qprint" style={{ gridColumn: h > 1 ? '1 / -1' : undefined }}>
            <label className="f">{l}</label>
            <textarea rows={h} value={f[k] || ''} onChange={(e) => setF({ ...f, [k]: e.target.value })} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Vierges() {
  const [quoi, setQuoi] = useState('obs');
  return (
    <div>
      <div className="row no-print" style={{ marginBottom: 10 }}><Seg value={quoi} onChange={setQuoi} options={[['obs', 'Fiche d\'observation'], ['prep', 'Fiche de préparation']]} /><button className="btn sm primary" onClick={() => window.print()}><Icon n="printer" />Imprimer</button></div>
      <div className="card">
        {quoi === 'obs' ? (
          <>
            <h2>Fiche d'observation de randori — judo</h2>
            <p className="small">Observateur : ............................ Observé : ............................ Niveau : ...... Durée : ......</p>
            <table className="t"><thead><tr><th>Indicateur</th><th>Pointage (un trait par action)</th><th>Total</th></tr></thead>
              <tbody>{OBS_ITEMS.map(([k, l]) => <tr key={k} className="qprint"><td>{l}</td><td style={{ height: 34 }} /><td /></tr>)}</tbody></table>
            <p className="small" style={{ marginTop: 10 }}>Efficacité = projections ÷ attaques = ........ %   ·   Techniques vues : ..........................................................................</p>
            <p className="small">Point fort : ........................................................................................................</p>
            <p className="small">Conseil donné : ...................................................................................................</p>
          </>
        ) : (
          <>
            <h2>Fiche de préparation d'intervention — judo</h2>
            <p className="small">Nom : ............................................ Date : ................</p>
            <table className="t"><tbody>{PREP_CHAMPS.map(([k, l, h]) => <tr key={k} className="qprint"><td style={{ width: '32%' }}><b>{l}</b></td><td style={{ height: 22 + h * 22 }} /></tr>)}</tbody></table>
          </>
        )}
      </div>
    </div>
  );
}
