import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const IMAGE = '/images/praneeta/';

const GALLERY = [
  { src: 'villa-main.jpg', alt: 'Praneeta Singapore Town Phase-II villa exterior' },
  { src: 'villa-evening.jpg', alt: 'Villa exterior at dusk' },
  { src: 'interior-living.jpg', alt: 'Villa living room interior' },
  { src: 'villa-day.jpg', alt: 'Villa exterior in daylight' },
];

const PLANS = [
  { image: 'plan-ground.jpg', name: 'Ground floor', area: '953 sq ft' },
  { image: 'plan-first.jpg', name: 'First floor', area: '903 sq ft' },
  { image: 'plan-terrace.jpg', name: 'Terrace floor', area: '434 sq ft' },
];

const AMENITIES = [
  { image: 'amenity-hall.jpg', title: 'Banquet & multi-purpose hall', text: 'A well-appointed hall for events and community gatherings.' },
  { image: 'amenity-gym.jpg', title: 'Fitness & wellness center', text: 'Modern equipment and space for everyday workouts.' },
  { image: 'amenity-play.jpg', title: 'Kids play area', text: 'A colorful play space for children’s activities.' },
  { image: 'amenity-yoga.jpg', title: 'Yoga & meditation zone', text: 'A dedicated space for relaxation and wellness.' },
];

function Arrow() {
  return <span aria-hidden="true">→</span>;
}

function ProjectNav() {
  return (
    <nav className="pr-nav" aria-label="Project sections">
      <a href="#overview">Overview</a>
      <a href="#gallery">Gallery</a>
      <a href="#plans">Villa plans</a>
      <a href="#amenities">Amenities</a>
      <a href="#layout">Layout & location</a>
      <a href="#approvals">Approvals</a>
      <a href="#faq">FAQs</a>
    </nav>
  );
}

function Lightbox({ index, onClose, onChange }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') onChange((index + GALLERY.length - 1) % GALLERY.length);
      if (event.key === 'ArrowRight') onChange((index + 1) % GALLERY.length);
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [index, onChange, onClose]);

  const image = GALLERY[index];
  return (
    <div className="pr-lightbox" role="dialog" aria-modal="true" aria-label="Project image viewer" onClick={onClose}>
      <div className="pr-lightbox-bar">
        <span>{image.alt}</span>
        <button type="button" onClick={onClose} aria-label="Close image viewer">Close ×</button>
      </div>
      <button className="pr-lightbox-arrow prev" type="button" aria-label="Previous image"
        onClick={(event) => { event.stopPropagation(); onChange((index + GALLERY.length - 1) % GALLERY.length); }}>‹</button>
      <img src={IMAGE + image.src} alt={image.alt} onClick={(event) => event.stopPropagation()} />
      <button className="pr-lightbox-arrow next" type="button" aria-label="Next image"
        onClick={(event) => { event.stopPropagation(); onChange((index + 1) % GALLERY.length); }}>›</button>
    </div>
  );
}

function SectionHeading({ eyebrow, title, children }) {
  return (
    <header className="pr-heading">
      <p className="pr-eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {children}
    </header>
  );
}

