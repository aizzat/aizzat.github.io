/**
 * Paris Motor Show 2026 - Recap content
 * Every entry below is sourced from published coverage or the partners' own posts.
 * To add a new article or post later, append one object to the relevant array.
 */

const IMG = '/arcftkpm-resources/paris-2026-recap';

export const recapStats = [
  { value: '5', label: 'Malaysian news outlets', icon: 'fa-newspaper' },
  { value: '3', label: 'European media features', note: '🇫🇷 2 · 🇩🇪 1', icon: 'fa-earth-europe' },
  { value: '5', label: 'Partner posts on LinkedIn', icon: 'fa-linkedin', brand: true },
  { value: '5', label: 'Countries at one stand', icon: 'fa-globe' }
];

export const recapTimeline = [
  {
    date: '2019',
    title: 'Smart Campus Autonomous Vehicle',
    text: 'UMPSA and Move Robotic begin working together on the Smart Campus Autonomous Vehicle initiative.'
  },
  {
    date: '2024',
    title: 'PIX Moving joins',
    text: 'The partnership expands to include PIX Moving in joint research and development with UMPSA.'
  },
  {
    date: '13 Apr 2026',
    title: 'Strategic collaboration in Japan',
    text: 'UMPSA, Move Robotic and PIX Moving formalise their strategic collaboration on autonomous mobility in Kanagawa, Japan.'
  },
  {
    date: '12–18 Oct 2026',
    title: 'Paris Motor Show',
    text: 'The UMPSA team joins PIX Moving at Hall 7.1, Stand C01, Paris Expo Porte de Versailles.'
  },
  {
    date: '15 Oct 2026',
    title: 'MoA exchange & keynote',
    text: 'The three parties exchange a Memorandum of Agreement for the pilot deployment of RoboBus in Malaysia, witnessed by the Ambassador of Malaysia to France. UMPSA also delivers a keynote at the PIX Moving stand.',
    highlight: true
  },
  {
    date: '21 Oct 2026',
    title: 'Featured in European industry media',
    text: 'Frenus\'s Mondial de l\'Auto 2026 recap names the UMPSA, PIX Moving and Move Robotic RoboBus pilot agreement under Automated Mobility.',
    highlight: true
  }
];

export const recapRoles = [
  {
    id: 'umpsa',
    name: 'UMPSA',
    fullName: 'Universiti Malaysia Pahang Al-Sultan Abdullah',
    logo: '/partners/umpsalogo.png',
    role: 'Core research & development partner',
    points: [
      'R&D to adapt autonomous mobility algorithms to Malaysian road conditions',
      'Uses project data to understand local driving patterns and road users',
      'Builds local algorithm capability and technical know-how'
    ]
  },
  {
    id: 'move',
    name: 'Move Robotic',
    fullName: 'Move Robotic Sdn. Bhd.',
    logo: '/partners/moverobotic.webp',
    role: 'Commercialisation of Malaysian-developed research',
    points: [
      'Deploys RoboBus in real commercial environments',
      'Gathers operating experience and user needs',
      'Shares findings with Malaysian authorities to help shape smart-mobility safety rules'
    ]
  },
  {
    id: 'pix',
    name: 'PIX Moving',
    fullName: 'Pixel Intelligence Co., Ltd.',
    logo: '/partners/pixmoving.png',
    role: 'Autonomous platform architecture',
    points: [
      'Provides the autonomous vehicle platform',
      'Brings technical expertise in modular robotic vehicles',
      'Shares experience operating RoboBus fleets commercially'
    ]
  }
];

