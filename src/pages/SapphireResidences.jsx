import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';

/* The project render stays where your site already keeps it:
   public/images/sapphire-residences.png                              */
const IMAGE = '/images/sapphire-residences.png';

const HERO_IMAGE = '/images/sapphire-hero.png';

const PROJECT = {
  name: 'Sapphire Residences',
  status: 'Upcoming',
  size: '1,900–2,750 sq ft',
  floors: 'G+11 floors',
  amenities: [
    ['Grand entrance lobby', 'lobby'],
    ['Exclusive clubhouse', 'club'],
    ['3 high-speed lifts', 'lift'],
    ['100% power backup', 'bolt'],
    ['Landscaped gardens', 'garden'],
    ['Walking / jogging track', 'run'],
    ['Kids play area', 'play'],
    ['Fully equipped gym', 'gym'],
    ['Indoor games zone', 'target'],
  ],
  highlights: [
    '1900 sft to 2750 sft spacious homes',
    '8 flats per floor',
    '100 ft radial road access',
    ['Opp. to ', 'Acumen International School'],
    ['Near by ', 'Aparna – 17 Degrees North Club'],
  ],
  lifestyle: ['Surrounded by 10+ international schools'],
  /* [place, label, minutes] */
  connectivity: [
    ['ORR – Exit 2', '5 minutes', 5],
    ['Nagulapalli Railway Station (New Junction)', '2 minutes', 2],
    ['Neopolis', '10 minutes', 10],
    ['Financial District', '15 minutes', 15],
  ],
  faqs: [
    ['Is this an upcoming project?', 'Yes. Sapphire Residences is listed as an upcoming project. Contact us for the latest launch and availability updates.'],
    ['What home sizes are shown?', 'The shared project information lists spacious homes from 1,900 sq ft to 2,750 sq ft.'],
    ['How many homes are on each floor?', 'The project information lists 8 flats per floor.'],
    ['Are there additional charges?', 'Floor-rise charges apply. East-facing and corner flats have extra charges. Please confirm the current charges with the developer.'],
    ['Where is the project?', 'The supplied information places the project near ORR Exit 2 and Nagulapalli Railway Station (New Junction). Ask us to confirm the exact site address before visiting.'],
    ['Where can I get the price, possession and approval details?', 'These details were not included in the supplied project information. Contact us and we will share updates once confirmed by the developer.'],
  ],
};

const SECTIONS = [
  ['overview', 'Overview'],
  ['amenities', 'Amenities'],
  ['highlights', 'Highlights'],
  ['connectivity', 'Connectivity'],
  ['faq', 'FAQs'],
];

/* ------------------------------------------------------------------ */
const reduced = () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function Arrow({ diagonal = false }) {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {diagonal ? <path d="M7 17 17 7M8 7h9v9" /> : <path d="M5 12h14m-6-6 6 6-6 6" />}
    </svg>
  );
}

const ICONS = {
  lobby: <path d="M3 9 12 4l9 5M5 9v9m4-9v9m6-9v9m4-9v9M3 20h18M3 9h18" />,
  club: <path d="M6 4h12v6a6 6 0 0 1-12 0V4Zm6 12v4m-4 0h8" />,
  lift: <path d="M5 4h14v16H5zM9.5 14 12 17l2.5-3m-5-4L12 7l2.5 3" />,
  bolt: <path d="M13 3 5 13h6l-1 8 8-10h-6l1-8Z" />,
  garden: <path d="M12 21v-8m0 0c-4 0-6-3-6-7 4 0 6 3 6 7Zm0 0c4 0 6-3 6-7-4 0-6 3-6 7Z" />,
  run: <path d="M13 4.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM9 21l2-6-3-2 2-5 4 2 2 3m-4 0 3 3 1 5" />,
  play: <path d="M5 21V8l7-4 7 4v13M5 13h14M9 21v-8m6 8v-8" />,
  gym: <path d="M3 10v4m3-6v8m12-8v8m3-6v4M6 12h12" />,
  target: <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-5a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0-3a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />,
};
function Ico({ name }) {
  return (
    <svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {ICONS[name]}
    </svg>
  );
}

