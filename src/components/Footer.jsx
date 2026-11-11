import { Link } from 'react-router-dom';
import Collaborations from './Collaborations.jsx';

// ==========================================================================
//  1. DATA
//  Footer links and contact details.
// ==========================================================================

const SITE = {
  name: 'HomeConnectz',
  phone: '+91 98663 84827',
  tel: '+919866384827',
  email: 'sales@homeconnectz.com',
  addressLines: ['HomeConnectz', 'Ameerpet', 'Hyderabad, Telangana'],
  rera: 'TG-RERA Agent Regn. No. — applied for',
};

const DISCLAIMER =
  'HomeConnectz is a marketing channel partner. We are not the promoter, developer or builder of any project shown on this site. We charge no brokerage to buyers; we are compensated by the developer. All project information, imagery, plans, specifications and prices are supplied by the respective developer and are indicative only, subject to change and to confirmation with the developer. Images may be artistic impressions. Nothing on this site constitutes an offer or a contract. Please verify all details and approvals on the TG-RERA portal before making any payment.';

const links = [
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact us' },
];

const services = [
  { id: 'granite', title: 'Granite' },
  { id: 'residential', title: 'Residential' },
  { id: 'solar', title: 'Solar panels' },
];

// Social media links. Replace each url with your real page address.
const socials = [
  { id: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/homeconnectz' },
  { id: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/homeconnectz' },
  { id: 'whatsapp', label: 'WhatsApp', url: `https://wa.me/${SITE.tel.replace('+', '')}` },
];

// ==========================================================================
//  2. ICONS
// ==========================================================================

const ICONS = {
  check: 'M5 12.5l4.5 4.5L19 7.5',
  instagram: 'M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM17.5 6.5h.01',
  facebook: 'M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v7h4v-7h3l1-4h-4V8z',
  whatsapp: 'M3 21l1.65-4.8A8.5 8.5 0 1 1 8 19.4L3 21zM9 10c0 3 2 5 5 5l1.2-1.2a.8.8 0 0 0 0-1.1l-1.1-.9a.8.8 0 0 0-1 0l-.5.5c-.9-.4-1.6-1.1-2-2l.5-.5a.8.8 0 0 0 0-1l-.9-1.1a.8.8 0 0 0-1.1 0L9 10z',
  linkedin: 'M4 9h4v11H4zM6 4a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM10 9h4v1.6A4 4 0 0 1 17.5 9c3 0 3.5 2 3.5 4.6V20h-4v-5.6c0-1.2 0-2.4-1.5-2.4S14 13 14 14.4V20h-4z',
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
//  3. FOOTER
// ==========================================================================

export default function Footer() {
  return (
    <>
    <Collaborations />
    <style>{CSS}</style>
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <img src="/logo.png" alt="HomeConnectz" className="footer-logo" />
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
                <Icon name={s.id} size={26} stroke={1.6} />
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
.footer{background:linear-gradient(115deg,#0a3a6a 0%,#062c52 100%);border-top:1px solid rgba(255,255,255,.18);padding-top:56px;color:#fff}
.footer-grid{display:grid;grid-template-columns:1.6fr 1fr 1fr 1.3fr;gap:36px}
.footer-logo{height:64px;width:auto;margin-bottom:0;filter:brightness(0) invert(1)}
.footer-brand{display:flex;flex-direction:column;align-items:flex-start;gap:34px}
.footer h4{font-family:var(--sans);font-size:1.3rem;font-weight:600;margin-bottom:12px;color:#fff}
.footer a,.footer span,.footer p{display:block;color:rgba(255,255,255,.9);font-size:.93rem;margin-bottom:8px}
.footer a:hover{color:#d8c3a6}
.socials{display:flex;align-items:center;gap:22px;margin:0}
.socials a{display:grid;place-items:center;width:auto;height:auto;margin:0;background:none;border-radius:0;color:#fff;transition:color .2s,transform .2s}
.socials a:hover{color:#d8c3a6;transform:translateY(-2px)}
.footer-bottom{margin-top:40px;padding:20px 0;border-top:1px solid rgba(255,255,255,.45);font-size:.85rem;color:rgba(255,255,255,.9);text-align:center}
.trust{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.trust>div{background:#fff;border-radius:20px;padding:26px 28px;box-shadow:var(--shadow);border-top:3px solid var(--tan)}
.trust p{margin-top:6px}
.footer .disclaimer{font-size:.78rem;color:rgba(255,255,255,.9);line-height:1.6;margin-top:36px;padding-top:24px;border-top:1px solid rgba(255,255,255,.45)}
@media (max-width:1024px){
  .footer-grid{grid-template-columns:1fr 1fr}
}
@media (max-width:760px){
  .trust{grid-template-columns:1fr}
  .footer-grid{grid-template-columns:1fr}
}
.eyebrow.gold{color:var(--gold)}
.nav{position:fixed;top:var(--nav-top);left:0;right:0;z-index:60;pointer-events:none}
`;