import { Link } from 'react-router-dom';

const PROJECT = {
  name: 'Sapphire Residences',
  status: 'Upcoming',
  location: 'Near ORR Exit 2, Hyderabad',
  image: '/images/sapphire-residences.png',
  size: '1,900–2,750 sq ft',
  floors: 'G+11 floors',
  highlights: [
    'Spacious homes from 1,900 sq ft to 2,750 sq ft',
    '8 apartments per floor',
    '100 ft radial road access',
    'Opposite Acumen International School',
    'Floor-rise charges; East-facing and corner-flat charges extra',
  ],
  amenities: [
    'Grand entrance lobby',
    'Exclusive clubhouse',
    '3 high-speed lifts',
    '100% power backup',
    'Landscaped gardens',
    'Walking and jogging track',
    'Kids’ play area',
    'Fully equipped gym',
    'Indoor games zone',
  ],
  connectivity: [
    ['ORR — Exit 2', '5 minutes'],
    ['Nagulapalli Railway Station (New Junction)', '2 minutes'],
    ['Neopolis', '10 minutes'],
    ['Financial District', '15 minutes'],
    ['Acumen International School', 'Opposite the project'],
    ['Aparna 17 Degrees North Club', 'Nearby'],
    ['International schools', '10+ in the surrounding area'],
  ],
  faqs: [
    ['Is this an upcoming project?', 'Yes. Sapphire Residences is listed as an upcoming project. Contact us for the latest launch and availability updates.'],
    ['What home sizes are shown?', 'The shared project information lists spacious homes from 1,900 sq ft to 2,750 sq ft.'],
    ['How many homes are on each floor?', 'The project information lists 8 flats per floor.'],
    ['Are there additional charges?', 'Floor-rise charges apply. East-facing and corner flats have extra charges. Please confirm the current charges with the developer.'],
    ['Where is the project?', 'The supplied information places the project near ORR Exit 2 and Nagulapalli Railway Station (New Junction). Ask us to confirm the exact site address before visiting.'],
    ['Where can I get the price, possession and approval details?', 'These details were not included in the supplied project information. Contact us and we will share updates once confirmed by the developer.'],
  ],
};

function Arrow({ diagonal = false }) {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {diagonal ? <path d="M7 17 17 7M8 7h9v9" /> : <path d="M5 12h14m-6-6 6 6-6 6" />}
    </svg>
  );
}

function Photo({ className = '', alt = '' }) {
  return <img className={className} src={PROJECT.image} alt={alt} loading={className.includes('sr-hero-image') ? 'eager' : 'lazy'} />;
}

