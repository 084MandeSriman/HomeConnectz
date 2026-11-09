import { useEffect, useState } from 'react';

const LEAVE_AT = 2200; // start exit animation
const DONE_AT = 2900;  // call onDone

const R = 241;
const CIRC = 2 * Math.PI * R;

const css = `
.hc-loader {
  --hc-bg: #e3f0fa;
  --hc-navy: #1f4577;
  --hc-tan: #b89b7a;
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: grid;
  place-items: center;
  background: var(--hc-bg) url('/images/paper-bg.jpg') repeat;
  background-size: 800px 800px;
  transition: opacity .6s ease, visibility .6s ease;
}
.hc-loader.leave { opacity: 0; visibility: hidden; pointer-events: none; }

.hc-svg {
  width: clamp(260px, 56vmin, 460px);
  height: auto;
  overflow: visible;
  transition: transform .6s ease;
}
.hc-loader.leave .hc-svg { transform: scale(.95); }

.hc-track {
  fill: none;
  stroke: var(--hc-navy);
  stroke-width: 4;
  opacity: .12;
}
.hc-arc {
  fill: none;
  stroke: var(--hc-navy);
  stroke-width: 4;
  stroke-linecap: round;
  transform: rotate(-90deg);
  transform-origin: 245px 245px;
}

/* animation lives on the inner group so it never overrides the position */
.hc-house-anim {
  transform-box: fill-box;
  transform-origin: 50% 100%;
  animation: hc-pop .7s cubic-bezier(.2, .9, .3, 1.2) .15s both;
}
.hc-roof {
  animation: hc-roof .5s ease .7s both;
}
.hc-name {
  font-family: 'Source Sans 3', 'Segoe UI', 'Noto Sans', -apple-system, Roboto, Arial, sans-serif;
  font-weight: 700;
  font-size: 58px;
  fill: var(--hc-navy);
  animation: hc-fade .7s ease .5s both;
}

@keyframes hc-pop {
  from { opacity: 0; transform: translateY(14px) scale(.85); }
  to   { opacity: 1; transform: none; }
}
@keyframes hc-roof {
  from { opacity: 0; transform: translateY(-6px); }
  to   { opacity: 1; transform: none; }
}
@keyframes hc-fade {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: none; }
}

@media (prefers-reduced-motion: reduce) {
  .hc-house-anim, .hc-roof, .hc-name { animation: none; }
  .hc-loader, .hc-svg { transition: opacity .3s ease; }
}
`;

export default function Loader({ onDone }) {
  const [leaving, setLeaving] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const t1 = setTimeout(() => setLeaving(true), LEAVE_AT);
    const t2 = setTimeout(() => {
      document.body.style.overflow = '';
      onDone();
    }, DONE_AT);

    // smooth eased progress for the ring
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / (LEAVE_AT - 100), 1);
      setProgress(1 - Math.pow(1 - t, 3));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      cancelAnimationFrame(raf);
      document.body.style.overflow = '';
    };
  }, [onDone]);

  return (
    <div
      className={`hc-loader ${leaving ? 'leave' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Loading HomeConnectz"
    >
      <style>{css}</style>

      <svg className="hc-svg" viewBox="0 0 490 490" aria-hidden="true">
        {/* ring: faint track + animated progress arc */}
        <circle className="hc-track" cx="245" cy="245" r={R} />
        <circle
          className="hc-arc"
          cx="245"
          cy="245"
          r={R}
          strokeDasharray={CIRC}
          strokeDashoffset={CIRC * (1 - progress)}
        />

        {/* house icon: outer group = position, inner group = animation */}
        <g transform="translate(170 100)">
          <g className="hc-house-anim">
            <path className="hc-roof" fill="#b89b7a" d="M0 57 L75 0 L149 57 V74 L75 20 L0 74 Z" />
            <path fill="#1f4577" d="M0 74 L75 20 L149 74 V153 H100 V108 H49 V153 H0 Z" />
          </g>
        </g>

        {/* name */}
        <text
          className="hc-name"
          x="245"
          y="325"
          textAnchor="middle"
          textLength="395"
          lengthAdjust="spacingAndGlyphs"
        >
          HomeConnectz
        </text>
      </svg>
    </div>
  );
}