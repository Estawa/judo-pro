import React, { useState } from 'react';
import { IMMOS, CIRCUIT_SOL, RETOURNEMENTS, PRINCIPES_RETOURNEMENT, FAMILLES_DEBOUT, FAMILLES_SOL, OPPOSITION, PLACE, PLACE_LABELS } from '../data/fondamentaux.js';
import { tech, FAMILLES } from '../data/techniques.js';
import { useStore } from '../store.js';
import { PROGRAMMES } from '../data/programme.js';
import { Icon, Lvl, Seg, Modal } from '../ui.jsx';
import { Schema } from '../Diagrams.jsx';
import { Illus } from '../Illus.jsx';
import { TechDetail } from './Techniques.jsx';

export function Fondamentaux({ prof }) {
  const [vue, setVue] = useState('sol');
  const [open, setOpen] = useState(null);
  const T = ({ id }) => { const t = tech(id); return t ? <button className="chip" onClick={() => setOpen(id)}><Lvl n={t.niv} />{t.nom}</button> : null; };
  return (
    <div>
      <h1 style={{ marginBottom: 2 }}>Fondamentaux du cycle</h1>
      <div className="muted small" style={{ marginBottom: 10 }}>Ce que chaque étudiant doit avoir vu : le sol, les familles de techniques debout, l'opposition au sol et debout.</div>
      <div className="row no-print" style={{ marginBottom: 12 }}>
        <Seg value={vue} onChange={setVue} options={[['sol', 'Sol : immobilisations et retournements'], ['debout', 'Familles debout'], ['opp', 'Opposition sol et debout'], ['cycle', 'Où dans le cycle']]} />
      </div>

      {vue === 'sol' && (
        <div className="stack">
          <div className="card">
            <h2>Les 4 immobilisations de base (osae-komi-waza)</h2>
            <p className="small">Une immobilisation maintient uke sur le dos : 20 s = ippon. {CIRCUIT_SOL}</p>
          </div>
          <div className="grid g2">
            {IMMOS.map((m) => { const t = tech(m.id); return (
              <div key={m.id} className="card" style={{ margin: 0 }}>
                <div className="row between"><h3 style={{ margin: 0 }}>{m.ordre}. {t.nom}</h3><Lvl n={t.niv} /></div>
                <div className="small muted" style={{ marginBottom: 6 }}>{t.trad}</div>
                <Illus slot={'tech:' + m.id}><Schema t={t} /></Illus>
                <div className="kv small" style={{ marginTop: 8 }}>
                  <b>Position</b><span>{m.position}</span>
                  <b>Contrôle</b><span>{m.controle}</span>
                  <b>On y arrive par</b><span>{m.depuisTxt}</span>
                  <b>Sortie de uke</b><span>{m.sortie}</span>
                  <b>Passage</b><span>{m.passage}</span>
                </div>
                <div className="row" style={{ marginTop: 8 }}><button className="btn sm" onClick={() => setOpen(m.id)}><Icon n="layers" />Fiche complète</button>{m.depuis.map((id) => <T key={id} id={id} />)}</div>
              </div>
            ); })}
          </div>
          <div className="card">
            <h2>Renverser uke à quatre pattes (« la tortue »)</h2>
            <ul className="small">{PRINCIPES_RETOURNEMENT.map((x) => <li key={x}>{x}</li>)}</ul>
            <div className="tablewrap"><table className="t"><thead><tr><th>Retournement</th><th>Place de tori</th><th>Mène à</th><th>Niveau</th></tr></thead>
              <tbody>{RETOURNEMENTS.map((r) => <tr key={r.id} style={{ cursor: 'pointer' }} onClick={() => setOpen(r.id)}><td><b>{tech(r.id).nom}</b></td><td>{r.place}</td><td>{tech(r.vers).nom}</td><td><Lvl n={r.niv} /></td></tr>)}</tbody></table></div>
          </div>
          <div className="grid g2">
            {RETOURNEMENTS.map((r) => { const t = tech(r.id); return (
              <div key={r.id} className="card" style={{ margin: 0, cursor: 'pointer' }} onClick={(e) => { if (!e.target.closest('.illus-bar')) setOpen(r.id); }}>
                <div className="row between"><h3 style={{ margin: 0 }}>{t.nom}</h3><Lvl n={t.niv} /></div>
                <div className="small muted" style={{ marginBottom: 6 }}>→ {tech(r.vers).nom}</div>
                <Illus slot={'tech:' + r.id}><Schema t={t} /></Illus>
              </div>
            ); })}
          </div>
          <div className="card">
            <h3>Les trois familles du travail au sol (katame-waza)</h3>
            <div className="list">{FAMILLES_SOL.map((f) => <div key={f.fam} className="li" style={{ cursor: 'default', display: 'block' }}><b>{FAMILLES[f.fam].label}</b><div className="small">{f.def} <span className="muted">({f.qui})</span></div><div style={{ marginTop: 4 }}><T id={f.ref} /></div></div>)}</div>
          </div>
        </div>
      )}

      {vue === 'debout' && (
        <div className="stack">
          <div className="card">
            <h2>Les familles de techniques debout (nage-waza)</h2>
            <p className="small">Le Kodokan classe les projections en deux groupes : les <b>tachi-waza</b>, où tori reste debout (te-waza, koshi-waza, ashi-waza), et les <b>sutemi-waza</b>, où tori se met volontairement au sol (ma-sutemi-waza, yoko-sutemi-waza). Dans le cycle, chaque étudiant voit au moins une technique de chaque famille, à son niveau.</p>
          </div>
          {['Tachi-waza (techniques debout)', 'Sutemi-waza (sacrifices)'].map((g) => (
            <div key={g}>
              <div className="bloc-h">{g}</div>
              <div className="grid g2">
                {FAMILLES_DEBOUT.filter((f) => f.groupe === g).map((f) => { const t = tech(f.ref); return (
                  <div key={f.fam} className="card" style={{ margin: 0 }}>
                    <h3 style={{ marginBottom: 2 }}>{FAMILLES[f.fam].label}</h3>
                    <p className="small" style={{ marginBottom: 6 }}>{f.def}</p>
                    <div className="small"><b>Technique de référence du cycle : </b>{t.nom} <span className="muted">({t.trad})</span></div>
                    <Illus slot={'tech:' + f.ref}><Schema t={t} /></Illus>
                    <div className="small" style={{ marginTop: 6 }}><b>Pour qui : </b>{f.qui}</div>
                    <div className="row" style={{ marginTop: 6 }}><T id={f.ref} />{f.autres.map((id) => <T key={id} id={id} />)}</div>
                  </div>
                ); })}
              </div>
            </div>
          ))}
        </div>
      )}

      {vue === 'opp' && (
        <div className="stack">
          {[['sol', 'L\'opposition au sol (randori ne-waza)'], ['debout', 'L\'opposition debout (randori tachi-waza)']].map(([k, titre]) => { const o = OPPOSITION[k]; return (
            <div key={k} className="card">
              <h2>{titre}</h2>
              <p className="small">{o.intro}</p>
              {o.etapes && <><h3>De la coopération à l'opposition</h3><ol className="small">{o.etapes.map(([a, b]) => <li key={a}><b>{a}</b> : {b}</li>)}</ol></>}
              <h3>Règles</h3>
              <ul className="small">{o.regles.map((x) => <li key={x}>{x}</li>)}</ul>
              <h3>Situations d'opposition</h3>
              <div className="tablewrap"><table className="t"><thead><tr><th>Situation</th><th>Départ</th><th>But</th><th>Pour</th></tr></thead>
                <tbody>{o.situations.map((s) => <tr key={s.nom}><td><b>{s.nom}</b></td><td>{s.depart}</td><td>{s.but}</td><td>{s.niv}</td></tr>)}</tbody></table></div>
            </div>
          ); })}
        </div>
      )}

      {vue === 'cycle' && <OuDansLeCycle />}
      {open && <Modal title={tech(open).nom} onClose={() => setOpen(null)}><TechDetail id={open} prof={prof} /></Modal>}
    </div>
  );
}

function OuDansLeCycle() {
  const { st } = useStore();
  const prog = st.prog;
  const pl = PLACE[prog] || {};
  const faites = st.faites[prog] || {};
  return (
    <div className="card">
      <h2>Où chaque fondamental est travaillé ({PROGRAMMES[prog].court})</h2>
      <p className="small muted">Numéros des séances concernées ; les séances déjà faites sont en noir plein.</p>
      <div className="tablewrap"><table className="t"><thead><tr><th>Fondamental</th><th>Séances</th><th>Vu</th></tr></thead>
        <tbody>{PLACE_LABELS.map(([k, l]) => { const ns = pl[k] || []; const vu = ns.some((n) => faites[n]); return (
          <tr key={k}><td><b>{l}</b></td><td><div className="row" style={{ gap: 4 }}>{ns.map((n) => <span key={n} className={'num' + (faites[n] ? ' done' : '')} style={{ width: 28, height: 28, fontSize: '.8rem' }}>{n}</span>)}</div></td><td>{vu ? <Icon n="check" style={{ width: 18 }} /> : <span className="muted">—</span>}</td></tr>
        ); })}</tbody></table></div>
    </div>
  );
}

// Encart pour la fiche d'une séance : fondamentaux abordés ce jour-là
export function FondamentauxSeance({ prog, n, onOpen }) {
  const l = PLACE_LABELS.filter(([k]) => (PLACE[prog]?.[k] || []).includes(n));
  if (!l.length) return null;
  return (
    <div className="card">
      <h3>Fondamentaux du cycle abordés</h3>
      <div className="row">{l.map(([k, lab]) => <span key={k} className="chip">{lab}</span>)}</div>
      <button className="linkbtn small" style={{ marginTop: 6 }} onClick={onOpen}>Voir les fondamentaux du cycle</button>
    </div>
  );
}