export default function SapphireResidences() {
  const mapQuery = encodeURIComponent('Nagulapalli Railway Station, Telangana');

  return (
    <div className="sr-page">
      <style>{CSS}</style>
      <section className="sr-hero">
        <Photo className="sr-hero-image" alt="" />
        <div className="sr-hero-shade" />
        <div className="sr-container sr-hero-content">
          <div className="sr-crumb"><Link to="/">Home</Link><span>/</span><Link to="/projects?status=upcoming">Upcoming projects</Link><span>/</span><b>{PROJECT.name}</b></div>
          <span className="sr-status"><i />{PROJECT.status} project</span>
          <p className="sr-eyebrow">Luxury apartments · Hyderabad</p>
          <h1>{PROJECT.name}</h1>
          <p className="sr-intro">Contemporary G+11 floor apartments with a clubhouse, landscaped gardens and convenient access to key destinations.</p>
          <div className="sr-actions">
            <Link className="sr-button sr-button-gold" to="/contact">Enquire about this project <Arrow /></Link>
            <a className="sr-button sr-button-outline" href="#overview">Explore the project <Arrow diagonal /></a>
          </div>
        </div>
        <div className="sr-container sr-hero-facts">
          <div><span>Project status</span><strong>{PROJECT.status}</strong></div>
          <div><span>Building</span><strong>{PROJECT.floors}</strong></div>
          <div><span>Home sizes</span><strong>{PROJECT.size}</strong></div>
          <div><span>Location</span><strong>Hyderabad</strong></div>
        </div>
      </section>

      <nav className="sr-nav" aria-label="Sapphire Residences sections">
        <div className="sr-container">
          <a href="#overview">Overview</a><a href="#amenities">Amenities</a><a href="#highlights">Highlights</a>
          <a href="#connectivity">Connectivity</a><a href="#faq">FAQs</a>
        </div>
      </nav>

      <section className="sr-section sr-overview" id="overview">
        <div className="sr-container">
          <header className="sr-heading">
            <p className="sr-eyebrow">A new address to look forward to</p>
            <h2>Modern homes, <em>thoughtfully connected.</em></h2>
            <p>Sapphire Residences brings spacious apartment living together with everyday amenities and access to Hyderabad’s key destinations.</p>
          </header>
          <div className="sr-overview-grid">
            <div className="sr-overview-copy">
              <span className="sr-count">G+11</span>
              <h3>Room for the life you’re building.</h3>
              <p>Choose from homes ranging from 1,900 sq ft to 2,750 sq ft, in a residential community planned with just 8 flats per floor.</p>
              <Link className="sr-text-link" to="/contact">Ask for launch details <Arrow /></Link>
            </div>
            <div className="sr-overview-image"><Photo alt="Sapphire Residences apartment building rendering" /><span>Project rendering supplied with the project information</span></div>
          </div>
        </div>
      </section>

      <section className="sr-section sr-amenities" id="amenities">
        <div className="sr-container">
          <header className="sr-heading sr-heading-light">
            <p className="sr-eyebrow">Designed for everyday life</p>
            <h2>Comfort and community, <em>all in one place.</em></h2>
            <p>Enjoy spaces to unwind, stay active and spend time together.</p>
          </header>
          <ul className="sr-amenity-grid">
            {PROJECT.amenities.map((amenity, index) => (
              <li key={amenity}><span>{String(index + 1).padStart(2, '0')}</span><b>{amenity}</b></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sr-section sr-highlights" id="highlights">
        <div className="sr-container sr-split">
          <div>
            <p className="sr-eyebrow">Project highlights</p>
            <h2>More room.<br /><em>More within reach.</em></h2>
            <ul className="sr-check-list">{PROJECT.highlights.map((item) => <li key={item}><span>✓</span>{item}</li>)}</ul>
          </div>
          <div className="sr-connectivity-card">
            <p className="sr-eyebrow">Excellent connectivity</p>
            <h3>Close to the places that matter.</h3>
            <ul>{PROJECT.connectivity.slice(0, 4).map(([place, time]) => <li key={place}><span>{place}</span><b>{time}</b></li>)}</ul>
            <p className="sr-charge-note"><span>▦</span> Floor-rise, East-facing and corner-flat charges extra.</p>
          </div>
        </div>
      </section>

      <section className="sr-section sr-connectivity" id="connectivity">
        <div className="sr-container">
          <header className="sr-heading">
            <p className="sr-eyebrow">Around the neighbourhood</p>
            <h2>Hyderabad, within easy reach.</h2>
            <p>Travel times below are as supplied and should be confirmed for your route and time of travel.</p>
          </header>
          <div className="sr-location-grid">
            <div className="sr-map"><iframe title="Map near Nagulapalli Railway Station" src={`https://www.google.com/maps?q=${mapQuery}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
            <div className="sr-place-list">
              {PROJECT.connectivity.map(([place, time]) => <div key={place}><span>{place}</span><b>{time}</b></div>)}
              <a className="sr-text-link" href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`} target="_blank" rel="noreferrer">Open location in Maps <Arrow diagonal /></a>
            </div>
          </div>
        </div>
      </section>

      <section className="sr-section sr-faq" id="faq">
        <div className="sr-container sr-faq-grid">
          <div><p className="sr-eyebrow">Good to know</p><h2>Questions, answered.</h2><p>Get in touch for updates on availability and details confirmed by the developer.</p><Link className="sr-text-link" to="/contact">Talk to our team <Arrow /></Link></div>
          <div>{PROJECT.faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
        </div>
      </section>

      <section className="sr-visit">
        <div className="sr-container sr-visit-content">
          <div><p className="sr-eyebrow">Register your interest</p><h2>Be among the first to know.</h2><p>Ask us for the latest launch updates and project information.</p></div>
          <div className="sr-visit-actions"><Link className="sr-button sr-button-gold" to="/contact">Enquire now <Arrow /></Link><a href="tel:+919866384827">Call +91 98663 84827</a></div>
          <p className="sr-disclaimer">Project information shown is based on the material supplied. Prices, approvals, possession dates and availability were not provided; confirm all details with the developer before booking.</p>
        </div>
      </section>
    </div>
  );
}

const CSS = `
.sr-page{--sr-navy:#21456f;--sr-deep:#071322;--sr-gold:#d2a24c;--sr-ink:#1b2b40;--sr-muted:#5d6f84;color:var(--sr-ink)}
.sr-container{width:min(1200px,100% - 40px);margin-inline:auto}
.sr-hero{position:relative;min-height:700px;display:flex;flex-direction:column;justify-content:center;isolation:isolate;overflow:hidden;background:var(--sr-deep);color:#fff}
.sr-hero-image,.sr-hero-shade{position:absolute;inset:0;width:100%;height:100%}
.sr-hero-image{z-index:-2;object-fit:cover;object-position:center 42%}
.sr-hero-shade{z-index:-1;background:linear-gradient(90deg,rgba(4,13,25,.92),rgba(4,13,25,.65) 48%,rgba(4,13,25,.18)),linear-gradient(0deg,rgba(4,13,25,.75),transparent 55%)}
.sr-hero-content{padding-top:120px;padding-bottom:160px}
.sr-crumb{display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin-bottom:50px;color:rgba(255,255,255,.7);font-size:.83rem}
.sr-crumb a:hover{color:var(--sr-gold)}
.sr-status{display:inline-flex;align-items:center;gap:8px;padding:7px 13px;border:1px solid rgba(255,255,255,.4);border-radius:99px;background:rgba(255,255,255,.1);font-size:.78rem}
.sr-status i{width:7px;height:7px;border-radius:50%;background:#dfad56}
.sr-eyebrow{text-transform:uppercase;letter-spacing:.18em;color:#d19a43;font-size:.73rem;font-weight:700}
.sr-hero .sr-eyebrow{margin-top:24px;color:#edbd6b}
.sr-hero h1{color:#fff;font-size:clamp(3rem,8vw,6.4rem);line-height:.98;letter-spacing:-.03em;margin:12px 0 18px}
.sr-intro{max-width:570px;color:rgba(255,255,255,.82);font-size:clamp(1.05rem,2vw,1.25rem)}
.sr-actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:30px}
.sr-button{display:inline-flex;align-items:center;justify-content:center;gap:10px;padding:13px 20px;border:1px solid transparent;border-radius:999px;font-weight:700;font-size:.91rem;transition:transform .2s,background .2s}
.sr-button:hover{transform:translateY(-2px)}
.sr-button-gold{background:var(--sr-gold);color:#101c2a}
.sr-button-gold:hover{background:#fff}
.sr-button-outline{color:#fff;border-color:rgba(255,255,255,.58)}
.sr-button-outline:hover{background:#fff;color:var(--sr-deep)}
.sr-hero-facts{position:absolute;bottom:0;left:50%;transform:translateX(-50%);display:grid;grid-template-columns:repeat(4,1fr);background:#fff;color:var(--sr-ink);box-shadow:0 12px 38px rgba(0,0,0,.2)}
.sr-hero-facts>div{padding:20px 24px;border-right:1px solid rgba(33,69,111,.12)}
.sr-hero-facts>div:last-child{border:0}
.sr-hero-facts span,.sr-hero-facts strong{display:block}
.sr-hero-facts span{margin-bottom:5px;color:var(--sr-muted);font-size:.75rem}
.sr-hero-facts strong{font-family:var(--serif,Georgia,serif);font-size:1.2rem;line-height:1.2}
.sr-nav{position:sticky;top:82px;z-index:20;background:rgba(249,247,241,.96);border-bottom:1px solid rgba(33,69,111,.12);backdrop-filter:blur(10px)}
.sr-nav .sr-container{display:flex;gap:30px;overflow:auto;scrollbar-width:none}
.sr-nav .sr-container::-webkit-scrollbar{display:none}
.sr-nav a{flex:none;padding:17px 0;color:var(--sr-muted);font-size:.86rem;font-weight:600}
.sr-nav a:hover{color:var(--sr-navy)}
.sr-section{padding:clamp(65px,8vw,105px) 0}
.sr-heading{max-width:720px;margin:0 auto 44px;text-align:center}
.sr-heading h2,.sr-overview h2,.sr-highlights h2,.sr-faq h2,.sr-visit h2{font-size:clamp(2.2rem,4.2vw,3.8rem);line-height:1.05;margin:12px 0}
.sr-heading h2 em,.sr-overview h2 em,.sr-highlights h2 em{color:var(--sr-navy);font-weight:500}
.sr-heading>p:last-child{max-width:630px;margin:14px auto 0;color:var(--sr-muted)}
.sr-overview-grid{display:grid;grid-template-columns:.8fr 1.2fr;gap:clamp(30px,7vw,85px);align-items:center}
.sr-overview-copy{padding:25px 0}
.sr-count{font-family:var(--serif,Georgia,serif);font-size:clamp(4rem,9vw,7.5rem);line-height:1;color:#c7a367}
.sr-overview-copy h3{margin:18px 0 12px;font-size:2rem}
.sr-overview-copy>p{max-width:440px;color:var(--sr-muted)}
.sr-text-link{display:inline-flex;align-items:center;gap:8px;margin-top:20px;color:var(--sr-navy);font-weight:700;font-size:.92rem}
.sr-text-link:hover{color:#a47932}
.sr-overview-image{position:relative;overflow:hidden;border-radius:22px;background:#dce1e6;box-shadow:0 16px 40px rgba(20,35,59,.12)}
.sr-overview-image img{width:100%;aspect-ratio:1.35;object-fit:cover}
.sr-overview-image span{position:absolute;right:10px;bottom:10px;padding:6px 10px;border-radius:6px;background:rgba(5,16,30,.76);color:#fff;font-size:.68rem}
.sr-amenities{background:radial-gradient(ellipse at 80% 10%,#142640,var(--sr-deep) 65%);color:#fff}
.sr-heading-light h2{color:#fff}
.sr-heading-light h2 em{color:#d8aa5b}
.sr-heading-light>p:last-child{color:rgba(255,255,255,.68)}
.sr-amenity-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:0 26px;list-style:none;border:1px solid rgba(210,162,76,.22);border-radius:20px;padding:15px 28px}
.sr-amenity-grid li{display:flex;align-items:center;gap:16px;padding:18px 4px;border-bottom:1px solid rgba(255,255,255,.08);font-size:.96rem}
.sr-amenity-grid li:nth-last-child(-n+3){border-bottom:0}
.sr-amenity-grid li span{color:#d8aa5b;font-size:.76rem}
.sr-highlights{background:#0b1727;color:#fff}
.sr-split{display:grid;grid-template-columns:1fr 1fr;gap:clamp(35px,8vw,100px)}
.sr-highlights h2{margin-bottom:28px;color:#fff}
.sr-highlights h2 em{color:#d8aa5b}
.sr-check-list{display:grid;gap:16px;list-style:none}
.sr-check-list li{display:flex;align-items:flex-start;gap:13px;color:rgba(255,255,255,.83);line-height:1.5}
.sr-check-list li span{color:#e0ad54;font-size:1.1rem;font-weight:700}
.sr-connectivity-card{align-self:center;padding:30px;border:1px solid rgba(210,162,76,.35);border-radius:20px;background:rgba(255,255,255,.025)}
.sr-connectivity-card h3{margin:12px 0 20px;color:#fff;font-family:var(--serif,Georgia,serif);font-size:2rem;font-weight:500}
.sr-connectivity-card ul{list-style:none}
.sr-connectivity-card li{display:flex;justify-content:space-between;gap:14px;padding:13px 0;border-top:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.8);font-size:.89rem}
.sr-connectivity-card li b{flex:none;color:#edbd6b}
.sr-charge-note{display:flex;align-items:center;gap:14px;margin-top:22px;padding:17px;border:1px solid #a87a32;border-radius:12px;color:#fff;font-size:.87rem;font-weight:600}
.sr-charge-note span{color:#e0ad54;font-size:1.4rem}
.sr-connectivity{background:#fff}
.sr-location-grid{display:grid;grid-template-columns:1.1fr .9fr;gap:22px}
.sr-map{min-height:390px;overflow:hidden;border-radius:20px;background:#e2e8ec}
.sr-map iframe{width:100%;height:100%;min-height:390px;border:0}
.sr-place-list{padding:22px 26px;border-radius:20px;background:#f6f1e7}
.sr-place-list>div{display:flex;justify-content:space-between;gap:14px;padding:13px 0;border-bottom:1px solid rgba(33,69,111,.13);font-size:.88rem}
.sr-place-list>div b{flex:none;color:var(--sr-navy);font-size:.8rem}
.sr-faq{background:#f6f1e7}
.sr-faq-grid{display:grid;grid-template-columns:.8fr 1.2fr;gap:clamp(35px,8vw,100px);align-items:start}
.sr-faq-grid>div:first-child>p:not(.sr-eyebrow){color:var(--sr-muted)}
.sr-faq details{padding:18px 20px;border-bottom:1px solid rgba(33,69,111,.16)}
.sr-faq summary{cursor:pointer;font-weight:700}
.sr-faq details p{margin-top:10px;color:var(--sr-muted);font-size:.92rem}
.sr-visit{padding:70px 0;background:var(--sr-deep);color:#fff}
.sr-visit-content{display:grid;grid-template-columns:1fr auto;align-items:center;gap:20px 50px}
.sr-visit h2{max-width:680px;color:#fff}
.sr-visit-content>div:first-child>p:last-child{color:rgba(255,255,255,.72)}
.sr-visit .sr-eyebrow{color:#edbd6b}
.sr-visit-actions{display:grid;justify-items:center;gap:12px}
.sr-visit-actions>a:last-child{color:rgba(255,255,255,.82);font-size:.9rem}
.sr-disclaimer{grid-column:1/-1;margin-top:15px;padding-top:18px;border-top:1px solid rgba(255,255,255,.16);color:rgba(255,255,255,.55);font-size:.76rem}
@media(max-width:900px){
  .sr-hero-facts{grid-template-columns:repeat(2,1fr)}
  .sr-hero-facts>div:nth-child(2){border-right:0}
  .sr-hero-facts>div:nth-child(n+3){border-top:1px solid rgba(33,69,111,.12)}
  .sr-overview-grid,.sr-split,.sr-location-grid{grid-template-columns:1fr}
  .sr-overview-copy{max-width:620px}
}
@media(max-width:640px){
  .sr-container{width:min(1200px,100% - 32px)}
  .sr-hero{min-height:740px}
  .sr-hero-content{padding-top:95px;padding-bottom:205px}
  .sr-crumb{margin-bottom:35px;font-size:.73rem;gap:7px}
  .sr-hero-facts>div{padding:14px 12px}
  .sr-hero-facts strong{font-size:1.04rem}
  .sr-nav{top:68px}
  .sr-nav .sr-container{gap:22px}
  .sr-nav a{font-size:.8rem}
  .sr-amenity-grid{grid-template-columns:1fr;padding:12px 20px}
  .sr-amenity-grid li:nth-last-child(-n+3){border-bottom:1px solid rgba(255,255,255,.08)}
  .sr-amenity-grid li:last-child{border-bottom:0}
  .sr-connectivity-card{padding:24px 20px}
  .sr-map,.sr-map iframe{min-height:310px}
  .sr-faq-grid,.sr-visit-content{grid-template-columns:1fr}
  .sr-visit-actions{justify-items:start}
  .sr-disclaimer{grid-column:auto}
}
`;