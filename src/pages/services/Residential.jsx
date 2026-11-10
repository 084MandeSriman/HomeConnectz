/* Residential + Commercial service pages in ONE file.
   Exports: SERVICE (residential), COMMERCIAL_SERVICE, default Residential, named Commercial. */
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';

const reduced = () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function Arrow({ diagonal = false }) {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {diagonal ? <path d="M7 17 17 7M8 7h9v9" /> : <path d="M5 12h14m-6-6 6 6-6 6" />}
    </svg>
  );
}

const ICONS = {
  trend: <path d="M3 17 9 11l4 4 8-9M15 6h6v6" />,
  legal: <path d="M12 3v18M5 7h14M5 7l-3 7a3 3 0 0 0 6 0L5 7Zm14 0-3 7a3 3 0 0 0 6 0l-3-7ZM8 21h8" />,
  tag: <path d="M3 12V4h8l10 10-8 8L3 12Zm5-4h.01" />,
  key: <path d="M14 10a4 4 0 1 0-3.9 4L11 15l2 .5.5 2 2 .5.5 2h3v-3l-5.6-5.6A4 4 0 0 0 14 10Zm-5.5-1h.01" />,
  bank: <path d="M3 10 12 4l9 6M5 10v8m4-8v8m6-8v8m4-8v8M3 20h18" />,
  building: <path d="M5 21V4h9v17M14 9h5v12M3 21h18M8 8h3M8 12h3M8 16h3" />,
  map: <path d="M12 21s-7-6-7-11a7 7 0 1 1 14 0c0 5-7 11-7 11Zm0-8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />,
  doc: <path d="M6 3h8l4 4v14H6V3Zm8 0v4h4M9 12h6M9 16h6" />,
  chart: <path d="M4 20V4m0 16h16M8 16v-5m4 5V8m4 8v-3" />,
  search: <path d="M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm5-2 5 5" />,
  handshake: <path d="m3 11 4-4 4 1 3-2 4 3 3 3-3 3-2-1-3 3-3-1-2 2-3-3Z" />,
  wallet: <path d="M3 7h16a2 2 0 0 1 2 2v10H5a2 2 0 0 1-2-2V7Zm0 0V6a2 2 0 0 1 2-2h12M16 14h.01" />,
  home: <path d="m3 11 9-7 9 7M5 10v10h14V10M10 20v-5h4v5" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
};
function Ico({ name, size = 24 }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {ICONS[name] || ICONS.check}
    </svg>
  );
}

/* Tries the main picture, then each fallback in turn. */
function ServiceImage({ src, fallback, alt, className, eager = false }) {
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

/* A framed picture: sits inside its gold border and opens in the viewer when clicked. */
function Pic({ src, fallback, alt, ratio = '4 / 3', onOpen }) {
  return (
    <figure className="sv-frame" style={{ '--ar': ratio }}>
      <button type="button" onClick={() => onOpen([{ src, fallback, alt }], 0)} aria-label={`Open image: ${alt}`}>
        <ServiceImage src={src} fallback={fallback} alt={alt} />
        <span className="sv-hint">Click to enlarge</span>
      </button>
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
    <div className="sv-lb" role="dialog" aria-modal="true" aria-label={item.alt} onClick={onClose}>
      <style>{LB_CSS}</style>
      <div className="sv-lb-bar" onClick={(e) => e.stopPropagation()}>
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
      <div className={`sv-lb-stage ${zoom ? 'zoom' : ''}`} onClick={zoom ? (e) => e.stopPropagation() : onClose}>
        <ServiceImage key={item.src} src={item.src} fallback={item.fallback} alt={item.alt} eager />
      </div>
      <p className="sv-lb-cap" onClick={(e) => e.stopPropagation()}>
        {item.alt}
      </p>
      {count > 1 && (
        <>
          <button type="button" className="sv-lb-nav prev" aria-label="Previous image" onClick={(e) => { e.stopPropagation(); onIndex((index - 1 + count) % count); }}>
            ‹
          </button>
          <button type="button" className="sv-lb-nav next" aria-label="Next image" onClick={(e) => { e.stopPropagation(); onIndex((index + 1) % count); }}>
            ›
          </button>
        </>
      )}
    </div>
  );
  return typeof document === 'undefined' ? node : createPortal(node, document.body);
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
    <Tag ref={ref} className={`sv-rv ${seen ? 'in' : ''} ${className}`} style={{ '--d': `${delay}ms` }} {...rest}>
      {children}
    </Tag>
  );
}

function Head({ eyebrow, title, children }) {
  return (
    <Reveal className="sv-head">
      <p className="sv-eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {children}
    </Reveal>
  );
}

