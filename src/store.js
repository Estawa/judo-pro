import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { GRILLE_PRATIQUE } from './data/programme.js';
import { GRILLE_STAPS } from './data/staps.js';
import { GRILLE_P15 } from './data/progEleves.js';
export const grille = (st) => (st.parcours === 'staps' ? GRILLE_STAPS : st.parcours === 'eleves' ? GRILLE_P15 : GRILLE_PRATIQUE);
export const PARCOURS_LABEL = { suaps: 'SUAPS', staps: 'L2 STAPS', eleves: 'Prog Élèves' };

const KEY = 'judopro-v1';
export const DEFAULT = {
  v: 1, pin: '1234', theme: 'light', prog: 'p24', annee: '', dateDebut: '', groupeNom: 'L2 STAPS',
  dates: { p24: {}, p12: {}, p15: {} }, faites: { p24: {}, p12: {}, p15: {} }, notesSeance: { p24: {}, p12: {}, p15: {} },
  eleves: [], appel: { p24: {}, p12: {}, p15: {} }, evalPrat: {}, evalTheo: {}, videos: {}, favoris: [],
  niveauVue: 'tous', parcours: 'suaps', interv: { p24: {}, p12: {}, p15: {} }, obs: [], bareme: { qcm: 8, ptQcm: 0.5, courtes: 2, ptCourte: 1 },
};

// Ajoute les programmations manquantes (ex. p15) aux données enregistrées par une version précédente
function migrer(s) {
  for (const k of ['dates', 'faites', 'notesSeance', 'appel', 'interv']) s[k] = { p24: {}, p12: {}, p15: {}, ...(s[k] || {}) };
  if (s.parcours === 'eleves') s.prog = 'p15';
  else if (s.prog === 'p15') s.prog = 'p24';
  return s;
}

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return structuredClone(DEFAULT);
    const s = JSON.parse(raw);
    return migrer({ ...structuredClone(DEFAULT), ...s });
  } catch (e) { return structuredClone(DEFAULT); }
}

export const Ctx = createContext(null);
export const RoleCtx = createContext(false);
export function useStoreState() {
  const [st, setSt] = useState(load);
  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) { /* stockage plein ou bloqué */ } }, [st]);
  const upd = useCallback((fn) => setSt((prev) => { const d = structuredClone(prev); const r = fn(d); return r || d; }), []);
  const replace = useCallback((s) => setSt(migrer({ ...structuredClone(DEFAULT), ...s })), []);
  return { st, upd, replace };
}
export const useStore = () => useContext(Ctx);

export const uid = () => Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-4);

export function noteTheo(st, id) {
  const t = st.evalTheo[id]; if (!t) return null;
  const b = st.bareme;
  const qcm = (t.qcmBonnes ?? 0) * b.ptQcm;
  const c = (t.courtes || []).reduce((a, x) => a + (Number(x) || 0), 0);
  return Math.round((qcm + c) * 100) / 100;
}
export function notePrat(st, id) {
  const p = st.evalPrat[id]; if (!p) return null;
  const crit = grille(st).flatMap((g) => g.criteres);
  if (!crit.some((c) => p[c.id] !== undefined)) return null;
  const v = crit.reduce((a, c) => a + Math.min(c.max, Number(p[c.id]) || 0), 0);
  return Math.round(v * 100) / 100;
}
