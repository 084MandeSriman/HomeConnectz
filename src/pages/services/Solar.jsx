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

/* NOTE: keep this export — the Services listing page imports it.      */
export const SERVICE = {
  id: 'solar',
  title: 'Solar',
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
    image: IMG + 'solution-grid.jpg',
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
    image: IMG + 'solution-offgrid.jpg',
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
    image: IMG + 'solution-utility.jpg',
    caption: 'Ground-mounted solar plant',
    eyebrow: 'Plant construction services',
    title: 'Utility-scale plants, built and kept running',
    text: 'From engineering through commissioning and long-term operation, we support solar plants at megawatt scale.',
    lists: [{ heading: 'What we deliver', items: ['Complete engineering, testing & commissioning services', 'Operations & maintenance'] }],
  },
  {
    id: 'rural',
    label: 'Rural electrification',
    image: IMG + 'solution-rural.jpg',
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
  phone: '+91 98663 84827',
  phoneHref: 'tel:+91 98663 84827',
  web: 'www.heliosenergy.in',
  webHref: 'https://www.heliosenergy.in',
  email: 'homeconnectzmarketing@gmail.com',
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
.solar-page{padding-top:0!important;padding-bottom:clamp(20px,3vw,36px)!important;--ink:var(--navy,#21456f);--mute:var(--muted,#5d6b7c);--acc:var(--accent,#355d83);--g1:#dcebf8;--g2:#aecbe6;--night:var(--deep,#0f2238);--line:rgba(33,69,111,.16);--ease:cubic-bezier(.2,.7,.2,1)}
.solar-page *{box-sizing:border-box}
.solar-page img{display:block;max-width:100%}
.solar-page button{font:inherit;color:inherit;cursor:pointer}
.solar-page p{color:var(--mute);line-height:1.7}
.solar-page h2{margin-bottom:12px;font-size:clamp(1.9rem,3.2vw,2.7rem);line-height:1.12}
.solar-page h2 em{color:var(--acc)}
.solar-page h3{margin-bottom:8px}
.solar-page .eyebrow{margin-bottom:10px;color:var(--acc);font-size:.76rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase}
.solar-page .ico{width:1em;height:1em;flex:none;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}
.solar-page .section{display:grid;gap:24px;margin-top:clamp(24px,3vw,40px);padding:0;scroll-margin-top:120px}
.solar-page .hero+.section{margin-top:0;padding-top:clamp(24px,3vw,40px)}
.solar-page .split{display:grid;grid-template-columns:.85fr 1.4fr;gap:clamp(26px,5vw,72px);align-items:start}
.solar-page .split>*{min-width:0}
.solar-page .sec-head{max-width:760px}
.solar-page .sec-head p{font-size:1.05rem}

/* page-level: lets the hero run edge to edge without a sideways scrollbar */
html,body{overflow-x:clip}

/* reveal */
.solar-page .rv{opacity:0;transform:translateY(28px);transition:opacity .9s var(--ease) var(--d,0ms),transform .9s var(--ease) var(--d,0ms)}
.solar-page .rv.in{opacity:1;transform:none}

/* Hero intro */
.solar-page .intro{position:relative;display:flex;flex-direction:column;align-items:center;width:min(880px,calc(100% - 32px));text-align:center}
.solar-page .intro>*{animation:s-up 1s var(--ease) both}
.solar-page .intro>*:nth-child(2){animation-delay:.08s}
.solar-page .intro>*:nth-child(3){animation-delay:.16s}
.solar-page .intro>*:nth-child(4){animation-delay:.26s}
.solar-page .intro>*:nth-child(5){animation-delay:.36s}
.solar-page .intro h1{margin-bottom:16px;color:#fff}
.solar-page .hero .intro .lede{color:#fff!important}
.solar-page .lede{max-width:700px;font-size:clamp(1rem,1.5vw,1.18rem)}
.solar-page .hero-tags{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin-top:20px}
.solar-page .hero-tags span{padding:8px 14px;border:1px solid rgba(255,255,255,.55);border-radius:999px;background:rgba(15,34,56,.42);color:#fff;font-size:.84rem;font-weight:600}
.solar-page .btn{display:inline-flex;align-items:center;gap:10px;padding:13px 22px;border:1px solid transparent;border-radius:999px;background:linear-gradient(135deg,var(--g1),var(--g2));color:#1b2b40;font-weight:700;font-size:.94rem;transition:transform .3s var(--ease),box-shadow .3s}
.solar-page .btn:hover{transform:translateY(-2px);box-shadow:0 14px 30px rgba(0,0,0,.2)}
.solar-page .btn.ghost{border-color:var(--ink);background:transparent;color:var(--ink)}

/* hero: full screen, edge to edge, one image */
.solar-page .hero{position:relative;isolation:isolate;display:grid;place-items:center;width:100vw;margin-left:calc(50% - 50vw);min-height:100vh;min-height:100svh;padding:calc(var(--nav-top) + var(--nav-h) + 36px) 0 48px;background:var(--night)}
.solar-page .hero>img{position:absolute;inset:0;width:100%;height:100%;max-width:none;object-fit:cover;object-position:center}
#solar-process{scroll-margin-top:calc(var(--nav-top) + var(--nav-h) + 16px)}

/* stats */
.solar-page .stats{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;width:100%;margin-top:clamp(20px,3vw,32px);text-shadow:none}
.solar-page .stat{padding:clamp(12px,2vw,20px) 8px;border:1px solid rgba(255,255,255,.65);border-radius:16px;background:rgba(255,255,255,.78);backdrop-filter:blur(8px)}
.solar-page .stat strong{display:block;font-size:clamp(1.4rem,3vw,2.5rem);font-weight:600;line-height:1.05;color:var(--ink)}
.solar-page .stat>span{display:block;margin-top:8px;color:var(--mute);font-size:.92rem}

/* image frame: the picture sits INSIDE the border, edge to edge */
.solar-page .frame{position:relative;margin:0;padding:10px;border:1.5px solid rgba(53,93,131,.6);border-radius:30px;background:rgba(255,255,255,.55)}
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
.solar-page .about{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:clamp(18px,3vw,40px);align-items:stretch}
.solar-page .about>*{min-width:0}
.solar-page .about .frame{height:100%;min-height:300px;padding:0;border:0;border-radius:0;background:none}
.solar-page .about .frame>button{position:absolute;inset:0;border-radius:0}
.solar-page .about .frame img{height:100%;aspect-ratio:auto;border-radius:0}
.solar-page .checks{display:grid;gap:12px;margin:18px 0 0;padding:0;list-style:none}
.solar-page .checks li{display:flex;align-items:flex-start;gap:12px;color:var(--ink);font-weight:500;line-height:1.5}
.solar-page .checks .ico{width:22px;height:22px;margin-top:1px;padding:3px;border-radius:50%;background:rgba(53,93,131,.2);color:var(--acc)}
.solar-page .pillars{display:grid;grid-template-columns:repeat(4,1fr);gap:0;margin-top:30px;border-top:1px solid var(--line)}
.solar-page .pillar{padding:18px 16px 0 0}
.solar-page .pillar .ico{width:26px;height:26px;color:var(--acc)}
.solar-page .pillar b{display:block;margin:8px 0 2px;color:var(--ink)}
.solar-page .pillar span{color:var(--mute);font-size:.86rem;line-height:1.5}

/* process */
.solar-page .steps{position:relative;display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:18px;margin-top:12px}
.solar-page .steps::before{content:'';position:absolute;left:8%;right:8%;top:35px;height:2px;background:linear-gradient(90deg,var(--g1),var(--acc));transform:scaleX(0);transform-origin:left;transition:transform 1.8s var(--ease) .2s}
.solar-page .steps.in::before{transform:scaleX(1)}
.solar-page .step{position:relative;text-align:center}
.solar-page .node{position:relative;display:grid;place-items:center;width:70px;height:70px;margin:0 auto 16px;border:2px solid var(--acc);border-radius:50%;background:#fff;color:var(--ink);font-size:1.6rem;transition:background .35s,color .35s}
.solar-page .node::after{content:attr(data-n);position:absolute;top:-6px;right:-6px;display:grid;place-items:center;width:24px;height:24px;border-radius:50%;background:var(--ink);color:#fff;font-size:.7rem;font-weight:700}
.solar-page .step:hover .node{background:linear-gradient(135deg,var(--g1),var(--g2));color:#1b2b40}
.solar-page .step h3{font-size:1rem;line-height:1.3}
.solar-page .step p{font-size:.88rem;line-height:1.55}
@media(max-width:1100px){
  .solar-page .steps{grid-template-columns:repeat(3,minmax(0,1fr));row-gap:34px}
  .solar-page .steps::before{display:none}
}
@media(max-width:640px){
  .solar-page .steps{grid-template-columns:1fr;gap:0}
  .solar-page .steps::before{display:block;left:34px;right:auto;top:30px;bottom:30px;width:2px;height:auto;transform:scaleY(0);transform-origin:top}
  .solar-page .steps.in::before{transform:scaleY(1)}
  .solar-page .step{display:grid;grid-template-columns:70px 1fr;gap:18px;padding-bottom:28px;text-align:left}
  .solar-page .node{margin:0}
}
@media(prefers-reduced-motion:reduce){
  .solar-page .steps::before{transform:none}
}

/* solutions */
.solar-page .solar-solutions{gap:16px}
.solar-page .tabs{display:flex;flex-wrap:wrap;gap:8px}
.solar-page .tab{min-height:42px;padding:8px 16px;border:1px solid var(--line);border-radius:999px;background:#fff;color:var(--navy);font-weight:600;transition:background .25s,color .25s}
.solar-page .tab:hover,.solar-page .tab[aria-selected=true]{background:var(--navy);color:#fff}
.solar-page .panel{display:grid;grid-template-columns:minmax(0,4fr) minmax(0,5fr);gap:clamp(14px,2.8vw,32px);align-items:center;margin-top:14px;padding:clamp(12px,2vw,24px);border-radius:20px;background:#f6f3ee;animation:s-fadeup .5s var(--ease)}
.solar-page .panel>*{min-width:0}
.solar-page .panel .frame{padding:0;border:0;background:none}
.solar-page .panel .eyebrow{margin-bottom:6px}
.solar-page .panel h3{margin:0 0 8px}
.solar-page .segs{display:flex;flex-wrap:wrap;gap:6px;margin:12px 0 0}
.solar-page .seg{display:inline-flex;align-items:center;gap:8px;padding:9px 16px;border-radius:999px;background:rgba(33,69,111,.08);color:var(--ink);font-weight:600;font-size:.92rem}
.solar-page .seg .ico{color:var(--acc)}
.solar-page .lists{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:22px 30px;margin-top:20px}
.solar-page .lists h4{margin:0 0 4px;color:var(--ink);font-size:.8rem;letter-spacing:.14em;text-transform:uppercase}
.solar-page .flow{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;margin-top:14px}
.solar-page .flow-node{padding:8px 4px;border-radius:10px;background:#fff;text-align:center}
.solar-page .flow-ico{display:grid;place-items:center;width:34px;height:34px;margin:0 auto 4px;border-radius:50%;background:var(--navy);color:#fff;font-size:1.1rem}
.solar-page .flow-node b{display:block;color:var(--ink);font-size:.95rem}
.solar-page .flow-node span{display:block;color:var(--mute);font-size:.8rem;line-height:1.4}


/* partners */
.solar-page .section.solar-contact{background:#fff}
.solar-page .solar-beige{position:relative;isolation:isolate}
.solar-page .solar-beige::before{content:'';position:absolute;inset:0 auto 0 50%;width:100vw;transform:translateX(-50%);z-index:-1;background:#f4efe7}
.solar-page .section.solar-process{margin-top:0;padding:clamp(24px,3vw,40px) 0}
.solar-page .section.solar-partners,.solar-page .section.solar-values{gap:16px;padding:clamp(20px,2.5vw,32px) 0}
.solar-page .section.solar-values{margin-top:0}
.solar-page .partners{display:grid;grid-template-columns:1fr 1fr;gap:0;border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
.solar-page .partner{display:grid;align-content:start;gap:8px;padding:clamp(12px,2vw,24px)}
.solar-page .partner+.partner{border-left:1px solid var(--line)}
.solar-page .logo-box{display:grid;place-items:center;height:80px;border-radius:12px;background:#fff;border:1px solid var(--line)}
.solar-page .logo-box img{max-height:60px;width:auto;mix-blend-mode:multiply}
.solar-page .partner h3{margin:2px 0 0;color:var(--ink)}
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

/* leadership */
.solar-page .leaders{display:grid;grid-template-columns:1fr 1fr;gap:clamp(24px,5vw,72px)}
.solar-page .leader{display:grid;grid-template-columns:132px 1fr;gap:24px;align-items:start}
.solar-page .avatar{width:132px;height:132px;border-radius:50%;padding:5px;border:1.5px solid rgba(53,93,131,.6);background:rgba(255,255,255,.55)}
.solar-page .avatar img{width:100%;height:100%;border-radius:50%;object-fit:cover}
.solar-page .leader h3{margin:0;font-size:1.5rem;color:var(--ink)}
.solar-page .leader .role{margin:2px 0 10px;color:var(--acc);font-weight:600;font-size:.92rem}
.solar-page .leader p:last-child{margin:0;font-size:.95rem}

/* contact (plain section, light lines) */
.solar-page .section.solar-contact{margin-top:clamp(20px,2.5vw,32px);padding-top:clamp(20px,2.5vw,32px)}
.solar-page .solar-contact .split{gap:clamp(14px,3vw,36px);grid-template-columns:minmax(0,1.2fr) minmax(0,1fr);align-items:center}
.solar-page .cta-row{display:flex;flex-wrap:wrap;gap:10px;margin-top:14px}
.solar-page .solar-contact .cta-row .btn:not(.ghost){background:var(--navy);color:#fff}
.solar-page .reach{display:grid;margin:0;padding:4px 14px;list-style:none;border:1px solid var(--line);border-radius:16px;background:#fff}
.solar-page .reach li{display:flex;gap:12px;align-items:center;padding:9px 0;color:var(--ink)}
.solar-page .reach li+li{border-top:1px solid var(--line)}
.solar-page .reach .ico{width:34px;height:34px;padding:8px;background:var(--navy);border-radius:50%;color:#fff}
.solar-page .reach small{display:block;color:var(--mute);font-size:.76rem;letter-spacing:.12em;text-transform:uppercase}
.solar-page .reach a{color:var(--ink);font-weight:600;text-decoration:underline;text-decoration-color:rgba(53,93,131,.6);text-underline-offset:3px;word-break:break-word}

@keyframes s-up{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
@keyframes s-fadeup{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}

@media(max-width:1100px){
  .solar-page .solar-contact .split{grid-template-columns:1fr}
}
@media(max-width:860px){
  .solar-page .about,.solar-page .panel,.solar-page .leaders,.solar-page .vm,.solar-page .partners{grid-template-columns:1fr}
  .solar-page .about .frame{height:auto;min-height:0;aspect-ratio:4/3}
  .solar-page .partner+.partner{border-left:0;border-top:1px solid var(--line)}
  .solar-page .stats{grid-template-columns:1fr 1fr}
  .solar-page .pillars{grid-template-columns:1fr 1fr}
}
@media(max-width:640px){
  .solar-page .cta-row .btn{flex:1 1 100%;justify-content:center}
  .solar-page .frame{padding:7px;border-radius:24px}
  .solar-page .frame>button,.solar-page .frame img{border-radius:17px}
  .solar-page .cap{left:16px;bottom:16px;max-width:calc(100% - 32px)}
  .solar-page .flow{grid-template-columns:repeat(2,minmax(0,1fr))}
  .solar-page .leader{grid-template-columns:1fr;justify-items:start}
}
@media(prefers-reduced-motion:reduce){
  .solar-page *,.solar-page *::before,.solar-page *::after{animation:none!important;transition:none!important}
  .solar-page .rv{opacity:1;transform:none}
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

/* A framed picture: sits inside its blue border and opens in the viewer when clicked. */
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
        <Pic src={item.image} fallback={[STOCK.array, SERVICE.fallback]} alt={item.caption} caption={item.caption} ratio="4 / 3" onOpen={onOpen} />
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
              {GRID_BENEFITS.map((b) => (
                <div className="flow-node" key={b.title}>
                  <div className="flow-ico">
                    <Icon name={b.icon} />
                  </div>
                  <b>{b.title}</b>
                  <span>{b.text}</span>
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

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function Solar() {
  const [lb, setLb] = useState(null);
  const open = useCallback((items, index) => setLb({ items, index }), []);
  const close = useCallback(() => setLb(null), []);
  const setIndex = useCallback((index) => setLb((st) => (st ? { ...st, index } : st)), []);

  return (
    <section className="section container solar-page">
      <style>{CSS}</style>

      <header className="hero">
        <ServiceImage src={IMG + 'hero.jpg'} fallback={[STOCK.field, SERVICE.image, IMG + 'about.jpg', SERVICE.fallback]} alt="Solar panels at sunset" eager />
        <div className="intro">
          <h1>Solar panels</h1>
          <p className="lede">{SERVICE.summary}</p>
          <div className="hero-tags">
            <span>Grid-connected</span>
            <span>Off-grid &amp; hybrid</span>
            <span>Utility-scale</span>
            <span>Rural electrification</span>
          </div>
          <div className="stats">
            {STATS.map((s, i) => (
              <Reveal className="stat" key={s.label} delay={i * 120}>
                <strong>{s.text ? s.text : <Counter to={s.to} suffix={s.suffix} />}</strong>
                <span>{s.label}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </header>

      {/* About */}
      <div className="section about solar-beige">
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
      <div className="section solar-process solar-beige" id="solar-process">
        <Reveal className="sec-head">
          <p className="eyebrow">How it works</p>
          <h2>Our solar <em>process</em></h2>
          <p>Six clear steps take you from a site visit to a plant that generates, and keeps generating.</p>
        </Reveal>
        <InView className="steps">
          {PROCESS.map((stage, index) => (
            <Reveal className="step" key={stage.icon} delay={index * 140}>
              <div className="node" data-n={index + 1} aria-hidden="true">
                <Icon name={stage.icon} />
              </div>
              <div>
                <h3>{stage.title}</h3>
                <p>{stage.text}</p>
              </div>
            </Reveal>
          ))}
        </InView>
      </div>

      {/* Solutions */}
      <div className="section solar-solutions">
        <Reveal className="sec-head">
          <h2>
            Solar solutions for <em>every need</em>
          </h2>
          <p>Whether it is a villa rooftop, a factory, a remote farm or a megawatt plant, there is a system designed for it.</p>
        </Reveal>
        <Reveal>
          <Solutions onOpen={open} />
        </Reveal>
      </div>

      {/* Partners */}
      <div className="section solar-partners solar-beige">
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
      <div className="section solar-values solar-beige">
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

      {/* Leadership */}
      {/* <div className="section">
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
      </div> */}

      {/* Contact */}
      <div className="section solar-contact">
        <div className="split">
          <Reveal>
            <h2>
              Ready to <em>explore solar?</em>
            </h2>
            <p>Plan a solar system for your home, business or community with our team.</p>
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