function Nav({ items }) {
  const [active, setActive] = useState(items[0][0]);
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-35% 0px -55% 0px' });
    items.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [items]);
  return (
    <nav className="sv-nav" aria-label="Page sections">
      {items.map(([id, label]) => (
        <a key={id} href={`#${id}`} className={active === id ? 'on' : ''}>
          {label}
        </a>
      ))}
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Page template                                                      */
/* ------------------------------------------------------------------ */
function ServicePage({ service, data }) {
  const { hero, help, benefits, stages, why, options, focus, faqs, cta } = data;
  const [stageRef, stageSeen] = useInView();
  const [lb, setLb] = useState(null);
  const open = useCallback((items, index) => setLb({ items, index }), []);
  const close = useCallback(() => setLb(null), []);
  const setIndex = useCallback((index) => setLb((st) => (st ? { ...st, index } : st)), []);

  const nav = [
    ['sv-about', 'Overview'],
    ['sv-help', 'How we help'],
    ['sv-benefits', benefits.nav],
    ['sv-process', 'Our process'],
    ['sv-why', 'Why us'],
    ['sv-explore', 'Explore'],
    ['sv-faq', 'FAQs'],
  ];

  return (
    <section className={`section container page-top svc ${service.id}-page`}>
      <style>{CSS}</style>

      {/* Breadcrumb */}
      <div className="sv-crumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/services">Services</Link>
        <span>/</span>
        <b>{service.title}</b>
      </div>

      {/* Intro text, centred */}
      <div className="sv-intro" id="sv-about">
        <p className="sv-eyebrow">{service.tagline}</p>
        <h1>
          {hero.title[0]} <em>{hero.title[1]}</em>
        </h1>
        <p className="sv-lead">{hero.lead}</p>
        <ul className="sv-badges">
          {hero.badges.map((b, i) => (
            <li key={b}>
              <Ico name={i === 0 ? 'handshake' : 'tag'} size={18} />
              {b}
            </li>
          ))}
        </ul>
        <div className="sv-actions">
          <Link className="sv-btn" to="/contact">
            {hero.cta} <Arrow />
          </Link>
          <Link className="sv-btn ghost" to="/projects">
            View projects <Arrow diagonal />
          </Link>
        </div>
      </div>

      {/* Full-screen hero image */}
      <header className="sv-hero">
        <ServiceImage src={service.image} fallback={service.fallback} alt={hero.alt} eager />
      </header>

      {/* Facts */}
      <div className="sv-facts">
        {hero.facts.map(([big, small]) => (
          <div key={small}>
            <strong>{big}</strong>
            <span>{small}</span>
          </div>
        ))}
      </div>

      <Nav items={nav} />

      {/* How we help */}
      <section className="sv-sec" id="sv-help">
        <Head eyebrow={help.eyebrow} title={help.title}>
          <p>{help.intro}</p>
        </Head>
        <ul className="sv-help">
          {help.items.map(([title, text, icon], i) => (
            <Reveal as="li" key={title} delay={i * 110}>
              <span className="ic">
                <Ico name={icon} size={26} />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Benefits */}
      <section className="sv-sec" id="sv-benefits">
        <Head eyebrow={benefits.eyebrow} title={benefits.title}>
          <p>{benefits.intro}</p>
        </Head>
        <ul className="sv-benefits">
          {benefits.items.map(([title, text, icon], i) => (
            <Reveal as="li" key={title} delay={(i % 2) * 120}>
              <span className="ic">
                <Ico name={icon} size={26} />
              </span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
              <em>{String(i + 1).padStart(2, '0')}</em>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Process */}
      <section className="sv-sec" id="sv-process">
        <Head eyebrow={stages.eyebrow} title={stages.title}>
          <p>{stages.intro}</p>
        </Head>
        <ol ref={stageRef} className={`sv-stages ${stageSeen ? 'in' : ''}`}>
          {stages.items.map(([title, text], i) => (
            <li key={title} style={{ '--d': `${i * 200}ms` }}>
              <b>{String(i + 1).padStart(2, '0')}</b>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Why us */}
      <section className="sv-sec" id="sv-why">
        <div className="sv-row top">
          <Head eyebrow={why.eyebrow} title={why.title}>
            <p>{why.intro}</p>
            <div className="sv-focus">
              <p className="sv-eyebrow">{focus.label}</p>
              <div>
                {focus.places.map((p) => (
                  <span key={p}>{p}</span>
                ))}
              </div>
              <p>{focus.text}</p>
            </div>
          </Head>
          <ul className="sv-why">
            {why.items.map(([title, text], i) => (
              <Reveal as="li" key={title} delay={i * 120}>
                <span className="tick" />
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Explore */}
      <section className="sv-sec" id="sv-explore">
        <Head eyebrow={options.eyebrow} title={options.title}>
          <p>{options.intro}</p>
        </Head>
        {options.items.map((o, i) => (
          <div className={`sv-row ${i % 2 ? 'flip' : ''}`} key={o.title}>
            <Reveal>
              <Pic src={o.image} fallback={service.fallback} alt={o.title} ratio="4 / 3" onOpen={open} />
            </Reveal>
            <Reveal delay={140}>
              <p className="sv-eyebrow">{o.eyebrow}</p>
              <h3 className="sv-h3">{o.title}</h3>
              <p>{o.text}</p>
              <ul className="sv-ticks">
                {o.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <Link className="sv-link" to={o.href || '/projects'}>
                {o.href ? 'View project' : 'See available projects'} <Arrow />
              </Link>
            </Reveal>
          </div>
        ))}
        <Reveal className="sv-also">
          <span>{options.also[0]}</span>
          {options.also[1]}
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="sv-sec" id="sv-faq">
        <div className="sv-row top">
          <Reveal>
            <p className="sv-eyebrow">Good to know</p>
            <h2>
              Questions, <em>answered.</em>
            </h2>
            <p>Not seeing your question? Our team will be happy to help.</p>
            <Link className="sv-link" to="/contact">
              Talk to our team <Arrow />
            </Link>
          </Reveal>
          <Reveal delay={120}>
            {faqs.map(([q, a]) => (
              <details key={q}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Closing */}
      <section className="sv-sec sv-close">
        <Reveal>
          <p className="sv-eyebrow">{service.title}</p>
          <h2>{cta.title}</h2>
          <p>{cta.text}</p>
          <div className="sv-actions">
            <Link className="sv-btn" to="/contact">
              Talk to our team <Arrow />
            </Link>
            <a className="sv-btn ghost" href="tel:+919866384827">
              Call +91 98663 84827
            </a>
          </div>
        </Reveal>
      </section>

      {lb && <Lightbox items={lb.items} index={lb.index} onClose={close} onIndex={setIndex} />}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Styles                                                             */
/* ------------------------------------------------------------------ */
const LB_CSS = `
.sv-lb{position:fixed;inset:0;z-index:99999;display:grid;grid-template-rows:auto minmax(0,1fr) auto;height:100vh;height:100dvh;background:rgba(10,20,34,.96);color:#fff;animation:sv-fade .3s ease}
.sv-lb *{box-sizing:border-box}
.sv-lb-bar{display:flex;justify-content:space-between;align-items:center;padding:14px 20px;font-size:.9rem}
.sv-lb-bar div{display:flex;gap:10px}
.sv-lb-bar button{padding:8px 14px;border:1px solid rgba(255,255,255,.35);border-radius:999px;background:none;color:#fff;font:inherit;cursor:pointer}
.sv-lb-stage{display:flex;align-items:center;justify-content:center;min-height:0;overflow:hidden;padding:0 76px}
.sv-lb-stage img{display:block;width:auto;height:auto;max-width:100%;max-height:calc(100vh - 140px);max-height:calc(100dvh - 140px);object-fit:contain;border-radius:6px}
.sv-lb-stage.zoom{display:block;overflow:auto;padding:0 20px;cursor:zoom-out}
.sv-lb-stage.zoom img{max-width:none;max-height:none;width:220%;margin:0 auto}
.sv-lb-cap{margin:0;padding:12px 20px 18px;text-align:center;color:rgba(255,255,255,.85);font-size:.9rem}
.sv-lb-nav{position:absolute;top:50%;width:48px;height:48px;margin-top:-24px;border:1px solid rgba(255,255,255,.35);border-radius:50%;background:rgba(255,255,255,.08);color:#fff;font-size:1.8rem;line-height:1;cursor:pointer}
.sv-lb-nav.prev{left:14px}.sv-lb-nav.next{right:14px}
@keyframes sv-fade{from{opacity:0}to{opacity:1}}
@media (max-width:640px){.sv-lb-stage{padding:0 8px}.sv-lb-nav{top:auto;bottom:70px;margin-top:0;width:42px;height:42px}}
`;

const CSS = `
.svc{--ink:var(--navy,#21456f);--mute:var(--muted,#5d6b7c);--acc:var(--gold,#b8953f);--g1:#e6cf9f;--g2:#c9a55a;--line:rgba(33,69,111,.16);--ease:cubic-bezier(.2,.7,.2,1);padding-top:0!important;padding-bottom:clamp(20px,3vw,36px)!important}
.svc *{box-sizing:border-box}
.svc img{display:block;max-width:100%}
.svc button{font:inherit;color:inherit;cursor:pointer}
.svc p{color:var(--mute);line-height:1.7}
.svc h2{margin-bottom:12px;font-size:clamp(1.9rem,3.2vw,2.7rem);line-height:1.12}
.svc h2 em,.svc h1 em{color:var(--acc)}
.svc h3{margin-bottom:6px;color:var(--ink)}
.svc .sv-eyebrow{margin-bottom:10px;color:var(--acc);font-size:.76rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase}
.svc .sv-sec{display:grid;gap:28px;margin-top:clamp(26px,3.4vw,44px);padding:clamp(26px,3.4vw,44px) 0 0;border-top:1px solid var(--line);scroll-margin-top:120px}
.svc .sv-head{max-width:760px}
.svc .sv-head>p:not(.sv-eyebrow){font-size:1.05rem}
.svc .sv-rv{opacity:0;transform:translateY(28px);transition:opacity .9s var(--ease) var(--d,0ms),transform .9s var(--ease) var(--d,0ms)}
.svc .sv-rv.in{opacity:1;transform:none}

/* page-level: lets the hero run edge to edge without a sideways scrollbar */
html,body{overflow-x:clip}

/* breadcrumb */
.svc .sv-crumb{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin:0 0 18px;padding-top:clamp(56px,4vw,68px);color:var(--mute);font-size:.9rem;position:relative;z-index:1}
.svc .sv-crumb a,.svc .sv-crumb b{color:var(--ink);font-weight:600}

/* intro: centred under the breadcrumb */
.svc .sv-intro{display:flex;flex-direction:column;align-items:center;max-width:900px;margin:0 auto;padding:clamp(20px,4vw,44px) 0 clamp(30px,4vw,48px);text-align:center;scroll-margin-top:120px}
.svc .sv-intro>*{animation:sv-up 1s var(--ease) both}
.svc .sv-intro>:nth-child(2){animation-delay:.08s}.svc .sv-intro>:nth-child(3){animation-delay:.16s}
.svc .sv-intro>:nth-child(4){animation-delay:.26s}.svc .sv-intro>:nth-child(5){animation-delay:.36s}
.svc .sv-intro .sv-eyebrow{margin-bottom:12px}
.svc .sv-intro h1{margin-bottom:16px;font-size:clamp(2.6rem,6vw,5rem);line-height:1.05;color:var(--ink)}
.svc .sv-intro h1 em{font-style:italic}
.svc .sv-lead{max-width:700px;font-size:clamp(1rem,1.5vw,1.18rem)}
.svc .sv-badges{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin:20px 0 0;padding:0;list-style:none}
.svc .sv-badges li{display:inline-flex;align-items:center;gap:8px;padding:8px 14px;border:1px solid var(--line);border-radius:999px;background:rgba(255,255,255,.6);color:var(--ink);font-size:.86rem;font-weight:600}
.svc .sv-badges li svg{color:var(--acc)}
.svc .sv-actions{display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin-top:24px}
.svc .sv-btn{display:inline-flex;align-items:center;gap:10px;padding:13px 22px;border:1px solid transparent;border-radius:999px;background:linear-gradient(135deg,var(--g1),var(--g2));color:#1b2b40;font-weight:700;font-size:.94rem;transition:transform .3s var(--ease),box-shadow .3s}
.svc .sv-btn:hover{transform:translateY(-2px);box-shadow:0 14px 30px rgba(0,0,0,.2)}
.svc .sv-btn.ghost{border-color:var(--ink);background:transparent;color:var(--ink)}

/* hero: full screen, edge to edge, one image */
.svc .sv-hero{position:relative;width:100vw;margin-left:calc(50% - 50vw);height:100vh;height:100svh;min-height:520px;overflow:hidden;background:rgba(33,69,111,.12)}
.svc .sv-hero>img{position:absolute;inset:0;width:100%;height:100%;max-width:none;object-fit:cover;object-position:center}

/* facts */
.svc .sv-facts{display:grid;grid-template-columns:repeat(4,1fr);margin-top:34px;border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
.svc .sv-facts>div{padding:26px 22px;border-left:1px solid var(--line)}
.svc .sv-facts>div:first-child{border-left:0}
.svc .sv-facts strong{display:block;font-family:var(--serif);font-size:clamp(1.5rem,2.8vw,2.3rem);font-weight:500;line-height:1.1;color:var(--ink)}
.svc .sv-facts>div>span{display:block;margin-top:8px;color:var(--mute);font-size:.9rem}

/* nav */
.svc .sv-nav{position:sticky;top:84px;z-index:20;display:flex;gap:30px;overflow:auto;margin-top:26px;padding:12px 4px;border-bottom:1px solid var(--line);scrollbar-width:none;backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px)}
.svc .sv-nav::-webkit-scrollbar{display:none}
.svc .sv-nav a{position:relative;flex:none;padding:4px 0;color:var(--mute);font-size:.92rem;font-weight:500}
.svc .sv-nav a::after{content:'';position:absolute;left:0;right:0;bottom:-13px;height:2px;background:var(--acc);transform:scaleX(0);transition:transform .35s var(--ease)}
.svc .sv-nav a.on{color:var(--ink);font-weight:700}
.svc .sv-nav a.on::after{transform:scaleX(1)}

/* how we help: four columns with light lines */
.svc .sv-help{display:grid;grid-template-columns:repeat(4,1fr);margin:0;padding:0;list-style:none;border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
.svc .sv-help li{padding:30px 26px 32px;border-left:1px solid var(--line)}
.svc .sv-help li:first-child{border-left:0;padding-left:0}
.svc .sv-help .ic{display:grid;place-items:center;width:56px;height:56px;margin-bottom:18px;border:1.5px solid var(--acc);border-radius:50%;color:var(--acc);transition:background .35s,color .35s}
.svc .sv-help li:hover .ic{background:var(--acc);color:#fff}
.svc .sv-help h3{font-size:1.2rem}
.svc .sv-help p{margin:0;font-size:.94rem}

/* benefits */
.svc .sv-benefits{display:grid;grid-template-columns:1fr 1fr;gap:0 clamp(30px,6vw,84px);margin:0;padding:0;list-style:none;border-top:1px solid var(--line)}
.svc .sv-benefits li{display:flex;align-items:flex-start;gap:20px;padding:26px 0;border-bottom:1px solid var(--line)}
.svc .sv-benefits .ic{display:grid;flex:none;place-items:center;width:52px;height:52px;border:1.5px solid var(--acc);border-radius:50%;color:var(--acc);transition:background .35s,color .35s}
.svc .sv-benefits li:hover .ic{background:var(--acc);color:#fff}
.svc .sv-benefits li>div{flex:1}
.svc .sv-benefits h3{font-size:1.2rem}
.svc .sv-benefits p{margin:0;font-size:.95rem}
.svc .sv-benefits em{color:var(--acc);font-family:var(--serif)}

/* stages */
.svc .sv-stages{position:relative;display:grid;grid-template-columns:repeat(5,1fr);gap:clamp(16px,2.4vw,34px);margin:0;padding:34px 0 0;list-style:none}
.svc .sv-stages::before{content:'';position:absolute;left:0;right:0;top:0;height:2px;background:linear-gradient(90deg,var(--g1),var(--acc));transform:scaleX(0);transform-origin:left;transition:transform 1.8s var(--ease)}
.svc .sv-stages.in::before{transform:scaleX(1)}
.svc .sv-stages li{position:relative;opacity:0;transform:translateY(22px);transition:opacity .9s var(--ease) var(--d,0ms),transform .9s var(--ease) var(--d,0ms)}
.svc .sv-stages.in li{opacity:1;transform:none}
.svc .sv-stages li::before{content:'';position:absolute;left:0;top:-41px;width:14px;height:14px;border:2px solid var(--acc);border-radius:50%;background:#fff}
.svc .sv-stages b{display:block;margin-bottom:6px;color:var(--acc);font-family:var(--serif);font-size:1.7rem;font-weight:500;line-height:1}
.svc .sv-stages h3{font-size:1.08rem}
.svc .sv-stages p{margin:0;font-size:.9rem;line-height:1.6}

/* rows */
.svc .sv-row{display:grid;grid-template-columns:1fr 1fr;gap:clamp(30px,5vw,72px);align-items:center}
.svc .sv-row>*{min-width:0}
.svc .sv-row.top{align-items:start}
.svc .sv-row.flip>:first-child{order:2}
.svc .sv-h3{font-size:clamp(1.5rem,2.4vw,2rem)}
.svc .sv-link{display:inline-flex;align-items:center;gap:8px;margin-top:22px;padding-bottom:3px;border-bottom:1.5px solid var(--acc);color:var(--ink);font-weight:700}
.svc .sv-ticks{display:grid;gap:11px;margin:16px 0 0;padding:0;list-style:none}
.svc .sv-ticks li{position:relative;padding-left:32px;color:var(--ink);font-weight:500;line-height:1.5}
.svc .sv-ticks li::before{content:'';position:absolute;left:0;top:1px;width:22px;height:22px;border-radius:50%;background:rgba(184,149,63,.18)}
.svc .sv-ticks li::after{content:'';position:absolute;left:8px;top:6px;width:5px;height:9px;border:solid var(--acc);border-width:0 2px 2px 0;transform:rotate(45deg)}

/* framed picture: the image sits INSIDE the border, edge to edge */
.svc .sv-frame{position:relative;margin:0;padding:10px;border:1.5px solid rgba(184,149,63,.6);border-radius:30px;background:rgba(255,255,255,.55)}
.svc .sv-frame>button{position:relative;display:block;width:100%;padding:0;border:0;background:rgba(33,69,111,.1);border-radius:20px;overflow:hidden;cursor:zoom-in}
.svc .sv-frame img{display:block;width:100%;aspect-ratio:var(--ar,4/3);object-fit:cover;border-radius:20px}
.svc .sv-hint{position:absolute;top:14px;right:14px;padding:6px 12px;border-radius:999px;background:rgba(15,34,56,.72);color:#fff;font-size:.74rem;font-weight:600;opacity:0;transition:opacity .3s;pointer-events:none}
.svc .sv-frame>button:hover .sv-hint,.svc .sv-frame>button:focus-visible .sv-hint{opacity:1}

/* why */
.svc .sv-why{display:grid;gap:0;margin:0;padding:0;list-style:none;border-top:1px solid var(--line)}
.svc .sv-why li{position:relative;display:flex;gap:20px;padding:24px 0;border-bottom:1px solid var(--line)}
.svc .sv-why .tick{position:relative;flex:none;width:30px;height:30px;top:2px;border:1.5px solid var(--acc);border-radius:50%}
.svc .sv-why .tick::after{content:'';position:absolute;left:10px;top:6px;width:7px;height:12px;border:solid var(--acc);border-width:0 2px 2px 0;transform:rotate(45deg)}
.svc .sv-why h3{font-size:1.2rem}
.svc .sv-why p{margin:0}
.svc .sv-focus{margin-top:34px;padding-top:22px;border-top:1px solid var(--line)}
.svc .sv-focus>div{display:flex;flex-wrap:wrap;gap:6px 28px;margin-bottom:8px}
.svc .sv-focus span{font-family:var(--serif);font-size:clamp(2rem,3.6vw,3rem);line-height:1.1;color:var(--ink);background:linear-gradient(var(--acc),var(--acc)) 0 100%/100% 2px no-repeat}
.svc .sv-also{padding-top:8px;color:var(--mute)}
.svc .sv-also span{margin-right:12px;color:var(--acc);font-weight:700;letter-spacing:.14em;text-transform:uppercase;font-size:.76rem}

/* faq */
.svc details{border-bottom:1px solid var(--line)}
.svc details:first-of-type{border-top:1px solid var(--line)}
.svc summary{position:relative;padding:18px 34px 18px 0;color:var(--ink);font-weight:600;cursor:pointer;list-style:none}
.svc summary::-webkit-details-marker{display:none}
.svc summary::after{content:'+';position:absolute;right:4px;top:50%;transform:translateY(-50%);color:var(--acc);font-size:1.5rem;transition:transform .3s}
.svc details[open] summary::after{transform:translateY(-50%) rotate(45deg)}
.svc details p{margin:0 0 18px}

/* closing: plain section, centred */
.svc .sv-close{text-align:center;justify-items:center}
.svc .sv-close>div{max-width:680px}
.svc .sv-close .sv-actions{justify-content:center}

@keyframes sv-up{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}

@media (max-width:1060px){
  .svc .sv-stages{grid-template-columns:1fr;padding:0 0 0 30px}
  .svc .sv-stages::before{left:0;right:auto;top:0;bottom:0;width:2px;height:auto;transform:scaleY(0);transform-origin:top}
  .svc .sv-stages.in::before{transform:scaleY(1)}
  .svc .sv-stages li{padding-bottom:6px}
  .svc .sv-stages li::before{left:-37px;top:8px}
}
@media (max-width:960px){
  .svc .sv-row{grid-template-columns:1fr}
  .svc .sv-row.flip>:first-child{order:0}
  .svc .sv-hero{height:auto;min-height:0;aspect-ratio:16/9;max-height:80vh;max-height:80svh}
  .svc .sv-facts{grid-template-columns:1fr 1fr}
  .svc .sv-facts>div:nth-child(3){border-left:0}
  .svc .sv-facts>div:nth-child(n+3){border-top:1px solid var(--line)}
  .svc .sv-benefits{grid-template-columns:1fr}
  .svc .sv-help{grid-template-columns:1fr 1fr}
  .svc .sv-help li:nth-child(odd){border-left:0;padding-left:0}
  .svc .sv-help li:nth-child(n+3){border-top:1px solid var(--line)}
}
@media (max-width:640px){
  .svc .sv-nav{top:76px;gap:22px}
  .svc .sv-hero{aspect-ratio:4/3}
  .svc .sv-intro{padding-left:6px;padding-right:6px}
  .svc .sv-intro h1{font-size:clamp(2.3rem,10.5vw,3.2rem)}
  .svc .sv-actions{width:100%}
  .svc .sv-actions .sv-btn{flex:1 1 100%;justify-content:center}
  .svc .sv-frame{padding:7px;border-radius:24px}
  .svc .sv-frame>button,.svc .sv-frame img{border-radius:17px}
  .svc .sv-help{grid-template-columns:1fr}
  .svc .sv-help li{border-left:0;padding-left:0;padding-right:0}
  .svc .sv-help li+li{border-top:1px solid var(--line)}
}
@media (prefers-reduced-motion:reduce){
  .svc *{animation:none!important;transition:none!important}
  .svc .sv-rv,.svc .sv-stages li{opacity:1;transform:none}
  .svc .sv-stages::before{transform:none}
}
`;

/* ================= RESIDENTIAL ================= */
export const SERVICE = {
  id: 'residential',
  title: 'Residential',
  tagline: 'Homes you can trust',
  icon: 'home',
  image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=75',
  fallback: '/images/services/residential.svg',
  summary: 'Apartments, villas and plots from verified developers, with site visits, paperwork and loan support handled for you.',
  stat: ['0%', 'brokerage for buyers'],
  points: ['Verified projects and builders', 'Guided site visits', 'Loan and registration help'],
  options: [
    {
      title: 'Villas and gated communities',
      text: 'Explore spacious homes, community amenities and gated neighborhoods.',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1400&q=75',
    },
    {
      title: 'Apartments and high-rises',
      text: 'Find a home that fits your budget, preferred location and commute.',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1400&q=75',
    },
  ],
};

const RESIDENTIAL_DATA = {
  hero: {
    title: ['Buy your home directly', 'from verified builders.'],
    lead: SERVICE.summary,
    badges: ['No brokerage for buyers', 'Best-rate policy'],
    cta: 'Find my home',
    alt: 'Modern residential villa with a swimming pool',
    facts: [
      ['0%', 'Brokerage for buyers'],
      ['Guided', 'Site visits'],
      ['In-house', 'Home loan support'],
      ['Verified', 'Projects and builders'],
    ],
  },
  help: {
    eyebrow: 'How we help',
    title: <>Support at every step, <em>before you buy.</em></>,
    intro: 'Four things we do for every buyer, so you can choose with confidence.',
    items: [
      ['Pre-approved loans', 'We check your loan eligibility up front, so you shop with a clear and realistic budget.', 'bank'],
      ['Property checks', 'Titles, approvals and ownership history are reviewed before a home reaches your shortlist.', 'search'],
      ['Site visits', 'We arrange your visits and come along, so you see every home with an expert beside you.', 'map'],
      ['Price negotiation', 'We negotiate directly with builders on the price and the payment plan.', 'handshake'],
    ],
  },
  benefits: {
    nav: 'What you get',
    eyebrow: 'What you get with us',
    title: <>Everything a home buyer needs, <em>in one place.</em></>,
    intro: 'From the first shortlist to the day you collect your keys, we look after the details so you can focus on choosing the right home.',
    items: [
      ['High-potential properties', 'We look for locations and projects with strong future growth, so your home keeps its value.', 'trend'],
      ['Legally checked homes', 'Titles, approvals and ownership history are reviewed before a project reaches your shortlist.', 'legal'],
      ['Competitive prices', 'We negotiate directly with developers to bring you better prices than the same location usually offers.', 'tag'],
      ['Guided site visits', 'We arrange and accompany your visits, so you see each project properly and can ask the right questions.', 'map'],
      ['On-time handover', 'We follow up with the developer so possession reaches you when it was promised.', 'key'],
      ['Home loan support', 'Our team compares lenders, prepares the paperwork and follows the loan through to disbursement.', 'wallet'],
    ],
  },
  stages: {
    eyebrow: 'How we work',
    title: <>From shortlist to registration, <em>with you at every step.</em></>,
    intro: 'A clear path from the first conversation to your keys, with one team beside you the whole way.',
    items: [
      ['Discover and select', 'Tell us your budget, location and must-haves. We shortlist verified homes that really fit.'],
      ['Site visits and negotiation', 'We arrange and accompany your visits, then negotiate the price and payment plan with the builder.'],
      ['Legal checks', 'We verify land titles, approvals and the sale agreement before you commit.'],
      ['Loans and finance', 'We help compare lenders and rates, and support you through documentation and sanction.'],
      ['Registration and possession', 'We guide stamp duty, registration and the handover of your keys.'],
    ],
  },
  why: {
    eyebrow: 'Why HomeConnectz',
    title: <>Honest advice, <em>carefully chosen projects.</em></>,
    intro: 'We work for the buyer. That means straight answers, fewer and better options, and no surprises.',
    items: [
      ['Trusted guidance', 'We help you make confident decisions through honest communication and complete transparency.'],
      ['Carefully curated projects', 'Every project is selected for its location, connectivity, quality, lifestyle and long-term value.'],
      ['Customer-first experience', 'From your first enquiry to your site visit and final decision, we are with you at every step.'],
      ['Strategic locations', 'We focus on emerging residential destinations with strong future growth.'],
    ],
  },
  focus: {
    label: 'Where we focus',
    places: ['Shankarpally', 'Mokila'],
    text: 'Emerging residential destinations around Hyderabad’s Outer Ring Road.',
  },
  options: {
    eyebrow: 'Explore the possibilities',
    title: <>Homes <em>to explore.</em></>,
    intro: 'Explore these verified residential projects and find the home that fits you.',
    items: [
      {
        eyebrow: 'Ready to move · Mokila',
        title: 'Srivari Meadows',
        text: '117 luxury 4 BHK villas by Vara Prasad Constructions, with private terraces and community amenities.',
        image: '/images/srivari-home-project.png',
        href: '/projects/srivari-meadows',
        points: ['117 villas across 14 acres', '4 BHK homes, ready to move', 'TG-RERA P02400004825'],
      },
      {
        eyebrow: 'Upcoming · Near ORR Exit 2',
        title: 'Sapphire Residences',
        text: 'Upcoming luxury apartments with a clubhouse, landscaped gardens and convenient access to ORR Exit 2.',
        image: '/images/sapphire-residences.png',
        href: '/projects/sapphire-residences',
        points: ['Luxury G+11 floor apartments', 'Clubhouse and landscaped gardens', 'Easy access to ORR Exit 2'],
      },
    ],
    also: ['Also available', 'Residential plots from verified developers. Ask our team.'],
  },
  faqs: [
    ['Do I pay any brokerage?', 'No. Buyers pay 0% brokerage with HomeConnectz.'],
    ['Do you arrange site visits?', 'Yes. We arrange site visits and accompany you to each project.'],
    ['Can you help with a home loan?', 'Yes. Our team helps you compare lenders, prepare documents and follow the loan through to disbursement.'],
    ['Do you check the legal papers?', 'We review titles, approvals and the sale agreement before a project is recommended. Please still confirm final documents with your own advisor.'],
    ['Which areas do you focus on?', 'Emerging residential areas such as Shankarpally and Mokila, along with other well-connected locations around Hyderabad.'],
    ['What does the process look like?', 'Shortlist, site visit and negotiation, legal checks, loan support, then registration and possession.'],
  ],
  cta: {
    title: 'Ready to find your home?',
    text: 'Tell us what you are looking for and our team will help you get started.',
  },
};

export default function Residential() {
  return <ServicePage service={SERVICE} data={RESIDENTIAL_DATA} />;
}

/* ================= COMMERCIAL ================= */
export const COMMERCIAL_SERVICE = {
  id: 'commercial',
  title: 'Commercial',
  tagline: 'Spaces that work for business',
  icon: 'building',
  image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=75',
  fallback: '/images/services/commercial.svg',
  summary: 'Offices, retail spaces, warehouses and commercial land from verified developers, with site visits, due diligence and finance support handled for you.',
  stat: ['0%', 'brokerage for buyers'],
  points: ['Verified properties and developers', 'Guided site visits', 'Lease, loan and registration help'],
  options: [
    {
      title: 'Offices and business parks',
      text: 'Find workspace that suits your team size, budget and commute.',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=75',
    },
    {
      title: 'Retail and showrooms',
      text: 'High-footfall shops and showrooms in growing neighbourhoods.',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=75',
    },
  ],
};

const COMMERCIAL_DATA = {
  hero: {
    title: ['Commercial property,', 'chosen with care.'],
    lead: COMMERCIAL_SERVICE.summary,
    badges: ['No brokerage for buyers', 'Best-rate policy'],
    cta: 'Find my space',
    alt: 'Modern commercial building',
    facts: [
      ['0%', 'Brokerage for buyers'],
      ['Guided', 'Site visits'],
      ['In-house', 'Finance support'],
      ['Verified', 'Properties and developers'],
    ],
  },
  help: {
    eyebrow: 'How we help',
    title: <>Support at every step, <em>before you buy.</em></>,
    intro: 'Four things we do for every business buyer, so you can decide with confidence.',
    items: [
      ['Pre-approved finance', 'We check your funding options up front, so you plan around a clear and realistic budget.', 'bank'],
      ['Property checks', 'Titles, approvals and ownership history are reviewed before a property reaches your shortlist.', 'search'],
      ['Site visits', 'We arrange your visits and come along, so you see every space with an expert beside you.', 'map'],
      ['Price negotiation', 'We negotiate directly with owners and developers on price and terms.', 'handshake'],
    ],
  },
  benefits: {
    nav: 'What you get',
    eyebrow: 'What you get with us',
    title: <>Everything a business buyer needs, <em>in one place.</em></>,
    intro: 'From the first requirement to the day you take possession, we handle the research and paperwork so you can focus on your business.',
    items: [
      ['Strong locations', 'We look for business addresses with good access, visibility and room to grow.', 'map'],
      ['Verified ownership', 'Titles, approvals and ownership history are reviewed before a property reaches your shortlist.', 'legal'],
      ['Return and rental view', 'We help you weigh price, expected rent and long-term value before you decide.', 'chart'],
      ['Right-sized spaces', 'From compact offices to large floor plates and showrooms, we match the space to your plan.', 'building'],
      ['Compliance support', 'We help you understand permissions, usage rules and paperwork for your business.', 'doc'],
      ['Finance support', 'Our team helps you compare lenders and follow the loan through to disbursement.', 'wallet'],
    ],
  },
  stages: {
    eyebrow: 'How we work',
    title: <>From requirement to registration, <em>with you at every step.</em></>,
    intro: 'A clear path from your first brief to the keys, with one team beside you the whole way.',
    items: [
      ['Understand your need', 'Tell us your business, budget, size and location. We shortlist verified options that fit.'],
      ['Site visits and negotiation', 'We arrange and accompany your visits, then negotiate price and terms.'],
      ['Legal and due diligence', 'We verify titles, approvals and agreements before you commit.'],
      ['Finance and funding', 'We help compare lenders and rates, and support you through sanction.'],
      ['Registration and possession', 'We guide registration, paperwork and handover of your space.'],
    ],
  },
  why: {
    eyebrow: 'Why HomeConnectz',
    title: <>Honest advice, <em>carefully chosen properties.</em></>,
    intro: 'We work for the buyer. That means straight answers, fewer and better options, and no surprises.',
    items: [
      ['Trusted guidance', 'We help you make confident decisions through honest communication and complete transparency.'],
      ['Carefully curated options', 'Every property is selected for location, connectivity, quality and long-term value.'],
      ['Customer-first experience', 'From your first enquiry to your site visit and final decision, we are with you at every step.'],
      ['Strategic locations', 'We focus on growing business and residential corridors around Hyderabad.'],
    ],
  },
  focus: {
    label: 'Where we focus',
    places: ['Shankarpally', 'Mokila'],
    text: 'Emerging destinations around Hyderabad’s Outer Ring Road.',
  },
  options: {
    eyebrow: 'Explore the possibilities',
    title: <>Spaces <em>to explore.</em></>,
    intro: 'Whatever your business needs, we will match you with the right property.',
    items: [
      {
        eyebrow: 'Offices',
        title: COMMERCIAL_SERVICE.options[0].title,
        text: COMMERCIAL_SERVICE.options[0].text,
        image: COMMERCIAL_SERVICE.options[0].image,
        points: ['Floor plans for teams of every size', 'Parking and lift access', 'Close to transport and talent'],
      },
      {
        eyebrow: 'Retail',
        title: COMMERCIAL_SERVICE.options[1].title,
        text: COMMERCIAL_SERVICE.options[1].text,
        image: COMMERCIAL_SERVICE.options[1].image,
        points: ['Good frontage and visibility', 'Growing neighbourhoods', 'Options for shops and showrooms'],
      },
    ],
    also: ['Also available', 'Warehouses, industrial space and commercial land. Ask our team.'],
  },
  faqs: [
    ['Do I pay any brokerage?', 'No. Buyers pay 0% brokerage with HomeConnectz.'],
    ['Do you arrange site visits?', 'Yes. We arrange site visits and accompany you to each property.'],
    ['Can you help with finance?', 'Yes. Our team helps you compare lenders, prepare documents and follow the loan through to disbursement.'],
    ['Do you check the legal papers?', 'We review titles, approvals and agreements before a property is recommended. Please still confirm final documents with your own advisor.'],
    ['What kinds of property do you offer?', 'Offices, retail spaces and showrooms, warehouses and commercial land. Tell us your requirement and we will shortlist.'],
    ['What does the process look like?', 'Requirement, site visit and negotiation, due diligence, finance, then registration and possession.'],
  ],
  cta: {
    title: 'Ready to find your space?',
    text: 'Tell us what your business needs and our team will help you get started.',
  },
};

export function Commercial() {
  return <ServicePage service={COMMERCIAL_SERVICE} data={COMMERCIAL_DATA} />;
}