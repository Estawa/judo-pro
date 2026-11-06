import React, { useEffect, useMemo, useState } from 'react';
import { TECHNIQUES, FAMILLES, NIVEAUX, KUZUSHI, DECODEUR, tech, ijfUrl, ijfAnim, ytUrl, fichesMasquees, estPubliee, variantes, familleVariantes, famillesVariantes, teteDe } from '../data/techniques.js';
import { FicheEditeur, Dupliquer } from './FicheEditeur.jsx';
import { useStore } from '../store.js';
import { Icon, Lvl, Seg, Modal, Search, toast } from '../ui.jsx';
import { Schema, KuzushiRose } from '../Diagrams.jsx';
import { Illus } from '../Illus.jsx';
import { addMedia, listMedia, delMedia, countAll, ytId, getIllus, illusPubliees } from '../media.js';

const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[-\s']/g, '');

export function Techniques({ prof }) {
  const { st } = useStore();
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('tout');
  const [fam, setFam] = useState('');
  const [niv, setNiv] = useState('');
  const [open, setOpen] = useState(null);
  const [counts, setCounts] = useState({});
  const [dec, setDec] = useState(false);
  const [edit, setEdit] = useState(null); // { id, mode }
  const [mes, setMes] = useState(false);
  useEffect(() => { countAll().then(setCounts); }, [open]);

  const list = useMemo(() => TECHNIQUES.filter((t) => {
    const c = FAMILLES[t.fam].cat;
    if (cat !== 'tout' && c !== cat && !(fam || '').startsWith('var:')) return false;
    if (fam && fam.startsWith('var:')) { if (teteDe(t.id) !== fam.slice(4)) return false; } else if (fam && t.fam !== fam) return false;
    if (niv && t.niv !== niv) return false;
    if (q && !norm(t.nom + (t.trad || '')).includes(norm(q))) return false;
    if (mes && !t.perso && !t.modifiee) return false;
    return true;
  }), [q, cat, fam, niv, mes, st.fiches]);
  const masquees = prof ? fichesMasquees() : [];

  const famOpts = Object.entries(FAMILLES).filter(([, f]) => cat === 'tout' || f.cat === cat);
  return (
    <div>
      <div className="row between" style={{ marginBottom: 10 }}>
        <div><h1 style={{ marginBottom: 2 }}>Techniques</h1><div className="muted small">{TECHNIQUES.length} fiches · schémas animés, points clés, vidéos et animations 3D</div></div>
        <div className="row">
          {prof && <button className="btn sm primary" onClick={() => setEdit({ id: null, mode: 'vierge' })}><Icon n="plus" />Nouvelle fiche</button>}
          <button className="btn sm" onClick={() => setDec(true)}><Icon n="help" />Décoder un nom</button>
        </div>
      </div>
      <div className="card" style={{ marginBottom: 12 }}>
        <div className="row" style={{ marginBottom: 8 }}>
          <Search value={q} onChange={setQ} placeholder="Chercher : o-soto, hanche, écharpe…" />
        </div>
        <div className="row" style={{ marginBottom: 8 }}>
          <Seg value={cat} onChange={(v) => { setCat(v); setFam(''); }} options={[['tout', 'Tout'], ['ukemi', 'Chutes'], ['nage', 'Debout (nage-waza)'], ['katame', 'Sol (katame-waza)']]} />
        </div>
        <div className="row">
          <select value={fam} onChange={(e) => setFam(e.target.value)} style={{ maxWidth: 300 }} aria-label="Famille">
            <option value="">Toutes les familles</option>
            {famOpts.map(([k, f]) => <option key={k} value={k}>{f.label}</option>)}
            {famillesVariantes().length > 0 && <optgroup label="Familles de variantes">{famillesVariantes().map((g) => <option key={g.tete} value={'var:' + g.tete}>{g.nom} ({g.membres.length})</option>)}</optgroup>}
          </select>
          <select value={niv} onChange={(e) => setNiv(e.target.value)} style={{ maxWidth: 220 }} aria-label="Niveau">
            <option value="">Tous les niveaux</option>
            {Object.entries(NIVEAUX).map(([k, n]) => <option key={k} value={k}>{n.label}</option>)}
          </select>
          {prof && <label className="small" style={{ alignSelf: 'center' }}><input type="checkbox" checked={mes} onChange={(e) => setMes(e.target.checked)} /> Mes fiches (créées ou modifiées)</label>}
        </div>
      </div>
      <div className="grid g3">
        {list.map((t) => (
          <div key={t.id} className="card" style={{ cursor: 'pointer', margin: 0 }} onClick={() => setOpen(t.id)}>
            <div className="row between" style={{ alignItems: 'flex-start' }}>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontFamily: 'var(--serif)', fontWeight: 600, fontSize: '1.05rem' }}>{t.nom}</div>
                <div className="small muted">{t.trad}</div>
              </div>
              <Lvl n={t.niv} />
            </div>
            <Thumb slot={'tech:' + t.id} />
            <div className="row" style={{ marginTop: 8 }}>
              <span className="chip">{FAMILLES[t.fam].label.split(' (')[0]}</span>
              {t.gokyo && <span className="chip">Gokyo {t.gokyo.split(' ')[0]}</span>}
              {t.contre && <span className="chip red">Contre</span>}
              {counts[t.id] ? <span className="chip green"><Icon n="video" style={{ width: 12 }} />{counts[t.id]}</span> : null}
              {(st.videos[t.id] || []).length ? <span className="chip green">YouTube {(st.videos[t.id] || []).length}</span> : null}
              {variantes(t.id).length > 0 && <span className="chip" title={familleVariantes(t.id)}><Icon n="layers" style={{ width: 12 }} />{variantes(t.id).length} variantes</span>}
              {prof && t.perso && <span className="chip">Ma fiche</span>}
              {prof && t.modifiee && <span className="chip">Modifiée</span>}
            </div>
          </div>
        ))}
      </div>
      {!list.length && <div className="empty">Aucune technique ne correspond.</div>}
      {masquees.length > 0 && (
        <details className="card" style={{ marginTop: 12 }}>
          <summary className="small"><b>Fiches masquées ({masquees.length})</b> — visibles par vous seul ici</summary>
          <div className="row" style={{ marginTop: 8 }}>{masquees.map((t) => <button key={t.id} className="chip" onClick={() => setOpen(t.id)}><Lvl n={t.niv} />{t.nom}</button>)}</div>
        </details>
      )}
      <p className="tiny muted" style={{ marginTop: 14 }}>Niveaux : <Lvl n="D" /> débutant · <Lvl n="I" /> intermédiaire · <Lvl n="C" /> confirmé · <Lvl n="A" /> avancé · <Lvl n="X" /> culture (hors programme). Les schémas sont donnés pour un tori droitier.</p>
      {open && tech(open) && <Modal title={tech(open).nom} onClose={() => setOpen(null)}><TechDetail id={open} prof={prof} onEdit={(mode) => setEdit({ id: open, mode })} onDeleted={() => setOpen(null)} onOpen={setOpen} /></Modal>}
      {edit && edit.mode === 'dupliquer' && <Modal title={'Dupliquer « ' + tech(edit.id).nom + ' »'} onClose={() => setEdit(null)}>
        <Dupliquer id={edit.id} onClose={() => setEdit(null)} onCree={(cible) => { setOpen(cible); setEdit({ id: cible, mode: 'modifier' }); }} />
      </Modal>}
      {edit && edit.mode !== 'dupliquer' && <Modal title={edit.mode === 'vierge' ? 'Nouvelle fiche' : edit.mode === 'copie' ? 'Nouvelle fiche à partir de « ' + tech(edit.id).nom + ' »' : 'Modifier la fiche'} onClose={() => setEdit(null)}>
        <FicheEditeur id={edit.id} mode={edit.mode} onClose={() => setEdit(null)} onSaved={(cible) => { setEdit(null); setOpen(cible); }} />
      </Modal>}
      {dec && <Modal title="Décoder le nom d'une technique" onClose={() => setDec(false)}><Decodeur /></Modal>}
    </div>
  );
}

