import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

/* ------------------------------------------------------------------ */
/*  IMAGES                                                             */
/*  Put these in  public/images/granite/                               */
/*    hero.jpg         the two-slab photo used as the hero              */
/*    black-pearl.jpg  Black Pearl slab photo                           */
/*    steel-grey.jpg   Steel Grey slab photo                            */
/*  (If you prefer, replace the BLACK_PEARL / STEEL_GREY lines below    */
/*   with your old embedded base64 lines. They work unchanged.)         */
/* ------------------------------------------------------------------ */
const BASES = ['/images/granite/', '/images/', '/granite/', '/'];
const HERO_IMG = BASES[0] + 'hero.jpg';
const BLACK_PEARL = BASES[0] + 'black-pearl.jpg';
const STEEL_GREY = BASES[0] + 'steel-grey.jpg';

/* ------------------------------------------------------------------ */
/*  CONTENT                                                            */
/* ------------------------------------------------------------------ */

export const SERVICE = {
  id: 'granite',
  title: 'Granite',
  tagline: 'Surfaces that last',
  icon: 'layers',
  image: '/images/services/cards/granite.jpg',
  fallback: '/images/services/granite.svg',
  summary:
    'Premium Black Pearl and Steel Grey granite slabs, supplied in bulk with transport, loading and mining charges already included in the rate.',
  stat: ['2', 'granite varieties'],
  points: ['Wide range of grades', 'Transport and loading included', 'Bulk supply from 5,000 sft'],
  options: [],
};

const INTRO =
  'Granite is one of the hardest materials on earth. It is long lasting, durable, and available in an array of colors and textures. The variation in each granite slab and especially the grain and movement in the crystal structure are part of the charm of buying a natural stone.';

const SPECS = [
  { value: '10 ft x 3 ft', label: 'Slab size' },
  { value: '18 mm', label: 'Thickness' },
  { value: '5,000 sft', label: 'Minimum order' },
  { value: '18%', label: 'GST extra' },
];

const STONES = [
  {
    id: 'black-pearl',
    name: 'Black Pearl',
    image: BLACK_PEARL,
    about:
      'A highly sought-after natural stone used for countertops, flooring and wall cladding. It is recognised for being durable, low-maintenance and visually striking, which makes it a popular choice for both interior and exterior applications.',
    applications: ['Kitchen countertops', 'Bathroom vanities', 'Backsplashes', 'Fireplace surrounds', 'Flooring'],
    prices: [
      { name: 'Duper', label: '₹105' },
      { name: 'Super', label: '₹115' },
      { name: 'Big Flower / Lapotra', label: '₹120' },
      { name: 'Commercial', label: '₹125' },
      { name: 'Fresh', label: '₹145' },
    ],
  },
  {
    id: 'steel-grey',
    name: 'Steel Grey',
    image: STEEL_GREY,
    about:
      'A high-quality natural stone known for its durability, elegant appearance, sleek aesthetic and versatility. It is used in both residential and commercial projects for countertops, flooring, wall cladding and outdoor installations.',
    applications: ['Kitchen countertops', 'Bathroom vanities', 'Flooring', 'Wall cladding', 'Outdoor landscaping'],
    prices: [
      { name: 'White Band', label: '₹70' },
      { name: 'White Line', label: '₹75' },
      { name: 'Black Line', label: '₹80 – 85' },
      { name: 'Super', label: '₹90 – 95' },
      { name: 'Commercial', label: '₹105' },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Building blocks                                                    */
/* ------------------------------------------------------------------ */
const reduced = () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Tries the usual public-folder locations before giving up. Data URIs work as-is. */
function Image({ src, alt, className = '', eager = false }) {
  const isData = src.startsWith('data:');
  const file = src.split('/').pop();
  const options = isData ? [src] : [src, ...BASES.map((b) => b + file).filter((c) => c !== src)];
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
          if (typeof console !== 'undefined' && !isData) console.warn('Granite image not found: ' + file + ' (expected in public/images/granite/)');
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
    <Tag ref={ref} className={`gr-rv ${seen ? 'in' : ''} ${className}`} style={{ '--d': `${delay}ms` }} {...rest}>
      {children}
    </Tag>
  );
}

function Lightbox({ item, onClose }) {
  const [zoom, setZoom] = useState(false);
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose]);

  const node = (
    <div className="gr-lb" role="dialog" aria-modal="true" aria-label={item.alt} onClick={onClose}>
      <style>{LB_CSS}</style>
      <div className="gr-lb-bar" onClick={(e) => e.stopPropagation()}>
        <span>{item.alt}</span>
        <div>
          <button type="button" onClick={() => setZoom(!zoom)}>
            {zoom ? 'Fit to screen' : 'Zoom in'}
          </button>
          <button type="button" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
      </div>
      <div className={`gr-lb-stage ${zoom ? 'zoom' : ''}`} onClick={zoom ? (e) => e.stopPropagation() : onClose}>
        <Image src={item.src} alt={item.alt} eager />
      </div>
    </div>
  );
  return typeof document === 'undefined' ? node : createPortal(node, document.body);
}

