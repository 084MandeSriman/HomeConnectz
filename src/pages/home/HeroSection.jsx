import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

/* ==========================================================================
   HomeConnectz · HeroSection.jsx  (single file: data + icons + component + CSS)

   Drop-in replacement for  src/pages/home/HeroSection.jsx
   - No other file is needed. It only imports react and react-router-dom.
   - Uses the colour variables already defined in App.jsx
     (--deep, --deep2, --gold, --serif, --sans, --nav-h, --nav-top).
   - Every CSS class starts with "hx-", so it cannot clash with home.css.
     (The old .hero-* rules in home.css are no longer used and can be deleted.)

   WHERE TO EDIT
   1. SITE        -> phone number
   2. HEADLINE    -> main heading, paragraph and the two buttons
   3. CATEGORIES  -> the 4 expanding cards (image, text, link)
   4. FEATURED    -> the 3 featured project chips
   5. STATS       -> the numbers in the bottom bar
   6. AUTOPLAY_MS -> how fast the cards change by themselves
   ========================================================================== */

// ==========================================================================
//  1. DATA
// ==========================================================================

const SITE = { phone: '+91 98663 84827', tel: '+919866384827' };

const AUTOPLAY_MS = 6000;

const HEADLINE = {
  eyebrow: 'HomeConnectz · Hyderabad',
  before: 'Homes, workspaces, granite and solar, ',
  accent: 'built to last.',
  text:
    'Residential and commercial properties from verified developers, premium granite and rooftop solar, delivered by one trusted team.',
  primary: { label: 'Explore projects', to: '/projects' },
  secondary: { label: 'Talk to our team', to: '/contact' },
};

// The four expanding cards. Add, remove or reorder freely.
const CATEGORIES = [
  {
    id: 'residential',
    icon: 'home',
    label: 'Residential',
    tagline: 'Homes you can trust',
    text: 'Villas, apartments and plots from verified builders, with guided site visits and loan support.',
    points: ['Verified projects and builders', 'Guided site visits', 'Loan and registration help'],
    stat: ['0%', 'brokerage for buyers'],
    cta: 'View projects',
    to: '/projects',
    img: '/images/praneeta/villa-main.jpg',
    pos: '50% 50%',
  },
  {
    id: 'commercial',
    icon: 'building',
    label: 'Commercial',
    tagline: 'Spaces that work for business',
    text: 'Offices, retail, warehouses and commercial land, with due diligence and finance support.',
    points: ['Offices and retail spaces', 'Warehouses and land', 'Due diligence and finance help'],
    stat: ['1', 'team, start to finish'],
    cta: 'Explore commercial',
    to: '/services/residential',
    img: '/images/services/cards/residential-commercial.jpg',
    pos: '50% 40%',
  },
  {
    id: 'granite',
    icon: 'layers',
    label: 'Granite',
    tagline: 'Surfaces that last',
    text: 'Premium Black Pearl and Steel Grey granite, supplied in bulk with transport and loading included.',
    points: ['Black Pearl and Steel Grey', 'Transport and loading included', 'Bulk supply from 5,000 sft'],
    stat: ['2', 'granite varieties'],
    cta: 'View granite',
    to: '/services/granite',
    img: '/images/services/cards/granite.jpg',
    pos: '50% 50%',
  },
  {
    id: 'solar',
    icon: 'sun',
    label: 'Solar panels',
    tagline: 'Power that pays back',
    text: 'Design, installation and maintenance of grid-connected and off-grid solar, from rooftops to utility scale.',
    points: ['Net-metering and approvals', 'Design, install and service', 'Residential to utility scale'],
    stat: ['900+', 'rooftop installations'],
    cta: 'View solar',
    to: '/services/solar',
    img: '/images/services/cards/solar.jpg',
    pos: '50% 45%',
  },
];

// Small project chips under the buttons. Links go straight to the project pages.
const FEATURED = [
  { name: 'Srivari Meadows', place: 'Mokila', tag: 'Ready to move', to: '/projects/srivari-meadows', img: '/images/srivari-card.jpg' },
  { name: 'Praneeta Singapore Town', place: 'Shankarpally', tag: 'Ongoing', to: '/projects/praneeta-singapore-town-phase-ii', img: '/images/praneeta/villa-main.jpg' },
  { name: 'Meridian Residences', place: 'Nagulapalli', tag: 'Upcoming', to: '/projects/meridian-residences', img: '/images/sapphire-residences.png' },
];