export default function PraneetaSingaporeTown() {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  return (
    <section className="section container page-top praneeta">
      <style>{CSS}</style>

      <div className="pr-crumb">
        <Link to="/">Home</Link><span>/</span>
        <Link to="/projects?status=ongoing">Ongoing projects</Link><span>/</span>
        <b>Praneeta Singapore Town Phase-II</b>
      </div>

      <header className="pr-intro">
        <span className="pr-status"><i />Ongoing project</span>
        <p className="pr-eyebrow">Premium 4 BHK villas · Shankarpally</p>
        <h1>Praneeta Singapore Town <em>Phase-II</em></h1>
        <p className="pr-lead">Premium 4 BHK villas at Shankarpally, designed for families seeking comfort, elegance and long-term value.</p>
      </header>

      <div className="pr-hero">
        <button className="pr-hero-image" type="button" onClick={() => setLightboxIndex(0)} aria-label="Open villa image">
          <img src={IMAGE + GALLERY[0].src} alt={GALLERY[0].alt} fetchPriority="high" />
        </button>
        <div className="pr-hero-copy">
          <p className="pr-eyebrow">A gated villa community</p>
          <h2>Comfort, security and a premium lifestyle.</h2>
          <p>Praneeta Singapore Town Phase-II brings together spacious homes, greenery and community amenities in one of Hyderabad’s growing residential destinations.</p>
          <ul className="pr-checks">
            <li>35 exclusive 4 BHK villas</li>
            <li>150–190 sq yd plot sizes</li>
            <li>HMDA and TS RERA approved</li>
          </ul>
          <Link className="pr-button" to="/contact">Enquire about this project <Arrow /></Link>
        </div>
      </div>

      <div className="pr-facts" aria-label="Project facts">
        <div><strong>35</strong><span>Exclusive villas</span></div>
        <div><strong>2 acres 10 guntas</strong><span>Project area</span></div>
        <div><strong>150–190 sq yd</strong><span>Plot sizes</span></div>
        <div><strong>2,250–2,850 sq ft</strong><span>Built-up area</span></div>
      </div>

      <ProjectNav />

      <section className="pr-section" id="overview">
        <SectionHeading eyebrow="About Tricore Projects" title="Building premium living experiences in Shankarpally." />
        <div className="pr-overview">
          <p>At Praneeta Singapore Town Phase-II, a home is designed to offer more than living space—it brings together comfort, security, nature and a premium lifestyle. This gated community offers spacious 4 BHK villas in Shankarpally, one of Hyderabad’s fast-growing residential destinations.</p>
          <div className="pr-overview-points">
            <div><span>01</span><h3>Spacious villas</h3><p>Premium 4 BHK homes with generous indoor and outdoor space.</p></div>
            <div><span>02</span><h3>Thoughtful community</h3><p>Shared spaces for recreation, fitness and neighborhood events.</p></div>
            <div><span>03</span><h3>Shankarpally location</h3><p>A residential setting in the western Hyderabad growth corridor.</p></div>
          </div>
        </div>
      </section>

      <section className="pr-section" id="gallery">
        <SectionHeading eyebrow="Project gallery" title="A closer look at villa living.">
          <p>Exterior views and a sample interior from the supplied project images.</p>
        </SectionHeading>
        <div className="pr-gallery">
          {GALLERY.map((image, index) => (
            <button type="button" key={image.src} onClick={() => setLightboxIndex(index)} aria-label={`View ${image.alt}`}>
              <img src={IMAGE + image.src} alt={image.alt} loading="lazy" />
            </button>
          ))}
        </div>
      </section>

      <section className="pr-section" id="plans">
        <SectionHeading eyebrow="Villa plans" title="A 150 sq yd villa, floor by floor.">
          <p>Sample east-facing 4 BHK villa shown in the supplied plan. Total built-up area: 2,290 sq ft.</p>
        </SectionHeading>
        <div className="pr-plan-facts">
          <span><b>Plot area</b>150 sq yd</span>
          <span><b>Configuration</b>4 BHK luxury villa</span>
          <span><b>Total built-up</b>2,290 sq ft</span>
        </div>
        <div className="pr-plans">
          {PLANS.map((plan) => (
            <article className="pr-plan" key={plan.name}>
              <div className="pr-plan-image"><img src={IMAGE + plan.image} alt={`${plan.name} floor plan`} loading="lazy" /></div>
              <h3>{plan.name}</h3>
              <p>Slab area <strong>{plan.area}</strong></p>
            </article>
          ))}
        </div>
      </section>

      <section className="pr-section" id="amenities">
        <SectionHeading eyebrow="Community amenities" title="Spaces for everyday life and special moments.">
          <p>The supplied project imagery highlights shared spaces for community events, fitness, children and wellness.</p>
        </SectionHeading>
        <div className="pr-amenities">
          {AMENITIES.map((amenity) => (
            <article className="pr-amenity" key={amenity.title}>
              <img src={IMAGE + amenity.image} alt={amenity.title} loading="lazy" />
              <div><h3>{amenity.title}</h3><p>{amenity.text}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="pr-section" id="layout">
        <SectionHeading eyebrow="Project layout" title="A planned gated community in Shankarpally.">
          <p>The supplied layout shows numbered villas, social infrastructure and a park within the community.</p>
        </SectionHeading>
        <div className="pr-layout">
          <img src={IMAGE + 'layout.jpg'} alt="Praneeta Singapore Town Phase-II villa layout with numbered homes, social infrastructure and park" loading="lazy" />
        </div>
        <div className="pr-location">
          <div>
            <p className="pr-eyebrow">Location</p>
            <h3>Shankarpally, Hyderabad</h3>
            <p>Contact our team to confirm the exact site location and arrange a visit.</p>
            <a className="pr-text-link" href="https://www.google.com/maps/search/?api=1&query=Shankarpally%2C+Hyderabad" target="_blank" rel="noreferrer">Open Shankarpally in Maps <Arrow /></a>
          </div>
          <iframe title="Map of Shankarpally, Hyderabad" src="https://www.google.com/maps?q=Shankarpally%2C%20Hyderabad&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </section>

      <section className="pr-section" id="approvals">
        <SectionHeading eyebrow="Project approvals" title="Approval details shown in the supplied material." />
        <div className="pr-approvals">
          <article>
            <img src={IMAGE + 'hmda.jpg'} alt="HMDA logo" loading="lazy" />
            <h3>HMDA approval</h3>
            <p>002446/HMDA/00732/SWFL/SKP2/2025</p>
            <span>Dated 07/08/2025</span>
          </article>
          <article>
            <img src={IMAGE + 'ts-rera.jpg'} alt="Telangana RERA logo" loading="lazy" />
            <h3>TS RERA registration</h3>
            <p>Reg. No. P02400009800</p>
          </article>
        </div>
      </section>

      <section className="pr-section" id="faq">
        <SectionHeading eyebrow="Good to know" title="Questions, answered." />
        <div className="pr-faqs">
          <details><summary>What is the project status?</summary><p>Praneeta Singapore Town Phase-II is listed as an ongoing project. Contact us for the latest construction and availability updates.</p></details>
          <details><summary>How many villas are in the project?</summary><p>The supplied project information lists 35 exclusive 4 BHK villas across 2 acres 10 guntas.</p></details>
          <details><summary>What are the plot and built-up sizes?</summary><p>Plot sizes are listed as 150–190 sq yd and built-up areas as 2,250–2,850 sq ft. The sample 150 sq yd plan shows 2,290 sq ft total built-up area.</p></details>
          <details><summary>What approvals are listed?</summary><p>The supplied material lists HMDA approval reference 002446/HMDA/00732/SWFL/SKP2/2025 dated 07/08/2025 and TS RERA registration P02400009800. Please verify the latest records before booking.</p></details>
          <details><summary>Can I arrange a site visit?</summary><p>Yes. Contact our team and we can help coordinate a site visit and share the latest confirmed details.</p></details>
        </div>
      </section>

      <aside className="pr-cta">
        <div><p className="pr-eyebrow">Explore Praneeta Singapore Town Phase-II</p><h2>Ready to find your villa?</h2></div>
        <Link className="pr-button" to="/contact">Talk to our team <Arrow /></Link>
      </aside>

      <p className="pr-disclaimer">Project details and imagery are based on the material supplied. Confirm current pricing, availability, construction status, specifications and approvals directly with the developer before booking.</p>
      {lightboxIndex !== null && <Lightbox index={lightboxIndex} onChange={setLightboxIndex} onClose={() => setLightboxIndex(null)} />}
    </section>
  );
}

const CSS = `
.praneeta{--pr-ink:var(--navy,#21456f);--pr-mute:var(--muted,#5d6f84);--pr-gold:var(--gold,#d2b88f);--pr-line:rgba(33,69,111,.16);color:var(--pr-ink)}
.praneeta *{box-sizing:border-box}
.praneeta img{display:block;max-width:100%}
.pr-crumb{display:flex;flex-wrap:wrap;align-items:center;gap:9px;padding-top:clamp(36px,4vw,56px);margin-bottom:20px;color:var(--pr-mute);font-size:.9rem}
.pr-crumb a,.pr-crumb b{color:var(--pr-ink);font-weight:600}
.pr-intro{max-width:960px;margin:0 auto;padding:clamp(18px,3vw,34px) 0 clamp(30px,4vw,48px);text-align:center}
.pr-status{display:inline-flex;align-items:center;gap:9px;margin-bottom:20px;padding:8px 15px;border:1px solid var(--pr-line);border-radius:999px;background:rgba(255,255,255,.55);font-size:.85rem;font-weight:600}
.pr-status i{width:9px;height:9px;border-radius:50%;background:#c9a55a}
.pr-eyebrow{margin-bottom:10px;color:var(--pr-gold);font-size:.75rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase}
.pr-intro h1{font-size:clamp(2.7rem,6.6vw,5.6rem);font-weight:500;line-height:1.04;color:var(--pr-ink)}
.pr-intro h1 em{color:var(--pr-gold);font-style:italic}
.pr-lead{max-width:720px;margin:18px auto 0;color:var(--pr-mute);font-size:clamp(1rem,1.5vw,1.17rem);line-height:1.7}
.pr-hero{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(320px,.8fr);overflow:hidden;border:1px solid rgba(210,184,143,.55);border-radius:24px;background:rgba(255,255,255,.58);box-shadow:0 18px 48px rgba(33,69,111,.1)}
.pr-hero-image{display:block;width:100%;min-height:440px;padding:0;border:0;background:#eadfce;cursor:zoom-in}
.pr-hero-image img{width:100%;height:100%;min-height:440px;object-fit:cover}
.pr-hero-copy{display:flex;flex-direction:column;align-items:flex-start;justify-content:center;padding:clamp(28px,5vw,68px)}
.pr-hero-copy h2,.pr-heading h2,.pr-cta h2{color:var(--pr-ink);font-family:var(--serif);font-size:clamp(1.9rem,3.4vw,3rem);font-weight:500;line-height:1.12}
.pr-hero-copy>p:not(.pr-eyebrow),.pr-heading>p:not(.pr-eyebrow){margin-top:12px;color:var(--pr-mute);line-height:1.7}
.pr-checks{display:grid;gap:10px;margin:22px 0 26px;padding:0;list-style:none}
.pr-checks li{position:relative;padding-left:28px;color:var(--pr-ink);font-weight:600}
.pr-checks li::before{position:absolute;left:0;content:'✓';color:#b8953f}
.pr-button{display:inline-flex;align-items:center;gap:12px;padding:13px 20px;border-radius:999px;background:var(--pr-ink);color:#fff;font-weight:700;transition:transform .2s,background .2s}
.pr-button:hover{transform:translateY(-2px);background:#173655}
.pr-button span{font-size:1.25rem}
.pr-facts{display:grid;grid-template-columns:repeat(4,1fr);margin-top:28px;border-top:1px solid var(--pr-line);border-bottom:1px solid var(--pr-line)}
.pr-facts>div{display:grid;align-content:center;gap:7px;min-height:112px;padding:20px;border-left:1px solid var(--pr-line);text-align:center}
.pr-facts>div:first-child{border-left:0}
.pr-facts strong{font-family:var(--serif);font-size:clamp(1.2rem,2.1vw,1.8rem);font-weight:500;line-height:1.2}
.pr-facts span{color:var(--pr-mute);font-size:.85rem}
.pr-nav{position:sticky;top:82px;z-index:10;display:flex;gap:26px;overflow:auto;margin-top:18px;padding:14px 4px;border-bottom:1px solid var(--pr-line);background:rgba(246,241,231,.88);backdrop-filter:blur(12px);scrollbar-width:none}
.pr-nav::-webkit-scrollbar{display:none}
.pr-nav a{flex:none;color:var(--pr-mute);font-size:.9rem;font-weight:600}
.pr-nav a:hover{color:var(--pr-ink)}
.pr-section{display:grid;gap:28px;padding-top:clamp(58px,8vw,100px);scroll-margin-top:120px}
.pr-heading{max-width:800px}
.pr-heading>p:not(.pr-eyebrow){max-width:650px}
.pr-overview{display:grid;grid-template-columns:.8fr 1.2fr;gap:clamp(30px,6vw,90px);align-items:start}
.pr-overview>p{color:var(--pr-mute);font-size:1.08rem;line-height:1.85}
.pr-overview-points{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}
.pr-overview-points>div{padding-top:14px;border-top:1px solid var(--pr-line)}
.pr-overview-points span{color:var(--pr-gold);font-family:var(--serif);font-size:1.7rem}
.pr-overview-points h3,.pr-amenity h3,.pr-plan h3,.pr-location h3,.pr-approvals h3{margin:8px 0;color:var(--pr-ink);font-size:1.05rem}
.pr-overview-points p,.pr-amenity p,.pr-location p,.pr-approvals span{color:var(--pr-mute);font-size:.9rem;line-height:1.6}
.pr-gallery{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
.pr-gallery button{overflow:hidden;padding:0;border:1px solid rgba(210,184,143,.65);border-radius:18px;background:#eee;cursor:zoom-in}
.pr-gallery button:first-child{grid-column:span 2;grid-row:span 2}
.pr-gallery img{width:100%;height:100%;min-height:210px;aspect-ratio:1.4;object-fit:cover;transition:transform .6s}
.pr-gallery button:first-child img{aspect-ratio:1.5}
.pr-gallery button:hover img{transform:scale(1.035)}
.pr-plan-facts{display:flex;flex-wrap:wrap;gap:12px}
.pr-plan-facts span{display:grid;gap:3px;min-width:170px;padding:12px 16px;border:1px solid var(--pr-line);border-radius:12px;background:rgba(255,255,255,.45);color:var(--pr-ink)}
.pr-plan-facts b{color:var(--pr-mute);font-size:.72rem;letter-spacing:.08em;text-transform:uppercase}
.pr-plans{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}
.pr-plan{padding:18px;border:1px solid var(--pr-line);border-radius:18px;background:rgba(255,255,255,.54)}
.pr-plan-image{display:grid;place-items:center;min-height:320px;padding:14px;border-radius:12px;background:#fff}
.pr-plan-image img{width:100%;height:300px;object-fit:contain}
.pr-plan h3{text-transform:capitalize}
.pr-plan>p{display:flex;justify-content:space-between;gap:10px;padding-top:10px;border-top:1px solid var(--pr-line);color:var(--pr-mute);font-size:.85rem}
.pr-plan>p strong{color:var(--pr-ink)}
.pr-amenities{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px}
.pr-amenity{overflow:hidden;border:1px solid var(--pr-line);border-radius:18px;background:rgba(255,255,255,.65)}
.pr-amenity img{width:100%;height:190px;object-fit:cover}
.pr-amenity>div{padding:14px 16px 18px}
.pr-amenity h3{font-size:.98rem}
.pr-layout{overflow:hidden;border:1px solid var(--pr-line);border-radius:18px;background:#fff}
.pr-layout img{width:100%;max-height:680px;object-fit:contain}
.pr-location{display:grid;grid-template-columns:.8fr 1.2fr;gap:28px;align-items:center;margin-top:10px}
.pr-location>div{padding:24px}
.pr-location iframe{width:100%;height:320px;border:0;border-radius:18px}
.pr-text-link{display:inline-flex;align-items:center;gap:9px;margin-top:16px;color:var(--pr-ink);font-weight:700}
.pr-text-link span{font-size:1.2rem}
.pr-approvals{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px}
.pr-approvals article{display:grid;justify-items:center;align-content:start;min-height:220px;padding:24px;border:1px solid var(--pr-line);border-radius:18px;background:rgba(255,255,255,.56);text-align:center}
.pr-approvals img{width:min(240px,100%);height:105px;object-fit:contain;background:#fff}
.pr-approvals h3{margin-top:16px}
.pr-approvals p{color:var(--pr-ink);font-weight:600}
.pr-faqs{display:grid;grid-template-columns:1fr 1fr;gap:0 28px}
.pr-faqs details{padding:17px 0;border-bottom:1px solid var(--pr-line)}
.pr-faqs summary{color:var(--pr-ink);font-weight:700;cursor:pointer}
.pr-faqs details p{margin-top:10px;color:var(--pr-mute);line-height:1.65}
.pr-cta{display:flex;align-items:center;justify-content:space-between;gap:24px;margin-top:clamp(54px,8vw,90px);padding:clamp(24px,5vw,54px);border-radius:22px;background:#f5eee4}
.pr-cta .pr-eyebrow{color:#a98d65}
.pr-disclaimer{margin:24px 0 0;color:var(--pr-mute);font-size:.78rem;text-align:center}
.pr-lightbox{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;padding:80px;background:rgba(8,18,31,.96);color:#fff}
.pr-lightbox>img{max-width:100%;max-height:calc(100vh - 130px);object-fit:contain}
.pr-lightbox-bar{position:absolute;top:0;left:0;right:0;display:flex;justify-content:space-between;align-items:center;padding:16px 22px}
.pr-lightbox-bar button,.pr-lightbox-arrow{border:1px solid rgba(255,255,255,.45);border-radius:999px;background:rgba(255,255,255,.08);color:#fff;cursor:pointer}
.pr-lightbox-bar button{padding:8px 14px}
.pr-lightbox-arrow{position:absolute;top:50%;width:48px;height:48px;font-size:2rem;line-height:1}
.pr-lightbox-arrow.prev{left:18px}.pr-lightbox-arrow.next{right:18px}
@media(max-width:900px){
  .pr-hero{grid-template-columns:1fr}
  .pr-hero-image,.pr-hero-image img{min-height:340px;max-height:520px}
  .pr-overview{grid-template-columns:1fr}
  .pr-amenities{grid-template-columns:repeat(2,minmax(0,1fr))}
}
@media(max-width:640px){
  .pr-crumb{padding-top:28px;font-size:.82rem}
  .pr-intro{padding-top:14px}
  .pr-intro h1{font-size:clamp(2.35rem,11vw,3.4rem)}
  .pr-facts{grid-template-columns:repeat(2,1fr)}
  .pr-facts>div:nth-child(3){border-left:0;border-top:1px solid var(--pr-line)}
  .pr-facts>div:nth-child(4){border-top:1px solid var(--pr-line)}
  .pr-facts>div{min-height:94px;padding:13px 8px}
  .pr-nav{top:68px;gap:20px}
  .pr-overview-points{grid-template-columns:1fr}
  .pr-gallery{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
  .pr-gallery button:first-child{grid-column:span 2;grid-row:auto}
  .pr-gallery img,.pr-gallery button:first-child img{min-height:150px;aspect-ratio:1.25}
  .pr-plans{grid-template-columns:1fr}
  .pr-plan-image{min-height:280px}
  .pr-plan-image img{height:260px}
  .pr-amenities{gap:10px}
  .pr-amenity img{height:140px}
  .pr-amenity>div{padding:11px}
  .pr-amenity h3{font-size:.9rem}
  .pr-amenity p{font-size:.8rem}
  .pr-location{grid-template-columns:1fr}
  .pr-location>div{padding:8px 0}
  .pr-location iframe{height:280px}
  .pr-approvals,.pr-faqs{grid-template-columns:1fr}
  .pr-cta{align-items:flex-start;flex-direction:column}
  .pr-lightbox{padding:64px 14px}
  .pr-lightbox>img{max-height:calc(100vh - 120px)}
  .pr-lightbox-arrow{width:40px;height:40px}
  .pr-lightbox-arrow.prev{left:8px}.pr-lightbox-arrow.next{right:8px}
}
`;
