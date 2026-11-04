// Lecture de fichiers de classe : .csv, .xlsx, .xls (Excel 97-2003) et .ods (LibreOffice / OpenOffice)
// Renvoie la première feuille sous forme de lignes : [['Nom', 'Prénom', 'Classe'], ...]
// Fonctionne hors connexion, sans bibliothèque externe.

export async function lireTableur(file) {
  const buf = new Uint8Array(await file.arrayBuffer());
  if (buf[0] === 0x50 && buf[1] === 0x4b) return lireZip(buf);
  if (buf[0] === 0xd0 && buf[1] === 0xcf && buf[2] === 0x11 && buf[3] === 0xe0) return lireXls(buf);
  return lireCsv(decoderTexte(buf));
}

// ─────────── CSV / texte ───────────
function decoderTexte(buf) {
  let t = new TextDecoder('utf-8').decode(buf);
  if (t.includes('�')) t = new TextDecoder('windows-1252').decode(buf); // export Excel « CSV (séparateur : point-virgule) »
  return t.replace(/^﻿/, '');
}
export function lireCsv(text) {
  const lignes = text.replace(/\r\n?/g, '\n').split('\n').filter((l) => l.trim());
  if (!lignes.length) return [];
  const l0 = lignes[0];
  const sep = [';', '\t', ','].sort((a, b) => l0.split(b).length - l0.split(a).length)[0];
  return lignes.map((l) => {
    const out = []; let cur = '', q = false;
    for (let i = 0; i < l.length; i++) {
      const c = l[i];
      if (q) { if (c === '"' && l[i + 1] === '"') { cur += '"'; i++; } else if (c === '"') q = false; else cur += c; }
      else if (c === '"') q = true; else if (c === sep) { out.push(cur); cur = ''; } else cur += c;
    }
    out.push(cur);
    return out.map((x) => x.trim());
  });
}

// ─────────── ZIP (xlsx, ods) ───────────
async function unzip(buf) {
  const dv = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
  let e = buf.length - 22;
  while (e >= 0 && dv.getUint32(e, true) !== 0x06054b50) e--;
  if (e < 0) throw new Error('Fichier compressé illisible');
  const n = dv.getUint16(e + 10, true); let p = dv.getUint32(e + 16, true);
  const files = {};
  for (let i = 0; i < n; i++) {
    const meth = dv.getUint16(p + 10, true), csz = dv.getUint32(p + 20, true);
    const nl = dv.getUint16(p + 28, true), xl = dv.getUint16(p + 30, true), cl = dv.getUint16(p + 32, true), off = dv.getUint32(p + 42, true);
    const name = new TextDecoder().decode(buf.subarray(p + 46, p + 46 + nl));
    files[name] = { meth, csz, off };
    p += 46 + nl + xl + cl;
  }
  const lire = async (name) => {
    const f = files[name]; if (!f) return null;
    const lo = f.off + 30 + dv.getUint16(f.off + 26, true) + dv.getUint16(f.off + 28, true);
    const data = buf.subarray(lo, lo + f.csz);
    if (f.meth === 0) return new TextDecoder().decode(data);
    if (typeof DecompressionStream === 'undefined') throw new Error('Navigateur trop ancien pour lire ce fichier : enregistrez-le en CSV');
    const s = new Blob([data]).stream().pipeThrough(new DecompressionStream('deflate-raw'));
    return new Response(s).text();
  };
  return { noms: Object.keys(files), lire };
}

const xml = (t) => new DOMParser().parseFromString(t, 'application/xml');
const enfants = (el, local) => [...el.childNodes].filter((n) => n.nodeType === 1 && n.localName === local);
const tous = (el, local) => [...el.getElementsByTagNameNS('*', local)];

async function lireZip(buf) {
  const z = await unzip(buf);
  if (z.noms.includes('content.xml')) return lireOds(await z.lire('content.xml'));
  if (z.noms.includes('xl/workbook.xml')) return lireXlsx(z);
  throw new Error('Format non reconnu (ni .xlsx ni .ods)');
}

