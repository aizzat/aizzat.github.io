/**
 * ARC Crew avatars: hologram-style lab robots drawn as inline SVG, used instead of photos
 * so student members stay private. The robot class follows each student's research area;
 * small details (accent colour, eyes, antenna) are seeded from the name, so every robot
 * is unique but stays the same on every visit. Hover/tap animations live in style.css.
 */

const ACCENTS = ['#FFD500', '#00FFA3', '#FFB020', '#7FD4FF', '#FF6B6B'];
const HOLO = '#00E5FF';

// Small deterministic RNG seeded from the name
const seededRandom = (text) => {
  let h = 2166136261;
  for (const ch of text) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
};
const pick = (rand, list) => list[Math.floor(rand() * list.length)];

const shape = `stroke="${HOLO}" stroke-width="2.5" fill="${HOLO}" fill-opacity="0.12" stroke-linejoin="round"`;

const eyes = (style, cx, cy, gap, accent) => {
  const xs = [cx - gap / 2, cx + gap / 2];
  if (style === 'visor') {
    return `<rect class="crew-eye" x="${cx - gap / 2 - 6}" y="${cy - 3.5}" width="${gap + 12}" height="7" rx="3.5" fill="${accent}"/>`;
  }
  if (style === 'pixel') {
    return xs.map(x => `<rect class="crew-eye" x="${x - 3.5}" y="${cy - 3.5}" width="7" height="7" fill="${accent}"/>`).join('');
  }
  return xs.map(x => `<circle class="crew-eye" cx="${x}" cy="${cy}" r="4" fill="${accent}"/>`).join('');
};

const antenna = (x, y, style, accent) => {
  if (style === 'none') return '';
  const tipY = y - 20;
  const tilt = style === 'bent' ? 8 : 0;
  return `<path d="M${x} ${y} L${x + tilt} ${tipY + 6} L${x + tilt} ${tipY}" stroke="${HOLO}" stroke-width="2" fill="none"/>
    <circle class="crew-blink" cx="${x + tilt}" cy="${tipY - 3}" r="3.5" fill="${accent}"/>`;
};

const wheel = (cx, cy, r) => `
  <g class="crew-wheel">
    <circle cx="${cx}" cy="${cy}" r="${r}" ${shape}/>
    <circle cx="${cx}" cy="${cy}" r="${r * 0.35}" fill="none" stroke="${HOLO}" stroke-width="2"/>
    <path d="M${cx - r * 0.8} ${cy} H${cx + r * 0.8} M${cx} ${cy - r * 0.8} V${cy + r * 0.8}" stroke="${HOLO}" stroke-width="1.5"/>
  </g>`;