export function Decodeur() {
  return (
    <div>
      <p className="small">Exemple : <b>o-soto-gari</b> = o (grand) + soto (extérieur) + gari (fauchage) = grand fauchage extérieur.</p>
      <table className="t"><tbody>{DECODEUR.map(([a, b]) => <tr key={a}><td><b>{a}</b></td><td>{b}</td></tr>)}</tbody></table>
    </div>
  );
}

export function TechDetail({ id, prof, onEdit, onDeleted, onOpen }) {
  const t = tech(id);
  const { st, upd } = useStore();
  const [medias, setMedias] = useState([]);
  const [urls, setUrls] = useState({});
  const [yt, setYt] = useState('');
  const [busy, setBusy] = useState(false);
  const reload = () => listMedia(id).then((m) => {
    setMedias(m);
    setUrls((old) => { Object.values(old).forEach((u) => URL.revokeObjectURL(u)); return Object.fromEntries(m.map((x) => [x.id, URL.createObjectURL(x.blob)])); });
  });
  useEffect(() => { reload(); return () => setUrls((old) => { Object.values(old).forEach((u) => URL.revokeObjectURL(u)); return {}; }); }, [id]);
  if (!t) return null;
  const nage = FAMILLES[t.fam]?.cat === 'nage';
  const vids = st.videos[id] || [];

  const onFiles = async (e) => {
    const files = [...e.target.files]; e.target.value = '';
    if (!files.length) return;
    setBusy(true);
    try { for (const f of files) await addMedia(id, f); toast(files.length > 1 ? 'Médias ajoutés' : 'Média ajouté'); } catch (err) { toast('Ajout impossible : mémoire de l\'appareil pleine ?'); }
    setBusy(false); reload();
  };
  const addYt = () => {
    if (!ytId(yt)) { toast('Lien YouTube non reconnu'); return; }
    upd((d) => { d.videos[id] = [...(d.videos[id] || []), yt.trim()]; }); setYt('');
  };

  const locale = !!(st.fiches && st.fiches[id]);
  const revenir = () => {
    if (!confirm(t.perso ? 'Supprimer cette fiche ? Ses photos et vidéos restent sur l\'appareil.' : 'Revenir à la fiche d\'origine ? Vos modifications de cette fiche seront perdues.')) return;
    upd((d) => {
      const f = { ...(d.fiches || {}) };
      if (t.perso) { if (estPubliee(id)) f[id] = { ...f[id], cree: true, masquee: true }; else delete f[id]; }
      else if (estPubliee(id)) f[id] = {}; else delete f[id];
      d.fiches = f;
    });
    toast(t.perso ? 'Fiche supprimée' : 'Fiche d\'origine rétablie');
    if (t.perso) onDeleted && onDeleted();
  };
  return (
    <div className="stack">
      {prof && onEdit && (
        <div className="row no-print">
          <button className="btn sm" onClick={() => onEdit('modifier')}><Icon n="edit" />Modifier la fiche</button>
          <button className="btn sm" onClick={() => onEdit('dupliquer')}><Icon n="layers" />Dupliquer (variante bis, ter…)</button>
          {(t.perso || t.modifiee || locale) && <button className="btn sm ghost" onClick={revenir}><Icon n={t.perso ? 'trash' : 'reset'} />{t.perso ? 'Supprimer la fiche' : 'Revenir à la fiche d\'origine'}</button>}
          {t.masquee && <span className="chip red">Masquée</span>}
        </div>
      )}
      <div className="row"><Lvl n={t.niv} /><span className="muted">{t.trad}</span></div>
      <Variantes id={id} prof={prof} onOpen={onOpen} />
      <div className="row">
        <span className="chip">{FAMILLES[t.fam]?.label}</span>
        {t.gokyo && <span className="chip">Gokyo : {t.gokyo}</span>}
        {t.kz && <span className="chip red">Kuzushi {KUZUSHI[t.kz]}</span>}
      </div>
      <p>{t.desc}</p>
      {prof && <p className="tiny muted no-print">Chaque dessin peut être remplacé par votre photo ou votre vidéo : « Photo / vidéo » ouvre l'appareil photo, « Album » votre galerie ou vos fichiers, « Dessin » revient au schéma.</p>}
      <div className="grid" style={{ gridTemplateColumns: nage && t.kz ? 'repeat(auto-fit, minmax(220px, 1fr))' : '1fr' }}>
        <Illus slot={'tech:' + t.id}>{t.anim ? <Schema t={t} /> : (prof ? <div className="diag"><div className="cap">Pas de schéma : ajoutez votre photo, votre vidéo ou un croquis photographié avec les boutons ci-dessous.</div></div> : null)}</Illus>
        {nage && t.kz && <Illus slot={'rose:' + t.id}><div className="diag"><KuzushiRose dir={t.kz} /><div className="cap">Direction du déséquilibre (kuzushi), vue de dessus</div></div></Illus>}
      </div>

      {t.kuzushi && (
        <div className="card">
          <h3>Les trois phases</h3>
          <div className="kv">
            <b>Kuzushi (déséquilibre)</b><span>{t.kuzushi}</span>
            <b>Tsukuri (placement)</b><span>{t.tsukuri}</span>
            <b>Kake (exécution)</b><span>{t.kake}</span>
          </div>
        </div>
      )}
      {t.etapes && <div className="card"><h3>Étapes</h3><ol>{t.etapes.map((x) => <li key={x}>{x}</li>)}</ol></div>}
      {t.points && t.points.length > 0 && <div className="card"><h3>Points clés</h3><ul>{t.points.map((x) => <li key={x}>{x}</li>)}</ul></div>}
      {(t.erreurs?.length > 0 || t.secu) && (
        <div className="card">
          {t.erreurs?.length > 0 && <><h3>Erreurs fréquentes</h3><ul>{t.erreurs.map((x) => <li key={x}>{x}</li>)}</ul></>}
          {t.secu && <><h3>Sécurité</h3><p>{t.secu}</p></>}
        </div>
      )}
      {(t.educ?.length > 0 || t.liaisons || t.contres || t.sorties) && (
        <div className="card">
          {t.educ?.length > 0 && <><h3>Éducatifs (progression)</h3><ul>{t.educ.map((x) => <li key={x}>{x}</li>)}</ul></>}
          {t.liaisons && <p><b>Enchaînements : </b>{t.liaisons}</p>}
          {t.contres && <p><b>Contres possibles : </b>{t.contres}</p>}
          {t.sorties && <p><b>Sorties pour uke : </b>{t.sorties}</p>}
        </div>
      )}

      <div className="card">
        <h3>Vidéos et animations</h3>
        <div className="row">
          {ijfUrl(t) && <a className="btn sm" href={ijfAnim(t)} target="_blank" rel="noreferrer"><Icon n="video" />Animation 3D (FIJ)</a>}
          {ijfUrl(t) && <a className="btn sm" href={ijfUrl(t)} target="_blank" rel="noreferrer"><Icon n="external" />Fiche officielle FIJ</a>}
          <a className="btn sm" href={ytUrl(t)} target="_blank" rel="noreferrer"><Icon n="search" />Chercher sur YouTube</a>
        </div>
        <p className="tiny muted" style={{ marginTop: 6 }}>Ces liens demandent une connexion internet. Les schémas animés ci-dessus et vos propres médias fonctionnent hors ligne.</p>
        {vids.map((v, i) => (
          <div key={i} style={{ marginTop: 10 }}>
            <div className="yt"><iframe src={`https://www.youtube-nocookie.com/embed/${ytId(v)}`} title={'Vidéo ' + t.nom} allow="accelerometer; encrypted-media; picture-in-picture" allowFullScreen loading="lazy" /></div>
            {prof && <button className="btn sm ghost" onClick={() => upd((d) => { d.videos[id] = d.videos[id].filter((_, j) => j !== i); })}><Icon n="trash" />Retirer cette vidéo</button>}
          </div>
        ))}
        {prof && (
          <div className="row" style={{ marginTop: 10 }}>
            <input type="url" value={yt} onChange={(e) => setYt(e.target.value)} placeholder="Coller un lien YouTube choisi pour cette technique" style={{ flex: 1, minWidth: 200 }} />
            <button className="btn sm" onClick={addYt}><Icon n="plus" />Ajouter</button>
          </div>
        )}
      </div>

      <div className="card">
        <div className="row between"><h3 style={{ margin: 0 }}>Mes photos, vidéos et GIF</h3>
          {prof && <label className="btn sm primary" style={{ opacity: busy ? 0.5 : 1 }}><Icon n="upload" />{busy ? 'Ajout…' : 'Ajouter'}<input type="file" accept="image/*,video/*" multiple hidden onChange={onFiles} /></label>}
        </div>
        {medias.length ? (
          <div className="media-grid" style={{ marginTop: 10 }}>
            {medias.map((m) => (
              <div key={m.id}>
                {m.type.startsWith('video') ? <video src={urls[m.id]} controls playsInline loop muted /> : <img src={urls[m.id]} alt={t.nom} />}
                {prof && <button className="iconbtn del" onClick={async () => { await delMedia(m.id); reload(); }} aria-label="Supprimer"><Icon n="trash" /></button>}
              </div>
            ))}
          </div>
        ) : <p className="small muted" style={{ marginTop: 8 }}>{prof ? 'Filmez la technique (vous ou un étudiant avancé) et ajoutez la vidéo, une photo ou un GIF : ils restent sur cet appareil et fonctionnent hors ligne, pratique pour montrer au bord du tapis.' : 'Aucun média personnel sur cet appareil.'}</p>}
      </div>
    </div>
  );
}

// Vignette de la carte : la photo ou vidéo choisie par le professeur, s'il y en a une
function Thumb({ slot }) {
  const [m, setM] = useState(null);
  useEffect(() => {
    let url = null, vivant = true;
    (async () => {
      const x = await getIllus(slot);
      if (x) { url = URL.createObjectURL(x.blob); vivant && setM({ url, type: x.type }); return; }
      const p = (await illusPubliees())[slot];
      if (p && vivant) setM({ url: p.src, type: p.type || '' });
    })();
    const ev = (e) => { if (e.detail === slot) { setM(null); getIllus(slot).then((x) => { if (x && vivant) setM({ url: URL.createObjectURL(x.blob), type: x.type }); }); } };
    window.addEventListener('illus-change', ev);
    return () => { vivant = false; window.removeEventListener('illus-change', ev); if (url) URL.revokeObjectURL(url); };
  }, [slot]);
  if (!m) return null;
  return <div className="thumb">{m.type.startsWith('video') ? <video src={m.url} muted playsInline autoPlay loop /> : <img src={m.url} alt="" />}</div>;
}

// Raccourcis entre une fiche et ses variantes, et nom de leur famille
function Variantes({ id, prof, onOpen }) {
  const { upd } = useStore();
  const membres = variantes(id);
  const [nom, setNom] = useState(null);
  if (!membres.length) return null;
  const tete = teteDe(id);
  const t = tech(id);
  const nommer = () => {
    const n = (nom || '').trim();
    upd((d) => { const f = { ...(d.fiches || {}) }; f[tete] = { ...(f[tete] || {}), groupe: n || undefined }; if (!n) delete f[tete].groupe; d.fiches = f; });
    setNom(null); toast('Nom de la famille enregistré');
  };
  const detacher = () => {
    upd((d) => { const f = { ...(d.fiches || {}) }; f[id] = { ...(f[id] || {}), variante_de: null }; d.fiches = f; });
    toast('Fiche détachée de la famille');
  };
  return (
    <div className="card variantes">
      <div className="small"><b>{familleVariantes(id)}</b>{nom === null && prof && <button className="lien" onClick={() => setNom(familleVariantes(id))}> renommer</button>}</div>
      {nom !== null && <div className="row" style={{ marginTop: 6 }}><input type="text" value={nom} onChange={(e) => setNom(e.target.value)} style={{ flex: 1, minWidth: 180 }} /><button className="btn sm" onClick={nommer}><Icon n="check" />Enregistrer</button></div>}
      <div className="row" style={{ marginTop: 6 }}>
        {membres.map((m) => m.id === id
          ? <span key={m.id} className="chip on"><Lvl n={m.niv} />{m.nom}</span>
          : <button key={m.id} className="chip" onClick={() => onOpen && onOpen(m.id)}><Lvl n={m.niv} />{m.nom}</button>)}
      </div>
      {prof && t.variante_de && <button className="btn sm ghost" style={{ marginTop: 6 }} onClick={detacher}>Détacher cette fiche de la famille</button>}
    </div>
  );
}
