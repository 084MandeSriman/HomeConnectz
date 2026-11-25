import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';

/* ------------------------------------------------------------------ */
/*  Images live in  public/images/praneeta/  (copy the whole folder)   */
/*  East plans: plan-ground.jpg  plan-first.jpg  plan-terrace.jpg      */
/*  West plans: plan-west-ground.jpg  plan-west-first.jpg  plan-west-terrace.jpg */
/* ------------------------------------------------------------------ */
const BASES = ['/images/praneeta/', '/images/', '/praneeta/', '/'];
const IMG = BASES[0];

const PROJECT = {
  name: 'Praneeta Singapore Town Phase-II',
  status: 'Ongoing project',
  location: 'Shankarpally, Hyderabad',
  developer: 'Praneeta Developers',
  partner: 'Tricore Projects Pvt Ltd',
  address: '#B-506, The Platina Building, Jayabheri Enclave, Beside Radisson Hotel, Gachibowli, Hyderabad, Telangana – 500032',
  phones: [['+91 97016 97333', '+919701697333'], ['+91 97016 98333', '+919701698333']],
  rate: '₹6,999',
  from: '₹1.6 Cr',
  hmda: '002446/HMDA/00732/SWFL/SKP2/2025',
  hmdaDate: '07/08/2025',
  rera: 'P02400009800',
};

const HERO_SLIDES = [
  { src: IMG + 'villa-main.jpg', alt: 'Praneeta Singapore Town Phase-II villa elevation' },
  { src: IMG + 'villa-evening.jpg', alt: 'Villa exterior at dusk' },
];

const SECTIONS = [
  ['overview', 'Overview'],
  ['highlights', 'Highlights'],
  ['plans', 'Floor plans'],
  ['gallery', 'Gallery'],
  ['amenities', 'Amenities'],
  ['layout', 'Layout'],
  ['location', 'Location'],
  ['specs', 'Specifications'],
  ['contact', 'Contact'],
];

const HIGHLIGHTS = [
  { to: 35, title: 'villas', text: 'Premium luxury villas' },
  { text0: '2 ac 10 gt', title: 'gated community', text: 'Spread across 2 acres 10 guntas' },
  { text0: 'G+2', title: '4 BHK', text: 'Standard layouts on 150 sq yd plots' },
  { text0: '₹6,999', title: 'per sq ft', text: `Villas from ${'₹1.6 Cr'}*` },
];

const GLANCE = [
  ['Villas', '35 premium 4 BHK villas, G+2'],
  ['Project area', '2 acres 10 guntas'],
  ['Plot size', '150 sq yds (up to 190)'],
  ['Built-up area', '2,290 sq ft east · 2,323 sq ft west'],
  ['Price', '₹6,999 per sq ft'],
  ['Starting price', `From ${PROJECT.from}*`],
  ['Developer', PROJECT.developer],
  ['In association with', PROJECT.partner],
  ['TS RERA', PROJECT.rera],
];

const NEARBY = [
  ['ORR Exit No. 2', '15 min'],
  ['Neopolis', '20 min'],
  ['Mobility Valley', '20 min'],
  ['ICFAI Business School', '15 min'],
  ['Kondakal IT SEZ', '12 min'],
  ['Nagulapalli Railway Junction (new announcement)', '10 min'],
  ['Shankarpalli Railway Station', '5 min'],
  ['10+ international schools', 'Surrounding'],
];

const WHY = ['Fast-developing premium zone', 'Excellent connectivity to IT corridors', 'Peaceful environment with rapid urban growth', 'Perfect for investment and luxury living'];

const GALLERY = [
  { src: IMG + 'villa-main.jpg', alt: 'Villa elevation' },
  { src: IMG + 'villa-evening.jpg', alt: 'Villa exterior at dusk' },
  { src: IMG + 'villa-day.jpg', alt: 'Villa exterior in daylight' },
];

const PLANS = {
  east: {
    label: 'East facing',
    total: '2,290 sq ft',
    floors: [
      { id: 'ground', label: 'Ground floor', image: 'plan-ground.jpg', area: '953' },
      { id: 'first', label: 'First floor', image: 'plan-first.jpg', area: '903' },
      { id: 'terrace', label: 'Terrace floor', image: 'plan-terrace.jpg', area: '434' },
    ],
  },
  west: {
    label: 'West facing',
    total: '2,323 sq ft',
    floors: [
      { id: 'ground', label: 'Ground floor', image: 'plan-west-ground.jpg', area: '898' },
      { id: 'first', label: 'First floor', image: 'plan-west-first.jpg', area: '860' },
      { id: 'terrace', label: 'Terrace floor', image: 'plan-west-terrace.jpg', area: '565' },
    ],
  },
};

const AMENITIES = [
  { image: 'amenity-gym.jpg', title: 'Gym' },
  { image: 'amenity-play.jpg', title: 'Kid’s play area' },
  { image: 'amenity-yoga.jpg', title: 'Yoga / meditation area' },
  { image: 'amenity-hall.jpg', title: 'Banquet / multi-purpose hall' },
];

const LAYOUT_POINTS = ['35 villa plots, numbered', 'Plot sizes from 150 to 190 sq yds', '33 ft and 30 ft internal roads', 'Social infrastructure and parks within the community'];

const SPECS = [
  { title: 'Structure', items: [['Super structure', 'R.C.C. framed super structure.'], ['Walls', '9" red bricks for external walls and 4" bricks for internal walls.']] },
  { title: 'Plastering', items: [['Internal', 'Double coat cement plaster with smooth finish.'], ['External', 'Two coats of cement plastering with sponge finish.']] },
  {
    title: 'Doors & windows',
    items: [
      ['Main door frame', 'Kiln-dried teak wood, P.U. polished with architraves / beadings.'],
      ['Main door shutter', 'Solid hardwood flush door shutters, chemically pressure treated and P.U. polished.'],
      ['Internal door frame', 'Kiln-dried teak wood, P.U. polished with architraves / beadings.'],
      ['Internal door shutter', 'Solid hardwood flush door shutters, chemically pressure treated and P.U. polished.'],
      ['Windows', 'UPVC windows of reputed make with mosquito mesh track provision.'],
    ],
  },
  { title: 'Painting', items: [['Exterior', 'Asian / Berger or equivalent weather-shield exterior-grade emulsion paint on luppam.'], ['Interior', 'Smooth finish with luppam, over a coat of primer and finished with 2 coats of Asian or Nerolac emulsion paint.']] },
  { title: 'Railings', items: [['Staircase', 'SS railing with glass.'], ['Balcony', 'SS railing with glass.']] },
  {
    title: 'Flooring',
    items: [
      ['Entire house', '2×4 and 2×2 Varmora or equivalent brand glazed vitrified tiles throughout the house.'],
      ['Stairs & landing', 'Granite.'],
      ['Kitchen', 'Premier quality granite platform and glazed ceramic dado tiles up to 2 feet.'],
      ['Balconies', 'RAK Ceramics or equivalent brand double-charged or full-body vitrified tiles.'],
      ['Parking', 'Anti-skid granite parking tiles.'],
      ['Terrace', 'Anti-skid ceramic flooring.'],
    ],
  },
  {
    title: 'Bathrooms',
    items: [
      ['Fittings', 'EWC with concealed flush tank (Hindware or equivalent). All CP fittings by Hindware or equivalent brand.'],
      ['Shower', 'Wall-mounted hot and cold water diverter with shower (Hindware or equivalent). Provision for geysers.'],
      ['Tiles', 'Wall tiles (RAK Ceramics or equivalent brand) up to ceiling height. Ceramic anti-skid flooring (RAK Ceramics or equivalent brand).'],
    ],
  },
  {
    title: 'Electrical',
    items: [
      ['Wiring', 'Finolex / Havells or equivalent brand, concealed copper wiring. Concealed wiring with inverter backup.'],
      ['Switches & boards', 'Elegant modular switches by Havells / Legrand or equivalent brand. Legrand or equivalent MCBs and distribution boards.'],
      ['Provisions', 'AC in all halls and bedrooms. Cable TV in the living room and bedroom. Internet.'],
    ],
  },
];

const reduced = () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function Arrow({ diagonal = false }) {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {diagonal ? <path d="M7 17 17 7M8 7h9v9" /> : <path d="M5 12h14m-6-6 6 6-6 6" />}
    </svg>
  );
}

