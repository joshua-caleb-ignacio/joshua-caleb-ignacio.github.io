// Computes UUID v5 of `name` using the URL namespace (RFC 4122 §4.3).
function _uuid5url(name) {
  const ns = new Uint8Array([0x6b,0xa7,0xb8,0x11,0x9d,0xad,0x11,0xd1,0x80,0xb4,0x00,0xc0,0x4f,0xd4,0x30,0xc8]);
  const nb = new TextEncoder().encode(name);
  const inp = new Uint8Array(ns.length + nb.length);
  inp.set(ns); inp.set(nb, ns.length);
  function rotl(n, b) { return ((n << b) | (n >>> (32 - b))) >>> 0; }
  function sha1(data) {
    const h = [0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476, 0xC3D2E1F0];
    const len = data.length, bitLen = len * 8;
    const padLen = (len % 64 < 56) ? 56 - (len % 64) : 120 - (len % 64);
    const padded = new Uint8Array(len + padLen + 8);
    padded.set(data); padded[len] = 0x80;
    const dv = new DataView(padded.buffer);
    dv.setUint32(padded.length - 8, Math.floor(bitLen / 0x100000000), false);
    dv.setUint32(padded.length - 4, bitLen >>> 0, false);
    for (let i = 0; i < padded.length; i += 64) {
      const w = new Uint32Array(80);
      for (let j = 0; j < 16; j++) w[j] = dv.getUint32(i + j * 4, false);
      for (let j = 16; j < 80; j++) w[j] = rotl(w[j-3] ^ w[j-8] ^ w[j-14] ^ w[j-16], 1);
      let [a, b, c, d, e] = h;
      for (let j = 0; j < 80; j++) {
        let f, k;
        if      (j < 20) { f = (b & c) | (~b & d);           k = 0x5A827999; }
        else if (j < 40) { f = b ^ c ^ d;                    k = 0x6ED9EBA1; }
        else if (j < 60) { f = (b & c) | (b & d) | (c & d); k = 0x8F1BBCDC; }
        else             { f = b ^ c ^ d;                    k = 0xCA62C1D6; }
        const t = (rotl(a, 5) + f + e + k + w[j]) >>> 0;
        e = d; d = c; c = rotl(b, 30); b = a; a = t;
      }
      h[0] = (h[0] + a) >>> 0; h[1] = (h[1] + b) >>> 0;
      h[2] = (h[2] + c) >>> 0; h[3] = (h[3] + d) >>> 0;
      h[4] = (h[4] + e) >>> 0;
    }
    const out = new Uint8Array(20);
    const ov = new DataView(out.buffer);
    h.forEach((v, i) => ov.setUint32(i * 4, v, false));
    return out;
  }
  const hash = sha1(inp);
  hash[6] = (hash[6] & 0x0f) | 0x50;
  hash[8] = (hash[8] & 0x3f) | 0x80;
  const x = Array.from(hash.slice(0, 16)).map(b => b.toString(16).padStart(2, '0')).join('');
  return `${x.slice(0,8)}-${x.slice(8,12)}-${x.slice(12,16)}-${x.slice(16,20)}-${x.slice(20)}`;
}

let isDark = isDarkFn();
let isDarkQuery = window.location.get("dark");
let isLightQuery = window.location.get("light");
if (isDarkQuery !== null || isLightQuery !== null) {
  if (isDarkQuery == 'false' || isLightQuery == 'true') {
    isDark = false;
  } else if (isDarkQuery == 'true' || isLightQuery == 'false') {
    isDark = true;
  }
}

export const IS_DARK = isDark;
const _todayUTC = new Date().toISOString().slice(0, 10);
const _expectedKey = _uuid5url(_todayUTC);
const _isAdmin = window.location.get("admin") === "true";
export const IS_PRIVATE = !isDebugging && !_isAdmin && !(window.location.get("private") == "false" && window.location.get("key") === _expectedKey);

