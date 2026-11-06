import React, { useEffect, useRef, useState } from 'react';
import { Ctx, RoleCtx, useStoreState, PARCOURS_LABEL } from './store.js';
import { Icon, Toaster, Modal } from './ui.jsx';
import { VERSION } from './version.js';
import { Seances } from './views/Seances.jsx';
import { Techniques } from './views/Techniques.jsx';
import { Theorie } from './views/Theorie.jsx';
import { Arbitrage } from './views/Arbitrage.jsx';
import { Quiz } from './views/Quiz.jsx';
import { Groupe } from './views/Groupe.jsx';
import { Evaluation } from './views/Evaluation.jsx';
import { Reglages } from './views/Reglages.jsx';
import { Chrono } from './views/Chrono.jsx';
import { Staps } from './views/Staps.jsx';
import { Fondamentaux } from './views/Fondamentaux.jsx';
import { accesConnu, rafraichirAcces, accesEtudiantOuvert, empreinte, dateFr } from './acces.js';
import { appliquerFiches } from './data/techniques.js';
import { fichesPubliees } from './media.js';

const TABS_PROF = [['seances', 'Séances', 'calendar'], ['fond', 'Fondamentaux', 'star'], ['tech', 'Techniques', 'layers'], ['theo', 'Théorie', 'book'], ['arb', 'Arbitrage', 'flag'], ['quiz', 'Quiz', 'help'], ['groupe', 'Groupe', 'users'], ['eval', 'Évaluation', 'clipboard'], ['regl', 'Réglages', 'settings']];
const TABS_ETU = [['seances', 'Programme', 'calendar'], ['fond', 'Fondamentaux', 'star'], ['tech', 'Techniques', 'layers'], ['theo', 'Théorie', 'book'], ['arb', 'Arbitrage', 'flag'], ['quiz', 'Quiz', 'help']];

const getRole = () => { try { return localStorage.getItem('judopro-role'); } catch (e) { return null; } };
const setRoleLS = (r) => { try { r ? localStorage.setItem('judopro-role', r) : localStorage.removeItem('judopro-role'); } catch (e) { /* */ } };

export default function App() {
  const store = useStoreState();
  const { st, upd } = store;
  const [role, setRole] = useState(getRole);
  const [tab, setTab] = useState('seances');
  const [chrono, setChrono] = useState(false);
  // Fiches : celles publiées avec l'appli, puis celles modifiées sur cet appareil (prioritaires).
  const [pub, setPub] = useState({});
  useEffect(() => { fichesPubliees().then(setPub); }, []);
  const role0 = role;
  const fiches = role0 === 'prof' ? { ...pub, ...(st.fiches || {}) } : pub;
  appliquerFiches(fiches, pub);
  useEffect(() => { document.documentElement.dataset.theme = st.theme; }, [st.theme]);
  useEffect(() => { window.scrollTo(0, 0); }, [tab]);
  useEffect(() => { const f = (e) => setTab(e.detail); window.addEventListener('goto-tab', f); return () => window.removeEventListener('goto-tab', f); }, []);
  const choisir = (r) => { setRole(r); setRoleLS(r); setTab(r === 'prof' ? 'seances' : 'tech'); };
  const [acces, setAcces] = useState(accesConnu);
  useEffect(() => {
    rafraichirAcces().then(setAcces);
    const f = () => rafraichirAcces().then(setAcces);
    window.addEventListener('online', f); document.addEventListener('visibilitychange', f);
    return () => { window.removeEventListener('online', f); document.removeEventListener('visibilitychange', f); };
  }, []);
  const ouvert = accesEtudiantOuvert(acces);
  const verifier = async (code) => (acces.codeProf && (await empreinte(code)) === acces.codeProf) || (!!st.pinPerso && code === st.pin) || (!acces.codeProf && code === st.pin);

  if (!role || role === 'pin' || (role === 'etu' && !ouvert)) {
    return (
      <Ctx.Provider value={store}>
        <Accueil pinMode={role === 'pin'} ferme={!ouvert} acces={acces} onEtudiant={() => choisir('etu')} onProf={() => setRole('pin')} onBack={() => setRole(null)} onOk={() => choisir('prof')} verifier={verifier} />
        <Toaster />
      </Ctx.Provider>
    );
  }
  const prof = role === 'prof';
  const staps = st.parcours === 'staps';
  const base = prof ? TABS_PROF : TABS_ETU;
  const tabs = staps ? [...base.slice(0, 6), ['obs', 'Observer', 'eye'], ...base.slice(6)] : base;
  return (
    <Ctx.Provider value={store}><RoleCtx.Provider value={prof}>
      <div className="app">
        <header className="top">
          <div className="top-row">
            <div className="brand"><img src="icons/icon-192.png" alt="" /><div style={{ minWidth: 0 }}><b>Judo Pro</b> <small>by C. Guilhem · v{VERSION}</small><div className="tiny muted">{prof ? 'Espace professeur' : 'Espace étudiant'} · {PARCOURS_LABEL[st.parcours] || 'SUAPS'}</div></div></div>
            <button className="iconbtn" onClick={() => setChrono(true)} aria-label="Chrono randori" title="Chrono randori"><Icon n="timer" /></button>
            <button className="iconbtn" onClick={() => upd((d) => { d.theme = d.theme === 'dark' ? 'light' : 'dark'; })} aria-label="Jour / nuit"><Icon n={st.theme === 'dark' ? 'sun' : 'moon'} /></button>
            <button className="iconbtn" onClick={() => choisir(null)} aria-label="Quitter" title={prof ? 'Se déconnecter' : 'Changer de profil'}><Icon n="logout" /></button>
          </div>
          <nav className="tabs">{tabs.map(([k, l, i]) => <button key={k} className={'tab' + (tab === k ? ' on' : '')} onClick={() => setTab(k)}><Icon n={i} />{l}</button>)}</nav>
        </header>
        <main>
          {tab === 'seances' && <Seances prof={prof} />}
          {tab === 'fond' && <Fondamentaux prof={prof} />}
          {tab === 'tech' && <Techniques prof={prof} />}
          {tab === 'theo' && <Theorie />}
          {tab === 'arb' && <Arbitrage />}
          {tab === 'quiz' && <Quiz prof={prof} />}
          {staps && tab === 'obs' && <Staps />}
          {prof && tab === 'groupe' && <Groupe />}
          {prof && tab === 'eval' && <Evaluation />}
          {prof && tab === 'regl' && <Reglages />}
        </main>
        <div className="foot">Judo Pro by C. Guilhem · v{VERSION} · fonctionne hors connexion une fois installée</div>
      </div>
      {chrono && <Modal title="Chrono randori" onClose={() => setChrono(false)}><Chrono /></Modal>}
      <Toaster />
    </RoleCtx.Provider></Ctx.Provider>
  );
}

