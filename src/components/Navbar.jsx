import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

// ==========================================================================
//  1. DATA
//  Phone number and the menu items.
// ==========================================================================

const SITE = { phone: '+91 98663 84827', tel: '+919866384827', whatsapp: '919866384827' };

// Services shown in the dropdown (ids match their detail routes)
const services = [
  { id: 'residential', title: 'Residential & Commercial' },
  { id: 'granite', title: 'Granite' },
  { id: 'solar', title: 'Solar panels' },
];

// ==========================================================================
//  2. ICONS
// ==========================================================================

const ICONS = {
  phone: 'M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z',
  menu: 'M3 6h18M3 12h18M3 18h18',
  close: 'M6 6l12 12M18 6L6 18',
  down: 'M6 9l6 6 6-6',
  check: 'M5 12.5l4.5 4.5L19 7.5',
};

function Icon({ name, size = 20, stroke = 1.8 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={ICONS[name] || ICONS.check} />
    </svg>
  );
}

// ==========================================================================
//  3. NAVBAR
// ==========================================================================

const links = [
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact us' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setOpen(false);
    setOpenDropdown('');
  }, [location.pathname, location.search, location.hash]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    return () => document.body.classList.remove('menu-open');
  }, [open]);

  const projectItems = [
    { to: '/projects?status=upcoming', label: 'Upcoming projects' },
    { to: '/projects?status=ongoing', label: 'Ongoing projects' },
    { to: '/projects?status=completed', label: 'Completed projects' },
  ];
  const serviceItems = services.map((service) => ({
    to: `/services/${service.id}`,
    label: service.title,
  }));

  const renderDropdown = (name, label, items, isActive = false) => (
    <div className={`nav-dropdown ${openDropdown === name ? 'expanded' : ''}`}>
      <button
        type="button"
        className={`nav-dropdown-trigger ${isActive ? 'active' : ''}`}
        aria-expanded={openDropdown === name}
        aria-controls={`${name}-menu`}
        onClick={() => setOpenDropdown(openDropdown === name ? '' : name)}
      >
        {label}<Icon name="down" size={15} stroke={2} />
      </button>
      <div id={`${name}-menu`} className="nav-dropdown-menu">
        {items.map((item) => (
          <Link key={item.to} to={item.to}>{item.label}</Link>
        ))}
      </div>
    </div>
  );

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <style>{CSS}</style>
      <div className="nav-in">
        <Link to="/" className="nav-logo" aria-label="HomeConnectz home">
          <img src="/logo.png" alt="HomeConnectz" />
        </Link>
        <nav className={`nav-links ${open ? 'open' : ''}`} aria-label="Main">
          {renderDropdown('projects', 'Projects', projectItems, location.pathname.startsWith('/projects'))}
          {renderDropdown('services', 'Services', serviceItems, location.pathname.startsWith('/services'))}
          {links.filter((link) => link.to !== '/services').map((l) => (
            <NavLink key={l.to} to={l.to} className={({ isActive }) => (isActive ? 'active' : '')}>{l.label}</NavLink>
          ))}
          <a className="btn btn-dark nav-call-mobile" href={`tel:${SITE.tel}`}>
            <Icon name="phone" size={18} /> {SITE.phone}
          </a>
        </nav>
        <a className="nav-call" href={`tel:${SITE.tel}`} aria-label={`Call ${SITE.phone}`}>
          <Icon name="phone" size={20} /> <span>{SITE.phone}</span>
        </a>
        <button className="nav-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle menu">
          <Icon name={open ? 'close' : 'menu'} size={24} />
        </button>
      </div>
    </header>
  );
}

// ==========================================================================
//  4. MOBILE BOTTOM BAR
//  Call / WhatsApp / Book a site visit (phones only).
// ==========================================================================

export function MobileBar() {
  return (
    <div className="mbar">
      <style>{CSS}</style>
      <a href={`tel:${SITE.tel}`}>Call</a>
      <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noreferrer" className="w">WhatsApp</a>
      <Link to="/contact" className="b">Book a site visit</Link>
    </div>
  );
}

