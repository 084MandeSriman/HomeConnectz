import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';

/* ------------------------------------------------------------------ */
/*  Images live in  public/images/praneeta/                            */
/* ------------------------------------------------------------------ */
const BASES = ['/images/praneeta/', '/images/', '/praneeta/', '/'];
const IMG = BASES[0];

const PROJECT = {
  name: 'Praneeta Singapore Town Phase-II',
  status: 'Ongoing project',
  developer: 'Tricore Projects',
  hmda: '002446/HMDA/00732/SWFL/SKP2/2025',
  hmdaDate: '07/08/2025',
  rera: 'P02400009800',
};

const HERO_SLIDES = [
  { src: IMG + 'villa-main.jpg', alt: 'Praneeta Singapore Town Phase-II villa exterior' },
  { src: IMG + 'villa-evening.jpg', alt: 'Villa exterior at dusk' },
  { src: IMG + 'villa-day.jpg', alt: 'Villa exterior in daylight' },
];

const SECTIONS = [
  ['overview', 'Overview'],
  ['gallery', 'Gallery'],
  ['plans', 'Villa plans'],
  ['amenities', 'Amenities'],
  ['layout', 'Layout & location'],
  ['approvals', 'Approvals'],
  ['faq', 'FAQs'],
];

const HIGHLIGHTS = [
  { text0: '4 BHK', title: 'luxury villas', text: 'Premium homes with generous indoor and outdoor space' },
  { text0: 'Gated', title: 'community', text: 'Greenery, security and shared spaces in one address' },
  { text0: 'Shankarpally', title: 'Hyderabad', text: 'A fast-growing residential destination' },
  { text0: 'HMDA', title: '& TS RERA', text: 'Approval references listed for the project' },
];

const GLANCE = [
  ['Villas', '35 exclusive 4 BHK villas'],
  ['Project area', '2 acres 10 guntas'],
  ['Plot sizes', '150–190 sq yd'],
  ['Built-up area', '2,250–2,850 sq ft'],
  ['HMDA approval', PROJECT.hmda],
  ['TS RERA', PROJECT.rera],
  ['Developer', PROJECT.developer],
  ['Location', 'Shankarpally, Hyderabad'],
];

const STORY = [
  {
    image: 'villa-evening.jpg',
    alt: 'Villa exterior at dusk',
    eyebrow: 'A gated villa community',
    title: 'Comfort, security and a premium lifestyle',
    text: 'Praneeta Singapore Town Phase-II brings together spacious homes, greenery and community amenities in one of Hyderabad’s growing residential destinations.',
    points: ['35 exclusive 4 BHK villas', '150–190 sq yd plot sizes', 'HMDA and TS RERA approved'],
  },
  {
    image: 'interior-living.jpg',
    alt: 'Villa living room interior',
    eyebrow: 'Spacious villas',
    title: 'More than a living space',
    text: 'At Praneeta Singapore Town Phase-II, a home is designed to offer more than living space. It brings together comfort, security, nature and a premium lifestyle in a gated community at Shankarpally.',
    points: ['Premium 4 BHK homes with generous indoor and outdoor space', 'Shared spaces for recreation, fitness and neighbourhood events', 'A residential setting in the western Hyderabad growth corridor'],
  },
];

const GALLERY = [
  { src: IMG + 'villa-main.jpg', alt: 'Praneeta Singapore Town Phase-II villa exterior' },
  { src: IMG + 'villa-evening.jpg', alt: 'Villa exterior at dusk' },
  { src: IMG + 'interior-living.jpg', alt: 'Villa living room interior' },
  { src: IMG + 'villa-day.jpg', alt: 'Villa exterior in daylight' },
];

const PLANS = [
  { id: 'ground', label: 'Ground floor', image: 'plan-ground.jpg', area: '953 sq ft' },
  { id: 'first', label: 'First floor', image: 'plan-first.jpg', area: '903 sq ft' },
  { id: 'terrace', label: 'Terrace floor', image: 'plan-terrace.jpg', area: '434 sq ft' },
];

const AMENITIES = [
  { image: 'amenity-hall.jpg', title: 'Banquet & multi-purpose hall', text: 'A well-appointed hall for events and community gatherings.' },
  { image: 'amenity-gym.jpg', title: 'Fitness & wellness center', text: 'Modern equipment and space for everyday workouts.' },
  { image: 'amenity-play.jpg', title: 'Kids play area', text: 'A colorful play space for children’s activities.' },
  { image: 'amenity-yoga.jpg', title: 'Yoga & meditation zone', text: 'A dedicated space for relaxation and wellness.' },
];

const FEATURES = ['35 exclusive villas', '2 acres 10 guntas of gated community', 'Numbered villa plots', 'Social infrastructure', 'Park within the community', 'HMDA and TS RERA approved'];

