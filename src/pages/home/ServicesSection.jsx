import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { services } from './homeData.js';
import { Icon, Img } from './HomeShared.jsx';

// ==========================================================================
//  SERVICES: three scroll styles, one file
//
//  Pick one by changing VARIANT below (or pass <ServicesSection variant="reel" />):
//
//   'split'  Photo stays pinned on the left. As you scroll the text on the
//            right, the photo is wiped over by the next service.
//   'reel'   The page scrolls down, the cards slide sideways like a film strip.
//   'stack'  Full-screen cards stack on top of each other.
//
//  Same data, same images, same links in all three.
// ==========================================================================

const VARIANT = 'split';

const body = (s) => s.summary || s.text;

// ---------------------------------------------------------------------------
//  STYLE 1: split (pinned photo + scrolling text)
// ---------------------------------------------------------------------------

function SplitView({ list }) {
  const [active, setActive] = useState(0);
  const items = useRef([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(Number(e.target.dataset.i)); });
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );
    items.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [list.length]);

  const now = list[active] || list[0];

  return (
    <div className="spl">
      <div className="spl-visual" aria-hidden="true">
        <div className="spl-frame">
          {list.map((s, i) => (
            <div key={s.id} className={`spl-img${i <= active ? ' on' : ''}`} style={{ zIndex: i + 1 }}>
              <Img src={s.img} alt="" fallback={s.fallback} />
            </div>
          ))}
          <div className="spl-tag" key={now.id}>
            <Icon name={now.icon || 'sparkle'} size={22} />
            <span>{now.title}</span>
          </div>
        </div>
      </div>

      <ul className="spl-list">
        {list.map((s, i) => (
          <li
            key={s.id}
            data-i={i}
            ref={(el) => { items.current[i] = el; }}
            className={`spl-item${i === active ? ' on' : ''}`}
          >
            <div className="spl-m"><Img src={s.img} alt={s.title} fallback={s.fallback} /></div>
            <span className="spl-badge"><Icon name={s.icon || 'sparkle'} size={30} /></span>
            <h3>{s.title}</h3>
            <p>{body(s)}</p>
            <Link to={`/services/${s.id}`} className="spl-link" aria-label={`Explore ${s.title} services`}>
              Explore service <Icon name="arrow" size={18} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ---------------------------------------------------------------------------
//  STYLE 2: reel (vertical scroll moves the cards sideways)
// ---------------------------------------------------------------------------

function ReelView({ list }) {
  const outer = useRef(null);
  const pin = useRef(null);
  const track = useRef(null);
  const bar = useRef(null);

  useEffect(() => {
    const flat = window.matchMedia('(max-width: 760px), (prefers-reduced-motion: reduce)');
    let raf = 0;
    let dist = 0;

    const measure = () => {
      const o = outer.current; const t = track.current; const p = pin.current;
      if (!o || !t || !p) return;
      if (flat.matches) { o.style.removeProperty('--d'); t.style.transform = ''; return; }
      dist = Math.max(0, t.scrollWidth - p.clientWidth);
      o.style.setProperty('--d', `${dist}px`);
    };

    const update = () => {
      raf = 0;
      const o = outer.current; const t = track.current;
      if (!o || !t || flat.matches) return;
      const total = o.offsetHeight - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -o.getBoundingClientRect().top / total)) : 0;
      t.style.transform = `translate3d(${(-p * dist).toFixed(1)}px,0,0)`;
      if (bar.current) bar.current.style.transform = `scaleX(${p.toFixed(3)})`;
    };

    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    const onResize = () => { measure(); onScroll(); };

    measure(); update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [list.length]);

  return (
    <div className="reel" ref={outer}>
      <div className="reel-pin" ref={pin}>
        <div className="reel-track" ref={track}>
          {list.map((s) => (
            <Link key={s.id} to={`/services/${s.id}`} className="reel-card" aria-label={`Explore ${s.title} services`}>
              <div className="reel-media"><Img src={s.img} alt={s.title} fallback={s.fallback} /></div>
              <div className="reel-cap">
                <div className="reel-top">
                  <span className="reel-badge"><Icon name={s.icon || 'sparkle'} size={26} /></span>
                  <h3>{s.title}</h3>
                </div>
                <p>{body(s)}</p>
                <span className="reel-more">Explore service <Icon name="arrow" size={18} /></span>
              </div>
            </Link>
          ))}
        </div>
        <div className="reel-bar" aria-hidden="true"><i ref={bar} /></div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
//  STYLE 3: stack (full-screen cards cover each other)
// ---------------------------------------------------------------------------

function StackView({ list }) {
  const refs = useRef([]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let raf = 0;
    const update = () => {
      raf = 0;
      const cards = refs.current.filter(Boolean);
      cards.forEach((el, i) => {
        const next = cards[i + 1];
        let p = 0;
        if (next) {
          const stickyTop = parseFloat(getComputedStyle(el).top) || 0;
          p = 1 - (next.getBoundingClientRect().top - stickyTop) / el.offsetHeight;
          p = Math.min(1, Math.max(0, p));
        }
        el.style.setProperty('--p', p.toFixed(3));
      });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [list.length]);

  return (
    <div className="stk-stack">
      {list.map((s, i) => (
        <Link
          key={s.id}
          to={`/services/${s.id}`}
          className="stk-card"
          ref={(el) => { refs.current[i] = el; }}
          aria-label={`Explore ${s.title} services`}
        >
          <div className="stk-media"><Img src={s.img} alt={s.title} fallback={s.fallback} /></div>
          <span className="stk-shade" aria-hidden="true" />
          <div className="stk-panel">
            <span className="stk-badge"><Icon name={s.icon || 'sparkle'} size={34} /></span>
            <h3>{s.title}</h3>
            <p className="stk-text">{body(s)}</p>
            <span className="stk-more">
              Explore service
              <span className="stk-go" aria-hidden="true"><Icon name="arrow" size={20} /></span>
            </span>
          </div>
          <span className="stk-dim" aria-hidden="true" />
        </Link>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
//  SECTION
// ---------------------------------------------------------------------------

const VIEWS = { split: SplitView, reel: ReelView, stack: StackView };

export default function ServicesSection({ standalone = false, variant = VARIANT }) {
  const sectionRef = useRef(null);
  const View = VIEWS[variant] || SplitView;

  // Width of the page scrollbar, so full-width layouts never cause sideways scrolling.
  useEffect(() => {
    const set = () => {
      const sbw = window.innerWidth - document.documentElement.clientWidth;
      if (sectionRef.current) sectionRef.current.style.setProperty('--sbw', `${sbw}px`);
    };
    set();
    window.addEventListener('resize', set);
    return () => window.removeEventListener('resize', set);
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`section container svc-section stk-section${standalone ? ' svc-page' : ''}`}
      id="services"
    >
      <style>{CSS}</style>

      <div className="head">
        <h2>Our services</h2>
        <p className="lead">From finding the property to finishing and powering it.</p>
      </div>

      <View list={services} />
    </section>
  );
}

// ==========================================================================
//  DESIGN
//  --nav-h  height of your floating navbar (raise it if the navbar overlaps).
//  --r      corner roundness. 0px = sharp edges. Try 12px for soft corners.
//  NOTE: sticky effects stop working if a parent has overflow:hidden/auto.
// ==========================================================================
const CSS = `
.stk-section{
  --nav-h:96px;--sbw:0px;--r:0px;
  --sv-navy:var(--navy,#14284b);
  --service-accent:var(--accent);
  background:#fff;
}

/* ===================== split ===================== */
.spl{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr);gap:64px;align-items:start;margin-top:40px}
.spl-visual{position:sticky;top:calc(var(--nav-h) + 16px);height:calc(100vh - var(--nav-h) - 48px);min-height:420px;max-height:760px}
.spl-frame{position:relative;width:100%;height:100%;overflow:hidden;border-radius:var(--r);background:#fff;border:1px solid rgba(20,40,75,.08);box-shadow:0 18px 44px rgba(20,40,75,.08)}
.spl-img{position:absolute;inset:0;clip-path:inset(100% 0 0 0);transition:clip-path .9s cubic-bezier(.7,0,.2,1)}
.spl-img.on{clip-path:inset(0)}
.spl-img > *,.spl-img img{display:block;width:100%;height:100%;object-fit:cover}
.spl-img img{transform:scale(1.1);transition:transform 1.6s cubic-bezier(.2,.7,.2,1)}
.spl-img.on img{transform:scale(1)}
.spl-tag{position:absolute;left:0;bottom:0;z-index:50;display:flex;align-items:center;gap:12px;padding:16px 26px;background:#fff;color:var(--sv-navy);font-weight:600;font-size:1.05rem;border-top:4px solid var(--service-accent);animation:splTag .5s ease both}
@keyframes splTag{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}

.spl-list{list-style:none;margin:0;padding:0}
.spl-item{
  min-height:calc(100vh - var(--nav-h));
  display:grid;align-content:center;justify-items:start;gap:16px;
  padding:40px 0 40px 36px;
  border-left:2px solid rgba(20,40,75,.15);
  opacity:.3;transition:opacity .5s,border-color .5s;
}
.spl-item.on{opacity:1;border-left-color:var(--service-accent)}
.spl-m{display:none}
.spl-badge{display:grid;place-items:center;width:60px;height:60px;border:1.5px solid var(--sv-navy);border-radius:var(--r);color:var(--sv-navy)}
.spl-item h3{margin:6px 0 0;font-size:clamp(1.8rem,3.2vw,2.7rem);font-weight:600;line-height:1.12;letter-spacing:-.015em;color:var(--sv-navy)}
.spl-item p{margin:0;max-width:46ch;font-size:1.1rem;line-height:1.7;color:var(--muted,#4f5c6d)}
.spl-link{display:inline-flex;align-items:center;gap:12px;margin-top:8px;padding-bottom:4px;color:var(--sv-navy);font-weight:600;text-decoration:none;border-bottom:2px solid var(--sv-navy);transition:gap .2s}
.spl-link:hover{gap:18px}
.spl-link:focus-visible{outline:3px solid #2f64c9;outline-offset:4px}

@media (max-width:900px){
  .spl{grid-template-columns:1fr;gap:0}
  .spl-visual{display:none}
  .spl-item{min-height:0;opacity:1;border-left:0;padding:0 0 56px;gap:12px}
  .spl-m{display:block;width:100%;aspect-ratio:16/10;overflow:hidden;border-radius:var(--r);margin-bottom:8px}
  .spl-m > *,.spl-m img{display:block;width:100%;height:100%;object-fit:cover}
}

/* ===================== reel ===================== */
.reel{
  position:relative;margin-top:24px;
  width:calc(100vw - var(--sbw));
  margin-left:calc(50% - 50vw + var(--sbw) / 2);
  height:calc(100vh + var(--d,0px));
}
.reel-pin{position:sticky;top:0;height:100vh;overflow:hidden;display:flex;flex-direction:column;justify-content:center;gap:28px;padding-top:var(--nav-h)}
.reel-track{display:flex;gap:28px;width:max-content;padding:0 max(24px,6vw);will-change:transform}
.reel-card{position:relative;display:block;flex:none;width:min(76vw,980px);height:min(62vh,620px);overflow:hidden;border-radius:var(--r);background:#fff;text-decoration:none;box-shadow:0 18px 44px rgba(20,40,75,.1);border:1px solid rgba(20,40,75,.06)}
.reel-media{position:absolute;inset:0}
.reel-media > *,.reel-media img{display:block;width:100%;height:100%;object-fit:cover;transition:transform 1.2s cubic-bezier(.2,.7,.2,1)}
.reel-card:hover .reel-media img{transform:scale(1.04)}
.reel-cap{position:absolute;left:0;bottom:0;width:min(540px,88%);display:grid;gap:12px;padding:28px 32px 30px;background:rgba(255,255,255,.96);color:var(--sv-navy);border-top:4px solid var(--service-accent)}
.reel-top{display:flex;align-items:center;gap:14px}
.reel-badge{flex:none;display:grid;place-items:center;width:48px;height:48px;border:1.5px solid var(--sv-navy);border-radius:var(--r)}
.reel-cap h3{margin:0;font-size:clamp(1.3rem,2vw,1.7rem);font-weight:600;line-height:1.15;color:var(--sv-navy)}
.reel-cap p{margin:0;font-size:1rem;line-height:1.65;color:var(--muted,#4f5c6d)}
.reel-more{display:inline-flex;align-items:center;gap:10px;font-weight:600;font-size:.98rem;transition:gap .2s}
.reel-card:hover .reel-more{gap:16px}
.reel-card:focus-visible{outline:3px solid #2f64c9;outline-offset:4px}
.reel-bar{margin:0 max(24px,6vw);height:3px;background:rgba(20,40,75,.16)}
.reel-bar i{display:block;height:100%;background:var(--sv-navy);transform-origin:left;transform:scaleX(0)}

@media (max-width:760px),(prefers-reduced-motion:reduce){
  .reel{width:auto;margin-left:0;height:auto}
  .reel-pin{position:static;height:auto;display:block;overflow:visible;padding-top:0}
  .reel-track{display:grid;gap:24px;width:auto;padding:0;transform:none!important}
  .reel-card{width:100%;height:440px}
  .reel-cap{width:92%;padding:22px 22px 24px}
  .reel-bar{display:none}
}

/* ===================== stack ===================== */
.stk-stack{
  display:block;margin-top:36px;
  width:calc(100vw - var(--sbw));
  margin-left:calc(50% - 50vw + var(--sbw) / 2);
}
.stk-card{
  position:sticky;top:0;display:grid;place-items:center;
  height:100vh;padding:var(--nav-h) 24px 32px;
  border-radius:var(--r);overflow:hidden;color:#fff;text-decoration:none;
  background:#fff;border:1px solid rgba(20,40,75,.08);box-shadow:0 18px 44px rgba(20,40,75,.08);isolation:isolate;
}
@supports (height:1svh){.stk-card{height:100svh}}
.stk-media{position:absolute;inset:0;z-index:0}
.stk-media > *,.stk-media img{display:block;width:100%;height:100%;object-fit:cover}
.stk-media img{transition:transform 1.4s cubic-bezier(.2,.7,.2,1)}
.stk-card:hover .stk-media img{transform:scale(1.03)}
.stk-shade{position:absolute;inset:0;z-index:1;pointer-events:none;background:linear-gradient(180deg,rgba(255,255,255,.18),rgba(255,255,255,.04) 42%,rgba(255,255,255,.12))}
.stk-dim{position:absolute;inset:0;z-index:4;pointer-events:none;background:rgba(255,255,255,.2);opacity:calc(var(--p,0) * .3)}
.stk-panel{position:relative;z-index:2;width:min(680px,100%);display:grid;gap:14px;justify-items:center;text-align:center;padding:44px 40px 36px;border-radius:var(--r);background:rgba(255,255,255,.9);-webkit-backdrop-filter:blur(12px) saturate(1.1);backdrop-filter:blur(12px) saturate(1.1);border:1px solid rgba(20,40,75,.08);box-shadow:0 20px 60px rgba(10,22,45,.08)}
.stk-badge{display:grid;place-items:center;width:64px;height:64px;border-radius:var(--r);background:#fff;border:1px solid rgba(20,40,75,.08);color:var(--sv-navy)}
.stk-panel h3{margin:6px 0 0;font-size:clamp(1.8rem,3.4vw,2.7rem);font-weight:600;line-height:1.12;letter-spacing:-.015em;color:var(--sv-navy)}
.stk-text{margin:0;max-width:52ch;font-size:clamp(1rem,1.4vw,1.12rem);line-height:1.7;color:var(--muted,#4f5c6d)}
.stk-more{display:inline-flex;align-items:center;gap:14px;margin-top:10px;padding:8px 8px 8px 26px;border-radius:var(--r);border:1.5px solid rgba(20,40,75,.2);font-weight:600;transition:background .2s;color:var(--sv-navy)}
.stk-go{display:grid;place-items:center;width:42px;height:42px;border-radius:var(--r);background:var(--sv-navy);color:#fff;transition:transform .2s}
.stk-card:hover .stk-more{background:rgba(20,40,75,.03)}
.stk-card:hover .stk-go{transform:translateX(3px)}
.stk-card:focus-visible{outline:3px solid #2f64c9;outline-offset:-6px}
@media (max-width:760px){
  .stk-card{padding:var(--nav-h) 16px 24px}
  .stk-panel{padding:30px 22px 26px;gap:12px}
  .stk-badge{width:54px;height:54px}
}

@media (prefers-reduced-motion:reduce){
  .spl-img,.spl-img img,.spl-item,.reel-media img,.stk-media img{transition:none!important}
  .spl-tag{animation:none}
}
`;