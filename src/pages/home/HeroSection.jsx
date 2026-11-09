import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { SITE, slides } from './homeData.js';
import { Icon } from './HomeShared.jsx';

const DURATION = 6500;

// Renders the title with the accent phrase in italic gold
function Title({ title, accent }) {
  const at = accent ? title.indexOf(accent) : -1;
  if (at < 0) return title;
  return (
    <>
      {title.slice(0, at)}<em>{accent}</em>{title.slice(at + accent.length)}
    </>
  );
}

export default function HeroSection() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const touch = useRef(0);
  const go = (n) => setI((n + slides.length) % slides.length);

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setTimeout(() => setI((x) => (x + 1) % slides.length), DURATION);
    return () => clearTimeout(t);
  }, [paused, i]);

  const s = slides[i];
  return (
    <section className="hero" aria-roledescription="carousel" aria-label="Featured"
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
      onTouchEnd={(e) => { const d = e.changedTouches[0].clientX - touch.current; if (Math.abs(d) > 50) go(i + (d < 0 ? 1 : -1)); }}>
      <div className="hero-bg" aria-hidden="true">
        {slides.map((x, n) => (
          <div key={n} className={`hero-slide ${n === i ? 'on' : ''}`}>
            <img src={x.img} alt="" loading={n === 0 ? 'eager' : 'lazy'} referrerPolicy="no-referrer"
              onError={(e) => {
                const el = e.currentTarget;
                if (x.fallback && !el.dataset.fb) { el.dataset.fb = '1'; el.src = x.fallback; }
                else el.style.display = 'none';
              }} />
          </div>
        ))}
        <div className="hero-shade" />
        <div className="hero-grain" />
      </div>

      <div className="hero-frame" aria-hidden="true" />

      <div className="container hero-in">
        <div className="hero-copy" key={i} aria-live="polite">
          <p className="hero-eyebrow"><span />{s.eyebrow}</p>
          <h1><Title title={s.title} accent={s.accent} /></h1>
          <p className="hero-text">{s.text}</p>
          <div className="hero-cta">
            <Link to="/projects" className="btn btn-gold">Explore projects <Icon name="arrow" size={18} /></Link>
            <Link to="/contact" className="btn btn-outline-light">Book a free visit</Link>
          </div>
        </div>

        <aside className="hero-side" aria-label="Quick facts">
          <div className="hero-count" aria-hidden="true"><b>0{i + 1}</b><i /><span>0{slides.length}</span></div>
          <div><strong>0%</strong><span>Brokerage for buyers</span></div>
          <div><strong>3</strong><span>Project stages, one team</span></div>
          <div><strong>100%</strong><span>Verified developers</span></div>
          <a href={`tel:${SITE.tel}`}><Icon name="phone" size={16} /> {SITE.phone}</a>
        </aside>
      </div>

      <ul className="hero-trust" aria-label="Why HomeConnectz">
        <li><Icon name="shield" size={18} /> RERA-verified projects</li>
        <li><Icon name="bank" size={18} /> Home loan support</li>
        <li><Icon name="key" size={18} /> Guided site visits</li>
        <li><Icon name="check" size={18} /> No brokerage, ever</li>
      </ul>

      <a href="#projects" className="hero-scroll" aria-label="Scroll to projects"><span /><em>Scroll</em></a>

      <div className="hero-bar">
        <div className="container hero-bar-in">
          <div className="hero-tabs" role="tablist" aria-label="Slides">
            {slides.map((x, n) => (
              <button key={n} role="tab" aria-selected={n === i} className={n === i ? 'on' : ''} onClick={() => setI(n)}>
                <b>0{n + 1}</b><span>{x.label}</span>
                <i style={{ animationDuration: `${DURATION}ms`, animationPlayState: paused ? 'paused' : 'running' }} />
              </button>
            ))}
          </div>
          <div className="hero-arrows">
            <button onClick={() => go(i - 1)} aria-label="Previous slide"><Icon name="left" size={20} /></button>
            <button onClick={() => go(i + 1)} aria-label="Next slide"><Icon name="right" size={20} /></button>
          </div>
        </div>
      </div>
    </section>
  );
}

