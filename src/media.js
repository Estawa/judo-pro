// Médias personnels (photos, vidéos, GIF filmés par l'enseignant) stockés sur l'appareil (IndexedDB)
const DB = 'judopro-media', ST = 'medias', IL = 'illus';
function open() {
  return new Promise((res, rej) => {
    const r = indexedDB.open(DB, 2);
    r.onupgradeneeded = () => {
      const db = r.result;
      if (!db.objectStoreNames.contains(ST)) { const s = db.createObjectStore(ST, { keyPath: 'id' }); s.createIndex('tech', 'tech'); }
      if (!db.objectStoreNames.contains(IL)) db.createObjectStore(IL, { keyPath: 'slot' });
    };
    r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error);
  });
}
export async function addMedia(tech, file) {
  const db = await open();
  const item = { id: Math.random().toString(36).slice(2) + Date.now(), tech, type: file.type, name: file.name, blob: file, date: Date.now() };
  await new Promise((res, rej) => { const tx = db.transaction(ST, 'readwrite'); tx.objectStore(ST).put(item); tx.oncomplete = res; tx.onerror = () => rej(tx.error); });
  return item;
}
export async function listMedia(tech) {
  try {
    const db = await open();
    return await new Promise((res, rej) => { const tx = db.transaction(ST); const q = tx.objectStore(ST).index('tech').getAll(tech); q.onsuccess = () => res(q.result || []); q.onerror = () => rej(q.error); });
  } catch (e) { return []; }
}
export async function countAll() {
  try {
    const db = await open();
    return await new Promise((res) => { const tx = db.transaction(ST); const q = tx.objectStore(ST).getAll(); q.onsuccess = () => { const m = {}; (q.result || []).forEach((x) => { m[x.tech] = (m[x.tech] || 0) + 1; }); res(m); }; q.onerror = () => res({}); });
  } catch (e) { return {}; }
}
export async function delMedia(id) {
  const db = await open();
  await new Promise((res) => { const tx = db.transaction(ST, 'readwrite'); tx.objectStore(ST).delete(id); tx.oncomplete = res; });
}
export function ytId(url) {
  const m = String(url).match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
  return m ? m[1] : null;
}

// ─────────── Illustrations qui remplacent les dessins ───────────
// slot = 'tech:o-soto-gari', 'rose:o-soto-gari', 'geste:ippon'…
// Ordre de priorité : illustration de l'appareil → illustration publiée avec l'appli (dossier media/) → dessin
export async function getIllus(slot) {
  try {
    const db = await open();
    return await new Promise((res) => { const q = db.transaction(IL).objectStore(IL).get(slot); q.onsuccess = () => res(q.result || null); q.onerror = () => res(null); });
  } catch (e) { return null; }
}
export async function setIllus(slot, file) {
  const db = await open();
  const item = { slot, type: file.type || 'image/jpeg', name: file.name || slot, blob: file, date: Date.now() };
  await new Promise((res, rej) => { const tx = db.transaction(IL, 'readwrite'); tx.objectStore(IL).put(item); tx.oncomplete = res; tx.onerror = () => rej(tx.error); });
  window.dispatchEvent(new CustomEvent('illus-change', { detail: slot }));
}
export async function delIllus(slot) {
  const db = await open();
  await new Promise((res) => { const tx = db.transaction(IL, 'readwrite'); tx.objectStore(IL).delete(slot); tx.oncomplete = res; });
  window.dispatchEvent(new CustomEvent('illus-change', { detail: slot }));
}
export async function allIllus() {
  try {
    const db = await open();
    return await new Promise((res) => { const q = db.transaction(IL).objectStore(IL).getAll(); q.onsuccess = () => res(q.result || []); q.onerror = () => res([]); });
  } catch (e) { return []; }
}
let publies = null;
export async function illusPubliees() {
  if (publies) return publies;
  try { const r = await fetch('media/manifest.json', { cache: 'no-cache' }); publies = r.ok ? await r.json() : {}; } catch (e) { publies = {}; }
  return publies;
}

// Zip sans compression (pour envoyer ses illustrations et les publier pour tous les appareils)
const CRC = (() => { const t = new Uint32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; })();
const crc32 = (b) => { let c = 0xffffffff; for (let i = 0; i < b.length; i++) c = CRC[(c ^ b[i]) & 255] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
export async function zipFiles(files) { // [{ name, data: Uint8Array }]
  const enc = new TextEncoder(); const parts = []; const central = []; let off = 0;
  for (const f of files) {
    const nm = enc.encode(f.name); const crc = crc32(f.data); const sz = f.data.length;
    const h = new DataView(new ArrayBuffer(30));
    h.setUint32(0, 0x04034b50, true); h.setUint16(4, 20, true); h.setUint16(6, 0x0800, true); h.setUint32(14, crc, true); h.setUint32(18, sz, true); h.setUint32(22, sz, true); h.setUint16(26, nm.length, true);
    parts.push(new Uint8Array(h.buffer), nm, f.data);
    const c = new DataView(new ArrayBuffer(46));
    c.setUint32(0, 0x02014b50, true); c.setUint16(4, 20, true); c.setUint16(6, 20, true); c.setUint16(8, 0x0800, true); c.setUint32(16, crc, true); c.setUint32(20, sz, true); c.setUint32(24, sz, true); c.setUint16(28, nm.length, true); c.setUint32(42, off, true);
    central.push(new Uint8Array(c.buffer), nm);
    off += 30 + nm.length + sz;
  }
  const cs = central.reduce((a, x) => a + x.length, 0);
  const e = new DataView(new ArrayBuffer(22));
  e.setUint32(0, 0x06054b50, true); e.setUint16(8, files.length, true); e.setUint16(10, files.length, true); e.setUint32(12, cs, true); e.setUint32(16, off, true);
  return new Blob([...parts, ...central, new Uint8Array(e.buffer)], { type: 'application/zip' });
}
const EXT = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/gif': 'gif', 'image/webp': 'webp', 'image/heic': 'heic', 'video/mp4': 'mp4', 'video/quicktime': 'mov', 'video/webm': 'webm' };
export async function exportIllus() {
  const l = await allIllus(); if (!l.length) return null;
  const manifest = {}; const files = [];
  for (const x of l) {
    const ext = EXT[x.type] || (x.name.split('.').pop() || 'bin').toLowerCase();
    const name = 'media/' + x.slot.replace(':', '__') + '.' + ext;
    manifest[x.slot] = { src: name, type: x.type };
    files.push({ name, data: new Uint8Array(await x.blob.arrayBuffer()) });
  }
  files.push({ name: 'media/manifest.json', data: new TextEncoder().encode(JSON.stringify(manifest, null, 1)) });
  return zipFiles(files);
}