/* ------------------------------------------------------------------ */
/*  Sections                                                           */
/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <header className="gr-hero">
      <Image src={HERO_IMG} alt="Black Pearl and Steel Grey granite slabs" className="gr-hero-img" eager />
      <div className="gr-hero-in">
        <h1>Granites</h1>
        <p className="gr-lede">{INTRO}</p>
        <p className="gr-partner">Our partner <strong>Sree Shivaganga Granite</strong></p>
        <dl className="gr-hero-specs" aria-label="Granite specifications">
          {SPECS.map(({ label, value }) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </header>
  );
}

function StoneSection({ stone, onOpen }) {
  return (
    <section className="gr-sec" id={stone.id}>
      <div className="gr-row">
        <Reveal className="gr-frame">
          <button type="button" onClick={() => onOpen({ src: stone.image, alt: `${stone.name} granite slab` })} aria-label={`Enlarge ${stone.name} image`}>
            <Image src={stone.image} alt={`${stone.name} granite slab`} />
            <span className="gr-hint">Click to enlarge</span>
          </button>
        </Reveal>

        <Reveal className="gr-details">
          <h2>{stone.name}</h2>
          <p>{stone.about}</p>
          <div className="gr-pricing">
            <h3>Price per sft</h3>
            <ul className="gr-prices">
              {stone.prices.map((price) => (
                <li key={price.name}>
                  <span>{price.name}</span>
                  <b>{price.label} <small>+ GST</small></b>
                </li>
              ))}
            </ul>
            <p className="gr-note">Transportation, loading and mining charges are included.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function StoneApplications() {
  return (
    <section className="gr-sec gr-applications tone-white" aria-labelledby="granite-applications">
      <h2 id="granite-applications">Applications</h2>
      <div className="gr-application-columns">
        {STONES.map((stone) => (
          <div key={stone.id}>
            <h3>{stone.name}</h3>
            <ul className="gr-ticks">
              {stone.applications.map((application) => (
                <li key={application}>{application}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function Granite() {
  const [lb, setLb] = useState(null);
  const open = useCallback((item) => setLb(item), []);
  const close = useCallback(() => setLb(null), []);

  return (
    <section className="section container granite-page">
      <style>{CSS}</style>
      <Hero />
      <div className="gr-stones tone-sand">
        <StoneSection stone={STONES[0]} onOpen={open} />
        <StoneSection stone={STONES[1]} onOpen={open} />
      </div>
      <StoneApplications />
      {lb && <Lightbox item={lb} onClose={close} />}
    </section>
  );
}

/* Lightbox renders on <body>, outside .granite-page, so it has its own styles. */
const LB_CSS = `
.gr-lb{position:fixed;inset:0;z-index:99999;display:grid;grid-template-rows:auto minmax(0,1fr);height:100vh;height:100dvh;background:rgba(10,20,34,.96);color:#fff;animation:gr-fade .3s ease}
.gr-lb *{box-sizing:border-box}
.gr-lb-bar{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:14px 20px;font-size:.9rem}
.gr-lb-bar div{display:flex;gap:10px}
.gr-lb-bar button{padding:8px 14px;border:1px solid rgba(255,255,255,.35);border-radius:999px;background:none;color:#fff;font:inherit;cursor:pointer}
.gr-lb-stage{display:flex;align-items:center;justify-content:center;min-height:0;overflow:hidden;padding:0 24px 24px}
.gr-lb-stage img{display:block;width:auto;height:auto;max-width:100%;max-height:calc(100vh - 100px);max-height:calc(100dvh - 100px);object-fit:contain;border-radius:6px;background:#101820}
.gr-lb-stage.zoom{display:block;overflow:auto;cursor:zoom-out}
.gr-lb-stage.zoom img{max-width:none;max-height:none;width:200%;margin:0 auto}
@keyframes gr-fade{from{opacity:0}to{opacity:1}}
`;

const CSS = `
.granite-page{--ink:var(--navy,#21456f);--mute:var(--muted,#5d6b7c);--acc:var(--accent,#355d83);--line:rgba(33,69,111,.16);--ease:cubic-bezier(.2,.7,.2,1)}
.section.granite-page{padding-block:0}
.granite-page *{box-sizing:border-box}
.granite-page img{display:block;max-width:100%}
.granite-page button{font:inherit;color:inherit;cursor:pointer}
.granite-page p{color:var(--mute);line-height:1.7}
.granite-page h2{margin-bottom:12px;font-size:clamp(1.9rem,3.2vw,2.7rem);line-height:1.12;color:var(--ink)}
.granite-page h3{margin-bottom:12px;font-size:1.25rem;color:var(--ink)}

/* page-level: lets the hero and section backgrounds run edge to edge */
html,body{overflow-x:clip}

/* reveal */
.granite-page .gr-rv{opacity:0;transform:translateY(28px);transition:opacity .9s var(--ease) var(--d,0ms),transform .9s var(--ease) var(--d,0ms)}
.granite-page .gr-rv.in{opacity:1;transform:none}

/* ---------- hero ---------- */
.granite-page .gr-hero{position:relative;width:100vw;margin-left:calc(50% - 50vw);height:100vh;height:100svh;min-height:680px;overflow:hidden;background:#0f2238}
.granite-page .gr-hero-img{position:absolute;inset:0;width:100%;height:100%;max-width:none;object-fit:cover;animation:gr-ken 24s ease-in-out infinite alternate}
.granite-page .gr-hero-in{position:absolute;inset:0;z-index:2;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:calc(var(--nav-top) + var(--nav-h) + 16px) 20px clamp(36px,5vw,64px);text-align:center;color:#fff}
.granite-page .gr-hero h1{margin-bottom:16px;color:#fff;font-size:clamp(3rem,7.4vw,6rem);line-height:1.02;text-shadow:0 4px 30px rgba(0,0,0,.4)}
.granite-page .gr-hero .gr-lede{max-width:780px;margin:0;color:rgba(255,255,255,.93);font-size:clamp(1rem,1.5vw,1.18rem)}
.granite-page .gr-hero .gr-partner{margin:clamp(16px,2vw,24px) 0 0;color:#fff;text-shadow:0 1px 6px rgba(0,0,0,.85)}
.granite-page .gr-partner strong{display:block;font-size:var(--type-h1);font-weight:600;line-height:1.02}
.granite-page .gr-hero-specs{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:clamp(8px,1.5vw,16px);width:min(780px,100%);margin:clamp(14px,2vw,22px) 0 0}
.granite-page .gr-hero-specs>div{display:flex;flex-direction:column-reverse;justify-content:center;gap:6px;padding:clamp(12px,2vw,22px) 8px;border:1px solid rgba(255,255,255,.55);border-radius:16px;background:rgba(255,255,255,.18);backdrop-filter:blur(8px);text-shadow:0 1px 5px rgba(0,0,0,.85)}
.granite-page .gr-hero-specs dt{font-size:.88rem;color:#fff}
.granite-page .gr-hero-specs dd{margin:0;font-size:clamp(1.15rem,2.3vw,1.8rem);font-weight:700;line-height:1.2}

/* ---------- section bands ---------- */
.granite-page .gr-sec{position:relative;isolation:isolate;padding:clamp(24px,3vw,40px) 0;scroll-margin-top:150px}
.granite-page .gr-stones{position:relative;isolation:isolate}
.granite-page .gr-stones .gr-sec + .gr-sec{padding-top:0}
.granite-page :is(.gr-stones,.gr-applications)::before{content:'';position:absolute;top:0;bottom:0;left:50%;width:100vw;margin-left:-50vw;z-index:-1}
.granite-page .tone-white::before{background:#fff}
.granite-page .tone-sand::before{background:radial-gradient(800px 380px at 6% 0%,rgba(184,160,136,.26),transparent 65%),linear-gradient(180deg,#faf6f1,#f2eadf)}

.granite-page .gr-row{display:grid;grid-template-columns:minmax(0,2fr) minmax(0,3fr);border:1px solid var(--line);border-radius:18px;background:#fff}
.granite-page .gr-row>*{min-width:0}

/* image frame */
.granite-page .gr-frame{position:relative;border-radius:17px 0 0 17px}
.granite-page .gr-frame>button{position:absolute;inset:0;display:block;width:100%;padding:0;border:0;background:var(--ink);border-radius:inherit;overflow:hidden}
.granite-page .gr-frame img{display:block;width:100%;height:100%;object-fit:cover;transition:transform .8s var(--ease)}
.granite-page .gr-frame>button:hover img{transform:scale(1.04)}
.granite-page .gr-hint{position:absolute;top:14px;right:14px;padding:6px 12px;border-radius:999px;background:rgba(15,34,56,.72);color:#fff;font-size:.74rem;font-weight:600;opacity:0;transition:opacity .3s;pointer-events:none}
.granite-page .gr-frame>button:is(:hover,:focus-visible) .gr-hint{opacity:1}
.granite-page .gr-frame>button:focus-visible{outline:3px solid var(--acc);outline-offset:3px}

.granite-page .gr-applications h2{margin-bottom:20px}
.granite-page .gr-application-columns{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px clamp(24px,5vw,64px)}

.granite-page .gr-details{padding:clamp(16px,2.5vw,32px)}
.granite-page .gr-details h2{margin-bottom:6px}
.granite-page .gr-pricing{margin-top:12px;padding-top:10px;border-top:1px solid var(--line)}
.granite-page .gr-pricing h3{margin-bottom:4px}

.granite-page .gr-ticks{display:grid;gap:8px;margin:0;padding:0;list-style:none}
.granite-page .gr-ticks li{position:relative;padding-left:32px;color:var(--ink)}
.granite-page .gr-ticks li::before{content:'';position:absolute;left:0;top:2px;width:22px;height:22px;border-radius:50%;background:rgba(53,93,131,.18)}
.granite-page .gr-ticks li::after{content:'';position:absolute;left:8px;top:7px;width:5px;height:9px;border:solid var(--acc);border-width:0 2px 2px 0;transform:rotate(45deg)}

.granite-page .gr-prices{display:grid;margin:0;padding:0;list-style:none}
.granite-page .gr-prices li{display:flex;align-items:baseline;justify-content:space-between;gap:8px;padding:5px 0;border-bottom:1px solid var(--line);color:var(--ink)}
.granite-page .gr-prices b{font-family:var(--sans);font-size:1.15rem;font-weight:600;color:var(--ink);white-space:nowrap}
.granite-page .gr-prices b small{margin-left:5px;font-size:.76rem;font-weight:400;color:var(--mute)}
.granite-page .gr-note{margin:8px 0 0;font-size:.88rem}
.granite-page .gr-note::before{content:'';display:inline-block;width:7px;height:7px;margin-right:10px;border-radius:50%;background:var(--acc)}

@keyframes gr-ken{from{transform:scale(1)}to{transform:scale(1.08)}}

/* tablet */
@media(max-width:960px){
  .granite-page .gr-row{grid-template-columns:1fr}
  .granite-page .gr-frame{border-radius:17px 17px 0 0}
  .granite-page .gr-frame>button{position:relative;aspect-ratio:16/6}
  .granite-page .gr-frame img{position:absolute;inset:0}
  .granite-page .gr-hero{min-height:760px}
}
/* mobile */
@media(max-width:640px){
  .granite-page .gr-application-columns{grid-template-columns:1fr}
  .granite-page .gr-sec{scroll-margin-top:140px}
  .granite-page .gr-hero{min-height:920px}
  .granite-page .gr-hero-in{padding-inline:16px}
  .granite-page .gr-hero h1{font-size:clamp(2.6rem,13vw,3.4rem)}
  .granite-page .gr-hero-specs{grid-template-columns:repeat(2,minmax(0,1fr))}
}
@media(prefers-reduced-motion:reduce){
  .granite-page *{animation:none!important;transition:none!important}
  .granite-page .gr-rv{opacity:1;transform:none}
}
`;
