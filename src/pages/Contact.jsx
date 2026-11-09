import { useState } from 'react';
import { Link } from 'react-router-dom';

// ==========================================================================
//  1. DATA
//  Contact details and the project names offered in the enquiry form.
// ==========================================================================

const SITE = {
  name: 'HomeConnectz',
  phone: '+91 98663 84827',
  tel: '+919866384827',
  whatsapp: '919866384827',
  email: 'sales@homeconnectz.com',
  hours: '9 AM and 8 PM, all days',
  addressLines: ['HomeConnectz', 'Ameerpet', 'Hyderabad, Telangana'],
  rera: 'TG-RERA Agent Regn. No. — applied for',
  // Text used to find the office on the map. Replace with your full street address for an exact pin.
  mapQuery: 'Ameerpet, Hyderabad, Telangana',
};

const PROJECT_NAMES = [
  "Sapphire Residences",
  "Srivari Meadows",
];

// ==========================================================================
//  2. ENQUIRY FORM
//  Name + phone + project, with consent. Hook up your backend where the TODO is.
// ==========================================================================

// mode 'visit' = Name + Phone + Project; mode 'brochure' = Name + Phone + Email
function EnquiryForm({ mode = 'visit', title, button, project = 'Srivari Meadows' }) {
  const brochure = mode === 'brochure';
  const [f, setF] = useState({ name: '', phone: '', email: '', project });
  const [ok, setOk] = useState(false);
  const [agree, setAgree] = useState(false);
  const set = (k) => (e) => { setF({ ...f, [k]: e.target.value }); setOk(false); };
  const phoneOk = f.phone.replace(/\D/g, '').length >= 10;
  const ready = agree && f.name.trim() && phoneOk && (!brochure || /^\S+@\S+\.\S+$/.test(f.email));

  const submit = (e) => {
    e.preventDefault();
    if (!ready) return;
    // TODO: send `f` to your backend / EmailJS / Formspree here
    setOk(true); setAgree(false);
    setF({ name: '', phone: '', email: '', project });
  };

  return (
    <form className="form" onSubmit={submit} noValidate>
      <h2 className="form-title">{title}</h2>
      {ok && <p className="ok" role="status">Thank you. We will contact you shortly.</p>}
      <input placeholder="Name" aria-label="Name" value={f.name} onChange={set('name')} autoComplete="name" />
      <input placeholder="Phone" aria-label="Phone" value={f.phone} onChange={set('phone')} inputMode="tel" autoComplete="tel" />
      {brochure ? (
        <input placeholder="Email" aria-label="Email" value={f.email} onChange={set('email')} inputMode="email" autoComplete="email" />
      ) : (
        <select aria-label="Project" value={f.project} onChange={set('project')}>
          {PROJECT_NAMES.map((n) => <option key={n}>{n}</option>)}
          <option>Not sure yet</option>
        </select>
      )}
      <label className="consent">
        <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
        <span>
          I agree to HomeConnectz contacting me by phone, WhatsApp, SMS and email to arrange my site visit and about this enquiry, and to my details being shared with the developer of the project I have enquired about. I understand this consent applies even if my number is registered on the DND / NCPR list. I have read the <Link to="/contact">Privacy Policy</Link>.
        </span>
      </label>
      <p className="fine">You can withdraw consent at any time by replying STOP on WhatsApp.</p>
      <button className="btn btn-dark btn-block" type="submit" disabled={!ready}>{button}</button>
    </form>
  );
}

// ==========================================================================
//  3. MAP VIEW
//  Interactive Google Map (zoom, drag, full screen) with Directions and Open in Maps.
//  No API key needed. Change SITE.mapQuery to move the pin.
// ==========================================================================

function MapView() {
  const q = encodeURIComponent(SITE.mapQuery);
  return (
    <div className="map-card">
      <iframe
        className="map-frame"
        title={`${SITE.name} location map`}
        src={`https://www.google.com/maps?q=${q}&z=15&output=embed`}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />
      <div className="map-actions">
        <a className="link" href={`https://www.google.com/maps/dir/?api=1&destination=${q}`} target="_blank" rel="noreferrer">Get directions &rarr;</a>
        <a className="link" href={`https://www.google.com/maps/search/?api=1&query=${q}`} target="_blank" rel="noreferrer">Open in Google Maps &rarr;</a>
      </div>
    </div>
  );
}

// ==========================================================================
//  4. PAGE
// ==========================================================================

export default function Contact() {
  return (
    <section className="section container page-top">
      <style>{CSS}</style>
      <div className="talk">
        <div className="talk-info">
          <h1>Talk to us</h1>
          <p className="muted">Call or WhatsApp between {SITE.hours}. Or leave your number and we’ll call you.</p>
          <a className="big-phone" href={`tel:${SITE.tel}`}>{SITE.phone}</a>
          <a className="link wa-link" href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noreferrer">WhatsApp us &rarr;</a>
          <address className="muted">{SITE.addressLines.map((l) => <span key={l}>{l}</span>)}</address>
          <p className="muted small">{SITE.rera}</p>
          <p className="muted small">Email: <a href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
        </div>
        <EnquiryForm title="Book a site visit" button="Book a site visit" />
      </div>
      <MapView />
    </section>
  );
}

// ==========================================================================
//  DESIGN. CONTACT PAGE DESIGN
//  All styling for this file lives here (injected with <style>).
// ==========================================================================
const CSS = `
.form{background:#fff;border-radius:24px;padding:28px;box-shadow:var(--shadow);display:grid;gap:16px}
.form label{display:grid;gap:6px;font-size:.9rem;font-weight:500}
.form input,.form select,.form textarea{border:1.5px solid var(--line);border-radius:12px;padding:12px 14px;background:var(--bg);resize:vertical}
.form input:focus,.form select:focus,.form textarea:focus{outline:none;border-color:var(--navy)}
.form small{color:#b3261e}
.ok{background:#e3f4e8;color:#1d6b3a;padding:12px 16px;border-radius:12px}
.talk{display:grid;grid-template-columns:1fr 1.05fr;gap:56px;align-items:start}
.talk-info{display:grid;gap:18px;justify-items:start;padding-top:8px}
.talk-info h1{font-size:clamp(3rem,7vw,5.2rem);font-weight:600;margin-bottom:12px}
.big-phone{font-family:var(--serif);font-size:clamp(2.2rem,4vw,3rem);font-weight:600;color:var(--navy);line-height:1}
.talk address{font-style:normal;display:grid;margin-top:8px}
.map-card{width:100%;display:grid;gap:14px;justify-items:center;margin:clamp(40px,6vw,72px) auto 0}
.map-frame{width:100%;height:clamp(300px,40vw,420px);border:0;border-radius:24px;box-shadow:var(--shadow);background:var(--bg)}
.map-actions{display:flex;flex-wrap:wrap;justify-content:center;gap:8px 28px}
.form-title{font-size:2rem;color:var(--navy)}
.consent{display:flex!important;grid-template-columns:none;gap:12px;align-items:flex-start;font-weight:400!important;font-size:.88rem!important;line-height:1.55;color:var(--ink)}
.consent input{width:20px;height:20px;flex:none;margin-top:3px;accent-color:var(--navy);padding:0}
.consent a{color:var(--navy);text-decoration:underline}
.fine{font-size:.82rem;color:var(--muted);margin-top:-6px}
@media (max-width:1024px){
  .talk{grid-template-columns:1fr}
}
`;