// Bottom bar numbers (n = number that counts up, suffix = text after it)
const STATS = [
  { n: 3, suffix: '', label: 'Live projects' },
  { n: 117, suffix: '', label: 'Villas at Srivari Meadows' },
  { n: 900, suffix: '+', label: 'Solar rooftops installed' },
  { n: 0, suffix: '%', label: 'Brokerage for buyers' },
];

// ==========================================================================
//  2. ICONS
// ==========================================================================

const ICONS = {
  home: 'M3 11l9-8 9 8M5 10v10h14V10M10 20v-6h4v6',
  building: 'M5 21V4l8-1.5V21M13 8l6 1.5V21M3 21h18M8 8h2M8 12h2M8 16h2M16 13h1M16 16h1',
  layers: 'M12 3l9 5-9 5-9-5zM3 13l9 5 9-5',
  sun: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  up: 'M7 17L17 7M8 7h9v9',
  phone:
    'M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z',
  check: 'M5 12.5l4.5 4.5L19 7.5',
  pin: 'M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
};

function Icon({ name, size = 20, stroke = 1.8 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={ICONS[name] || ICONS.check} />
    </svg>
  );
}

// ==========================================================================
//  3. SMALL PARTS
// ==========================================================================

// Number that counts up once when the hero loads
function Count({ n, suffix = '' }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!n || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setV(n);
      return;
    }
    let raf;
    const start = performance.now();
    const run = (now) => {
      const p = Math.min((now - start) / 1400, 1);
      setV(Math.round(n * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(run);
    };
    raf = requestAnimationFrame(run);
    return () => cancelAnimationFrame(raf);
  }, [n]);
  return <>{v}{suffix}</>;
}

// Picture that hides itself if the file is missing, so there is never a broken-image icon
function Pic({ src, pos, eager }) {
  return (
    <img src={src} alt="" loading={eager ? 'eager' : 'lazy'} decoding="async"
      style={{ objectPosition: pos || '50% 50%' }}
      onError={(e) => { e.currentTarget.style.display = 'none'; }} />
  );
}

// ==========================================================================
//  4. HERO
// ==========================================================================