// Color palette — each entry has fg (icon/text) and bg (badge background) for both themes
export const COLORS = {
  RED:        {fg: '#EA1A68',                           bg: !IS_DARK ? '#FDE8F0' : '#4B303B'},
  BLUE:       {fg: '#4285F4',                           bg: !IS_DARK ? '#E3EDFD' : '#323A4A'},
  CYAN:       {fg: '#22AAB6',                           bg: !IS_DARK ? '#E8F6F7' : '#2E3C3D'},
  ORANGE:     {fg: '#FE6F00',                           bg: !IS_DARK ? '#FDEEE8' : '#46352C'},
  YELLOW:     {fg: !IS_DARK ? '#E99E0E' : '#FFB11B',   bg: !IS_DARK ? '#FCF3E2' : '#40392C'},
  BROWN:      {fg: !IS_DARK ? '#BD5C17' : '#B3825D',   bg: !IS_DARK ? '#F3EDE9' : '#3E3834'},
  PURPLE:     {fg: !IS_DARK ? '#9831CF' : '#B73DF9',   bg: !IS_DARK ? '#F2E6F9' : '#41324B'},
  GREEN:      {fg: !IS_DARK ? '#259F31' : '#28BC36',   bg: !IS_DARK ? '#DFF1E0' : '#31402E'},
  PLAIN:      {fg: !IS_DARK ? '#333333' : '#EAEAEA',   bg: !IS_DARK ? '#F0F0F0' : '#393939'},
  LIGHT_GRAY: {fg: !IS_DARK ? '#333333' : '#B6BFBF',   bg: !IS_DARK ? '#F0F0F0' : '#373737'},
  MARBLE:     {fg: !IS_DARK ? '#333333' : '#EDD5BB',   bg: !IS_DARK ? '#F0F0F0' : '#3d3833'},
}

export const FEMALE_COLOR = '#ea1a68';
export const MALE_COLOR = '#2799fd';

export const TREE_BACKGROUND_COLOR = IS_DARK ? '#1A1B1C' : '#F2F3F4';
export const TREE_BRANCH_COLOR = IS_DARK ? '#7F7F7F' : '#AFAFAF';
export const TREE_NODE_BACKGROUND_COLOR = IS_DARK ? '#252728' : '#FFFFFF';

export const TREE_TEXTS_NAME_COLOR = IS_DARK ? '#FEFEFE' : '#000000';
export const TREE_TEXTS_NAMELESS_NAME_COLOR = IS_DARK ? '#909090' : '#BDBDBD';
export const TREE_TEXTS_NAMELESS_DETAILS_COLOR = IS_DARK ? '#929292' : '#B0B0B0';
export const TREE_TEXTS_DETAILS_TEXT_COLOR = IS_DARK ? '#BDC1C6' : '#222222';
export const TREE_TEXTS_DETAILS_LETTER_COLOR = IS_DARK ? '#DEDEDE' : '#222222';

export const MARKER_BACKGROUND_COLORS = {
  'female-twin': COLORS.RED.bg,
  'male-twin':   COLORS.BLUE.bg,
  apparel:       COLORS.ORANGE.bg,
  beautician:    COLORS.RED.bg,
  beer:          COLORS.BROWN.bg,
  book:          COLORS.CYAN.bg,
  buysell:       COLORS.PLAIN.bg,
  cattle:        COLORS.BROWN.bg,
  centennial:    COLORS.PLAIN.bg,
  church:        COLORS.PLAIN.bg,
  computer:      COLORS.LIGHT_GRAY.bg,
  default:       !IS_DARK ? '#ffffff' : '#2f2f2f',
  dna:           COLORS.PURPLE.bg,
  family:        COLORS.RED.bg,
  farming:       COLORS.GREEN.bg,
  fishery:       COLORS.PLAIN.bg,
  government:    COLORS.MARBLE.bg,
  househusband:  COLORS.BLUE.bg,
  housekeeper:   COLORS.RED.bg,
  housewife:     COLORS.RED.bg,
  intelligence:  COLORS.BLUE.bg,
  investigate:   COLORS.PLAIN.bg,
  justice:       COLORS.BLUE.bg,
  land:          !IS_DARK ? '#f2ebe6' : '#393633',
  lieutenant:    COLORS.YELLOW.bg,
  manager:       COLORS.PLAIN.bg,
  manufacturing: COLORS.PLAIN.bg,
  military:      COLORS.YELLOW.bg,
  painted:       COLORS.MARBLE.bg,
  police:        COLORS.BLUE.bg,
  prelations:    COLORS.YELLOW.bg,
  retail:        COLORS.ORANGE.bg,
  sales:         COLORS.YELLOW.bg,
  seaman:        COLORS.PLAIN.bg,
  sergeant:      COLORS.YELLOW.bg,
  signature:     COLORS.PURPLE.bg,
  skull:         COLORS.PLAIN.bg,
  software:      COLORS.PLAIN.bg,
  train:         COLORS.PLAIN.bg,
}