/* Tries the usual public-folder locations before giving up, so a slightly
   different folder layout still shows every picture. */
function Image({ src, alt, className = '', eager = false, fallback = src, referrerPolicy }) {
  const file = fallback.split('/').pop();
  const options = [...new Set([src, fallback, ...BASES.map((b) => b + file)])];
  const [n, setN] = useState(0);
  useEffect(() => setN(0), [src]);
  return (
    <img
      className={className}
      src={options[Math.min(n, options.length - 1)]}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      referrerPolicy={referrerPolicy}
      onError={(event) => {
        if (n < options.length - 1) setN(n + 1);
        else {
          event.currentTarget.style.visibility = 'hidden';
          if (typeof console !== 'undefined') console.warn('Praneeta image not found: ' + file + ' (expected in public/images/praneeta/)');
        }
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

/* Rendered in a portal on <body> so no parent (transform, overflow, sticky nav)
   can crop it. The whole picture is always shown; "Zoom in" lets you scroll. */
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

function Ticks({ items, cols }) {
  return (
    <ul className={`pr-ticks ${cols ? 'two' : ''}`}>
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
    <header className="pr-hero">
      {HERO_SLIDES.map((s, i) => (
        <Image key={s.src} src={s.src} alt={i === slide ? s.alt : ''} className={`pr-hero-img ${i === slide ? 'on' : ''}`} eager={i === 0} />
      ))}

      <div className="pr-hero-in">
        <span className="pr-status">
          <i />
          {PROJECT.status}
        </span>
        <p className="pr-eyebrow">Premium 4 BHK villas · Shankarpally</p>
        <h1>
          Praneeta Singapore Town <em>Phase-II</em>
        </h1>
        <p className="pr-lede">2 Acres of Serenity. 35 Villas of Luxury. Villas from {PROJECT.from}*.</p>

        <div className="pr-hero-facts">
          <div>
            <strong>
              <Counter to={35} />
            </strong>
            <span>Exclusive villas</span>
          </div>
          <div>
            <strong>150–190</strong>
            <span>Sq yds, plot sizes</span>
          </div>
          <div>
            <strong>2,290–2,323</strong>
            <span>Built-up sq ft, east–west</span>
          </div>
          <div>
            <strong>{PROJECT.rate}</strong>
            <span>Per sq ft</span>
          </div>
        </div>
      </div>

      <div className="pr-dots" role="tablist" aria-label="Hero images">
        {HERO_SLIDES.map((s, i) => (
          <button key={s.src} type="button" role="tab" aria-selected={i === slide} aria-label={`Show image ${i + 1}`} className={i === slide ? 'on' : ''} onClick={() => setSlide(i)} />
        ))}
      </div>
    </header>
  );
}
function SectionNav() {
  const [scrolling, setScrolling] = useState(false);
  const linksRef = useRef(null);
  const activeLinkRef = useRef(null);
  useEffect(() => {
    let previousY = Math.max(0, window.scrollY);
    let idleTimer;

    const handleScroll = () => {
      const currentY = Math.max(0, window.scrollY);
      if (currentY === previousY) return;
      previousY = currentY;
      clearTimeout(idleTimer);
      setScrolling(true);
      idleTimer = setTimeout(() => setScrolling(false), 250);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(idleTimer);
    };
  }, []);
  const [active, setActive] = useState('overview');
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-35% 0px -55% 0px' }
    );
    SECTIONS.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    const links = linksRef.current;
    const activeLink = activeLinkRef.current;
    if (scrolling || !links || !activeLink || links.scrollWidth <= links.clientWidth) return;

    const offset = activeLink.getBoundingClientRect().left - links.getBoundingClientRect().left;
    links.scrollLeft += offset - (links.clientWidth - activeLink.offsetWidth) / 2;
  }, [active, scrolling]);
  return (
    <nav className="pr-nav" data-compact={scrolling} aria-label="Praneeta Singapore Town sections">
      <div className="pr-nav-in" ref={linksRef}>
        {SECTIONS.map(([id, label]) => (
          <a key={id} href={`#${id}`} ref={active === id ? activeLinkRef : null} className={active === id ? 'on' : ''} aria-current={active === id ? 'location' : undefined}>
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}

/* 1. Overview */
function Overview() {
  return (
    <section className="pr-sec tone-beige-glass" id="overview">
      <div className="pr-glance">
        <Reveal className="pr-head">
          <p className="pr-eyebrow">Project overview</p>
          <h2>Luxury and tranquility, <em>in Shankarpally.</em></h2>
          <p>Praneeta Singapore Town Phase-II is a rare blend of luxury and tranquility: modern living with nature’s serenity, in one of Hyderabad’s most promising growth corridors, close to IT hubs, top schools, reputed hospitals and entertainment zones.</p>
          <p>Spread across 2 acres 10 guntas, this exclusive gated community has 35 premium villas with G+2 floors and spacious 4 BHK layouts. Plot sizes range from 150 to 190 sq yds; the standard 150 sq yd east- and west-facing plans offer 2,290 sq ft and 2,323 sq ft built-up area, respectively.</p>
          <div className="pr-price-card">
            <span>Starting price*</span>
            <strong>{PROJECT.from}</strong>
            <small>{PROJECT.rate} per sq ft · East-facing standard · 150 sq yd · 2,290 sq ft</small>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <h3>At a glance</h3>
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

/* 2. Highlights */
function Highlights() {
  return (
    <section className="pr-sec tone-navy" id="highlights">
      <Heading eyebrow="Key highlights" title={<>Well connected, <em>peacefully placed.</em></>} />
      <div className="pr-points">
        {HIGHLIGHTS.map((h, i) => (
          <Reveal key={h.title} delay={i * 60}>
            <strong>{h.to ?? h.text0}</strong>
            <span className="pr-point-label">{h.title}</span>
            <p>{h.text}</p>
          </Reveal>
        ))}
      </div>
      <Reveal className="pr-why">
        <p className="pr-eyebrow">Why choose this villa?</p>
        <ul className="pr-why-grid">
          {WHY.map((w, i) => (
            <li key={w}>
              <span>{String(i + 1).padStart(2, '0')}</span>
              {w}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

/* 3. Floor plans */
function Plans({ onOpen }) {
  const [facing, setFacing] = useState('east');
  const [id, setId] = useState('ground');
  const set = PLANS[facing];
  const plan = set.floors.find((p) => p.id === id);
  const items = set.floors.map((p) => ({ src: IMG + p.image, alt: `${set.label} ${p.label} plan, ${p.area} sq ft` }));
  return (
    <section className="pr-sec tone-white" id="plans">
      <Heading eyebrow="Floor plans · 150 sq yds" title="Four bedrooms. Three floors. Your terrace.">
        <p>Choose east or west facing, then a floor.</p>
      </Heading>
      <div className="pr-plan-bar">
      <div className="pr-plan-buttons" role="group" aria-label="Facing">
        {Object.entries(PLANS).map(([key, p]) => (
          <button key={key} type="button" aria-pressed={key === facing} onClick={() => setFacing(key)}>{p.label}</button>
        ))}
      </div>
      <div className="pr-plan-buttons" role="group" aria-label="Floor">
        {set.floors.map((p) => (
          <button key={p.id} type="button" aria-pressed={p.id === id} onClick={() => setId(p.id)}>{p.label}</button>
        ))}
      </div>
      </div>
      <div className="pr-plan-showcase">
        <aside className="pr-plan-details" aria-label="Plan details">
          <span className="pr-plan-type">{set.label}</span>
          <h3>{plan.label}</h3>
          <dl>
            <div><dt>Floor area</dt><dd>{plan.area} sq ft</dd></div>
            <div><dt>Plot size</dt><dd>150 sq yds</dd></div>
            <div><dt>Total built-up</dt><dd>{set.total}</dd></div>
          </dl>
          <p className="pr-plan-facing">{set.floors.map((f) => f.area).join(' + ')} sq ft</p>
        </aside>
        <button type="button" className="pr-plan" key={facing + id} onClick={() => onOpen(items, set.floors.indexOf(plan))} aria-label={`Enlarge ${plan.label} plan`}>
          <Image src={IMG + plan.image} alt={`${set.label} ${plan.label} plan`} />
          <span className="pr-hint">Click to enlarge and zoom</span>
        </button>
      </div>
    </section>
  );
}

/* 4. Gallery */
function Gallery({ onOpen, isLightboxOpen }) {
  const [galleryRef, seen] = useInView();
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(() => !reduced());
  const count = GALLERY.length;

  useEffect(() => {
    if (!seen || !playing || isLightboxOpen) return undefined;
    const timer = setInterval(() => setActive((index) => (index + 1) % count), 2500);
    return () => clearInterval(timer);
  }, [count, isLightboxOpen, playing, seen]);

  return (
    <section ref={galleryRef} className="pr-sec tone-neutral" id="gallery" aria-label="Photo gallery">
      <h2>Gallery</h2>
      <div className="pr-gallery-window" onFocusCapture={() => setPlaying(false)}>
        {[-1, 0, 1].map((position) => {
          const index = (active + position + count) % count;
          const photo = GALLERY[index];
          return (
            <button key={photo.src} type="button" className="pr-gallery-slide" data-current={position === 0} tabIndex={position === 0 ? 0 : -1} style={{ '--position': position }} onClick={() => { setPlaying(false); onOpen(GALLERY, index); }} aria-label={`Enlarge ${photo.alt}`}>
              <Image src={photo.src} alt={photo.alt} eager />
            </button>
          );
        })}
      </div>
      <div className="pr-gallery-controls">
        <button type="button" onClick={() => { setPlaying(false); setActive((active + count - 1) % count); }}>Previous</button>
        <span>{active + 1} / {count}</span>
        <button type="button" onClick={() => { setPlaying(false); setActive((active + 1) % count); }}>Next</button>
        <button type="button" onClick={() => setPlaying(!playing)}>{playing ? 'Pause' : 'Play'}</button>
      </div>
    </section>
  );
}

/* 5. Amenities */
function Amenities({ onOpen }) {
  const pics = AMENITIES.map((x) => ({ src: IMG + x.image, alt: x.title }));
  return (
    <section className="pr-sec tone-navy" id="amenities">
      <Heading eyebrow="Amenities" title={<>Celebrate the finer side of life, <em>every day.</em></>} />
      <div className="pr-amen-grid">
        {pics.map((p, i) => (
          <Reveal key={p.src} delay={i * 70}>
            <button type="button" onClick={() => onOpen(pics, i)} aria-label={`Open image: ${p.alt}`}>
              <Image src={p.src} alt={p.alt} />
              <span>{p.alt}</span>
            </button>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* 6. Layout & location */
function LayoutSection({ onOpen }) {
  const layout = { src: IMG + 'layout.jpg', alt: 'Praneeta Singapore Town Phase-II layout with numbered villa plots, social infrastructure and parks' };
  return (
    <section className="pr-sec tone-sand" id="layout">
      <Heading eyebrow="Community layout" title={<>2 acres of serenity. <em>35 villas of luxury.</em></>} />
      <div className="pr-master-grid">
        <Reveal className="pr-master-card">
          <button type="button" onClick={() => onOpen([layout], 0)} aria-label="Enlarge project layout">
            <Image src={layout.src} alt={layout.alt} />
            <span className="pr-plan-caption"><span>Community layout</span><strong>Enlarge <Arrow diagonal /></strong></span>
          </button>
        </Reveal>
        <Reveal delay={140}>
          <h3>Layout features</h3>
          <Ticks items={LAYOUT_POINTS} />
        </Reveal>
      </div>
    </section>
  );
}

/* 7. Location */
function Location() {
  const q = encodeURIComponent('Shankarpally, Hyderabad');
  return (
    <section className="pr-sec tone-neutral" id="location">
      <Heading eyebrow="Shankarpally, Hyderabad" title="Peaceful surroundings, within easy reach." />
      <div className="pr-row pr-location-grid">
        <Reveal className="pr-map">
          <iframe title="Map of Shankarpally, Hyderabad" src={`https://www.google.com/maps?q=${q}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          <div className="pr-map-actions">
            <span>{PROJECT.location}</span>
            <a href={`https://www.google.com/maps/dir/?api=1&destination=${q}`} target="_blank" rel="noreferrer">Get directions <Arrow diagonal /></a>
          </div>
        </Reveal>
        <Reveal className="pr-location-nearby" delay={140}>
          <h3>Nearby destinations</h3>
          <ul className="pr-places">
            {NEARBY.map(([name, time]) => (
              <li key={name}>
                <span>{name}</span>
                <b>{time}</b>
              </li>
            ))}
          </ul>
          <p className="pr-note">Travel times are approximate and can vary with traffic.</p>
        </Reveal>
      </div>
    </section>
  );
}

/* 8. Specifications */
function Specs() {
  const [open, setOpen] = useState(0);
  return (
    <section className="pr-sec tone-navy" id="specs">
      <Heading eyebrow="Built to last" title="Specifications.">
        <p>The quality of materials and fittings, from the structure to the finishing touches.</p>
      </Heading>
      <div className="pr-spec-list">
        {SPECS.map((g, i) => (
          <Reveal className={`pr-spec ${open === i ? 'open' : ''}`} key={g.title}>
            <button type="button" aria-expanded={open === i} aria-controls={`pr-spec-panel-${i}`} onClick={() => setOpen(open === i ? -1 : i)}>
              <span className="t">{g.title}</span>
              <span className="p" aria-hidden="true" />
            </button>
            <div id={`pr-spec-panel-${i}`} className="pr-spec-body" aria-hidden={open !== i}>
              <dl>
                {g.items.map(([k, v]) => (
                  <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
                ))}
              </dl>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* 9. Contact & approvals */
function Contact() {
  return (
    <section className="pr-sec tone-neutral" id="contact">
      <div className="pr-contact-grid">
        <Reveal className="pr-dev">
          <p className="pr-eyebrow">Praneeta Developers</p>
          <h2>Visit us, call us.</h2>
          <address>
            Office: {PROJECT.address}
            <br />
            {PROJECT.phones.map(([label, tel], i) => (
              <span key={tel}>{i > 0 && ', '}<a href={`tel:${tel}`}>{label}</a></span>
            ))}
          </address>
          <p className="pr-assoc">In association with <b>{PROJECT.partner}</b></p>
          <Link className="pr-master-cta" to="/contact">Book a site visit <Arrow /></Link>
        </Reveal>
        <Reveal className="pr-approvals" delay={120}>
          <div>
            <Image src={IMG + 'hmda.jpg'} alt="HMDA logo" />
            <p className="ref">{PROJECT.hmda}<br /><span>Dt. {PROJECT.hmdaDate}</span></p>
          </div>
          <div>
            <Image src={IMG + 'ts-rera.jpg'} alt="Telangana RERA logo" />
            <p className="ref">Reg. No. {PROJECT.rera}</p>
          </div>
        </Reveal>
      </div>
      <p className="pr-legal">
        Disclaimer: This page is intended only as a conceptual presentation of the project and does not constitute a legal offering. The promoters reserve the right to make changes in elevation, plans, specifications and other details as may be deemed necessary. *Starting price is indicative for the 150 sq yd east-facing plan (2,290 sq ft) and subject to change.
      </p>
    </section>
  );
}

export default function PraneetaSingaporeTown() {
  const [lb, setLb] = useState(null);
  const open = useCallback((items, index) => setLb({ items, index }), []);
  const close = useCallback(() => setLb(null), []);
  const setIndex = useCallback((index) => setLb((s) => (s ? { ...s, index } : s)), []);

  return (
    <section className="container praneeta">
      <style>{CSS}</style>
      <Hero />
      <SectionNav />
      <Overview />
      <Highlights />
      <Plans onOpen={open} />
      <Gallery onOpen={open} isLightboxOpen={Boolean(lb)} />
      <Amenities onOpen={open} />
      <LayoutSection onOpen={open} />
      <Location />
      <Specs />
      <Contact />
      {lb && <Lightbox items={lb.items} index={lb.index} onClose={close} onIndex={setIndex} />}
    </section>
  );
}

/* Lightbox styles live separately because the lightbox renders on <body>,
   outside the .praneeta wrapper. */
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
@media (max-width:640px){
  .pr-lb-stage{padding:0 8px}
  .pr-lb-nav{top:auto;bottom:70px;margin-top:0;width:42px;height:42px}
}
`;

const CSS = `
.praneeta{--ink:var(--navy,#21456f);--mute:var(--muted,#5d6b7c);--acc:var(--accent,#355d83);--night:var(--deep,#0f2238);--line:rgba(33,69,111,.16);--sand:#b8a088;--ease:cubic-bezier(.2,.7,.2,1)}
.praneeta *{box-sizing:border-box}
.praneeta img{display:block;max-width:100%}
.praneeta button{font:inherit;color:inherit;cursor:pointer}
.praneeta p{color:var(--mute);line-height:1.7}
.praneeta h2{margin-bottom:12px;font-size:clamp(1.9rem,3.2vw,2.7rem);line-height:1.12}
.praneeta h2 em{color:var(--acc)}
.praneeta h3{margin-bottom:10px}
.praneeta .pr-eyebrow{margin-bottom:10px;color:var(--acc);font-size:.76rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase}

/* page-level: lets the hero and section backgrounds run edge to edge */
html,body{overflow-x:clip}

/* ---------- section bands: every section has its own background ---------- */
.praneeta .pr-sec{position:relative;isolation:isolate;display:grid;gap:34px;padding:clamp(56px,7vw,96px) 0;scroll-margin-top:150px}
.praneeta .pr-sec::before{content:'';position:absolute;top:0;bottom:0;left:50%;width:100vw;margin-left:-50vw;z-index:-1}
.praneeta .tone-white::before{background:linear-gradient(180deg,#ffffff,#fbfdff)}
.praneeta .tone-sky::before{background:radial-gradient(900px 420px at 92% 0%,rgba(174,203,230,.5),transparent 65%),linear-gradient(180deg,#f3f8fd,#e7f0f8)}
.praneeta .tone-beige-glass::before{background:var(--beige-glass-background,linear-gradient(180deg,#faf6f1,#f2eadf))}
.praneeta .tone-sand::before{background:radial-gradient(800px 380px at 6% 0%,rgba(184,160,136,.26),transparent 65%),linear-gradient(180deg,#faf6f1,#f2eadf)}
.praneeta .tone-navy::before{background:radial-gradient(900px 480px at 88% 0%,rgba(110,160,210,.3),transparent 60%),linear-gradient(135deg,#0b3b6d 0%,#0a2848 100%)}
.praneeta #features{gap:18px;padding-block:clamp(32px,4vw,56px)}
.praneeta :is(#features,#specs)::before{background:var(--footer-background,linear-gradient(135deg,#0b3b6d,#0a2848))}
.praneeta #features .pr-ticks{margin-top:0}
.praneeta .pr-head{max-width:760px}
.praneeta .pr-head p{font-size:1.05rem}
.praneeta .pr-note{font-size:.84rem;margin-top:-10px}

/* dark (navy) section: light text */
.praneeta .tone-navy h2,.praneeta .tone-navy h3{color:#fff}
.praneeta .tone-navy h2 em{color:#aecbe6}
.praneeta .tone-navy p{color:rgba(255,255,255,.82)}
.praneeta .tone-navy .pr-eyebrow{color:#aecbe6}
.praneeta .tone-navy .pr-tabs{border-color:rgba(255,255,255,.22)}
.praneeta .tone-navy .pr-tabs button{color:rgba(255,255,255,.68)}
.praneeta .tone-navy .pr-tabs button[aria-selected="true"]{color:#fff}
.praneeta .tone-navy .pr-tabs button::after{background:#dcebf8}
.praneeta .tone-navy .pr-ticks li{color:#fff}
.praneeta .tone-navy .pr-ticks li::before{background:rgba(255,255,255,.16)}
.praneeta .tone-navy .pr-ticks li::after{border-color:#dcebf8}

/* reveal */
.praneeta .pr-rv{opacity:0;transform:translateY(28px);transition:opacity .9s var(--ease) var(--d,0ms),transform .9s var(--ease) var(--d,0ms)}
.praneeta .pr-rv.in{opacity:1;transform:none}

/* ---------- hero slider: first thing on the page, content on top in white ---------- */
.praneeta .pr-hero{position:relative;width:100vw;margin-left:calc(50% - 50vw);height:100vh;height:100svh;min-height:640px;overflow:hidden;background:#0f2238}
.praneeta .pr-hero::after{content:'';position:absolute;inset:0;z-index:1;pointer-events:none;background:linear-gradient(180deg,rgba(10,24,42,.5) 0%,rgba(10,24,42,.3) 35%,rgba(10,24,42,.82) 100%)}
.praneeta .pr-hero-img{position:absolute;inset:0;width:100%;height:100%;max-width:none;object-fit:cover;opacity:0;transition:opacity 1.4s ease}
.praneeta .pr-hero-img.on{opacity:1;animation:pr-ken 24s ease-in-out infinite alternate}
.praneeta .pr-hero-in{position:absolute;inset:0;z-index:2;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:calc(var(--nav-top,84px) + var(--nav-h,0px) + 24px) 20px 68px;text-align:center;color:#fff}
.praneeta .pr-hero .pr-status{display:inline-flex;align-items:center;gap:8px;margin-bottom:18px;padding:7px 14px;border:1px solid rgba(255,255,255,.4);border-radius:999px;background:rgba(255,255,255,.14);color:#fff;font-size:.82rem;font-weight:600;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}
.praneeta .pr-hero .pr-status i{width:8px;height:8px;border-radius:50%;background:#2fb36b;animation:pr-pulse 2s ease-in-out infinite}
.praneeta .pr-hero .pr-eyebrow{margin-bottom:12px;color:#dcebf8}
.praneeta .pr-hero h1{margin-bottom:16px;color:#fff;font-size:clamp(3rem,7.4vw,6rem);line-height:1.02;text-shadow:0 4px 30px rgba(0,0,0,.35)}
.praneeta .pr-hero h1 em{font-style:italic;color:#bcd7ee}
.praneeta .pr-hero .pr-lede{max-width:680px;margin:0;color:rgba(255,255,255,.92);font-size:clamp(1rem,1.5vw,1.18rem)}
.praneeta .pr-hero-facts{display:grid;grid-template-columns:repeat(4,1fr);width:min(900px,100%);margin-top:clamp(22px,3vw,36px);border-top:1px solid rgba(255,255,255,.35)}
.praneeta .pr-hero-facts>div{padding:16px 10px 0;border-left:1px solid rgba(255,255,255,.3)}
.praneeta .pr-hero-facts>div:first-child{border-left:0}
.praneeta .pr-hero-facts strong{display:block;font-family:var(--sans);font-size:clamp(2rem,3.6vw,3rem);font-weight:500;line-height:1.15;font-variant-numeric:tabular-nums;color:#fff}
.praneeta .pr-hero-facts>div>span{display:block;margin-top:8px;color:rgba(255,255,255,.86);font-size:.92rem}
.praneeta .pr-dots{position:absolute;left:50%;bottom:clamp(20px,3vw,34px);z-index:3;display:flex;gap:8px;transform:translateX(-50%)}
.praneeta .pr-dots button{width:34px;height:3px;padding:0;border:0;border-radius:3px;background:rgba(255,255,255,.5);transition:background .3s,width .3s}
.praneeta .pr-dots button.on{width:52px;background:#dcebf8}

/* ---------- section nav: full-width bar right under the slider ---------- */
.praneeta .pr-nav{position:sticky;top:calc(var(--nav-top,84px) + var(--nav-h,0px) + 8px);z-index:20;height:52px;margin-bottom:-52px;padding-top:8px;pointer-events:none}
.praneeta #overview{padding-block:clamp(76px,8vw,92px) clamp(32px,4vw,56px)}
.praneeta .pr-nav-in{display:flex;gap:6px;width:max-content;max-width:100%;margin:0 auto;padding:6px;border-radius:999px;overflow-x:auto;scrollbar-width:none;pointer-events:auto;background:rgba(255,255,255,.9);box-shadow:inset 0 0 0 1px var(--line),0 8px 24px rgba(15,34,56,.14);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px)}
.praneeta .pr-nav[data-compact="true"]:not(:has(:focus-visible)) a:not(.on){display:none}
.praneeta .pr-nav-in::-webkit-scrollbar{display:none}
.praneeta .pr-nav a{flex:none;padding:8px 16px;border-radius:999px;color:var(--mute);font-size:.92rem;font-weight:500;white-space:nowrap;transition:background .3s,color .3s}
.praneeta .pr-nav a:hover{color:var(--ink);background:rgba(33,69,111,.08)}
.praneeta .pr-nav a.on{background:var(--ink);color:#fff;font-weight:600}
.praneeta .pr-nav[data-compact="true"]:not(:has(:focus-visible)) .pr-nav-in{display:flex;width:max-content;border-radius:999px}
@media(max-width:960px){
  .praneeta .pr-nav-in{gap:3px;overscroll-behavior-x:contain}
  .praneeta .pr-nav a{padding:7px 12px;font-size:.82rem}
}

/* overview / highlights */
.praneeta #highlights{gap:16px;padding-block:clamp(30px,4vw,52px)}
.praneeta .pr-points{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));border:1px solid var(--line);border-radius:16px;background:#ffffffed;box-shadow:0 8px 24px rgba(33,69,111,.08)}
.praneeta .pr-points>div{min-width:0;padding:clamp(10px,1.6vw,20px)}
.praneeta .pr-points>div + div{border-left:1px solid var(--line)}
.praneeta .pr-points strong{display:block;font-size:clamp(1.5rem,2.5vw,2.25rem);font-weight:650;line-height:1.1;font-variant-numeric:tabular-nums;letter-spacing:-.035em;color:var(--navy)}
.praneeta .pr-point-label{display:block;margin-top:3px;color:var(--acc);font-size:.87rem;font-weight:600}
.praneeta .pr-points p{margin:4px 0 0;font-size:.85rem!important}
.praneeta .pr-highlight-story{
  display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.25fr);gap:12px;
  padding:8px;border:1px solid var(--line);border-radius:18px;background:var(--beige-glass-background,linear-gradient(180deg,#faf6f1,#f2eadf));
}
.praneeta .pr-highlight-photo{position:relative;display:block;min-height:250px;overflow:hidden;padding:0;border:0;border-radius:12px;background:#dce6ef}
.praneeta .pr-highlight-photo img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.praneeta .pr-highlight-photo:focus-visible{outline:3px solid var(--acc);outline-offset:2px}
.praneeta .pr-highlight-enlarge{position:absolute;top:12px;right:12px;display:inline-flex;align-items:center;gap:5px;padding:5px 10px;border-radius:999px;background:#15283de6;color:#fff;font-size:.78rem}
.praneeta .pr-highlight-copy{padding:clamp(10px,2vw,22px)}
.praneeta .pr-highlight-options{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px}
.praneeta .pr-highlight-options button{padding:6px 13px;border:1px solid var(--line);border-radius:999px;background:#fff;color:var(--navy);font-size:.9rem;font-weight:600}
.praneeta .pr-highlight-options button[aria-pressed="true"]{background:var(--navy);color:#fff}
.praneeta .pr-highlight-copy .pr-ticks{gap:6px;margin-top:8px}
.praneeta .pr-row{display:grid;grid-template-columns:1fr 1fr;gap:clamp(30px,5vw,72px);align-items:center}
.praneeta .pr-row.top{align-items:start}
.praneeta .pr-row>*{min-width:0}
.praneeta .pr-row.flip>:first-child{order:2}

/* image frame: the picture sits INSIDE the border, edge to edge */
.praneeta .pr-frame{position:relative;margin:0;padding:10px;border:1.5px solid rgba(53,93,131,.6);border-radius:30px;background:rgba(255,255,255,.55)}
.praneeta .pr-frame>button{position:relative;display:block;width:100%;padding:0;border:0;background:none;border-radius:20px;overflow:hidden}
.praneeta .pr-frame img{display:block;width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:20px;background:rgba(33,69,111,.08)}
.praneeta .pr-frame.contain img{aspect-ratio:auto;height:auto;object-fit:contain;background:#fff}
.praneeta .pr-frame.in{opacity:1}
.praneeta .pr-frame .pr-hint{top:22px;right:22px}

.praneeta .pr-ticks{display:grid;gap:11px;margin:18px 0 0;padding:0;list-style:none}
.praneeta .pr-ticks.two{grid-template-columns:1fr 1fr;gap:11px 22px}
.praneeta .pr-ticks li{position:relative;padding-left:32px;color:var(--ink);font-weight:500;line-height:1.5}
.praneeta .pr-ticks li::before{content:'';position:absolute;left:0;top:1px;width:22px;height:22px;border-radius:50%;background:rgba(53,93,131,.18)}
.praneeta .pr-ticks li::after{content:'';position:absolute;left:8px;top:6px;width:5px;height:9px;border:solid var(--acc);border-width:0 2px 2px 0;transform:rotate(45deg)}
.praneeta .pr-glance{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.05fr);gap:clamp(20px,4vw,56px);align-items:start}
.praneeta .pr-lineart{width:100%;max-width:360px;margin-top:16px;mix-blend-mode:multiply;opacity:.85}
.praneeta dl{margin:0}
.praneeta .pr-glance dl{padding:6px 28px;border:1px solid var(--line);border-radius:24px;background:rgba(255,255,255,.8);box-shadow:0 14px 40px rgba(33,69,111,.08)}
.praneeta .pr-glance dl>div{display:flex;justify-content:space-between;gap:14px;padding:10px 0;border-bottom:1px solid var(--line)}
.praneeta .pr-glance dl>div:last-child{border-bottom:0}
.praneeta dt{color:var(--mute)}
.praneeta dd{margin:0;color:var(--ink);font-weight:600;text-align:right}

/* tabs */
.praneeta .pr-tabs{display:flex;flex-wrap:wrap;gap:6px 28px;margin-bottom:-6px;border-bottom:1px solid var(--line)}
.praneeta .pr-tabs button{position:relative;display:grid;gap:2px;padding:10px 0 14px;border:0;background:none;color:var(--mute);font-weight:600;text-align:left;transition:color .3s}
.praneeta .pr-tabs button small{color:inherit;opacity:.8;font-size:.76rem;font-weight:500}
.praneeta .pr-tabs button::after{content:'';position:absolute;left:0;right:0;bottom:-1px;height:2px;background:var(--acc);transform:scaleX(0);transform-origin:left;transition:transform .4s var(--ease)}
.praneeta .pr-tabs button[aria-pressed="true"],.praneeta .pr-tabs button[aria-selected="true"]{color:var(--ink)}
.praneeta .pr-tabs button[aria-pressed="true"]::after,.praneeta .pr-tabs button[aria-selected="true"]::after{transform:scaleX(1)}

/* gallery */

/* villas / floor plans */
.praneeta #villas{gap:14px;padding-block:clamp(30px,4vw,52px)}
.praneeta #villas .pr-note{margin:0}
.praneeta .pr-plan-buttons{display:flex;flex-wrap:wrap;gap:4px;width:fit-content;max-width:100%;padding:5px;border:1px solid var(--line);border-radius:24px;background:rgba(255,255,255,.9);box-shadow:0 6px 18px rgba(15,34,56,.09)}
.praneeta .pr-plan-buttons button{padding:7px clamp(9px,1.4vw,16px);border:0;border-radius:999px;background:transparent;color:var(--mute);font-size:.92rem;font-weight:500}
.praneeta .pr-plan-buttons button:hover{background:rgba(33,69,111,.08);color:var(--ink)}
.praneeta .pr-plan-buttons button[aria-pressed="true"]{background:var(--ink);color:#fff;font-weight:600}
.praneeta .pr-plan-showcase{display:grid;grid-template-columns:minmax(190px,.28fr) minmax(0,1fr);align-items:stretch;gap:clamp(14px,2.4vw,32px);width:100%;padding:clamp(12px,1.8vw,22px);border:1.5px solid rgba(53,93,131,.6);border-radius:28px;background:#f1eee8}
.praneeta .pr-plan-details{display:grid;align-content:center;justify-items:start;gap:clamp(12px,1.6vw,22px);min-width:0;padding:clamp(8px,1.4vw,20px)}
.praneeta .pr-plan-type{padding:7px 13px;border-radius:8px;background:#d7b05e;color:#29251d;font-size:.82rem;font-weight:600}
.praneeta .pr-plan-details h3{margin:0;color:#131820;font-size:clamp(1.45rem,2.5vw,2.2rem);line-height:1.1}
.praneeta .pr-plan-details dl{display:grid;gap:clamp(12px,1.6vw,22px);margin:0}
.praneeta .pr-plan-details dl div{display:grid;gap:3px}
.praneeta .pr-plan-details dt{color:#69717d;font-size:.92rem}
.praneeta .pr-plan-details dd{margin:0;color:#161b22;font-size:clamp(1.05rem,1.5vw,1.3rem);font-weight:600}
.praneeta .pr-plan-facing{margin:0;color:var(--ink);font-weight:600}
@media(max-width:640px){
  .praneeta .pr-plan-buttons{gap:6px;padding:0;border:0;background:none;box-shadow:none}
  .praneeta .pr-plan-buttons button{min-height:44px;padding:6px 10px;border:1px solid var(--line);background:#fff;color:var(--navy);font-size:.82rem}
  .praneeta .pr-plan-buttons button[aria-pressed="true"]{border-color:var(--ink);background:var(--ink);color:#fff}
  .praneeta .pr-plan-showcase{grid-template-columns:1fr;gap:10px}
  .praneeta .pr-plan-details{gap:12px;padding:8px}
}
.praneeta .pr-plan{position:relative;display:block;width:100%;min-width:0;margin:0;padding:8px;border:1.5px solid rgba(53,93,131,.35);border-radius:20px;overflow:hidden;background:#fff;box-shadow:0 18px 44px rgba(33,69,111,.1)}
.praneeta .pr-plan img{width:100%;height:auto;border-radius:18px}
.praneeta .pr-master-card button{
  display:grid;width:100%;min-width:0;padding:8px;border:1px solid var(--line);border-radius:16px;
  background:#fff;box-shadow:0 8px 24px rgba(33,69,111,.08);
}
.praneeta .pr-master-card img{width:100%;height:auto;max-height:430px;object-fit:contain;border-radius:10px}
.praneeta .pr-plan-caption{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:4px 12px;padding:9px 6px 2px;text-align:left;font-size:.85rem;color:var(--mute)}
.praneeta .pr-plan-caption strong{display:inline-flex;align-items:center;gap:6px;color:var(--acc)}
.praneeta .pr-master-card button:hover .pr-plan-caption strong{text-decoration:underline}
.praneeta .pr-hint{position:absolute;top:14px;right:14px;padding:6px 12px;border-radius:999px;background:rgba(15,34,56,.72);color:#fff;font-size:.74rem;font-weight:600;opacity:0;transition:opacity .3s;pointer-events:none}
.praneeta .pr-plan .pr-hint{top:24px;right:24px}
.praneeta .pr-plan:is(:hover,:focus-visible) .pr-hint,.praneeta .pr-frame button:hover .pr-hint{opacity:1}

/* amenities */
.praneeta :is(#amenities,#location){gap:18px;padding-block:clamp(32px,4vw,52px)}
.praneeta .pr-amenity{display:grid;gap:18px;animation:pr-pop .8s var(--ease) both}
.praneeta .pr-amenity-copy{display:grid;grid-template-columns:1fr 1fr;gap:6px clamp(18px,4vw,48px);align-items:start}
.praneeta .pr-amenity-copy h3{grid-column:1;font-size:clamp(1.5rem,2.4vw,2rem)}
.praneeta .pr-amenity-copy>p{grid-column:1}
.praneeta .pr-amenity-copy .pr-ticks{grid-column:2;grid-row:1/span 2;margin-top:4px}
.praneeta #gallery{gap:16px;padding-block:clamp(30px,4vw,52px)}
.praneeta #gallery h2{margin:0}
.praneeta .pr-gallery-window{
  --slide-width:clamp(205px,26vw,330px);
  --slide-gap:clamp(10px,1.2vw,20px);
  position:relative;width:min(100%,calc(3 * var(--slide-width) + 2 * var(--slide-gap)));margin-inline:auto;
  height:clamp(235px,30vw,390px);overflow:hidden;
}
.praneeta .pr-gallery-slide{
  --slide-scale:.93;
  position:absolute;top:50%;left:50%;
  width:var(--slide-width);height:96%;padding:0;border:0;border-radius:14px;overflow:hidden;
  background:#e7e0d4;
  transform:translate(calc(-50% + var(--position) * (var(--slide-width) + var(--slide-gap))),-50%) scale(var(--slide-scale));
  transition:transform .72s var(--ease);
}
.praneeta .pr-gallery-slide[data-current="true"]{--slide-scale:1;z-index:1}
.praneeta .pr-gallery-slide img{width:100%;height:100%;object-fit:cover}
.praneeta .pr-gallery-slide:focus-visible{outline:3px solid var(--acc);outline-offset:-4px}
.praneeta .pr-gallery-controls{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:12px}
.praneeta .pr-gallery-controls button{padding:7px 16px;border:1px solid var(--line);border-radius:999px;background:#fff;color:var(--ink)}
@media(max-width:640px){
  .praneeta .pr-gallery-window{--slide-width:56vw;--slide-gap:3vw;height:clamp(185px,67vw,290px)}
}
@media(prefers-reduced-motion:reduce){
  .praneeta .pr-gallery-slide{transition:none}
}
.praneeta .pr-pics{display:grid;grid-template-columns:repeat(6,1fr);grid-auto-rows:clamp(108px,12vw,150px);gap:10px}
.praneeta .pr-pics button{position:relative;overflow:hidden;padding:0;border:0;border-radius:18px;background:rgba(255,255,255,.08);animation:pr-pop .8s var(--ease) both;animation-delay:calc(var(--i) * 90ms)}
.praneeta .pr-pics img{width:100%;height:100%;object-fit:cover;transition:transform .8s var(--ease)}
.praneeta .pr-pics button:hover img{transform:scale(1.06)}
.praneeta .pr-pics span{position:absolute;left:0;right:0;bottom:0;padding:30px 14px 12px;background:linear-gradient(transparent,rgba(15,34,56,.75));color:#fff;font-size:.84rem;text-align:left}
.praneeta .pr-pics .p1{grid-column:span 6;grid-row:span 2}
.praneeta .pr-pics .p2,.praneeta .pr-pics .p3,.praneeta .pr-pics .p4,.praneeta .pr-pics .p5{grid-column:span 3}
.praneeta .pr-pics.n2 .p1{grid-column:span 4}.praneeta .pr-pics.n2 .p2{grid-column:span 2;grid-row:span 2}
.praneeta .pr-pics.n3 .p1{grid-column:span 4}.praneeta .pr-pics.n3 .p2,.praneeta .pr-pics.n3 .p3{grid-column:span 2}
.praneeta .pr-pics.n4 .p1,.praneeta .pr-pics.n5 .p1{grid-column:span 4}
.praneeta .pr-pics.n4 .p2,.praneeta .pr-pics.n4 .p3,.praneeta .pr-pics.n5 .p2,.praneeta .pr-pics.n5 .p3{grid-column:span 2}
.praneeta .pr-pics.n4 .p4{grid-column:span 6}

/* master plan */
.praneeta #masterplan{padding-block:clamp(30px,4vw,52px)}
.praneeta .pr-master-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.4fr);gap:clamp(16px,3vw,40px);align-items:center}
.praneeta .pr-master-copy p{max-width:52ch}
.praneeta .pr-master-cta{display:inline-flex;align-items:center;gap:8px;margin-top:16px;padding:9px 18px;border-radius:999px;background:var(--ink);color:#fff;font-weight:600;box-shadow:0 8px 20px rgba(33,69,111,.2)}
.praneeta .pr-master-cta:hover{background:var(--night)}
.praneeta .pr-master-card{min-width:0}
@media(max-width:800px){.praneeta .pr-master-grid{grid-template-columns:1fr}}

/* specs */
.praneeta #specs{gap:16px;padding-block:clamp(32px,4vw,52px)}
.praneeta #specs .pr-note{margin:0}
.praneeta :is(#features,#specs) .pr-eyebrow{color:#e1c8aa}
.praneeta .pr-spec-list{border:1px solid #ffffff33;border-radius:16px;background:#ffffff0a}
.praneeta .pr-spec{padding:0 clamp(12px,2vw,22px);transition:background .3s}
.praneeta .pr-spec + .pr-spec{border-top:1px solid #ffffff26}
.praneeta .pr-spec.open{background:#ffffff0d}
.praneeta .pr-spec:first-child{border-radius:15px 15px 0 0}
.praneeta .pr-spec:last-child{border-radius:0 0 15px 15px}
.praneeta .pr-spec>button{display:grid;grid-template-columns:1fr 26px;align-items:center;gap:10px;width:100%;min-height:48px;padding:7px 0;border:0;background:none;text-align:left;color:#fff}
.praneeta .pr-spec>button:is(:hover,:focus-visible),.praneeta .pr-spec.open .t{color:#e1c8aa}
.praneeta .pr-spec .t{font-weight:600}
.praneeta .pr-spec .p{position:relative;width:26px;height:26px;border:1px solid #ffffff38;border-radius:50%;color:#e1c8aa}
.praneeta .pr-spec .p::before,.praneeta .pr-spec .p::after{content:'';position:absolute;left:7px;right:7px;top:11px;height:2px;background:currentColor;transition:transform .35s var(--ease)}
.praneeta .pr-spec .p::after{transform:rotate(90deg)}
.praneeta .pr-spec.open .p::after{transform:rotate(0)}
.praneeta .pr-spec-body{display:grid;grid-template-rows:0fr;transition:grid-template-rows .5s var(--ease)}
.praneeta .pr-spec.open .pr-spec-body{grid-template-rows:1fr}
.praneeta .pr-spec-body>dl{min-height:0;overflow:hidden;margin:0}
.praneeta .pr-spec-body dl>div{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,3fr);gap:4px 16px;padding:7px 0;border-top:1px solid #ffffff26}
.praneeta .pr-spec-body dd{margin:0;color:#f0f4fa;font-size:.9rem!important}
.praneeta .pr-spec-body dt{color:#e1c8aa;font-size:.9rem!important;font-weight:600!important}

/* location */
.praneeta .tone-neutral::before{background:#f4f3f1}
.praneeta .pr-location-grid{grid-template-columns:minmax(0,1.35fr) minmax(0,1fr);gap:14px;align-items:stretch}
.praneeta .pr-location-nearby{padding:clamp(14px,2vw,24px);border:1px solid var(--line);border-radius:20px;background:#ffffffde}
.praneeta .pr-location-nearby .pr-note{margin:0}
.praneeta .pr-places{display:grid;margin:0 0 12px;padding:0;list-style:none}
.praneeta .pr-places li{display:flex;justify-content:space-between;gap:12px;padding:8px 0;border-bottom:1px solid var(--line);color:var(--ink)}
.praneeta .pr-places b{color:var(--acc);white-space:nowrap}
.praneeta .pr-map{display:flex;flex-direction:column;overflow:hidden;border:1px solid var(--line);border-radius:20px;background:#fff;box-shadow:0 12px 30px rgba(33,69,111,.12)}
.praneeta .pr-map iframe{display:block;flex:1;width:100%;min-height:280px;border:0}
.praneeta .pr-map-actions{display:flex;flex-wrap:wrap;justify-content:space-between;gap:10px;padding:12px 16px}
.praneeta .pr-map-actions :is(a,button){display:inline-flex;align-items:center;gap:8px;padding:0;border:0;background:none;color:var(--acc);font-weight:600}
.praneeta .pr-map-actions :is(a,button):hover{text-decoration:underline}

/* developer */
.praneeta #developer{gap:18px;padding-block:clamp(28px,4vw,48px)}
.praneeta #developer .pr-row{gap:clamp(20px,4vw,44px);align-items:start}
.praneeta .pr-logo{max-width:230px;height:auto;mix-blend-mode:multiply}
.praneeta #developer .pr-row>div:first-child>.pr-logo{max-width:190px}
.praneeta #developer .pr-row>div:first-child>.pr-logo.brand{margin-top:12px;max-width:160px}
.praneeta address{margin-top:10px;color:var(--mute);font-style:normal;overflow-wrap:anywhere}
.praneeta address a{color:var(--ink);font-weight:600}
.praneeta .pr-team{display:grid;gap:0;margin-top:12px;border-top:1px solid var(--line)}
.praneeta .pr-team>div{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr) minmax(0,2fr);gap:12px;align-items:center;padding:10px 0;border-bottom:1px solid var(--line)}
.praneeta .pr-team span{color:var(--acc);font-size:.76rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase}
.praneeta .pr-team img{max-width:min(100%,120px);max-height:48px;object-fit:contain}
.praneeta .pr-team p{margin:0;font-size:.88rem;line-height:1.5}

.praneeta .pr-legal{margin:0;padding-top:12px;border-top:1px solid var(--line)}

.praneeta .pr-amen-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px}
.praneeta .pr-amen-grid button{position:relative;display:block;width:100%;overflow:hidden;padding:0;border:0;border-radius:18px;background:rgba(255,255,255,.08)}
.praneeta .pr-amen-grid img{width:100%;aspect-ratio:4/5;object-fit:cover;transition:transform .8s var(--ease)}
.praneeta .pr-amen-grid button:hover img{transform:scale(1.05)}
.praneeta .pr-amen-grid span{position:absolute;left:0;right:0;bottom:0;padding:34px 14px 14px;background:linear-gradient(transparent,rgba(15,34,56,.82));color:#fff;font-weight:600;text-align:left}
.praneeta .pr-highlight-copy .pr-places{margin-bottom:16px}
.praneeta .pr-places{display:grid;margin:0;padding:0;list-style:none}
.praneeta .pr-places li{display:flex;justify-content:space-between;gap:12px;padding:7px 0;border-bottom:1px solid var(--line);color:var(--ink);font-size:.95rem}
.praneeta .pr-places b{color:var(--acc);white-space:nowrap}
.praneeta .pr-map-small{margin-top:18px}
.praneeta .pr-map-small iframe{min-height:220px}
.praneeta .pr-contact-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(20px,4vw,56px);align-items:center}
.praneeta .pr-assoc{margin:10px 0 0}
.praneeta address a{white-space:nowrap}
.praneeta .pr-approvals{display:grid;gap:14px;padding:clamp(16px,2.4vw,28px);border:1px solid var(--line);border-radius:20px;background:#fff;box-shadow:0 10px 28px rgba(33,69,111,.08)}
.praneeta .pr-approvals>div{display:flex;align-items:center;gap:20px}
.praneeta .pr-approvals>div+div{padding-top:14px;border-top:1px solid var(--line)}
.praneeta .pr-approvals img{flex:none;width:110px;height:76px;object-fit:contain;mix-blend-mode:multiply}
.praneeta .pr-approvals .ref{margin:0;color:var(--ink);font-weight:700;word-break:break-all}
.praneeta .pr-approvals .ref span{color:var(--mute);font-weight:500;font-size:.86rem}
.praneeta #contact{gap:18px;padding-block:clamp(30px,4vw,52px)}
.praneeta .pr-hero-facts strong,.praneeta .pr-hero-facts strong *{font:inherit;line-height:1.15;white-space:nowrap}
.praneeta .pr-hero-facts strong{font-family:var(--sans);font-size:clamp(1.9rem,3.6vw,3rem);font-weight:500;height:1.15em}
.praneeta .pr-hero-facts>div{display:flex;flex-direction:column;align-items:center;text-align:center}
.praneeta .pr-price-card{display:inline-grid;gap:2px;margin-top:8px;padding:16px 24px;border:1px solid var(--line);border-radius:18px;background:#fff;box-shadow:0 10px 28px rgba(33,69,111,.1)}
.praneeta .pr-price-card span{color:var(--acc);font-size:.76rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase}
.praneeta .pr-price-card strong{font-family:var(--sans);font-size:clamp(2rem,4vw,2.8rem);font-weight:600;line-height:1.1;color:var(--ink)}
.praneeta .pr-price-card small{color:var(--mute);font-size:.86rem}
.praneeta .pr-glance .pr-head p+p{margin-top:-6px}
@media(max-width:960px){.praneeta .pr-amen-grid{grid-template-columns:repeat(2,1fr)}.praneeta .pr-contact-grid{grid-template-columns:1fr}}
@media(max-width:640px){.praneeta .pr-hero-facts strong{font-size:1.7rem}.praneeta .pr-approvals>div{flex-direction:column;align-items:flex-start;gap:10px}}

/* ---- tighten pass ---- */
.praneeta .pr-sec{gap:18px;padding-block:clamp(32px,4vw,52px);scroll-margin-top:118px}
.praneeta #overview{padding-top:clamp(76px,8vw,92px)}
.praneeta .pr-head p:not(.pr-eyebrow){font-size:1rem}
.praneeta .pr-sec h2{margin-bottom:6px}

/* highlights */
.praneeta #highlights{gap:16px}
.praneeta .pr-points>div{padding:clamp(12px,1.6vw,18px)}
.praneeta .pr-hl-grid{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,1fr);gap:14px;align-items:stretch}
.praneeta .pr-hl-card{padding:clamp(16px,2.2vw,26px);border:1px solid var(--line);border-radius:20px;background:#fff;box-shadow:0 8px 24px rgba(33,69,111,.08)}
.praneeta .pr-hl-card h3{margin:0 0 8px;font-size:1.15rem;color:var(--ink)}
.praneeta .pr-hl-card .pr-places li{padding:8px 0;font-size:.94rem}
.praneeta .pr-hl-card .pr-places li:last-child{border-bottom:0}
.praneeta .pr-hl-card.dark{border-color:transparent;background:linear-gradient(135deg,#0b3b6d,#0a2848);box-shadow:0 14px 34px rgba(10,40,72,.28)}
.praneeta .pr-hl-card.dark h3{color:#fff}
.praneeta .pr-hl-card.dark .pr-ticks{margin-top:14px;gap:14px}
.praneeta .pr-hl-card.dark .pr-ticks li{color:#fff}
.praneeta .pr-hl-card.dark .pr-ticks li::before{background:rgba(255,255,255,.16)}
.praneeta .pr-hl-card.dark .pr-ticks li::after{border-color:#dcebf8}

/* floor plans */
.praneeta #plans{gap:14px}
.praneeta .pr-plan-bar{display:flex;flex-wrap:wrap;gap:10px 14px}
.praneeta .pr-plan-showcase{grid-template-columns:minmax(200px,.26fr) minmax(0,1fr);align-items:center;padding:clamp(10px,1.4vw,16px);gap:clamp(12px,2vw,24px);border-radius:24px}
.praneeta .pr-plan-details{padding:clamp(6px,1vw,14px);gap:12px}
.praneeta .pr-plan-details dl{gap:12px}
.praneeta .pr-plan{display:grid;place-items:center;padding:8px;border-radius:18px;background:#fff}
.praneeta .pr-plan img{width:auto;max-width:100%;height:auto;max-height:min(62vh,520px);margin:0 auto;object-fit:contain;border-radius:12px}
@media(max-width:800px){
  .praneeta .pr-plan-showcase{grid-template-columns:1fr}
  .praneeta .pr-plan-details{grid-template-columns:1fr 1fr;align-items:end}
  .praneeta .pr-plan-details h3,.praneeta .pr-plan-facing{grid-column:1/-1}
  .praneeta .pr-plan-details dl{grid-column:1/-1;grid-template-columns:repeat(3,1fr)}
  .praneeta .pr-plan img{max-height:60vh}
}

/* layout */
.praneeta #layout{gap:16px}
.praneeta #layout .pr-master-grid{grid-template-columns:minmax(0,1.15fr) minmax(0,1fr);align-items:start;gap:clamp(14px,2.4vw,30px)}
.praneeta #layout .pr-master-card img{max-height:none;width:100%;object-fit:contain}
.praneeta #layout h3{margin:0 0 4px;font-size:1.15rem}
.praneeta #layout .pr-ticks{gap:9px;margin-top:10px}
.praneeta .pr-map-small{margin-top:14px}
.praneeta .pr-map-small iframe{min-height:200px;height:200px;flex:none}
@media(max-width:800px){.praneeta #layout .pr-master-grid,.praneeta .pr-hl-grid{grid-template-columns:1fr}}

.praneeta #location{gap:16px}
.praneeta .pr-location-nearby .pr-places li:last-child{border-bottom:0}
.praneeta .pr-location-nearby .pr-note{margin:10px 0 0}
.praneeta #highlights .pr-hl-card.dark .pr-ticks.two{margin-top:12px}

/* highlights on blue */
.praneeta #highlights{gap:14px;padding-block:clamp(28px,3.6vw,44px)}
.praneeta #highlights .pr-points{border-color:rgba(255,255,255,.22);background:rgba(255,255,255,.08);box-shadow:none;backdrop-filter:blur(6px)}
.praneeta #highlights .pr-points>div+div{border-color:rgba(255,255,255,.2)}
.praneeta #highlights .pr-points strong{color:#fff}
.praneeta #highlights .pr-point-label{color:#e1c8aa}
.praneeta #highlights .pr-points p{color:rgba(255,255,255,.82)}
.praneeta .pr-why .pr-eyebrow{margin-bottom:8px;color:#e1c8aa}
.praneeta .pr-why-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin:0;padding:0;list-style:none}
.praneeta .pr-why-grid li{display:grid;align-content:start;gap:6px;padding:14px 16px;border:1px solid rgba(255,255,255,.22);border-radius:14px;background:rgba(255,255,255,.08);color:#fff;font-weight:500;line-height:1.4}
.praneeta .pr-why-grid span{color:#e1c8aa;font-family:var(--sans);font-size:1.05rem;font-weight:600}
@media(max-width:960px){.praneeta .pr-why-grid{grid-template-columns:1fr 1fr}}
@media(max-width:520px){.praneeta .pr-why-grid{grid-template-columns:1fr}.praneeta .pr-why-grid li{grid-template-columns:auto 1fr;align-items:center;gap:12px;padding:11px 14px}}

/* location, tighter */
.praneeta #location{gap:12px;padding-block:clamp(24px,3vw,38px)}
.praneeta #location .pr-location-grid{grid-template-columns:minmax(0,1.3fr) minmax(0,1fr);gap:12px;align-items:stretch}
.praneeta #location .pr-map iframe{min-height:250px}
.praneeta #location .pr-map-actions{padding:9px 14px}
.praneeta #location .pr-location-nearby{padding:14px 18px}
.praneeta #location .pr-location-nearby h3{margin:0 0 4px;font-size:1.1rem}
.praneeta #location .pr-places li{padding:6px 0;font-size:.92rem}
@media(max-width:960px){.praneeta #location .pr-location-grid{grid-template-columns:1fr}}

@keyframes pr-ken{from{transform:scale(1)}to{transform:scale(1.09)}}
@keyframes pr-pulse{0%,100%{box-shadow:0 0 0 0 rgba(88,214,141,.6)}50%{box-shadow:0 0 0 7px rgba(88,214,141,0)}}
@keyframes pr-pop{from{opacity:0;transform:translateY(22px) scale(.98)}to{opacity:1;transform:none}}

/* tablet */
@media (max-width:960px){
  .praneeta .pr-points{grid-template-columns:1fr 1fr}
  .praneeta .pr-points>div:nth-child(3){border-left:0}
  .praneeta .pr-points>div:nth-child(n+3){border-top:1px solid var(--line)}
  .praneeta .pr-row,.praneeta .pr-glance,.praneeta .pr-amenity-copy{grid-template-columns:1fr}
  .praneeta .pr-row.flip>:first-child{order:0}
  .praneeta .pr-amenity-copy .pr-ticks{grid-column:1;grid-row:auto}
  .praneeta .pr-hero{min-height:700px}
}

/* mobile */
@media (max-width:640px){
  .praneeta .pr-hero{min-height:780px}
  .praneeta .pr-hero-img{object-position:center}
  .praneeta .pr-hero-in{padding-left:16px;padding-right:16px;padding-top:100px}
  .praneeta .pr-hero h1{font-size:clamp(2.6rem,13vw,3.4rem)}
  .praneeta .pr-hero-facts{grid-template-columns:1fr 1fr}
  .praneeta .pr-hero-facts>div:nth-child(3){border-left:0}
  .praneeta .pr-hero-facts>div:nth-child(n+3){margin-top:14px;border-top:1px solid rgba(255,255,255,.3)}
  .praneeta .pr-ticks.two{grid-template-columns:1fr}
  .praneeta .pr-highlight-story{grid-template-columns:1fr;gap:6px}
  .praneeta .pr-highlight-photo{min-height:0;aspect-ratio:16/9}
  .praneeta .pr-glance dl{padding:4px 18px}
  .praneeta .pr-spec-body dl>div{grid-template-columns:1fr;gap:2px}
  .praneeta .pr-team>div{grid-template-columns:1fr;gap:8px}
  .praneeta .pr-pics{grid-template-columns:repeat(2,1fr)}
  .praneeta .pr-pics button{grid-column:span 1!important;grid-row:span 1!important}
  .praneeta .pr-pics .p1{grid-column:span 2!important}
  .praneeta .pr-frame{padding:7px;border-radius:24px}
  .praneeta .pr-frame>button,.praneeta .pr-frame img{border-radius:17px}
}
@media (max-width:420px){
}
@media (prefers-reduced-motion:reduce){
  .praneeta *{animation:none!important;transition:none!important}
  .praneeta .pr-rv{opacity:1;transform:none}
}
`;