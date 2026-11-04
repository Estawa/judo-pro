// Accès des étudiants : interrupteur et date de fin publiés dans config/acces.json
// - « etudiants » : false ferme l'accès étudiant tout de suite (dès que le téléphone se connecte)
// - « fin » : date (AAAA-MM-JJ) après laquelle l'espace étudiant ne fonctionne plus, même hors connexion
// - « codeProf » : empreinte du code professeur (le code lui-même n'est pas publié)
/* global __ACCES__ */
const LS = 'judopro-acces';
const DEFAUT = typeof __ACCES__ !== 'undefined' ? __ACCES__ : { etudiants: true, fin: '', message: '', codeProf: '' };

export function accesConnu() {
  try { const s = JSON.parse(localStorage.getItem(LS)); if (s && typeof s === 'object') return { ...DEFAUT, ...s }; } catch (e) { /* */ }
  return DEFAUT;
}
export async function rafraichirAcces() {
  try {
    const r = await fetch('config/acces.json?t=' + Date.now(), { cache: 'no-store' });
    if (!r.ok) return accesConnu();
    const a = await r.json();
    try { localStorage.setItem(LS, JSON.stringify(a)); } catch (e) { /* */ }
    return { ...DEFAUT, ...a };
  } catch (e) { return accesConnu(); } // hors connexion : dernière règle connue
}
const aujourdhui = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };
export function accesEtudiantOuvert(a) {
  if (!a || a.etudiants === false) return false;
  if (a.fin && aujourdhui() > a.fin) return false;
  return true;
}
export async function empreinte(code) {
  const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode('judopro:' + code));
  return [...new Uint8Array(b)].map((x) => x.toString(16).padStart(2, '0')).join('');
}
export const dateFr = (iso) => (iso ? new Date(iso + 'T12:00').toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : '');
