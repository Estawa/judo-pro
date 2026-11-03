import React, { useEffect, useRef, useState } from 'react';
import { Ctx, RoleCtx, useStoreState } from './store.js';
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

const TABS_PROF = [['seances', 'Séances', 'calendar'], ['tech', 'Techniques', 'layers'], ['theo', 'Théorie', 'book'], ['arb', 'Arbitrage', 'flag'], ['quiz', 'Quiz', 'help'], ['groupe', 'Groupe', 'users'], ['eval', 'Évaluation', 'clipboard'], ['regl', 'Réglages', 'settings']];
const TABS_ETU = [['seances', 'Programme', 'calendar'], ['tech', 'Techniques', 'layers'], ['theo', 'Théorie', 'book'], ['arb', 'Arbitrage', 'flag'], ['quiz', 'Quiz', 'help']];

const getRole = () => { try { return localStorage.getItem('judopro-role'); } catch (e) { return null; } };
const setRoleLS = (r) => { try { r ? localStorage.setItem('judopro-role', r) : localStorage.removeItem('judopro-role'); } catch (e) { /* */ } };

export default function App() {
  const store = useStoreState();
  const { st, upd } = store;
  const [role, setRole] = useState(getRole);
  const [tab, setTab] = useState('seances');
  const [chrono, setChrono] = useState(false);
  useEffect(() => { document.documentElement.dataset.theme = st.theme; }, [st.theme]);
  useEffect(() => { window.scrollTo(0, 0); }, [tab]);
  const choisir = (r) => { setRole(r); setRoleLS(r); setTab(r === 'prof' ? 'seances' : 'tech'); };

  if (!role || role === 'pin') {
    return (
      <Ctx.Provider value={store}>
        <Accueil pinMode={role === 'pin'} onEtudiant={() => choisir('etu')} onProf={() => setRole('pin')} onBack={() => setRole(null)} onOk={() => choisir('prof')} pin={st.pin} />
        <Toaster />
      </Ctx.Provider>
    );
  }
  const prof = role === 'prof';
  const tabs = prof ? TABS_PROF : TABS_ETU;
  return (
    <Ctx.Provider value={store}><RoleCtx.Provider value={prof}>
      <div className="app">
        <header className="top">
          <div className="top-row">
            <div className="brand"><img src="icons/icon-192.png" alt="" /><div style={{ minWidth: 0 }}><b>Judo Pro</b> <small>by C. Guilhem · v{VERSION}</small><div className="tiny muted">{prof ? 'Espace professeur' : 'Espace étudiant'}</div></div></div>
            <button className="iconbtn" onClick={() => setChrono(true)} aria-label="Chrono randori" title="Chrono randori"><Icon n="timer" /></button>
            <button className="iconbtn" onClick={() => upd((d) => { d.theme = d.theme === 'dark' ? 'light' : 'dark'; })} aria-label="Jour / nuit"><Icon n={st.theme === 'dark' ? 'sun' : 'moon'} /></button>
            <button className="iconbtn" onClick={() => choisir(null)} aria-label="Quitter" title={prof ? 'Se déconnecter' : 'Changer de profil'}><Icon n="logout" /></button>
          </div>
          <nav className="tabs">{tabs.map(([k, l, i]) => <button key={k} className={'tab' + (tab === k ? ' on' : '')} onClick={() => setTab(k)}><Icon n={i} />{l}</button>)}</nav>
        </header>
        <main>
          {tab === 'seances' && <Seances prof={prof} />}
          {tab === 'tech' && <Techniques prof={prof} />}
          {tab === 'theo' && <Theorie />}
          {tab === 'arb' && <Arbitrage />}
          {tab === 'quiz' && <Quiz prof={prof} />}
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

function Accueil({ pinMode, onEtudiant, onProf, onBack, onOk, pin }) {
  const [code, setCode] = useState(['', '', '', '']);
  const [err, setErr] = useState(false);
  const refs = [useRef(), useRef(), useRef(), useRef()];
  useEffect(() => { if (pinMode) setTimeout(() => refs[0].current?.focus(), 50); }, [pinMode]);
  const type = (i, v) => {
    v = v.replace(/\D/g, '').slice(-1);
    const c = [...code]; c[i] = v; setCode(c); setErr(false);
    if (v && i < 3) refs[i + 1].current?.focus();
    if (c.every(Boolean)) {
      if (c.join('') === pin) onOk(); else { setErr(true); setCode(['', '', '', '']); setTimeout(() => refs[0].current?.focus(), 50); }
    }
  };
  return (
    <div className="hero">
      <img src="icons/icon-512.png" alt="Judo Pro" />
      <div><h1>Judo Pro</h1><div className="muted">by C. Guilhem · v{VERSION}</div></div>
      <p className="muted" style={{ maxWidth: 420 }}>Programmation, techniques, théorie, arbitrage et évaluation du judo en L2 STAPS.</p>
      {!pinMode ? (
        <>
          <button className="btn primary" style={{ padding: '13px 26px', fontSize: '1.05rem' }} onClick={onEtudiant}>Je suis étudiant</button>
          <button className="linkbtn" onClick={onProf}>Tu es professeur ? Connexion ici</button>
        </>
      ) : (
        <div className="card" style={{ width: '100%', maxWidth: 360 }}>
          <h2>Connexion professeur</h2>
          <p className="small muted">Code d'accès à 4 chiffres</p>
          <div className="pin">{code.map((c, i) => <input key={i} ref={refs[i]} type="password" inputMode="numeric" value={c} onChange={(e) => type(i, e.target.value)} onKeyDown={(e) => { if (e.key === 'Backspace' && !code[i] && i > 0) refs[i - 1].current?.focus(); }} aria-label={'Chiffre ' + (i + 1)} />)}</div>
          {err && <p className="small" style={{ color: 'var(--accent)', marginTop: 8 }}>Code incorrect</p>}
          <button className="linkbtn" style={{ marginTop: 12 }} onClick={onBack}>Je suis étudiant</button>
        </div>
      )}
    </div>
  );
}