const FAQS = [
  ['What is the project status?', 'Praneeta Singapore Town Phase-II is listed as an ongoing project. Contact us for the latest construction and availability updates.'],
  ['How many villas are in the project?', 'The supplied project information lists 35 exclusive 4 BHK villas across 2 acres 10 guntas.'],
  ['What are the plot and built-up sizes?', 'Plot sizes are listed as 150–190 sq yd and built-up areas as 2,250–2,850 sq ft. The sample 150 sq yd plan shows 2,290 sq ft total built-up area.'],
  ['What approvals are listed?', 'The supplied material lists HMDA approval reference 002446/HMDA/00732/SWFL/SKP2/2025 dated 07/08/2025 and TS RERA registration P02400009800. Please verify the latest records before booking.'],
  ['Can I arrange a site visit?', 'Yes. Contact our team and we can help coordinate a site visit and share the latest confirmed details.'],
];

/* ------------------------------------------------------------------ */
/*  Small building blocks                                              */
/* ------------------------------------------------------------------ */
const reduced = () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function Arrow({ diagonal = false }) {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {diagonal ? <path d="M7 17 17 7M8 7h9v9" /> : <path d="M5 12h14m-6-6 6 6-6 6" />}
    </svg>
  );
}

/* Tries the usual public-folder locations before giving up. */
function Image({ src, alt, className = '', eager = false }) {
  const file = src.split('/').pop();
  const options = [src, ...BASES.map((b) => b + file).filter((c) => c !== src)];
  const [n, setN] = useState(0);
  useEffect(() => setN(0), [src]);
  return (
    <img
      className={className}
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
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, seen];
}

function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const [ref, seen] = useInView();
  return (
    <Tag ref={ref} className={`pr-rv ${seen ? 'in' : ''} ${className}`} style={{ '--d': `${delay}ms` }} {...rest}>
      {children}
    </Tag>
  );
}

