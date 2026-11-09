import { useSearchParams, Link } from 'react-router-dom';

// ==========================================================================
//  1. DATA
//  Project listings for the upcoming Sapphire Residences and completed Srivari Meadows.
// ==========================================================================

const statuses = [
  { key: 'upcoming', label: 'Upcoming', long: 'Upcoming projects', blurb: 'Pre-launch projects open for early registration.', empty: 'No upcoming projects to show yet.' },
  { key: 'ongoing', label: 'Ongoing', long: 'Ongoing projects', blurb: 'Under construction or now selling. Ask for the latest site update.', empty: 'No ongoing projects right now.' },
  { key: 'completed', label: 'Completed', long: 'Completed projects', blurb: 'Ready to move in and handed-over communities.', empty: 'No completed projects to show yet.' },
];

const projects = [
  {
    "slug": "sapphire-residences",
    "status": "upcoming",
    "tag": "Upcoming",
    "name": "Sapphire Residences",
    "meta": [
      "Near ORR Exit 2, Hyderabad",
      "Luxury G+11 floor apartments",
      "1,900–2,750 sq ft"
    ],
    "summary": "Upcoming apartments with a clubhouse, high-speed lifts, landscaped gardens and easy access to ORR Exit 2.",
    "price": "Price on request",
    "priceNote": "Ask for launch details",
    "img": "/images/sapphire-residences.png"
  },
  {
    "slug": "ortus",
    "status": "upcoming",
    "tag": "Coming soon",
    "name": "Ortus",
    "meta": [
      "Narsingi, West Hyderabad",
      "3 BHK boutique residences",
      "1,720–2,150 sq ft"
    ],
    "summary": "Low-rise boutique residences with large balconies and private sky gardens. Details are under verification; register for first access.",
    "price": "Price at launch",
    "priceNote": "Builder price, zero brokerage",
    "img": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=75"
  },
  {
    "slug": "aurelia-skyline",
    "status": "upcoming",
    "tag": "Pre-launch",
    "name": "Aurelia Skyline",
    "meta": [
      "Kokapet, West Hyderabad",
      "3 & 4 BHK apartments",
      "1,650–2,400 sq ft"
    ],
    "summary": "High-rise residences with a sky deck, clubhouse and generous balconies. Register now for early access to launch details.",
    "price": "Price on request",
    "priceNote": "Builder price, zero brokerage",
    "img": "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1000&q=75"
  },
  {
    "slug": "verdant-courtyard-villas",
    "status": "upcoming",
    "tag": "Pre-launch",
    "name": "Verdant Courtyard Villas",
    "meta": [
      "Kompally, North Hyderabad",
      "4 BHK courtyard villas",
      "3,200–3,900 sq ft"
    ],
    "summary": "Gated villas built around private courtyards, with a clubhouse, wide internal roads and plenty of greenery.",
    "price": "Price on request",
    "priceNote": "Builder price, zero brokerage",
    "img": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=75"
  },
  {
    "slug": "lakeside-residences",
    "status": "ongoing",
    "tag": "Under construction",
    "name": "Lakeside Residences",
    "meta": [
      "Himayat Sagar Road, South Hyderabad",
      "2 & 3 BHK apartments",
      "1,150–1,750 sq ft"
    ],
    "summary": "Lake-facing apartments with a landscaped podium, co-working lounge and kids’ zone. Ask us for the latest site update.",
    "price": "Price on request",
    "priceNote": "Builder price, zero brokerage",
    "img": "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&w=1000&q=75"
  },
  {
    "slug": "palm-grove-plots",
    "status": "ongoing",
    "tag": "Now selling",
    "name": "Palm Grove Plots",
    "meta": [
      "Ghatkesar, East Hyderabad",
      "Gated open plots",
      "200–400 sq yds"
    ],
    "summary": "Gated plotted layout with wide roads, avenue plantation and underground utilities. Ask us for approvals and title documents.",
    "price": "Price on request",
    "priceNote": "Builder price, zero brokerage",
    "img": "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=75"
  },
  {
    "slug": "orchid-enclave",
    "status": "ongoing",
    "tag": "Under construction",
    "name": "Orchid Enclave",
    "meta": [
      "Shamshabad, South Hyderabad",
      "3 & 4 BHK villas",
      "1,950–2,600 sq ft"
    ],
    "summary": "A gated villa community near the airport corridor, with a clubhouse, tree-lined streets and private gardens.",
    "price": "Price on request",
    "priceNote": "Builder price, zero brokerage",
    "img": "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1000&q=75"
  },
  {
    "slug": "srivari-meadows",
    "status": "completed",
    "tag": "Ready to move",
    "name": "Srivari Meadows",
    "meta": [
      "Mokila, Hyderabad",
      "4 BHK villas, G+2",
      "4,254–5,000 sq ft"
    ],
    "summary": "117 villas on 14 acres by Vara Prasad Constructions. Lift, home theatre and terrace garden in every villa. 100% Vaastu. TG-RERA P02400004825.",
    "price": "₹5 Cr onwards",
    "priceNote": "Builder price, zero brokerage",
    "img": "/images/srivari-card.jpg"
  },
  {
    "slug": "maple-court",
    "status": "completed",
    "tag": "Handed over",
    "name": "Maple Court",
    "meta": [
      "Begumpet, Central Hyderabad",
      "3 BHK apartments",
      "1,400–1,650 sq ft"
    ],
    "summary": "A gated apartment community now home to settled families. Ask us about resale and rental options.",
    "price": "Resale on request",
    "priceNote": "Ask us for current availability",
    "img": "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1000&q=75"
  },
  {
    "slug": "sunrise-greens",
    "status": "completed",
    "tag": "Ready to move",
    "name": "Sunrise Greens",
    "meta": [
      "Tellapur, West Hyderabad",
      "Duplex villas",
      "2,600–3,200 sq ft"
    ],
    "summary": "Ready-to-occupy duplex villas in a green gated community with a clubhouse, jogging track and play areas.",
    "price": "Price on request",
    "priceNote": "Ask us for current availability",
    "img": "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1000&q=75"
  }
].filter((project) => ['sapphire-residences', 'srivari-meadows'].includes(project.slug));