export const MARKER_FOREGROUND_COLORS = {
  'female-twin': COLORS.RED.fg,
  'male-twin':   COLORS.BLUE.fg,
  apparel:       COLORS.ORANGE.fg,
  beautician:    COLORS.RED.fg,
  beer:          COLORS.BROWN.fg,
  book:          COLORS.CYAN.fg,
  buysell:       COLORS.PLAIN.fg,
  cattle:        COLORS.BROWN.fg,
  centennial:    COLORS.PLAIN.fg,
  church:        COLORS.PLAIN.fg,
  computer:      COLORS.LIGHT_GRAY.fg,
  default:       !IS_DARK ? '#ffffff' : '#2f2f2f',
  dna:           COLORS.PURPLE.fg,
  family:        COLORS.RED.fg,
  farming:       COLORS.GREEN.fg,
  fishery:       COLORS.PLAIN.fg,
  government:    COLORS.MARBLE.fg,
  househusband:  COLORS.BLUE.fg,
  housekeeper:   COLORS.RED.fg,
  housewife:     COLORS.RED.fg,
  intelligence:  COLORS.BLUE.fg,
  investigate:   COLORS.PLAIN.fg,
  justice:       COLORS.BLUE.fg,
  land:          !IS_DARK ? '#f2ebe6' : '#393633',
  lieutenant:    COLORS.YELLOW.fg,
  manager:       COLORS.PLAIN.fg,
  manufacturing: COLORS.PLAIN.fg,
  military:      COLORS.YELLOW.fg,
  painted:       COLORS.MARBLE.fg,
  police:        COLORS.BLUE.fg,
  prelations:    COLORS.YELLOW.fg,
  retail:        COLORS.ORANGE.fg,
  sales:         COLORS.YELLOW.fg,
  seaman:        COLORS.PLAIN.fg,
  sergeant:      COLORS.YELLOW.fg,
  signature:     COLORS.PURPLE.fg,
  skull:         COLORS.PLAIN.fg,
  software:      COLORS.PLAIN.fg,
  train:         COLORS.PLAIN.fg,
}

export const TREE_TEXTS_NAME_FONT_SIZE = 14.3;
export const TREE_TEXTS_DETAILS_FONT_SIZE = 12.0;

export const TREE_NODE_MARKER_MARGIN = 3.9;
export const TREE_NODE_MARKER_WIDTH = 21.0;
export const TREE_NODE_MARKER_SCALE = 0.38;

export const TREE_NODE_PADDING = 10.0;
export const TREE_NODE_BASE_HEIGHT = 95.5;
export const TREE_NODE_GENDER_BAND_WIDTH = 2.6;
export const TREE_NODE_WIDTHS_BY_GENERATION = {
  0: 320, // Caleb's generation
  1: 395,
  2: 405,
  3: 429,
  4: 352,
  5: 370,
  6: 308,
  7: 410,
  8: 410,
}

// Fine-tunes SVG icon placement within the marker circle badge.
// Values are [top, right, bottom, left] pixel offsets — map to bino.Margin(t, r, b, l).
// Markers not listed here fall back to the 'default' entry.
export const MARKER_ICON_MARGINS = {
  'cattle':       [-0.25, 0, 0, 0.75],
  'family':       [3,     0, 0, 2.5],
  'farming':      [2.25,  0, 0, 1.95],
  'female-twin':  [0,     0, 0, 2],
  'fishery':      [2,     0, 0, 2.7],
  'househusband': [1.8,   0, 0, 1.5],
  'housewife':    [1.8,   0, 0, 1.5],
  'intelligence': [1.95,  0, 0, 1.85],
  'male-twin':    [0,     0, 0, 2],
  'military':     [0.9,   0, 0, 1.1],
  'prelations':   [3,     0, 0, 2],
  'sales':        [3,     0, 0, 2.5],
  'sergeant':     [0,     0, 0, 0.35],
  'signature':    [2,     0, 0, -0.025],
  'train':        [3,     0, 0, 2],
  'default':      [2,     0, 0, 2],
}

// Human-readable badge labels for each marker type, shown in the sidebar.
// Markers not listed fall back to displaying the raw marker key.
export const MARKER_LABELS = {
  apparel:        'Seamstress',
  beer:           'Known Alcohol Use',
  book:           'Documented Life Stories',
  cattle:         'Cattle Vendor',
  centennial:     'Centenarian',
  computer:       'Technology Sector',
  dna:            'DNA Verified',
  family:         'Family Historian',
  farming:        'Farmer',
  fishery:        'Fishery Owner',
  government:     'Government Official',
  housewife:      'Housewife',
  intelligence:   'Intelligence Officer',
  investigate:    'Investigator',
  justice:        'Law Enforcement Professional',
  lieutenant:     'Military Lieutenant',
  'male-twin':    'Male Twin',
  manager:        'Work Manager',
  manufacturing:  'Factory Worker',
  military:       'Military Veteran',
  painted:        'Painted Portrait',
  police:         'Police Officer',
  prelations:     'Public Relations Skills',
  retail:         'Divisoria Vendor',
  sergeant:       'Military Sergeant',
  signature:      'Signed Document Exists',
  skull:          'Death March Survivor',
  software:       'Software Engineer',
  train:          'Railroad Worker',
}

// Maps 3-letter ISO country codes to their full country names.
export const COUNTRY_CODES = {
  'USA': 'United States of America',
  'PHL': 'Philippines',
  'BHR': 'Bahrain',
}
