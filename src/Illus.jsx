import React, { useContext, useEffect, useState } from 'react';
import { RoleCtx } from './store.js';
import { getIllus, setIllus, delIllus, illusPubliees } from './media.js';
import { Icon, toast } from './ui.jsx';

// Affiche la photo / vidéo choisie par le professeur à la place du dessin, sinon le dessin.
// Le professeur peut la prendre avec l'appareil photo, la choisir dans l'album, ou revenir au dessin.
export function Illus({ slot, children, compact }) {
  const prof = useContext(RoleCtx);
  const [m, setM] = useState(null); // { url, type, local }
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    let url = null, vivant = true;
    const charger = async () => {
      const x = await getIllus(slot);
      if (!vivant) return;
      if (url) { URL.revokeObjectURL(url); url = null; }
      if (x) { url = URL.createObjectURL(x.blob); setM({ url, type: x.type, local: true }); return; }
      const pub = (await illusPubliees())[slot];
      if (!vivant) return;
      setM(pub ? { url: pub.src, type: pub.type || '', local: false } : null);
    };
    charger();
    const ev = (e) => { if (e.detail === slot) charger(); };
    window.addEventListener('illus-change', ev);
    return () => { vivant = false; window.removeEventListener('illus-change', ev); if (url) URL.revokeObjectURL(url); };
  }, [slot]);
  const choisir = async (e) => {
    const f = e.target.files[0]; e.target.value = '';
    if (!f) return;
    if (f.size > 80 * 1024 * 1024) { toast('Fichier trop lourd (80 Mo maximum) : raccourcissez la vidéo'); return; }
    setBusy(true);
    try { await setIllus(slot, f); toast('Illustration remplacée'); } catch (err) { toast('Enregistrement impossible : mémoire de l\'appareil pleine ?'); }
    setBusy(false);
  };
  const video = m && (m.type.startsWith('video') || /\.(mp4|mov|webm)$/i.test(m.url));
  return (
    <div className="illus">
      {m ? (
        <div className="illus-media">
          {video ? <video src={m.url} autoPlay loop muted playsInline controls /> : <img src={m.url} alt="" />}
        </div>
      ) : children}
      {prof && (
        <div className={'illus-bar no-print' + (compact ? ' compact' : '')}>
          <label className="btn sm" title="Prendre une photo ou filmer avec l'appareil">
            <Icon n="camera" />{compact ? '' : busy ? 'Enregistrement…' : 'Photo / vidéo'}
            <input type="file" accept="image/*,video/*" capture="environment" hidden onChange={choisir} />
          </label>
          <label className="btn sm" title="Choisir dans l'album ou les fichiers">
            <Icon n="image" />{compact ? '' : 'Album'}
            <input type="file" accept="image/*,video/*" hidden onChange={choisir} />
          </label>
          {m && m.local && <button className="btn sm ghost" title="Remettre le dessin" onClick={() => delIllus(slot)}><Icon n="reset" />{compact ? '' : 'Dessin'}</button>}
        </div>
      )}
    </div>
  );
}
