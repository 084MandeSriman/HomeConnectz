import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { VARA_PRASAD_LOGO } from '../components/Collaborations.jsx';

/* ------------------------------------------------------------------ */
/*  Images live in  public/images/srivari/  (copy the whole folder)  */
/* ------------------------------------------------------------------ */
const BASES = ['/images/srivari/', '/images/', '/srivari/', '/'];
const IMG = BASES[0];

const PROJECT = {
  name: 'Srivari Meadows',
  status: 'Ready to move in',
  location: 'Mokila, Hyderabad',
  type: '4 BHK villas, G+2',
  size: '4,254–4,800 sq ft',
  price: '₹5.75 Cr',
  developer: 'Vara Prasad Constructions',
  rera: 'P02400004825',
  hmda: '000371/LO/Plg/HMDA/2021',
};

const HERO_SLIDES = [
  { src: IMG + 'elevation.jpg', alt: 'Row of Srivari Meadows villas along a landscaped street' },
  { src: IMG + 'entrance.jpg', alt: 'Grand entrance with security room at Srivari Meadows' },
  { src: IMG + 'street.jpg', alt: 'Tree-lined internal street at Srivari Meadows' },
];

const galleryFiles = import.meta.glob('../assets/srivari-gallery/*.{jpg,jpeg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
});

const sitePhotoAlts = [
  'Srivari Meadows entrance driveway',
  'Srivari Meadows entrance sign',
  'Single villa exterior',
  'Two villas viewed from the street',
  'Tree-lined villa street',
  'Glass-fronted clubhouse',
  'Garden lawn and mature tree',
  'Outdoor lawn and seating area',
];
const sitePhotos = sitePhotoAlts.map((alt, index) => ({
  alt,
  src: Object.entries(galleryFiles).find(([path]) => path.split('/').pop().split('.')[0] === String(index + 1).padStart(2, '0'))?.[1],
}));

const GALLERY = sitePhotos.every(({ src }) => Boolean(src))
  ? sitePhotos
  : [
      ['entrance.jpg', 'Srivari Meadows entrance'],
      ['villa-east.jpg', 'East-facing villa elevation'],
      ['villa-west.jpg', 'West-facing villa elevation'],
      ['elevation.jpg', 'Row of villas'],
      ['street.jpg', 'Tree-lined villa street'],
      ['clubhouse.jpg', 'Clubhouse exterior'],
      ['aerial.jpg', 'Aerial view of the community'],
      ['play.jpg', 'Outdoor play area'],
    ].map(([file, alt]) => ({ src: IMG + file, alt }));

/* Order of the page: overview, highlights, features, master plan,
   floor plans, gallery, amenities, location, specifications */
const SECTIONS = [
  ['overview', 'Overview'],
  ['highlights', 'Highlights'],
  ['features', 'Features'],
  ['masterplan', 'Master plan'],
  ['villas', 'Floor plans'],
  ['gallery', 'Gallery'],
  ['amenities', 'Amenities'],
  ['location', 'Location'],
  ['specs', 'Specifications'],
];

const HIGHLIGHTS = [
  { to: 117, title: 'villas', text: 'In a gated community' },
  { to: 14, title: 'acres', text: 'With landscaped grounds' },
  { text0: '4 BHK', title: '+ maid’s room', text: 'G+2 villas with a 5-passenger glass-door lift' },
  { text0: '300 & 350', title: 'sq.yds', text: 'East- and West-facing villa plots, 100% Vaastu compliant' },
];

const GLANCE = [
  ['Plot size', '300 & 350 sq.yds'],
  ['Built-up area', PROJECT.size],
  ['Facing', 'East and West'],
  ['Vaastu', '100% compliant'],
  ['Road width', '33 ft and 40 ft internal roads'],
  ['TG-RERA', PROJECT.rera],
  ['HMDA layout permit', PROJECT.hmda],
  ['Developer', PROJECT.developer],
];

const STORY = [
  {
    image: 'entrance.jpg',
    alt: 'Gated entrance with security room',
    eyebrow: 'Safety',
    title: 'A secure gated community',
    points: ['Grand entrance with security room', '24/7 security', 'Solar fencing all around the site', 'CCTV surveillance in parking and common areas'],
  },
  {
    image: 'street.jpg',
    alt: 'Tree-lined street between villas',
    eyebrow: 'Lifestyle',
    title: 'Landscaping and utilities',
    points: ['Landscaped gardens maintained with recycled water', 'Sewage treatment plant (STP)', 'Rainwater harvesting pits', 'EV charging in common areas', 'Smart lighting at master level'],
  },
];

/* [src, alt, category] */
const VILLAS = [
  { id: 'east', label: 'East villa', road: '33 ft east road', plan: 'e1' },
  { id: 'premium', label: 'East premium villa', road: '33 ft east road', plan: 'ep' },
  { id: 'west', label: 'West villa', road: '33 ft west road', plan: 'w2' },
];

const AMENITY_TABS = [
  {
    id: 'club',
    label: 'Club house',
    title: 'Combine luxury with utility',
    text: 'Your home comes with amenities that make it feel like a luxurious resort or a well-appointed workspace. Enjoy a well-designed club house where you can network with people and hold business meetings supported by a business centre.',
    images: [['clubhouse.jpg', 'Club house with swimming pool'], ['pool.jpg', 'Swimming pool']],
    points: ['Club house with swimming pool', 'Guest rooms', 'Spa', 'Multipurpose halls', 'Gymnasium', 'Indoor games'],
  },
  {
    id: 'halls',
    label: 'Halls & gym',
    title: 'Parties, functions and fitness',
    text: 'Hold parties, functions or musical nights right at home, with least disruption to your personal space. The beautifully equipped, professionally maintained gymnasium means you do not need to drive miles to meet your fitness goals.',
    images: [['hall.jpg', 'Multipurpose hall'], ['gym.jpg', 'Gymnasium']],
    points: ['Multipurpose halls for parties and events', 'Professionally maintained gymnasium', 'At the club house, inside the community'],
  },
  {
    id: 'sports',
    label: 'Sports & play',
    title: 'Combine action with relaxation',
    text: 'Play badminton, cricket or indoor games, or let your kids enjoy their dedicated play area. Shed the stress with yoga and aerobics under the watchful care of teachers, or go for a run on the jogging track.',
    images: [['play.jpg', 'Kids’ play area'], ['cricket.jpg', 'Cricket nets'], ['badminton.jpg', 'Badminton'], ['indoor.jpg', 'Indoor games'], ['jog.jpg', 'Jogging track']],
    points: ['Badminton courts', 'Cricket nets', 'Kids’ play area', 'Indoor games', 'Jogging / walking track'],
  },
  {
    id: 'wellness',
    label: 'Wellness & guests',
    title: 'Relax, restore, host in comfort',
    text: 'Pamper important guests and even business partners by putting them up in the special guest rooms, while you avoid disruption to your lifestyle. Unwind with luxurious spa services or practise yoga and aerobics.',
    images: [['spa.jpg', 'Spa'], ['yoga.jpg', 'Yoga and aerobics'], ['guest.jpg', 'Guest rooms']],
    points: ['Spa', 'Yoga and aerobics', 'Guest rooms'],
  },
  {
    id: 'business',
    label: 'Business centre',
    title: 'Aim · Think · Grow',
    text: 'Gain admirable work-life balance by accessing the on-demand business centre within the community. Work with focus at safe and sanitised workstations or hold a conference with your team, with a cafeteria next door.',
    images: [['business.jpg', 'Business centre'], ['conference.jpg', 'Conference hall'], ['workstation.jpg', 'Work station'], ['cafeteria.jpg', 'Cafeteria']],
    points: ['Business centre with world-class facilities', 'Conference hall', 'Work stations', 'Cafeteria'],
  },
];

/* "117 villas" and "14 acres" removed here: they already appear in the
   hero and the highlights, so they were duplicates. */