export const recapPress = [
  {
    outlet: 'Frenus',
    region: 'Germany',
    lang: 'EN',
    date: '21 Oct 2026',
    section: 'Special – Mobility',
    title: 'Mondial de l\'Auto 2026: The Shift from Vehicle Specifications to Local Execution',
    quote: 'UMPSA, PIX Moving and Move Robotic signed a Robobus pilot agreement for Malaysia',
    summary: 'Frenus\'s recap of the Mondial de l\'Auto lists the UMPSA, PIX Moving and Move Robotic RoboBus pilot agreement for Malaysia under Automated Mobility. Frenus notes that the show gave automated vehicles a dedicated place, "from PIX Moving to Hyundai with Waymo and Tesla\'s Cybercab". Muhammad Aizzat Zakaria of UMPSA is credited among the contributors to this edition.',
    url: 'https://www.frenus.com/newsletters/mondial-de-lauto-2026-the-shift-from-vehicle-specifications-to-local-execution',
    featured: true
  },
  {
    outlet: 'Bernama',
    region: 'Malaysia',
    lang: 'EN',
    date: '17 Oct 2026',
    title: 'UMPSA Partners Move Robotic, Pix Moving To Boost Smart Mobility Ecosystem',
    summary: 'Malaysia\'s national news agency reports the MoA signed at the Paris Motor Show, setting out each party\'s role and the Vice-Chancellor\'s view that the value lies in the capabilities built together.',
    url: 'https://www.bernama.com/en/general/news.php?id=2621715'
  },
  {
    outlet: 'Bernama',
    region: 'Malaysia',
    lang: 'BM',
    date: '17 Oct 2026',
    title: 'UMPSA Kerjasama Dengan Move Robotic, Pix Moving Perkukuh Ekosistem Mobiliti Pintar',
    summary: 'The Malay-language edition of Bernama\'s report on the three-party smart mobility partnership.',
    url: 'https://www.bernama.com/bm/am/news.php?id=2621688'
  },
  {
    outlet: 'Funtasticko',
    region: 'Malaysia',
    lang: 'BM',
    date: '16 Oct 2026',
    title: 'UMPSA, Move Robotic dan PIX Moving meterai kerjasama bangunkan teknologi mobiliti autonomi di Malaysia',
    summary: 'A detailed account of the MoA, including a joint data-sovereignty strategy and the link to UMPSA\'s 2026–2030 strategic plan.',
    url: 'https://www.funtasticko.net/umpsa-move-robotic-dan-pix-moving-meterai-kerjasama-bangunkan-teknologi-mobiliti-autonomi-di-malaysia/'
  },
  {
    outlet: 'Careta',
    region: 'Malaysia',
    lang: 'BM',
    date: '16 Oct 2026',
    title: 'UMPSA Bawa Projek Teknologi Autonomi di Paris Motor Show',
    summary: 'Malaysian automotive news on the RoboBus project: UMPSA\'s own DREBAR-based software and data sovereignty, ODD testing on campus before expanding to Pekan, and UMPSA\'s role as PIX Moving\'s expert partner in Malaysia.',
    url: 'https://careta.my/article/umpsa-bawa-projek-teknologi-autonomi-di-paris-motor-show'
  },
  {
    outlet: 'Amanz',
    region: 'Malaysia',
    lang: 'BM',
    date: 'Oct 2026',
    title: 'Coverage of the UMPSA, Move Robotic and PIX Moving partnership',
    summary: 'Malaysian technology news coverage of the MoA.',
    url: 'https://amanz.my/2026585251'
  },
  {
    outlet: 'WartaAI',
    region: 'Malaysia',
    lang: 'BM',
    date: 'Oct 2026',
    title: 'UMPSA, Move Robotic & PIX Moving MoA for smart mobility in Malaysia',
    summary: 'Malaysian AI and technology news coverage of the MoA.',
    url: 'https://wartaai.com/umpsa-move-robotic-pix-moving-moa-mobiliti-pintar-malaysia'
  },
  {
    outlet: 'Autonews',
    region: 'France',
    lang: 'FR',
    date: '20 Oct 2026',
    title: 'Mondial de l\'Auto 2026 : PIX Moving repense l\'architecture du véhicule autonome avec ses plateformes modulaires',
    summary: 'On PIX Moving\'s modular autonomous vehicles in Paris, naming UMPSA among its partners from Malaysia, Serbia and Germany.',
    url: 'https://www.autonews.fr/actualite/mondial-de-l-auto-2026--pix-moving-repense-l-architecture-du-vehicule-autonome-avec-ses-plateformes-modulaires-149445',
    sponsored: true
  },
  {
    outlet: 'Public',
    region: 'France',
    lang: 'FR',
    date: '20 Oct 2026',
    title: 'PIX Moving au Mondial de l\'Auto 2026 : quand la voiture devient un café, une boutique ou un espace de vie',
    summary: 'A lifestyle look at PIX Moving\'s "mobile spaces", naming UMPSA in Malaysia among its international partners.',
    url: 'https://www.public.fr/pix-moving-au-mondial-de-lauto-2026-quand-la-voiture-devient-un-cafe-une-boutique-ou-un-espace-de-vie',
    sponsored: true
  }
];

export const recapPartnerPosts = [
  {
    author: 'PIX Moving',
    title: 'Company page',
    date: '17 Oct 2026',
    quote: 'Our sincere thanks to Muhammad Aizzat Zakaria and the entire UMPSA research team for their dedication, technical expertise and commitment to advancing this partnership.',
    url: 'https://www.linkedin.com/feed/update/urn:li:ugcPost:7517167740802035712/'
  },
  {
    author: 'Alex Vasiliu',
    title: 'Managing Director Europe, PIX Moving',
    date: '17 Oct 2026',
    quote: 'Universities must be at the table when we build the future of autonomous mobility. … It will be built together.',
    url: 'https://www.linkedin.com/feed/update/urn:li:ugcPost:7517170123397427201/'
  },
  {
    author: 'Move Robotic Sdn. Bhd.',
    title: 'Company page',
    date: '19 Oct 2026',
    quote: 'A strategic milestone in Malaysia\'s autonomous mobility advancement … bringing together industry expertise, academic research and autonomous mobility technology.',
    url: 'https://www.linkedin.com/feed/update/urn:li:ugcPost:7517788407599808514/'
  },
  {
    author: 'CADA – Chemnitz Automated Driving Alliance',
    title: 'Germany',
    date: '17 Oct 2026',
    quote: 'At the PIX stand we spoke with partners from the international mobility and research landscape, including the European PIX team, Universiti Malaysia Pahang Al-Sultan Abdullah, Move Robotic, Caiitech and NIT Academy.',
    translated: 'German',
    url: 'https://www.linkedin.com/feed/update/urn:li:ugcPost:7517180788329570304/'
  },
  {
    author: 'Sydygaly Sagynbaev',
    title: 'Representing staff-eye, Germany',
    date: '19 Oct 2026',
    quote: 'Universiti Malaysia Pahang Al-Sultan Abdullah and Move Robotic Sdn. Bhd. signed an agreement for a RoboBus pilot.',
    url: 'https://www.linkedin.com/feed/update/urn:li:ugcPost:7517621585118359552/'
  }
];