function Counter({ to, duration = 1600 }) {
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
    <div className="pr-lb" role="dialog" aria-modal="true" aria-label={item.alt} onClick={onClose}>
      <style>{LB_CSS}</style>
      <div className="pr-lb-bar" onClick={(e) => e.stopPropagation()}>
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
      <div className={`pr-lb-stage ${zoom ? 'zoom' : ''}`} onClick={zoom ? (e) => e.stopPropagation() : onClose}>
        <Image src={item.src} alt={item.alt} eager />
      </div>
      <p className="pr-lb-cap" onClick={(e) => e.stopPropagation()}>
        {item.alt}
      </p>
      {count > 1 && (
        <>
          <button type="button" className="pr-lb-nav prev" aria-label="Previous image" onClick={(e) => { e.stopPropagation(); onIndex((index - 1 + count) % count); }}>
            ‹
          </button>
          <button type="button" className="pr-lb-nav next" aria-label="Next image" onClick={(e) => { e.stopPropagation(); onIndex((index + 1) % count); }}>
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
    <Reveal className="pr-head">
      <p className="pr-eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {children}
    </Reveal>
  );
}

function Ticks({ items }) {
  return (
    <ul className="pr-ticks">
      {items.map((p) => (
        <li key={p}>{p}</li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ */
/*  Sections                                                           */
/* ------------------------------------------------------------------ */
function Hero() {
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    if (reduced()) return undefined;
    const id = setInterval(() => setSlide((s) => (s + 1) % HERO_SLIDES.length), 6500);
    return () => clearInterval(id);
  }, []);
  return (
    <>
      <div className="pr-crumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/projects?status=ongoing">Ongoing projects</Link>
        <span>/</span>
        <b>{PROJECT.name}</b>
      </div>

      <div className="pr-intro">
        <span className="pr-status">
          <i />
          {PROJECT.status}
        </span>
        <p className="pr-eyebrow">Premium 4 BHK villas · Shankarpally</p>
        <h1>
          Praneeta Singapore Town <em>Phase-II</em>
        </h1>
        <p className="pr-lead">Premium 4 BHK villas at Shankarpally, designed for families seeking comfort, elegance and long-term value.</p>
        <div className="pr-actions">
          <Link className="pr-btn" to="/contact">
            Enquire about this project <Arrow />
          </Link>
          <a className="pr-btn ghost" href="#overview">
            Explore the project <Arrow diagonal />
          </a>
        </div>
      </div>

      <header className="pr-hero">
        {HERO_SLIDES.map((s, i) => (
          <Image key={s.src} src={s.src} alt={i === slide ? s.alt : ''} className={`pr-hero-img ${i === slide ? 'on' : ''}`} eager={i === 0} />
        ))}
        <div className="pr-dots" role="tablist" aria-label="Hero images">
          {HERO_SLIDES.map((s, i) => (
            <button key={s.src} type="button" role="tab" aria-selected={i === slide} aria-label={`Show image ${i + 1}`} className={i === slide ? 'on' : ''} onClick={() => setSlide(i)} />
          ))}
        </div>
      </header>

      <div className="pr-facts" aria-label="Project facts">
        <div>
          <strong>
            <Counter to={35} />
          </strong>
          <span>Exclusive villas</span>
        </div>
        <div>
          <strong>2 ac 10 gt</strong>
          <span>Project area</span>
        </div>
        <div>
          <strong>150–190</strong>
          <span>Plot sizes, sq yd</span>
        </div>
        <div>
          <strong>2,250–2,850</strong>
          <span>Built-up area, sq ft</span>
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
    <nav className="pr-nav" aria-label="Project sections">
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
    <section className="pr-sec" id="overview">
      <Heading eyebrow="About Tricore Projects" title={<>Building premium living experiences <em>in Shankarpally.</em></>}>
        <p>A gated community of spacious 4 BHK villas in one of Hyderabad’s fast-growing residential destinations.</p>
      </Heading>

      <div className="pr-points">
        {HIGHLIGHTS.map((h, i) => (
          <Reveal key={h.text0} delay={i * 110}>
            <strong>
              {h.text0} <small>{h.title}</small>
            </strong>
            <p>{h.text}</p>
          </Reveal>
        ))}
      </div>

      {STORY.map((s, i) => (
        <div className={`pr-row ${i % 2 ? 'flip' : ''}`} key={s.title}>
          <Reveal className="pr-frame">
            <button type="button" onClick={() => onOpen([{ src: IMG + s.image, alt: s.alt }], 0)} aria-label={`Open image: ${s.alt}`}>
              <Image src={IMG + s.image} alt={s.alt} />
              <span className="pr-hint">Enlarge</span>
            </button>
          </Reveal>
          <Reveal delay={140}>
            <p className="pr-eyebrow">{s.eyebrow}</p>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
            <Ticks items={s.points} />
          </Reveal>
        </div>
      ))}

      <div className="pr-glance">
        <Reveal>
          <p className="pr-eyebrow">At a glance</p>
          <h3>Designed for the way you live.</h3>
          <p>Key facts about the project, as listed in the supplied material.</p>
        </Reveal>
        <Reveal delay={120}>
          <dl>
            {GLANCE.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

function Gallery({ onOpen }) {
  return (
    <section className="pr-sec" id="gallery">
      <Heading eyebrow="Project gallery" title={<>A closer look at <em>villa living.</em></>}>
        <p>Exterior views and a sample interior. Tap any image to enlarge, and use the arrow keys to browse.</p>
      </Heading>
      <div className="pr-mosaic">
        {GALLERY.map((g, i) => (
          <button type="button" className="pr-tile" key={g.src} style={{ '--i': i }} onClick={() => onOpen(GALLERY, i)} aria-label={`Open image: ${g.alt}`}>
            <Image src={g.src} alt={g.alt} />
            <span>{g.alt}</span>
          </button>
        ))}
      </div>
      <p className="pr-note">Imagery is based on the material supplied. Renders and sample interiors are illustrative.</p>
    </section>
  );
}

function Plans({ onOpen }) {
  const [id, setId] = useState(PLANS[0].id);
  const plan = PLANS.find((p) => p.id === id);
  const items = PLANS.map((p) => ({ src: IMG + p.image, alt: `${p.label} floor plan, slab area ${p.area}` }));
  const index = PLANS.indexOf(plan);
  return (
    <section className="pr-sec" id="plans">
      <Heading eyebrow="Villa plans" title={<>A 150 sq yd villa, <em>floor by floor.</em></>}>
        <p>Sample east-facing 4 BHK villa shown in the supplied plan. Total built-up area: 2,290 sq ft.</p>
      </Heading>

      <div className="pr-nums">
        <div>
          <strong>150</strong>
          <span>sq yd plot area</span>
        </div>
        <div>
          <strong>2,290</strong>
          <span>sq ft total built-up</span>
        </div>
        <div>
          <strong>4 BHK</strong>
          <span>luxury villa</span>
        </div>
      </div>

      <div className="pr-tabs big" role="tablist" aria-label="Floor">
        {PLANS.map((p) => (
          <button key={p.id} type="button" role="tab" aria-selected={p.id === id} onClick={() => setId(p.id)}>
            {p.label}
            <small>Slab area {p.area}</small>
          </button>
        ))}
      </div>

      <button type="button" className="pr-plan" key={id} onClick={() => onOpen(items, index)} aria-label={`Enlarge ${plan.label} plan`}>
        <Image src={IMG + plan.image} alt={`${plan.label} floor plan`} />
        <span className="pr-hint">Click to enlarge and zoom</span>
      </button>
      <p className="pr-note">{plan.label}: slab area {plan.area}. Use the enlarged view to read dimensions.</p>
    </section>
  );
}

function Amenities({ onOpen }) {
  const [i, setI] = useState(0);
  const a = AMENITIES[i];
  const pics = AMENITIES.map((x) => ({ src: IMG + x.image, alt: x.title }));
  return (
    <section className="pr-sec" id="amenities">
      <Heading eyebrow="Community amenities" title={<>Spaces for everyday life <em>and special moments.</em></>}>
        <p>Shared spaces for community events, fitness, children and wellness.</p>
      </Heading>
      <div className="pr-row" key={a.image}>
        <div className="pr-frame in pop">
          <button type="button" onClick={() => onOpen(pics, i)} aria-label={`Open image: ${a.title}`}>
            <Image src={IMG + a.image} alt={a.title} />
            <span className="pr-hint">Enlarge</span>
          </button>
        </div>
        <div>
          <p className="pr-eyebrow">Amenity {String(i + 1).padStart(2, '0')}</p>
          <h3>{a.title}</h3>
          <p>{a.text}</p>
          <ul className="pr-list">
            {AMENITIES.map((x, n) => (
              <li key={x.title}>
                <button type="button" aria-current={n === i} onClick={() => setI(n)}>
                  <span>{String(n + 1).padStart(2, '0')}</span>
                  {x.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function LayoutSection({ onOpen }) {
  return (
    <section className="pr-sec" id="layout">
      <Heading eyebrow="Project layout" title={<>A planned gated community <em>in Shankarpally.</em></>}>
        <p>The layout shows numbered villas, social infrastructure and a park within the community.</p>
      </Heading>
      <div className="pr-row top">
        <Reveal className="pr-frame contain">
          <button type="button" onClick={() => onOpen([{ src: IMG + 'layout.jpg', alt: 'Praneeta Singapore Town Phase-II villa layout with numbered homes, social infrastructure and park' }], 0)} aria-label="Open project layout">
            <Image src={IMG + 'layout.jpg'} alt="Praneeta Singapore Town Phase-II project layout" />
            <span className="pr-hint">View layout</span>
          </button>
        </Reveal>
        <Reveal delay={140}>
          <h3>Project features</h3>
          <Ticks items={FEATURES} />
          <Link className="pr-link" to="/contact">
            Ask us about the layout <Arrow />
          </Link>
        </Reveal>
      </div>

      <div className="pr-row top">
        <Reveal>
          <p className="pr-eyebrow">Location</p>
          <h3>Shankarpally, Hyderabad</h3>
          <p>Contact our team to confirm the exact site location and arrange a visit.</p>
          <a className="pr-link" href="https://www.google.com/maps/search/?api=1&query=Shankarpally%2C+Hyderabad" target="_blank" rel="noreferrer">
            Open Shankarpally in Maps <Arrow diagonal />
          </a>
        </Reveal>
        <Reveal className="pr-map" delay={140}>
          <iframe title="Map of Shankarpally, Hyderabad" src="https://www.google.com/maps?q=Shankarpally%2C%20Hyderabad&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </Reveal>
      </div>
    </section>
  );
}

function Approvals() {
  return (
    <section className="pr-sec" id="approvals">
      <Heading eyebrow="Project approvals" title={<>Approval details <em>as supplied.</em></>}>
        <p>Please verify the latest records before booking.</p>
      </Heading>
      <div className="pr-approvals">
        <Reveal>
          <Image src={IMG + 'hmda.jpg'} alt="HMDA logo" />
          <div>
            <h3>HMDA approval</h3>
            <p className="ref">{PROJECT.hmda}</p>
            <span>Dated {PROJECT.hmdaDate}</span>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <Image src={IMG + 'ts-rera.jpg'} alt="Telangana RERA logo" />
          <div>
            <h3>TS RERA registration</h3>
            <p className="ref">Reg. No. {PROJECT.rera}</p>
            <span>Telangana Real Estate Regulatory Authority</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function PraneetaSingaporeTown() {
  const [lb, setLb] = useState(null);
  const open = useCallback((items, index) => setLb({ items, index }), []);
  const close = useCallback(() => setLb(null), []);
  const setIndex = useCallback((index) => setLb((s) => (s ? { ...s, index } : s)), []);

  return (
    <section className="section container page-top praneeta">
      <style>{CSS}</style>
      <Hero />
      <SectionNav />
      <Overview onOpen={open} />
      <Gallery onOpen={open} />
      <Plans onOpen={open} />
      <Amenities onOpen={open} />
      <LayoutSection onOpen={open} />
      <Approvals />

      <section className="pr-sec" id="faq">
        <div className="pr-row top">
          <Reveal>
            <p className="pr-eyebrow">Good to know</p>
            <h2>
              Questions, <em>answered.</em>
            </h2>
            <p>Want to see the villas for yourself? We can arrange a site visit.</p>
            <Link className="pr-link" to="/contact">
              Talk to our team <Arrow />
            </Link>
          </Reveal>
          <Reveal delay={120}>
            {FAQS.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </Reveal>
        </div>
      </section>

      <p className="pr-legal">
        Developed by {PROJECT.developer} · HMDA {PROJECT.hmda} · TS RERA {PROJECT.rera} · Project details and imagery are based on the material supplied. Confirm current pricing, availability, construction status, specifications and approvals directly with the developer before booking.
      </p>

      <Link className="pr-float" to="/contact">
        Enquire <Arrow />
      </Link>
      {lb && <Lightbox items={lb.items} index={lb.index} onClose={close} onIndex={setIndex} />}
    </section>
  );
}

/* Lightbox styles live separately because the lightbox renders on <body>. */
const LB_CSS = `
.pr-lb{position:fixed;inset:0;z-index:99999;display:grid;grid-template-rows:auto minmax(0,1fr) auto;height:100vh;height:100dvh;background:rgba(10,20,34,.96);color:#fff;animation:pr-fade .3s ease}
.pr-lb *{box-sizing:border-box}
.pr-lb-bar{display:flex;justify-content:space-between;align-items:center;padding:14px 20px;font-size:.9rem}
.pr-lb-bar div{display:flex;gap:10px}
.pr-lb-bar button{padding:8px 14px;border:1px solid rgba(255,255,255,.35);border-radius:999px;background:none;color:#fff;font:inherit;cursor:pointer}
.pr-lb-stage{display:flex;align-items:center;justify-content:center;min-height:0;overflow:hidden;padding:0 76px}
.pr-lb-stage img{display:block;width:auto;height:auto;max-width:100%;max-height:calc(100vh - 140px);max-height:calc(100dvh - 140px);object-fit:contain;border-radius:6px;background:#fff}
.pr-lb-stage.zoom{display:block;overflow:auto;padding:0 20px;cursor:zoom-out}
.pr-lb-stage.zoom img{max-width:none;max-height:none;width:220%;margin:0 auto}
.pr-lb-cap{margin:0;padding:12px 20px 18px;text-align:center;color:rgba(255,255,255,.85);font-size:.9rem}
.pr-lb-nav{position:absolute;top:50%;width:48px;height:48px;margin-top:-24px;border:1px solid rgba(255,255,255,.35);border-radius:50%;background:rgba(255,255,255,.08);color:#fff;font-size:1.8rem;line-height:1;cursor:pointer}
.pr-lb-nav.prev{left:14px}.pr-lb-nav.next{right:14px}
@keyframes pr-fade{from{opacity:0}to{opacity:1}}
@media (max-width:640px){.pr-lb-stage{padding:0 8px}.pr-lb-nav{top:auto;bottom:70px;margin-top:0;width:42px;height:42px}}
`;

const CSS = `
.praneeta{--ink:var(--navy,#21456f);--mute:var(--muted,#5d6b7c);--acc:var(--gold,#b8953f);--g1:#e6cf9f;--g2:#c9a55a;--line:rgba(33,69,111,.16);--ease:cubic-bezier(.2,.7,.2,1);padding-bottom:clamp(20px,3vw,36px)!important}
.praneeta *{box-sizing:border-box}
.praneeta img{display:block;max-width:100%}
.praneeta button{font:inherit;color:inherit;cursor:pointer}
.praneeta p{color:var(--mute);line-height:1.7}
.praneeta h2{margin-bottom:12px;font-size:clamp(1.9rem,3.2vw,2.7rem);line-height:1.12}
.praneeta h2 em,.praneeta h1 em{color:var(--acc)}
.praneeta h3{margin-bottom:10px;color:var(--ink)}
.praneeta .pr-eyebrow{margin-bottom:10px;color:var(--acc);font-size:.76rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase}
.praneeta .pr-sec{display:grid;gap:34px;padding-top:clamp(52px,6.5vw,88px);scroll-margin-top:120px}
.praneeta .pr-head{max-width:760px}
.praneeta .pr-head p:not(.pr-eyebrow){font-size:1.05rem}
.praneeta .pr-note{margin:-10px 0 0;font-size:.84rem}

/* page-level: lets the hero run edge to edge without a sideways scrollbar */
html,body{overflow-x:clip}

/* reveal */
.praneeta .pr-rv{opacity:0;transform:translateY(28px);transition:opacity .9s var(--ease) var(--d,0ms),transform .9s var(--ease) var(--d,0ms)}
.praneeta .pr-rv.in{opacity:1;transform:none}

/* breadcrumb */
.praneeta .pr-crumb{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin:0 0 18px;padding-top:clamp(36px,4vw,56px);color:var(--mute);font-size:.9rem;position:relative;z-index:1}
.praneeta .pr-crumb a,.praneeta .pr-crumb b{color:var(--ink);font-weight:600}

/* intro: centred under the breadcrumb */
.praneeta .pr-intro{display:flex;flex-direction:column;align-items:center;max-width:900px;margin:0 auto;padding:clamp(20px,4vw,44px) 0 clamp(30px,4vw,48px);text-align:center}
.praneeta .pr-intro>*{animation:pr-up 1s var(--ease) both}
.praneeta .pr-intro>:nth-child(2){animation-delay:.08s}.praneeta .pr-intro>:nth-child(3){animation-delay:.16s}
.praneeta .pr-intro>:nth-child(4){animation-delay:.26s}.praneeta .pr-intro>:nth-child(5){animation-delay:.36s}
.praneeta .pr-intro .pr-eyebrow{margin-bottom:12px}
.praneeta .pr-intro h1{margin-bottom:16px;color:var(--ink);font-size:clamp(2.7rem,6.6vw,5.4rem);font-weight:500;line-height:1.04}
.praneeta .pr-intro h1 em{font-style:italic}
.praneeta .pr-lead{max-width:700px;font-size:clamp(1rem,1.5vw,1.18rem)}
.praneeta .pr-status{display:inline-flex;align-items:center;gap:8px;margin-bottom:18px;padding:7px 14px;border:1px solid var(--line);border-radius:999px;background:rgba(255,255,255,.6);color:var(--ink);font-size:.82rem;font-weight:600}
.praneeta .pr-status i{width:8px;height:8px;border-radius:50%;background:var(--g2);animation:pr-pulse 2s ease-in-out infinite}
.praneeta .pr-actions{display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin-top:24px}
.praneeta .pr-btn{display:inline-flex;align-items:center;gap:10px;padding:13px 22px;border:1px solid transparent;border-radius:999px;background:linear-gradient(135deg,var(--g1),var(--g2));color:#1b2b40;font-weight:700;font-size:.94rem;transition:transform .3s var(--ease),box-shadow .3s}
.praneeta .pr-btn:hover{transform:translateY(-2px);box-shadow:0 14px 30px rgba(0,0,0,.2)}
.praneeta .pr-btn.ghost{border-color:var(--ink);background:transparent;color:var(--ink)}

/* hero: full screen, edge to edge, no card */
.praneeta .pr-hero{position:relative;width:100vw;margin-left:calc(50% - 50vw);height:100vh;height:100svh;min-height:520px;overflow:hidden;background:rgba(33,69,111,.12)}
.praneeta .pr-hero-img{position:absolute;inset:0;width:100%;height:100%;max-width:none;object-fit:cover;object-position:center;opacity:0;transition:opacity 1.4s ease}
.praneeta .pr-hero-img.on{opacity:1}
.praneeta .pr-dots{position:absolute;left:50%;bottom:clamp(20px,3vw,34px);z-index:3;display:flex;gap:8px;transform:translateX(-50%)}
.praneeta .pr-dots button{width:34px;height:3px;padding:0;border:0;border-radius:3px;background:rgba(255,255,255,.55);transition:background .3s,width .3s}
.praneeta .pr-dots button.on{width:52px;background:var(--g1)}

/* facts */
.praneeta .pr-facts{display:grid;grid-template-columns:repeat(4,1fr);margin-top:32px;border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
.praneeta .pr-facts>div{padding:26px 22px;border-left:1px solid var(--line)}
.praneeta .pr-facts>div:first-child{border-left:0}
.praneeta .pr-facts strong{display:block;font-family:var(--serif);font-size:clamp(1.6rem,3vw,2.6rem);font-weight:500;line-height:1.05;color:var(--ink);white-space:nowrap}
.praneeta .pr-facts>div>span{display:block;margin-top:8px;color:var(--mute);font-size:.92rem}

/* section nav */
.praneeta .pr-nav{position:sticky;top:84px;z-index:20;display:flex;gap:30px;overflow:auto;margin-top:26px;padding:12px 4px;border-bottom:1px solid var(--line);scrollbar-width:none;backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px)}
.praneeta .pr-nav::-webkit-scrollbar{display:none}
.praneeta .pr-nav a{position:relative;flex:none;padding:4px 0;color:var(--mute);font-size:.92rem;font-weight:500;transition:color .3s}
.praneeta .pr-nav a::after{content:'';position:absolute;left:0;right:0;bottom:-13px;height:2px;background:var(--acc);transform:scaleX(0);transition:transform .35s var(--ease)}
.praneeta .pr-nav a.on{color:var(--ink);font-weight:700}
.praneeta .pr-nav a.on::after{transform:scaleX(1)}

/* overview */
.praneeta .pr-points{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid var(--line)}
.praneeta .pr-points>div{padding:22px 20px 0 0}
.praneeta .pr-points strong{display:block;font-family:var(--serif);font-size:clamp(1.6rem,2.6vw,2.2rem);font-weight:500;line-height:1.1;color:var(--ink)}
.praneeta .pr-points small{font-family:inherit;font-size:.9rem;font-weight:500;color:var(--acc)}
.praneeta .pr-points p{margin-top:8px;font-size:.92rem}
.praneeta .pr-row{display:grid;grid-template-columns:1fr 1fr;gap:clamp(30px,5vw,72px);align-items:center}
.praneeta .pr-row>*{min-width:0}
.praneeta .pr-row.top{align-items:start}
.praneeta .pr-row.flip>:first-child{order:2}
.praneeta .pr-row h3{font-size:clamp(1.5rem,2.4vw,2rem)}
.praneeta .pr-link{display:inline-flex;align-items:center;gap:8px;margin-top:22px;padding-bottom:3px;border-bottom:1.5px solid var(--acc);color:var(--ink);font-weight:700}
.praneeta .pr-ticks{display:grid;gap:11px;margin:18px 0 0;padding:0;list-style:none}
.praneeta .pr-ticks li{position:relative;padding-left:32px;color:var(--ink);font-weight:500;line-height:1.5}
.praneeta .pr-ticks li::before{content:'';position:absolute;left:0;top:1px;width:22px;height:22px;border-radius:50%;background:rgba(184,149,63,.18)}
.praneeta .pr-ticks li::after{content:'';position:absolute;left:8px;top:6px;width:5px;height:9px;border:solid var(--acc);border-width:0 2px 2px 0;transform:rotate(45deg)}

/* image frame: the picture sits INSIDE the border, edge to edge */
.praneeta .pr-frame{position:relative;margin:0;padding:10px;border:1.5px solid rgba(184,149,63,.6);border-radius:30px;background:rgba(255,255,255,.55)}
.praneeta .pr-frame.pop{animation:pr-pop .8s var(--ease) both}
.praneeta .pr-frame>button{position:relative;display:block;width:100%;padding:0;border:0;background:rgba(33,69,111,.08);border-radius:20px;overflow:hidden;cursor:zoom-in}
.praneeta .pr-frame img{display:block;width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:20px}
.praneeta .pr-frame.contain img{aspect-ratio:auto;height:auto;object-fit:contain;background:#fff}
.praneeta .pr-hint{position:absolute;top:14px;right:14px;padding:6px 12px;border-radius:999px;background:rgba(15,34,56,.72);color:#fff;font-size:.74rem;font-weight:600;opacity:0;transition:opacity .3s;pointer-events:none}
.praneeta button:hover>.pr-hint,.praneeta button:focus-visible>.pr-hint{opacity:1}

/* at a glance */
.praneeta .pr-glance{display:grid;grid-template-columns:1fr 1.2fr;gap:clamp(30px,6vw,84px);align-items:start;padding-top:8px}
.praneeta dl{margin:0}
.praneeta .pr-glance dl>div{display:flex;justify-content:space-between;gap:20px;padding:15px 0;border-bottom:1px solid var(--line)}
.praneeta .pr-glance dl>div:first-child{border-top:1px solid var(--line)}
.praneeta dt{color:var(--mute)}
.praneeta dd{margin:0;color:var(--ink);font-weight:600;text-align:right;word-break:break-word}

/* tabs */
.praneeta .pr-tabs{display:flex;flex-wrap:wrap;gap:6px 28px;margin-bottom:-6px;border-bottom:1px solid var(--line)}
.praneeta .pr-tabs button{position:relative;display:grid;gap:2px;padding:10px 0 14px;border:0;background:none;color:var(--mute);font-weight:600;text-align:left;transition:color .3s}
.praneeta .pr-tabs button small{color:var(--mute);font-size:.76rem;font-weight:500}
.praneeta .pr-tabs button::after{content:'';position:absolute;left:0;right:0;bottom:-1px;height:2px;background:var(--acc);transform:scaleX(0);transform-origin:left;transition:transform .4s var(--ease)}
.praneeta .pr-tabs button[aria-selected="true"]{color:var(--ink)}
.praneeta .pr-tabs button[aria-selected="true"]::after{transform:scaleX(1)}
.praneeta .pr-tabs.big button{font-size:1.1rem}

/* gallery */
.praneeta .pr-mosaic{display:grid;grid-template-columns:repeat(4,1fr);grid-auto-rows:210px;gap:14px}
.praneeta .pr-tile{position:relative;overflow:hidden;padding:0;border:1.5px solid rgba(184,149,63,.45);border-radius:20px;background:rgba(33,69,111,.08);animation:pr-pop .8s var(--ease) both;animation-delay:calc(var(--i) * 80ms)}
.praneeta .pr-tile:nth-child(1){grid-column:span 2;grid-row:span 2}
.praneeta .pr-tile:nth-child(4){grid-column:span 2}
.praneeta .pr-tile img{width:100%;height:100%;object-fit:cover;transition:transform .8s var(--ease)}
.praneeta .pr-tile:hover img{transform:scale(1.04)}
.praneeta .pr-tile span{position:absolute;left:0;right:0;bottom:0;padding:34px 14px 12px;background:linear-gradient(transparent,rgba(15,34,56,.75));color:#fff;font-size:.84rem;font-weight:500;text-align:left;opacity:0;transform:translateY(8px);transition:opacity .35s,transform .35s}
.praneeta .pr-tile:hover span,.praneeta .pr-tile:focus-visible span{opacity:1;transform:none}

/* plans */
.praneeta .pr-nums{display:flex;flex-wrap:wrap;gap:14px 44px}
.praneeta .pr-nums strong{display:block;font-family:var(--serif);font-size:clamp(2.2rem,4vw,3.2rem);font-weight:500;line-height:1;color:var(--ink)}
.praneeta .pr-nums span{color:var(--mute);font-size:.88rem}
.praneeta .pr-plan{position:relative;display:block;width:100%;padding:14px;border:1.5px solid rgba(184,149,63,.6);border-radius:28px;overflow:hidden;background:#fff;animation:pr-pop .8s var(--ease) both;cursor:zoom-in}
.praneeta .pr-plan img{width:100%;height:auto;max-height:78vh;object-fit:contain;margin:0 auto}
.praneeta .pr-plan .pr-hint{top:24px;right:24px}

/* amenities */
.praneeta .pr-list{display:grid;margin:22px 0 0;padding:0;list-style:none;border-top:1px solid var(--line)}
.praneeta .pr-list button{display:flex;align-items:center;gap:16px;width:100%;padding:15px 0;border:0;border-bottom:1px solid var(--line);background:none;color:var(--mute);font-weight:600;text-align:left;transition:color .3s,padding .3s}
.praneeta .pr-list button span{color:var(--acc);font-family:var(--serif);font-size:1.05rem}
.praneeta .pr-list button:hover,.praneeta .pr-list button[aria-current="true"]{color:var(--ink)}
.praneeta .pr-list button[aria-current="true"]{padding-left:10px;box-shadow:inset 3px 0 0 var(--acc)}

/* map */
.praneeta .pr-map{overflow:hidden;border-radius:26px;border:1.5px solid rgba(184,149,63,.6)}
.praneeta .pr-map iframe{display:block;width:100%;height:clamp(300px,36vw,400px);border:0}

/* approvals */
.praneeta .pr-approvals{display:grid;grid-template-columns:1fr 1fr;gap:0;border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
.praneeta .pr-approvals>div{display:flex;align-items:center;gap:26px;padding:clamp(22px,3vw,36px) clamp(0px,2vw,24px)}
.praneeta .pr-approvals>div+div{border-left:1px solid var(--line);padding-left:clamp(22px,3vw,40px)}
.praneeta .pr-approvals img{flex:none;width:130px;height:90px;object-fit:contain;mix-blend-mode:multiply}
.praneeta .pr-approvals h3{margin-bottom:4px;font-size:1.15rem}
.praneeta .pr-approvals .ref{margin:0;color:var(--ink);font-weight:700;word-break:break-all}
.praneeta .pr-approvals span{color:var(--mute);font-size:.86rem}

/* faq */
.praneeta details{border-bottom:1px solid var(--line)}
.praneeta details:first-of-type{border-top:1px solid var(--line)}
.praneeta summary{position:relative;padding:18px 34px 18px 0;color:var(--ink);font-weight:600;cursor:pointer;list-style:none}
.praneeta summary::-webkit-details-marker{display:none}
.praneeta summary::after{content:'+';position:absolute;right:4px;top:50%;transform:translateY(-50%);color:var(--acc);font-size:1.5rem;transition:transform .3s}
.praneeta details[open] summary::after{transform:translateY(-50%) rotate(45deg)}
.praneeta details p{margin:0 0 18px}
.praneeta .pr-legal{margin-top:34px;font-size:.78rem;text-align:center}
.praneeta .pr-float{position:fixed;right:18px;bottom:18px;z-index:30;display:none;align-items:center;gap:8px;padding:13px 20px;border-radius:999px;background:var(--ink);color:#fff;font-weight:700;box-shadow:0 12px 30px rgba(15,34,56,.35)}

@keyframes pr-up{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
@keyframes pr-pop{from{opacity:0;transform:translateY(22px) scale(.98)}to{opacity:1;transform:none}}
@keyframes pr-pulse{0%,100%{box-shadow:0 0 0 0 rgba(201,165,90,.6)}50%{box-shadow:0 0 0 7px rgba(201,165,90,0)}}

@media (max-width:960px){
  .praneeta .pr-facts,.praneeta .pr-points{grid-template-columns:1fr 1fr}
  .praneeta .pr-facts>div:nth-child(3){border-left:0}
  .praneeta .pr-facts>div:nth-child(n+3){border-top:1px solid var(--line)}
  .praneeta .pr-row,.praneeta .pr-glance{grid-template-columns:1fr}
  .praneeta .pr-row.flip>:first-child{order:0}
  .praneeta .pr-hero{height:auto;min-height:0;aspect-ratio:16/9;max-height:80vh;max-height:80svh}
  .praneeta .pr-mosaic{grid-template-columns:repeat(2,1fr);grid-auto-rows:170px}
  .praneeta .pr-tile:nth-child(1){grid-column:span 2;grid-row:span 1}
  .praneeta .pr-approvals{grid-template-columns:1fr}
  .praneeta .pr-approvals>div+div{border-left:0;border-top:1px solid var(--line);padding-left:0}
  .praneeta .pr-float{display:inline-flex}
}
@media (max-width:640px){
  .praneeta .pr-nav{top:76px;gap:22px}
  .praneeta .pr-hero{aspect-ratio:4/3}
  .praneeta .pr-intro{padding-left:6px;padding-right:6px}
  .praneeta .pr-intro h1{font-size:clamp(2.3rem,10.5vw,3.2rem)}
  .praneeta .pr-actions{width:100%}
  .praneeta .pr-actions .pr-btn{flex:1 1 100%;justify-content:center}
  .praneeta .pr-facts strong{white-space:normal;font-size:1.35rem}
  .praneeta .pr-frame,.praneeta .pr-plan{padding:7px;border-radius:24px}
  .praneeta .pr-frame>button,.praneeta .pr-frame img{border-radius:17px}
  .praneeta .pr-mosaic{grid-auto-rows:150px;gap:10px}
  .praneeta .pr-approvals>div{flex-direction:column;align-items:flex-start;gap:14px}
}
@media (prefers-reduced-motion:reduce){
  .praneeta *{animation:none!important;transition:none!important}
  .praneeta .pr-rv{opacity:1;transform:none}
}
`;