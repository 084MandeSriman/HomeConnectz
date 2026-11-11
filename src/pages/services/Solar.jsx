import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';

/* ------------------------------------------------------------------ */
/*  Images live in  public/images/services/solar/                      */
/* ------------------------------------------------------------------ */
const IMG = '/images/services/solar/';

/* Backup photos (used only if a local picture is missing). */
const U = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=2000&q=80`;
const STOCK = {
  field: U('photo-1509391366360-2e959784a276'),
  array: U('photo-1508514177221-188b1cf16e9d'),
  farm: U('photo-1497440001374-f26997328c1b'),
  roof: U('photo-1558449028-b53a39d100fc'),
  panels: U('photo-1559302504-64aae6ca6b6d'),
};

/* Individual client logos are embedded at the very bottom of this file, so no image files are needed. */
const CLIENTS = [
  ['Alekhya Homes', 'alekhya'], ['CPWD', 'cpwd'], ['Emmennar', 'emmennar'], ['T-Hub', 'thub'], ['Cytobiologics', 'cytobiologics'],
  ['Visaka', 'visaka'], ['TechnipFMC', 'technipfmc'], ['LivLife Hospitals', 'livlife'], ['IndianOil', 'indianoil'], ['Muppa', 'muppa'],
  ['LNB Renewable', 'lnb'], ['Greenko', 'greenko'], ['Bharat Petroleum', 'bpcl'], ['MYK Laticrete', 'myk-laticrete'], ['SRKR Engineering College', 'srkr'],
].map(([name, file]) => ({ name, file }));

/* NOTE: keep this export — the Services listing page imports it.      */
export const SERVICE = {
  id: 'solar',
  title: 'Solar panels',
  tagline: 'Power that pays back',
  icon: 'sun',
  image: '/images/services/cards/solar.jpg',
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
const LB_CSS = `
.sl-lb{position:fixed;inset:0;z-index:99999;display:grid;grid-template-rows:auto minmax(0,1fr) auto;height:100vh;height:100dvh;background:rgba(10,20,34,.96);color:#fff;animation:sl-fade .3s ease}
.sl-lb *{box-sizing:border-box}
.sl-lb-bar{display:flex;justify-content:space-between;align-items:center;padding:14px 20px;font-size:.9rem}
.sl-lb-bar div{display:flex;gap:10px}
.sl-lb-bar button{padding:8px 14px;border:1px solid rgba(255,255,255,.35);border-radius:999px;background:none;color:#fff;font:inherit;cursor:pointer}
.sl-lb-stage{display:flex;align-items:center;justify-content:center;min-height:0;overflow:hidden;padding:0 76px}
.sl-lb-stage img{display:block;width:auto;height:auto;max-width:100%;max-height:calc(100vh - 140px);max-height:calc(100dvh - 140px);object-fit:contain;border-radius:6px}
.sl-lb-stage.zoom{display:block;overflow:auto;padding:0 20px;cursor:zoom-out}
.sl-lb-stage.zoom img{max-width:none;max-height:none;width:220%;margin:0 auto}
.sl-lb-cap{margin:0;padding:12px 20px 18px;text-align:center;color:rgba(255,255,255,.85);font-size:.9rem}
.sl-lb-nav{position:absolute;top:50%;width:48px;height:48px;margin-top:-24px;border:1px solid rgba(255,255,255,.35);border-radius:50%;background:rgba(255,255,255,.08);color:#fff;font-size:1.8rem;line-height:1;cursor:pointer}
.sl-lb-nav.prev{left:14px}.sl-lb-nav.next{right:14px}
@keyframes sl-fade{from{opacity:0}to{opacity:1}}
@media (max-width:640px){.sl-lb-stage{padding:0 8px}.sl-lb-nav{top:auto;bottom:70px;margin-top:0;width:42px;height:42px}}
`;

const CSS = `
.solar-page{padding-top:0!important;padding-bottom:clamp(20px,3vw,36px)!important;--ink:var(--navy,#21456f);--mute:var(--muted,#5d6b7c);--acc:var(--gold,#b8953f);--g1:#e6cf9f;--g2:#c9a55a;--night:var(--deep,#0f2238);--line:rgba(33,69,111,.16);--ease:cubic-bezier(.2,.7,.2,1)}
.solar-page *{box-sizing:border-box}
.solar-page img{display:block;max-width:100%}
.solar-page button{font:inherit;color:inherit;cursor:pointer}
.solar-page p{color:var(--mute);line-height:1.7}
.solar-page h2{margin-bottom:12px;font-size:clamp(1.9rem,3.2vw,2.7rem);line-height:1.12}
.solar-page h2 em{color:var(--acc)}
.solar-page h3{margin-bottom:8px}
.solar-page .eyebrow{margin-bottom:10px;color:var(--acc);font-size:.76rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase}
.solar-page .ico{width:1em;height:1em;flex:none;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}
.solar-page .section{display:grid;gap:28px;margin-top:clamp(26px,3.4vw,44px);padding:clamp(26px,3.4vw,44px) 0 0;border-top:1px solid var(--line);scroll-margin-top:120px}
.solar-page .stats+.section{margin-top:0;border-top:0}
.solar-page .split{display:grid;grid-template-columns:.85fr 1.4fr;gap:clamp(26px,5vw,72px);align-items:start}
.solar-page .split>*{min-width:0}
.solar-page .sec-head{max-width:760px}
.solar-page .sec-head p{font-size:1.05rem}

/* page-level: lets the hero run edge to edge without a sideways scrollbar */
html,body{overflow-x:clip}

/* reveal */
.solar-page .rv{opacity:0;transform:translateY(28px);transition:opacity .9s var(--ease) var(--d,0ms),transform .9s var(--ease) var(--d,0ms)}
.solar-page .rv.in{opacity:1;transform:none}

/* breadcrumb */
.solar-page .crumb{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin:0 0 18px;padding-top:clamp(56px,4vw,68px);color:var(--mute);font-size:.9rem;position:relative;z-index:1}
.solar-page .crumb a,.solar-page .crumb b{color:var(--ink);font-weight:600}

/* intro: centred under the breadcrumb */
.solar-page .intro{display:flex;flex-direction:column;align-items:center;max-width:880px;margin:0 auto;padding:clamp(20px,4vw,44px) 0 clamp(30px,4vw,48px);text-align:center}
.solar-page .intro>*{animation:s-up 1s var(--ease) both}
.solar-page .intro>*:nth-child(2){animation-delay:.08s}
.solar-page .intro>*:nth-child(3){animation-delay:.16s}
.solar-page .intro>*:nth-child(4){animation-delay:.26s}
.solar-page .intro>*:nth-child(5){animation-delay:.36s}
.solar-page .intro .eyebrow{margin-bottom:12px}
.solar-page .intro h1{margin-bottom:16px;color:var(--ink);font-size:clamp(3rem,7.4vw,6rem);line-height:1.02}
.solar-page .intro h1 em{font-style:italic;color:var(--acc)}
.solar-page .lede{max-width:700px;font-size:clamp(1rem,1.5vw,1.18rem)}
.solar-page .hero-tags{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin-top:20px}
.solar-page .hero-tags span{padding:8px 14px;border:1px solid var(--line);border-radius:999px;background:rgba(255,255,255,.6);color:var(--ink);font-size:.84rem;font-weight:600}
.solar-page .actions{display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin-top:24px}
.solar-page .btn{display:inline-flex;align-items:center;gap:10px;padding:13px 22px;border:1px solid transparent;border-radius:999px;background:linear-gradient(135deg,var(--g1),var(--g2));color:#1b2b40;font-weight:700;font-size:.94rem;transition:transform .3s var(--ease),box-shadow .3s}
.solar-page .btn:hover{transform:translateY(-2px);box-shadow:0 14px 30px rgba(0,0,0,.2)}
.solar-page .btn.ghost{border-color:var(--ink);background:transparent;color:var(--ink)}

/* hero: full screen, edge to edge, one image */
.solar-page .hero{position:relative;width:100vw;margin-left:calc(50% - 50vw);height:100vh;height:100svh;min-height:520px;overflow:hidden;background:rgba(33,69,111,.12)}
.solar-page .hero>img{position:absolute;inset:0;width:100%;height:100%;max-width:none;object-fit:cover;object-position:center}

/* stats */
.solar-page .stats{display:grid;grid-template-columns:repeat(4,1fr);margin-top:34px;border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
.solar-page .stat{padding:28px 24px;border-left:1px solid var(--line)}
.solar-page .stat:first-child{border-left:0}
.solar-page .stat strong{display:block;font-family:var(--sans);font-size:clamp(2rem,3.6vw,3rem);font-weight:500;line-height:1;color:var(--ink)}
.solar-page .stat>span{display:block;margin-top:8px;color:var(--mute);font-size:.92rem}

/* image frame: the picture sits INSIDE the border, edge to edge */
.solar-page .frame{position:relative;margin:0;padding:10px;border:1.5px solid rgba(184,149,63,.6);border-radius:30px;background:rgba(255,255,255,.55)}
.solar-page .frame>button{position:relative;display:block;width:100%;padding:0;border:0;background:var(--night);border-radius:20px;overflow:hidden;cursor:zoom-in}
.solar-page .frame img{display:block;width:100%;aspect-ratio:var(--ar,4/3);object-fit:cover;border-radius:20px}
.solar-page .hint{position:absolute;top:14px;right:14px;padding:6px 12px;border-radius:999px;background:rgba(15,34,56,.72);color:#fff;font-size:.74rem;font-weight:600;opacity:0;transition:opacity .3s;pointer-events:none}
.solar-page .frame>button:hover .hint,.solar-page .frame>button:focus-visible .hint{opacity:1}
.solar-page .tag{position:absolute;left:14px;top:14px;padding:7px 14px;border-radius:999px;background:linear-gradient(135deg,var(--g1),var(--g2));color:#1b2b40;font-size:.76rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;pointer-events:none}
.solar-page .cap{position:absolute;left:24px;bottom:24px;margin:0;padding:8px 14px;border-radius:999px;background:rgba(15,34,56,.72);color:#fff;font-size:.82rem;pointer-events:none}
.solar-page .badge{position:absolute;right:24px;bottom:24px;display:grid;padding:14px 18px;border-radius:16px;background:linear-gradient(135deg,var(--g1),var(--g2));color:#1b2b40;box-shadow:0 14px 30px rgba(0,0,0,.22);pointer-events:none}
.solar-page .badge strong{font-family:var(--sans);font-size:1.8rem;font-weight:500;line-height:1}
.solar-page .badge span{font-size:.76rem;font-weight:600}

/* about */
.solar-page .about{display:grid;grid-template-columns:1fr 1fr;gap:clamp(30px,5vw,72px);align-items:center}
.solar-page .about>*{min-width:0}
.solar-page .checks{display:grid;gap:12px;margin:18px 0 0;padding:0;list-style:none}
.solar-page .checks li{display:flex;align-items:flex-start;gap:12px;color:var(--ink);font-weight:500;line-height:1.5}
.solar-page .checks .ico{width:22px;height:22px;margin-top:1px;padding:3px;border-radius:50%;background:rgba(184,149,63,.2);color:var(--acc)}
.solar-page .pillars{display:grid;grid-template-columns:repeat(4,1fr);gap:0;margin-top:30px;border-top:1px solid var(--line)}
.solar-page .pillar{padding:18px 16px 0 0}
.solar-page .pillar .ico{width:26px;height:26px;color:var(--acc)}
.solar-page .pillar b{display:block;margin:8px 0 2px;color:var(--ink)}
.solar-page .pillar span{color:var(--mute);font-size:.86rem;line-height:1.5}

/* process */
.solar-page .steps{position:relative;display:grid;grid-template-columns:repeat(6,1fr);gap:18px;margin-top:12px}
.solar-page .steps::before{content:'';position:absolute;left:8%;right:8%;top:35px;height:2px;background:linear-gradient(90deg,var(--g1),var(--acc));transform:scaleX(0);transform-origin:left;transition:transform 1.8s var(--ease) .2s}
.solar-page .steps.in::before{transform:scaleX(1)}
.solar-page .step{position:relative;text-align:center}
.solar-page .node{position:relative;display:grid;place-items:center;width:70px;height:70px;margin:0 auto 16px;border:2px solid var(--acc);border-radius:50%;background:#fff;color:var(--ink);font-size:1.6rem;transition:background .35s,color .35s}
.solar-page .node::after{content:attr(data-n);position:absolute;top:-6px;right:-6px;display:grid;place-items:center;width:24px;height:24px;border-radius:50%;background:var(--ink);color:#fff;font-size:.7rem;font-weight:700}
.solar-page .step:hover .node{background:linear-gradient(135deg,var(--g1),var(--g2));color:#1b2b40}
.solar-page .step h3{font-size:1rem;line-height:1.3}
.solar-page .step p{font-size:.88rem;line-height:1.55}

/* solutions */
.solar-page .tabs{display:flex;flex-wrap:wrap;gap:6px 28px;border-bottom:1px solid var(--line)}
.solar-page .tab{position:relative;padding:10px 0 14px;border:0;background:none;color:var(--mute);font-weight:600;text-align:left;transition:color .3s}
.solar-page .tab::after{content:'';position:absolute;left:0;right:0;bottom:-1px;height:2px;background:var(--acc);transform:scaleX(0);transform-origin:left;transition:transform .4s var(--ease)}
.solar-page .tab:hover,.solar-page .tab[aria-selected=true]{color:var(--ink)}
.solar-page .tab[aria-selected=true]::after{transform:scaleX(1)}
.solar-page .panel{display:grid;grid-template-columns:1fr 1fr;gap:clamp(26px,5vw,64px);align-items:center;padding-top:36px;animation:s-fadeup .7s var(--ease)}
.solar-page .panel>*{min-width:0}
.solar-page .segs{display:flex;flex-wrap:wrap;gap:10px;margin:18px 0 0}
.solar-page .seg{display:inline-flex;align-items:center;gap:8px;padding:9px 16px;border-radius:999px;background:rgba(33,69,111,.08);color:var(--ink);font-weight:600;font-size:.92rem}
.solar-page .seg .ico{color:var(--acc)}
.solar-page .lists{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:22px 30px;margin-top:20px}
.solar-page .lists h4{margin:0 0 4px;color:var(--ink);font-size:.8rem;letter-spacing:.14em;text-transform:uppercase}
.solar-page .flow{display:flex;align-items:flex-start;margin-top:26px}
.solar-page .flow-node{flex:1;min-width:0;text-align:center}
.solar-page .flow-ico{display:grid;place-items:center;width:54px;height:54px;margin:0 auto 8px;border-radius:50%;background:rgba(184,149,63,.18);color:var(--ink);font-size:1.5rem}
.solar-page .flow-node b{display:block;color:var(--ink);font-size:.95rem}
.solar-page .flow-node span{display:block;color:var(--mute);font-size:.8rem;line-height:1.4}
.solar-page .flow-line{flex:0 0 clamp(18px,3vw,40px);height:2px;margin-top:26px;background:repeating-linear-gradient(90deg,var(--acc) 0 6px,transparent 6px 12px)}

.solar-page .filters{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:28px}
.solar-page .chip{padding:10px 20px;border:1px solid var(--line);border-radius:999px;background:transparent;color:var(--ink);font-weight:600;transition:all .3s}
.solar-page .chip:hover{border-color:var(--acc)}
.solar-page .chip[aria-pressed=true]{border-color:transparent;background:linear-gradient(135deg,var(--g1),var(--g2));color:#1b2b40}

/* systems at a glance */
.solar-page .glance{display:grid;grid-template-columns:1.15fr .85fr;gap:clamp(26px,5vw,64px);align-items:start;padding-top:8px;animation:s-fadeup .6s var(--ease)}
.solar-page .glance>*{min-width:0}
.solar-page .thumbs{display:grid;grid-template-columns:repeat(var(--n,4),1fr);gap:12px;margin-top:16px}
.solar-page .thumb{position:relative;display:block;padding:0;border:1.5px solid var(--line);border-radius:14px;overflow:hidden;background:var(--night);transition:border-color .3s,transform .3s}
.solar-page .thumb img{display:block;width:100%;aspect-ratio:4/3;object-fit:cover}
.solar-page .thumb span{position:absolute;left:0;right:0;bottom:0;padding:16px 8px 6px;background:linear-gradient(transparent,rgba(15,34,56,.82));color:#fff;font-size:.74rem;font-weight:600;text-align:center}
.solar-page .thumb:hover{transform:translateY(-2px)}
.solar-page .thumb[aria-current=true]{border-color:var(--acc);box-shadow:0 0 0 2px rgba(184,149,63,.35)}
.solar-page .glance-info{animation:s-fadeup .6s var(--ease)}
.solar-page .glance-info h3{margin:0 0 20px;font-size:clamp(1.7rem,2.8vw,2.3rem);line-height:1.15;color:var(--ink)}
.solar-page .glance-info .eyebrow{margin-bottom:8px}
.solar-page .nums{display:grid;grid-template-columns:repeat(3,auto);justify-content:start;border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
.solar-page .nums>div{padding:18px 26px 18px 0;margin-right:26px;border-right:1px solid var(--line)}
.solar-page .nums>div:last-child{margin-right:0;padding-right:0;border-right:0}
.solar-page .nums strong{display:block;font-family:var(--sans);font-size:clamp(1.5rem,2.6vw,2.2rem);font-weight:500;line-height:1.05;color:var(--ink);white-space:nowrap}
.solar-page .nums span{display:block;margin-top:6px;color:var(--mute);font-size:.8rem}
.solar-page .specs{display:grid;margin:6px 0 0}
.solar-page .specs div{display:grid;grid-template-columns:minmax(120px,170px) 1fr;gap:16px;padding:14px 0;border-bottom:1px solid var(--line)}
.solar-page .specs dt{color:var(--mute);font-size:.9rem}
.solar-page .specs dd{margin:0;color:var(--ink);font-weight:600}

/* utility-scale table (plain section, light lines) */
.solar-page .tbl-wrap{overflow-x:auto}
.solar-page table{width:100%;min-width:560px;border-collapse:collapse}
.solar-page th{padding:0 14px 12px 0;border-bottom:2px solid var(--ink);color:var(--ink);font-size:.72rem;letter-spacing:.14em;text-align:left;text-transform:uppercase;white-space:nowrap}
.solar-page td{padding:16px 14px 16px 0;border-bottom:1px solid var(--line);color:var(--ink);vertical-align:top}
.solar-page td:first-child{font-weight:600}
.solar-page td small{display:block;color:var(--mute);font-size:.82rem;font-weight:400}
.solar-page td.mw{font-family:var(--sans);font-size:1.5rem;color:var(--acc);white-space:nowrap}
.solar-page tbody tr{opacity:0;transform:translateX(18px);transition:opacity .7s var(--ease),transform .7s var(--ease)}
.solar-page .tbl-wrap.in tbody tr{opacity:1;transform:none}
.solar-page .tbl-wrap.in tbody tr:nth-child(1){transition-delay:.1s}.solar-page .tbl-wrap.in tbody tr:nth-child(2){transition-delay:.25s}.solar-page .tbl-wrap.in tbody tr:nth-child(3){transition-delay:.4s}.solar-page .tbl-wrap.in tbody tr:nth-child(4){transition-delay:.55s}.solar-page .tbl-wrap.in tbody tr:nth-child(5){transition-delay:.7s}

/* bars */
.solar-page .bars{display:grid;gap:14px}
.solar-page .bar{display:grid;grid-template-columns:minmax(180px,.9fr) 2fr 84px;align-items:center;gap:18px}
.solar-page .bar>span{color:var(--ink);font-size:.92rem;line-height:1.35}
.solar-page .track{height:12px;border-radius:99px;background:rgba(33,69,111,.08);overflow:hidden}
.solar-page .fill{display:block;height:100%;width:0;border-radius:99px;background:linear-gradient(90deg,var(--g1),var(--acc));transition:width 1.6s var(--ease) var(--d,0ms)}
.solar-page .bars.in .fill{width:var(--w)}
.solar-page .bar b{font-family:var(--sans);font-size:1.25rem;font-weight:500;color:var(--ink);text-align:right}
.solar-page .bar b small{font-size:.65em;color:var(--mute);font-family:inherit}
.solar-page .more{align-self:start;justify-self:start;display:inline-flex;align-items:center;gap:10px;padding:13px 24px;border:1.5px solid var(--ink);border-radius:999px;background:transparent;color:var(--ink);font-weight:600;transition:all .3s}
.solar-page .more:hover{background:var(--ink);color:#fff}
.solar-page .more .ico{transition:transform .3s}
.solar-page .more[aria-expanded=true] .ico{transform:rotate(45deg)}
.solar-page .plist{animation:s-fadeup .6s var(--ease)}
.solar-page .plist .row{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1.7fr) 130px;gap:18px;padding:14px 0;border-bottom:1px solid var(--line);align-items:baseline}
.solar-page .plist .row b{color:var(--ink)}
.solar-page .plist .row span{color:var(--mute);font-size:.92rem;line-height:1.5}
.solar-page .plist .row em{color:var(--acc);font-family:var(--sans);font-size:1.15rem;font-style:normal;text-align:right}
.solar-page .plist .row.head{padding:0 0 10px;border-bottom:2px solid var(--ink);color:var(--ink);font-size:.72rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase}
.solar-page .plist .row.head *{font:inherit;color:inherit}

/* partners */
.solar-page .partners{display:grid;grid-template-columns:1fr 1fr;gap:0;border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
.solar-page .partner{display:grid;gap:14px;padding:clamp(24px,4vw,44px)}
.solar-page .partner+.partner{border-left:1px solid var(--line)}
.solar-page .logo-box{display:grid;place-items:center;height:110px;border-radius:18px;background:#fff;border:1px solid var(--line)}
.solar-page .logo-box img{max-height:70px;width:auto;mix-blend-mode:multiply}
.solar-page .partner h3{margin:6px 0 0;color:var(--ink)}
.solar-page .partner p{margin:0}
.solar-page .note{margin-top:4px;color:var(--ink);font-weight:500}

/* values */
.solar-page .vm{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(24px,4vw,56px)}
.solar-page .vm-item{position:relative;padding-top:26px;border-top:2px solid var(--line)}
.solar-page .vm-item::before{content:'';position:absolute;left:0;top:-2px;width:0;height:2px;background:var(--acc);transition:width 1.2s var(--ease) .3s}
.solar-page .vm-item.in::before{width:100%}
.solar-page .vm-item .num{display:block;margin-bottom:10px;font-family:var(--sans);font-size:2.6rem;line-height:1;color:var(--acc)}
.solar-page .vm-item h3{font-size:1.4rem;color:var(--ink)}
.solar-page .vm-item p{margin:0;font-size:1rem}
.solar-page .vm-item .checks{margin-top:0;gap:10px;font-size:.96rem}

/* clientele: individual logos in a light-lined grid */
.solar-page .logos{display:grid;grid-template-columns:repeat(5,1fr);border-top:1px solid var(--line);border-left:1px solid var(--line)}
.solar-page .logo-cell{display:grid;place-items:center;min-height:150px;padding:26px 22px;border-right:1px solid var(--line);border-bottom:1px solid var(--line);opacity:0;transform:translateY(14px);transition:opacity .7s var(--ease),transform .7s var(--ease)}
.solar-page .logos.in .logo-cell{opacity:1;transform:none}
.solar-page .logo-cell img{width:auto;height:auto;max-width:100%;max-height:92px;object-fit:contain;mix-blend-mode:multiply}
.solar-page .logo-name{color:var(--ink);font-family:var(--sans);font-size:1.15rem;text-align:center}
.solar-page .logos.in .logo-cell:nth-child(5n+2){transition-delay:.05s}.solar-page .logos.in .logo-cell:nth-child(5n+3){transition-delay:.1s}.solar-page .logos.in .logo-cell:nth-child(5n+4){transition-delay:.15s}.solar-page .logos.in .logo-cell:nth-child(5n){transition-delay:.2s}

/* leadership */
.solar-page .leaders{display:grid;grid-template-columns:1fr 1fr;gap:clamp(24px,5vw,72px)}
.solar-page .leader{display:grid;grid-template-columns:132px 1fr;gap:24px;align-items:start}
.solar-page .avatar{width:132px;height:132px;border-radius:50%;padding:5px;border:1.5px solid rgba(184,149,63,.6);background:rgba(255,255,255,.55)}
.solar-page .avatar img{width:100%;height:100%;border-radius:50%;object-fit:cover}
.solar-page .leader h3{margin:0;font-size:1.5rem;color:var(--ink)}
.solar-page .leader .role{margin:2px 0 10px;color:var(--acc);font-weight:600;font-size:.92rem}
.solar-page .leader p:last-child{margin:0;font-size:.95rem}

/* contact (plain section, light lines) */
.solar-page .cta-row{display:flex;flex-wrap:wrap;gap:12px;margin-top:22px}
.solar-page .reach{display:grid;margin:0;padding:0;list-style:none;border-top:1px solid var(--line)}
.solar-page .reach li{display:flex;gap:16px;align-items:flex-start;padding:18px 0;border-bottom:1px solid var(--line);color:var(--ink);line-height:1.5}
.solar-page .reach .ico{width:40px;height:40px;padding:10px;border:1.5px solid var(--acc);border-radius:50%;color:var(--acc)}
.solar-page .reach small{display:block;color:var(--mute);font-size:.76rem;letter-spacing:.12em;text-transform:uppercase}
.solar-page .reach a{color:var(--ink);font-weight:600;text-decoration:underline;text-decoration-color:rgba(184,149,63,.6);text-underline-offset:3px;word-break:break-word}

@keyframes s-up{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
@keyframes s-fadeup{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}

@media(max-width:1100px){
  .solar-page .steps{grid-template-columns:repeat(3,1fr);row-gap:34px}
  .solar-page .steps::before{display:none}
  .solar-page .split{grid-template-columns:1fr}
  .solar-page .logos{grid-template-columns:repeat(3,1fr)}
  .solar-page .glance{grid-template-columns:1fr}
}
@media(max-width:960px){
  .solar-page .hero{height:auto;min-height:0;aspect-ratio:16/9;max-height:80vh;max-height:80svh}
}
@media(max-width:860px){
  .solar-page .about,.solar-page .panel,.solar-page .leaders,.solar-page .vm,.solar-page .partners{grid-template-columns:1fr}
  .solar-page .partner+.partner{border-left:0;border-top:1px solid var(--line)}
  .solar-page .stats{grid-template-columns:1fr 1fr}
  .solar-page .stat:nth-child(3){border-left:0}
  .solar-page .stat:nth-child(n+3){border-top:1px solid var(--line)}
  .solar-page .pillars{grid-template-columns:1fr 1fr}
  .solar-page .bar{grid-template-columns:1fr auto;row-gap:6px}
  .solar-page .bar .track{grid-column:1/-1;order:3}
  .solar-page .plist .row{grid-template-columns:1fr auto}
  .solar-page .plist .row span{grid-column:1/-1;order:3}
  .solar-page .plist .row.head span{display:none}
}
@media(max-width:640px){
  .solar-page .hero{aspect-ratio:4/3}
  .solar-page .intro{padding-left:6px;padding-right:6px}
  .solar-page .intro h1{font-size:clamp(2.6rem,13vw,3.4rem)}
  .solar-page .actions{width:100%}
  .solar-page .actions .btn{flex:1 1 100%;justify-content:center}
  .solar-page .cta-row .btn{flex:1 1 100%;justify-content:center}
  .solar-page .frame{padding:7px;border-radius:24px}
  .solar-page .frame>button,.solar-page .frame img{border-radius:17px}
  .solar-page .cap{left:16px;bottom:16px;max-width:calc(100% - 32px)}
  .solar-page .steps{grid-template-columns:1fr;gap:0}
  .solar-page .steps::before{display:block;left:34px;right:auto;top:30px;bottom:30px;width:2px;height:auto;transform:scaleY(0);transform-origin:top}
  .solar-page .steps.in::before{transform:scaleY(1)}
  .solar-page .step{display:grid;grid-template-columns:70px 1fr;gap:18px;padding-bottom:28px;text-align:left}
  .solar-page .node{margin:0}
  .solar-page .flow{flex-direction:column;align-items:center}
  .solar-page .flow-line{flex:0 0 28px;width:2px;height:28px;margin:6px 0;background:repeating-linear-gradient(180deg,var(--acc) 0 6px,transparent 6px 12px)}
  .solar-page .leader{grid-template-columns:1fr;justify-items:start}
  .solar-page .specs div{grid-template-columns:1fr;gap:2px}
  .solar-page .nums{grid-template-columns:repeat(3,1fr)}
  .solar-page .nums>div{margin-right:12px;padding-right:12px}
  .solar-page .nums strong{white-space:normal;font-size:1.25rem}
  .solar-page .thumbs{gap:8px}
  .solar-page .tabs{gap:6px 20px}
  .solar-page .logos{grid-template-columns:repeat(2,1fr)}
  .solar-page .logo-cell{min-height:120px;padding:18px 14px}
  .solar-page .logo-cell img{max-height:70px}
}
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

function ServiceImage({ src, fallback, alt, eager = false, className }) {
  const chain = [src, ...(Array.isArray(fallback) ? fallback : fallback ? [fallback] : [])];
  const [n, setN] = useState(0);
  useEffect(() => setN(0), [src]);
  return (
    <img
      className={className}
      src={chain[Math.min(n, chain.length - 1)]}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      referrerPolicy="no-referrer"
      onError={(event) => {
        if (n < chain.length - 1) setN(n + 1);
        else event.currentTarget.style.visibility = 'hidden';
      }}
    />
  );
}

/* One client logo: shows the picture, or the company name if the file is missing. */
function Logo({ name, src }) {
  const [failed, setFailed] = useState(false);
  return failed ? (
    <span className="logo-name">{name}</span>
  ) : (
    <img src={src} alt={name} loading="lazy" onError={() => setFailed(true)} />
  );
}

/* A framed picture: sits inside its gold border and opens in the viewer when clicked. */
function Pic({ src, fallback, alt, caption, tag, ratio = '4 / 3', onOpen, children }) {
  return (
    <figure className="frame" style={{ '--ar': ratio }}>
      <button type="button" onClick={() => onOpen([{ src, fallback, alt: caption || alt }], 0)} aria-label={`Open image: ${alt}`}>
        <ServiceImage src={src} fallback={fallback} alt={alt} />
        <span className="hint">Click to enlarge</span>
        {tag && <span className="tag">{tag}</span>}
      </button>
      {caption && <figcaption className="cap">{caption}</figcaption>}
      {children}
    </figure>
  );
}

/* Opens on <body> so nothing can crop it. Whole picture fits the screen; "Zoom in" lets you scroll. */
function Lightbox({ items, index, onClose, onIndex }) {
  const [zoom, setZoom] = useState(false);
  const item = items[index];
  const count = items.length;

  useEffect(() => setZoom(false), [index]);
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onIndex((index + 1) % count);
      if (e.key === 'ArrowLeft') onIndex((index - 1 + count) % count);
    };
    window.addEventListener('keydown', onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [index, count, onClose, onIndex]);

  const node = (
    <div className="sl-lb" role="dialog" aria-modal="true" aria-label={item.alt} onClick={onClose}>
      <style>{LB_CSS}</style>
      <div className="sl-lb-bar" onClick={(e) => e.stopPropagation()}>
        <span>
          {index + 1} / {count}
        </span>
        <div>
          <button type="button" onClick={() => setZoom(!zoom)}>
            {zoom ? 'Fit to screen' : 'Zoom in'}
          </button>
          <button type="button" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
      </div>
      <div className={`sl-lb-stage ${zoom ? 'zoom' : ''}`} onClick={zoom ? (e) => e.stopPropagation() : onClose}>
        <ServiceImage key={item.src} src={item.src} fallback={item.fallback} alt={item.alt} eager />
      </div>
      <p className="sl-lb-cap" onClick={(e) => e.stopPropagation()}>
        {item.alt}
      </p>
      {count > 1 && (
        <>
          <button type="button" className="sl-lb-nav prev" aria-label="Previous image" onClick={(e) => { e.stopPropagation(); onIndex((index - 1 + count) % count); }}>
            ‹
          </button>
          <button type="button" className="sl-lb-nav next" aria-label="Next image" onClick={(e) => { e.stopPropagation(); onIndex((index + 1) % count); }}>
            ›
          </button>
        </>
      )}
    </div>
  );
  return typeof document === 'undefined' ? node : createPortal(node, document.body);
}

/* ------------------------------------------------------------------ */
/*  Sections                                                           */
/* ------------------------------------------------------------------ */
function Solutions({ onOpen }) {
  const [active, setActive] = useState(SOLUTIONS[0].id);
  const item = SOLUTIONS.find((s) => s.id === active);
  return (
    <>
      <div className="tabs" role="tablist" aria-label="Solar solutions">
        {SOLUTIONS.map((s) => (
          <button key={s.id} type="button" role="tab" id={`tab-${s.id}`} aria-selected={s.id === active} aria-controls="solar-panel" className="tab" onClick={() => setActive(s.id)}>
            {s.label}
          </button>
        ))}
      </div>
      <div className="panel" key={item.id} role="tabpanel" id="solar-panel" aria-labelledby={`tab-${item.id}`}>
        <Pic src={item.image} fallback={[STOCK.array, SERVICE.fallback]} alt={item.caption} caption={item.caption} ratio="4 / 3.2" onOpen={onOpen} />
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
                    <div className="flow-ico">
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

const STOCK_ROTATION = [STOCK.roof, STOCK.panels, STOCK.array, STOCK.farm, STOCK.field];

function Showcase({ onOpen }) {
  const [cat, setCat] = useState(CATS[0]);
  const list = PROJECTS.filter((p) => p.cat === cat);
  const [activeId, setActiveId] = useState(list[0].id);
  const project = PROJECTS.find((p) => p.id === activeId) || list[0];
  const fb = (p) => {
    const i = PROJECTS.indexOf(p);
    return [STOCK_ROTATION[i % STOCK_ROTATION.length], SERVICE.fallback];
  };

  const pick = (c) => {
    setCat(c);
    setActiveId(PROJECTS.find((p) => p.cat === c).id);
  };

  return (
    <>
      <div className="tabs" role="tablist" aria-label="Project type">
        {CATS.map((c) => (
          <button key={c} type="button" role="tab" aria-selected={c === cat} className="tab" onClick={() => pick(c)}>
            {c}
          </button>
        ))}
      </div>
      <div className="glance" key={cat}>
        <div className="glance-media">
          <Pic
            key={project.id}
            src={IMG + project.image}
            fallback={fb(project)}
            alt={`${project.title} solar installation`}
            caption={`${project.title} · ${project.size} kWp`}
            tag={`${project.cat} · ${project.year}`}
            ratio="16 / 10"
            onOpen={onOpen}
          />
          <div className="thumbs" style={{ '--n': list.length }}>
            {list.map((p) => (
              <button key={p.id} type="button" className="thumb" aria-current={p.id === project.id} onClick={() => setActiveId(p.id)} aria-label={`Show ${p.title}`}>
                <ServiceImage src={IMG + p.image} fallback={fb(p)} alt="" />
                <span>{p.size} kWp</span>
              </button>
            ))}
          </div>
        </div>
        <div className="glance-info" key={project.id}>
          <p className="eyebrow">{project.sub}</p>
          <h3>{project.title}</h3>
          <div className="nums">
            <div>
              <strong>{project.size}</strong>
              <span>kWp installed</span>
            </div>
            <div>
              <strong>{project.gen}</strong>
              <span>kWh per year</span>
            </div>
            <div>
              <strong>{project.year}</strong>
              <span>Year installed</span>
            </div>
          </div>
          <dl className="specs">
            <div>
              <dt>System type</dt>
              <dd>{project.type}</dd>
            </div>
            <div>
              <dt>Supporting structure</dt>
              <dd>{project.structure}</dd>
            </div>
            <div>
              <dt>Segment</dt>
              <dd>{project.cat}</dd>
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
      <button type="button" className="more" aria-expanded={open} onClick={() => setOpen(!open)}>
        <Icon name="plus" />
        {open ? 'Hide' : 'View'} the complete project list
      </button>
      {open && (
        <div className="plist">
          <div className="filters" style={{ marginBottom: 18 }} role="group" aria-label="List type">
            <button type="button" className="chip" aria-pressed={which === 'res'} onClick={() => setWhich('res')}>
              Residential ({RES_LIST.length})
            </button>
            <button type="button" className="chip" aria-pressed={which === 'ci'} onClick={() => setWhich('ci')}>
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
  const [lb, setLb] = useState(null);
  const open = useCallback((items, index) => setLb({ items, index }), []);
  const close = useCallback(() => setLb(null), []);
  const setIndex = useCallback((index) => setLb((st) => (st ? { ...st, index } : st)), []);

  return (
    <section className="section container page-top solar-page">
      <style>{CSS}</style>

      {/* Breadcrumb */}
      <div className="crumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/services">Services</Link>
        <span>/</span>
        <b>{SERVICE.title}</b>
      </div>

      {/* Intro text, centred */}
      <div className="intro">
        <p className="eyebrow">{SERVICE.tagline}</p>
        <h1>
          Solar <em>panels</em>
        </h1>
        <p className="lede">{SERVICE.summary}</p>
        <div className="hero-tags">
          <span>Grid-connected</span>
          <span>Off-grid &amp; hybrid</span>
          <span>Utility-scale</span>
          <span>Rural electrification</span>
        </div>
        <div className="actions">
          <Link className="btn" to="/contact">
            Talk to our team <Icon name="arrow" />
          </Link>
          <a className="btn ghost" href="#solar-process">
            Our solar process
          </a>
        </div>
      </div>

      {/* Full-screen hero: one image */}
      <header className="hero">
        <ServiceImage src={STOCK.field} fallback={[SERVICE.image, IMG + 'about.jpg', SERVICE.fallback]} alt="Solar panels under a clear blue sky" eager />
      </header>

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
        <Reveal>
          <Pic src={IMG + 'about.jpg'} fallback={[STOCK.panels, SERVICE.fallback]} alt="Solar panels on a tiled rooftop" ratio="4 / 3.4" onOpen={open}>
            <div className="badge">
              <strong>2014</strong>
              <span>Powering India since</span>
            </div>
          </Pic>
        </Reveal>
        <Reveal delay={120}>
          <p className="eyebrow">Delivered with our solar partner, Helios</p>
          <h2>
            Solar, engineered <em>end to end</em>
          </h2>
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
      <div className="section" id="solar-process">
        <Reveal className="sec-head">
          <p className="eyebrow">How it works</p>
          <h2>
            Our solar <em>process</em>
          </h2>
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
          <h2>
            Solar solutions for <em>every need</em>
          </h2>
          <p>Whether it is a villa rooftop, a factory, a remote farm or a megawatt plant, there is a system designed for it.</p>
        </Reveal>
        <Reveal>
          <Solutions onOpen={open} />
        </Reveal>
      </div>

      {/* Showcase */}
      <div className="section">
        <Reveal className="sec-head">
          <p className="eyebrow">Systems at a glance</p>
          <h2>
            Real plants. <em>Real generation.</em>
          </h2>
          <p>A selection of installed systems with their capacity, structure and measured yearly generation.</p>
        </Reveal>
        <Reveal>
          <Showcase onOpen={open} />
        </Reveal>
      </div>

      {/* Utility-scale */}
      <div className="section">
        <div className="split">
          <Reveal>
            <p className="eyebrow">Plant construction services</p>
            <h2>
              Utility-scale <em>track record</em>
            </h2>
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
        <Reveal>
          <Pic src={IMG + 'band-utility.jpg'} fallback={[STOCK.farm, SERVICE.fallback]} alt="Utility-scale solar plant" caption="Ground-mounted solar plant" ratio="21 / 9" onOpen={open} />
        </Reveal>
      </div>

      {/* Notable installations */}
      <div className="section">
        <Reveal className="sec-head">
          <p className="eyebrow">Recent installations</p>
          <h2>
            Our largest rooftop and <em>captive projects</em>
          </h2>
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
          <h2>
            Built with <em>trusted manufacturers</em>
          </h2>
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
          <h2>
            Vision, mission and <em>values</em>
          </h2>
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
          <h2>
            Trusted by developers, <em>institutions and industry</em>
          </h2>
        </Reveal>
        <InView className="logos">
          {CLIENTS.map((c) => (
            <div className="logo-cell" key={c.name}>
              <Logo name={c.name} src={CLIENT_LOGOS[c.file]} />
            </div>
          ))}
        </InView>
      </div>

      {/* Leadership */}
      <div className="section">
        <Reveal className="sec-head">
          <p className="eyebrow">Our leadership</p>
          <h2>
            Experience you <em>can rely on</em>
          </h2>
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
      <div className="section">
        <div className="split">
          <Reveal>
            <p className="eyebrow">Get started</p>
            <h2>
              Ready to <em>explore solar?</em>
            </h2>
            <p>Talk to our team to plan a system for your home, business or community. We will take it from site assessment to commissioning.</p>
            <div className="cta-row">
              <Link to="/contact" className="btn">
                Talk to our team <Icon name="arrow" />
              </Link>
              <a href={CONTACT.phoneHref} className="btn ghost">
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

      {lb && <Lightbox items={lb.items} index={lb.index} onClose={close} onIndex={setIndex} />}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Embedded client logos (data). Nothing to edit below this line.     */
/* ------------------------------------------------------------------ */
/* Individual client logos, embedded so they always show (no image files to copy). */
export const CLIENT_LOGOS = {
  'alekhya': 'data:image/png;base64,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',
  'bpcl': 'data:image/png;base64,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',
  'cpwd': 'data:image/png;base64,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',
  'cytobiologics': 'data:image/png;base64,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',
  'emmennar': 'data:image/png;base64,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',
  'greenko': 'data:image/png;base64,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',
  'indianoil': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIcAAACdCAMAAACpdJvFAAAB4FBMVEX////+///+/v/+/v7+/v39/v79/f79/f38/f38/Pz7+/z7+/v6+/v6+vv5+fr4+Pn3+Pn39/j29vf19fb09PXy8/Tx8vPw8PLu7/Ht7vDs7O/r6+7p6u3o6Ozm5+rl5enj5Oji4ubh4ufh4eTg4eXf3+Td3uLb3eLc3OLb2+DZ2t/Y2d/W193U1dzT1NvS0trP0dnNz9fMzdTLzNTJy9PGx9LDxc/Aws69vsu7vMi3uce0tsSxtMKusMGrrb6oq72lp7uho7ecn7Smlp2YmrCWmLCTla2Qk6uMjqeIi6aBhaF9gJx4fZt1eZhzdZVuc5VrcZT0cCHzcCLzcCHzcCDUcDvybyHxbyPvbyPtbiPoayTdaCfJYS2sVjaoUTNqbpFpa5BkaY1jZIlbYIeVTTqQSDhnUmt7QkFiPU5WXIRTWIJOVH9LTnlFTXlISHNRQGA+RHI4QG82PW42O21ONEo0N2guNmgqM2YnMGMmLGEiK2AhKV8dKF4cH1YZJVwYI1sXIloYIFgUH1cRH1cTHFUQHFUNHFQKG1MYGU0UGVAOGVENF08JGVIJF1AHGFEHF1AFF08KFlADFk8CFk8CFk4BFk8HFU8DFU8CFU8CFU4BFU4FFE4CFE4EE04BE00GD0srr4BmAAAYmElEQVR42u2c6V9aSZfHnbkz4UEaaFFk34yggMoi+ybwQdnB6PMx7sjFKKteMOy0LApOE9xwHldi/tW5F5PuPGk1arTfTH5v4F6Ky9dTp6pOVZ2yo+Onfuqnfur/rV6hsXhCd3cPsbeX2NNNwOM6UX8vAIDC4LtJNL7CaHF4fIEIFAuBHofFqBRQSUQ8BgX8PRA4El+qNDlXIon8b+VyubJbrVYq5fJv+a2Iz2lWjgrI+H+8NAqAJQ3Ize5YKlfZLWaTsCX8K5O+FT8YisW30oXdSi4V85oVAjIO9ZKm+JUut6zEC9WdcjrstRoUIvGIUMDnC4RDIolEpptwBVLlnep2wj8uZxDQwAuZgtKv90D5ciERcJrk/Uw+n8ngDo/KlSqlQiYWsPsEfAZTZnSC8UK5ALkNgzTc85MAaKJQD+bqlVTAqumnU3lShW7cCQbW1jYRra2tgSt2o1IywmKw1eNgslTPB8aGe5/ZJgC6t18fyH3Ih61KAZM1orR51jaD6+vvVpeXFttaWn63vh7cXAOdOgWPKlRYw9l6Pjw2SMY8IwmAY+sCvzWKAT2TRR8yOKPvg++WFhfm595OTb/5rOmp2bmFxcXV9febHrOUw2LrwUK9HDay8c/msSiSyF88zvuNdCJVZNt4H1xdnJ9+Mz0z9a2m//nmzezCEoyyoudT6IaV7HEFlFGeBwQgiOxbjUpIwyaNGD2bCMTUzDSsv3JMIben37yFUTbDZgWZrASLp2mnpPsZSFC9ylDpQ8IsIFJ0keT64vzszPTU/YIR5xZX38ftAsrA2MaHalRDQf8oxi9sM1TNuOT0AbVnE6GY+h5Fm2Tq7dzCajBkEdDF9lR1a5yHB37MQYXO7G5sjNErsiMUb2emHqyZ2cV3m6CWRtNGKgW3iPAjIPhRsFjwy+lsfSC4tDA7PfUYTc/ML65vOiRsuTdXDsh7ngwCELXRcto+wJR5Nt8tzs1MPVbTs/NLwbCB029PlWIGJuapDUUHVRMTXIYSDC7BjvEkzcImsYhem6DKlpHzJBCAZIhXoTE21xhdX5ybnnqiZuaXgy4xWxutpMxM9FOsYczUIBWj37a5+ljP+PdGPLf4HpQw5bGdnJH1aIsAvbp4Paqh852by/Nvp35E0zOL66CaowzvpoyMRzor0KWC6pCaNuCEXWNm6gc1s7C+pmUqYztbuu5HgQC/SsI1SE0f8D4HBgLybk3LUUQrMcWj+hHsgB82IpXtfL80N/UMmkZA1EwtVAmLcA/HQLPspewEg2l7JgyEZGE9IGWZ0lXfwIMbzSuyMVtyMOmWzaWnt9e/WmQdFLMdhZL1oXEAQFBA9UA/SZtcfi5r3PhI0CNiuqtpzQN9FS0OVCEZWR199xwu+qdF3i4GrRxZtBGVdj7IHBTbdt7Yy/cH52emp54TZHZ508iBXcRJfUjN4MVQfXKAYX+/+HbqeTU9vx6VsxwfUvIHNF4Uz7cDqciqzeXZ6efmgF3ExZPGjv1c7Pf7c31u20wf9K8/q3N88dWlTdPrsULJTH31PScd8ldCAwxTcPEFMODB9x04xPDXI9LvGaRnLJvWkSVrq3NTL6EZuM1QtemyiXy/q6KFgUpAQLcFF6ZfhGN6djUqEfqqEfH9c1+yLp2zUKRrz++kf/TvQQfDkMsZaPcZBOD7KwEey7m+MPViWtpSMVZ2w8L7QqJObSpnpqk3lt++GAZskHGaPlsw9dzD0eXYjYnY48GFmZezx+xyeEgcrnpZd1fMK260ZOcKwKW5l8NADKLnT2zH5HcHIl2GTEpB1QUXp16SY27dz1Mm82bSnS2G7SkHhFzP+vyLcrxZ2lRIA2Uf/66KAUahwjhLvbn08DnT9H26o9CbhfdWujkfl+PvikpV2ZSWbgkuzr59pGZv09ydWge5qkTecNeMl+Gohkc47vfLD9PSt7q5vfpF7+5UMKnpC1Td3DsqZihU87NGY7//z2MFf+P3P/Xhw4d6/cN92q+bme6dmOz2iBk1kKjayOrM2XlbF9fXlzfvLhGdP1gXFxcniO4p8tHDNW2nR2/vUjGaTFFHmiidt59ycZTPH8Kvlx8b1Z2d2tXNs7+r1vUZzHx1dn5/qcioMp0d676VAzdRjg/zfHvtkpdHkFkVPTy/qCdcRo3eFi6cPQTjsgbF65+KkXjtfo6UvD9SspNu78XcdZAtjRzcmKNqY9Em9loFt5wlksoFAkts7/L7HNdxucziMI3otu7Fvs5r6N5dL+X2EMj/u5OpjB+d/AvWRQNUjawc1NyD9FGbz2McoGljZ5f/ulUI37/gb7V/wNxPodGG7IW7CiM6aVXGufZyoO/WhsuObJs5qvRZs1bchpUJganChoQoBzP5fHycRjamkdvbxb9o57BZLeQKO83z2nYBmtDpDO5EfvtuFRsXe+4RYzYm/sdtHOJEVvNan2lV/RZEZrPZYlZTiTKL1Wqd0FExTCNy0zKBXCKytgW/cWXTLq1c703XwnAJo0E3ZjJ/fkD7xfKVkJvWxOHHAF+VSqlvnVDpCik511JolSxSmUw2QiGSRFImrluAXMnEZADLlfHJxN7XUml/by+dzREg96WMXoY6amZ293QzjAm3lE9iiKRsEl8q5ZGJlGGZlE1kSdpPaJeGn8qWqsMH15EBSbwwduuQa9hNSniOYqsW9Xo9rokhoNvo0ZHpYx740mPjoEgGn1NEICqczqFO4hh80+v1Trq4vwx5w2KSUMLtYrtjTlE33+pWdCtcPoeQAH/DJfgHy+Gd9K2srPh8Pq+Vg+E7/Nmja0gkhn4z3zrCmH5PiAXuncuTRj7kmDBygV5P2cnieMo7adBj60PRHR9q/r4eQyajwtImawcNWPtpMU6Vzli1gaSDijdm8yriSKhgJhnSjQrIoth3MwrMQHJvr5LZgHKlWi0mwknjjebJdUIui5WtXbdxjO9CMt5K7fIA0nOpZEo3luKtutgczzaoYdMoBAzDfnW9MdhtymTVWPpk42hvr3HQiA/BHAeFdHXXxcDpIEjePRLeNpMNmbMDSESx1/MqjCB1mHaoh4d11mg+IMCOIk36OqUcjZZthNs4rLsxMcvfaBVNpJ4RhUqt1obqCAek6ekRisVimfe06GT2WnJZFY48WYVW/IEAaGN0qjPNy71sQNKN15mVfZjPHIcFG53u/JBX/iJIlaxMHBaHJ4vHNbROaeIK5shppJGy/VYOG8zBBvdbOVVPnzsS3diAto9hDndI2q32BEKhcCZvExIEnkpagaNMhrV0Oo3eR8OitJlmK2NT0THsCRWtB/jMkRzn9khiV2lJpyAZHcSRhuVsNLa3B40aTcD2aJUMktBv93E0WgUjhTM2Pj5uj+4gHJ6oiiIe90UT+d2oAEsfzzRio3CV2TkdKOaIiI9H6WCOnF03RBKujKs4+BuOdEjR1e+unMYG0YKkm9mlDIdkWBSORkJ/l6NdL2DjshGWsXt+/ZVAGPHD/tE/WfAqSD3UPtmYG1J2cT1pyEhBU1dWhrsY9mTKQ+/UZQ4bB5X8JINoTm0piJ854LIiXyo+Qf9vQdLBpDiz4/1ddIlJimtztOvlDg7LLjSK+OlFHXKPGzWibqwmi3BUq9EJvW6U+qvQ7WT18JQiOhpF9eecY9ZM61OAgdFnEmCmeRXhYeWpoqb3c70UTGRiv0hIQgGCpIdFcxXcQzpHHNLgbzju8VOk3fJdO5dn5TiU/VAJs9ADcSenf7L28dOn6nba1ksyle2MLjwO14mmgqf7lf2LE4TDuKFie37/4GeghbHyHxynSR2VQOjp7gYEqdhAly6Z38jvXyW/cGyNDt/Vbg2/bYmRfqzo4HEN0ZSNheLH3TBHBbJ6o/GwivB68rgEjilVxlEcFbxCxrYbDmiMzDdZR7uwyht7FBGO5mEm4LB5vMNoQapoptPHUqfNi2ZK+5kjIbuzH1PmU3KepXCW1uBQZIWOg8KP5T0wR8bMYMhUUhJBlT27OCjmCkkVvs0B6xMIc2TDciKJjO/iuqttjoKRBHOcnB3WqvWMDOk/IAO9P3R4ftJMG/CSOMKxMSKLF0y39usjiayWa8i2Cnq4UtHYbuZotO4Ti1e2Azo+h8UW6JDQ5PL87DqvpbMDnzkCPJq5sBMxDnMFOv92q6TjKiK5sQFTtgnHMBcXH7NyxkjqqAEZtSkkIkmbXsvb/UdkUJ1KqW4d55iRsoUHj/uNmIFPQnUr3FDtLOFbSR3UMjGfyxNO1/73JpiqhjyeVOsmoMn4vLHaWSMXj0HpnSO4rfnATC3qj1Q/B16VgBcsNS8a6XgNjiwvdyI+sNSCg00QRo2Kbg3Ye8C6qx+Ogy4OMgEVtsdaOmyeHO03jk5Omof79cZB80uI2jxs7B/evL242m/AxWCLHx01kevTxn7z5HT/sPklAtxv7COGaDbbd5qnjWP48rLhFjnKIOvWOIjkrgb6pOHGyclZDRT2qrIX7aD7S+z9dVz31dVfPjn/93vffH7zVTgeG/Ltemn/cWucbN5Oigd87Qi34pV7aw8M0Z+gVkEzHN223R4nY+SZip7SnjecN3cSpZfDgON1hSqT0d8+bwCk8aqDosk2kTnTxVXr4TOntuXPH8MRkk4UE5I7Fi/5/pqPKXvEvPKrmeQtk8f9/aPDo1vVbNjZrkpYcsdODNlaici47ver30yoV//Uu7/On9dvUfBG7+/QbxnNYKDsuGuejVVmMkaOJbj4z39bvpiaumeNAVlGmL9LC3doHeRrEpk792EAXgyGlG8sfbN4etvyyu0rL2/e/PHmHi0EJ+gThZjozg0yurMcEzLcf8O6lCRccvffuWDYpU9lNQx9cHH6JTlm18EBXTpzzzodihOuuPiCwPJLrltOLbw38eyVqPieLQecbRcSMy0vvI4b5fbF6g7SPQv9KHli20qTbSzPvOAy7nsL05TPaPD37hG6yzEJw/VS2x4Ix3JSLYhVJ9n3bsD06FIFM122tjw782Kr2g7mxHbWQL53/wU14KtE5DT7i+0Dza1GRcJIzT/8y3d2TbXpgoWhDK/OvQjIzOL7CbqxUNATge9tm3orsRHOC+0TTs2/Cwxxw3Vw6LuJMd2aZMXB5YHr89Mv0IUtbWrZ1kpWR/zuRjKK4yhmdFTt5vLz18wM7KR0Sarm4j4gTwgnjFYDw9Tx94uzz40xvx6ScT3H0FDXAzIeAIo+U7BxBlfWF555l25uedPAt+TLJtqrjgcIxXSXkkaaKvy8eRdTs4vBCb4eqoN9D8yIwYgj9aiMYkwuP2fmxdvFoHNIFqpD8oemTwPEsdTOCo85vrn0fBZ5C0dhMp6rlLM8PD8X9XqisG1nMuzBp2Q33pVCFpbQJrIlB+8RiVs4LgxupvIdMMgzYbxbU5DHUpUVIbbjEcIKA8fZMQrf8zwWga2xoSKrEvWIFNfxKOFk0eOCjsZ1Bp8hd+ufC+trKrpuqx6T4x+b59gtjp2mdFSBfXP5B3v46TeLwbCcboTqkIL46KRcAD+aOM6a6Kzx5I/1IzPwGAuKKcZUPal8Sm4w0COP1DNmNsewtr44++bJ6afzy++doxxTqhZTkZ+Uxw50ScK7GfsQVYPkBT+tR5ueQvKCOUJbuhJREl91PEkAURIoFrwy5iCSND43/WiS6Zn5pWBojC9254oBOfnJWf0AYdidK0X1dNoYkjf+9il543aJUB8pFTwS4g8cLgCwAxOJ3ZRdTBfbNteX5t8+3CZIXvK7IKimi2ypatr+oKH+vnMFTEO4uB3Ss/sNHphkYfahtphbXA2GzDKGKlCoRMzCrh89BoPqhetmJ+McorO1YHJ9cWHuASiz8wur76GJIabQka4VvCPPcRoHwHJMkUIZssoYgybXRnAVRpm5p0OZmZ1fXFrfBO2jHLE5VipGLVz885wJQvUOWbd2StFxBWNAYQtvrsMo87MzM986C3ImZg6BCG569EKm3Bwu7CRtI6RnOyQFYClqd7JSgOwyZt+AzhXYDK4j55Lm5+ZmZ9++nZm5WRiaX1hcWl3fXPNZ1BK22BrLVVJeLQ37nEe1ADxD607sVCC3XsbnDmstvijMsorkonw+p7UEIwTX1gJ2k7xvRKF3QsWdlFfDJDz7wTUcXeuEyvVczKUVs8gDSoPF6gSjGxvtc2ubGxthj8Ns0kporFGdM5rZLUNuA+tFThUCWLbIEsrsVrMxz4RRwSdzxRKxcEgsUyhkIqFEJpUyeXLDuCuWrVazkQnJa/yLnbJE4agqZyRXP65tZyCvzawWC1iMtthDCqPVHU0Xasf1XMStZeJf9tgp7LJDivEAlK82Tj8dF9Nb0EYsGo3GoGS29un0uFqIB8xyIRX3Nxx+fYWn0Dkagz0Ug1LZ4vEnRMflfDqxEXIYtH0MCv7vOYELGwVA4YhkBlsoU+tN5vGJCYvZoFaIYAQizPA3QfzJgsXhuwgEIiICgdCFxz4jA4CCBXz3cwD4s9h/wrr3iZ0YbCf6j4e+unnA/b8D9HBHRMJ7otkurkgkJMFNGC5GesgfRmTI9UbTmGqQfNOM8TyReACP6uobEQ12383BsUVjK9y7OehW+HMRmgy/eEYe0PlxjH6oUNktpiK2YSSLH2C4YzE7rRN+wIaTeefvAAMr1dP48N3dINNTvdoa7qRN1o5jsu+fURiCx/3Ts1ardbW/HdaQ4fpgx05P/SwM1Vc9Dg8A9yRK77Xu5fDWrrdEaKorkw1Jvtvt9Tu3zy5quUQivd0424PU3QDACuXzHgaGurL3MTx4L8dZfPgVgEJ3ogEAjcH8cRwfvvgFg2LdcPQoTCYd58YN4TKYm6EdgL+EfPXz9X8SjJnmRdlvEAmVE7Hq2V5oFAMQtWazmoSGOa6+z4EiDCmUUgJRqtGpBYR2uI8iybQ6NYc72eYgiDRaBR1ZK+kVa3U6rYzcCducKFUqaDieGr5Ggg6UMHx4UXEM9WBQOIY2UjvbNlMAgkyrVfQ8lKNXF4n6uMZQfAvyKkhwNaHp8EUScmt9ezAHBnazqEsIz8cHbZF4cisedQi7AZRwJRqRSdyxrUTYxMUCPdpc62N0BPv5/Ea6uR8aRNNd0aidhnkgB9mye5VxZSq1w6NqVNUFoJi2dOOqUa1AiQOYA0ue3G9EpR2v+sHiYaNWOzws+UQYjCp5tO/ZKMJDz2HWysO8tu20GvbP+wqdktBBK6XEsSNHVyDrwRzju9eHu1t+f6rRqjqZKKI+3boohHyx0uHJDcfhYUwKEMcrZzuRSf9W4yxv7MWq0xfnu7nQZKzSPIop8EOTjeuC+vNCA4rl2rusmnvYkZOPAfYjOFqtLT2fb0w3D8M8NDfQaBVtIu6It3TxB8cowIInapMKHncs3ay56AhHq2Id7leHaq2siiAOHFynv+zCAb3u2uWxncqOnH8MPYbjumqnvQLE4cZVjIuRJa8P/GJ0B3o0fvQVB54l14/SqHQl1Dz10nEIR3zklw6aOf8xr+8Rhw6uU0L0H2mltXOYoy92+UiOrBKe/Iz4a1cbg13GYqs2QUT628DenxywtfG8YZnRHaucn04iHP976qehOkj6TCuvJ4oQe4i/2IPs3buoW0l9sYtHcqQk8IgwtIJwEMd3Lktj/9XuT2tfcQBMpRfKlevHRxenk4w2h4uC6ujVpq9gewx5G62SDvfHBsJeqzL26xM4xAiHD+HoHa9dlMaAbzkA6kT24LCaWnGl4HpBOE5OneRXHb2aNgfPvnMJX9/8GEYVO/i4Jcf+EMev+kKrZu2FP38d+qpeCCOJw0ZAP0RXRA5qbgb2CwexzdGNV2da5ylRe0kMzbEVLxoBHvqHOH6RbF0fhMQYFFaW+MpPe8cK5wUTGYNXQ0c1158cN/YgoAYD+5eNkIKCRcNz09TRWc5AfMV+tJ9+xYHm+fZaOy4BXR7aaX7FYSpe7Ng4vX3O7ea+l/ktB0DQbbUuawmHTmMCcwcXdZ8QDSDtNvBUDhRRm7xqlSIgVKz8aQ8pQZK8Oku5Hf5M4xwezL/xD0IHim7OHLWOKvnMdu2otRPS9AA3HA/pT+tXbY7fPyVvOKqnG7xXKI41dXx2elyJgNVPW8NYsu/4OCp9RXZsX11VK+VY/MMnSIxXpz4e33Ck2hwdGKYlWjq9OmuefdzPeBXEV3D8Ebn6hPTrvvqn+zhem/2gow9FUq0EnPBQ1cGDr+10oKOToQXT23GnWL0COgRomskP2gQAhmmNFgqQU6ZfAb0K/LATBA1wUEkUuUDPKOKfaKpsHIzntguQTz/UjsdoNhAcp6F7TCvg+D2nxjFEKpWEA1BdFFr7f978QqTQepERE4Wn9g30kbFdZBr8eWcPUgwOensYXC6bhIPvUrrRWBKNSuzs6PhvPIlGJrSDKaCzm8rmDnDZ1M//twaN/AAWQPVQqERsx0/91E/91E89s/4P+VqHGu96Cp0AAAAASUVORK5CYII=',
  'livlife': 'data:image/png;base64,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',
  'lnb': 'data:image/png;base64,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',
  'muppa': 'data:image/png;base64,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',
  'myk-laticrete': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPcAAAA1CAMAAACqco3eAAAB4FBMVEX//////v3//f7//P7//P3/+/7/+/3/+vz/+fz/+Pz+///+/v/+/v78/v/7//76///6//76/v/9/P/7/P/6/f/6/P/5///5/v/5/v74/v74/f/7/fz6/fb9+/3++v39+vz7+/36+vj++f/++f3++fz6+fr69/r0/v/0/f/x/f/y/P3u/P3u+/3y/ffp+/3n+/3o+/zq/fbt+vru9vnk/PrZ/Pnh9vjW9ffJ+PnF8fWz8/Sx7/az7/Co8vfQ6e626O+s7PKq5O2g4u2h3u+W4+2Z4O3N1taq2eWW2OS5xMeSwc181uN5xdRizt1bwtJjvM1GustGuctGucpEusxjtMVAsMo0sss2rsostc0sr8YZs8sTrcQFrtIFrNIGrccCr88CrdMCrNwCrNIBsNEBrtUBrNcBrNIBrNEAstYAsNUAsM4Ar9cAr88ArdoArdcArNcArdRDqcIgqMQPqcwPp8gQqMAHqtcIqtEJqNgIqc0KqsQDq94Dq9sDqtoCq9oCqtoDqtkBq94Bqt0Bq9oDqdwEq9cCq9cCqtYCqtUBq9cEqdYDqtBrlqEtor4apMAbn78QpssTpsQNpcQSpsAJptUQpMwSoMpueXxlYmQ5XmZGR0wpODY5MTM0MTIxMzIqMzVhmGOVAAAS0klEQVR42u1ai1sayZafncedySSZnejd3ZvEu9HJxMxVERGaBhNREG1CNxCVp0qDggkPO7F5NY15aBTHiN2IPHRMov/qnurGiFEcnfm+/b7ZzS+x63VOVf/qcepUNV988Rmf8Rmf8X8WV69ebWm5fv37HwC3r375EVevA65e/eLLL0Hm+vUf2gC3f/zx5s2b/35J/Gcj/pTQZfHj7WvXfvjh+7N5t1xtBd4//Pjj7X/cbvnqI1pab9y43oI6BXqmvfU24t0GrBVt/7gkbjbiTwldGrcRrp3Nu7W1vf3ePSTQ1tF+Cv+UcPenfwLrjjt37975a+Hbb+/cacK7vb2l5dq123eAeMftBsiMv5YG/+6Vn6Fn2u/+9NPdP4D/bsCfkbk82tHj6pm8r93rbG/vuNdxCvca0Nmp7ulV9vb0dHX1/JXQi3DrTNrqsQuBGHowOPjgrwb0ygOaM3mP7e5dAL/tshMTkxMTE+OTk48RxhsxIUHKfzxxGo+P0bS0UegEZKHxU5g4H7IMemP70Fm8bz/aPwB8gP+ncSDjw4fDd78JxVKpXC6nc7kUwk6qATsSGqJnoWnx6YJTVZ/OP6ehRsAb+4zNeL9vYPjhvYQ67XeHh5D7/v0B8E5U/DzPB0Lh9TzCugQ5+usGghTPy/HT+LVZ6fqpAllUxno9S0K9UQnN2jmqVZLxc8nUVDPeMuvDQ5lkAw4P5UzoB+BdXXuR4bggM7vUgDcNkHNW3pyNldMKzdRWTrewgrDUrOWmeJnNJpvwHtuXRrbO8QTeIRwevpd4F6trK3mO21ydfYHw8sUxXr6W0Bg/A82Kz8hvqPtFQ3Zjm+c0JMsivH69zPHnjDes3/3mOPiA5nmRm2WCPM+tPn8iISjhyf8OnsoINuAiaovPngXp5rzffzjcs0p41Bg8koOtfZl3IR4P0XxhfjEWCARCsQV4FgKxWCwUDUlBYGEBhbGFEEJwQYoDUBgKLYSkCGiGQgFUQWgB/UnxmCwCcZBaWHgCpQtSCZKXtSAAhcDThTpCqO66nhQsSO3KLR4jGg015w3T+HCXmnC53Y/NNpfX67KZnazbO06SrMvlclqRAQDe/PryXCAWXA/QucrabCS2UyzWarkcHVlZSqZpeqZcqaTS6RzNV7IvIktZP03ncjmez+XSSGatsgPJdKmWmY2DZjLO+LeZldVsdQeKQZIuVKrVKs/TM5VsdZubn83WRHF6ulaNQWG1Vs7FIvFqtlLhAoWNzOamvwBADdAzwQBN0zw/MxeJRGAICjDIHxFfnOHP5+0QimLJS9qLtar4mGSFEu+z2SCvyDrRhEC8f12eW4hF1ws0n12bfZrzuVC3uLzcUrYoeL0e1uNxsT6f2+XybPPVms/tc3sgy+Nx+3YKmaqHZV2Q4eXiM17WlZiJzGwXni9lEx7WlyglvJIsy3p8PgFiUzxfEibsNpvd4/VJFQvTM0mfRxB8vgSICCgiBcXEUbrKB6PR6GLw+aV4U4JY2vaSj8XtpDhJCsUU7yNtQjlddlHA+30D72BsI7uWp72kaXh42Ggk3ZWqQJlNxqFh4/DIqMk0ZCRZ6C4oNplGR4aGh02kr1TykMYho8lsnkwWpmxms20q6k/SCytZu8VktvkmQd8IlQEs1CjkJMQJckiv1w9To5BnMlkou+AiLTJIq+UIpEPKJCDmSiT9zz7BubyRXdul2GJRBN7FnZLEu7wjwHinc2mX87f3J3lHV9fWNtOPBzGNRqtW62yiyBIYplRDkiD0mFptoATB8VCrxPQWQtunxUbYoo/Sq9VK7AHpTeZ8Zp2OnJqbS+boZa8Z1+rM444HmFarwaBGjQGq0JHChFnX36XW4IRBrdbodLiBoKiHuBbHcZ1Or8e1CBDXWwnI0mox3SBMVS6/OstcmPeBzJsVhHGzHSaMYCch4WNJCqZgYoLaP8l7PjK7tMaV7XpVW5ta3aGxCKJD36NWw0G1z+okcHVHP8GyFqyzC7NsPVJ3KjQEK9iGlXc6lXqSLeV2hFENZknMLMLST9oeqNpUesph1BtwlUqlNeBDBN6ntTotOo26s1+DPzJ0dhiMQ7hCS1j1mn7oG0w3pMc0fV1dXb0YpreOqfr7gbbO/LiY4jKwwT2/1HhbKafT6bBYnQ6nk7KguNNqhaeDsn7Cez2KeANXRVubwaBQDU8IJNalHYNu0FhYhwlTKHAr9bC3U2lyslZth0JFbDmNmKJNpSNdYorf8RC9SoswE9/IlTxmTK1QYdCeg4KpgRGoWbxX9ciqx5TQBYTRYuhoG3M6DQq1AXhrh9CMJklYP1qFCjeOWqghlcpAWEnS5s3x/nx+OX8Z3h92rVu7u1tnAngfHDTw3lhclXl3dajHCK1KRzkfanoMj7C2NowUBPuARt2H67Eetd4uChR2U6EasxJYd4dCT7pLycJcykP091t8GYbhEg69Bh/TaoacYJgoXIlTQkKgdL2qsTGtErc4WXaC0qsUxNYWobqHFgBudaKp6POwNl0fqLGs0wirawvypmk68GTDP/fkMrzf7+3u7u/v7u4B+4/Y292Cf3uwf787wXth482bAszzf93qI6wGhcZI4F1qwooj3omcz6bv6ezq6bplgESaxH9pVxgM2p7ODhXBisnKxjPeQ/T0WHwck896LJgSqtDiYAkTFN6ts5Xpsk3X3W8w9CiNrJjbKY7r+1SE02ro7wHeGtxqBQOcSpZEu16J1k+CNWo0BEVOCOlAaHExCBv8ZezaB+C9tw8sd+sRxHh/D0jvneJdCMy9Xn0KvLt/0RDOoa5f1Fr1PXghrK0DePM5j0V75cqVTrXFtUNPk/itu3cU/V23rnTCqi9WK5vAe6S31+JJ5rkE2AitdYvAseHx6QSl7cJt6Vjahnf3GbRdWgs7HQskJ/W9XfiQHiaU1YoWPjFom4L9Hnj3Au9a1TWs0RitevNkiVt8vr7xNBZbvDjvg4M9NMBbMu9dOXHM+/0J3n56bpUJpCXepgmLsv1uZ2f/kNOq6bgNNo6bEZ2GTsCQM1GgE8D75zs3uzXKziuduIUFk7vBe0xKpcVT2i6xoxiYAjCFGh2VAN4K3FYqlClcgXj3wvSgadEF87xXo+w1WLeseL/2ETFA1nn39BFsNusZVmkIq27YPs3Nry4j3hcfb1i+0tquz285JidR9v6Hw0/Gm5F4d93UmFwU/stPVzowC0spFffBXCWDSdeIBky7ReDjPLJ4bW1KvYnAb3X2wPYkbnPAWwMGUBQFWN1dfYYhg0aDES5Y38C7VhEh7B8zqLphNwQZp0GlUPX39BNbAgV27RFhGZ/m+R3Bru+HhZNdcg+rVIR1hPLlYlFmOVO4zDxHvJEvTlEW2T+vB1KWFezaEe8N4J33B54w8VjaoetqU5k8zqHuO/cUertAaVXdMN6pIOc2YyoFZk7EIimBxBVtCj3FOk3K9i5s0AZ+YMozqlESrM89TmBKDW4wGHBNr8HuoXCVzlbL1ihdP7JrKuUQNTHhoAwq1Zi2X/XQibpJC3uMMJXJVIE38BWyS16jSmWknGyCjoXiyxmu8PQS6xt4U+ANuifNDghY5J973BMk6WS9PseRPefevn77JPTs5SacJ2J00QELT0X4YKNW39MMToAZVnTD+qYDtK/Omw7RRVIHw2VixbJ9EPY37KEjsVMC3j24ERw8bT9mpOx2h0XXp7bAltdbt2sw/FajDsNwg37Iguwa7GDgCzj1Sq2BICykbXoa5rkKG/XlaPewRmWAExTaxwJxZnaWabTnz56HC+ecx96/A/+8nKoif61WSyB/rcRJ/jn4a1ZpQsB4v4XxXljMZOfg2AO8BzB4Pw/w7e/BzCyE6n4d2DUYT+ANPouQm4Hx1ikV2lFWTCds+m7YqYcnwbuzYMjlwJR9mgF0LChOmDDNsFPiLeZEmx7DrE5qWKdRqcBf02uVVtj+YdOi9H19Gk2fUmf2pZFdw0Y96Wmwaz3g7yB/TeQ31tfW1t4+P8azxWDh984lkn8+Ke7slCZJXyI3MwW8RToH/vmBbNc2N2H1PN2sVDaeLPCifXBAN2DxCM5hHNfDvu14gOMDpC+ZrHpIvZSV4sFxf6DDdWZW3C6yFp0W1w+S7qJg0SFvEzBg9sCmtOMjBwcGKUqvf2AXdxK2B/oB8B4do0M4+GMWqMDKUnrdAAl+KoZmAZiJdNE+rNOTnlLJNQJZmBZHfmq1UslmsxuLDZjzN5nn7WPH57GiG8a7XC7K/vk0Gu90Gngf1nlnCnC+3ahUKuuLhaobnZYmEwnB7qDsLjHhsVOUzb2d2eQTkzaITm77N7h6NFGtVBMuiqIcNpt3WnzsoCSAfpmGs3Xaa7fbJlmHw+5NcttuuwPqLSZcDgq8MLuNIscF1kZCazZSgm1yOjftlaR4cBfIeq67tM354YQ614iCnz6fN/LP2cewviGwm5FXhPxz1ieg8/fBB3m8wZ4vLEKnLjNvN6twPhZ3Kv5cOi2C98nl0mKxxD+NRMIFcCvEcjIQiYf5HRCCA3aY2fCnyxAvVfyRQLIMZyBIJUBhLvhUkiol0+VyrhBhwny6nM4FIoEckp9OlVAFaRSdnk4kSnDu3OZCkWClVCzn6FCALyUSZVFIiNM5+mkoik6ijXgaaMYbzXN03yKNAIEsOIXsOSUZd5TY2t+Xzt/c65fInj/LVDKrDDP7IlvxB+aW4mDjYoWNV29DIX8h+CQOCEfnCoFAND7LxOcKvB/MQYhZYSIxdD1QWHvDRCJBP+f3B/1VmJi/vp3PFyrJamUGXalEVlZWwugSJRKJhAJ0jp4LFwqhQCzk5/0wMV4svUATORyJMLPhQjAaioRmeJ6WMFMIR6OgFmn0WxbPW98H0n2KhL29346xJ6f29uq83yytQs3M6nqcAd4AJsIsrUUjoeg8vM08yn27nIejwSuGiceZlZW1bIXbXF1hovPowjQeij7JgGB+MRQKzgDvcDa7trm8nl9efgnZmQ1469mVpaUX8XCYmV2ZhSnCwQEr/xa6knm1nFmGWpl8hvOjS6pg8Bkkn+W5SiUDfMPh+Ty6dYR241BwjGfhuanhc74bSBeqB+gGsY537w5gHqAL1f39ffTdoJhZW3u9GI0yjNStcrWz8L7hSPxVFhFfeQNEK8i2LC29AsuazVZgRF+uLOVR8dry/NtNlMXxgYUAl6z4F1dnV1fB5j5/vjq7lM1uPo8zUANEoHfWlpZeZqS6sq8Z5rXUM1kmOsclpeHN8XzmBTOfqcCMyb969YqBIyKSyObz66sS5IFhns8XzuV99Lmg4fZc+nLwTgbiXYGaZ2BspXkYiqKOXc3Du+Whj7NAcJFh1v1cMpnkMvmXi3MSxyTvD66CN8FlMpsb+fU8UEIDFA9nkZEAxaiMeDxT2QzH4+tQX2YTVOGxmUHEYfeILm6CchbprVc4LhCjk0k+4M+Hw35owR8K5/No3S3noRG//+gTQ/1rxDn3yA28jz4YwGh/HPcj3tC11STNS+sJnjzHcRUO3qESjoT829t8AF2ISkuNL/gDMX8mw0ljE/DDCMcCAZD3B0JoScyieZJdYqTL1Dp4MATBIAp5PyigLzNzcxBJboMuJGCGcCEGlnc+GvXDPGA4HvqfT0pPLhgKHVfE198OwPPJlPccP1UiDsN7eHD06eTjqMtP4C3WakUxnS4BkGEupVLb1RSdFmtVns6VxFKuDkkknYbSbSmVLtVSOTq3U6rVtqEbktUqX+BriVo1kCodfewqSdVtp5A4ClNp6WaWh4Ii6JagcmiB5qu1WhKqqNWq/lJZLkCHFDGVqrdd+hSiePb3sWtje/sXwW+s2w2erNfrRqEUQ5hC16cQelweKJAyJQG3u570uT0uF4qAoCTpk3RdLOv2uk/CU1c7VgYJDyi7kaJHfqC63OjpQZW5Pd6pKa/LddQgqsN7Am7f+NDZ378fXQyEaWRkxGQaNZlQZMQ0ajab4Q8lRkdHR2SY6qUjn6Q/SoCCSaqEIEzmE6IfFY70RpGSVL1UgfSQ1JCeyYxewSTXOELUVUz1t/kIlGXUNvu9Q0dHBzoxQ3gPPepx6dFRL1N01X8+0NfXp2xEn7L3KNp7ASj7GtBUQ6n8tJmj1qR8WfujrPxWfWeo9PXCS3ff/MO/9fr+xo3/unnz5v379/8FuI/wi4zGeCPuNyu4kOj9T3GGxu/U0aD8w9njfRG0/r317zduSMzv32pF+A8ZrY2JBrQ2K2gmepZ2A85XaCp0C/0q7GzeFyLe0oJ+23dDQus3MtDvnL5piJ9As/wzcFr0mzNwuvSr87LqGS3ox4ff//HxbmltbZG5t7a2f4dw5btj1ON/a8C3Mv72Kb5tUPvu2wbZpkLN0KjRTObnf0pv/8d5Xzv+UWf9p5xfyzgR/7ffx5HsuQpfnsLXJ1DP/FThhMxXxzKff4v7GZ/x/wL/Awyly5c+a5S2AAAAAElFTkSuQmCC',
  'srkr': 'data:image/png;base64,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',
  'technipfmc': 'data:image/png;base64,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',
  'thub': 'data:image/png;base64,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',
  'visaka': 'data:image/png;base64,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',
};