function Accueil({ pinMode, ferme, acces, onEtudiant, onProf, onBack, onOk, verifier }) {
  const [code, setCode] = useState('');
  const [err, setErr] = useState(false);
  const [busy, setBusy] = useState(false);
  const ref = useRef();
  useEffect(() => { if (pinMode) setTimeout(() => ref.current?.focus(), 50); }, [pinMode]);
  const valider = async (e) => {
    e && e.preventDefault();
    if (!code) return;
    setBusy(true);
    const ok = await verifier(code);
    setBusy(false);
    if (ok) onOk(); else { setErr(true); setCode(''); setTimeout(() => ref.current?.focus(), 50); }
  };
  return (
    <div className="hero">
      <img src="icons/icon-512.png" alt="Judo Pro" />
      <div><h1>Judo Pro</h1><div className="muted">by C. Guilhem · v{VERSION}</div></div>
      {!pinMode ? (
        ferme ? (
          <>
            <div className="card" style={{ maxWidth: 420 }}>
              <h2>Accès terminé</h2>
              <p>{acces.message || 'Le cours de judo est terminé.'}</p>
              <p className="small muted">L'espace étudiant n'est plus disponible{acces.fin && acces.etudiants !== false ? ` depuis le ${dateFr(acces.fin)}` : ''}. Vous pouvez désinstaller l'application.</p>
            </div>
            <button className="linkbtn" onClick={onProf}>Tu es professeur ? Connexion ici</button>
          </>
        ) : (
          <>
            <p className="muted" style={{ maxWidth: 420 }}>Programmation, techniques, théorie, arbitrage et évaluation du judo en L2 STAPS.</p>
            <button className="btn primary" style={{ padding: '13px 26px', fontSize: '1.05rem' }} onClick={onEtudiant}>Je suis étudiant</button>
            <button className="linkbtn" onClick={onProf}>Tu es professeur ? Connexion ici</button>
          </>
        )
      ) : (
        <form className="card" style={{ width: '100%', maxWidth: 360 }} onSubmit={valider}>
          <h2>Connexion professeur</h2>
          <p className="small muted">Code d'accès</p>
          <input ref={ref} type="password" inputMode="numeric" autoComplete="current-password" value={code} onChange={(e) => { setCode(e.target.value.trim()); setErr(false); }} aria-label="Code d'accès" style={{ fontSize: '1.4rem', textAlign: 'center', letterSpacing: '.3em' }} />
          {err && <p className="small" style={{ color: 'var(--accent)', marginTop: 8 }}>Code incorrect</p>}
          <button className="btn primary" type="submit" disabled={!code || busy} style={{ marginTop: 10, width: '100%', justifyContent: 'center' }}>Se connecter</button>
          <button type="button" className="linkbtn" style={{ marginTop: 12 }} onClick={onBack}>{ferme ? 'Retour' : 'Je suis étudiant'}</button>
        </form>
      )}
    </div>
  );
}
