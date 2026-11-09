import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

/* ------------------------------------------------------------------ */
/*  Images live in  public/images/services/solar/                      */
/* ------------------------------------------------------------------ */
const IMG = '/images/services/solar/';

/* NOTE: keep this export — the Services listing page imports it.      */
export const SERVICE = {
  id: 'solar',
  title: 'Solar panels',
  tagline: 'Power that pays back',
  icon: 'sun',
  image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=2000&q=75',
  fallback: '/images/services/solar.svg',
  summary:
    'Design, engineering, installation and maintenance of grid-connected and off-grid solar PV systems, from Hyderabad rooftops to utility-scale plants across India.',
  stat: ['900+', 'rooftop installations'],
  points: ['Grid-connected and off-grid systems', 'Net-metering and CEIG approvals', 'Design, installation and maintenance'],
  options: [
    {
      title: 'Grid-connected rooftops',
      text: 'Residential, commercial and industrial systems with net metering.',
      image: IMG + 'res-1842.jpg',
    },
    {
      title: 'Off-grid, hybrid and utility-scale',
      text: 'Storage, rural electrification and plants built at megawatt scale.',
      image: IMG + 'band-utility.jpg',
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  Content (source: Helios company profile + installations list)      */
/* ------------------------------------------------------------------ */
const STATS = [
  { to: 900, suffix: '+', label: 'Rooftop installations' },
  { to: 220, suffix: ' MW', label: 'Utility-scale projects executed' },
  { text: '2014', label: 'Leadership in solar since' },
  { text: 'Pan-India', label: 'Headquartered in Hyderabad' },
];

const PILLARS = [
  { icon: 'blueprint', title: 'Design', text: 'Right-sized layouts for your roof or land.' },
  { icon: 'bolt', title: 'Engineering', text: 'Electrical design, testing and approvals.' },
  { icon: 'wrench', title: 'Installation', text: 'Mounting, wiring and commissioning.' },
  { icon: 'shield', title: 'Maintenance', text: 'Servicing that keeps output high.' },
];

const PROCESS = [
  { icon: 'pin', title: 'Site inspection & assessment', text: 'We study your roof or land, shading, structure and power consumption.' },
  { icon: 'blueprint', title: 'Solar plant design', text: 'A right-sized plant layout and electrical design for your site.' },
  { icon: 'basket', title: 'Materials procurement', text: 'Panels, inverters and balance of system from leading manufacturers.' },
  { icon: 'doc', title: 'CEIG approvals & net meter', text: 'Statutory approvals and net-metering arrangements, handled for you.' },
  { icon: 'wrench', title: 'Installation & commissioning', text: 'Mounting, wiring, testing and commissioning by our engineers.' },
  { icon: 'shield', title: 'Operations & maintenance', text: 'Ongoing servicing to keep your plant generating at its best.' },
];

const SOLUTIONS = [
  {
    id: 'grid',
    label: 'Grid-connected',
    image: IMG + 'res-1842.jpg',
    caption: 'Residential rooftop, 18.42 kWp',
    eyebrow: 'Residential · Commercial · Industrial',
    title: 'Generate your own power. Export the rest.',
    text: 'Since the inception of net metering in India, we have been installing grid-connected systems. Today we support a market growing at a rapid pace, helping customers cut their power bill with their own rooftop.',
    segments: [
      { icon: 'home', name: 'Residential' },
      { icon: 'building', name: 'Commercial' },
      { icon: 'factory', name: 'Industrial' },
    ],
    flow: true,
  },
  {
    id: 'offgrid',
    label: 'Off-grid & hybrid',
    image: IMG + 'band-commercial.jpg',
    caption: 'Independent power, anywhere',
    eyebrow: 'For 10+ years',
    title: 'Designing, installing and servicing off-grid solutions',
    text: 'Where the grid is weak or absent, solar with storage keeps homes, pumps and security systems running.',
    lists: [
      { heading: 'Off-grid systems', items: ['Remote homes', 'Water pumping systems', 'Security systems', 'Street lighting'] },
      { heading: 'Solar storage systems', items: ['Farm houses', 'Off-grid locations', 'Solution for power-disrupted areas', 'Avoid ToD tariffs'] },
    ],
  },
  {
    id: 'utility',
    label: 'Utility-scale',
    image: IMG + 'band-utility.jpg',
    caption: 'Ground-mounted solar plant',
    eyebrow: 'Plant construction services',
    title: 'Utility-scale plants, built and kept running',
    text: 'From engineering through commissioning and long-term operation, we support solar plants at megawatt scale.',
    lists: [{ heading: 'What we deliver', items: ['Complete engineering, testing & commissioning services', 'Operations & maintenance'] }],
  },
  {
    id: 'rural',
    label: 'Rural electrification',
    image: IMG + 'rural.jpg',
    caption: 'Off-grid solar installation',
    eyebrow: 'Energy access for communities',
    title: 'Clean, reliable power for rural communities',
    text: 'Rural electrification through solar power transforms lives by providing clean, reliable and affordable energy, addressing energy poverty, fostering economic development and promoting sustainable rural development.',
    lists: [{ heading: 'Solutions', items: ['Off-grid solutions', 'Off-grid solar home systems', 'Solar mini-grids', 'Solar water pumps', 'Solar street lights'] }],
  },
];

const GRID_BENEFITS = [
  { icon: 'sun', title: 'Generate', text: 'Your own power through solar' },
  { icon: 'building', title: 'Consume', text: 'Captive consumption on site' },
  { icon: 'bolt', title: 'Export', text: 'Surplus power through the net meter' },
  { icon: 'coin', title: 'Save', text: 'Lower power bill, every month' },
];

const PROJECTS = [
  { id: 'pune', cat: 'Industrial', title: 'Pune, Maharashtra', sub: 'Visaka Industries · V-Board factory', size: '1757', type: 'Grid-tie', structure: 'Aluminium rail', gen: '25,65,220', year: '2022', image: 'ind-pune.jpg' },
  { id: 'sambalpur', cat: 'Industrial', title: 'Sambalpur, Odisha', sub: 'Visaka Industries · AC sheets factory', size: '822', type: 'Grid-tie', structure: 'Aluminium rail', gen: '12,30,123', year: '2023', image: 'ind-sambalpur.jpg' },
  { id: 'jhajjar', cat: 'Industrial', title: 'Jhajjar, Haryana', sub: 'Industrial solar roof', size: '596', type: 'Grid-tie solar roof', structure: 'MS (mild steel)', gen: '8,91,914', year: '2019', image: 'ind-jhajjar.jpg' },
  { id: 'telangana', cat: 'Industrial', title: 'Telangana', sub: 'Industrial solar roof', size: '410', type: 'Grid-tie solar roof', structure: 'PEB in MS', gen: '6,13,565', year: '2020', image: 'ind-telangana.jpg' },
  { id: 'c300', cat: 'Commercial', title: 'Sloped-roof factory', sub: 'Commercial rooftop', size: '300', type: 'Grid-tie', structure: 'Aluminium rails on sloped roof', gen: '4,48,950', year: '2014', image: 'com-300.jpg' },
  { id: 'c60', cat: 'Commercial', title: 'Office building', sub: 'Commercial rooftop', size: '60', type: 'Grid-tie', structure: 'Galvanized iron on RCC roof', gen: '89,790', year: '2016', image: 'com-60.jpg' },
  { id: 'c32', cat: 'Commercial', title: 'Showroom & offices', sub: 'Commercial rooftop', size: '32', type: 'Grid-tie', structure: 'Galvanized iron on RCC roof', gen: '47,888', year: '2016', image: 'com-32.jpg' },
  { id: 'r1842', cat: 'Residential', title: 'Luxury residence', sub: 'Residential rooftop', size: '18.42', type: 'Grid-tie', structure: 'Galvanized iron on RCC roof', gen: '27,565', year: '2014', image: 'res-1842.jpg' },
  { id: 'r25', cat: 'Residential', title: 'Independent house', sub: 'Residential rooftop', size: '25', type: 'Grid-tie', structure: 'Galvanized iron on RCC roof', gen: '37,412', year: '2018', image: 'res-25b.jpg' },
  { id: 'r938', cat: 'Residential', title: 'Urban home', sub: 'Residential rooftop', size: '9.38', type: 'Grid-tie', structure: 'Galvanized iron on RCC roof', gen: '14,037', year: '2015', image: 'res-938.jpg' },
  { id: 'r536', cat: 'Residential', title: 'Villa', sub: 'Residential rooftop', size: '5.36', type: 'Grid-tie', structure: 'Galvanized iron on RCC roof', gen: '8,021', year: '2017', image: 'res-536.jpg' },
];
const CATS = ['Industrial', 'Commercial', 'Residential'];

const UTILITY = [
  ['Greenko Captive Plant', 'Panyam, Andhra Pradesh', '3 MW', 'Installation & commissioning', '2023'],
  ['Haridwar Infrastructure', 'Bobbili, Andhra Pradesh', '6 MW', 'Installation & commissioning', '2019'],
  ['Zuka Power', 'Chintapalli, Telangana', '30 MW', 'Installation & commissioning', '2018'],
  ['Bheem & Aditi Solar', 'Pavagada, Karnataka', '90 MW', 'Rectification works', '2018'],
  ['Kurnool Ultra Mega Solar Park', 'Kurnool, Andhra Pradesh', '90 MW', 'Installation & commissioning', '2017'],
];

const TOP = [
  ['Greenko AP01 IREP · ground-mount captive plant, Kurnool', 3000],
  ['Power Media · Virchow Biotech, 3 sites', 1896],
  ['Visaka Industries · V-Board factory, Pune', 1757],
  ['Ven Energy & Cyto Biologicals · Sultanpur', 1300],
  ['My Home Group · Ankura, Tellapur (180+ villas)', 1100],
  ['Kamineni Educational Society · Narketpally', 911],
  ['Tibrewala Electronics · Hardware Park, Maheshwaram', 826],
  ['Ecovav Industries · Visaka AC sheets factory, Sambalpur', 822],
  ['Sri Kiran Technologies · Hardware Park, Maheshwaram', 712],
];

/* [project, details, capacity] */
const RES_LIST = [
  ['Alekhya Homes', 'Rise Experience Center, Nanakramguda (62 kW) · Shreya Collective, Moinabad (27 kW) · ASR Crest, Madhapur (32 kW) · Alekhya Pranava, Madhapur (18 kW) · Alekhya Palm Woods, Kondapur (25 kW)', '163 kW'],
  ['Hallmark County', 'Hallmark County Club House', '15 kW'],
  ['My Home Group', 'Nearly 180+ villas, 6–8 kW each, at My Home Ankura, Tellapur', '≈1,100 kW'],
  ['Muppa Projects', 'Nearly 8 villas, 6–8 kW each, at Muppa Indraprasta, Osman Nagar', '≈60 kW'],
  ['Muppa Projects', 'Muppa Indraprasta Club House', '50 kW'],
  ['Magna Homes', '25 villas, 6–8 kW each, at Magna Megistic Medows, Osman Nagar', '≈150 kW'],
  ["Bhavya's Sri Surya", 'Residential apartment, Nizampet', '20 kW'],
  ['DSR Builders & Developers', 'Residential home, Jubilee Hills', '14 kW'],
  ['VR Residency', 'Residential apartment, Prasanthi Nagar, Kukatpally', '19 kW'],
  ['Jewel by Prekon Constructions', 'Residential apartment, Ameenpur', '30 kW'],
  ['NCB Towers', 'Residential apartment, Banjara Hills', '14 kW'],
  ['Mahalakshmi Towers', 'Residential apartment, Nizampet', '24 kW'],
  ['Dandoo Classic Tower', 'Residential apartment, Bhoiguda', '20 kW'],
  ['Babukhan Properties', 'Residential apartment, Aneesh Towers, Bhoiguda', '20 kW'],
  ['Jyothigiri Mansion', 'Residential apartment, Masab Tank', '6 kW'],
  ['Pragati Green Avenue Pvt Ltd', '8 villas, 10–12 kW each, at Pragati Wooden Villas, Moinabad', '90 kW'],
  ['Sri Sai Arcade', 'Residential apartment, Madhapur', '36 kW'],
  ['DSR Classe', 'Residential apartment, Nanakramguda', '35 kW'],
  ['Canduer Developers Builders', 'Candeur 40, residential apartment, Miyapur', '45 kW'],
  ['NCL Homes', '20 villas, 12.5 kW each, at NCL Pranahita, Kompally', '250 kW'],
  ['Sowbhagaya Heights Flat Owners Welfare', 'Residential apartment, Vijayawada', '30 kW'],
  ['Santa Sriram · Satellite Township', 'Residential apartment (Blocks E & F), Jeedimetla', '70 kW'],
  ['Alpha Heights Members Association', 'Residential apartment, Ameenpur', '35 kW'],
  ['Canduer Developers Builders', 'Candeur Twins, residential apartment, Miyapur', '40 kW'],
];

const CI_LIST = [
  ['Kamineni Educational Society', '401 kW for Kamineni Hospital buildings · 510 kW for Kamineni Educational buildings, Narketpally', '911 kW'],
  ['Esennar Fabtech Private Limited', 'Chinnakanjerla plant', '240 kW'],
  ['Power Media Pvt Ltd', 'Virchow Biotech: Gagillapur (560 kW) · Sultanpur (786 kW) · Kazipally (550 kW)', '1,896 kW'],
  ['Tibrewala Electronics Ltd', 'Hardware Park, Maheshwaram', '826 kW'],
  ['LNB Realty Pvt Ltd', 'Corporate office building, HUDA Techno Enclave, Madhapur', '56 kW'],
  ['Greenko AP01 IREP Pvt Ltd', 'Ground-mount captive solar plant at Pinnapuram, Kurnool', '3 MW'],
  ['Brahma Kumaris Educational Society', 'Educational society building, Banjara Hills local centre', '35 kW'],
  ['Sanjeevini Wellness Institute of Naturopathy & Yoga', 'Wellness centre at Moinabad', '40 kW'],
  ['Visaka', 'Visaka Industries Ltd, V-Board factory, Pune', '1,757 kW'],
  ['Ecovav Industries Pvt Ltd', 'Visaka Industries Ltd, AC sheets factory, Sambalpur', '822 kW'],
  ['Greenko Foundation', 'Indian Red Cross Society, Machilipatnam', '21 kW'],
  ['Manaksia Coated Metals & Industries Ltd', 'Road No 12, Banjara Hills', '30 kW'],
  ['Tejha Power Controls Pvt Ltd', 'Charlapally railway station', '60 kW'],
  ['Tejha Power Controls Pvt Ltd', 'Railway stations: Bonakal (30 kW) · Chintakani (20 kW) · Yerrupalam (10 kW) · Panyam (20 kW)', '100 kW'],
  ['Vnext Solutions Pvt Ltd', 'Kadali Siri Hospital, Gulbarga', '65 kW'],
  ['GTN Industries', 'Corporate office building, Punjjaguta', '55 kW'],
  ['Sugna Metals', 'Corporate office building, Banjara Hills', '20 kW'],
  ['Sowbhagya Multi Speciality Dental Clinic', 'Vuyyuru, Krishna district, Andhra Pradesh', '15 kW'],
  ['Ven Energy & Cyto Biologicals', 'Promea Therapeutics, Sultanpur', '1,300 kW'],
  ['Sri Kiran Technologies', 'Hardware Park, Maheshwaram', '712 kW'],
  ['Diaamond Granites', 'Hosur plant', '326 kW'],
  ['GM Hygiene Pvt Ltd', 'Ibrahimpatnam plant', '240 kW'],
  ['Resolute Star Pvt Ltd', 'Maheswaram', '500 kW · ongoing'],
  ['Oil Country Tubular Limited', 'Nalgonda district', '500 kW · ongoing'],
];

const VALUES = [
  'Provide innovative yet practical solutions',
  'Conduct our business with honesty and transparency',
  'Deliver high standards in products and services',
  'Empower customers with knowledge and reliable solutions',
];

const LEADERS = [
  {
    name: 'Madhu Babu',
    role: 'Co-Founder & Head of Operations',
    photo: IMG + 'lead-madhu.jpg',
    bio: 'MBA from Andhra University with 22 years of expertise in project planning, process design, implementation and control. Previously with Emerson Network Power, the Tata group, Microsoft and Sify Technologies.',
  },
  {
    name: 'Dilip Muvva',
    role: 'Co-Founder & Head of Business Development',
    photo: IMG + 'lead-dilip.jpg',
    bio: 'Post-graduate in Statistics and Business Management from Allahabad University, with 23+ years across business development, brand management and distribution. Previously with Hatsun Agro, Hindustan Unilever and Vodafone.',
  },
];

const CONTACT = {
  name: 'Helios Services',
  address: '#37, UBI Colony, Road No. 3, Banjara Hills, Hyderabad, Telangana – 500034',
  phone: '+91 93973 82189',
  phoneHref: 'tel:+919397382189',
  web: 'www.heliosenergy.in',
  webHref: 'https://www.heliosenergy.in',
  email: 'madhu@thehelios.in',
};

/* ------------------------------------------------------------------ */
/*  Styles                                                             */
/* ------------------------------------------------------------------ */
const CSS = `
.solar-page{--sun:#f6a723;--ember:#ee6a2c;--ink:var(--navy,#21456f);--mute:var(--muted,#5d6b7c);--night:var(--deep,#0f2238);--line:rgba(33,69,111,.14);--ease:cubic-bezier(.2,.7,.2,1);padding-top:clamp(24px,3vw,40px);overflow-x:clip}
.solar-page *{box-sizing:border-box}
.solar-page img{display:block;max-width:100%}
.solar-page .back{display:inline-flex;align-items:center;gap:8px;margin-bottom:20px;color:var(--ink);font-weight:600}
.solar-page .eyebrow{margin-bottom:10px;color:var(--ember);font-size:.76rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase}
.solar-page h2{margin-bottom:12px;font-size:clamp(1.9rem,3.2vw,2.7rem);line-height:1.12}
.solar-page h3{margin-bottom:8px}
.solar-page p{color:var(--mute);line-height:1.7}
.solar-page .ico{width:1em;height:1em;flex:none;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}
.solar-page .section{display:grid;gap:34px;padding-top:clamp(64px,8vw,104px)}
.solar-page .sec-head{max-width:760px}
.solar-page .sec-head p{font-size:1.05rem}

/* reveal */
.solar-page .rv{opacity:0;transform:translateY(28px);transition:opacity .9s var(--ease) var(--d,0ms),transform .9s var(--ease) var(--d,0ms)}
.solar-page .rv.in{opacity:1;transform:none}

/* hero */
.solar-page .hero{position:relative;min-height:clamp(440px,54vw,620px);overflow:hidden;border-radius:28px;background:var(--night)}
.solar-page .hero>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;animation:s-kenburns 24s ease-in-out infinite alternate}
.solar-page .hero .shade{position:absolute;inset:0;background:linear-gradient(90deg,rgba(15,34,56,.92),rgba(15,34,56,.6) 55%,rgba(15,34,56,.1))}
.solar-page .hero::after{content:'';position:absolute;inset:0;pointer-events:none;background:linear-gradient(115deg,transparent 42%,rgba(255,255,255,.14) 50%,transparent 58%);transform:translateX(-120%);animation:s-sheen 8s ease-in-out 1.5s infinite}
.solar-page .sun{position:absolute;right:-6%;top:-16%;width:min(54vw,560px);aspect-ratio:1;pointer-events:none;z-index:1}
.solar-page .sun .rays{transform-origin:center;animation:s-spin 80s linear infinite}
.solar-page .sun .rays line{stroke:rgba(255,236,170,.9);stroke-width:1.8;stroke-linecap:round}
.solar-page .sun .halo{fill:none;stroke:rgba(255,214,107,.35);stroke-width:.8;stroke-dasharray:2 5;transform-origin:center;animation:s-spin 60s linear infinite reverse}
.solar-page .sun .glow{transform-origin:center;animation:s-pulse 5s ease-in-out infinite}
.solar-page .hero-copy{position:absolute;left:clamp(24px,6vw,72px);bottom:clamp(30px,6vw,70px);z-index:2;max-width:720px;color:#fff}
.solar-page .hero .eyebrow{color:var(--sun)}
.solar-page .hero h1{margin-bottom:14px;color:#fff;font-size:clamp(2.9rem,6.4vw,5.2rem);line-height:1.02}
.solar-page .hero h1 em{font-style:italic;background:linear-gradient(90deg,#ffd46b,var(--ember));-webkit-background-clip:text;background-clip:text;color:transparent}
.solar-page .hero-copy>p{color:rgba(255,255,255,.9);font-size:clamp(1rem,1.5vw,1.15rem)}
.solar-page .hero-tags{display:flex;flex-wrap:wrap;gap:10px;margin-top:22px}
.solar-page .hero-tags span{padding:8px 14px;border:1px solid rgba(255,255,255,.35);border-radius:999px;color:#fff;font-size:.84rem;font-weight:500;backdrop-filter:blur(6px);background:rgba(255,255,255,.08)}
.solar-page .scroll-hint{position:absolute;right:clamp(20px,4vw,48px);bottom:clamp(24px,4vw,44px);z-index:2;display:flex;flex-direction:column;align-items:center;gap:8px;color:rgba(255,255,255,.8);font-size:.7rem;letter-spacing:.2em;text-transform:uppercase}
.solar-page .scroll-hint i{width:1px;height:46px;background:linear-gradient(var(--sun),transparent);animation:s-drip 2s ease-in-out infinite}

/* stats */
.solar-page .stats{display:grid;grid-template-columns:repeat(4,1fr);margin-top:32px;border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
.solar-page .stat{padding:28px 24px;border-left:1px solid var(--line)}
.solar-page .stat:first-child{border-left:0}
.solar-page .stat strong{display:block;font-family:var(--serif);font-size:clamp(2.2rem,4vw,3.3rem);font-weight:500;line-height:1;background:linear-gradient(90deg,var(--ink),var(--ember));-webkit-background-clip:text;background-clip:text;color:transparent}
.solar-page .stat>span{display:block;margin-top:8px;color:var(--mute);font-size:.92rem}

/* about */
.solar-page .about{display:grid;grid-template-columns:1fr 1.05fr;gap:clamp(30px,6vw,84px);align-items:center}
.solar-page .about-media{position:relative;margin:0 0 0 18px}
.solar-page .about-media::before{content:'';position:absolute;inset:-18px 18px 18px -18px;border:2px solid var(--sun);border-radius:26px;opacity:.7}
.solar-page .about-media img{position:relative;width:100%;aspect-ratio:4/3.4;object-fit:cover;border-radius:24px}
.solar-page .badge{position:absolute;right:-14px;bottom:26px;display:grid;padding:16px 20px;border-radius:18px;background:linear-gradient(135deg,var(--sun),var(--ember));color:#fff;box-shadow:0 18px 40px rgba(238,106,44,.35);animation:s-float 5s ease-in-out infinite}
.solar-page .badge strong{font-family:var(--serif);font-size:2rem;font-weight:500;line-height:1}
.solar-page .badge span{font-size:.78rem;opacity:.95}
.solar-page .checks{display:grid;gap:12px;margin:18px 0 0;padding:0;list-style:none}
.solar-page .checks li{display:flex;align-items:flex-start;gap:12px;color:var(--ink);font-weight:500;line-height:1.5}
.solar-page .checks .ico{width:22px;height:22px;margin-top:1px;padding:3px;border-radius:50%;background:rgba(246,167,35,.2);color:var(--ember)}
.solar-page .pillars{display:grid;grid-template-columns:repeat(4,1fr);gap:0;margin-top:30px;border-top:1px solid var(--line)}
.solar-page .pillar{padding:18px 16px 0 0}
.solar-page .pillar .ico{width:26px;height:26px;color:var(--ember)}
.solar-page .pillar b{display:block;margin:8px 0 2px;color:var(--ink)}
.solar-page .pillar span{color:var(--mute);font-size:.86rem;line-height:1.5}

/* process */
.solar-page .steps{position:relative;display:grid;grid-template-columns:repeat(6,1fr);gap:18px;margin-top:12px}
.solar-page .steps::before{content:'';position:absolute;left:8%;right:8%;top:35px;height:2px;background:linear-gradient(90deg,var(--sun),var(--ember));transform:scaleX(0);transform-origin:left;transition:transform 1.8s var(--ease) .2s}
.solar-page .steps.in::before{transform:scaleX(1)}
.solar-page .step{position:relative;text-align:center}
.solar-page .node{position:relative;display:grid;place-items:center;width:70px;height:70px;margin:0 auto 16px;border:2px solid var(--sun);border-radius:50%;background:#fff;color:var(--ink);font-size:1.6rem;transition:background .35s,color .35s,transform .35s}
.solar-page .node::after{content:attr(data-n);position:absolute;top:-6px;right:-6px;display:grid;place-items:center;width:24px;height:24px;border-radius:50%;background:var(--ink);color:#fff;font-size:.7rem;font-weight:700}
.solar-page .step:hover .node{background:linear-gradient(135deg,var(--sun),var(--ember));color:#fff;transform:translateY(-4px) scale(1.05)}
.solar-page .step h3{font-size:1rem;line-height:1.3}
.solar-page .step p{font-size:.88rem;line-height:1.55}

/* solutions */
.solar-page .tabs{display:flex;flex-wrap:wrap;gap:4px;border-bottom:1px solid var(--line)}
.solar-page .tab{position:relative;padding:14px 20px;border:0;background:none;color:var(--mute);font:inherit;font-weight:600;cursor:pointer;transition:color .25s}
.solar-page .tab::after{content:'';position:absolute;left:12px;right:12px;bottom:-1px;height:3px;border-radius:3px;background:linear-gradient(90deg,var(--sun),var(--ember));transform:scaleX(0);transition:transform .35s var(--ease)}
.solar-page .tab:hover{color:var(--ink)}
.solar-page .tab[aria-selected=true]{color:var(--ink)}
.solar-page .tab[aria-selected=true]::after{transform:scaleX(1)}
.solar-page .panel{display:grid;grid-template-columns:1fr 1.05fr;gap:clamp(26px,5vw,64px);align-items:center;padding-top:36px;animation:s-fadeup .7s var(--ease)}
.solar-page .panel-media{position:relative;overflow:hidden;border-radius:24px;aspect-ratio:4/3.3;background:var(--night)}
.solar-page .panel-media img{width:100%;height:100%;object-fit:cover;animation:s-zoom 1.6s var(--ease)}
.solar-page .panel-media figcaption{position:absolute;left:16px;bottom:16px;padding:8px 14px;border-radius:999px;background:rgba(15,34,56,.72);color:#fff;font-size:.82rem;backdrop-filter:blur(6px)}
.solar-page .segs{display:flex;flex-wrap:wrap;gap:10px;margin:18px 0 0}
.solar-page .seg{display:inline-flex;align-items:center;gap:8px;padding:9px 16px;border-radius:999px;background:rgba(33,69,111,.08);color:var(--ink);font-weight:600;font-size:.92rem}
.solar-page .seg .ico{color:var(--ember)}
.solar-page .lists{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:22px 30px;margin-top:20px}
.solar-page .lists h4{margin:0 0 4px;color:var(--ink);font-size:.8rem;letter-spacing:.14em;text-transform:uppercase}
.solar-page .flow{display:flex;align-items:flex-start;margin-top:26px}
.solar-page .flow-node{flex:1;min-width:0;text-align:center}
.solar-page .flow-ico{display:grid;place-items:center;width:54px;height:54px;margin:0 auto 8px;border-radius:50%;background:rgba(246,167,35,.18);color:var(--ink);font-size:1.5rem;animation:s-glow 3.2s ease-in-out infinite;animation-delay:var(--d,0s)}
.solar-page .flow-node b{display:block;color:var(--ink);font-size:.95rem}
.solar-page .flow-node span{display:block;color:var(--mute);font-size:.8rem;line-height:1.4}
.solar-page .flow-line{flex:0 0 clamp(18px,3vw,40px);height:2px;margin-top:26px;background:repeating-linear-gradient(90deg,var(--ember) 0 6px,transparent 6px 12px);background-size:24px 2px;animation:s-dash 1s linear infinite}

/* showcase */
.solar-page .filters{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:28px}
.solar-page .chip{padding:10px 20px;border:1px solid var(--line);border-radius:999px;background:transparent;color:var(--ink);font:inherit;font-weight:600;cursor:pointer;transition:all .3s}
.solar-page .chip:hover{border-color:var(--ember)}
.solar-page .chip[aria-pressed=true]{border-color:transparent;background:linear-gradient(135deg,var(--sun),var(--ember));color:#fff;box-shadow:0 10px 24px rgba(238,106,44,.28)}
.solar-page .showcase{display:grid;grid-template-columns:minmax(240px,.55fr) 1.6fr;gap:clamp(22px,4vw,48px);align-items:start}
.solar-page .sc-list{display:grid;gap:4px;margin:0;padding:0;list-style:none}
.solar-page .sc-item{display:flex;width:100%;align-items:center;justify-content:space-between;gap:12px;padding:16px 18px;border:0;border-radius:14px;background:transparent;color:var(--ink);font:inherit;text-align:left;cursor:pointer;box-shadow:inset 3px 0 0 transparent;transition:background .3s,box-shadow .3s}
.solar-page .sc-item:hover{background:rgba(33,69,111,.05)}
.solar-page .sc-item[aria-current=true]{background:rgba(246,167,35,.14);box-shadow:inset 3px 0 0 var(--ember)}
.solar-page .sc-item b{display:block;font-size:.98rem}
.solar-page .sc-item small{display:block;margin-top:2px;color:var(--mute);font-size:.8rem}
.solar-page .sc-item em{flex:none;font-family:var(--serif);font-size:1.35rem;font-style:normal;color:var(--ember)}
.solar-page .sc-view{display:grid;gap:26px;animation:s-fadeup .6s var(--ease)}
.solar-page .sc-photo{position:relative;overflow:hidden;border-radius:24px;aspect-ratio:16/9;background:var(--night)}
.solar-page .sc-photo img{width:100%;height:100%;object-fit:cover;animation:s-zoom 1.4s var(--ease)}
.solar-page .sc-tag{position:absolute;left:16px;top:16px;padding:7px 14px;border-radius:999px;background:linear-gradient(135deg,var(--sun),var(--ember));color:#fff;font-size:.78rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase}
.solar-page .sc-big{display:flex;flex-wrap:wrap;gap:12px 48px}
.solar-page .sc-big strong{display:block;font-family:var(--serif);font-size:clamp(2.2rem,4.6vw,3.4rem);font-weight:500;line-height:1;color:var(--ink)}
.solar-page .sc-big strong small{margin-left:6px;font-size:.45em;color:var(--ember);font-family:inherit}
.solar-page .sc-big span{display:block;margin-top:6px;color:var(--mute);font-size:.85rem}
.solar-page .specs{display:grid;margin:0}
.solar-page .specs div{display:grid;grid-template-columns:minmax(120px,190px) 1fr;gap:16px;padding:13px 0;border-bottom:1px solid var(--line)}
.solar-page .specs dt{color:var(--mute);font-size:.9rem}
.solar-page .specs dd{margin:0;color:var(--ink);font-weight:600}

/* utility band */
.solar-page .band{position:relative;overflow:hidden;margin-top:clamp(64px,8vw,104px);border-radius:28px;background:var(--night);color:#fff}
.solar-page .band>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.55}
.solar-page .band::before{content:'';position:absolute;inset:0;z-index:1;background:linear-gradient(100deg,rgba(15,34,56,.95),rgba(15,34,56,.78) 55%,rgba(15,34,56,.55))}
.solar-page .band-in{position:relative;z-index:2;display:grid;grid-template-columns:.8fr 1.4fr;gap:clamp(26px,5vw,64px);padding:clamp(28px,5vw,64px)}
.solar-page .band h2{color:#fff}
.solar-page .band p{color:rgba(255,255,255,.82)}
.solar-page .band .eyebrow{color:var(--sun)}
.solar-page .band .checks li{color:#fff}
.solar-page .band .checks .ico{background:rgba(246,167,35,.25);color:#ffd46b}
.solar-page .tbl-wrap{overflow-x:auto}
.solar-page table{width:100%;min-width:560px;border-collapse:collapse}
.solar-page th{padding:0 14px 12px 0;color:var(--sun);font-size:.72rem;letter-spacing:.14em;text-align:left;text-transform:uppercase;white-space:nowrap}
.solar-page td{padding:16px 14px 16px 0;border-top:1px solid rgba(255,255,255,.18);color:#fff;vertical-align:top}
.solar-page td:first-child{font-weight:600}
.solar-page td small{display:block;color:rgba(255,255,255,.7);font-size:.82rem}
.solar-page td.mw{font-family:var(--serif);font-size:1.5rem;color:#ffd46b;white-space:nowrap}
.solar-page tbody tr{opacity:0;transform:translateX(18px);transition:opacity .7s var(--ease),transform .7s var(--ease)}
.solar-page .tbl-wrap.in tbody tr{opacity:1;transform:none}
.solar-page .tbl-wrap.in tbody tr:nth-child(1){transition-delay:.1s}.solar-page .tbl-wrap.in tbody tr:nth-child(2){transition-delay:.25s}.solar-page .tbl-wrap.in tbody tr:nth-child(3){transition-delay:.4s}.solar-page .tbl-wrap.in tbody tr:nth-child(4){transition-delay:.55s}.solar-page .tbl-wrap.in tbody tr:nth-child(5){transition-delay:.7s}

/* bars */
.solar-page .bars{display:grid;gap:14px}
.solar-page .bar{display:grid;grid-template-columns:minmax(180px,.9fr) 2fr 84px;align-items:center;gap:18px}
.solar-page .bar>span{color:var(--ink);font-size:.92rem;line-height:1.35}
.solar-page .track{height:14px;border-radius:99px;background:rgba(33,69,111,.08);overflow:hidden}
.solar-page .fill{display:block;height:100%;width:0;border-radius:99px;background:linear-gradient(90deg,var(--sun),var(--ember));transition:width 1.6s var(--ease) var(--d,0ms)}
.solar-page .bars.in .fill{width:var(--w)}
.solar-page .bar b{font-family:var(--serif);font-size:1.25rem;font-weight:500;color:var(--ink);text-align:right}
.solar-page .bar b small{font-size:.65em;color:var(--mute);font-family:inherit}
.solar-page .more{align-self:start;justify-self:start;display:inline-flex;align-items:center;gap:10px;padding:13px 24px;border:1.5px solid var(--ink);border-radius:999px;background:transparent;color:var(--ink);font:inherit;font-weight:600;cursor:pointer;transition:all .3s}
.solar-page .more:hover{background:var(--ink);color:#fff}
.solar-page .more .ico{transition:transform .3s}
.solar-page .more[aria-expanded=true] .ico{transform:rotate(90deg)}
.solar-page .plist{animation:s-fadeup .6s var(--ease)}
.solar-page .plist .row{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1.7fr) 130px;gap:18px;padding:14px 0;border-bottom:1px solid var(--line);align-items:baseline}
.solar-page .plist .row b{color:var(--ink)}
.solar-page .plist .row span{color:var(--mute);font-size:.92rem;line-height:1.5}
.solar-page .plist .row em{color:var(--ember);font-family:var(--serif);font-size:1.15rem;font-style:normal;text-align:right}
.solar-page .plist .row.head{padding:0 0 10px;border-bottom:2px solid var(--ink);color:var(--ink);font-size:.72rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase}
.solar-page .plist .row.head *{font:inherit;color:inherit}

/* partners */
.solar-page .partners{display:grid;grid-template-columns:1fr 1fr;gap:0;border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
.solar-page .partner{display:grid;gap:14px;padding:clamp(24px,4vw,44px)}
.solar-page .partner+.partner{border-left:1px solid var(--line)}
.solar-page .logo-box{display:grid;place-items:center;height:110px;border-radius:18px;background:#fff;box-shadow:var(--shadow)}
.solar-page .logo-box img{max-height:70px;width:auto;mix-blend-mode:multiply;transition:transform .5s var(--ease)}
.solar-page .partner:hover .logo-box img{transform:scale(1.06)}
.solar-page .partner h3{margin:6px 0 0;color:var(--ink)}
.solar-page .partner p{margin:0}
.solar-page .note{margin-top:4px;color:var(--ink);font-weight:500}

/* values */
.solar-page .vm{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(24px,4vw,56px)}
.solar-page .vm-item{position:relative;padding-top:26px;border-top:2px solid var(--ink)}
.solar-page .vm-item::before{content:'';position:absolute;left:0;top:-2px;width:0;height:2px;background:linear-gradient(90deg,var(--sun),var(--ember));transition:width 1.2s var(--ease) .3s}
.solar-page .vm-item.in::before{width:100%}
.solar-page .vm-item .num{display:block;margin-bottom:10px;font-family:var(--serif);font-size:2.6rem;line-height:1;color:var(--ember)}
.solar-page .vm-item h3{font-size:1.4rem}
.solar-page .vm-item p{margin:0;font-size:1rem}
.solar-page .vm-item .checks{margin-top:0;gap:10px;font-size:.96rem}

/* clientele */
.solar-page .clients{padding:clamp(14px,3vw,30px);border-radius:24px;background:#fff;box-shadow:var(--shadow)}
.solar-page .clients img{width:100%;height:auto}
.solar-page .clients{overflow-x:auto}
@media(max-width:640px){.solar-page .clients img{min-width:620px}}

/* leadership */
.solar-page .leaders{display:grid;grid-template-columns:1fr 1fr;gap:clamp(24px,5vw,72px)}
.solar-page .leader{display:grid;grid-template-columns:132px 1fr;gap:24px;align-items:start}
.solar-page .avatar{position:relative;width:132px;height:132px;border-radius:50%;padding:5px;background:conic-gradient(from 0deg,var(--sun),var(--ember),var(--sun));animation:s-spin 14s linear infinite}
.solar-page .avatar img{width:100%;height:100%;border-radius:50%;object-fit:cover;border:4px solid #fff;animation:s-spin 14s linear infinite reverse}
.solar-page .leader h3{margin:0;font-size:1.5rem;color:var(--ink)}
.solar-page .leader .role{margin:2px 0 10px;color:var(--ember);font-weight:600;font-size:.92rem}
.solar-page .leader p:last-child{margin:0;font-size:.95rem}

/* contact */
.solar-page .contact{position:relative;overflow:hidden;margin-top:clamp(64px,8vw,104px);border-radius:28px;background:var(--night);color:#fff}
.solar-page .contact>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.4}
.solar-page .contact::before{content:'';position:absolute;inset:0;z-index:1;background:linear-gradient(110deg,rgba(15,34,56,.96),rgba(15,34,56,.8))}
.solar-page .contact .sun{right:-22%;top:-70%;width:min(60vw,620px);opacity:.45}
.solar-page .contact-in{position:relative;z-index:2;display:grid;grid-template-columns:1.1fr 1fr;gap:clamp(26px,5vw,64px);padding:clamp(28px,5vw,64px);align-items:center}
.solar-page .contact h2{color:#fff}
.solar-page .contact p{color:rgba(255,255,255,.84)}
.solar-page .contact .eyebrow{color:var(--sun)}
.solar-page .cta-row{display:flex;flex-wrap:wrap;gap:12px;margin-top:22px}
.solar-page .cta{display:inline-flex;align-items:center;gap:10px;padding:15px 28px;border-radius:999px;background:linear-gradient(135deg,var(--sun),var(--ember));color:#fff;font-weight:700;box-shadow:0 14px 32px rgba(238,106,44,.4);transition:transform .3s var(--ease),box-shadow .3s}
.solar-page .cta:hover{transform:translateY(-3px);box-shadow:0 20px 40px rgba(238,106,44,.5)}
.solar-page .cta.ghost{background:transparent;border:1.5px solid rgba(255,255,255,.5);box-shadow:none}
.solar-page .cta.ghost:hover{background:rgba(255,255,255,.1)}
.solar-page .reach{display:grid;gap:18px;margin:0;padding:0;list-style:none}
.solar-page .reach li{display:flex;gap:14px;align-items:flex-start;color:#fff;line-height:1.5}
.solar-page .reach .ico{width:38px;height:38px;padding:9px;border-radius:50%;background:rgba(255,255,255,.12);color:#ffd46b}
.solar-page .reach small{display:block;color:rgba(255,255,255,.65);font-size:.76rem;letter-spacing:.12em;text-transform:uppercase}
.solar-page .reach a{color:#fff;text-decoration:underline;text-decoration-color:rgba(255,255,255,.4);text-underline-offset:3px}

@keyframes s-kenburns{from{transform:scale(1)}to{transform:scale(1.09) translate(-1.5%,1%)}}
@keyframes s-sheen{0%,60%{transform:translateX(-120%)}100%{transform:translateX(120%)}}
@keyframes s-spin{to{transform:rotate(360deg)}}
@keyframes s-pulse{0%,100%{transform:scale(.94);opacity:.8}50%{transform:scale(1.06);opacity:1}}
@keyframes s-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-9px)}}
@keyframes s-drip{0%{transform:scaleY(0);transform-origin:top}50%{transform:scaleY(1);transform-origin:top}51%{transform-origin:bottom}100%{transform:scaleY(0);transform-origin:bottom}}
@keyframes s-fadeup{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
@keyframes s-zoom{from{transform:scale(1.12)}to{transform:scale(1)}}
@keyframes s-dash{to{background-position:24px 0}}
@keyframes s-glow{0%,100%{box-shadow:0 0 0 0 rgba(246,167,35,.45)}50%{box-shadow:0 0 0 12px rgba(246,167,35,0)}}

@media(max-width:1100px){
  .solar-page .steps{grid-template-columns:repeat(3,1fr);row-gap:34px}
  .solar-page .steps::before{display:none}
  .solar-page .band-in{grid-template-columns:1fr}
  .solar-page .showcase{grid-template-columns:1fr}
  .solar-page .sc-list{display:flex;gap:8px;overflow-x:auto;padding-bottom:6px}
  .solar-page .sc-item{min-width:210px}
}
@media(max-width:860px){
  .solar-page .about,.solar-page .panel,.solar-page .contact-in,.solar-page .leaders,.solar-page .vm,.solar-page .partners{grid-template-columns:1fr}
  .solar-page .partner+.partner{border-left:0;border-top:1px solid var(--line)}
  .solar-page .stats{grid-template-columns:1fr 1fr}
  .solar-page .stat:nth-child(3){border-left:0}
  .solar-page .stat:nth-child(n+3){border-top:1px solid var(--line)}
  .solar-page .pillars{grid-template-columns:1fr 1fr}
  .solar-page .scroll-hint{display:none}
  .solar-page .bar{grid-template-columns:1fr auto;row-gap:6px}
  .solar-page .bar .track{grid-column:1/-1;order:3}
  .solar-page .plist .row{grid-template-columns:1fr auto}
  .solar-page .plist .row span{grid-column:1/-1;order:3}
  .solar-page .plist .row.head span{display:none}
}
@media(max-width:640px){
  .solar-page .steps{grid-template-columns:1fr;gap:0;padding-left:0}
  .solar-page .steps::before{display:block;left:34px;right:auto;top:30px;bottom:30px;width:2px;height:auto;transform:scaleY(0);transform-origin:top}
  .solar-page .steps.in::before{transform:scaleY(1)}
  .solar-page .step{display:grid;grid-template-columns:70px 1fr;gap:18px;padding-bottom:28px;text-align:left}
  .solar-page .node{margin:0}
  .solar-page .flow{flex-direction:column;align-items:center}
  .solar-page .flow-line{flex:0 0 28px;width:2px;height:28px;margin:6px 0;background:repeating-linear-gradient(180deg,var(--ember) 0 6px,transparent 6px 12px);background-size:2px 24px;animation:s-dash-v 1s linear infinite}
  .solar-page .leader{grid-template-columns:1fr;justify-items:start}
  .solar-page .specs div{grid-template-columns:1fr;gap:2px}
  .solar-page .tab{padding:12px 14px}
}
@keyframes s-dash-v{to{background-position:0 24px}}
@media(prefers-reduced-motion:reduce){
  .solar-page *,.solar-page *::before,.solar-page *::after{animation:none!important;transition:none!important}
  .solar-page .rv,.solar-page tbody tr{opacity:1;transform:none}
  .solar-page .steps::before{transform:none}
  .solar-page .fill{width:var(--w)}
  .solar-page .vm-item::before{width:100%}
}
`;

/* ------------------------------------------------------------------ */
/*  Small building blocks                                              */
/* ------------------------------------------------------------------ */
const PATHS = {
  sun: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z M12 2v2 M12 20v2 M2 12h2 M20 12h2 M4.9 4.9l1.4 1.4 M17.7 17.7l1.4 1.4 M4.9 19.1l1.4-1.4 M17.7 6.3l1.4-1.4',
  pin: 'M12 21s-6-5.2-6-10a6 6 0 1 1 12 0c0 4.8-6 10-6 10z M12 8.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z',
  blueprint: 'M4 20l4-1L19 8l-3-3L5 16l-1 4z M14 7l3 3',
  basket: 'M4 9h16l-1.5 9a2 2 0 0 1-2 1.7H7.5a2 2 0 0 1-2-1.7L4 9z M9 9l3-5 3 5',
  doc: 'M7 3h7l4 4v14H7z M14 3v4h4 M9.5 14l2 2 3.5-4',
  wrench: 'M14.7 6.3a4 4 0 0 0-5 5L4 17l3 3 5.7-5.7a4 4 0 0 0 5-5l-2.5 2.5-2.2-.5-.5-2.2z',
  shield: 'M12 3l7 3v5c0 5-3 8.5-7 10-4-1.5-7-5-7-10V6z M9 12l2 2 4-4',
  bolt: 'M13 2L5 14h6l-1 8 8-12h-6z',
  home: 'M3 11l9-8 9 8 M5 10v10h14V10 M10 20v-6h4v6',
  building: 'M5 21V4h9v17 M14 9h5v12 M8 8h3 M8 12h3 M8 16h3',
  factory: 'M3 21V10l6 3V10l6 3V6h4v15z M7 17h2 M12 17h2',
  coin: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M9 9.5c.5-1 1.6-1.5 3-1.5 1.7 0 2.8.8 2.8 2s-1.1 1.7-2.8 2-2.8.8-2.8 2 1.1 2 2.8 2c1.4 0 2.5-.5 3-1.5 M12 6.5v1.5 M12 16v1.5',
  check: 'M5 12.5l4.5 4.5L19 7.5',
  arrow: 'M5 12h14 M13 6l6 6-6 6',
  phone: 'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z',
  mail: 'M3 6h18v12H3z M3 7l9 7 9-7',
  globe: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M3 12h18 M12 3c3 3 3 15 0 18 M12 3c-3 3-3 15 0 18',
  plus: 'M12 5v14 M5 12h14',
};

function Icon({ name }) {
  return (
    <svg className="ico" viewBox="0 0 24 24" aria-hidden="true">
      <path d={PATHS[name]} />
    </svg>
  );
}

const reduced = () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function useInView() {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (typeof IntersectionObserver === 'undefined' || reduced()) {
      setSeen(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, seen];
}

function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const [ref, seen] = useInView();
  return (
    <Tag ref={ref} className={`rv ${seen ? 'in' : ''} ${className}`} style={{ '--d': `${delay}ms` }} {...rest}>
      {children}
    </Tag>
  );
}

/* A wrapper that only toggles the `in` class (children animate via CSS). */
function InView({ as: Tag = 'div', className = '', children, ...rest }) {
  const [ref, seen] = useInView();
  return (
    <Tag ref={ref} className={`${className} ${seen ? 'in' : ''}`} {...rest}>
      {children}
    </Tag>
  );
}

function Counter({ to, suffix = '', duration = 1700 }) {
  const [ref, seen] = useInView();
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!seen) return undefined;
    if (reduced()) {
      setValue(to);
      return undefined;
    }
    let raf;
    let start;
    const tick = (t) => {
      if (start === undefined) start = t;
      const p = Math.min((t - start) / duration, 1);
      setValue(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, to, duration]);
  return (
    <span ref={ref}>
      {value.toLocaleString('en-IN')}
      {suffix}
    </span>
  );
}

function ServiceImage({ src, fallback, alt, eager = false }) {
  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      referrerPolicy="no-referrer"
      onError={(event) => {
        const image = event.currentTarget;
        if (fallback && !image.dataset.fallback) {
          image.dataset.fallback = 'true';
          image.src = fallback;
        } else {
          image.style.display = 'none';
        }
      }}
    />
  );
}

function SunArt({ className = 'sun' }) {
  return (
    <svg className={className} viewBox="-100 -100 200 200" aria-hidden="true">
      <defs>
        <radialGradient id="solar-sun-glow">
          <stop offset="0" stopColor="#ffd46b" stopOpacity=".85" />
          <stop offset=".5" stopColor="#f6a723" stopOpacity=".22" />
          <stop offset="1" stopColor="#f6a723" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="solar-sun-core" cx=".4" cy=".35" r=".8">
          <stop offset="0" stopColor="#fff6cf" />
          <stop offset=".55" stopColor="#ffc94d" />
          <stop offset="1" stopColor="#f08a24" />
        </radialGradient>
      </defs>
      <circle r="98" fill="url(#solar-sun-glow)" className="glow" />
      <circle r="90" className="halo" />
      <g className="rays">
        {Array.from({ length: 24 }, (_, i) => (
          <line key={i} x1="0" y1="-48" x2="0" y2={i % 2 ? -62 : -78} transform={`rotate(${i * 15})`} />
        ))}
      </g>
      <circle r="28" fill="url(#solar-sun-core)" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Sections                                                           */
/* ------------------------------------------------------------------ */
function Solutions() {
  const [active, setActive] = useState(SOLUTIONS[0].id);
  const item = SOLUTIONS.find((s) => s.id === active);
  return (
    <>
      <div className="tabs" role="tablist" aria-label="Solar solutions">
        {SOLUTIONS.map((s) => (
          <button key={s.id} role="tab" id={`tab-${s.id}`} aria-selected={s.id === active} aria-controls="solar-panel" className="tab" onClick={() => setActive(s.id)}>
            {s.label}
          </button>
        ))}
      </div>
      <div className="panel" key={item.id} role="tabpanel" id="solar-panel" aria-labelledby={`tab-${item.id}`}>
        <figure className="panel-media" style={{ margin: 0 }}>
          <ServiceImage src={item.image} fallback={SERVICE.fallback} alt={item.caption} />
          <figcaption>{item.caption}</figcaption>
        </figure>
        <div>
          <p className="eyebrow">{item.eyebrow}</p>
          <h3 style={{ fontSize: 'clamp(1.5rem,2.4vw,2rem)', lineHeight: 1.2 }}>{item.title}</h3>
          <p>{item.text}</p>
          {item.segments && (
            <div className="segs">
              {item.segments.map((s) => (
                <span className="seg" key={s.name}>
                  <Icon name={s.icon} />
                  {s.name}
                </span>
              ))}
            </div>
          )}
          {item.flow && (
            <div className="flow" aria-label="How net metering works">
              {GRID_BENEFITS.map((b, i) => (
                <div key={b.title} style={{ display: 'contents' }}>
                  <div className="flow-node">
                    <div className="flow-ico" style={{ '--d': `${i * 0.5}s` }}>
                      <Icon name={b.icon} />
                    </div>
                    <b>{b.title}</b>
                    <span>{b.text}</span>
                  </div>
                  {i < GRID_BENEFITS.length - 1 && <i className="flow-line" aria-hidden="true" />}
                </div>
              ))}
            </div>
          )}
          {item.lists && (
            <div className="lists">
              {item.lists.map((l) => (
                <div key={l.heading}>
                  <h4>{l.heading}</h4>
                  <ul className="checks">
                    {l.items.map((t) => (
                      <li key={t}>
                        <Icon name="check" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function Showcase() {
  const [cat, setCat] = useState(CATS[0]);
  const list = PROJECTS.filter((p) => p.cat === cat);
  const [activeId, setActiveId] = useState(list[0].id);
  const project = PROJECTS.find((p) => p.id === activeId) || list[0];

  const pick = (c) => {
    setCat(c);
    setActiveId(PROJECTS.find((p) => p.cat === c).id);
  };

  return (
    <>
      <div className="filters" role="group" aria-label="Project type">
        {CATS.map((c) => (
          <button key={c} className="chip" aria-pressed={c === cat} onClick={() => pick(c)}>
            {c}
          </button>
        ))}
      </div>
      <div className="showcase">
        <ul className="sc-list">
          {list.map((p) => (
            <li key={p.id}>
              <button className="sc-item" aria-current={p.id === project.id} onClick={() => setActiveId(p.id)}>
                <span>
                  <b>{p.title}</b>
                  <small>{p.sub}</small>
                </span>
                <em>{p.size} kWp</em>
              </button>
            </li>
          ))}
        </ul>
        <div className="sc-view" key={project.id}>
          <div className="sc-photo">
            <ServiceImage src={IMG + project.image} fallback={SERVICE.fallback} alt={`${project.title} solar installation`} />
            <span className="sc-tag">
              {project.cat} · {project.year}
            </span>
          </div>
          <div className="sc-big">
            <div>
              <strong>
                {project.size}
                <small>kWp</small>
              </strong>
              <span>Installed capacity</span>
            </div>
            <div>
              <strong>
                {project.gen}
                <small>kWh</small>
              </strong>
              <span>Yearly generation</span>
            </div>
          </div>
          <dl className="specs">
            <div>
              <dt>Project</dt>
              <dd>
                {project.title} · {project.sub}
              </dd>
            </div>
            <div>
              <dt>System type</dt>
              <dd>{project.type}</dd>
            </div>
            <div>
              <dt>Supporting structure</dt>
              <dd>{project.structure}</dd>
            </div>
            <div>
              <dt>Installed</dt>
              <dd>{project.year}</dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
}

function ProjectList() {
  const [open, setOpen] = useState(false);
  const [which, setWhich] = useState('res');
  const rows = which === 'res' ? RES_LIST : CI_LIST;
  return (
    <>
      <button className="more" aria-expanded={open} onClick={() => setOpen(!open)}>
        <Icon name="plus" />
        {open ? 'Hide' : 'View'} the complete project list
      </button>
      {open && (
        <div className="plist">
          <div className="filters" style={{ marginBottom: 18 }} role="group" aria-label="List type">
            <button className="chip" aria-pressed={which === 'res'} onClick={() => setWhich('res')}>
              Residential ({RES_LIST.length})
            </button>
            <button className="chip" aria-pressed={which === 'ci'} onClick={() => setWhich('ci')}>
              Commercial &amp; industrial ({CI_LIST.length})
            </button>
          </div>
          <div className="row head">
            <b>Client</b>
            <span>Site details</span>
            <em>Capacity</em>
          </div>
          {rows.map(([name, detail, cap], i) => (
            <div className="row" key={`${which}-${i}`}>
              <b>{name}</b>
              <span>{detail}</span>
              <em>{cap}</em>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function Solar() {
  return (
    <section className="section container page-top solar-page">
      <style>{CSS}</style>
      <Link to="/services" className="back">
        ← All services
      </Link>

      {/* Hero */}
      <div className="hero">
        <ServiceImage src={SERVICE.image} fallback={IMG + 'about.jpg'} alt="Solar panels under a sunny sky" eager />
        <div className="shade" />
        <SunArt />
        <div className="hero-copy">
          <p className="eyebrow">{SERVICE.tagline}</p>
          <h1>
            Solar <em>panels</em>
          </h1>
          <p>{SERVICE.summary}</p>
          <div className="hero-tags">
            <span>Grid-connected</span>
            <span>Off-grid &amp; hybrid</span>
            <span>Utility-scale</span>
            <span>Rural electrification</span>
          </div>
        </div>
        <div className="scroll-hint" aria-hidden="true">
          Scroll
          <i />
        </div>
      </div>

      {/* Stats */}
      <div className="stats">
        {STATS.map((s, i) => (
          <Reveal className="stat" key={s.label} delay={i * 120}>
            <strong>{s.text ? s.text : <Counter to={s.to} suffix={s.suffix} />}</strong>
            <span>{s.label}</span>
          </Reveal>
        ))}
      </div>

      {/* About */}
      <div className="section about">
        <Reveal className="about-media">
          <ServiceImage src={IMG + 'about.jpg'} fallback={SERVICE.fallback} alt="Solar panels on a tiled rooftop" />
          <div className="badge">
            <strong>2014</strong>
            <span>Powering India since</span>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <p className="eyebrow">Delivered with our solar partner, Helios</p>
          <h2>Solar, engineered end to end</h2>
          <p>
            Helios has been an innovative solar solutions provider since 2014. Headquartered in Hyderabad, it has executed projects across India and
            distributes solar equipment from leading manufacturers, with full service support from the first site visit to long-term maintenance.
          </p>
          <ul className="checks">
            <li>
              <Icon name="check" />
              Over 900 rooftop installations delivered
            </li>
            <li>
              <Icon name="check" />
              220 MW of utility-scale projects executed
            </li>
            <li>
              <Icon name="check" />
              Authorised channel partner for Rayzon panels and Fronius inverters
            </li>
          </ul>
          <div className="pillars">
            {PILLARS.map((p) => (
              <div className="pillar" key={p.title}>
                <Icon name={p.icon} />
                <b>{p.title}</b>
                <span>{p.text}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Process */}
      <div className="section">
        <Reveal className="sec-head">
          <p className="eyebrow">How it works</p>
          <h2>Our solar process</h2>
          <p>Six clear steps take you from a site visit to a plant that generates, and keeps generating.</p>
        </Reveal>
        <InView className="steps">
          {PROCESS.map((s, i) => (
            <Reveal className="step" key={s.title} delay={i * 140}>
              <div className="node" data-n={i + 1}>
                <Icon name={s.icon} />
              </div>
              <div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </Reveal>
          ))}
        </InView>
      </div>

      {/* Solutions */}
      <div className="section">
        <Reveal className="sec-head">
          <p className="eyebrow">Explore the possibilities</p>
          <h2>Solar solutions for every need</h2>
          <p>Whether it is a villa rooftop, a factory, a remote farm or a megawatt plant, there is a system designed for it.</p>
        </Reveal>
        <Reveal>
          <Solutions />
        </Reveal>
      </div>

      {/* Showcase */}
      <div className="section">
        <Reveal className="sec-head">
          <p className="eyebrow">Systems at a glance</p>
          <h2>Real plants. Real generation.</h2>
          <p>A selection of installed systems with their capacity, structure and measured yearly generation.</p>
        </Reveal>
        <Reveal>
          <Showcase />
        </Reveal>
      </div>

      {/* Utility-scale band */}
      <div className="band">
        <ServiceImage src={IMG + 'band-utility.jpg'} fallback={SERVICE.fallback} alt="" />
        <div className="band-in">
          <Reveal>
            <p className="eyebrow">Plant construction services</p>
            <h2>Utility-scale track record</h2>
            <p>Complete engineering, testing and commissioning, backed by long-term operations and maintenance.</p>
            <ul className="checks">
              <li>
                <Icon name="check" />
                Complete engineering, testing &amp; commissioning services
              </li>
              <li>
                <Icon name="check" />
                Operations &amp; maintenance
              </li>
            </ul>
          </Reveal>
          <InView className="tbl-wrap">
            <table>
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Size</th>
                  <th>Scope</th>
                  <th>Year</th>
                </tr>
              </thead>
              <tbody>
                {UTILITY.map(([name, place, size, scope, year]) => (
                  <tr key={name}>
                    <td>
                      {name}
                      <small>{place}</small>
                    </td>
                    <td className="mw">{size}</td>
                    <td>{scope}</td>
                    <td>{year}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </InView>
        </div>
      </div>

      {/* Notable installations */}
      <div className="section">
        <Reveal className="sec-head">
          <p className="eyebrow">Recent installations</p>
          <h2>Our largest rooftop and captive projects</h2>
          <p>From gated villa communities to factories, hospitals, railway stations and captive plants.</p>
        </Reveal>
        <InView className="bars">
          {TOP.map(([label, kw], i) => (
            <div className="bar" key={label}>
              <span>{label}</span>
              <div className="track">
                <i className="fill" style={{ '--w': `${(kw / TOP[0][1]) * 100}%`, '--d': `${i * 110}ms` }} />
              </div>
              <b>
                {kw.toLocaleString('en-IN')} <small>kW</small>
              </b>
            </div>
          ))}
        </InView>
        <ProjectList />
      </div>

      {/* Partners */}
      <div className="section">
        <Reveal className="sec-head">
          <p className="eyebrow">Partnership for success</p>
          <h2>Built with trusted manufacturers</h2>
          <p>Helios is an authorised channel partner for sales and service, and we value long-term, close relations with our manufacturers.</p>
        </Reveal>
        <Reveal className="partners">
          <div className="partner">
            <div className="logo-box">
              <img src={IMG + 'logo-rayzon.png'} alt="Rayzon Solar" loading="lazy" />
            </div>
            <h3>Rayzon solar panels</h3>
            <p>One of India’s largest solar panel manufacturers.</p>
            <p className="note">Authorised channel partner for sales and service.</p>
          </div>
          <div className="partner">
            <div className="logo-box">
              <img src={IMG + 'logo-fronius.png'} alt="Fronius" loading="lazy" />
            </div>
            <h3>Fronius inverters &amp; EV chargers</h3>
            <p>Reliable inverters and electric-vehicle charging to complete your solar system.</p>
            <p className="note">Authorised channel partner for sales and service.</p>
          </div>
        </Reveal>
      </div>

      {/* Vision / mission / values */}
      <div className="section">
        <Reveal className="sec-head">
          <p className="eyebrow">What drives us</p>
          <h2>Vision, mission and values</h2>
        </Reveal>
        <div className="vm">
          <Reveal as="div" className="vm-item" delay={0}>
            <span className="num">01</span>
            <h3>Vision</h3>
            <p>To drive the transition to a sustainable future with innovative solar power solutions that reduce carbon emissions, protect our planet, and benefit communities.</p>
          </Reveal>
          <Reveal as="div" className="vm-item" delay={150}>
            <span className="num">02</span>
            <h3>Mission</h3>
            <p>To make green energy accessible to everyone, reducing our collective carbon footprint and promoting sustainable living through innovative and efficient solar power solutions.</p>
          </Reveal>
          <Reveal as="div" className="vm-item" delay={300}>
            <span className="num">03</span>
            <h3>Core values</h3>
            <ul className="checks">
              {VALUES.map((v) => (
                <li key={v}>
                  <Icon name="check" />
                  {v}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      {/* Clientele */}
      <div className="section">
        <Reveal className="sec-head">
          <p className="eyebrow">Our clientele</p>
          <h2>Trusted by developers, institutions and industry</h2>
        </Reveal>
        <Reveal className="clients">
          <img src={IMG + 'clientele.png'} alt="Logos of Helios clients including Alekhya Homes, CPWD, T-Hub, Visaka, IndianOil, Greenko and Bharat Petroleum" loading="lazy" />
        </Reveal>
      </div>

      {/* Leadership */}
      <div className="section">
        <Reveal className="sec-head">
          <p className="eyebrow">Our leadership</p>
          <h2>Experience you can rely on</h2>
        </Reveal>
        <div className="leaders">
          {LEADERS.map((l, i) => (
            <Reveal className="leader" key={l.name} delay={i * 150}>
              <div className="avatar">
                <img src={l.photo} alt={l.name} loading="lazy" />
              </div>
              <div>
                <h3>{l.name}</h3>
                <p className="role">{l.role}</p>
                <p>{l.bio}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div className="contact">
        <ServiceImage src={IMG + 'band-residential.jpg'} fallback={SERVICE.fallback} alt="" />
        <SunArt />
        <div className="contact-in">
          <Reveal>
            <p className="eyebrow">Get started</p>
            <h2>Ready to explore solar?</h2>
            <p>Talk to our team to plan a system for your home, business or community. We will take it from site assessment to commissioning.</p>
            <div className="cta-row">
              <Link to="/contact" className="cta">
                Talk to our team <Icon name="arrow" />
              </Link>
              <a href={CONTACT.phoneHref} className="cta ghost">
                <Icon name="phone" /> {CONTACT.phone}
              </a>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <ul className="reach">
              <li>
                <Icon name="pin" />
                <span>
                  <small>{CONTACT.name}</small>
                  {CONTACT.address}
                </span>
              </li>
              <li>
                <Icon name="phone" />
                <span>
                  <small>Phone</small>
                  <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
                </span>
              </li>
              <li>
                <Icon name="globe" />
                <span>
                  <small>Website</small>
                  <a href={CONTACT.webHref} target="_blank" rel="noreferrer">
                    {CONTACT.web}
                  </a>
                </span>
              </li>
              <li>
                <Icon name="mail" />
                <span>
                  <small>Email</small>
                  <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
                </span>
              </li>
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}