/* Tries the usual public-folder locations before giving up. */
const BASES = ['/images/', '/images/sapphire/', '/'];
function Image({ src, alt, className = '', eager = false, style, fallback }) {
  const file = src.split('/').pop();
  const options = [src, ...BASES.map((b) => b + file).filter((c) => c !== src), ...(fallback ? [fallback] : [])];
  const [n, setN] = useState(0);
  return (
    <img
      className={className}
      style={style}
      src={options[Math.min(n, options.length - 1)]}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={(event) => {
        if (n < options.length - 1) setN(n + 1);
        else event.currentTarget.style.visibility = 'hidden';
      }}
    />
  );
}

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
    <Tag ref={ref} className={`sr-rv ${seen ? 'in' : ''} ${className}`} style={{ '--d': `${delay}ms` }} {...rest}>
      {children}
    </Tag>
  );
}

function Counter({ to, duration = 1500 }) {
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
  return <span ref={ref}>{value}</span>;
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
    <div className="sr-lb" role="dialog" aria-modal="true" aria-label={item.alt} onClick={onClose}>
      <style>{LB_CSS}</style>
      <div className="sr-lb-bar" onClick={(e) => e.stopPropagation()}>
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
      <div className={`sr-lb-stage ${zoom ? 'zoom' : ''}`} onClick={zoom ? (e) => e.stopPropagation() : onClose}>
        <Image src={item.src} alt={item.alt} eager />
      </div>
      <p className="sr-lb-cap" onClick={(e) => e.stopPropagation()}>
        {item.alt}
      </p>
      {count > 1 && (
        <>
          <button type="button" className="sr-lb-nav prev" aria-label="Previous image" onClick={(e) => { e.stopPropagation(); onIndex((index - 1 + count) % count); }}>
            ‹
          </button>
          <button type="button" className="sr-lb-nav next" aria-label="Next image" onClick={(e) => { e.stopPropagation(); onIndex((index + 1) % count); }}>
            ›
          </button>
        </>
      )}
    </div>
  );
  return typeof document === 'undefined' ? node : createPortal(node, document.body);
}

