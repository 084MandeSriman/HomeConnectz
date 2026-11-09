import { Link } from 'react-router-dom';

export const SERVICE = {
  id: 'residential',
  title: 'Residential',
  tagline: 'Homes you can trust',
  icon: 'home',
  image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=75',
  fallback: '/images/services/residential.svg',
  summary: 'Apartments, villas and plots from verified developers, with site visits, paperwork and loan support handled for you.',
  stat: ['0%', 'brokerage for buyers'],
  points: ['Verified projects and builders', 'Guided site visits', 'Loan and registration help'],
  options: [
    {
      title: 'Villas and gated communities',
      text: 'Explore spacious homes, community amenities and gated neighborhoods.',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=900&q=75',
    },
    {
      title: 'Apartments and high-rises',
      text: 'Find a home that fits your budget, preferred location and commute.',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=75',
    },
  ],
};

const CSS = `
.residential-page{padding-top:clamp(24px,3vw,40px)}
.residential-page .back{display:inline-flex;align-items:center;gap:8px;margin-bottom:20px;color:var(--navy);font-weight:600}
.residential-page .service-hero{position:relative;min-height:clamp(340px,45vw,540px);overflow:hidden;border-radius:28px;background:var(--deep)}
.residential-page .service-hero>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.residential-page .shade{position:absolute;inset:0;background:linear-gradient(90deg,rgba(15,34,56,.9),rgba(15,34,56,.58) 55%,rgba(15,34,56,.08))}
.residential-page .hero-copy{position:absolute;left:clamp(24px,6vw,72px);bottom:clamp(28px,6vw,68px);z-index:1;max-width:680px;color:#fff}
.residential-page .eyebrow{margin-bottom:10px;color:var(--gold);font-size:.76rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase}
.residential-page .service-hero h1{margin-bottom:12px;color:#fff;font-size:clamp(2.8rem,6vw,5rem)}
.residential-page .hero-copy>p:last-child{color:rgba(255,255,255,.9);font-size:clamp(1rem,1.5vw,1.15rem);line-height:1.7}
.residential-page .content{display:grid;gap:48px;padding-top:54px}
.residential-page .intro{display:flex;align-items:center;justify-content:space-between;gap:30px}
.residential-page .intro-copy{max-width:720px}
.residential-page h2{margin-bottom:10px;font-size:clamp(1.9rem,3vw,2.5rem)}
.residential-page .intro-copy>p:last-child,.residential-page .option p,.residential-page .contact p{color:var(--muted)}
.residential-page .stat{display:grid;min-width:190px;padding:20px 26px;border-left:3px solid var(--gold);background:rgba(255,255,255,.65)}
.residential-page .stat strong{font-family:var(--serif);font-size:2.5rem;font-weight:500;line-height:1;color:var(--navy)}
.residential-page .stat span{margin-top:5px;color:var(--muted)}
.residential-page .points{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
.residential-page .point{display:flex;align-items:center;gap:12px;min-height:74px;padding:16px 18px;border-radius:16px;background:#fff;box-shadow:var(--shadow);font-weight:500}
.residential-page .point svg{width:22px;height:22px;flex:none;padding:3px;border-radius:50%;background:rgba(33,69,111,.1);color:var(--navy)}
.residential-page .offerings{display:grid;gap:22px}
.residential-page .options{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px}
.residential-page .option{overflow:hidden;border-radius:20px;background:#fff;box-shadow:var(--shadow)}
.residential-page .option img{width:100%;aspect-ratio:16/9;object-fit:cover}
.residential-page .option-copy{padding:20px 22px 24px}
.residential-page .option h3{margin-bottom:6px}
.residential-page .contact{display:flex;align-items:center;justify-content:space-between;gap:24px;padding:28px 32px;border-radius:22px;background:#fff;box-shadow:var(--shadow)}
.residential-page .contact .btn{flex:none}
@media(max-width:760px){.residential-page .content{gap:36px;padding-top:38px}.residential-page .intro{align-items:flex-start;flex-direction:column}.residential-page .stat{min-width:0}.residential-page .points,.residential-page .options{grid-template-columns:1fr}.residential-page .contact{align-items:stretch;flex-direction:column;padding:24px}}
`;

function CheckIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>;
}

function ServiceImage({ src, fallback, alt }) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={(event) => {
        const image = event.currentTarget;
        if (fallback && !image.dataset.fallback) {
          image.dataset.fallback = 'true';
          image.src = fallback;
        } else {
          image.style.display = 'none';
        }
      }}
    />
  );
}

export default function Residential() {
  return (
    <section className="section container page-top residential-page">
      <style>{CSS}</style>
      <Link to="/services" className="back">← All services</Link>
      <div className="service-hero">
        <ServiceImage src={SERVICE.image} fallback={SERVICE.fallback} alt="Modern residential home" />
        <div className="shade" />
        <div className="hero-copy">
          <p className="eyebrow">{SERVICE.tagline}</p>
          <h1>{SERVICE.title}</h1>
          <p>{SERVICE.summary}</p>
        </div>
      </div>
      <div className="content">
        <div className="intro">
          <div className="intro-copy">
            <p className="eyebrow">{SERVICE.tagline}</p>
            <h2>Find a home that feels right</h2>
            <p>{SERVICE.summary}</p>
          </div>
          <div className="stat"><strong>{SERVICE.stat[0]}</strong><span>{SERVICE.stat[1]}</span></div>
        </div>
        <div className="points">
          {SERVICE.points.map((point) => <div className="point" key={point}><CheckIcon />{point}</div>)}
        </div>
        <div className="offerings">
          <div><p className="eyebrow">Explore the possibilities</p><h2>Homes to explore</h2></div>
          <div className="options">
            {SERVICE.options.map((option) => (
              <article className="option" key={option.title}>
                <ServiceImage src={option.image} fallback={SERVICE.fallback} alt={option.title} />
                <div className="option-copy"><h3>{option.title}</h3><p>{option.text}</p></div>
              </article>
            ))}
          </div>
        </div>
        <div className="contact">
          <div><h2>Ready to find your home?</h2><p>Tell us what you are looking for and our team will help you get started.</p></div>
          <Link to="/contact" className="btn btn-dark">Talk to our team</Link>
        </div>
      </div>
    </section>
  );
}