async function lireXlsx(z) {
  const partages = [];
  const ss = await z.lire('xl/sharedStrings.xml');
  if (ss) tous(xml(ss), 'si').forEach((si) => partages.push(tous(si, 't').map((t) => t.textContent).join('')));
  // première feuille dans l'ordre du classeur
  let chemin = null;
  try {
    const wb = xml(await z.lire('xl/workbook.xml'));
    const sh = tous(wb, 'sheet')[0];
    const rid = sh.getAttributeNS('http://schemas.openxmlformats.org/officeDocument/2006/relationships', 'id') || sh.getAttribute('r:id');
    const rels = xml(await z.lire('xl/_rels/workbook.xml.rels'));
    const rel = tous(rels, 'Relationship').find((r) => r.getAttribute('Id') === rid);
    if (rel) { const t = rel.getAttribute('Target'); chemin = t.startsWith('/') ? t.slice(1) : 'xl/' + t.replace(/^\.\//, ''); }
  } catch (e) { /* on prend la première feuille trouvée */ }
  if (!chemin || !z.noms.includes(chemin)) chemin = z.noms.filter((n) => /^xl\/worksheets\/[^/]+\.xml$/.test(n)).sort()[0];
  const doc = xml(await z.lire(chemin));
  const lignes = [];
  tous(doc, 'row').forEach((row, ri) => {
    const r = (Number(row.getAttribute('r')) || ri + 1) - 1;
    const l = [];
    enfants(row, 'c').forEach((c, ci) => {
      const ref = c.getAttribute('r');
      const col = ref ? colIndex(ref.replace(/\d+/g, '')) : ci;
      const t = c.getAttribute('t');
      const v = enfants(c, 'v')[0]?.textContent ?? '';
      let val;
      if (t === 's') val = partages[Number(v)] ?? '';
      else if (t === 'inlineStr') val = tous(c, 't').map((x) => x.textContent).join('');
      else if (t === 'b') val = v === '1' ? 'VRAI' : 'FAUX';
      else val = v;
      l[col] = String(val).trim();
    });
    lignes[r] = Array.from(l, (x) => x ?? '');
  });
  return Array.from(lignes, (x) => x || []).filter((l) => l.some((x) => x));
}
const colIndex = (s) => [...s.toUpperCase()].reduce((a, c) => a * 26 + c.charCodeAt(0) - 64, 0) - 1;

function lireOds(contenu) {
  const doc = xml(contenu);
  const table = tous(doc, 'table')[0];
  if (!table) return [];
  const lignes = [];
  const lignesXml = tous(table, 'table-row');
  for (const row of lignesXml) {
    const rep = Math.min(Number(row.getAttribute('table:number-rows-repeated')) || 1, 1000);
    const l = [];
    for (const cell of [...row.childNodes].filter((n) => n.nodeType === 1 && /table-cell$/.test(n.localName))) {
      const n = Math.min(Number(cell.getAttribute('table:number-columns-repeated')) || 1, 100);
      const txt = tous(cell, 'p').map((p) => p.textContent).join(' ').trim() || cell.getAttribute('office:value') || '';
      for (let i = 0; i < n; i++) l.push(txt);
    }
    while (l.length && !l[l.length - 1]) l.pop();
    for (let i = 0; i < rep; i++) lignes.push(l);
    if (lignes.length > 5000) break;
  }
  return lignes.filter((l) => l.some((x) => x));
}

// ─────────── XLS (Excel 97-2003, format binaire BIFF8) ───────────
function lireXls(buf) {
  const dv = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
  const ssz = 1 << dv.getUint16(0x1e, true), mssz = 1 << dv.getUint16(0x20, true);
  const sect = (i) => 512 + i * ssz;
  // table d'allocation (FAT) via la DIFAT
  const difat = [];
  for (let i = 0; i < 109; i++) { const s = dv.getInt32(0x4c + i * 4, true); if (s >= 0) difat.push(s); }
  let dsec = dv.getInt32(0x44, true), ndif = dv.getUint32(0x48, true);
  while (dsec >= 0 && ndif-- > 0) {
    for (let i = 0; i < ssz / 4 - 1; i++) { const s = dv.getInt32(sect(dsec) + i * 4, true); if (s >= 0) difat.push(s); }
    dsec = dv.getInt32(sect(dsec) + ssz - 4, true);
  }
  const fat = [];
  difat.forEach((s) => { for (let i = 0; i < ssz / 4; i++) fat.push(dv.getInt32(sect(s) + i * 4, true)); });
  const chaine = (start, table, garde = 1e6) => { const l = []; let s = start; while (s >= 0 && s < table.length && l.length < garde) { l.push(s); s = table[s]; } return l; };
  const lireFlux = (start) => { const l = chaine(start, fat); const out = new Uint8Array(l.length * ssz); l.forEach((s, i) => out.set(buf.subarray(sect(s), sect(s) + ssz), i * ssz)); return out; };
  // répertoire
  const dir = lireFlux(dv.getInt32(0x30, true));
  const ddv = new DataView(dir.buffer);
  const entrees = [];
  for (let o = 0; o + 128 <= dir.length; o += 128) {
    const nl = ddv.getUint16(o + 64, true);
    const nom = String.fromCharCode(...Array.from({ length: Math.max(0, nl / 2 - 1) }, (_, i) => ddv.getUint16(o + i * 2, true)));
    entrees.push({ nom, type: dir[o + 66], start: ddv.getInt32(o + 116, true), size: ddv.getUint32(o + 120, true) });
  }
  const racine = entrees.find((e) => e.type === 5);
  const wbk = entrees.find((e) => e.nom === 'Workbook' || e.nom === 'Book');
  if (!wbk) throw new Error('Classeur Excel illisible');
  let data;
  if (wbk.size < dv.getUint32(0x38, true)) { // petit fichier : flux miniature
    const mini = lireFlux(racine.start);
    const mfatL = chaine(dv.getInt32(0x3c, true), fat);
    const mfat = [];
    mfatL.forEach((s) => { for (let i = 0; i < ssz / 4; i++) mfat.push(dv.getInt32(sect(s) + i * 4, true)); });
    const l = chaine(wbk.start, mfat);
    data = new Uint8Array(l.length * mssz);
    l.forEach((s, i) => data.set(mini.subarray(s * mssz, s * mssz + mssz), i * mssz));
  } else data = lireFlux(wbk.start);
  return biff(data.subarray(0, wbk.size));
}

function biff(d) {
  const dv = new DataView(d.buffer, d.byteOffset, d.byteLength);
  const recs = [];
  for (let p = 0; p + 4 <= d.length;) { const t = dv.getUint16(p, true), n = dv.getUint16(p + 2, true); recs.push({ t, p: p + 4, n }); p += 4 + n; }
  const cp1252 = new TextDecoder('windows-1252');
  // table des chaînes partagées (SST) avec ses enregistrements CONTINUE
  const sst = [];
  const iSst = recs.findIndex((r) => r.t === 0xfc);
  if (iSst >= 0) {
    const segs = [recs[iSst]]; for (let k = iSst + 1; k < recs.length && recs[k].t === 0x3c; k++) segs.push(recs[k]);
    let si = 0, pos = segs[0].p + 8;
    const fin = () => segs[si].p + segs[si].n;
    const avance = () => { if (pos >= fin() && si < segs.length - 1) { si++; pos = segs[si].p; } };
    const u8 = () => { avance(); return d[pos++]; };
    const u16 = () => { avance(); const v = dv.getUint16(pos, true); pos += 2; return v; };
    const u32 = () => { avance(); const v = dv.getUint32(pos, true); pos += 4; return v; };
    const total = dv.getUint32(segs[0].p + 4, true);
    for (let k = 0; k < total; k++) {
      if (si >= segs.length - 1 && pos >= fin()) break;
      const cch = u16(); let fl = u8();
      const runs = fl & 8 ? u16() : 0; const ext = fl & 4 ? u32() : 0;
      let s = '', reste = cch;
      while (reste > 0) {
        if (pos >= fin()) { si++; pos = segs[si].p; fl = d[pos++]; }
        const large = fl & 1; const dispo = Math.floor((fin() - pos) / (large ? 2 : 1)); const nb = Math.min(reste, dispo);
        if (large) { for (let j = 0; j < nb; j++) s += String.fromCharCode(dv.getUint16(pos + j * 2, true)); pos += nb * 2; }
        else { s += cp1252.decode(d.subarray(pos, pos + nb)); pos += nb; }
        reste -= nb;
      }
      for (let skip = runs * 4 + ext; skip > 0;) { avance(); const m = Math.min(skip, fin() - pos); pos += m; skip -= m; }
      sst.push(s);
    }
  }
  const rk = (v) => { let n = v & 2 ? v >> 2 : (() => { const b = new DataView(new ArrayBuffer(8)); b.setUint32(4, v & 0xfffffffc, true); return b.getFloat64(0, true); })(); return v & 1 ? n / 100 : n; };
  const lignes = [];
  const set = (r, c, v) => { (lignes[r] = lignes[r] || [])[c] = String(v).trim(); };
  // première feuille : après la fin des données globales (EOF), jusqu'à l'EOF suivant
  let i = recs.findIndex((r) => r.t === 0x0a) + 1;
  let attenteChaine = null;
  for (; i < recs.length; i++) {
    const { t, p, n } = recs[i];
    if (t === 0x0a) break;
    if (t === 0xfd) set(dv.getUint16(p, true), dv.getUint16(p + 2, true), sst[dv.getUint32(p + 6, true)] ?? '');
    else if (t === 0x204) { const cch = dv.getUint16(p + 6, true), fl = d[p + 8]; set(dv.getUint16(p, true), dv.getUint16(p + 2, true), fl & 1 ? String.fromCharCode(...Array.from({ length: cch }, (_, j) => dv.getUint16(p + 9 + j * 2, true))) : cp1252.decode(d.subarray(p + 9, p + 9 + cch))); }
    else if (t === 0x203) set(dv.getUint16(p, true), dv.getUint16(p + 2, true), dv.getFloat64(p + 6, true));
    else if (t === 0x27e) set(dv.getUint16(p, true), dv.getUint16(p + 2, true), rk(dv.getInt32(p + 6, true)));
    else if (t === 0xbd) { const r = dv.getUint16(p, true), c0 = dv.getUint16(p + 2, true), nb = (n - 6) / 6; for (let j = 0; j < nb; j++) set(r, c0 + j, rk(dv.getInt32(p + 4 + j * 6 + 2, true))); }
    else if (t === 0x06) { const r = dv.getUint16(p, true), c = dv.getUint16(p + 2, true); if (dv.getUint16(p + 12, true) === 0xffff && d[p + 6] === 0) attenteChaine = [r, c]; else if (dv.getUint16(p + 12, true) !== 0xffff) set(r, c, dv.getFloat64(p + 6, true)); }
    else if (t === 0x207 && attenteChaine) { const cch = dv.getUint16(p, true), fl = d[p + 2]; set(attenteChaine[0], attenteChaine[1], fl & 1 ? String.fromCharCode(...Array.from({ length: cch }, (_, j) => dv.getUint16(p + 3 + j * 2, true))) : cp1252.decode(d.subarray(p + 3, p + 3 + cch))); attenteChaine = null; }
  }
  return Array.from(lignes, (l) => Array.from(l || [], (x) => x ?? '')).filter((l) => l.some((x) => x));
}