export const recapGallery = [
  { group: 'stand', slug: 'paris-expo', caption: 'Paris Expo Porte de Versailles, home of the 91st Mondial de l\'Auto' },
  { group: 'stand', slug: 'stand-wide', caption: 'The PIX Moving stand, Hall 7.1 · Stand C01' },
  { group: 'stand', slug: 'stand-robobus', caption: 'RoboBus and RoboShop on display' },
  { group: 'stand', slug: 'beastie', caption: 'Visitors around the Beastie micro-vehicles' },
  { group: 'stand', slug: 'stand-crowd', caption: 'A full audience in front of the RoboBus units' },
  { group: 'moa', slug: 'moa-screen', caption: 'MoA exchange: Pilot Technology Deployment on Advanced Mobility Platform RoboBus, 15 October 2026' },
  { group: 'moa', slug: 'moa-group', caption: 'The partners after the MoA exchange' },
  { group: 'moa', slug: 'moa-pix-group', caption: 'MoA exchange at the PIX Moving stand', credit: 'PIX Moving' },
  { group: 'moa', slug: 'moa-pix-souvenir', caption: 'Exchange of souvenirs', credit: 'PIX Moving' },
  { group: 'moa', slug: 'moa-pix-model', caption: 'UMPSA × PIX RoboBus model presentation', credit: 'PIX Moving' },
  { group: 'moa', slug: 'moa-pix-audience', caption: 'Guests at the ceremony', credit: 'PIX Moving' },
  { group: 'moa', slug: 'moa-hybrid', caption: 'A hybrid ceremony: Paris linked live with UMPSA in Malaysia' },
  { group: 'moa', slug: 'moa-umpsa-malaysia', caption: 'The UMPSA team following the exchange from Malaysia' },
  { group: 'keynote', slug: 'keynote-title', caption: 'Keynote: "Autonomy in Motion: Advances and Challenges in Autonomous Robot Perception and Control"' },
  { group: 'keynote', slug: 'keynote-speaking', caption: 'Presenting UMPSA\'s autonomous robotics research' },
  { group: 'keynote', slug: 'keynote-perception', caption: 'Multi-modal perception on the PIX platform' },
  { group: 'keynote', slug: 'keynote-control', caption: 'Control: safe navigation, planning and adaptive control' },
  { group: 'network', slug: 'network-pix-team', caption: 'With the PIX Moving team' },
  { group: 'network', slug: 'network-nit', caption: 'With partners from NIT, Serbia' },
  { group: 'network', slug: 'network-cada', caption: 'The Chemnitz RoboBus from Germany' },
  { group: 'network', slug: 'network-pix-nit', caption: 'PIX Moving × NIT partnership signing' },
  { group: 'network', slug: 'network-pix-caiitech', caption: 'PIX Moving × Caiitech partnership signing' }
].map(p => ({ ...p, thumb: `${IMG}/${p.slug}-640.jpg`, full: `${IMG}/${p.slug}-1600.jpg` }));

export const recapGalleryGroups = [
  { id: 'all', label: 'All' },
  { id: 'stand', label: 'The Stand' },
  { id: 'moa', label: 'MoA Exchange' },
  { id: 'keynote', label: 'Keynote' },
  { id: 'network', label: 'Global Network' }
];

// PIX Moving brochure from the stand, one landscape page per entry (images in /brochure)
export const recapBrochure = [
  'Rewrite the City with City Robotics',
  'Introducing PIX Moving',
  'Rooted in partnership: closer to European service',
  'From autonomous technology to approved public transport',
  'Bringing autonomous mobility to Germany\'s city streets',
  'PIX RoboBus begins its first exploration in Belgium',
  'A ride through Robot City in Davos',
  'From developer training to RoboBus deployment',
  'Where city robots enter everyday life',
  'Built locally, proven on public roads',
  'From the Dubai challenge to service in Madinah',
  'EduTech future mobility labs',
  'TREEZE × PIX Moving',
  'UMPSA × PIX Moving',
  'Welcome to the future of city robotics'
].map((title, i) => {
  const base = `${IMG}/brochure/page-${String(i + 1).padStart(2, '0')}`;
  return { title, small: `${base}-900.webp`, medium: `${base}-1600.webp`, full: `${base}-2400.webp` };
});

export const BROCHURE_UMPSA_PAGE = 13;