// ==========================================================================
//  DESIGN. NAVBAR + MOBILE BAR DESIGN
//  All styling for this file lives here (injected with <style>).
// ==========================================================================
const CSS = `
.mbar{display:none}
@media (max-width:760px){
  .mbar{display:grid;grid-template-columns:1fr 1fr 1.6fr;position:fixed;left:0;right:0;bottom:0;z-index:70;background:#fff;border-top:1px solid var(--line);box-shadow:0 -6px 20px rgba(33,69,111,.1)}
  .mbar a{display:grid;place-items:center;height:56px;font-weight:600;font-size:.92rem;color:var(--navy)}
  .mbar .w{color:#1f9d55}
  .mbar .b{background:var(--navy);color:#fff}
}
.nav{position:fixed;top:var(--nav-top);left:0;right:0;z-index:60;pointer-events:none}
.nav-in{pointer-events:auto;position:relative;width:min(1320px,100% - 40px);margin-inline:auto;height:var(--nav-h);border-radius:999px;background:rgba(226,228,233,.93);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);box-shadow:0 12px 34px rgba(6,16,32,.2);display:grid;grid-template-columns:1fr auto 1fr;align-items:center;padding:0 9px 0 36px;transition:box-shadow .3s,background .3s}
.nav.scrolled .nav-in{background:rgba(226,228,233,.98);box-shadow:0 18px 44px rgba(6,16,32,.32)}
.nav-logo{justify-self:start;display:flex;align-items:center}
.nav-logo img{height:40px;width:auto}
.nav-links{display:flex;align-items:center;gap:40px;justify-self:center}
.nav-links>a:not(.btn),.nav-dropdown-trigger{position:relative;display:flex;align-items:center;gap:6px;font-size:1.02rem;font-weight:500;color:#1f3a5f;padding:8px 0;border:0;background:none;cursor:pointer;white-space:nowrap}
.nav-links>a:not(.btn)::after,.nav-dropdown-trigger::after{content:'';position:absolute;left:0;right:0;bottom:2px;height:2px;background:var(--tan);transform:scaleX(0);transform-origin:left;transition:transform .3s}
.nav-links>a:not(.btn):hover::after,.nav-links>a.active::after,.nav-dropdown-trigger:hover::after,.nav-dropdown-trigger.active::after{transform:scaleX(1)}
.nav-dropdown-trigger svg{transition:transform .25s}
.nav-dropdown.expanded .nav-dropdown-trigger svg,.nav-dropdown:hover .nav-dropdown-trigger svg{transform:rotate(180deg)}
.nav-dropdown{position:relative}
.nav-dropdown-menu{position:absolute;top:calc(100% + 24px);left:50%;z-index:5;display:grid;min-width:230px;padding:8px;border-radius:18px;background:rgba(255,255,255,.98);box-shadow:0 20px 44px rgba(6,16,32,.22);opacity:0;visibility:hidden;pointer-events:none;transform:translate(-50%,8px);transition:opacity .22s,transform .22s,visibility .22s}
.nav-dropdown-menu::before{content:'';position:absolute;left:0;right:0;top:-26px;height:26px}
.nav-dropdown:hover .nav-dropdown-menu,.nav-dropdown:focus-within .nav-dropdown-menu,.nav-dropdown.expanded .nav-dropdown-menu{opacity:1;visibility:visible;pointer-events:auto;transform:translate(-50%,0)}
.nav-dropdown-menu a{padding:12px 14px;border-radius:11px;color:var(--ink);font-size:.95rem;font-weight:500;white-space:nowrap;transition:background .2s}
.nav-dropdown-menu a:hover{background:rgba(33,69,111,.08);color:var(--navy)}
.nav-call{justify-self:end;display:inline-flex;align-items:center;gap:10px;height:48px;padding:0 30px;border-radius:999px;background:var(--navy);color:#fff;font-weight:700;font-size:1.02rem;white-space:nowrap;transition:background .2s}
.nav-call:hover{background:var(--deep)}
.nav-call-mobile,.nav-toggle{display:none}
@media (max-width:1100px){
  .nav-links{gap:28px}
  .nav-call{padding:0 22px}
}
@media (max-width:900px){
  .nav-in{grid-template-columns:1fr auto auto;gap:8px;padding:0 8px 0 20px;width:calc(100% - 24px)}
  .nav-logo img{height:32px}
  .nav-call{padding:0;width:42px;height:42px;justify-content:center}
  .nav-call span{display:none}
  .nav-toggle{display:grid;place-items:center;width:42px;height:42px;border-radius:50%;background:#fff;border:0;color:var(--navy);cursor:pointer}
  .nav-links{position:absolute;top:calc(100% + 10px);left:0;right:0;flex-direction:column;align-items:stretch;gap:0;padding:8px 22px 22px;background:rgba(255,255,255,.98);border-radius:26px;box-shadow:0 24px 50px rgba(6,16,32,.3);opacity:0;visibility:hidden;transform:translateY(-10px);transition:all .25s;max-height:calc(100svh - var(--nav-h) - 40px);overflow-y:auto}
  .nav-links.open{opacity:1;visibility:visible;transform:none}
  .nav-links>a:not(.btn),.nav-dropdown-trigger{width:100%;justify-content:space-between;padding:16px 0;font-size:1.08rem;border-bottom:1px solid var(--line)}
  .nav-links>a:not(.btn)::after,.nav-dropdown-trigger::after{display:none}
  .nav-dropdown{width:100%}
  .nav-dropdown-menu{position:static;min-width:0;padding:0 0 0 12px;border-radius:0;background:transparent;box-shadow:none;max-height:0;overflow:hidden;opacity:0;visibility:hidden;pointer-events:none;transform:none;transition:max-height .3s,opacity .22s,visibility .22s}
  .nav-dropdown-menu::before{display:none}
  .nav-dropdown:hover .nav-dropdown-menu,.nav-dropdown:focus-within .nav-dropdown-menu{opacity:0;visibility:hidden;max-height:0;pointer-events:none;transform:none}
  .nav-dropdown.expanded .nav-dropdown-menu{max-height:240px;opacity:1;visibility:visible;pointer-events:auto;transform:none}
  .nav-dropdown:hover .nav-dropdown-trigger svg{transform:none}
  .nav-dropdown.expanded .nav-dropdown-trigger svg{transform:rotate(180deg)}
  .nav-dropdown-menu a{padding:12px;font-size:1rem}
  .nav-call-mobile{display:inline-flex;margin-top:18px;height:50px}
}
`;
