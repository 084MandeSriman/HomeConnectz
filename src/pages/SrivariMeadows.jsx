import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

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
  price: '₹5 Cr onwards',
  developer: 'Vara Prasad Constructions',
  rera: 'P02400004825',
  hmda: '000371/LO/Plg/HMDA/2021',
  hero: IMG + 'elevation.jpg',
};

const HERO_SLIDES = [
  { src: IMG + 'elevation.jpg', alt: 'Row of Srivari Meadows villas along a landscaped street' },
  { src: IMG + 'entrance.jpg', alt: 'Grand entrance with security room at Srivari Meadows' },
  { src: IMG + 'street.jpg', alt: 'Tree-lined internal street at Srivari Meadows' },
];

const SECTIONS = [
  ['overview', 'Overview'],
  ['gallery', 'Gallery'],
  ['villas', 'Villas & plans'],
  ['amenities', 'Amenities'],
  ['masterplan', 'Master plan'],
  ['specs', 'Specifications'],
  ['location', 'Location'],
  ['faq', 'FAQs'],
];

const HIGHLIGHTS = [
  { to: 117, suffix: '', title: 'villas', text: 'A gated community in a setting of verdant greenery' },
  { to: 14, suffix: '', title: 'acres', text: 'Of landscaped, well-planned gated community' },
  { text0: '4 BHK', title: '+ maid’s room', text: 'G+2 villas with a 5-passenger glass-door lift' },
  { text0: '300 & 350', title: 'sq.yds', text: 'East- and West-facing villa plots, 100% Vaastu compliant' },
];

const GLANCE = [
  ['Plot size', '300 & 350 sq.yds'],
  ['Built-up area', PROJECT.size],
  ['Facing', 'East and West'],
  ['Vaastu', '100% compliant'],
  ['Road width', "33 ft and 40 ft internal roads"],
  ['TG-RERA', PROJECT.rera],
  ['HMDA layout permit', PROJECT.hmda],
  ['Developer', PROJECT.developer],
];

const STORY = [
  {
    image: 'entrance.jpg',
    alt: 'Gated entrance with security room',
    eyebrow: 'Safety',
    title: 'Combine serenity with safety',
    text: 'Constructed amidst 14 acres of verdant greenery, the 117 villas at Srivari Meadows are built with high-end security features. This gated community enjoys a grand entrance with security room, clean ambience and 24/7 security.',
    points: ['Grand entrance with security room', '24/7 security', 'Solar fencing all around the site', 'CCTV surveillance in parking and common areas'],
  },
  {
    image: 'street.jpg',
    alt: 'Tree-lined street between villas',
    eyebrow: 'Lifestyle',
    title: 'Combine lifestyle with nature',
    text: 'Your home offers every modern comfort, while your surroundings let you make a difference by living in an eco-friendly environment. The landscaped gardens are well maintained by utilising recycled water.',
    points: ['Well-designed landscape', 'Sewage treatment plant (STP)', 'Rainwater harvesting pits', 'EV charging in common areas', 'Smart lighting at master level'],
  },
];

/* [src, alt, category] */
const GALLERY = [
  ['elevation.jpg', 'Villa elevations along the street', 'Exteriors'],
  ['entrance.jpg', 'Grand entrance with security room', 'Exteriors'],
  ['street.jpg', 'Internal street lined with trees', 'Exteriors'],
  ['villa-east.jpg', 'East-facing villa elevation', 'Exteriors'],
  ['villa-west.jpg', 'West-facing villa elevation', 'Exteriors'],
  ['aerial.jpg', 'Aerial view of the community', 'Aerial'],
  ['aerial-top.jpg', 'Top view of the 117 villas and clubhouse', 'Aerial'],
  ['clubhouse.jpg', 'Club house with swimming pool', 'Club house'],
  ['pool.jpg', 'Swimming pool', 'Club house'],
  ['hall.jpg', 'Multipurpose hall', 'Club house'],
  ['gym.jpg', 'Gymnasium', 'Club house'],
  ['play.jpg', 'Kids’ play area', 'Leisure'],
  ['cricket.jpg', 'Cricket nets', 'Leisure'],
  ['badminton.jpg', 'Badminton courts', 'Leisure'],
  ['indoor.jpg', 'Indoor games', 'Leisure'],
  ['yoga.jpg', 'Yoga and aerobics', 'Leisure'],
  ['jog.jpg', 'Jogging and walking track', 'Leisure'],
  ['spa.jpg', 'Spa', 'Leisure'],
  ['guest.jpg', 'Guest rooms', 'Leisure'],
  ['business.jpg', 'Business centre', 'Business centre'],
  ['conference.jpg', 'Conference hall', 'Business centre'],
  ['workstation.jpg', 'Work stations', 'Business centre'],
  ['cafeteria.jpg', 'Cafeteria', 'Business centre'],
].map(([file, alt, cat]) => ({ src: IMG + file, alt, cat }));
const GALLERY_CATS = ['All', 'Exteriors', 'Aerial', 'Club house', 'Leisure', 'Business centre'];