// ==========================================================================
//  2. ICONS + IMAGE HELPER
// ==========================================================================

const ICONS = {
  arrow: 'M5 12h14M13 6l6 6-6 6',
  up: 'M7 17L17 7M8 7h9v9',
  check: 'M5 12.5l4.5 4.5L19 7.5',
  pin: 'M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  home: 'M3 11l9-8 9 8M5 10v10h14V10M10 20v-6h4v6',
  ruler: 'M3 17L17 3l4 4L7 21zM8 12l2 2M11 9l2 2M14 6l2 2',
};

function Icon({ name, size = 20, stroke = 1.8 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={ICONS[name] || ICONS.check} />
    </svg>
  );
}

// Image over a soft gradient, so a missing photo never leaves a blank hole
function Img({ src, alt = '', className = '', fallback }) {
  const external = /^https?:/.test(src || '');
  return (
    <div className={`ph ${className}`}>
      {src && (
        <img src={src} alt={alt} loading="lazy" referrerPolicy="no-referrer" className={external ? 'vivid' : undefined}
          onError={(e) => {
            const el = e.currentTarget;
            if (fallback && !el.dataset.fb) { el.dataset.fb = '1'; el.classList.remove('vivid'); el.src = fallback; }
            else el.style.display = 'none';
          }} />
      )}
    </div>
  );
}

// ==========================================================================
//  3. COMPONENTS
// Srivari Meadows project card and Completed tab.
// ==========================================================================

function ProjectCard({ p, index = 0 }) {
  const [place, type, size] = p.meta;
  const tone = p.status === 'completed' ? 'done' : p.status === 'ongoing' ? 'live' : 'soon';
  return (
    <Link to={`/projects/${p.slug}`} className={`pc pc-${tone}`} aria-label={`${p.name}, view project`}>
      <div className="pc-media">
        <Img src={p.img} alt="" />
        <span className="pc-shade" />
        <span className="pc-tag"><i />{p.tag}</span>
        <span className="pc-no">0{index + 1}</span>
        <span className="pc-place"><Icon name="pin" size={15} /> {place}</span>
      </div>
      <div className="pc-body">
        <h3>{p.name}</h3>
        <p className="pc-sum">{p.summary}</p>
        <dl className="pc-stats">
          <div><dt><Icon name="home" size={15} /> Type</dt><dd>{type}</dd></div>
          <div><dt><Icon name="ruler" size={15} /> Size</dt><dd>{size}</dd></div>
        </dl>
        <div className="pc-foot">
          <div><strong>{p.price}</strong><small>{p.priceNote}</small></div>
          <span className="pc-go" aria-hidden="true"><Icon name="up" size={20} /></span>
        </div>
      </div>
    </Link>
  );
}