function Heading({ eyebrow, title, children }) {
  return (
    <Reveal className="sr-head">
      <p className="sr-eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {children}
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
function Hero() {
  return (
    <>
      <div className="sr-crumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/projects?status=upcoming">Upcoming projects</Link>
        <span>/</span>
        <b>{PROJECT.name}</b>
      </div>

      <div className="sr-intro">
        <span className="sr-status">
          <i />
          {PROJECT.status} project
        </span>
        <p className="sr-eyebrow">Luxury apartments · Hyderabad</p>
        <h1>
          Sapphire <em>Residences</em>
        </h1>
        <p className="sr-lead">Contemporary G+11 floor apartments with a clubhouse, landscaped gardens and convenient access to key destinations.</p>
        
      </div>

      <header className="sr-hero">
        <Image className="sr-hero-img" src={HERO_IMAGE} fallback={IMAGE} alt="Sapphire Residences project" eager />
      </header>

      <div className="sr-facts">
        <div>
          <strong>{PROJECT.status}</strong>
          <span>Project status</span>
        </div>
        <div>
          <strong>G+11</strong>
          <span>Building</span>
        </div>
        <div>
          <strong>{PROJECT.size}</strong>
          <span>Home sizes</span>
        </div>
        <div>
          <strong>
            <Counter to={8} />
          </strong>
          <span>Flats per floor</span>
        </div>
      </div>
    </>
  );
}

function SectionNav() {
  const [active, setActive] = useState('overview');
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-35% 0px -55% 0px' }
    );
    SECTIONS.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return (
    <nav className="sr-nav" aria-label="Sapphire Residences sections">
      {SECTIONS.map(([id, label]) => (
        <a key={id} href={`#${id}`} className={active === id ? 'on' : ''}>
          {label}
        </a>
      ))}
    </nav>
  );
}

function Overview({ onOpen }) {
  return (
    <section className="sr-sec" id="overview">
      <Heading eyebrow="A new address to look forward to" title={<>Modern homes, <em>thoughtfully connected.</em></>}>
        <p>Sapphire Residences brings spacious apartment living together with everyday amenities and access to Hyderabad’s key destinations.</p>
      </Heading>

      <div className="sr-row">
        <Reveal>
          <span className="sr-count">G+11</span>
          <h3>Room for the life you’re building.</h3>
          <p>Choose from homes ranging from 1,900 sq ft to 2,750 sq ft, in a residential community planned with just 8 flats per floor.</p>
          <Link className="sr-link" to="/contact">
            Ask for launch details <Arrow />
          </Link>
        </Reveal>
        <Reveal className="sr-frame" delay={140}>
          <button type="button" onClick={() => onOpen([{ src: IMAGE, alt: 'Sapphire Residences apartment building rendering' }], 0)} aria-label="Open Sapphire Residences image">
            <Image src={IMAGE} alt="Sapphire Residences apartment building rendering" />
            <span className="sr-hint">Click to enlarge</span>
          </button>
          <span className="sr-cap">Project rendering supplied with the project information</span>
        </Reveal>
      </div>

    </section>
  );
}

function Amenities() {
  return (
    <section className="sr-sec" id="amenities">
      <Heading eyebrow="Designed for everyday life" title={<>Comfort and community, <em>all in one place.</em></>}>
        <p>Enjoy spaces to unwind, stay active and spend time together.</p>
      </Heading>
      <ul className="sr-amenities">
        {PROJECT.amenities.map(([label, icon], i) => (
          <Reveal as="li" key={label} delay={(i % 2) * 120}>
            <span className="ic">
              <Ico name={icon} />
            </span>
            <b>{label}</b>
            <em>{String(i + 1).padStart(2, '0')}</em>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

function Highlights() {
  return (
    <section className="sr-sec" id="highlights">
      <Heading eyebrow="Project highlights" title={<>More room. <em>More within reach.</em></>} />
      <div className="sr-row top">
        <Reveal>
          <h3>Project highlights</h3>
          <ul className="sr-ticks">
            {PROJECT.highlights.map((h) => (
              <li key={Array.isArray(h) ? h[1] : h}>{Array.isArray(h) ? <>{h[0]}<b>{h[1]}</b></> : h}</li>
            ))}
          </ul>
          <h3 className="gap">Education &amp; lifestyle</h3>
          <ul className="sr-ticks">
            {PROJECT.lifestyle.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={140}>
          <h3>Excellent connectivity</h3>
          <ul className="sr-ticks">
            {PROJECT.connectivity.map(([place, label]) => (
              <li key={place}>
                <b>{label}</b> to {place}
              </li>
            ))}
          </ul>
          <p className="sr-charge">
            <svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 5h16v14H4zM4 10h16M10 10v9" />
            </svg>
            Floor rise, East-facing and corner-flat charges extra
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Connectivity() {
  const mapQuery = encodeURIComponent('Nagulapalli Railway Station, Telangana');
  const [ref, seen] = useInView();
  return (
    <section className="sr-sec" id="connectivity">
      <Heading eyebrow="Around the neighbourhood" title="Hyderabad, within easy reach.">
        <p>Travel times below are as supplied and should be confirmed for your route and time of travel.</p>
      </Heading>
      <div className="sr-row top">
        <div ref={ref} className={`sr-dist ${seen ? 'in' : ''}`}>
          {PROJECT.connectivity.map(([place, label, mins], i) => (
            <div key={place} style={{ '--w': `${(mins / 15) * 100}%`, '--d': `${i * 160}ms` }}>
              <p>
                <span>{place}</span>
                <b>{label}</b>
              </p>
              <i />
            </div>
          ))}
          <p className="sr-place">
            <span>Acumen International School</span>
            <b>Opposite the project</b>
          </p>
          <p className="sr-place">
            <span>Aparna 17 Degrees North Club</span>
            <b>Nearby</b>
          </p>
          <p className="sr-place">
            <span>International schools</span>
            <b>10+ in the area</b>
          </p>
          <a className="sr-link" href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`} target="_blank" rel="noreferrer">
            Open location in Maps <Arrow diagonal />
          </a>
        </div>
        <Reveal className="sr-map" delay={140}>
          <iframe title="Map near Nagulapalli Railway Station" src={`https://www.google.com/maps?q=${mapQuery}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </Reveal>
      </div>
    </section>
  );
}

export default function SapphireResidences() {
  const [lb, setLb] = useState(null);
  const open = useCallback((items, index) => setLb({ items, index }), []);
  const close = useCallback(() => setLb(null), []);
  const setIndex = useCallback((index) => setLb((st) => (st ? { ...st, index } : st)), []);

  return (
    <section className="section container page-top sapphire">
      <style>{CSS}</style>
      <Hero />
      <SectionNav />
      <Overview onOpen={open} />
      <Amenities />
      <Highlights />
      <Connectivity />

      <section className="sr-sec" id="faq">
        <div className="sr-row top">
          <Reveal>
            <p className="sr-eyebrow">Good to know</p>
            <h2>Questions, answered.</h2>
            <p>Get in touch for updates on availability and details confirmed by the developer.</p>
            <Link className="sr-link" to="/contact">
              Talk to our team <Arrow />
            </Link>
          </Reveal>
          <Reveal delay={120}>
            {PROJECT.faqs.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </Reveal>
        </div>
      </section>

      <p className="sr-legal">Project information shown is based on the material supplied. Prices, approvals, possession dates and availability were not provided; confirm all details with the developer before booking.</p>

      <Link className="sr-float" to="/contact">
        Enquire <Arrow />
      </Link>
      {lb && <Lightbox items={lb.items} index={lb.index} onClose={close} onIndex={setIndex} />}
    </section>
  );
}

const LB_CSS = `
.sr-lb{position:fixed;inset:0;z-index:99999;display:grid;grid-template-rows:auto minmax(0,1fr) auto;height:100vh;height:100dvh;background:rgba(10,20,34,.96);color:#fff;animation:sr-fade .3s ease}
.sr-lb *{box-sizing:border-box}
.sr-lb-bar{display:flex;justify-content:space-between;align-items:center;padding:14px 20px;font-size:.9rem}
.sr-lb-bar div{display:flex;gap:10px}
.sr-lb-bar button{padding:8px 14px;border:1px solid rgba(255,255,255,.35);border-radius:999px;background:none;color:#fff;font:inherit;cursor:pointer}
.sr-lb-stage{display:flex;align-items:center;justify-content:center;min-height:0;overflow:hidden;padding:0 76px}
.sr-lb-stage img{display:block;width:auto;height:auto;max-width:100%;max-height:calc(100vh - 140px);max-height:calc(100dvh - 140px);object-fit:contain;border-radius:6px}
.sr-lb-stage.zoom{display:block;overflow:auto;padding:0 20px;cursor:zoom-out}
.sr-lb-stage.zoom img{max-width:none;max-height:none;width:220%;margin:0 auto}
.sr-lb-cap{margin:0;padding:12px 20px 18px;text-align:center;color:rgba(255,255,255,.85);font-size:.9rem}
.sr-lb-nav{position:absolute;top:50%;width:48px;height:48px;margin-top:-24px;border:1px solid rgba(255,255,255,.35);border-radius:50%;background:rgba(255,255,255,.08);color:#fff;font-size:1.8rem;line-height:1;cursor:pointer}
.sr-lb-nav.prev{left:14px}.sr-lb-nav.next{right:14px}
@keyframes sr-fade{from{opacity:0}to{opacity:1}}
@media (max-width:640px){.sr-lb-stage{padding:0 8px}.sr-lb-nav{top:auto;bottom:70px;margin-top:0;width:42px;height:42px}}
`;

const CSS = `
.sapphire{--ink:var(--navy,#21456f);--mute:var(--muted,#5d6b7c);--acc:var(--gold,#b8953f);--line:rgba(33,69,111,.16);--ease:cubic-bezier(.2,.7,.2,1)}
.sapphire *{box-sizing:border-box}
.sapphire button{font:inherit;color:inherit;cursor:pointer}
.sapphire img{display:block;max-width:100%}
.sapphire p{color:var(--mute);line-height:1.7}
.sapphire h2{margin-bottom:12px;font-size:clamp(1.9rem,3.2vw,2.7rem);line-height:1.12}
.sapphire h2 em{color:var(--acc)}
.sapphire h3{margin-bottom:10px}
.sapphire .sr-eyebrow{margin-bottom:10px;color:var(--acc);font-size:.76rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase}
.sapphire .sr-sec{display:grid;gap:34px;padding-top:clamp(64px,8vw,104px);scroll-margin-top:120px}
.sapphire .sr-head{max-width:760px}
.sapphire .sr-head p{font-size:1.05rem}
.sapphire .sr-rv{opacity:0;transform:translateY(28px);transition:opacity .9s var(--ease) var(--d,0ms),transform .9s var(--ease) var(--d,0ms)}
.sapphire .sr-rv.in{opacity:1;transform:none}

/* page-level: lets the hero run edge to edge without a sideways scrollbar */
html,body{overflow-x:clip}

/* breadcrumb: pushed down so the fixed top bar never covers it */
.sapphire .sr-crumb{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin:0 0 18px;padding-top:clamp(36px,4vw,56px);color:var(--mute);font-size:.9rem;position:relative;z-index:1}
.sapphire .sr-crumb a,.sapphire .sr-crumb b{color:var(--ink);font-weight:600}

/* intro text: centred right under the breadcrumb */
.sapphire .sr-intro{display:flex;flex-direction:column;align-items:center;max-width:880px;margin:0 auto;padding:clamp(20px,4vw,44px) 0 clamp(30px,4vw,48px);text-align:center}
.sapphire .sr-intro>*{animation:sr-up 1s var(--ease) both}
.sapphire .sr-intro>*:nth-child(2){animation-delay:.08s}
.sapphire .sr-intro>*:nth-child(3){animation-delay:.16s}
.sapphire .sr-intro>*:nth-child(4){animation-delay:.26s}
.sapphire .sr-intro>*:nth-child(5){animation-delay:.36s}
.sapphire .sr-status{display:inline-flex;align-items:center;gap:8px;margin-bottom:18px;padding:7px 14px;border:1px solid var(--line);border-radius:999px;background:rgba(255,255,255,.6);color:var(--ink);font-size:.82rem;font-weight:600}
.sapphire .sr-status i{width:8px;height:8px;border-radius:50%;background:var(--acc);animation:sr-pulse 2s ease-in-out infinite}
.sapphire .sr-intro .sr-eyebrow{margin-bottom:12px}
.sapphire .sr-intro h1{margin-bottom:16px;font-size:clamp(3rem,7.4vw,6rem);line-height:1.02;color:var(--ink)}
.sapphire .sr-intro h1 em{font-style:italic;color:var(--acc)}
.sapphire .sr-lead{max-width:640px;font-size:clamp(1rem,1.5vw,1.18rem)}
.sapphire .sr-actions{display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin-top:24px}
.sapphire .sr-btn{display:inline-flex;align-items:center;gap:10px;padding:14px 24px;border:1.5px solid var(--ink);border-radius:999px;background:var(--ink);color:#fff;font-weight:700;font-size:.94rem;transition:transform .3s var(--ease),box-shadow .3s}
.sapphire .sr-btn:hover{transform:translateY(-3px);box-shadow:0 14px 28px rgba(33,69,111,.28)}
.sapphire .sr-btn.ghost{background:transparent;color:var(--ink);border-color:var(--acc)}

/* hero: full screen, edge to edge, no card */
.sapphire .sr-hero{position:relative;width:100vw;margin-left:calc(50% - 50vw);height:100vh;height:100svh;min-height:520px;overflow:hidden;background:rgba(33,69,111,.12)}
.sapphire .sr-hero-img{position:absolute;inset:0;width:100%;height:100%;max-width:none;object-fit:cover;object-position:center}

/* framed picture: the image sits INSIDE the border, edge to edge, uncropped */
.sapphire .sr-frame{position:relative;margin:0;padding:10px;border:1.5px solid rgba(184,149,63,.6);border-radius:30px;background:rgba(255,255,255,.55)}
.sapphire .sr-frame>button{position:relative;display:block;width:100%;padding:0;border:0;background:none;border-radius:20px;overflow:hidden;cursor:zoom-in}
.sapphire .sr-frame img{display:block;width:100%;aspect-ratio:15/16;object-fit:cover;border-radius:20px;background:rgba(33,69,111,.08)}
.sapphire .sr-hint{position:absolute;top:14px;right:14px;padding:6px 12px;border-radius:999px;background:rgba(15,34,56,.72);color:#fff;font-size:.74rem;font-weight:600;opacity:0;transition:opacity .3s;pointer-events:none}
.sapphire .sr-frame>button:hover .sr-hint,.sapphire .sr-frame>button:focus-visible .sr-hint{opacity:1}
.sapphire .sr-cap{pointer-events:none;position:absolute;right:22px;bottom:22px;padding:6px 10px;border-radius:8px;background:rgba(15,34,56,.72);color:#fff;font-size:.7rem}

/* one-time entrance only: images wipe in once and then stay perfectly still */
.sapphire .sr-hero-img{animation:sr-reveal 1.4s var(--ease) both}
.sapphire .sr-frame img{clip-path:inset(0 0 100% 0 round 20px);transition:clip-path 1.3s var(--ease) .15s}
.sapphire .sr-frame.in img{clip-path:inset(0 0 0 0 round 20px)}

/* facts */
.sapphire .sr-facts{display:grid;grid-template-columns:repeat(4,1fr);margin-top:34px;border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
.sapphire .sr-facts>div{padding:26px 22px;border-left:1px solid var(--line)}
.sapphire .sr-facts>div:first-child{border-left:0}
.sapphire .sr-facts strong{display:block;font-family:var(--serif);font-size:clamp(1.35rem,2.3vw,2rem);font-weight:500;line-height:1.1;color:var(--ink);white-space:nowrap}
.sapphire .sr-facts>div>span{display:block;margin-top:8px;color:var(--mute);font-size:.9rem}

/* nav */
.sapphire .sr-nav{position:sticky;top:84px;z-index:20;display:flex;gap:30px;overflow:auto;margin-top:26px;padding:12px 4px;border-bottom:1px solid var(--line);scrollbar-width:none;backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px)}
.sapphire .sr-nav::-webkit-scrollbar{display:none}
.sapphire .sr-nav a{position:relative;flex:none;padding:4px 0;color:var(--mute);font-size:.92rem;font-weight:500}
.sapphire .sr-nav a::after{content:'';position:absolute;left:0;right:0;bottom:-13px;height:2px;background:var(--acc);transform:scaleX(0);transition:transform .35s var(--ease)}
.sapphire .sr-nav a.on{color:var(--ink);font-weight:700}
.sapphire .sr-nav a.on::after{transform:scaleX(1)}

/* rows */
.sapphire .sr-row{display:grid;grid-template-columns:1fr 1fr;gap:clamp(30px,5vw,72px);align-items:center}
.sapphire .sr-row>*{min-width:0}
.sapphire .sr-row.top{align-items:start}
.sapphire .sr-count{display:block;font-family:var(--serif);font-size:clamp(4rem,9vw,7rem);line-height:1;color:var(--acc);opacity:.85}
.sapphire .sr-row h3{font-size:clamp(1.5rem,2.4vw,2rem)}
.sapphire .sr-row h3.gap{margin-top:34px}
.sapphire .sr-link{display:inline-flex;align-items:center;gap:8px;margin-top:22px;padding-bottom:3px;border-bottom:1.5px solid var(--acc);color:var(--ink);font-weight:700}


/* amenities */
.sapphire .sr-amenities{display:grid;grid-template-columns:1fr 1fr;gap:0 clamp(30px,6vw,84px);margin:0;padding:0;list-style:none;border-top:1px solid var(--line)}
.sapphire .sr-amenities li{display:flex;align-items:center;gap:18px;padding:20px 0;border-bottom:1px solid var(--line)}
.sapphire .sr-amenities .ic{display:grid;place-items:center;width:46px;height:46px;border:1.5px solid var(--acc);border-radius:50%;color:var(--acc);transition:background .35s,color .35s,transform .35s}
.sapphire .sr-amenities li:hover .ic{background:var(--acc);color:#fff;transform:rotate(-8deg) scale(1.06)}
.sapphire .sr-amenities b{flex:1;color:var(--ink);font-weight:600;font-size:1.04rem}
.sapphire .sr-amenities em{color:var(--acc);font-family:var(--serif);font-size:1rem}

/* ticks */
.sapphire .sr-ticks{display:grid;gap:13px;margin:16px 0 0;padding:0;list-style:none}
.sapphire .sr-ticks li{position:relative;padding-left:32px;color:var(--mute);line-height:1.5}
.sapphire .sr-ticks li b{color:var(--ink);font-weight:700}
.sapphire .sr-ticks li::before{content:'';position:absolute;left:0;top:1px;width:22px;height:22px;border-radius:50%;background:rgba(184,149,63,.18)}
.sapphire .sr-ticks li::after{content:'';position:absolute;left:8px;top:6px;width:5px;height:9px;border:solid var(--acc);border-width:0 2px 2px 0;transform:rotate(45deg)}
.sapphire .sr-charge{display:flex;align-items:center;gap:16px;margin:30px 0 0;padding:18px 0;border-top:1px solid var(--line);border-bottom:1px solid var(--line);color:var(--ink);font-weight:600}
.sapphire .sr-charge svg{flex:none;color:var(--acc)}

/* distance */
.sapphire .sr-dist>div{margin-bottom:22px}
.sapphire .sr-dist p{display:flex;justify-content:space-between;gap:14px;margin:0 0 8px;color:var(--ink)}
.sapphire .sr-dist p b{flex:none;color:var(--acc)}
.sapphire .sr-dist i{display:block;height:3px;border-radius:3px;background:var(--line);position:relative;overflow:hidden}
.sapphire .sr-dist i::after{content:'';position:absolute;inset:0 auto 0 0;width:var(--w);background:linear-gradient(90deg,var(--acc),var(--ink));transform:scaleX(0);transform-origin:left;transition:transform 1.4s var(--ease) var(--d,0ms)}
.sapphire .sr-dist.in i::after{transform:scaleX(1)}
.sapphire .sr-dist .sr-place{padding:13px 0;border-bottom:1px solid var(--line);margin:0}
.sapphire .sr-dist>div:last-of-type{margin-bottom:26px}
.sapphire .sr-map{overflow:hidden;border-radius:26px;background:rgba(33,69,111,.08)}
.sapphire .sr-map iframe{display:block;width:100%;height:clamp(340px,40vw,480px);border:0}

/* faq */
.sapphire details{border-bottom:1px solid var(--line)}
.sapphire details:first-of-type{border-top:1px solid var(--line)}
.sapphire summary{position:relative;padding:18px 34px 18px 0;color:var(--ink);font-weight:600;cursor:pointer;list-style:none}
.sapphire summary::-webkit-details-marker{display:none}
.sapphire summary::after{content:'+';position:absolute;right:4px;top:50%;transform:translateY(-50%);color:var(--acc);font-size:1.5rem;transition:transform .3s}
.sapphire details[open] summary::after{transform:translateY(-50%) rotate(45deg)}
.sapphire details p{margin:0 0 18px}

.sapphire .sr-legal{margin-top:22px;font-size:.78rem;text-align:center}
.sapphire .sr-float{position:fixed;right:18px;bottom:18px;z-index:30;display:none;align-items:center;gap:8px;padding:13px 20px;border-radius:999px;background:var(--ink);color:#fff;font-weight:700;box-shadow:0 12px 30px rgba(15,34,56,.35)}

@keyframes sr-reveal{from{opacity:0;clip-path:inset(0 0 100% 0)}to{opacity:1;clip-path:inset(0 0 0 0)}}
@keyframes sr-up{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
@keyframes sr-pulse{0%,100%{box-shadow:0 0 0 0 rgba(184,149,63,.55)}50%{box-shadow:0 0 0 7px rgba(184,149,63,0)}}

@media (max-width:960px){
  .sapphire .sr-row{grid-template-columns:1fr}
  .sapphire .sr-hero{height:auto;min-height:0;aspect-ratio:16/9;max-height:80vh;max-height:80svh}
  .sapphire .sr-facts{grid-template-columns:1fr 1fr}
  .sapphire .sr-facts>div:nth-child(3){border-left:0}
  .sapphire .sr-facts>div:nth-child(n+3){border-top:1px solid var(--line)}
  .sapphire .sr-amenities{grid-template-columns:1fr}
  .sapphire .sr-float{display:inline-flex}
}
@media (max-width:640px){
  .sapphire .sr-nav{top:76px;gap:22px}
  .sapphire .sr-hero{aspect-ratio:4/3}
  .sapphire .sr-hero-img{object-position:52% center}
  .sapphire .sr-intro{padding-left:6px;padding-right:6px}
  .sapphire .sr-intro h1{font-size:clamp(2.6rem,13vw,3.4rem)}
  .sapphire .sr-actions{width:100%}
  .sapphire .sr-actions .sr-btn{flex:1 1 100%;justify-content:center}
  .sapphire .sr-frame{padding:7px;border-radius:24px}
  .sapphire .sr-frame img{border-radius:17px;clip-path:inset(0 0 100% 0 round 17px)}
  .sapphire .sr-frame.in img{clip-path:inset(0 0 0 0 round 17px)}
}
@media (prefers-reduced-motion:reduce){
  .sapphire *{animation:none!important;transition:none!important}
  .sapphire .sr-rv{opacity:1;transform:none}
}
`;