import { useState } from 'react';
import { Link } from 'react-router-dom';

// ==========================================================================
//  1. DATA
// ==========================================================================

const SITE = {
  name: 'HomeConnectz',
  phone: '+91 98663 84827',
  tel: '+919866384827',
  whatsapp: '919866384827',
  email: 'homeconnectzmarketing@gmail.com',
  hours: '10 AM and 7 PM, all days',
  addressLines: ['8-3-231/W/40/202, Road No 2', 'Sri Krishna Nagar, Yousufguda', 'Hyderabad, Telangana 500045'],
  rera: 'TG-RERA Agent Regn. No. — applied for',
  mapQuery: '8-3-231/W/40/202, Road No 2, Sri Krishna Nagar, Yousufguda, Hyderabad, Telangana 500045',
  mapUrl: 'https://maps.app.goo.gl/u31XSXiqQZ14N9pF6?g_st=acin',
};

const PROJECT_NAMES = ['Meridian Residences', 'Srivari Meadows'];

// ==========================================================================
//  2. ICONS
// ==========================================================================

const svg = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };

const Icon = {
  clock: (<svg {...svg} width="20" height="20"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>),
  phone: (<svg {...svg} width="20" height="20"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" /></svg>),
  whatsapp: (<svg {...svg} width="20" height="20"><path d="M3 21l1.65-4.9A8.5 8.5 0 1 1 8 19.4L3 21z" /><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.2-1.7-.9-.8.6a3.6 3.6 0 0 1-1.6-1.6l.6-.8-.9-1.7L9 9.5z" /></svg>),
  mail: (<svg {...svg} width="20" height="20"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3.5 7l8.5 6 8.5-6" /></svg>),
  nav: (<svg {...svg} width="16" height="16"><path d="M12 3l8 8-8 10-8-10 8-8z" /><circle cx="12" cy="11" r="2" /></svg>),
  arrow: (<svg {...svg} width="18" height="18" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>),
  check: (<svg {...svg} width="28" height="28" strokeWidth="2.2"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>),
};

// ==========================================================================
//  3. ENQUIRY FORM
//  mode 'visit' = Name + Phone + Project; mode 'brochure' = Name + Phone + Email
//  Hook up your backend where the TODO is.
// ==========================================================================

function EnquiryForm({ mode = 'visit', button, project = 'Srivari Meadows' }) {
  const brochure = mode === 'brochure';
  const empty = { name: '', phone: '', email: '', project };
  const [f, setF] = useState(empty);
  const [touched, setTouched] = useState({});
  const [agree, setAgree] = useState(false);
  const [done, setDone] = useState(false);

  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const blur = (k) => () => setTouched({ ...touched, [k]: true });

  const errors = {
    name: f.name.trim() ? '' : 'Enter your name.',
    phone: f.phone.replace(/\D/g, '').length >= 10 ? '' : 'Enter a 10-digit phone number.',
    email: !brochure || /^\S+@\S+\.\S+$/.test(f.email) ? '' : 'Enter a valid email address.',
  };
  const ready = agree && !errors.name && !errors.phone && !errors.email;
  const show = (k) => touched[k] && errors[k];

  const submit = (e) => {
    e.preventDefault();
    if (!ready) { setTouched({ name: true, phone: true, email: true }); return; }
    // TODO: send `f` to your backend / EmailJS / Formspree here
    setDone(true);
  };

  const reset = () => { setF(empty); setTouched({}); setAgree(false); setDone(false); };

  if (done) {
    return (
      <div className="ct-success" role="status">
        <span className="ct-success-icon">{Icon.check}</span>
        <h3>Thank you, we have your details</h3>
        <p>We will call you shortly to fix a time for your site visit. Need us sooner? Message us on WhatsApp.</p>
        <button type="button" className="ct-text-btn" onClick={reset}>Send another enquiry</button>
      </div>
    );
  }

  return (
    <form className="ct-form" onSubmit={submit} noValidate>
      <div className={`ct-field ${show('name') ? 'has-error' : ''}`}>
        <label htmlFor="ct-name">Your name</label>
        <input id="ct-name" placeholder="Full name" value={f.name} onChange={set('name')} onBlur={blur('name')} autoComplete="name" aria-invalid={!!show('name')} />
        {show('name') && <span className="ct-err">{errors.name}</span>}
      </div>

      <div className={`ct-field ${show('phone') ? 'has-error' : ''}`}>
        <label htmlFor="ct-phone">Phone number</label>
        <input id="ct-phone" placeholder="+91 00000 00000" value={f.phone} onChange={set('phone')} onBlur={blur('phone')} inputMode="tel" autoComplete="tel" aria-invalid={!!show('phone')} />
        {show('phone') && <span className="ct-err">{errors.phone}</span>}
      </div>

      {brochure ? (
        <div className={`ct-field ${show('email') ? 'has-error' : ''}`}>
          <label htmlFor="ct-email">Email</label>
          <input id="ct-email" placeholder="you@example.com" value={f.email} onChange={set('email')} onBlur={blur('email')} inputMode="email" autoComplete="email" aria-invalid={!!show('email')} />
          {show('email') && <span className="ct-err">{errors.email}</span>}
        </div>
      ) : (
        <div className="ct-field">
          <label htmlFor="ct-project">Project you are interested in</label>
          <select id="ct-project" value={f.project} onChange={set('project')}>
            {PROJECT_NAMES.map((n) => <option key={n}>{n}</option>)}
            <option>Not sure yet</option>
          </select>
        </div>
      )}

      <label className="ct-consent">
        <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
        <span>
          I agree to HomeConnectz contacting me by phone, WhatsApp, SMS and email to arrange my site visit and about this enquiry, and to my details being shared with the developer of the project I have enquired about. I understand this consent applies even if my number is registered on the DND / NCPR list. I have read the <Link to="/contact">Privacy Policy</Link>.
        </span>
      </label>

      <button className="ct-btn" type="submit" disabled={!ready}>{button} {Icon.arrow}</button>
      <p className="ct-fine">
        {agree ? 'You can withdraw consent at any time by replying STOP on WhatsApp.' : 'Tick the consent box to enable the button.'}
      </p>
    </form>
  );
}

// ==========================================================================
//  4. MAP VIEW
//  Interactive Google Map. No API key needed. Change SITE.mapQuery to move the pin.
// ==========================================================================

function MapView() {
  const q = encodeURIComponent(SITE.mapQuery);
  return (
    <div className="ct-map">
      <iframe
        className="ct-map-frame"
        title={`${SITE.name} location map`}
        src={`https://www.google.com/maps?q=${q}&z=15&output=embed`}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />
      <div className="ct-map-foot">
        <address>{SITE.addressLines.join(', ')}</address>
        <div className="ct-map-links">
          <a className="ct-link" href={`https://www.google.com/maps/dir/?api=1&destination=${q}`} target="_blank" rel="noreferrer">{Icon.nav} Get directions</a>
          <a className="ct-link" href={SITE.mapUrl} target="_blank" rel="noreferrer">Open in Google Maps</a>
        </div>
      </div>
    </div>
  );
}

// ==========================================================================
//  5. PAGE
//  One single frosted card on a warm beige background with a soft reflection.
// ==========================================================================

export default function Contact() {
  return (
    <section className="contact-page">
      <style>{CSS}</style>

      <div className="ct-card">
        <header className="ct-head">
          <h1>Talk to us</h1>
          <p>Call or WhatsApp between {SITE.hours}. Or leave your number and we’ll call you.</p>
        </header>

        <ul className="ct-rows">
          <li>
            <span className="ct-ico">{Icon.phone}</span>
            <div><span className="ct-label">Call</span><a href={`tel:${SITE.tel}`}>{SITE.phone}</a></div>
          </li>
          <li>
            <span className="ct-ico ct-ico-wa">{Icon.whatsapp}</span>
            <div><span className="ct-label">WhatsApp</span><a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noreferrer">Message us now</a></div>
          </li>
          <li>
            <span className="ct-ico">{Icon.mail}</span>
            <div><span className="ct-label">Email</span><a className="ct-break" href={`mailto:${SITE.email}`}>{SITE.email}</a></div>
          </li>
          <li>
            <span className="ct-ico">{Icon.clock}</span>
            <div><span className="ct-label">Open</span><span className="ct-text">All days, 10 AM to 7 PM</span></div>
          </li>
        </ul>

        <div className="ct-mapcell"><MapView /></div>

        <div className="ct-formcell">
          <h2>Book a site visit</h2>
          <p className="ct-sub">Leave your details and we will call you to fix a time that suits you.</p>
          <EnquiryForm button="Book a site visit" />
          <p className="ct-rera">{SITE.rera}</p>
        </div>
      </div>
    </section>
  );
}

// ==========================================================================
//  DESIGN
//  Uses your site tokens with fallbacks: --sans, --navy, --ink, --muted.
// ==========================================================================
const CSS = `
main:has(> .contact-page){
  background:var(--beige-glass-background);
}
main.pad-nav:has(> .contact-page){
  padding-top:calc(var(--nav-top) + var(--nav-h));
}
.contact-page{
  --c-navy:var(--navy,#14284b);
  --c-ink:var(--ink,#1c2430);
  --c-muted:var(--muted,#4f5c6d);
  --c-line:rgba(20,40,75,.14);
  --c-wa:#1d8f4f;
  --c-err:#b3261e;

  position:relative;overflow:hidden;isolation:isolate;
  padding:32px 24px;
  display:flex;align-items:center;justify-content:center;
}
.contact-page,.contact-page *{font-family:var(--sans),system-ui,sans-serif;box-sizing:border-box}
.contact-page input,.contact-page select,.contact-page button{font-family:inherit;font-size:inherit}

/* ---------- The single card ---------- */
.ct-card{
  width:100%;max-width:1100px;
  display:grid;
  grid-template-columns:minmax(0,1fr) minmax(0,1fr);
  grid-template-areas:"head form" "rows form" "map form";
  grid-template-rows:auto auto 1fr;
  column-gap:0;
  padding:44px;
  border-radius:32px;
  background:rgba(255,255,255,.72);
  -webkit-backdrop-filter:blur(20px) saturate(1.15);
  backdrop-filter:blur(20px) saturate(1.15);
  border:1px solid rgba(255,255,255,.8);
  box-shadow:0 30px 80px rgba(15,35,65,.22);
}
.ct-head{grid-area:head;padding-right:44px}
.ct-rows{grid-area:rows;padding-right:44px}
.ct-mapcell{grid-area:map;padding-right:44px}
.ct-formcell{grid-area:form;padding-left:44px;border-left:1px solid var(--c-line);min-width:0}

/* ---------- Left side ---------- */
.ct-head h1{margin:0;font-family:var(--serif,var(--sans)),serif;font-style:normal;font-weight:600;font-size:clamp(2rem,3.6vw,2.8rem);line-height:1.1;letter-spacing:-.015em;color:var(--c-navy)}
.ct-head p{margin:12px 0 0;max-width:46ch;color:var(--c-muted);font-size:1.02rem;line-height:1.65}

.ct-rows{list-style:none;margin:24px 0 22px;padding:0;display:grid;grid-template-columns:1fr 1fr;gap:14px}
.ct-rows li{display:flex;align-items:center;gap:12px;min-width:0}
.ct-rows li:nth-child(3){grid-column:1 / -1}
.ct-ico{flex:none;display:grid;place-items:center;width:44px;height:44px;border-radius:14px;background:rgba(20,40,75,.08);color:var(--c-navy)}
.ct-ico-wa{background:rgba(29,143,79,.12);color:var(--c-wa)}
.ct-rows div{display:grid;gap:1px;min-width:0}
.ct-label{font-size:.8rem;color:var(--c-muted)}
.ct-rows a,.ct-text{color:var(--c-navy);font-weight:600;font-size:.98rem;text-decoration:none}
.ct-rows a:hover{text-decoration:underline;text-underline-offset:3px}
.ct-break{overflow-wrap:anywhere}

.ct-map{display:grid;gap:12px;height:100%}
.ct-map-frame{width:100%;height:100%;min-height:210px;border:0;border-radius:20px;background:#e9eef3;box-shadow:0 0 0 1px var(--c-line)}
.ct-map-foot{display:grid;gap:8px}
.ct-map-foot address{font-style:normal;color:var(--c-muted);font-size:.9rem;line-height:1.5}
.ct-map-links{display:flex;flex-wrap:wrap;gap:8px 20px}
.ct-link{display:inline-flex;align-items:center;gap:7px;color:var(--c-navy);font-weight:600;font-size:.92rem;text-decoration:none}
.ct-link:hover{text-decoration:underline;text-underline-offset:3px}

/* ---------- Right side: form ---------- */
.ct-formcell h2{margin:0;font-family:var(--serif,var(--sans)),serif;font-weight:600;font-size:clamp(1.5rem,2.4vw,1.9rem);color:var(--c-navy);letter-spacing:-.01em}
.ct-sub{margin:8px 0 22px;color:var(--c-muted);line-height:1.55}
.ct-form{display:grid;gap:18px}
.ct-field{display:grid;gap:7px;min-width:0}
.ct-field label{font-size:.9rem;font-weight:600;color:var(--c-navy)}
.ct-field input,.ct-field select{width:100%;height:50px;padding:0 16px;border:1.5px solid var(--c-line);border-radius:14px;background:rgba(255,255,255,.85);color:var(--c-ink);transition:border-color .2s,box-shadow .2s,background .2s}
.ct-field select{appearance:none;-webkit-appearance:none;padding-right:44px;cursor:pointer;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2314284b' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 16px center}
.ct-field input::placeholder{color:#8a94a2}
.ct-field input:focus,.ct-field select:focus{outline:none;border-color:var(--c-navy);background:#fff;box-shadow:0 0 0 4px rgba(20,40,75,.12)}
.ct-field.has-error input{border-color:var(--c-err);background:#fff8f7}
.ct-err{color:var(--c-err);font-size:.84rem}

.ct-consent{display:flex;gap:12px;align-items:flex-start;font-size:.82rem;line-height:1.55;color:var(--c-muted);cursor:pointer}
.ct-consent input{width:20px;height:20px;flex:none;margin:2px 0 0;accent-color:var(--c-navy)}
.ct-consent a{color:var(--c-navy);text-decoration:underline}

.ct-btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;width:100%;height:54px;border:0;border-radius:16px;background:var(--c-navy);color:#fff;font-weight:600;font-size:1.02rem;cursor:pointer;transition:background .2s,transform .15s,opacity .2s}
.ct-btn:hover:not(:disabled){background:#0d1c38}
.ct-btn:active:not(:disabled){transform:scale(.99)}
.ct-btn:disabled{opacity:.45;cursor:not-allowed}
.ct-fine{margin:-6px 0 0;text-align:center;font-size:.82rem;color:var(--c-muted)}
.ct-rera{margin:18px 0 0;padding-top:16px;border-top:1px solid var(--c-line);font-size:.84rem;color:var(--c-muted);text-align:center;overflow-wrap:anywhere}

/* ---------- Success ---------- */
.ct-success{display:grid;justify-items:center;text-align:center;gap:12px;padding:32px 8px}
.ct-success h3{margin:0;font-size:1.4rem;color:var(--c-navy);font-weight:600}
.ct-success p{margin:0;max-width:40ch;color:var(--c-muted);line-height:1.6}
.ct-success-icon{display:grid;place-items:center;width:64px;height:64px;border-radius:50%;background:#e2f4e9;color:#1d8a4c}
.ct-text-btn{background:none;border:0;color:var(--c-navy);font-weight:600;text-decoration:underline;cursor:pointer;padding:6px}

/* ---------- Keyboard focus ---------- */
.contact-page a:focus-visible,.contact-page button:focus-visible,.ct-consent input:focus-visible{outline:3px solid #2f64c9;outline-offset:3px;border-radius:10px}

/* ---------- Responsive ---------- */
@media (max-width:980px){
  .contact-page{padding:24px 16px}
  .ct-card{
    grid-template-columns:1fr;
    grid-template-areas:"head" "rows" "form" "map";
    grid-template-rows:auto;
    padding:28px 22px;border-radius:26px;
  }
  .ct-head,.ct-rows,.ct-mapcell{padding-right:0}
  .ct-formcell{padding:26px 0 0;border-left:0;border-top:1px solid var(--c-line);margin-top:4px}
  .ct-mapcell{margin-top:28px}
  .ct-map-frame{height:280px}
}
@media (max-width:560px){
  .ct-card{padding:24px 16px}
  .ct-rows{grid-template-columns:1fr}
  .ct-rows li:nth-child(3){grid-column:auto}
  .ct-map-frame{height:240px}
}
@media (prefers-reduced-motion:reduce){
  .contact-page *{transition:none!important}
}
`;