// Three-way project switcher: segmented tabs with counts, 3 cards per tab
function ProjectTabs({ value, onChange, limit }) {
  const list = projects.filter((p) => p.status === value).slice(0, limit);
  const cur = statuses.find((s) => s.key === value);
  return (
    <div className="ptabs">
      <div className="seg" role="tablist" aria-label="Project status">
        {statuses.map((s) => (
          <button key={s.key} role="tab" aria-selected={value === s.key}
            className={value === s.key ? 'on' : ''} onClick={() => onChange(s.key)}>
            {s.label}<em>{projects.filter((p) => p.status === s.key).length}</em>
          </button>
        ))}
      </div>
      <p className="seg-blurb">{cur.blurb}</p>
      {list.length ? (
        <div className="pgrid" role="tabpanel" key={value}>{list.map((p, n) => <ProjectCard key={p.slug} p={p} index={n} />)}</div>
      ) : (
        <div className="empty" role="tabpanel">
          <p>{cur.empty}</p>
          <Link to="/contact" className="link">Tell us what you need <Icon name="arrow" size={16} /></Link>
        </div>
      )}
    </div>
  );
}

// ==========================================================================
//  4. PAGE
// ==========================================================================

export default function Projects() {
  const [params, setParams] = useSearchParams();
  const q = params.get('status');
  const status = statuses.some((s) => s.key === q) ? q : 'completed';
  return (
    <>
      <style>{CSS}</style>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow gold"><span />Our portfolio</p>
          <h1>Projects we <em>represent</em></h1>
          <p className="page-hero-lead">Explore Sapphire Residences, an upcoming apartment community, and Srivari Meadows, a completed villa community in Mokila.</p>
        </div>
      </section>
      <section className="section container projects-sec">
        <ProjectTabs value={status} onChange={(k) => setParams({ status: k })} />
      </section>
    </>
  );
}