const FEATURES = [
  'Grand entrance with security room',
  'Sewage treatment plant (STP)',
  '100% Vaastu',
  '24/7 security',
  'Jogging / walking track',
  'Solar fencing',
  'CCTV surveillance in parking and common areas',
  'Well-designed landscape',
  'Rainwater harvesting pits',
  'EV charging in common areas',
  'Smart lighting at master level',
  'Business centre with world-class facilities',
];
const SPECS = [
  {
    title: 'Structure & walls',
    items: [
      ['Structure', 'R.C.C. framed structure to withstand wind and seismic loads.'],
      ['External walls', '6" thick R.C.C. walls.'],
      ['Internal walls', '4" thick R.C.C. walls.'],
      ['Plastering', '2 coats of plastering in CM 1:6 for internal non-R.C.C. partition walls.'],
    ],
  },
  {
    title: 'Wall finishes',
    items: [
      ['Exterior walls', 'Weather-proof, reputed-make exterior texture paint with two coats of exterior emulsion paint on soft surfaces, as per elevation design.'],
      ['Interior walls', 'Smooth putty finish with 2 coats of premium acrylic emulsion paint of reputed make over a coat of primer.'],
      ['Ceiling', 'Moisture-resistant board with acrylic emulsion paint in toilets.'],
    ],
  },
  {
    title: 'Doors & windows',
    items: [
      ['Main door', 'Teak-veneered door frame and shutter finished with good-quality melamine polish and hardware of reputed make.'],
      ['Internal doors', 'Hard wood door frame and laminated shutter with hardware of reputed make.'],
      ['French doors', 'UPVC door frame of reputed profile sections with float glass panelled shutters, designer hardware and mosquito mesh.'],
      ['Windows', 'UPVC windows of reputed profile sections with float glass, finishes as per design and mosquito mesh for all windows.'],
    ],
  },
  {
    title: 'Flooring & dado',
    items: [
      ['Living, drawing & dining', '1200 mm × 1200 mm double-charged vitrified tiles of reputed make.'],
      ['All bedrooms', '800 mm × 800 mm double-charged vitrified tiles of reputed make.'],
      ['Home theatre', 'Wooden laminated flooring.'],
      ['Utility', 'Non-slip ceramic / matt-finish vitrified tiles.'],
      ['Kitchen', 'Double-charged vitrified tiles of reputed make.'],
      ['Servant room', 'Ceramic tiles.'],
      ['Entrance & sit-outs', 'Non-slip / anti-skid / matt-finish premium vitrified tiles.'],
      ['Staircase', 'Granite / designer tiles as per architect.'],
      ['Toilets', 'Acid-resistant, anti-skid ceramic tiles of reputed make.'],
      ['Parking area', 'Chequered tiles / Kota stone as per design.'],
      ['Wall dado', 'Utility and servant toilet: ceramic tiles up to 3 ft. Toilets: designer ceramic / vitrified tiles up to 8 ft. Kitchen: designer ceramic / vitrified wall tiles up to 2 ft above platform.'],
    ],
  },
  {
    title: 'Kitchen & utility',
    items: [
      ['Kitchen', 'Provision for electrical and plumbing points for sink and water purifier. Power plugs for chimney, exhaust fan, refrigerator, microwave oven, mixer / grinder and cooking range / rice cooker.'],
      ['Platform', 'Granite platform with stainless steel sink.'],
      ['Utility & wash', 'Tap point for general washing, with provision for dishwasher, and for washing machine and dryer in the laundry.'],
    ],
  },
  {
    title: 'Sanitary',
    items: [
      ['Sanitary fittings', 'Fittings of standard make, provision of geysers of suitable capacity, single-lever CP fittings / mixer traps, wash basin, wall-hung or floor-mounted WC.'],
      ['Servant toilet', 'Standard EWC / IWC of reputed make.'],
    ],
  },
  {
    title: 'Electrical & communication',
    items: [
      ['Installations', 'Concealed copper wiring with flame-retardant low-smoke (FRLS) PVC-insulated wires of superior range. Modular switches of superior brand, 3 earth-leakage circuit breakers (ELCB) for each villa and a separate MCB for light and power circuits at the main distribution box in each villa.'],
      ['Electrical DB', 'Three-phase power supply for each unit with individual meter boards and miniature circuit breakers of reputed make.'],
      ['Fixtures', 'ISI-marked premium-make modular switches and sockets.'],
      ['Air conditioning', 'Power outlets for air-conditioners in all bedrooms, home theatre and living rooms.'],
      ['Telephone & internet', 'Provision in the ground-floor living room and master bedroom.'],
      ['TV', 'TV points in all bedrooms, home theatre and living / drawing room.'],
      ['Power back-up', 'DG power back-up for the entire villa (except ACs and geysers). 100% power back-up for essential services.'],
      ['Railings & compound wall', 'Toughened glass and MS railing with reputed enamel paint finish. Compound wall of 4 ft height on three sides.'],
    ],
  },
  {
    title: 'Lift, common services & security',
    items: [
      ['Lift', '5-passenger Schindler glass-door lift (USB connected).'],
      ['Tank & sump', 'Pneumatic system and UG sump.'],
      ['Rainwater', 'Soak wells and bore wells along the storm-water harvesting drain at regular intervals for recharging the ground water table.'],
      ['Water treatment', 'Water treatment plant to provide water, and softening plant for soft water supply.'],
      ['Landscaping', 'A combination of soft and hard landscape, with pump circulation system, street furniture, pergolas and lawns.'],
      ['Signage', 'Directional and safety signage for driveways, entrance gate houses and villas.'],
      ['RCC trench system', 'All service cables for electrical, IT and other mechanical services, if any, will be routed through an RCC trench system only.'],
      ['External lighting', 'Lighting posts with proper aesthetics and sufficient illumination, plus peripheral lighting all along the compound walls for security.'],
      ['STP', 'Totally below grade and enclosed with suitable mechanical ventilation. No open-air aeration ponds.'],
      ['Security', 'CCTV cameras, security personnel and solar fencing all around the site.'],
    ],
  },
];

const PLACES = [
  ['Financial District', 'About 30 min'],
  ['Gachibowli', 'About 35 min'],
  ['HITEC City', 'About 45 min'],
  ['Rajiv Gandhi International Airport', 'About 25 min'],
  ['International schools in Kokapet and Gachibowli', 'About 20–35 min'],
  ['Clinics and pharmacies', 'Nearby'],
];

