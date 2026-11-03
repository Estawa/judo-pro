import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { GRILLE_PRATIQUE } from './data/programme.js';
import { GRILLE_STAPS } from './data/staps.js';
export const grille = (st) => (st.parcours === 'staps' ? GRILLE_STAPS : GRILLE_PRATIQUE);

const KEY = 'judopro-v1';
export const DEFAULT = {
  v: 1, pin: '1234', theme: 'light', prog: 'p24', annee: '', dateDebut: '', groupeNom: 'L2 STAPS',
  dates: { p24: {}, p12: {} }, faites: { p24: {}, p12: {} }, notesSeance: { p24: {}, p12: {} },
  eleves: [], appel: { p24: {}, p12: {} }, evalPrat: {}, evalTheo: {}, videos: {}, favoris: [],
  niveauVue: 'tous', parcours: 'suaps', interv: { p24: {}, p12: {} }, obs: [], bareme: { qcm: 8, ptQcm: 0.5, courtes: 2, ptCourte: 1 },
};

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return structuredClone(DEFAULT);
    const s = JSON.parse(raw);
    return { ...structuredClone(DEFAULT), ...s };
  } catch (e) { return structuredClone(DEFAULT); }
}

export const Ctx = createContext(null);
export const RoleCtx = createContext(false);
export function useStoreState() {
  const [st, setSt] = useState(load);
  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) { /* stockage plein ou bloqué */ } }, [st]);
  const upd = useCallback((fn) => setSt((prev) => { const d = structuredClone(prev); const r = fn(d); return r || d; }), []);
  const replace = useCallback((s) => setSt({ ...structuredClone(DEFAULT), ...s }), []);
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