// ==========================================================================
//  DESIGN. PROJECTS PAGE DESIGN
//  All styling for this file lives here (injected with <style>).
// ==========================================================================
const CSS = `
.card{background:#fff;border-radius:20px;overflow:hidden;box-shadow:var(--shadow);display:flex;flex-direction:column;transition:transform .25s}
.card:hover{transform:translateY(-4px)}
.ph{background:linear-gradient(135deg,#c9dbe8,#a9bfd1);aspect-ratio:4/3;overflow:hidden}
.ph img{width:100%;height:100%;object-fit:cover}
.empty{background:#fff;border-radius:20px;padding:44px 24px;text-align:center;box-shadow:var(--shadow);display:grid;gap:10px;justify-items:center;color:var(--muted)}
.meta{display:flex;flex-wrap:wrap;gap:4px 14px;font-size:.88rem;color:var(--muted)}
.meta span+span{border-left:1px solid var(--line);padding-left:14px}
.soon .ph{background:linear-gradient(135deg,var(--navy),#0f2238)}
.ph img.vivid{filter:saturate(1.2) contrast(1.04);transition:transform .8s cubic-bezier(.22,.8,.25,1)}
.card:hover .ph img.vivid{transform:scale(1.06)}
.eyebrow.gold{color:var(--gold)}
.page-hero h1 em{color:var(--navy)}
@keyframes fadeup{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
.page-hero{position:relative;overflow:hidden;text-align:center;color:#fff;padding:calc(var(--nav-top) + var(--nav-h) + clamp(56px,8vw,104px)) 0 clamp(90px,11vw,140px);background:radial-gradient(800px 420px at 80% 20%,rgba(70,110,160,.3),transparent 70%),linear-gradient(135deg,#14233b,#0f2238 62%,#1a3556)}
.page-hero::before{content:'';position:absolute;right:-8vw;top:-18%;width:46vw;aspect-ratio:1;border-radius:50%;border:1px solid rgba(210,184,143,.25);box-shadow:inset 0 0 0 60px rgba(210,184,143,.03)}
.page-hero .container{position:relative}
.page-hero h1{color:#fff;font-size:clamp(2.8rem,7vw,5.2rem);font-weight:500}
.page-hero h1 em{color:var(--gold)}
.page-hero-lead{max-width:600px;margin:16px auto 0;color:rgba(255,255,255,.78);font-size:1.08rem}
.projects-sec{position:relative;z-index:2;padding-top:0;margin-top:-34px}
.ptabs{display:flex;flex-direction:column;align-items:center}
.seg{display:inline-flex;gap:4px;padding:6px;background:#fff;border:1px solid var(--line);border-radius:999px;box-shadow:var(--shadow);max-width:100%}
.seg button{display:inline-flex;align-items:center;gap:10px;border:0;background:none;padding:12px 28px;border-radius:999px;font-weight:600;font-size:.98rem;color:var(--muted);cursor:pointer;transition:background .25s,color .25s}
.seg button:hover{color:var(--navy)}
.seg button.on{background:var(--deep2);color:#fff}
.seg em{font-style:normal;font-size:.76rem;border-radius:99px;padding:1px 9px;background:rgba(33,69,111,.1)}
.seg .on em{background:var(--gold);color:var(--deep)}
.seg-blurb{margin:18px 0 38px;color:var(--muted);text-align:center;max-width:520px}
.pgrid{width:100%;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:28px;animation:fadeup .6s both}
.pc{position:relative;display:flex;flex-direction:column;background:#fff;border:1px solid rgba(33,69,111,.08);border-radius:24px;overflow:hidden;box-shadow:0 14px 40px rgba(20,35,59,.1);transition:transform .45s cubic-bezier(.2,.7,.2,1),box-shadow .45s}
.pc:hover{transform:translateY(-8px);box-shadow:0 30px 64px rgba(20,35,59,.2)}
.pc-media{position:relative;aspect-ratio:4/3.3;overflow:hidden;background:linear-gradient(135deg,#21456f,#0f2238)}
.pc-media .ph{position:absolute;inset:0;aspect-ratio:auto;background:transparent}
.pc-media img{transition:transform 1.1s cubic-bezier(.2,.7,.2,1)}
.pc:hover .pc-media img{transform:scale(1.08)}
.pc-shade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(15,34,56,.3) 0%,transparent 34%,rgba(15,34,56,.88) 100%)}
.pc-tag{position:absolute;top:16px;left:16px;display:inline-flex;align-items:center;gap:8px;padding:7px 14px;border-radius:999px;background:rgba(255,255,255,.96);color:var(--navy);font-size:.78rem;font-weight:700}
.pc-tag i{width:8px;height:8px;border-radius:50%;background:var(--tan)}
.pc-done .pc-tag i{background:#1f9d55}
.pc-live .pc-tag i{background:#e08a1e}
.pc-soon .pc-tag i{background:#3b82c4}
.pc-no{position:absolute;top:10px;right:20px;font-family:var(--serif);font-style:italic;font-size:2.6rem;color:rgba(255,255,255,.6);line-height:1}
.pc-place{position:absolute;left:18px;right:18px;bottom:16px;display:flex;gap:7px;align-items:center;color:#fff;font-weight:500;font-size:.93rem}
.pc-place svg{color:var(--gold);flex:none}
.pc-body{display:flex;flex-direction:column;gap:14px;flex:1;padding:24px 24px 22px}
.pc-body h3{font-size:2.05rem;font-weight:600;line-height:1.05}
.pc-sum{color:var(--muted);font-size:.95rem;line-height:1.6;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
.pc-stats{display:grid;grid-template-columns:1fr 1fr;border:1px solid var(--line);border-radius:14px;background:#f6f9fb}
.pc-stats>div{padding:12px 14px;min-width:0}
.pc-stats>div+div{border-left:1px solid var(--line)}
.pc-stats dt{display:flex;align-items:center;gap:6px;font-size:.7rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--tan)}
.pc-stats dd{font-weight:600;font-size:.92rem;margin-top:3px;line-height:1.35}
.pc-foot{margin-top:auto;display:flex;align-items:center;justify-content:space-between;gap:12px;padding-top:16px;border-top:1px solid var(--line)}
.pc-foot strong{display:block;font-family:var(--serif);font-size:1.5rem;font-weight:600;color:var(--navy);line-height:1.1}
.pc-foot small{color:#1f9d55;font-weight:500;font-size:.82rem}
.pc-go{flex:none;width:48px;height:48px;border-radius:50%;background:var(--navy);color:#fff;display:grid;place-items:center;transition:background .3s,color .3s,transform .3s}
.pc:hover .pc-go{background:var(--gold);color:var(--deep);transform:translate(3px,-3px)}
@media (max-width:1000px){
  .pgrid{grid-template-columns:1fr;gap:22px}
  .pc{flex-direction:row}
  .pc-media{width:44%;flex:none;aspect-ratio:auto;min-height:340px}
}
@media (max-width:640px){
  .seg{display:flex;width:100%}
  .seg button{flex:1;justify-content:center;padding:12px 8px;font-size:.88rem;gap:6px}
  .pc{flex-direction:column}
  .pc-media{width:100%;aspect-ratio:4/3.1;min-height:0}
  .pc-body{padding:20px 20px 18px}
  .pc-body h3{font-size:1.85rem}
  .page-hero{padding-bottom:84px}
}
`;
