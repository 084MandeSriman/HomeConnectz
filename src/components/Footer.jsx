import { Link, useLocation } from 'react-router-dom';
import Collaborations from './Collaborations.jsx';

// ==========================================================================
//  1. DATA
//  Footer links and contact details.
// ==========================================================================

const SITE = {
  name: 'HomeConnectz',
  phone: '+91 98663 84827',
  tel: '+919866384827',
  email: 'homeconnectzmarketing@gmail.com',
  addressLines: ['HomeConnectz', '8-3-231/W/40/202, Road No 2', 'Sri Krishna Nagar, Yousufguda', 'Hyderabad, Telangana 500045'],
  rera: 'TG-RERA Agent Regn. No. — applied for',
};

const DISCLAIMER = (
  <>
    HomeConnectz is a marketing channel partner. We are not the promoter, developer or builder of any project shown on this site. We charge no brokerage to buyers; we are compensated by the developer. All project information, imagery, plans, specifications and prices are supplied by the respective developer and are indicative only, subject to change and to confirmation with the developer. Images may be artistic impressions. Nothing on this site constitutes an offer or a contract. Please verify all details and approvals on the{' '}
    <a href="https://rera.telangana.gov.in/" target="_blank" rel="noopener noreferrer">TG-RERA portal</a>
    {' '}before making any payment.
  </>
);

const links = [
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact us' },
];

const services = [
  { id: 'residential', title: 'Residential and Commercial Sales' },
  { id: 'granite', title: 'Granite' },
  { id: 'solar', title: 'Solar' },
];

// Social media links. Replace each url with your real page address.
const socials = [
  { id: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/homeconnectz' },
  { id: 'whatsapp', label: 'WhatsApp', url: `https://wa.me/${SITE.tel.replace('+', '')}` },
];

// ==========================================================================
//  2. ICONS
// ==========================================================================

const ICONS = {
  instagram: 'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm5.5-3.75a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5z',
  whatsapp: 'M2 22l1.4-5.2A10 10 0 1 1 7.2 20.6L2 22zm6.4-15.1c-1 0-1.9 1-1.9 2.4 0 2.9 4.4 7.4 7.7 7.4 1.5 0 2.8-.9 2.8-2 0-.3-.1-.5-.4-.7l-2.2-1.1c-.3-.1-.5-.1-.7.2l-.9 1c-1.6-.6-2.9-1.8-3.6-3.3l.8-.9c.2-.3.2-.5.1-.8l-.9-1.9c-.1-.2-.4-.3-.8-.3z',
};

function Icon({ name }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={ICONS[name]} fillRule="evenodd" />
    </svg>
  );
}

// ==========================================================================
//  3. FOOTER
// ==========================================================================

export default function Footer() {
  const { pathname } = useLocation();

  return (
    <>
    {pathname === '/' && <Collaborations />}
    <style>{CSS}</style>
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <img src="/logo-footer.png" alt="HomeConnectz" className="footer-logo" />
          <div className="socials">
            {socials.map((s) => (
              <a
                key={s.id}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`HomeConnectz on ${s.label}`}
                title={s.label}
              >
                <Icon name={s.id} />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4>Quick links</h4>
          <Link to="/">Home</Link>
          <Link to="/projects">Projects</Link>
          {links.map((l) => <Link key={l.to} to={l.to}>{l.label}</Link>)}
        </div>
        <div>
          <h4>Services</h4>
          {services.map((s) => <Link key={s.id} to={`/services/${s.id}`}>{s.title}</Link>)}
        </div>
        <div>
          <h4>Contact</h4>
          <a href={`tel:${SITE.tel}`}>{SITE.phone}</a>
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          <span>{SITE.addressLines.slice(1).join(', ')}</span>
          <span>{SITE.rera}</span>
        </div>
      </div>
      <div className="container"><p className="disclaimer">{DISCLAIMER}</p></div>
      <div className="container footer-bottom">&copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.</div>
    </footer>
    </>
  );
}

// ==========================================================================
//  DESIGN. FOOTER
//  All styling for this file lives here (injected with <style>).
// ==========================================================================
const CSS = `
.footer{--footer-accent:#b8a289;background:var(--footer-background);border-top:1px solid rgba(255,255,255,.18);padding-top:56px;color:#fff}
.footer-grid{display:grid;grid-template-columns:1.6fr 1fr 1fr 1.3fr;gap:36px}
.footer-logo{width:min(320px,100%);height:auto;margin-bottom:0}
.footer-brand{display:flex;flex-direction:column;align-items:flex-start;gap:34px}
.footer h4{font-family:var(--sans);font-size:18px;font-weight:600;margin-bottom:12px;color:#fff}
.footer a,.footer span,.footer p{display:block;color:rgba(255,255,255,.9);font-size:14px;font-weight:400;margin-bottom:8px}
.footer a:hover,.footer a:focus-visible{color:var(--footer-accent)}
.footer .socials{display:flex;align-items:center;gap:10px;margin:0}
.footer .socials a{display:grid;place-items:center;width:50px;height:50px;margin:0;border:1px solid rgba(255,255,255,.22);border-radius:50%;color:#fff;transition:color .2s,border-color .2s}
.footer .socials a:hover,.footer .socials a:focus-visible{color:var(--footer-accent);border-color:currentColor}
.footer-bottom{margin-top:40px;padding:20px 0;border-top:1px solid rgba(255,255,255,.45);font-size:12px;font-weight:400;color:rgba(255,255,255,.9);text-align:center}
.trust{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.trust>div{background:#fff;border-radius:20px;padding:26px 28px;box-shadow:var(--shadow);border-top:3px solid var(--accent)}
.trust p{margin-top:6px}
.footer .disclaimer{font-size:14px;font-weight:400;color:rgba(255,255,255,.9);line-height:1.6;margin-top:36px;padding-top:24px;border-top:1px solid rgba(255,255,255,.45)}
.footer .disclaimer a{display:inline;margin:0;font:inherit;text-decoration:underline;text-underline-offset:2px}
@media (max-width:1024px){
  .footer-grid{grid-template-columns:1fr 1fr}
}
@media (max-width:760px){
  .trust{grid-template-columns:1fr}
  .footer-grid{grid-template-columns:1fr}
}
.eyebrow.on-dark{color:var(--accent-light)}
.nav{position:fixed;top:var(--nav-top);left:0;right:0;z-index:60;pointer-events:none}
`;
