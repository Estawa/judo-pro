import React, { useEffect, useRef, useState } from 'react';
import { Icon, bip, fmt } from '../ui.jsx';

// Chrono de randori : rotations, pause pour changer de partenaire, bips
export function Chrono() {
  const [cfg, setCfg] = useState(() => { try { return JSON.parse(localStorage.getItem('judopro-chrono')) || { travail: 120, pause: 20, tours: 6 }; } catch (e) { return { travail: 120, pause: 20, tours: 6 }; } });
  const [phase, setPhase] = useState('pret'); // pret | travail | pause | fini
  const [tour, setTour] = useState(1);
  const [reste, setReste] = useState(cfg.travail);
  const [run, setRun] = useState(false);
  const wl = useRef(null);
  useEffect(() => { try { localStorage.setItem('judopro-chrono', JSON.stringify(cfg)); } catch (e) { /* */ } }, [cfg]);
  useEffect(() => { if (phase === 'pret') setReste(cfg.travail); }, [cfg, phase]);

  useEffect(() => {
    if (!run) return;
    const t = setInterval(() => setReste((r) => r - 1), 1000);
    return () => clearInterval(t);
  }, [run]);

  useEffect(() => {
    if (!run) return;
    if (reste === 10 && phase === 'travail') bip(660, 0.12, 1);
    if (reste > 0) return;
    if (phase === 'travail') {
      if (tour >= cfg.tours) { bip(520, 0.35, 3); setPhase('fini'); setRun(false); return; }
      bip(520, 0.3, 2); setPhase('pause'); setReste(cfg.pause);
    } else if (phase === 'pause') {
      bip(880, 0.4, 1); setPhase('travail'); setTour((x) => x + 1); setReste(cfg.travail);
    }
  }, [reste, run, phase, tour, cfg]);

  const start = async () => {
    if (phase === 'pret' || phase === 'fini') { setPhase('travail'); setTour(1); setReste(cfg.travail); bip(880, 0.4, 1); }
    setRun(true);
    try { wl.current = await navigator.wakeLock?.request('screen'); } catch (e) { /* écran */ }
  };
  const stop = () => { setRun(false); try { wl.current?.release(); } catch (e) { /* */ } };
  const reset = () => { stop(); setPhase('pret'); setTour(1); setReste(cfg.travail); };
  const num = (k, v) => setCfg((c) => ({ ...c, [k]: Math.max(k === 'tours' ? 1 : 5, Number(v) || 0) }));

  const titre = { pret: 'Prêts ?', travail: 'Hajime !', pause: 'Matte — changez de partenaire', fini: 'Sore-made, c\'est fini' }[phase];
  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <div className="muted">{phase === 'travail' || phase === 'pause' ? `Rotation ${tour} / ${cfg.tours}` : `${cfg.tours} rotations de ${fmt(cfg.travail)}`}</div>
        <div className="big-timer" style={{ color: phase === 'pause' ? 'var(--accent)' : 'var(--ink)' }}>{fmt(reste)}</div>
        <div style={{ fontFamily: 'var(--serif)', fontSize: '1.3rem', marginBottom: 12 }}>{titre}</div>
        <div className="row" style={{ justifyContent: 'center' }}>
          {run ? <button className="btn dark" onClick={stop}><Icon n="pause" />Pause</button> : <button className="btn primary" onClick={start}><Icon n="play" />{phase === 'pret' || phase === 'fini' ? 'Démarrer' : 'Reprendre'}</button>}
          <button className="btn" onClick={reset}><Icon n="reset" />Remettre à zéro</button>
        </div>
      </div>
      <div className="grid g3" style={{ marginTop: 16 }}>
        <div><label className="f">Durée d'un randori (s)</label><input type="number" min="5" step="15" value={cfg.travail} onChange={(e) => num('travail', e.target.value)} disabled={run} /></div>
        <div><label className="f">Pause entre rotations (s)</label><input type="number" min="5" step="5" value={cfg.pause} onChange={(e) => num('pause', e.target.value)} disabled={run} /></div>
        <div><label className="f">Nombre de rotations</label><input type="number" min="1" value={cfg.tours} onChange={(e) => num('tours', e.target.value)} disabled={run} /></div>
      </div>
      <div className="row" style={{ marginTop: 10 }}>
        {[[90, 'Débutant 1 min 30'], [120, '2 min'], [180, '3 min'], [240, '4 min (combat)']].map(([v, l]) => <button key={v} className={'chip' + (cfg.travail === v ? ' on' : '')} disabled={run} onClick={() => setCfg((c) => ({ ...c, travail: v }))}>{l}</button>)}
      </div>
      <p className="tiny muted" style={{ marginTop: 10 }}>Un bip à 10 secondes de la fin, deux bips au matte, un long bip au hajime. L'écran reste allumé pendant le chrono si le téléphone le permet.</p>
    </div>
  );
}