const emblem = (kind, cx, cy, accent) => {
  if (kind === 'chip') {
    const pins = [-6, 0, 6].map(o =>
      `<path d="M${cx + o} ${cy - 12} v-4 M${cx + o} ${cy + 12} v4 M${cx - 12} ${cy + o} h-4 M${cx + 12} ${cy + o} h4" stroke="${accent}" stroke-width="1.5"/>`).join('');
    return `<rect x="${cx - 11}" y="${cy - 11}" width="22" height="22" rx="3" fill="none" stroke="${accent}" stroke-width="2"/>${pins}
      <rect x="${cx - 4}" y="${cy - 4}" width="8" height="8" fill="${accent}"/>`;
  }
  if (kind === 'nodes') {
    const pts = [[cx, cy - 10], [cx - 10, cy + 7], [cx + 10, cy + 7]];
    return `<path d="M${pts[0]} L${pts[1]} L${pts[2]} Z M${cx} ${cy} L${pts[0]} M${cx} ${cy} L${pts[1]} M${cx} ${cy} L${pts[2]}" fill="none" stroke="${accent}" stroke-width="1.5"/>
      ${pts.concat([[cx, cy]]).map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3" fill="${accent}"/>`).join('')}`;
  }
  return '';
};

const ROBOTS = {
  // Autonomous vehicle, side view, headlight beam ahead
  rover: ({ accent, eyeStyle, antennaStyle }) => `
    <polygon points="166,124 198,112 198,142" fill="${accent}" opacity="0.14"/>
    ${antenna(84, 92, antennaStyle, accent)}
    <rect x="94" y="80" width="18" height="12" rx="3" ${shape}/>
    <ellipse class="crew-ring" cx="103" cy="86" rx="30" ry="6" fill="none" stroke="${HOLO}" stroke-width="1.5" stroke-dasharray="4 5"/>
    <path d="M60 118 L78 92 L134 92 L150 118 Z" ${shape}/>
    <path d="M118 96 L138 116" stroke="${HOLO}" stroke-width="1.5" opacity="0.6"/>
    <rect x="32" y="116" width="136" height="30" rx="9" ${shape}/>
    ${eyes(eyeStyle, 108, 106, 16, accent)}
    <rect class="crew-blink" x="160" y="124" width="7" height="6" rx="2" fill="${accent}"/>
    ${wheel(66, 150, 16)}${wheel(136, 150, 16)}`,

  // Autonomous mobile robot with LiDAR puck and a face screen
  amr: ({ accent, eyeStyle, antennaStyle, emblemKind }) => `
    ${antenna(132, 98, antennaStyle, accent)}
    <ellipse class="crew-ring" cx="100" cy="86" rx="46" ry="9" fill="none" stroke="${HOLO}" stroke-width="1.5" stroke-dasharray="4 5"/>
    <rect x="84" y="76" width="32" height="18" rx="5" ${shape}/>
    <ellipse cx="100" cy="76" rx="16" ry="4" fill="${HOLO}" opacity="0.5"/>
    <rect x="56" y="96" width="88" height="58" rx="12" ${shape}/>
    <rect x="68" y="104" width="64" height="26" rx="7" fill="#04101a" stroke="${HOLO}" stroke-width="1.5"/>
    ${eyes(eyeStyle, 100, 117, 22, accent)}
    ${emblem(emblemKind, 100, 142, accent)}
    <circle class="crew-blink" cx="134" cy="146" r="3" fill="${accent}"/>
    ${wheel(74, 160, 11)}${wheel(126, 160, 11)}`,

  // Path planning: a small rover at the start of a planned route through waypoints to a goal flag
  pathfinder: (traits) => {
    const { accent } = traits;
    const pin = (x, y) => `<path d="M${x} ${y} c-7 -9 -9 -13 -9 -17 a9 9 0 0 1 18 0 c0 4 -2 8 -9 17 Z" ${shape}/>
      <circle cx="${x}" cy="${y - 17}" r="3.5" fill="${accent}"/>`;
    return `
      <path class="crew-route" d="M96 162 C 130 160, 128 128, 146 118 S 170 92, 172 62" fill="none" stroke="${accent}" stroke-width="3" stroke-linecap="round" stroke-dasharray="2 9"/>
      ${pin(146, 118)}${pin(166, 92)}
      <path d="M172 62 V28" stroke="${HOLO}" stroke-width="2.5" stroke-linecap="round"/>
      <path class="crew-blink" d="M172 28 L194 35 L172 42 Z" fill="${accent}"/>
      <g transform="translate(-6 66) scale(0.62)">${ROBOTS.rover(traits)}</g>`;
  },

  // Steering and vehicle dynamics: top-down car, front wheels turned, with a yaw arrow
  steer: ({ accent }) => {
    const tyre = (x, y) => `<rect x="${x - 6}" y="${y - 13}" width="12" height="26" rx="4" ${shape}/>`;
    return `
      <path class="crew-route" d="M150 64 A 62 62 0 0 1 162 128" fill="none" stroke="${accent}" stroke-width="3" stroke-linecap="round" stroke-dasharray="6 6"/>
      <path d="M156 124 L163 134 L170 123" fill="none" stroke="${accent}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M72 186 C 70 172, 70 166, 72 160 M128 186 C 130 172, 130 166, 128 160" stroke="${HOLO}" stroke-opacity="0.3" stroke-width="10"/>
      <g class="crew-steer">${tyre(66, 66)}</g><g class="crew-steer">${tyre(134, 66)}</g>
      ${tyre(66, 140)}${tyre(134, 140)}
      <rect x="70" y="38" width="60" height="124" rx="22" ${shape}/>
      <path d="M78 76 Q100 66 122 76 L118 90 Q100 84 82 90 Z" fill="#04101a" stroke="${HOLO}" stroke-width="1.5"/>
      <rect class="crew-eye" x="78" y="44" width="12" height="6" rx="3" fill="${accent}"/>
      <rect class="crew-eye" x="110" y="44" width="12" height="6" rx="3" fill="${accent}"/>
      <g class="crew-wheel">
        <circle cx="100" cy="114" r="14" fill="none" stroke="${accent}" stroke-width="3"/>
        <path d="M100 114 V128 M100 114 L87 108 M100 114 L113 108" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/>
        <circle cx="100" cy="114" r="3.5" fill="${accent}"/>
      </g>
      <rect x="80" y="148" width="40" height="6" rx="3" fill="${HOLO}" opacity="0.5"/>`;
  },

  // Secret agent: robot in a fedora, sunglasses and trench coat, stamped CLASSIFIED
  agent: () => `
    <path d="M66 172 L74 132 Q100 124 126 132 L134 172 Z" ${shape}/>
    <path d="M100 130 L88 152 M100 130 L112 152 M100 134 V172" stroke="${HOLO}" stroke-width="2" fill="none"/>
    <rect x="70" y="150" width="60" height="6" rx="2" fill="${HOLO}" opacity="0.45"/>
    <rect x="92" y="118" width="16" height="10" ${shape}/>
    <rect x="66" y="70" width="68" height="52" rx="16" ${shape}/>
    <path d="M70 88 H130 L126 100 Q116 106 106 99 L100 95 L94 99 Q84 106 74 100 Z" fill="#05080c" stroke="${HOLO}" stroke-width="1.5"/>
    <path class="crew-eye" d="M78 92 L88 92" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity="0.85"/>
    <path d="M90 112 Q100 116 110 110" fill="none" stroke="${HOLO}" stroke-width="2" stroke-linecap="round"/>
    <path d="M74 70 Q74 40 100 40 Q126 40 126 70 Z" ${shape}/>
    <rect x="74" y="60" width="52" height="7" fill="#FF6B6B" opacity="0.85"/>
    <ellipse cx="100" cy="70" rx="48" ry="7" ${shape}/>
    <g transform="rotate(-12 100 152)">
      <rect x="52" y="140" width="96" height="22" rx="3" fill="rgba(6,13,20,0.7)" stroke="#FF6B6B" stroke-width="2.5"/>
      <text x="100" y="156" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="13" letter-spacing="2" fill="#FF6B6B">CLASSIFIED</text>
    </g>`,

  // Industrial arm with a camera head and gripper; the forearm waves on hover
  arm: ({ accent, eyeStyle }) => `
    <rect x="58" y="152" width="84" height="14" rx="4" ${shape}/>
    <ellipse cx="100" cy="152" rx="24" ry="6" ${shape}/>
    <g transform="translate(100 150) rotate(-16)">
      <rect x="-8" y="-58" width="16" height="58" rx="8" ${shape}/>
      <circle cx="0" cy="0" r="7" fill="#04101a" stroke="${HOLO}" stroke-width="2"/>
      <g transform="translate(0 -58) rotate(72)">
        <g class="crew-arm">
          <rect x="-7" y="-50" width="14" height="50" rx="7" ${shape}/>
          <circle cx="0" cy="0" r="8" fill="#04101a" stroke="${HOLO}" stroke-width="2"/>
          <circle class="crew-blink" cx="0" cy="0" r="3" fill="${accent}"/>
          <g transform="translate(0 -50) rotate(-56)">
            <rect x="-14" y="-24" width="28" height="22" rx="6" ${shape}/>
            ${eyes(eyeStyle, 0, -13, 10, accent)}
            <path d="M-10 -24 L-12 -36 M10 -24 L12 -36" stroke="${HOLO}" stroke-width="4" stroke-linecap="round"/>
          </g>
        </g>
      </g>
    </g>`
};

export const crewAvatar = ({ name, robot, emblem: emblemKind = '' }, callsign, role) => {
  const rand = seededRandom(name);
  const traits = {
    accent: pick(rand, ACCENTS),
    eyeStyle: pick(rand, ['round', 'visor', 'pixel']),
    antennaStyle: pick(rand, ['straight', 'bent', 'none']),
    emblemKind
  };
  const id = `crew-${name.replace(/\W+/g, '').toLowerCase()}`;
  const draw = ROBOTS[robot] || ROBOTS.amr;

  return `
    <div class="researcher-img crew-avatar" role="img" aria-label="${name}: ARC crew ${robot} avatar">
      <svg viewBox="0 0 200 200" aria-hidden="true">
        <defs>
          <pattern id="${id}-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M20 0 H0 V20" fill="none" stroke="${HOLO}" stroke-opacity="0.08"/>
          </pattern>
          <radialGradient id="${id}-glow"><stop offset="0" stop-color="${HOLO}" stop-opacity="0.22"/><stop offset="1" stop-color="${HOLO}" stop-opacity="0"/></radialGradient>
          <linearGradient id="${id}-scan" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="${HOLO}" stop-opacity="0"/><stop offset="0.85" stop-color="${HOLO}" stop-opacity="0.35"/><stop offset="1" stop-color="${HOLO}" stop-opacity="0.9"/>
          </linearGradient>
          <filter id="${id}-bloom" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        <rect width="200" height="200" fill="#060d14"/>
        <rect width="200" height="200" fill="url(#${id}-grid)"/>
        <ellipse cx="100" cy="120" rx="90" ry="80" fill="url(#${id}-glow)"/>
        <path d="M14 170 H186" stroke="${HOLO}" stroke-opacity="0.35" stroke-dasharray="6 6"/>
        <g class="crew-bot" filter="url(#${id}-bloom)">${draw(traits)}</g>
        <rect class="crew-scan" x="0" y="-40" width="200" height="40" fill="url(#${id}-scan)"/>
      </svg>
      <span class="crew-callsign">${callsign}</span>
      <span class="crew-role">${role}</span>
    </div>`;
};