const TEAM = [
  ['Architects', 'team-rat.png', 'RAT Architecture', 'Sree Chakra Residency, Road No. 37, Jubilee Hills, Hyderabad'],
  ['Structural engineers', 'team-id.png', 'ID Structural Consultants', '2nd Floor, Vaishnavi Double Ten, Madhapur, Hyderabad – 500081'],
  ['MEP consultant', 'team-e5ve.png', 'Design Solutions Pvt. Ltd.', "#495 'Sanmathi', 9th Main, 11th Cross, ISRO Layout, Bangalore – 560078"],
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
          if (typeof console !== 'undefined') console.warn('Srivari Meadows image not found: ' + file + ' (expected in public/images/srivari/)');
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
    <Tag ref={ref} className={`sm-rv ${seen ? 'in' : ''} ${className}`} style={{ '--d': `${delay}ms` }} {...rest}>
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
    <div className="sm-lb" role="dialog" aria-modal="true" aria-label={item.alt} onClick={onClose}>
      <style>{LB_CSS}</style>
      <div className="sm-lb-bar" onClick={(e) => e.stopPropagation()}>
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
      <div className={`sm-lb-stage ${zoom ? 'zoom' : ''}`} onClick={zoom ? (e) => e.stopPropagation() : onClose}>
        <Image src={item.src} alt={item.alt} eager />
      </div>
      <p className="sm-lb-cap" onClick={(e) => e.stopPropagation()}>
        {item.alt}
      </p>
      {count > 1 && (
        <>
          <button type="button" className="sm-lb-nav prev" aria-label="Previous image" onClick={(e) => { e.stopPropagation(); onIndex((index - 1 + count) % count); }}>
            ‹
          </button>
          <button type="button" className="sm-lb-nav next" aria-label="Next image" onClick={(e) => { e.stopPropagation(); onIndex((index + 1) % count); }}>
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
    <Reveal className="sm-head">
      <p className="sm-eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {children}
    </Reveal>
  );
}

function Ticks({ items, cols }) {
  return (
    <ul className={`sm-ticks ${cols ? 'two' : ''}`}>
      {items.map((p) => (
        <li key={p}>{p}</li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ */
/*  Sections                                                           */
/* ------------------------------------------------------------------ */

/* The slider is the very first thing on the page. The project name,
   status, intro line and the four key numbers sit on top of it in white. */
function Hero() {
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    if (reduced()) return undefined;
    const id = setInterval(() => setSlide((s) => (s + 1) % HERO_SLIDES.length), 6500);
    return () => clearInterval(id);
  }, []);
  return (
    <header className="sm-hero">
      {HERO_SLIDES.map((s, i) => (
        <Image key={s.src} src={s.src} alt={i === slide ? s.alt : ''} className={`sm-hero-img ${i === slide ? 'on' : ''}`} eager={i === 0} />
      ))}

      <div className="sm-hero-in">
        <span className="sm-status">
          <i />
          {PROJECT.status}
        </span>
        <p className="sm-eyebrow">Luxury villas · Mokila, Hyderabad</p>
        <h1>
          Srivari <em>Meadows</em>
        </h1>
        <p className="sm-lede">Live like royalty in the home of your dreams. A ready-to-move gated villa community of 117 villas on 14 acres.</p>

        <div className="sm-hero-facts">
          <div>
            <strong>
              <Counter to={117} />
            </strong>
            <span>Villas</span>
          </div>
          <div>
            <strong>
              <Counter to={14} />
            </strong>
            <span>Acres, gated</span>
          </div>
          <div>
            <strong>4 BHK</strong>
            <span>G+2 with lift</span>
          </div>
          <div>
            <strong>{PROJECT.price}</strong>
            <span>Onwards, indicative</span>
          </div>
        </div>
      </div>

      <div className="sm-dots" role="tablist" aria-label="Hero images">
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
    <nav className="sm-nav" data-compact={scrolling} aria-label="Srivari Meadows sections">
      <div className="sm-nav-in" ref={linksRef}>
        {SECTIONS.map(([id, label]) => (
          <a key={id} href={`#${id}`} ref={active === id ? activeLinkRef : null} className={active === id ? 'on' : ''} aria-current={active === id ? 'location' : undefined}>
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}

/* 1. Project overview */
function Overview() {
  return (
    <section className="sm-sec tone-beige-glass" id="overview">
      <div className="sm-glance">
        <Reveal className="sm-head">
          <p className="sm-eyebrow">Project overview</p>
          <h2>Space, privacy and a <em>ready-made community.</em></h2>
          <p>Discover 117 thoughtfully planned villas in Mokila, with generous living spaces, private terraces and a host of community amenities.</p>
          <Image src={IMG + 'lineart.jpg'} alt="" className="sm-lineart" />
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

/* 2. Project highlights */
function Highlights({ onOpen }) {
  const [selected, setSelected] = useState(0);
  const story = STORY[selected];
  const photo = { src: IMG + story.image, alt: story.alt };

  return (
    <section className="sm-sec tone-white" id="highlights">
      <Heading eyebrow="Project highlights" title={<>Gated villas with <em>landscaped grounds.</em></>} />

      <div className="sm-points">
        {HIGHLIGHTS.map((h, i) => (
          <Reveal key={h.title} delay={i * 60}>
            <strong>{h.to ?? h.text0}</strong>
            <span className="sm-point-label">{h.title}</span>
            <p>{h.text}</p>
          </Reveal>
        ))}
      </div>

      <Reveal className="sm-highlight-story">
        <div className="sm-highlight-copy">
          <div className="sm-highlight-options" role="group" aria-label="Highlight category">
            {STORY.map((item, index) => (
              <button key={item.eyebrow} type="button" aria-pressed={selected === index} onClick={() => setSelected(index)}>
                {item.eyebrow}
              </button>
            ))}
          </div>
          <h3>{story.title}</h3>
          <Ticks items={story.points} />
        </div>
        <button className="sm-highlight-photo" type="button" onClick={() => onOpen([photo], 0)} aria-label={`Enlarge ${photo.alt}`}>
          <Image key={photo.src} src={photo.src} alt={photo.alt} />
          <span className="sm-highlight-enlarge">Enlarge <Arrow diagonal /></span>
        </button>
      </Reveal>
    </section>
  );
}

/* 3. Project features */
function Features() {
  return (
    <section className="sm-sec tone-navy" id="features">
      <Heading eyebrow="Project features" title={<>Thoughtful details, <em>built in.</em></>}>
        <p>Conceived and executed to offer amenities which surpass the best in the market, with your comfort in mind.</p>
      </Heading>
      <Reveal>
        <Ticks items={FEATURES} cols />
      </Reveal>
    </section>
  );
}

/* 4. Master plan */
function MasterPlan({ onOpen }) {
  const plan = { src: IMG + 'masterplan.jpg', alt: 'Srivari Meadows master plan with plot numbers and layout legend' };

  return (
    <section className="sm-sec tone-beige-glass" id="masterplan">
      <div className="sm-master-grid">
        <Reveal className="sm-head sm-master-copy">
          <p className="sm-eyebrow">Master plan</p>
          <h2>117 villas across <em>14 acres.</em></h2>
          <p>The layout gives each villa privacy, natural light and cross ventilation. The clubhouse, pool, jogging trails and children’s park are a short walk from every home.</p>
          <Link className="sm-master-cta" to="/contact">
            Book Your Viewing <Arrow />
          </Link>
        </Reveal>
        <Reveal className="sm-master-card" delay={140}>
          <button type="button" onClick={() => onOpen([plan], 0)} aria-label="Enlarge Srivari Meadows master plan">
            <Image src={plan.src} alt={plan.alt} />
            <span className="sm-plan-caption"><span>Community layout</span><strong>Enlarge <Arrow diagonal /></strong></span>
          </button>
        </Reveal>
      </div>
    </section>
  );
}

/* 5. Floor plans */
function Villas({ onOpen }) {
  const [villaId, setVillaId] = useState(VILLAS[0].id);
  const villa = VILLAS.find((v) => v.id === villaId);
  const [view, setView] = useState('plan');

  const planImage = {
    src: `${IMG}${view === 'plan' ? 'plan' : 'iso'}-${villa.plan}.jpg`,
    alt: `${villa.label} ${view === 'plan' ? 'floor plans (ground, first and second floor)' : 'isometric views with room legend'}`,
  };

  return (
    <section className="sm-sec tone-white" id="villas">
      <Heading eyebrow="Villas & floor plans" title="Four bedrooms. Three floors. Your terrace.">
        <p>Choose a villa to see its floor plans and isometric views.</p>
      </Heading>
      <div className="sm-plan-buttons" role="group" aria-label="Villa type">
        {VILLAS.map((v) => (
          <button key={v.id} type="button" aria-pressed={v.id === villaId} onClick={() => setVillaId(v.id)}>
            {v.label}
          </button>
        ))}
      </div>
      <div className="sm-plan-buttons" role="group" aria-label="View">
        <button type="button" aria-pressed={view === 'plan'} onClick={() => setView('plan')}>
          Floor plans
        </button>
        <button type="button" aria-pressed={view === 'iso'} onClick={() => setView('iso')}>
          Isometric views
        </button>
      </div>
      <button type="button" className="sm-plan" onClick={() => onOpen([planImage], 0)} aria-label={`Enlarge ${planImage.alt}`}>
        <Image key={planImage.src} src={planImage.src} alt={planImage.alt} />
        <span className="sm-hint">Click to enlarge and zoom</span>
      </button>
      <p className="sm-note">Ground, first and second floor shown left to right. Dimensions and room legends are in the enlarged view. {villa.road}.</p>
    </section>
  );
}

/* 6. Gallery */
function Gallery({ onOpen, isLightboxOpen }) {
  const [galleryRef, seen] = useInView();
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(() => !reduced());
  const count = GALLERY.length;

  useEffect(() => {
    if (!seen || !playing || isLightboxOpen) return;
    const timer = setInterval(() => setActive((index) => (index + 1) % count), 1000);
    return () => clearInterval(timer);
  }, [count, isLightboxOpen, playing, seen]);

  return (
    <section ref={galleryRef} className="sm-sec tone-neutral" id="gallery" aria-label="Photo gallery">
      <h2>Gallery</h2>
      <div
        className="sm-gallery-window"
        onFocusCapture={() => setPlaying(false)}
      >
        {[-2, -1, 0, 1, 2].map((position) => {
          // Advancing the photo index moves each visible card one slot to the left.
          const index = (active + position + count) % count;
          const photo = GALLERY[index];
          return (
            <button
              key={photo.src}
              type="button"
              className="sm-gallery-slide"
              data-current={position === 0}
              tabIndex={position === 0 ? 0 : -1}
              style={{ '--position': position }}
              onClick={() => { setPlaying(false); onOpen(GALLERY, index); }}
              aria-label={`Enlarge ${photo.alt}`}
            >
              <Image src={photo.src} alt={photo.alt} eager />
            </button>
          );
        })}
      </div>
      <div className="sm-gallery-controls">
        <button type="button" onClick={() => { setPlaying(false); setActive((active + count - 1) % count); }}>Previous</button>
        <span>{active + 1} / {count}</span>
        <button type="button" onClick={() => { setPlaying(false); setActive((active + 1) % count); }}>Next</button>
        <button type="button" onClick={() => setPlaying(!playing)}>{playing ? 'Pause' : 'Play'}</button>
      </div>
    </section>
  );
}

/* 7. Amenities */
function Amenities({ onOpen }) {
  const [tab, setTab] = useState(AMENITY_TABS[0].id);
  const t = AMENITY_TABS.find((x) => x.id === tab);
  const pics = t.images.map(([f, alt]) => ({ src: IMG + f, alt }));
  return (
    <section className="sm-sec tone-navy" id="amenities">
      <Heading eyebrow="Resort-style living" title="A club house that feels like a retreat.">
        <p>Amenities designed for comfort, work, play and relaxation, all within the community.</p>
      </Heading>
      <div className="sm-tabs" role="tablist" aria-label="Amenities">
        {AMENITY_TABS.map((a) => (
          <button key={a.id} type="button" role="tab" aria-selected={a.id === tab} onClick={() => setTab(a.id)}>
            {a.label}
          </button>
        ))}
      </div>
      <div className="sm-amenity" key={t.id}>
        <div className="sm-amenity-copy">
          <h3>{t.title}</h3>
          <p>{t.text}</p>
          <Ticks items={t.points} />
        </div>
        <div className={`sm-pics n${Math.min(pics.length, 5)}`}>
          {pics.map((p, i) => (
            <button type="button" key={p.src} className={`p${i + 1}`} style={{ '--i': i }} onClick={() => onOpen(pics, i)} aria-label={`Open image: ${p.alt}`}>
              <Image src={p.src} alt={p.alt} />
              <span>{p.alt}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 8. Location */
function Location({ onOpen, mapQuery }) {
  return (
    <section className="sm-sec tone-neutral" id="location">
      <Heading eyebrow="Mokila, Hyderabad" title="Far from the noisy city, within its easy reach.">
        <p>Enjoy peace and tranquillity amid green surroundings, with the Outer Ring Road taking you to any destination in minutes. The community abuts the 150-feet wide Hyderabad–Shankarpally road, 15 km from the upcoming Neopolis financial district.</p>
      </Heading>
      <div className="sm-row sm-location-grid">
        <Reveal className="sm-map">
          <iframe title="Map showing Srivari Meadows in Mokila, Hyderabad" src={`https://www.google.com/maps?q=${mapQuery}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          <div className="sm-map-actions">
            <button type="button" onClick={() => onOpen([{ src: IMG + 'location-map.jpg', alt: 'Location map of Srivari Meadows near the Outer Ring Road' }], 0)}>
              View project map <Arrow diagonal />
            </button>
            <a href={`https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`} target="_blank" rel="noreferrer">
              Get directions <Arrow diagonal />
            </a>
          </div>
        </Reveal>
        <Reveal className="sm-location-nearby" delay={140}>
          <h3>Nearby destinations</h3>
          <ul className="sm-places">
            {PLACES.map(([name, time]) => (
              <li key={name}>
                <span>{name}</span>
                <b>{time}</b>
              </li>
            ))}
          </ul>
          <p className="sm-note">Travel times are approximate and can vary with traffic.</p>
        </Reveal>
      </div>
    </section>
  );
}

/* 9. Specifications */
function Specs() {
  const [open, setOpen] = useState(0);
  return (
    <section className="sm-sec tone-navy" id="specs">
      <Heading eyebrow="Built to last" title="Specifications.">
        <p>The quality of materials and fittings, from the structure to the finishing touches.</p>
      </Heading>
      <div className="sm-spec-list">
        {SPECS.map((g, i) => (
          <Reveal className={`sm-spec ${open === i ? 'open' : ''}`} key={g.title}>
            <button type="button" aria-expanded={open === i} aria-controls={`sm-spec-panel-${i}`} onClick={() => setOpen(open === i ? -1 : i)}>
              <span className="t">{g.title}</span>
              <span className="p" aria-hidden="true" />
            </button>
            <div id={`sm-spec-panel-${i}`} className="sm-spec-body" aria-hidden={open !== i}>
              <dl>
                {g.items.map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        ))}
      </div>
      <p className="sm-note">Conditions apply*. The promoters reserve the right to alter and make changes in elevation, specifications and plans as deemed fit.</p>
    </section>
  );
}

function Developer() {
  return (
    <section className="sm-sec tone-neutral" id="developer">
      <div className="sm-row">
        <Reveal>
          <Image
            src={VARA_PRASAD_LOGO}
            fallback={IMG + 'logo-vp.png'}
            alt="Vara Prasad Constructions"
            className="sm-logo"
            referrerPolicy="no-referrer"
          />
          <address>
            401, Anushka Trendz, Road No. 14,
            <br />
            Banjara Hills, Hyderabad – 500 034
            <br />
            Phone: <a href="tel:04023736414">040 - 23736414</a>
            <br />
            <a href="mailto:varaprasadconstructions@gmail.com">varaprasadconstructions@gmail.com</a>
            <br />
            <a href="https://www.varaprasadconstructions.com" target="_blank" rel="noreferrer">
              www.varaprasadconstructions.com
            </a>
          </address>
          <Image src={IMG + 'logo-srivari.png'} alt="Srivari Meadows, luxury villas at Mokila" className="sm-logo brand" />
        </Reveal>
        <Reveal delay={140}>
          <p className="sm-eyebrow">The team behind it</p>
          <h2>Designed and engineered with care.</h2>
          <div className="sm-team">
            {TEAM.map(([role, logo, name, addr]) => (
              <div key={role}>
                <span>{role}</span>
                <Image src={IMG + logo} alt={name} className="sm-logo" />
                <p>{addr}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
      <p className="sm-legal">
        Developed by {PROJECT.developer} · TG-RERA {PROJECT.rera} · HMDA layout permit {PROJECT.hmda} · Price is indicative and subject to change. This page is a conceptual presentation of the project and not a legal offering.
      </p>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function SrivariMeadows() {
  const mapQuery = encodeURIComponent('Srivari Meadows, Mokila, Hyderabad');
  const [lb, setLb] = useState(null);
  const open = useCallback((items, index) => setLb({ items, index }), []);
  const close = useCallback(() => setLb(null), []);
  const setIndex = useCallback((index) => setLb((s) => (s ? { ...s, index } : s)), []);

  return (
    <section className="container srivari">
      <style>{CSS}</style>
      <Hero />
      <SectionNav />
      <Overview />
      <Highlights onOpen={open} />
      <Features />
      <MasterPlan onOpen={open} />
      <Villas onOpen={open} />
      <Gallery onOpen={open} isLightboxOpen={Boolean(lb)} />
      <Amenities onOpen={open} />
      <Location onOpen={open} mapQuery={mapQuery} />
      <Specs />
      <Developer />

      {lb && <Lightbox items={lb.items} index={lb.index} onClose={close} onIndex={setIndex} />}
    </section>
  );
}

/* Lightbox styles live separately because the lightbox renders on <body>,
   outside the .srivari wrapper. */
const LB_CSS = `
.sm-lb{position:fixed;inset:0;z-index:99999;display:grid;grid-template-rows:auto minmax(0,1fr) auto;height:100vh;height:100dvh;background:rgba(10,20,34,.96);color:#fff;animation:sm-fade .3s ease}
.sm-lb *{box-sizing:border-box}
.sm-lb-bar{display:flex;justify-content:space-between;align-items:center;padding:14px 20px;font-size:.9rem}
.sm-lb-bar div{display:flex;gap:10px}
.sm-lb-bar button{padding:8px 14px;border:1px solid rgba(255,255,255,.35);border-radius:999px;background:none;color:#fff;font:inherit;cursor:pointer}
.sm-lb-stage{display:flex;align-items:center;justify-content:center;min-height:0;overflow:hidden;padding:0 76px}
.sm-lb-stage img{display:block;width:auto;height:auto;max-width:100%;max-height:calc(100vh - 140px);max-height:calc(100dvh - 140px);object-fit:contain;border-radius:6px;background:#fff}
.sm-lb-stage.zoom{display:block;overflow:auto;padding:0 20px;cursor:zoom-out}
.sm-lb-stage.zoom img{max-width:none;max-height:none;width:220%;margin:0 auto}
.sm-lb-cap{margin:0;padding:12px 20px 18px;text-align:center;color:rgba(255,255,255,.85);font-size:.9rem}
.sm-lb-nav{position:absolute;top:50%;width:48px;height:48px;margin-top:-24px;border:1px solid rgba(255,255,255,.35);border-radius:50%;background:rgba(255,255,255,.08);color:#fff;font-size:1.8rem;line-height:1;cursor:pointer}
.sm-lb-nav.prev{left:14px}.sm-lb-nav.next{right:14px}
@keyframes sm-fade{from{opacity:0}to{opacity:1}}
@media (max-width:640px){
  .sm-lb-stage{padding:0 8px}
  .sm-lb-nav{top:auto;bottom:70px;margin-top:0;width:42px;height:42px}
}
`;

const CSS = `
.srivari{--ink:var(--navy,#21456f);--mute:var(--muted,#5d6b7c);--acc:var(--accent,#355d83);--night:var(--deep,#0f2238);--line:rgba(33,69,111,.16);--sand:#b8a088;--ease:cubic-bezier(.2,.7,.2,1)}
.srivari *{box-sizing:border-box}
.srivari img{display:block;max-width:100%}
.srivari button{font:inherit;color:inherit;cursor:pointer}
.srivari p{color:var(--mute);line-height:1.7}
.srivari h2{margin-bottom:12px;font-size:clamp(1.9rem,3.2vw,2.7rem);line-height:1.12}
.srivari h2 em{color:var(--acc)}
.srivari h3{margin-bottom:10px}
.srivari .sm-eyebrow{margin-bottom:10px;color:var(--acc);font-size:.76rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase}

/* page-level: lets the hero and section backgrounds run edge to edge */
html,body{overflow-x:clip}

/* ---------- section bands: every section has its own background ---------- */
.srivari .sm-sec{position:relative;isolation:isolate;display:grid;gap:34px;padding:clamp(56px,7vw,96px) 0;scroll-margin-top:150px}
.srivari .sm-sec::before{content:'';position:absolute;top:0;bottom:0;left:50%;width:100vw;margin-left:-50vw;z-index:-1}
.srivari .tone-white::before{background:linear-gradient(180deg,#ffffff,#fbfdff)}
.srivari .tone-sky::before{background:radial-gradient(900px 420px at 92% 0%,rgba(174,203,230,.5),transparent 65%),linear-gradient(180deg,#f3f8fd,#e7f0f8)}
.srivari .tone-beige-glass::before{background:var(--beige-glass-background)}
.srivari .tone-sand::before{background:radial-gradient(800px 380px at 6% 0%,rgba(184,160,136,.26),transparent 65%),linear-gradient(180deg,#faf6f1,#f2eadf)}
.srivari .tone-navy::before{background:radial-gradient(900px 480px at 88% 0%,rgba(110,160,210,.3),transparent 60%),linear-gradient(135deg,#0b3b6d 0%,#0a2848 100%)}
.srivari #features{gap:18px;padding-block:clamp(32px,4vw,56px)}
.srivari :is(#features,#specs)::before{background:var(--footer-background)}
.srivari #features .sm-ticks{margin-top:0}
.srivari .sm-head{max-width:760px}
.srivari .sm-head p{font-size:1.05rem}
.srivari .sm-note{font-size:.84rem;margin-top:-10px}

/* dark (navy) section: light text */
.srivari .tone-navy h2,.srivari .tone-navy h3{color:#fff}
.srivari .tone-navy h2 em{color:#aecbe6}
.srivari .tone-navy p{color:rgba(255,255,255,.82)}
.srivari .tone-navy .sm-eyebrow{color:#aecbe6}
.srivari .tone-navy .sm-tabs{border-color:rgba(255,255,255,.22)}
.srivari .tone-navy .sm-tabs button{color:rgba(255,255,255,.68)}
.srivari .tone-navy .sm-tabs button[aria-selected="true"]{color:#fff}
.srivari .tone-navy .sm-tabs button::after{background:#dcebf8}
.srivari .tone-navy .sm-ticks li{color:#fff}
.srivari .tone-navy .sm-ticks li::before{background:rgba(255,255,255,.16)}
.srivari .tone-navy .sm-ticks li::after{border-color:#dcebf8}

/* reveal */
.srivari .sm-rv{opacity:0;transform:translateY(28px);transition:opacity .9s var(--ease) var(--d,0ms),transform .9s var(--ease) var(--d,0ms)}
.srivari .sm-rv.in{opacity:1;transform:none}

/* ---------- hero slider: first thing on the page, content on top in white ---------- */
.srivari .sm-hero{position:relative;width:100vw;margin-left:calc(50% - 50vw);height:100vh;height:100svh;min-height:640px;overflow:hidden;background:#0f2238}
.srivari .sm-hero::after{content:'';position:absolute;inset:0;z-index:1;pointer-events:none;background:linear-gradient(180deg,rgba(10,24,42,.5) 0%,rgba(10,24,42,.3) 35%,rgba(10,24,42,.82) 100%)}
.srivari .sm-hero-img{position:absolute;inset:0;width:100%;height:100%;max-width:none;object-fit:cover;opacity:0;transition:opacity 1.4s ease}
.srivari .sm-hero-img.on{opacity:1;animation:sm-ken 24s ease-in-out infinite alternate}
.srivari .sm-hero-in{position:absolute;inset:0;z-index:2;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:calc(var(--nav-top) + var(--nav-h) + 24px) 20px 68px;text-align:center;color:#fff}
.srivari .sm-hero .sm-status{display:inline-flex;align-items:center;gap:8px;margin-bottom:18px;padding:7px 14px;border:1px solid rgba(255,255,255,.4);border-radius:999px;background:rgba(255,255,255,.14);color:#fff;font-size:.82rem;font-weight:600;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}
.srivari .sm-hero .sm-status i{width:8px;height:8px;border-radius:50%;background:#2fb36b;animation:sm-pulse 2s ease-in-out infinite}
.srivari .sm-hero .sm-eyebrow{margin-bottom:12px;color:#dcebf8}
.srivari .sm-hero h1{margin-bottom:16px;color:#fff;font-size:clamp(3rem,7.4vw,6rem);line-height:1.02;text-shadow:0 4px 30px rgba(0,0,0,.35)}
.srivari .sm-hero h1 em{font-style:italic;color:#bcd7ee}
.srivari .sm-hero .sm-lede{max-width:680px;margin:0;color:rgba(255,255,255,.92);font-size:clamp(1rem,1.5vw,1.18rem)}
.srivari .sm-hero-facts{display:grid;grid-template-columns:repeat(4,1fr);width:min(900px,100%);margin-top:clamp(22px,3vw,36px);border-top:1px solid rgba(255,255,255,.35)}
.srivari .sm-hero-facts>div{padding:16px 10px 0;border-left:1px solid rgba(255,255,255,.3)}
.srivari .sm-hero-facts>div:first-child{border-left:0}
.srivari .sm-hero-facts strong{display:block;font-family:var(--sans);font-size:clamp(2rem,3.6vw,3rem);font-weight:500;line-height:1.15;font-variant-numeric:tabular-nums;color:#fff}
.srivari .sm-hero-facts>div>span{display:block;margin-top:8px;color:rgba(255,255,255,.86);font-size:.92rem}
.srivari .sm-dots{position:absolute;left:50%;bottom:clamp(20px,3vw,34px);z-index:3;display:flex;gap:8px;transform:translateX(-50%)}
.srivari .sm-dots button{width:34px;height:3px;padding:0;border:0;border-radius:3px;background:rgba(255,255,255,.5);transition:background .3s,width .3s}
.srivari .sm-dots button.on{width:52px;background:#dcebf8}

/* ---------- section nav: full-width bar right under the slider ---------- */
.srivari .sm-nav{position:sticky;top:calc(var(--nav-top) + var(--nav-h) + 8px);z-index:20;height:52px;margin-bottom:-52px;padding-top:8px;pointer-events:none}
.srivari #overview{padding-block:clamp(76px,8vw,92px) clamp(32px,4vw,56px)}
.srivari .sm-nav-in{display:flex;gap:6px;width:max-content;max-width:100%;margin:0 auto;padding:6px;border-radius:999px;overflow-x:auto;scrollbar-width:none;pointer-events:auto;background:rgba(255,255,255,.9);box-shadow:inset 0 0 0 1px var(--line),0 8px 24px rgba(15,34,56,.14);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px)}
.srivari .sm-nav[data-compact="true"]:not(:has(:focus-visible)) a:not(.on){display:none}
.srivari .sm-nav-in::-webkit-scrollbar{display:none}
.srivari .sm-nav a{flex:none;padding:8px 16px;border-radius:999px;color:var(--mute);font-size:.92rem;font-weight:500;white-space:nowrap;transition:background .3s,color .3s}
.srivari .sm-nav a:hover{color:var(--ink);background:rgba(33,69,111,.08)}
.srivari .sm-nav a.on{background:var(--ink);color:#fff;font-weight:600}
.srivari .sm-nav[data-compact="true"]:not(:has(:focus-visible)) .sm-nav-in{display:flex;width:max-content;border-radius:999px}
@media(max-width:960px){
  .srivari .sm-nav-in{gap:3px;overscroll-behavior-x:contain}
  .srivari .sm-nav a{padding:7px 12px;font-size:.82rem}
}

/* overview / highlights */
.srivari #highlights{gap:16px;padding-block:clamp(30px,4vw,52px)}
.srivari .sm-points{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));border:1px solid var(--line);border-radius:16px;background:#ffffffed;box-shadow:0 8px 24px rgba(33,69,111,.08)}
.srivari .sm-points>div{min-width:0;padding:clamp(10px,1.6vw,20px)}
.srivari .sm-points>div + div{border-left:1px solid var(--line)}
.srivari .sm-points strong{display:block;font-size:clamp(1.5rem,2.5vw,2.25rem);font-weight:650;line-height:1.1;font-variant-numeric:tabular-nums;letter-spacing:-.035em;color:var(--navy)}
.srivari .sm-point-label{display:block;margin-top:3px;color:var(--acc);font-size:.87rem;font-weight:600}
.srivari .sm-points p{margin:4px 0 0;font-size:.85rem!important}
.srivari .sm-highlight-story{
  display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.25fr);gap:12px;
  padding:8px;border:1px solid var(--line);border-radius:18px;background:var(--beige-glass-background);
}
.srivari .sm-highlight-photo{position:relative;display:block;min-height:250px;overflow:hidden;padding:0;border:0;border-radius:12px;background:#dce6ef}
.srivari .sm-highlight-photo img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.srivari .sm-highlight-photo:focus-visible{outline:3px solid var(--acc);outline-offset:2px}
.srivari .sm-highlight-enlarge{position:absolute;top:12px;right:12px;display:inline-flex;align-items:center;gap:5px;padding:5px 10px;border-radius:999px;background:#15283de6;color:#fff;font-size:.78rem}
.srivari .sm-highlight-copy{padding:clamp(10px,2vw,22px)}
.srivari .sm-highlight-options{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px}
.srivari .sm-highlight-options button{padding:6px 13px;border:1px solid var(--line);border-radius:999px;background:#fff;color:var(--navy);font-size:.9rem;font-weight:600}
.srivari .sm-highlight-options button[aria-pressed="true"]{background:var(--navy);color:#fff}
.srivari .sm-highlight-copy .sm-ticks{gap:6px;margin-top:8px}
.srivari .sm-row{display:grid;grid-template-columns:1fr 1fr;gap:clamp(30px,5vw,72px);align-items:center}
.srivari .sm-row.top{align-items:start}
.srivari .sm-row>*{min-width:0}
.srivari .sm-row.flip>:first-child{order:2}

/* image frame: the picture sits INSIDE the border, edge to edge */
.srivari .sm-frame{position:relative;margin:0;padding:10px;border:1.5px solid rgba(53,93,131,.6);border-radius:30px;background:rgba(255,255,255,.55)}
.srivari .sm-frame>button{position:relative;display:block;width:100%;padding:0;border:0;background:none;border-radius:20px;overflow:hidden}
.srivari .sm-frame img{display:block;width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:20px;background:rgba(33,69,111,.08)}
.srivari .sm-frame.contain img{aspect-ratio:auto;height:auto;object-fit:contain;background:#fff}
.srivari .sm-frame.in{opacity:1}
.srivari .sm-frame .sm-hint{top:22px;right:22px}

.srivari .sm-ticks{display:grid;gap:11px;margin:18px 0 0;padding:0;list-style:none}
.srivari .sm-ticks.two{grid-template-columns:1fr 1fr;gap:11px 22px}
.srivari .sm-ticks li{position:relative;padding-left:32px;color:var(--ink);font-weight:500;line-height:1.5}
.srivari .sm-ticks li::before{content:'';position:absolute;left:0;top:1px;width:22px;height:22px;border-radius:50%;background:rgba(53,93,131,.18)}
.srivari .sm-ticks li::after{content:'';position:absolute;left:8px;top:6px;width:5px;height:9px;border:solid var(--acc);border-width:0 2px 2px 0;transform:rotate(45deg)}
.srivari .sm-glance{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.05fr);gap:clamp(20px,4vw,56px);align-items:start}
.srivari .sm-lineart{width:100%;max-width:360px;margin-top:16px;mix-blend-mode:multiply;opacity:.85}
.srivari dl{margin:0}
.srivari .sm-glance dl{padding:6px 28px;border:1px solid var(--line);border-radius:24px;background:rgba(255,255,255,.8);box-shadow:0 14px 40px rgba(33,69,111,.08)}
.srivari .sm-glance dl>div{display:flex;justify-content:space-between;gap:14px;padding:10px 0;border-bottom:1px solid var(--line)}
.srivari .sm-glance dl>div:last-child{border-bottom:0}
.srivari dt{color:var(--mute)}
.srivari dd{margin:0;color:var(--ink);font-weight:600;text-align:right}

/* tabs */
.srivari .sm-tabs{display:flex;flex-wrap:wrap;gap:6px 28px;margin-bottom:-6px;border-bottom:1px solid var(--line)}
.srivari .sm-tabs button{position:relative;display:grid;gap:2px;padding:10px 0 14px;border:0;background:none;color:var(--mute);font-weight:600;text-align:left;transition:color .3s}
.srivari .sm-tabs button small{color:inherit;opacity:.8;font-size:.76rem;font-weight:500}
.srivari .sm-tabs button::after{content:'';position:absolute;left:0;right:0;bottom:-1px;height:2px;background:var(--acc);transform:scaleX(0);transform-origin:left;transition:transform .4s var(--ease)}
.srivari .sm-tabs button[aria-pressed="true"],.srivari .sm-tabs button[aria-selected="true"]{color:var(--ink)}
.srivari .sm-tabs button[aria-pressed="true"]::after,.srivari .sm-tabs button[aria-selected="true"]::after{transform:scaleX(1)}

/* gallery */

/* villas / floor plans */
.srivari #villas{gap:14px;padding-block:clamp(30px,4vw,52px)}
.srivari #villas .sm-note{margin:0}
.srivari .sm-plan-buttons{display:flex;flex-wrap:wrap;gap:4px;width:fit-content;max-width:100%;padding:5px;border:1px solid var(--line);border-radius:24px;background:rgba(255,255,255,.9);box-shadow:0 6px 18px rgba(15,34,56,.09)}
.srivari .sm-plan-buttons button{padding:7px clamp(9px,1.4vw,16px);border:0;border-radius:999px;background:transparent;color:var(--mute);font-size:.92rem;font-weight:500}
.srivari .sm-plan-buttons button:hover{background:rgba(33,69,111,.08);color:var(--ink)}
.srivari .sm-plan-buttons button[aria-pressed="true"]{background:var(--ink);color:#fff;font-weight:600}
.srivari .sm-plan{position:relative;display:block;width:100%;padding:12px;border:1.5px solid rgba(53,93,131,.6);border-radius:28px;overflow:hidden;background:#fff;box-shadow:0 18px 44px rgba(33,69,111,.1)}
.srivari .sm-plan img{width:100%;height:auto;border-radius:18px}
.srivari .sm-master-card button{
  display:grid;width:100%;min-width:0;padding:8px;border:1px solid var(--line);border-radius:16px;
  background:#fff;box-shadow:0 8px 24px rgba(33,69,111,.08);
}
.srivari .sm-master-card img{width:100%;height:auto;max-height:430px;object-fit:contain;border-radius:10px}
.srivari .sm-plan-caption{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:4px 12px;padding:9px 6px 2px;text-align:left;font-size:.85rem;color:var(--mute)}
.srivari .sm-plan-caption strong{display:inline-flex;align-items:center;gap:6px;color:var(--acc)}
.srivari .sm-master-card button:hover .sm-plan-caption strong{text-decoration:underline}
.srivari .sm-hint{position:absolute;top:14px;right:14px;padding:6px 12px;border-radius:999px;background:rgba(15,34,56,.72);color:#fff;font-size:.74rem;font-weight:600;opacity:0;transition:opacity .3s;pointer-events:none}
.srivari .sm-plan .sm-hint{top:24px;right:24px}
.srivari .sm-plan:is(:hover,:focus-visible) .sm-hint,.srivari .sm-frame button:hover .sm-hint{opacity:1}

/* amenities */
.srivari :is(#amenities,#location){gap:18px;padding-block:clamp(32px,4vw,52px)}
.srivari .sm-amenity{display:grid;gap:18px;animation:sm-pop .8s var(--ease) both}
.srivari .sm-amenity-copy{display:grid;grid-template-columns:1fr 1fr;gap:6px clamp(18px,4vw,48px);align-items:start}
.srivari .sm-amenity-copy h3{grid-column:1;font-size:clamp(1.5rem,2.4vw,2rem)}
.srivari .sm-amenity-copy>p{grid-column:1}
.srivari .sm-amenity-copy .sm-ticks{grid-column:2;grid-row:1/span 2;margin-top:4px}
.srivari #gallery{gap:16px;padding-block:clamp(30px,4vw,52px)}
.srivari #gallery h2{margin:0}
.srivari .sm-gallery-window{
  --slide-width:clamp(205px,26vw,330px);
  --slide-gap:clamp(10px,1.2vw,20px);
  position:relative;width:min(100%,calc(3 * var(--slide-width) + 2 * var(--slide-gap)));margin-inline:auto;
  height:clamp(235px,30vw,390px);overflow:hidden;
}
.srivari .sm-gallery-slide{
  --slide-scale:.93;
  position:absolute;top:50%;left:50%;
  width:var(--slide-width);height:96%;padding:0;border:0;border-radius:14px;overflow:hidden;
  background:#e7e0d4;
  transform:translate(calc(-50% + var(--position) * (var(--slide-width) + var(--slide-gap))),-50%) scale(var(--slide-scale));
  transition:transform .72s var(--ease);
}
.srivari .sm-gallery-slide[data-current="true"]{--slide-scale:1;z-index:1}
.srivari .sm-gallery-slide img{width:100%;height:100%;object-fit:cover}
.srivari .sm-gallery-slide:focus-visible{outline:3px solid var(--acc);outline-offset:-4px}
.srivari .sm-gallery-controls{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:12px}
.srivari .sm-gallery-controls button{padding:7px 16px;border:1px solid var(--line);border-radius:999px;background:#fff;color:var(--ink)}
@media(max-width:640px){
  .srivari .sm-gallery-window{--slide-width:56vw;--slide-gap:3vw;height:clamp(185px,67vw,290px)}
}
@media(prefers-reduced-motion:reduce){
  .srivari .sm-gallery-slide{transition:none}
}
.srivari .sm-pics{display:grid;grid-template-columns:repeat(6,1fr);grid-auto-rows:clamp(108px,12vw,150px);gap:10px}
.srivari .sm-pics button{position:relative;overflow:hidden;padding:0;border:0;border-radius:18px;background:rgba(255,255,255,.08);animation:sm-pop .8s var(--ease) both;animation-delay:calc(var(--i) * 90ms)}
.srivari .sm-pics img{width:100%;height:100%;object-fit:cover;transition:transform .8s var(--ease)}
.srivari .sm-pics button:hover img{transform:scale(1.06)}
.srivari .sm-pics span{position:absolute;left:0;right:0;bottom:0;padding:30px 14px 12px;background:linear-gradient(transparent,rgba(15,34,56,.75));color:#fff;font-size:.84rem;text-align:left}
.srivari .sm-pics .p1{grid-column:span 6;grid-row:span 2}
.srivari .sm-pics .p2,.srivari .sm-pics .p3,.srivari .sm-pics .p4,.srivari .sm-pics .p5{grid-column:span 3}
.srivari .sm-pics.n2 .p1{grid-column:span 4}.srivari .sm-pics.n2 .p2{grid-column:span 2;grid-row:span 2}
.srivari .sm-pics.n3 .p1{grid-column:span 4}.srivari .sm-pics.n3 .p2,.srivari .sm-pics.n3 .p3{grid-column:span 2}
.srivari .sm-pics.n4 .p1,.srivari .sm-pics.n5 .p1{grid-column:span 4}
.srivari .sm-pics.n4 .p2,.srivari .sm-pics.n4 .p3,.srivari .sm-pics.n5 .p2,.srivari .sm-pics.n5 .p3{grid-column:span 2}
.srivari .sm-pics.n4 .p4{grid-column:span 6}

/* master plan */
.srivari #masterplan{padding-block:clamp(30px,4vw,52px)}
.srivari .sm-master-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.4fr);gap:clamp(16px,3vw,40px);align-items:center}
.srivari .sm-master-copy p{max-width:52ch}
.srivari .sm-master-cta{display:inline-flex;align-items:center;gap:8px;margin-top:16px;padding:9px 18px;border-radius:999px;background:var(--ink);color:#fff;font-weight:600;box-shadow:0 8px 20px rgba(33,69,111,.2)}
.srivari .sm-master-cta:hover{background:var(--night)}
.srivari .sm-master-card{min-width:0}
@media(max-width:800px){.srivari .sm-master-grid{grid-template-columns:1fr}}

/* specs */
.srivari #specs{gap:16px;padding-block:clamp(32px,4vw,52px)}
.srivari #specs .sm-note{margin:0}
.srivari :is(#features,#specs) .sm-eyebrow{color:#e1c8aa}
.srivari .sm-spec-list{border:1px solid #ffffff33;border-radius:16px;background:#ffffff0a}
.srivari .sm-spec{padding:0 clamp(12px,2vw,22px);transition:background .3s}
.srivari .sm-spec + .sm-spec{border-top:1px solid #ffffff26}
.srivari .sm-spec.open{background:#ffffff0d}
.srivari .sm-spec:first-child{border-radius:15px 15px 0 0}
.srivari .sm-spec:last-child{border-radius:0 0 15px 15px}
.srivari .sm-spec>button{display:grid;grid-template-columns:1fr 26px;align-items:center;gap:10px;width:100%;min-height:48px;padding:7px 0;border:0;background:none;text-align:left;color:#fff}
.srivari .sm-spec>button:is(:hover,:focus-visible),.srivari .sm-spec.open .t{color:#e1c8aa}
.srivari .sm-spec .t{font-weight:600}
.srivari .sm-spec .p{position:relative;width:26px;height:26px;border:1px solid #ffffff38;border-radius:50%;color:#e1c8aa}
.srivari .sm-spec .p::before,.srivari .sm-spec .p::after{content:'';position:absolute;left:7px;right:7px;top:11px;height:2px;background:currentColor;transition:transform .35s var(--ease)}
.srivari .sm-spec .p::after{transform:rotate(90deg)}
.srivari .sm-spec.open .p::after{transform:rotate(0)}
.srivari .sm-spec-body{display:grid;grid-template-rows:0fr;transition:grid-template-rows .5s var(--ease)}
.srivari .sm-spec.open .sm-spec-body{grid-template-rows:1fr}
.srivari .sm-spec-body>dl{min-height:0;overflow:hidden;margin:0}
.srivari .sm-spec-body dl>div{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,3fr);gap:4px 16px;padding:7px 0;border-top:1px solid #ffffff26}
.srivari .sm-spec-body dd{margin:0;color:#f0f4fa;font-size:.9rem!important}
.srivari .sm-spec-body dt{color:#e1c8aa;font-size:.9rem!important;font-weight:600!important}

/* location */
.srivari .tone-neutral::before{background:#f4f3f1}
.srivari .sm-location-grid{grid-template-columns:minmax(0,1.35fr) minmax(0,1fr);gap:14px;align-items:stretch}
.srivari .sm-location-nearby{padding:clamp(14px,2vw,24px);border:1px solid var(--line);border-radius:20px;background:#ffffffde}
.srivari .sm-location-nearby .sm-note{margin:0}
.srivari .sm-places{display:grid;margin:0 0 12px;padding:0;list-style:none}
.srivari .sm-places li{display:flex;justify-content:space-between;gap:12px;padding:8px 0;border-bottom:1px solid var(--line);color:var(--ink)}
.srivari .sm-places b{color:var(--acc);white-space:nowrap}
.srivari .sm-map{display:flex;flex-direction:column;overflow:hidden;border:1px solid var(--line);border-radius:20px;background:#fff;box-shadow:0 12px 30px rgba(33,69,111,.12)}
.srivari .sm-map iframe{display:block;flex:1;width:100%;min-height:280px;border:0}
.srivari .sm-map-actions{display:flex;flex-wrap:wrap;justify-content:space-between;gap:10px;padding:12px 16px}
.srivari .sm-map-actions :is(a,button){display:inline-flex;align-items:center;gap:8px;padding:0;border:0;background:none;color:var(--acc);font-weight:600}
.srivari .sm-map-actions :is(a,button):hover{text-decoration:underline}

/* developer */
.srivari #developer{gap:18px;padding-block:clamp(28px,4vw,48px)}
.srivari #developer .sm-row{gap:clamp(20px,4vw,44px);align-items:start}
.srivari .sm-logo{max-width:230px;height:auto;mix-blend-mode:multiply}
.srivari #developer .sm-row>div:first-child>.sm-logo{max-width:190px}
.srivari #developer .sm-row>div:first-child>.sm-logo.brand{margin-top:12px;max-width:160px}
.srivari address{margin-top:10px;color:var(--mute);font-style:normal;overflow-wrap:anywhere}
.srivari address a{color:var(--ink);font-weight:600}
.srivari .sm-team{display:grid;gap:0;margin-top:12px;border-top:1px solid var(--line)}
.srivari .sm-team>div{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr) minmax(0,2fr);gap:12px;align-items:center;padding:10px 0;border-bottom:1px solid var(--line)}
.srivari .sm-team span{color:var(--acc);font-size:.76rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase}
.srivari .sm-team img{max-width:min(100%,120px);max-height:48px;object-fit:contain}
.srivari .sm-team p{margin:0;font-size:.88rem;line-height:1.5}

.srivari .sm-legal{margin:0;padding-top:12px;border-top:1px solid var(--line)}

@keyframes sm-ken{from{transform:scale(1)}to{transform:scale(1.09)}}
@keyframes sm-pulse{0%,100%{box-shadow:0 0 0 0 rgba(88,214,141,.6)}50%{box-shadow:0 0 0 7px rgba(88,214,141,0)}}
@keyframes sm-pop{from{opacity:0;transform:translateY(22px) scale(.98)}to{opacity:1;transform:none}}

/* tablet */
@media (max-width:960px){
  .srivari .sm-points{grid-template-columns:1fr 1fr}
  .srivari .sm-points>div:nth-child(3){border-left:0}
  .srivari .sm-points>div:nth-child(n+3){border-top:1px solid var(--line)}
  .srivari .sm-row,.srivari .sm-glance,.srivari .sm-amenity-copy{grid-template-columns:1fr}
  .srivari .sm-row.flip>:first-child{order:0}
  .srivari .sm-amenity-copy .sm-ticks{grid-column:1;grid-row:auto}
  .srivari .sm-hero{min-height:700px}
}

/* mobile */
@media (max-width:640px){
  .srivari .sm-hero{min-height:780px}
  .srivari .sm-hero-img{object-position:center}
  .srivari .sm-hero-in{padding-left:16px;padding-right:16px;padding-top:100px}
  .srivari .sm-hero h1{font-size:clamp(2.6rem,13vw,3.4rem)}
  .srivari .sm-hero-facts{grid-template-columns:1fr 1fr}
  .srivari .sm-hero-facts>div:nth-child(3){border-left:0}
  .srivari .sm-hero-facts>div:nth-child(n+3){margin-top:14px;border-top:1px solid rgba(255,255,255,.3)}
  .srivari .sm-ticks.two{grid-template-columns:1fr}
  .srivari .sm-highlight-story{grid-template-columns:1fr;gap:6px}
  .srivari .sm-highlight-photo{min-height:0;aspect-ratio:16/9}
  .srivari .sm-glance dl{padding:4px 18px}
  .srivari .sm-spec-body dl>div{grid-template-columns:1fr;gap:2px}
  .srivari .sm-team>div{grid-template-columns:1fr;gap:8px}
  .srivari .sm-pics{grid-template-columns:repeat(2,1fr)}
  .srivari .sm-pics button{grid-column:span 1!important;grid-row:span 1!important}
  .srivari .sm-pics .p1{grid-column:span 2!important}
  .srivari .sm-frame{padding:7px;border-radius:24px}
  .srivari .sm-frame>button,.srivari .sm-frame img{border-radius:17px}
}
@media (max-width:420px){
}
@media (prefers-reduced-motion:reduce){
  .srivari *{animation:none!important;transition:none!important}
  .srivari .sm-rv{opacity:1;transform:none}
}
`;