const ROOMS = ['4 bedrooms', '1 maid room', '1 drawing room', '1 living room', '1 family lounge', '1 kitchen', '1 dining hall', '1 home theatre', '6 toilets', 'Lift'];
const FLOORS = [
  ['Ground floor', 'Parking, drawing, living and dining, kitchen, utility and store, guest room, maid room, lift and deck'],
  ['First floor', 'Lobby, family lounge, master room with closet, children’s room, puja, sit-out and cut-out below'],
  ['Second floor', 'Bedroom, home theatre, outdoor bar, passage and a generous terrace garden'],
];
const VILLAS = [
  { id: 'east', label: 'East villa', plot: '300', area: '4,254', image: 'villa-east.jpg', road: "33' wide east road", plans: [['e1', 'Type I'], ['e2', 'Type II']] },
  { id: 'premium', label: 'East premium villa', plot: '350', area: '4,800', image: 'villa-east.jpg', road: "33' wide east road", plans: [['ep', 'Premium']] },
  { id: 'west', label: 'West villa', plot: '300', area: '4,264', image: 'villa-west.jpg', road: "33' wide west road", plans: [['w1', 'Type I'], ['w2', 'Type II']] },
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

const FEATURES = [
  'Grand entrance with security room',
  '14 acres of gated community',
  '117 villas',
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
const LEGEND = [
  ['01', 'Grand entrance'],
  ['02', 'Amenities block'],
  ['03', 'Tot-lot open space'],
  ['04', 'Internal roads'],
  ['05', 'Existing main road'],
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

const ACCESS = [
  ['Connectivity', ['Outer Ring Road', 'Financial District', 'Gachibowli', 'Osman Sagar', 'Ocean Park', 'Golkonda Resorts']],
  ['Schools & colleges', ['ISB Gachibowli', 'IBS (ICFAI Business School)', 'Indus International School', 'Samishti School', 'Gaudium School', 'Vasavi Engg. College', 'MGIT', 'CBIT', 'IIIT Gachibowli']],
  ['Corporates', ['Wipro', 'Microsoft', 'Infosys', 'CYIENT', 'ICICI']],
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

const FAQS = [
  ['Is Srivari Meadows ready to move in?', 'Yes. Book a site visit to see the villas and amenities as they stand today and confirm the possession details in person.'],
  ['What configurations are available?', 'The villas are 4 BHK with a maid’s room, G+2 with a lift, on 300 and 350 sq.yds plots. Built-up areas are 4,254 sq ft (East, 300 sq.yds), 4,264 sq ft (West, 300 sq.yds) and 4,800 sq ft (East premium, 350 sq.yds).'],
  ['What is the price?', 'Prices are indicative from ₹5 Cr onwards and are subject to change. The developer confirms the final price.'],
  ['Is the project RERA registered?', 'The project is registered under TG-RERA P02400004825. Please verify the registration on the TG-RERA portal before making any payment.'],
  ['What amenities are inside the community?', 'A club house with swimming pool and gymnasium, spa, multipurpose halls, guest rooms, indoor games, badminton courts, cricket nets, a kids’ play area, yoga and aerobics, a jogging track and a business centre with cafeteria.'],
  ['Is brokerage charged?', 'HomeConnectz does not charge buyers brokerage. The home is offered at the developer’s price.'],
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

  return (
    <div className="sm-lb" role="dialog" aria-modal="true" aria-label={item.alt} onClick={onClose}>
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
      <div className={`sm-lb-stage ${zoom ? 'zoom' : ''}`} onClick={(e) => e.stopPropagation()}>
        <Image src={item.src} alt={item.alt} />
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
function Hero() {
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    if (reduced()) return undefined;
    const id = setInterval(() => setSlide((s) => (s + 1) % HERO_SLIDES.length), 6500);
    return () => clearInterval(id);
  }, []);
  return (
    <>
      <div className="sm-crumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/projects?status=completed">Completed projects</Link>
        <span>/</span>
        <b>{PROJECT.name}</b>
      </div>
      <header className="sm-hero">
        {HERO_SLIDES.map((s, i) => (
          <Image key={s.src} src={s.src} alt={i === slide ? s.alt : ''} className={`sm-hero-img ${i === slide ? 'on' : ''}`} eager={i === 0} />
        ))}
        <div className="sm-hero-shade" />
        <div className="sm-hero-copy">
          <span className="sm-status">
            <i />
            {PROJECT.status}
          </span>
          <p className="sm-eyebrow">Luxury villas · Mokila, Hyderabad</p>
          <h1>
            Srivari <em>Meadows</em>
          </h1>
          <p>Live like royalty in the home of your dreams. A ready-to-move gated villa community of 117 villas on 14 acres.</p>
          <div className="sm-actions">
            <Link className="sm-btn" to="/contact">
              Book a site visit <Arrow />
            </Link>
            <a className="sm-btn ghost" href="#overview">
              Explore the project <Arrow diagonal />
            </a>
          </div>
        </div>
        <div className="sm-dots" role="tablist" aria-label="Hero images">
          {HERO_SLIDES.map((s, i) => (
            <button key={s.src} type="button" role="tab" aria-selected={i === slide} aria-label={`Show image ${i + 1}`} className={i === slide ? 'on' : ''} onClick={() => setSlide(i)} />
          ))}
        </div>
      </header>
      <div className="sm-facts">
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
          <strong>₹5 Cr</strong>
          <span>Onwards, indicative</span>
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
  return (
    <nav className="sm-nav" aria-label="Srivari Meadows sections">
      {SECTIONS.map(([id, label]) => (
        <a key={id} href={`#${id}`} className={active === id ? 'on' : ''}>
          {label}
        </a>
      ))}
    </nav>
  );
}

function Overview() {
  return (
    <section className="sm-sec" id="overview">
      <Heading eyebrow="A home with room to grow" title={<>Space, privacy and a <em>ready-made community.</em></>}>
        <p>Discover 117 thoughtfully planned villas in Mokila, with generous living spaces, private terraces and a host of community amenities.</p>
      </Heading>

      <div className="sm-points">
        {HIGHLIGHTS.map((h, i) => (
          <Reveal key={h.title} delay={i * 110}>
            <strong>
              {h.to ? <Counter to={h.to} /> : h.text0} <small>{h.title}</small>
            </strong>
            <p>{h.text}</p>
          </Reveal>
        ))}
      </div>

      {STORY.map((s, i) => (
        <div className={`sm-row ${i % 2 ? 'flip' : ''}`} key={s.title}>
          <Reveal className="sm-frame">
            <Image src={IMG + s.image} alt={s.alt} />
          </Reveal>
          <Reveal delay={140}>
            <p className="sm-eyebrow">{s.eyebrow}</p>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
            <Ticks items={s.points} />
          </Reveal>
        </div>
      ))}

      <div className="sm-glance">
        <Reveal>
          <p className="sm-eyebrow">At a glance</p>
          <h3>Designed for the way you live.</h3>
          <Image src={IMG + 'lineart.jpg'} alt="" className="sm-lineart" />
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
  const [cat, setCat] = useState('All');
  const items = cat === 'All' ? GALLERY : GALLERY.filter((g) => g.cat === cat);
  return (
    <section className="sm-sec" id="gallery">
      <Heading eyebrow="A closer look" title="Explore the community.">
        <p>Every render and photograph from the project brochure. Tap any image to enlarge, and use the arrow keys to browse.</p>
      </Heading>
      <div className="sm-tabs" role="group" aria-label="Filter gallery">
        {GALLERY_CATS.map((c) => (
          <button key={c} type="button" aria-pressed={c === cat} onClick={() => setCat(c)}>
            {c}
          </button>
        ))}
      </div>
      <div className="sm-mosaic" key={cat}>
        {items.map((g, i) => (
          <button type="button" className="sm-tile" key={g.src} style={{ '--i': i }} onClick={() => onOpen(items, i)} aria-label={`Open image: ${g.alt}`}>
            <Image src={g.src} alt={g.alt} />
            <span>{g.alt}</span>
          </button>
        ))}
      </div>
      <p className="sm-note">Renders are artist’s impressions. Club house and amenity photographs are illustrative. Supplied by the developer.</p>
    </section>
  );
}

function Villas({ onOpen }) {
  const [villaId, setVillaId] = useState(VILLAS[0].id);
  const villa = VILLAS.find((v) => v.id === villaId);
  const [planKey, setPlanKey] = useState(villa.plans[0][0]);
  const [view, setView] = useState('plan');

  const choose = (id) => {
    const v = VILLAS.find((x) => x.id === id);
    setVillaId(id);
    setPlanKey(v.plans[0][0]);
  };
  const planImage = {
    src: `${IMG}${view === 'plan' ? 'plan' : 'iso'}-${planKey}.jpg`,
    alt: `${villa.label} ${villa.plans.find((p) => p[0] === planKey)[1]} ${view === 'plan' ? 'floor plans (ground, first and second floor)' : 'isometric views with room legend'}`,
  };

  return (
    <section className="sm-sec" id="villas">
      <Heading eyebrow="Villas & floor plans" title="Four bedrooms. Three floors. Your terrace.">
        <p>Choose a villa to see its specifications, floor plans and isometric views.</p>
      </Heading>
      <div className="sm-tabs big" role="tablist" aria-label="Villa type">
        {VILLAS.map((v) => (
          <button key={v.id} type="button" role="tab" aria-selected={v.id === villaId} onClick={() => choose(v.id)}>
            {v.label}
            <small>
              {v.plot} sq.yds · {v.area} sq ft
            </small>
          </button>
        ))}
      </div>

      <div className="sm-row sm-villa" key={villa.id}>
        <div className="sm-frame in">
          <button type="button" onClick={() => onOpen([{ src: IMG + villa.image, alt: `${villa.label} elevation` }], 0)} aria-label={`Open ${villa.label} elevation`}>
            <Image src={IMG + villa.image} alt={`${villa.label} elevation`} />
            <span className="sm-hint">Enlarge</span>
          </button>
        </div>
        <div className="sm-villa-copy">
          <p className="sm-eyebrow">{villa.label}</p>
          <div className="sm-nums">
            <div>
              <strong>{villa.plot}</strong>
              <span>sq.yds plot</span>
            </div>
            <div>
              <strong>{villa.area}</strong>
              <span>sq ft built-up</span>
            </div>
          </div>
          <p className="sm-rooms">{ROOMS.join('  ·  ')}</p>
          <ol className="sm-floors">
            {FLOORS.map(([f, t]) => (
              <li key={f}>
                <b>{f}</b>
                <span>{t}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="sm-planbar">
        <div className="sm-tabs" role="group" aria-label="Plan type">
          {villa.plans.map(([k, label]) => (
            <button key={k} type="button" aria-pressed={k === planKey} onClick={() => setPlanKey(k)}>
              {label}
            </button>
          ))}
        </div>
        <div className="sm-tabs" role="group" aria-label="View">
          <button type="button" aria-pressed={view === 'plan'} onClick={() => setView('plan')}>
            Floor plans
          </button>
          <button type="button" aria-pressed={view === 'iso'} onClick={() => setView('iso')}>
            Isometric views
          </button>
        </div>
      </div>
      <button type="button" className="sm-plan" key={`${planKey}-${view}`} onClick={() => onOpen([planImage], 0)} aria-label="Enlarge plan">
        <Image src={planImage.src} alt={planImage.alt} />
        <span className="sm-hint">Click to enlarge and zoom</span>
      </button>
      <p className="sm-note">Ground, first and second floor shown left to right. Dimensions and room legends are in the enlarged view. {villa.road}.</p>
    </section>
  );
}

function Amenities({ onOpen }) {
  const [tab, setTab] = useState(AMENITY_TABS[0].id);
  const t = AMENITY_TABS.find((x) => x.id === tab);
  const pics = t.images.map(([f, alt]) => ({ src: IMG + f, alt }));
  return (
    <section className="sm-sec" id="amenities">
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

function MasterPlan({ onOpen }) {
  return (
    <section className="sm-sec" id="masterplan">
      <Heading eyebrow="The community" title="Your own little universe.">
        <p>Designed to meet your every need, with easy access to offices, IT parks, international schools and colleges.</p>
      </Heading>
      <div className="sm-row">
        <Reveal className="sm-frame">
          <button type="button" onClick={() => onOpen([{ src: IMG + 'masterplan.jpg', alt: 'Srivari Meadows master plan with plot numbers' }], 0)} aria-label="Open Srivari Meadows master plan">
            <Image src={IMG + 'masterplan.jpg'} alt="Srivari Meadows community master plan" />
            <span className="sm-hint">View master plan</span>
          </button>
        </Reveal>
        <Reveal delay={140}>
          <h3>Legend</h3>
          <ul className="sm-legend">
            {LEGEND.map(([n, t]) => (
              <li key={n}>
                <b>{n}</b>
                {t}
              </li>
            ))}
          </ul>
          <h3>Project features</h3>
          <Ticks items={FEATURES} />
          <Link className="sm-link" to="/contact">
            Ask us about the layout <Arrow />
          </Link>
        </Reveal>
      </div>

      <Reveal className="sm-wide">
        <Image src={IMG + 'aerial-top.jpg'} alt="Top view of Srivari Meadows with 117 villas and the club house" />
        <figcaption>
          <h3>Srivari Meadows sets a high bar</h3>
          <p>Conceived and executed to offer amenities which surpass the best in the market, with your comfort in mind. Verdant nature has played an active role in its appeal.</p>
        </figcaption>
      </Reveal>
      <Reveal className="sm-wide plain">
        <Image src={IMG + 'aerial.jpg'} alt="Aerial view of the villas, clubhouse and main road" />
      </Reveal>
    </section>
  );
}

function Specs() {
  const [open, setOpen] = useState(0);
  return (
    <section className="sm-sec" id="specs">
      <Heading eyebrow="Built to last" title="Specifications.">
        <p>The quality of materials and fittings, from the structure to the finishing touches.</p>
      </Heading>
      <div className="sm-spec-list">
        {SPECS.map((g, i) => (
          <Reveal className={`sm-spec ${open === i ? 'open' : ''}`} key={g.title}>
            <button type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
              <span className="n">{String(i + 1).padStart(2, '0')}</span>
              <span className="t">{g.title}</span>
              <span className="p" aria-hidden="true" />
            </button>
            <div className="sm-spec-body">
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

function Location({ onOpen, mapQuery }) {
  return (
    <section className="sm-sec" id="location">
      <Heading eyebrow="Mokila, Hyderabad" title="Far from the noisy city, within its easy reach.">
        <p>Enjoy peace and tranquillity amid green surroundings, with the Outer Ring Road taking you to any destination in minutes. The community abuts the 150-feet wide Hyderabad–Shankarpally road, 15 km from the upcoming Neopolis financial district.</p>
      </Heading>
      <div className="sm-row">
        <Reveal className="sm-frame">
          <button type="button" onClick={() => onOpen([{ src: IMG + 'location-map.jpg', alt: 'Location map of Srivari Meadows near the Outer Ring Road' }], 0)} aria-label="Open location map">
            <Image src={IMG + 'location-map.jpg'} alt="Location map showing Srivari Meadows near the Outer Ring Road" />
            <span className="sm-hint">Enlarge map</span>
          </button>
        </Reveal>
        <Reveal delay={140}>
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
          <a className="sm-link" href={`https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`} target="_blank" rel="noreferrer">
            Get directions <Arrow diagonal />
          </a>
        </Reveal>
      </div>
      <div className="sm-access">
        {ACCESS.map(([title, list], i) => (
          <Reveal key={title} delay={i * 110}>
            <h4>{title}</h4>
            <p>{list.join('  ·  ')}</p>
          </Reveal>
        ))}
      </div>
      <Reveal className="sm-map">
        <iframe title="Map showing Srivari Meadows in Mokila, Hyderabad" src={`https://www.google.com/maps?q=${mapQuery}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      </Reveal>
    </section>
  );
}

function Developer() {
  return (
    <section className="sm-sec" id="developer">
      <div className="sm-row">
        <Reveal>
          <Image src={IMG + 'logo-vp.png'} alt="Vara Prasad Constructions, building tomorrow" className="sm-logo" />
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
    <section className="section container page-top srivari">
      <style>{CSS}</style>
      <Hero />
      <SectionNav />
      <Overview />
      <Gallery onOpen={open} />
      <Villas onOpen={open} />
      <Amenities onOpen={open} />
      <MasterPlan onOpen={open} />
      <Specs />
      <Location onOpen={open} mapQuery={mapQuery} />
      <Developer />

      <section className="sm-sec" id="faq">
        <div className="sm-row">
          <Reveal>
            <p className="sm-eyebrow">Good to know</p>
            <h2>Questions, answered.</h2>
            <p>Want to see the villas for yourself? We can arrange a site visit.</p>
            <Link className="sm-link" to="/contact">
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

      <Reveal className="sm-visit">
        <Image src={IMG + 'entrance.jpg'} alt="" className="sm-visit-img" />
        <div className="sm-visit-shade" />
        <div className="sm-visit-copy">
          <p className="sm-eyebrow">Ready when you are</p>
          <h2>See Srivari Meadows in person.</h2>
          <p>Arrange a site visit and get the latest availability and pricing from the developer.</p>
          <div className="sm-actions">
            <Link className="sm-btn" to="/contact">
              Book your site visit <Arrow />
            </Link>
            <a className="sm-btn ghost" href="tel:+919866384827">
              Call +91 98663 84827
            </a>
          </div>
        </div>
      </Reveal>
      <p className="sm-legal">
        Developed by {PROJECT.developer} · TG-RERA {PROJECT.rera} · HMDA layout permit {PROJECT.hmda} · Price is indicative and subject to change. This page is a conceptual presentation of the project and not a legal offering.
      </p>

      <Link className="sm-float" to="/contact">
        Book a visit <Arrow />
      </Link>
      {lb && <Lightbox items={lb.items} index={lb.index} onClose={close} onIndex={setIndex} />}
    </section>
  );
}

const CSS = `
.srivari{--ink:var(--navy,#21456f);--mute:var(--muted,#5d6b7c);--acc:var(--gold,#b8953f);--night:var(--deep,#0f2238);--line:rgba(33,69,111,.16);--ease:cubic-bezier(.2,.7,.2,1);overflow-x:clip}
.srivari *{box-sizing:border-box}
.srivari img{display:block;max-width:100%}
.srivari button{font:inherit;color:inherit;cursor:pointer}
.srivari p{color:var(--mute);line-height:1.7}
.srivari h2{margin-bottom:12px;font-size:clamp(1.9rem,3.2vw,2.7rem);line-height:1.12}
.srivari h2 em{color:var(--acc)}
.srivari h3{margin-bottom:10px}
.srivari .sm-eyebrow{margin-bottom:10px;color:var(--acc);font-size:.76rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase}
.srivari .sm-sec{display:grid;gap:34px;padding-top:clamp(64px,8vw,104px);scroll-margin-top:120px}
.srivari .sm-head{max-width:760px}
.srivari .sm-head p{font-size:1.05rem}
.srivari .sm-note{font-size:.84rem;margin-top:-10px}

/* reveal */
.srivari .sm-rv{opacity:0;transform:translateY(28px);transition:opacity .9s var(--ease) var(--d,0ms),transform .9s var(--ease) var(--d,0ms)}
.srivari .sm-rv.in{opacity:1;transform:none}

/* crumb + hero */
.srivari .sm-crumb{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:20px;color:var(--mute);font-size:.88rem}
.srivari .sm-crumb a{color:var(--ink);font-weight:600}
.srivari .sm-crumb b{color:var(--ink);font-weight:600}
.srivari .sm-hero{position:relative;min-height:clamp(460px,56vw,640px);overflow:hidden;border-radius:28px;background:rgba(33,69,111,.12)}
.srivari .sm-hero-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity 1.4s ease}
.srivari .sm-hero-img.on{opacity:1;animation:sm-ken 24s ease-in-out infinite alternate}
.srivari .sm-hero-shade{position:absolute;inset:0;background:linear-gradient(90deg,rgba(15,34,56,.9),rgba(15,34,56,.55) 55%,rgba(15,34,56,.08))}
.srivari .sm-hero::after{content:'';position:absolute;inset:0;pointer-events:none;background:linear-gradient(115deg,transparent 42%,rgba(255,255,255,.12) 50%,transparent 58%);transform:translateX(-120%);animation:sm-sheen 9s ease-in-out 1.5s infinite}
.srivari .sm-hero-copy{position:absolute;left:clamp(24px,6vw,72px);bottom:clamp(54px,7vw,80px);z-index:2;max-width:680px;color:#fff}
.srivari .sm-hero-copy .sm-eyebrow{color:#e6cf9f}
.srivari .sm-hero h1{margin-bottom:14px;color:#fff;font-size:clamp(2.9rem,6.4vw,5.2rem);line-height:1.02}
.srivari .sm-hero h1 em{font-style:italic;color:#e6cf9f}
.srivari .sm-hero-copy>p{color:rgba(255,255,255,.9);font-size:clamp(1rem,1.5vw,1.15rem)}
.srivari .sm-status{display:inline-flex;align-items:center;gap:8px;margin-bottom:16px;padding:7px 14px;border:1px solid rgba(255,255,255,.35);border-radius:999px;background:rgba(255,255,255,.1);backdrop-filter:blur(6px);color:#fff;font-size:.82rem;font-weight:600}
.srivari .sm-status i{width:8px;height:8px;border-radius:50%;background:#58d68d;animation:sm-pulse 2s ease-in-out infinite}
.srivari .sm-actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:24px}
.srivari .sm-btn{display:inline-flex;align-items:center;gap:10px;padding:13px 22px;border:1px solid transparent;border-radius:999px;background:linear-gradient(135deg,#e6cf9f,#c9a55a);color:#1b2b40;font-weight:700;font-size:.94rem;transition:transform .3s var(--ease),box-shadow .3s}
.srivari .sm-btn:hover{transform:translateY(-2px);box-shadow:0 14px 30px rgba(0,0,0,.25)}
.srivari .sm-btn.ghost{border-color:rgba(255,255,255,.55);background:rgba(255,255,255,.08);color:#fff}
.srivari .sm-dots{position:absolute;right:clamp(20px,4vw,48px);bottom:clamp(24px,4vw,40px);z-index:3;display:flex;gap:8px}
.srivari .sm-dots button{width:34px;height:3px;padding:0;border:0;border-radius:3px;background:rgba(255,255,255,.35);transition:background .3s,width .3s}
.srivari .sm-dots button.on{width:52px;background:#e6cf9f}

/* facts */
.srivari .sm-facts{display:grid;grid-template-columns:repeat(4,1fr);margin-top:32px;border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
.srivari .sm-facts>div{padding:26px 22px;border-left:1px solid var(--line)}
.srivari .sm-facts>div:first-child{border-left:0}
.srivari .sm-facts strong{display:block;font-family:var(--serif);font-size:clamp(2rem,3.6vw,3rem);font-weight:500;line-height:1;color:var(--ink)}
.srivari .sm-facts>div>span{display:block;margin-top:8px;color:var(--mute);font-size:.92rem}

/* section nav (plain text, no band) */
.srivari .sm-nav{position:sticky;top:84px;z-index:20;display:flex;gap:30px;overflow:auto;margin-top:26px;padding:12px 4px;border-bottom:1px solid var(--line);scrollbar-width:none;backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px)}
.srivari .sm-nav::-webkit-scrollbar{display:none}
.srivari .sm-nav a{position:relative;flex:none;padding:4px 0;color:var(--mute);font-size:.92rem;font-weight:500;transition:color .3s}
.srivari .sm-nav a::after{content:'';position:absolute;left:0;right:0;bottom:-13px;height:2px;background:var(--acc);transform:scaleX(0);transition:transform .35s var(--ease)}
.srivari .sm-nav a.on{color:var(--ink);font-weight:700}
.srivari .sm-nav a.on::after{transform:scaleX(1)}

/* overview */
.srivari .sm-points{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid var(--line)}
.srivari .sm-points>div{padding:22px 20px 0 0}
.srivari .sm-points strong{display:block;font-family:var(--serif);font-size:clamp(1.8rem,3vw,2.5rem);font-weight:500;line-height:1.05;color:var(--ink)}
.srivari .sm-points small{font-family:inherit;font-size:.9rem;font-weight:500;color:var(--acc)}
.srivari .sm-points p{margin-top:8px;font-size:.92rem}
.srivari .sm-row{display:grid;grid-template-columns:1fr 1.05fr;gap:clamp(30px,6vw,84px);align-items:center}
.srivari .sm-row.flip>:first-child{order:2}
.srivari .sm-frame{position:relative;margin:0 0 0 18px}
.srivari .sm-frame::before{content:'';position:absolute;inset:-18px 18px 18px -18px;border:2px solid var(--acc);border-radius:26px;opacity:.6;pointer-events:none}
.srivari .sm-frame img{position:relative;width:100%;aspect-ratio:4/3.2;object-fit:cover;border-radius:24px;background:rgba(33,69,111,.08)}
.srivari .sm-frame>button{position:relative;display:block;width:100%;padding:0;border:0;background:none;overflow:visible}
.srivari .sm-row.flip .sm-frame{margin:0 18px 0 0}
.srivari .sm-ticks{display:grid;gap:11px;margin:18px 0 0;padding:0;list-style:none}
.srivari .sm-ticks.two{grid-template-columns:1fr 1fr;gap:11px 22px}
.srivari .sm-ticks li{position:relative;padding-left:32px;color:var(--ink);font-weight:500;line-height:1.5}
.srivari .sm-ticks li::before{content:'';position:absolute;left:0;top:1px;width:22px;height:22px;border-radius:50%;background:rgba(184,149,63,.18)}
.srivari .sm-ticks li::after{content:'';position:absolute;left:8px;top:6px;width:5px;height:9px;border:solid var(--acc);border-width:0 2px 2px 0;transform:rotate(45deg)}
.srivari .sm-glance{display:grid;grid-template-columns:1fr 1.2fr;gap:clamp(30px,6vw,84px);align-items:center;padding-top:8px}
.srivari .sm-lineart{width:100%;max-width:360px;margin-top:16px;mix-blend-mode:multiply;opacity:.85}
.srivari dl{margin:0}
.srivari .sm-glance dl>div{display:flex;justify-content:space-between;gap:20px;padding:15px 0;border-bottom:1px solid var(--line)}
.srivari .sm-glance dl>div:first-child{border-top:1px solid var(--line)}
.srivari dt{color:var(--mute)}
.srivari dd{margin:0;color:var(--ink);font-weight:600;text-align:right}

/* tabs (text with underline, no pills) */
.srivari .sm-tabs{display:flex;flex-wrap:wrap;gap:6px 28px;margin-bottom:-6px;border-bottom:1px solid var(--line)}
.srivari .sm-tabs button{position:relative;display:grid;gap:2px;padding:10px 0 14px;border:0;background:none;color:var(--mute);font-weight:600;text-align:left;transition:color .3s}
.srivari .sm-tabs button small{color:var(--mute);font-size:.76rem;font-weight:500}
.srivari .sm-tabs button::after{content:'';position:absolute;left:0;right:0;bottom:-1px;height:2px;background:var(--acc);transform:scaleX(0);transform-origin:left;transition:transform .4s var(--ease)}
.srivari .sm-tabs button[aria-pressed="true"],.srivari .sm-tabs button[aria-selected="true"]{color:var(--ink)}
.srivari .sm-tabs button[aria-pressed="true"]::after,.srivari .sm-tabs button[aria-selected="true"]::after{transform:scaleX(1)}
.srivari .sm-tabs.big button{font-size:1.1rem}

/* gallery */
.srivari .sm-mosaic{display:grid;grid-template-columns:repeat(4,1fr);grid-auto-rows:200px;grid-auto-flow:dense;gap:14px}
.srivari .sm-tile{position:relative;overflow:hidden;padding:0;border:0;border-radius:18px;background:rgba(33,69,111,.08);animation:sm-pop .8s var(--ease) both;animation-delay:calc(var(--i) * 55ms)}
.srivari .sm-tile:nth-child(7n+1){grid-column:span 2;grid-row:span 2}
.srivari .sm-tile:nth-child(7n+4){grid-column:span 2}
.srivari .sm-tile img{width:100%;height:100%;object-fit:cover;transition:transform .8s var(--ease)}
.srivari .sm-tile:hover img{transform:scale(1.07)}
.srivari .sm-tile span{position:absolute;left:0;right:0;bottom:0;padding:34px 14px 12px;background:linear-gradient(transparent,rgba(15,34,56,.75));color:#fff;font-size:.84rem;font-weight:500;text-align:left;opacity:0;transform:translateY(8px);transition:opacity .35s,transform .35s}
.srivari .sm-tile:hover span,.srivari .sm-tile:focus-visible span{opacity:1;transform:none}

/* villas */
.srivari .sm-villa{margin-top:10px;animation:sm-pop .8s var(--ease) both}
.srivari .sm-nums{display:flex;gap:44px;margin-bottom:18px}
.srivari .sm-nums strong{display:block;font-family:var(--serif);font-size:clamp(2.4rem,4.4vw,3.6rem);font-weight:500;line-height:1;color:var(--ink)}
.srivari .sm-nums span{color:var(--mute);font-size:.88rem}
.srivari .sm-rooms{padding:14px 0;border-top:1px solid var(--line);border-bottom:1px solid var(--line);color:var(--ink);font-weight:500;line-height:1.9}
.srivari .sm-floors{display:grid;gap:0;margin:20px 0 0;padding:0 0 0 22px;list-style:none;border-left:2px solid var(--line)}
.srivari .sm-floors li{position:relative;display:grid;gap:2px;padding:0 0 16px 18px}
.srivari .sm-floors li::before{content:'';position:absolute;left:-29px;top:5px;width:12px;height:12px;border:2px solid var(--acc);border-radius:50%;background:#fff}
.srivari .sm-floors b{color:var(--ink)}
.srivari .sm-floors span{color:var(--mute);font-size:.92rem;line-height:1.55}
.srivari .sm-planbar{display:flex;flex-wrap:wrap;justify-content:space-between;gap:12px 30px;margin-top:20px}
.srivari .sm-planbar .sm-tabs{border:0}
.srivari .sm-plan{position:relative;display:block;width:100%;padding:0;border:0;border-radius:24px;overflow:hidden;background:#fff;box-shadow:0 18px 50px rgba(15,34,56,.08);animation:sm-pop .8s var(--ease) both}
.srivari .sm-plan img{width:100%;height:auto}
.srivari .sm-hint{position:absolute;top:14px;right:14px;padding:6px 12px;border-radius:999px;background:rgba(15,34,56,.72);color:#fff;font-size:.74rem;font-weight:600;opacity:0;transition:opacity .3s}
.srivari .sm-plan:hover .sm-hint,.srivari .sm-frame button:hover .sm-hint{opacity:1}

/* amenities */
.srivari .sm-amenity{display:grid;gap:34px;animation:sm-pop .8s var(--ease) both}
.srivari .sm-amenity-copy{display:grid;grid-template-columns:1fr 1fr;gap:10px clamp(30px,6vw,84px);align-items:start}
.srivari .sm-amenity-copy h3{grid-column:1;font-size:clamp(1.5rem,2.4vw,2rem)}
.srivari .sm-amenity-copy>p{grid-column:1}
.srivari .sm-amenity-copy .sm-ticks{grid-column:2;grid-row:1/span 2;margin-top:4px}
.srivari .sm-pics{display:grid;grid-template-columns:repeat(6,1fr);grid-auto-rows:clamp(120px,15vw,180px);gap:14px}
.srivari .sm-pics button{position:relative;overflow:hidden;padding:0;border:0;border-radius:18px;background:rgba(33,69,111,.08);animation:sm-pop .8s var(--ease) both;animation-delay:calc(var(--i) * 90ms)}
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

/* master plan, wide images */
.srivari .sm-legend{display:grid;margin:0 0 26px;padding:0;list-style:none}
.srivari .sm-legend li{display:flex;align-items:center;gap:14px;padding:11px 0;border-bottom:1px solid var(--line);color:var(--ink)}
.srivari .sm-legend b{display:grid;place-items:center;width:30px;height:30px;border:1.5px solid var(--acc);border-radius:50%;color:var(--acc);font-size:.76rem}
.srivari .sm-link{display:inline-flex;align-items:center;gap:8px;margin-top:22px;color:var(--ink);font-weight:700;border-bottom:1.5px solid var(--acc);padding-bottom:3px}
.srivari .sm-wide{position:relative;margin:0}
.srivari .sm-wide img{width:100%;max-height:560px;object-fit:cover;border-radius:26px;background:rgba(33,69,111,.08)}
.srivari .sm-wide figcaption{position:absolute;inset:auto 0 0 0;max-width:640px;padding:clamp(22px,4vw,44px);color:#fff;background:linear-gradient(0deg,rgba(15,34,56,.92) 15%,rgba(15,34,56,.55) 60%,transparent);border-radius:0 0 26px 26px;max-width:none;padding-top:90px}
.srivari .sm-wide figcaption h3{color:#fff}
.srivari .sm-wide figcaption p{max-width:620px;color:rgba(255,255,255,.88)}
.srivari .sm-wide.plain img{max-height:none}

/* specs */
.srivari .sm-spec{border-bottom:1px solid var(--line)}
.srivari .sm-spec-list{border-top:1px solid var(--line)}
.srivari .sm-spec>button{display:grid;grid-template-columns:44px 1fr 24px;align-items:center;width:100%;padding:20px 0;border:0;background:none;text-align:left}
.srivari .sm-spec .n{color:var(--acc);font-family:var(--serif);font-style:italic}
.srivari .sm-spec .t{font-family:var(--serif);font-size:1.25rem;color:var(--ink)}
.srivari .sm-spec .p{position:relative;width:16px;height:16px}
.srivari .sm-spec .p::before,.srivari .sm-spec .p::after{content:'';position:absolute;left:0;right:0;top:7px;height:2px;background:var(--ink);transition:transform .35s var(--ease)}
.srivari .sm-spec .p::after{transform:rotate(90deg)}
.srivari .sm-spec.open .p::after{transform:rotate(0)}
.srivari .sm-spec-body{display:grid;grid-template-rows:0fr;transition:grid-template-rows .5s var(--ease)}
.srivari .sm-spec.open .sm-spec-body{grid-template-rows:1fr}
.srivari .sm-spec-body>dl{min-height:0;overflow:hidden;margin-left:44px}
.srivari .sm-spec-body dl>div{display:grid;grid-template-columns:220px 1fr;gap:20px;padding:12px 0;border-top:1px dashed var(--line)}
.srivari .sm-spec-body dd{text-align:left;font-weight:400;color:var(--mute);line-height:1.6}
.srivari .sm-spec-body dt{color:var(--ink);font-weight:600}
.srivari .sm-spec.open .sm-spec-body>dl{padding-bottom:18px}

/* location */
.srivari .sm-places{display:grid;margin:0 0 18px;padding:0;list-style:none}
.srivari .sm-places li{display:flex;justify-content:space-between;gap:20px;padding:13px 0;border-bottom:1px solid var(--line);color:var(--ink)}
.srivari .sm-places b{color:var(--acc);white-space:nowrap}
.srivari .sm-access{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(20px,4vw,50px);padding-top:26px;border-top:1px solid var(--line)}
.srivari .sm-access h4{margin-bottom:8px;color:var(--ink);font-family:var(--serif);font-size:1.2rem}
.srivari .sm-access p{font-size:.94rem;line-height:1.9}
.srivari .sm-map{overflow:hidden;border-radius:26px}
.srivari .sm-map iframe{display:block;width:100%;height:clamp(300px,40vw,440px);border:0}
.srivari .sm-frame.in{opacity:1}

/* developer */
.srivari .sm-logo{max-width:230px;height:auto;mix-blend-mode:multiply}
.srivari .sm-logo.brand{margin-top:24px;max-width:200px}
.srivari address{margin-top:18px;color:var(--mute);font-style:normal;line-height:1.9}
.srivari address a{color:var(--ink);font-weight:600}
.srivari .sm-team{display:grid;gap:0;margin-top:20px;border-top:1px solid var(--line)}
.srivari .sm-team>div{display:grid;grid-template-columns:120px 150px 1fr;gap:18px;align-items:center;padding:16px 0;border-bottom:1px solid var(--line)}
.srivari .sm-team span{color:var(--acc);font-size:.76rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase}
.srivari .sm-team img{max-width:140px;max-height:54px;object-fit:contain}
.srivari .sm-team p{margin:0;font-size:.88rem;line-height:1.5}

/* faq */
.srivari details{border-bottom:1px solid var(--line)}
.srivari details:first-of-type{border-top:1px solid var(--line)}
.srivari summary{position:relative;padding:18px 34px 18px 0;color:var(--ink);font-weight:600;cursor:pointer;list-style:none}
.srivari summary::-webkit-details-marker{display:none}
.srivari summary::after{content:'+';position:absolute;right:4px;top:50%;transform:translateY(-50%);color:var(--acc);font-size:1.5rem;transition:transform .3s}
.srivari details[open] summary::after{transform:translateY(-50%) rotate(45deg)}
.srivari details p{margin:0 0 18px}

/* visit */
.srivari .sm-visit{position:relative;display:grid;align-items:end;min-height:clamp(340px,40vw,440px);margin-top:clamp(64px,8vw,104px);overflow:hidden;border-radius:28px;background:rgba(33,69,111,.12)}
.srivari .sm-visit-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;animation:sm-ken 26s ease-in-out infinite alternate}
.srivari .sm-visit-shade{position:absolute;inset:0;background:linear-gradient(90deg,rgba(15,34,56,.9),rgba(15,34,56,.35))}
.srivari .sm-visit-copy{position:relative;max-width:620px;padding:clamp(26px,5vw,56px);color:#fff}
.srivari .sm-visit-copy .sm-eyebrow{color:#e6cf9f}
.srivari .sm-visit-copy h2{color:#fff}
.srivari .sm-visit-copy p{color:rgba(255,255,255,.9)}
.srivari .sm-legal{margin-top:22px;font-size:.78rem;text-align:center}

/* floating button */
.srivari .sm-float{position:fixed;right:18px;bottom:18px;z-index:30;display:none;align-items:center;gap:8px;padding:13px 20px;border-radius:999px;background:var(--ink);color:#fff;font-weight:700;box-shadow:0 12px 30px rgba(15,34,56,.35)}

/* lightbox */
.sm-lb{position:fixed;inset:0;z-index:9999;display:grid;grid-template-rows:auto 1fr auto;background:rgba(10,20,34,.94);color:#fff;animation:sm-fade .3s ease}
.sm-lb-bar{display:flex;justify-content:space-between;align-items:center;padding:14px 20px;font-size:.9rem}
.sm-lb-bar div{display:flex;gap:10px}
.sm-lb-bar button{padding:8px 14px;border:1px solid rgba(255,255,255,.35);border-radius:999px;background:none;color:#fff;cursor:pointer}
.sm-lb-stage{display:grid;place-items:center;min-height:0;overflow:hidden;padding:0 70px}
.sm-lb-stage img{max-width:100%;max-height:100%;object-fit:contain;transition:transform .35s}
.sm-lb-stage.zoom{overflow:auto;place-items:start center;cursor:zoom-out}
.sm-lb-stage.zoom img{max-width:none;max-height:none;width:200%}
.sm-lb-cap{margin:0;padding:12px 20px 18px;text-align:center;color:rgba(255,255,255,.85);font-size:.9rem}
.sm-lb-nav{position:absolute;top:50%;width:48px;height:48px;margin-top:-24px;border:1px solid rgba(255,255,255,.35);border-radius:50%;background:rgba(255,255,255,.08);color:#fff;font-size:1.8rem;line-height:1;cursor:pointer}
.sm-lb-nav.prev{left:14px}.sm-lb-nav.next{right:14px}

@keyframes sm-ken{from{transform:scale(1)}to{transform:scale(1.09)}}
@keyframes sm-sheen{0%,60%{transform:translateX(-120%)}100%{transform:translateX(120%)}}
@keyframes sm-pulse{0%,100%{box-shadow:0 0 0 0 rgba(88,214,141,.6)}50%{box-shadow:0 0 0 7px rgba(88,214,141,0)}}
@keyframes sm-pop{from{opacity:0;transform:translateY(22px) scale(.98)}to{opacity:1;transform:none}}
@keyframes sm-fade{from{opacity:0}to{opacity:1}}

@media (max-width:960px){
  .srivari .sm-facts,.srivari .sm-points{grid-template-columns:1fr 1fr}
  .srivari .sm-facts>div:nth-child(3){border-left:0}
  .srivari .sm-facts>div:nth-child(n+3){border-top:1px solid var(--line)}
  .srivari .sm-row,.srivari .sm-glance,.srivari .sm-amenity-copy{grid-template-columns:1fr}
  .srivari .sm-row.flip>:first-child{order:0}
  .srivari .sm-amenity-copy .sm-ticks{grid-column:1;grid-row:auto}
  .srivari .sm-mosaic{grid-template-columns:repeat(2,1fr);grid-auto-rows:160px}
  .srivari .sm-tile:nth-child(7n+1){grid-column:span 2;grid-row:span 1}
  .srivari .sm-access{grid-template-columns:1fr}
  .srivari .sm-float{display:inline-flex}
}
@media (max-width:640px){
  .srivari .sm-nav{top:76px;gap:22px}
  .srivari .sm-hero{min-height:520px}
  .srivari .sm-hero-copy{left:22px;right:22px;bottom:64px}
  .srivari .sm-ticks.two{grid-template-columns:1fr}
  .srivari .sm-spec-body dl>div{grid-template-columns:1fr;gap:4px}
  .srivari .sm-spec-body>dl{margin-left:0}
  .srivari .sm-team>div{grid-template-columns:1fr;gap:8px}
  .srivari .sm-pics{grid-template-columns:repeat(2,1fr)}
  .srivari .sm-pics button{grid-column:span 1!important;grid-row:span 1!important}
  .srivari .sm-pics .p1{grid-column:span 2!important}
  .srivari .sm-lb-stage{padding:0 8px}
  .srivari .sm-frame{margin:0 0 0 12px}
}
@media (prefers-reduced-motion:reduce){
  .srivari *,.sm-lb{animation:none!important;transition:none!important}
  .srivari .sm-rv{opacity:1;transform:none}
}
`;