export default function HeroSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef(0);
  const total = CATEGORIES.length;
  const go = (n) => setActive((n + total) % total);

  // Auto-advance (stops on hover/focus, and for people who prefer reduced motion)
  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setTimeout(() => setActive((x) => (x + 1) % total), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [paused, active, total]);

  const onKey = (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); go(active + 1); }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); go(active - 1); }
  };

  return (
    <section className="hx" aria-label="HomeConnectz">
      <style>{CSS}</style>

      {/* ---- Ambient backdrop: the active card's photo, softly blurred ---- */}
      <div className="hx-bg" aria-hidden="true">
        {CATEGORIES.map((c, n) => (
          <div key={c.id} className={`hx-bg-layer ${n === active ? 'on' : ''}`}>
            <Pic src={c.img} pos={c.pos} eager={n === 0} />
          </div>
        ))}
        <div className="hx-shade" />
        <div className="hx-dots" />
        <div className="hx-ring r1" />
        <div className="hx-ring r2" />
      </div>

      <div className="hx-wrap hx-main">
        {/* ---------------- Left: message ---------------- */}
        <div className="hx-copy">
          <p className="hx-eyebrow"><span />{HEADLINE.eyebrow}</p>
          <h1>{HEADLINE.before}<em>{HEADLINE.accent}</em></h1>
          <p className="hx-lead">{HEADLINE.text}</p>

          <div className="hx-cta">
            <Link to={HEADLINE.primary.to} className="hx-btn hx-btn-gold">
              {HEADLINE.primary.label} <Icon name="arrow" size={18} />
            </Link>
            <Link to={HEADLINE.secondary.to} className="hx-btn hx-btn-ghost">
              {HEADLINE.secondary.label}
            </Link>
          </div>

          <div className="hx-featured">
            <p className="hx-featured-title">Featured projects</p>
            <ul>
              {FEATURED.map((f) => (
                <li key={f.to}>
                  <Link to={f.to} className="hx-chip">
                    <span className="hx-chip-img"><Pic src={f.img} /></span>
                    <span className="hx-chip-text">
                      <b>{f.name}</b>
                      <small><Icon name="pin" size={12} /> {f.place} · {f.tag}</small>
                    </span>
                    <span className="hx-chip-go"><Icon name="up" size={15} /></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ---------------- Right: expanding cards ---------------- */}
        <div className="hx-stage"
          onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}
          onKeyDown={onKey}
          onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            const d = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(d) > 60 && window.innerWidth > 760) go(active + (d < 0 ? 1 : -1));
          }}>
          <div className="hx-cards" role="list" aria-label="What we do">
            {CATEGORIES.map((c, n) => {
              const on = n === active;
              return (
                <article key={c.id} role="listitem" className={`hx-card ${on ? 'on' : ''}`}
                  tabIndex={0} aria-current={on ? 'true' : undefined}
                  aria-label={`${c.label}: ${c.tagline}`}
                  onPointerEnter={(e) => { if (e.pointerType === 'mouse') setActive(n); }}
                  onFocus={() => setActive(n)}
                  onClick={() => setActive(n)}>
                  <div className="hx-card-img"><Pic src={c.img} pos={c.pos} eager={n < 2} /></div>
                  <div className="hx-card-shade" />
                  {on && <i className="hx-prog" style={{ animationDuration: `${AUTOPLAY_MS}ms`, animationPlayState: paused ? 'paused' : 'running' }} />}

                  {/* collapsed state */}
                  <span className="hx-num">0{n + 1}</span>
                  <span className="hx-vlabel">{c.label}</span>

                  {/* expanded state */}
                  <div className="hx-body">
                    <span className="hx-badge"><Icon name={c.icon} size={22} /></span>
                    <p className="hx-tag">{c.tagline}</p>
                    <h3>{c.label}</h3>
                    <p className="hx-body-text">{c.text}</p>
                    <ul className="hx-points">
                      {c.points.map((p) => (
                        <li key={p}><Icon name="check" size={15} stroke={2.2} />{p}</li>
                      ))}
                    </ul>
                    <div className="hx-body-foot">
                      <div className="hx-stat"><strong>{c.stat[0]}</strong><span>{c.stat[1]}</span></div>
                      <Link to={c.to} tabIndex={on ? 0 : -1} className="hx-go" aria-label={`${c.cta}: ${c.label}`}>
                        {c.cta} <Icon name="arrow" size={17} />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="hx-ctrl">
            <div className="hx-dotnav" role="tablist" aria-label="Choose a service">
              {CATEGORIES.map((c, n) => (
                <button key={c.id} role="tab" aria-selected={n === active} aria-label={c.label}
                  className={n === active ? 'on' : ''} onClick={() => setActive(n)} />
              ))}
            </div>
            <div className="hx-arrows">
              <button onClick={() => go(active - 1)} aria-label="Previous"><Icon name="arrow" size={18} /></button>
              <button onClick={() => go(active + 1)} aria-label="Next"><Icon name="arrow" size={18} /></button>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- Bottom bar: numbers + phone ---------------- */}
      <div className="hx-bar">
        <div className="hx-wrap hx-bar-in">
          <ul className="hx-stats">
            {STATS.map((s) => (
              <li key={s.label}>
                <strong><Count n={s.n} suffix={s.suffix} /></strong>
                <span>{s.label}</span>
              </li>
            ))}
          </ul>
          <a className="hx-call" href={`tel:${SITE.tel}`}>
            <span className="hx-call-ico"><Icon name="phone" size={18} /></span>
            <span><small>Call our team</small><b>{SITE.phone}</b></span>
          </a>
        </div>
      </div>
    </section>
  );
}

// ==========================================================================
//  5. DESIGN
//  All styling for the hero lives here (injected with <style>).
// ==========================================================================

const CSS = `
.hx{--hx-ease:cubic-bezier(.22,.8,.25,1);position:relative;isolation:isolate;display:flex;flex-direction:column;min-height:max(720px,100svh);background:var(--deep2,#14233b);color:#fff;overflow:hidden;font-family:var(--sans,'DM Sans',system-ui,sans-serif)}
.hx *{box-sizing:border-box}
.hx ul{list-style:none;margin:0;padding:0}
.hx-wrap{width:min(1320px,100% - 48px);margin-inline:auto}

/* ---------- backdrop ---------- */
.hx-bg{position:absolute;inset:0;z-index:-1;background:linear-gradient(135deg,#1a3556,#0f2238 70%)}
.hx-bg-layer{position:absolute;inset:-6%;opacity:0;transition:opacity 1.4s ease}
.hx-bg-layer.on{opacity:1}
.hx-bg-layer img{width:100%;height:100%;object-fit:cover;filter:blur(16px) saturate(1.25);transform:scale(1.12);animation:hxdrift 24s ease-in-out infinite alternate}
@keyframes hxdrift{from{transform:scale(1.12) translate3d(0,0,0)}to{transform:scale(1.2) translate3d(-1.5%,1%,0)}}
.hx-shade{position:absolute;inset:0;background:linear-gradient(95deg,rgba(11,24,40,.96) 0%,rgba(13,28,47,.88) 42%,rgba(15,34,56,.72) 100%),linear-gradient(0deg,rgba(8,18,31,.9) 0%,transparent 38%)}
.hx-dots{position:absolute;inset:0;background-image:radial-gradient(rgba(255,255,255,.07) 1px,transparent 1.2px);background-size:6px 6px;opacity:.5}
.hx-ring{position:absolute;border-radius:50%;border:1px solid rgba(210,184,143,.22);pointer-events:none}
.hx-ring.r1{width:min(70vw,900px);aspect-ratio:1;right:-22vw;top:6%}
.hx-ring.r2{width:min(46vw,600px);aspect-ratio:1;right:-10vw;top:20%;border-color:rgba(210,184,143,.14)}

/* ---------- layout ---------- */
.hx-main{flex:1;display:grid;grid-template-columns:minmax(0,.92fr) minmax(0,1.08fr);align-items:center;gap:clamp(36px,4.5vw,72px);padding-top:calc(var(--nav-top,16px) + var(--nav-h,66px) + 40px);padding-bottom:40px}

/* ---------- copy ---------- */
.hx-copy{animation:hxrise .9s var(--hx-ease) both}
@keyframes hxrise{from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:none}}
.hx-eyebrow{display:flex;align-items:center;gap:16px;margin:0 0 22px;font-size:.76rem;letter-spacing:.3em;text-transform:uppercase;font-weight:700;color:var(--gold,#d2b88f)}
.hx-eyebrow span{width:46px;height:1px;background:currentColor}
.hx h1{margin:0 0 22px;font-family:var(--sans);font-weight:500;color:#fff;font-size:clamp(2.5rem,4.7vw,4.5rem);line-height:1.04;letter-spacing:-.012em}
.hx h1 em{font-style:italic;color:var(--gold,#d2b88f);font-weight:500;white-space:nowrap}
.hx-lead{margin:0 0 34px;max-width:540px;font-size:clamp(1rem,1.3vw,1.14rem);line-height:1.7;color:rgba(255,255,255,.82)}
.hx-cta{display:flex;flex-wrap:wrap;gap:14px}
.hx-btn{display:inline-flex;align-items:center;justify-content:center;gap:9px;padding:15px 30px;border-radius:999px;border:1.5px solid transparent;font-weight:600;font-size:1rem;text-decoration:none;cursor:pointer;transition:background .25s,color .25s,border-color .25s,transform .25s}
.hx-btn svg{transition:transform .25s}
.hx-btn:hover svg{transform:translateX(3px)}
.hx-btn-gold{background:var(--gold,#d2b88f);border-color:var(--gold,#d2b88f);color:var(--deep,#0f2238)}
.hx-btn-gold:hover{background:#fff;border-color:#fff}
.hx-btn-ghost{border-color:rgba(255,255,255,.5);color:#fff;background:rgba(255,255,255,.05)}
.hx-btn-ghost:hover{background:#fff;border-color:#fff;color:var(--deep,#0f2238)}

/* featured chips */
.hx-featured{margin-top:42px;padding-top:24px;border-top:1px solid rgba(255,255,255,.14);max-width:600px}
.hx-featured-title{margin:0 0 14px;font-size:.72rem;letter-spacing:.26em;text-transform:uppercase;color:rgba(255,255,255,.6);font-weight:600}
.hx-featured ul{display:grid;gap:10px}
.hx-chip{display:flex;align-items:center;gap:14px;padding:8px 14px 8px 8px;border-radius:16px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.13);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);color:#fff;text-decoration:none;transition:background .3s,border-color .3s,transform .3s}
.hx-chip:hover{background:rgba(255,255,255,.14);border-color:rgba(210,184,143,.6);transform:translateX(4px)}
.hx-chip-img{flex:none;width:52px;height:52px;border-radius:11px;overflow:hidden;background:linear-gradient(135deg,#21456f,#0f2238)}
.hx-chip-img img{width:100%;height:100%;object-fit:cover}
.hx-chip-text{flex:1;min-width:0;display:flex;flex-direction:column;gap:2px}
.hx-chip-text b{font-weight:600;font-size:.98rem;line-height:1.25;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.hx-chip-text small{display:inline-flex;align-items:center;gap:5px;font-size:.78rem;color:rgba(255,255,255,.68)}
.hx-chip-text small svg{color:var(--gold,#d2b88f);flex:none}
.hx-chip-go{flex:none;display:grid;place-items:center;width:32px;height:32px;border-radius:50%;border:1px solid rgba(255,255,255,.3);transition:background .3s,color .3s,border-color .3s}
.hx-chip:hover .hx-chip-go{background:var(--gold,#d2b88f);border-color:var(--gold,#d2b88f);color:var(--deep,#0f2238)}

/* ---------- stage + cards ---------- */
.hx-stage{min-width:0;animation:hxrise 1.1s .15s var(--hx-ease) both}
.hx-cards{display:flex;gap:12px;height:clamp(460px,66vh,600px)}
.hx-card{position:relative;flex:.55 1 0;min-width:0;overflow:hidden;border-radius:22px;cursor:pointer;background:linear-gradient(135deg,#21456f,#0f2238);box-shadow:0 22px 50px rgba(5,12,22,.45);outline-offset:3px;transition:flex .85s var(--hx-ease),box-shadow .5s}
.hx-card.on{flex:3.3 1 0;cursor:default;box-shadow:0 30px 70px rgba(5,12,22,.6)}
.hx-card:focus-visible{outline:3px solid var(--gold,#d2b88f)}
.hx-card-img{position:absolute;inset:0}
.hx-card-img img{width:100%;height:100%;object-fit:cover;transform:scale(1.18);filter:saturate(.85) brightness(.8);transition:transform 1.4s var(--hx-ease),filter .7s}
.hx-card:hover .hx-card-img img{filter:saturate(1.05) brightness(.95)}
.hx-card.on .hx-card-img img{transform:scale(1);filter:saturate(1.12) contrast(1.04) brightness(1)}
.hx-card-shade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(10,22,38,.35) 0%,rgba(10,22,38,.15) 30%,rgba(10,22,38,.7) 100%);transition:background .7s}
.hx-card.on .hx-card-shade{background:linear-gradient(180deg,rgba(10,22,38,.28) 0%,rgba(10,22,38,0) 26%,rgba(10,22,38,.55) 52%,rgba(8,18,31,.95) 100%)}
.hx-prog{position:absolute;z-index:3;left:0;top:0;height:3px;width:0;background:var(--gold,#d2b88f);animation:hxfill linear forwards}
@keyframes hxfill{from{width:0}to{width:100%}}

/* collapsed label */
.hx-num{position:absolute;z-index:2;top:20px;left:50%;transform:translateX(-50%);font-family:var(--sans);font-style:italic;font-size:1.35rem;color:var(--gold,#d2b88f);transition:opacity .35s}
.hx-vlabel{position:absolute;z-index:2;left:50%;bottom:26px;transform:translateX(-50%) rotate(180deg);writing-mode:vertical-rl;white-space:nowrap;font-family:var(--sans);font-size:1.6rem;font-weight:500;letter-spacing:.04em;color:#fff;transition:opacity .35s}
.hx-card.on .hx-num,.hx-card.on .hx-vlabel{opacity:0}

/* expanded body */
.hx-body{position:absolute;z-index:2;left:26px;bottom:24px;width:min(380px,calc(100% - 52px));min-width:300px;opacity:0;transform:translateY(18px);pointer-events:none;transition:opacity .3s,transform .3s}
.hx-card.on .hx-body{opacity:1;transform:none;pointer-events:auto;transition:opacity .6s .4s,transform .7s .4s var(--hx-ease)}
.hx-badge{display:grid;place-items:center;width:46px;height:46px;border-radius:14px;margin-bottom:14px;background:rgba(210,184,143,.18);border:1px solid rgba(210,184,143,.5);color:var(--gold,#d2b88f);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}
.hx-tag{margin:0 0 6px;font-size:.72rem;letter-spacing:.24em;text-transform:uppercase;font-weight:700;color:var(--gold,#d2b88f)}
.hx-body h3{margin:0 0 8px;font-family:var(--sans);font-weight:500;font-size:clamp(2rem,3vw,2.7rem);line-height:1.05;color:#fff}
.hx-body-text{margin:0 0 14px;font-size:.95rem;line-height:1.6;color:rgba(255,255,255,.86)}
.hx-points{display:grid;gap:7px;margin-bottom:18px}
.hx-points li{display:flex;align-items:center;gap:9px;font-size:.88rem;color:rgba(255,255,255,.92)}
.hx-points svg{flex:none;color:var(--gold,#d2b88f)}
.hx-body-foot{display:flex;align-items:center;justify-content:space-between;gap:14px;padding-top:16px;border-top:1px solid rgba(255,255,255,.2)}
.hx-stat strong{display:block;font-family:var(--sans);font-weight:500;font-size:2.2rem;line-height:1;color:var(--gold,#d2b88f)}
.hx-stat span{display:block;margin-top:3px;font-size:.68rem;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.7)}
.hx-go{display:inline-flex;align-items:center;gap:8px;padding:11px 20px;border-radius:999px;background:#fff;color:var(--deep,#0f2238);font-weight:600;font-size:.9rem;text-decoration:none;white-space:nowrap;transition:background .25s,transform .25s}
.hx-go:hover{background:var(--gold,#d2b88f)}
.hx-go:hover svg{transform:translateX(3px)}
.hx-go svg{transition:transform .25s}

/* controls under the cards */
.hx-ctrl{display:flex;align-items:center;justify-content:space-between;margin-top:18px}
.hx-dotnav{display:flex;gap:8px}
.hx-dotnav button{width:9px;height:9px;padding:0;border-radius:99px;border:0;background:rgba(255,255,255,.35);cursor:pointer;transition:width .4s var(--hx-ease),background .3s}
.hx-dotnav button.on{width:34px;background:var(--gold,#d2b88f)}
.hx-arrows{display:flex;gap:10px}
.hx-arrows button{display:grid;place-items:center;width:44px;height:44px;padding:0;border-radius:50%;border:1px solid rgba(255,255,255,.4);background:rgba(255,255,255,.06);color:#fff;cursor:pointer;transition:background .25s,border-color .25s,color .25s}
.hx-arrows button:first-child svg{transform:rotate(180deg)}
.hx-arrows button:hover{background:var(--gold,#d2b88f);border-color:var(--gold,#d2b88f);color:var(--deep,#0f2238)}

/* ---------- bottom bar ---------- */
.hx-bar{border-top:1px solid rgba(255,255,255,.14);background:rgba(8,18,31,.55);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px)}
.hx-bar-in{display:flex;align-items:center;justify-content:space-between;gap:28px;padding-block:22px}
.hx-stats{display:grid;grid-template-columns:repeat(4,auto);gap:12px clamp(28px,4.5vw,68px)}
.hx-stats li{display:flex;align-items:baseline;gap:12px}
.hx-stats li+li{padding-left:clamp(28px,4.5vw,68px);border-left:1px solid rgba(255,255,255,.16);margin-left:calc(-1 * clamp(0px,0px,0px))}
.hx-stats strong{font-family:var(--sans);font-weight:500;font-size:2.5rem;line-height:1;color:var(--gold,#d2b88f);font-variant-numeric:tabular-nums}
.hx-stats span{max-width:120px;font-size:.74rem;line-height:1.35;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.72)}
.hx-call{display:inline-flex;align-items:center;gap:14px;color:#fff;text-decoration:none;white-space:nowrap}
.hx-call-ico{display:grid;place-items:center;width:46px;height:46px;border-radius:50%;background:var(--gold,#d2b88f);color:var(--deep,#0f2238);transition:transform .3s}
.hx-call:hover .hx-call-ico{transform:scale(1.08)}
.hx-call small{display:block;font-size:.7rem;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.65)}
.hx-call b{display:block;font-weight:600;font-size:1.05rem}

/* ---------- laptop / tablet: copy on top, cards below ---------- */
@media (max-width:1100px){
  .hx{min-height:0}
  .hx-main{grid-template-columns:1fr;gap:40px;padding-bottom:36px}
  .hx-copy{max-width:720px}
  .hx-featured{max-width:none}
  .hx-featured ul{grid-template-columns:repeat(3,minmax(0,1fr))}
  .hx-chip{padding:8px}
  .hx-chip-go{display:none}
  .hx-cards{height:440px}
  .hx-stats{grid-template-columns:repeat(2,auto)}
  .hx-stats li+li{padding-left:0;border-left:0}
  .hx-stats li:nth-child(even){padding-left:clamp(20px,4vw,48px);border-left:1px solid rgba(255,255,255,.16)}
}
@media (max-width:820px){
  .hx-featured ul{grid-template-columns:1fr}
  .hx-bar-in{flex-direction:column;align-items:flex-start;gap:18px}
  .hx-stats{width:100%;grid-template-columns:repeat(2,minmax(0,1fr))}
  .hx-stats li:nth-child(even){padding-left:20px}
}

/* ---------- phone: cards stack and open downwards ---------- */
@media (max-width:760px){
  .hx-wrap{width:min(1320px,100% - 32px)}
  .hx-main{gap:32px;padding-top:calc(var(--nav-top,10px) + var(--nav-h,58px) + 28px)}
  .hx h1{font-size:clamp(2.3rem,10.5vw,3.1rem)}
  .hx-eyebrow{font-size:.68rem;letter-spacing:.22em;margin-bottom:18px}
  .hx-eyebrow span{width:30px}
  .hx-cta .hx-btn{flex:1 1 auto;min-width:0;padding:14px 18px;font-size:.95rem;white-space:nowrap}
  .hx-featured{margin-top:30px}
  .hx-cards{flex-direction:column;height:auto;gap:10px}
  .hx-card{flex:none;height:78px;border-radius:18px;transition:height .8s var(--hx-ease),box-shadow .5s}
  .hx-card.on{height:430px}
  .hx-num{top:50%;left:20px;transform:translateY(-50%)}
  .hx-vlabel{left:58px;bottom:auto;top:50%;transform:translateY(-50%);writing-mode:horizontal-tb;font-size:1.5rem}
  .hx-body{left:20px;right:20px;width:auto;min-width:0;bottom:20px}
  .hx-body-text{font-size:.92rem}
  .hx-body-foot{flex-wrap:wrap}
  .hx-arrows{display:none}
  .hx-ctrl{justify-content:center}
  .hx-stats strong{font-size:2rem}
  .hx-stats span{font-size:.68rem}
  .hx-call{width:100%}
}
@media (max-width:760px){
  /* App.jsx adds a fixed 56px mobile bar at the bottom */
  .hx-bar-in{padding-bottom:26px}
}

@media (prefers-reduced-motion:reduce){
  .hx-bg-layer img{animation:none}
  .hx-card,.hx-card-img img,.hx-body{transition:none!important}
}
`;