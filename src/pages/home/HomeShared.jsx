const ICONS = {
  phone: 'M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  up: 'M7 17L17 7M8 7h9v9',
  left: 'M15 6l-6 6 6 6',
  right: 'M9 6l6 6-6 6',
  check: 'M5 12.5l4.5 4.5L19 7.5',
  pin: 'M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  home: 'M3 11l9-8 9 8M5 10v10h14V10M10 20v-6h4v6',
  building: 'M5 21V4l8-1.5V21M13 8l6 1.5V21M3 21h18M8 8h2M8 12h2M8 16h2M16 13h1M16 16h1',
  ruler: 'M3 17L17 3l4 4L7 21zM8 12l2 2M11 9l2 2M14 6l2 2',
  layers: 'M12 3l9 5-9 5-9-5zM3 13l9 5 9-5',
  shield: 'M12 3l7 3v5c0 5-3 8.5-7 10-4-1.5-7-5-7-10V6zM9 12l2 2 4-4',
  sparkle: 'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z',
  sun: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2',
  bank: 'M3 9l9-5 9 5M5 9v9M9 9v9M15 9v9M19 9v9M3 20h18M3 9h18',
  carouselLeft: 'M19 12H5m7-7-7 7 7 7',
  carouselRight: 'M5 12h14m-7-7 7 7-7 7',
  bed: 'M3 18v-7m0 4h18v3M3 12h7V7H5a2 2 0 0 0-2 2m18 3v6M10 12V9a2 2 0 0 1 2-2h6a3 3 0 0 1 3 3v2',
  expand: 'M8 3H3v5m0-5 6 6m7-6h5v5m0-5-6 6M8 21H3v-5m0 5 6-6m7 6h5v-5m0 5-6-6',
  construction: 'M2 7h20v10H2zM2 10h20M6 7v3m4-3v3m4-3v3m4-3v3M5 17l-2 4m15-4 3 4',
  possession: 'M4 21V8l8-5 8 5v13M2 21h20M8 21v-6h8v6M8 10h.01M12 10h.01M16 10h.01',
  key: 'M8 15a4 4 0 1 1 3.9-5H21v3h-2v2h-3v-2h-4.1A4 4 0 0 1 8 15zM7 11.5h.01',
};

export function Icon({ name, size = 20, stroke = 1.8 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={ICONS[name] || ICONS.check} />
    </svg>
  );
}

// Image over a soft gradient, so a missing photo never leaves a blank hole
export function Img({ src, alt = '', className = '', fallback }) {
  const external = /^https?:/.test(src || '');
  return (
    <div className={`ph ${className}`}>
      {src && (
        <img src={src} alt={alt} loading="lazy" referrerPolicy="no-referrer" className={external ? 'vivid' : undefined}
          onError={(e) => {
            const el = e.currentTarget;
            if (fallback && !el.dataset.fb) { el.dataset.fb = '1'; el.classList.remove('vivid'); el.src = fallback; }
            else el.style.display = 'none';
          }} />
      )}
    </div>
  );
}

