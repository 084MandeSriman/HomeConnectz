import { Link } from 'react-router-dom';
import { SERVICE as granite } from './services/Granite.jsx';
import { SERVICE as residential } from './services/Residential.jsx';
import { SERVICE as solar } from './services/Solar.jsx';

const services = [granite, residential, solar];

export default function Services() {
  return (
    <section className="section container page-top services-index">
      <style>{CSS}</style>
      <div className="head">
        <h1>Our services</h1>
        <p className="lead">From finding the property to finishing and powering it.</p>
      </div>
      <div className="service-list">
        {services.map((service) => (
          <Link className="service-card" to={`/services/${service.id}`} key={service.id}>
            <img
              src={service.image}
              alt={service.title}
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={(event) => {
                const image = event.currentTarget;
                if (service.fallback && !image.dataset.fallback) {
                  image.dataset.fallback = 'true';
                  image.src = service.fallback;
                } else {
                  image.style.display = 'none';
                }
              }}
            />
            <div className="service-card-copy">
              <p>{service.tagline}</p>
              <h2>{service.title}</h2>
              <span>{service.summary}</span>
              <strong>Explore service <span aria-hidden="true">→</span></strong>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

const CSS = `
.services-index .head{margin-bottom:40px}
.services-index .service-list{display:grid;gap:24px}
.services-index .service-card{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);overflow:hidden;border-radius:24px;background:#fff;box-shadow:var(--shadow);transition:transform .25s,box-shadow .25s}
.services-index .service-card:hover{transform:translateY(-4px);box-shadow:0 18px 42px rgba(33,69,111,.16)}
.services-index .service-card:nth-child(even) img{order:2}
.services-index .service-card>img{width:100%;height:100%;min-height:300px;object-fit:cover}
.services-index .service-card-copy{display:flex;flex-direction:column;align-items:flex-start;justify-content:center;padding:clamp(24px,5vw,56px)}
.services-index .service-card-copy>p{margin-bottom:8px;color:var(--tan);font-size:.76rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase}
.services-index .service-card-copy h2{margin-bottom:10px;font-size:clamp(1.9rem,3vw,2.7rem)}
.services-index .service-card-copy>span{color:var(--muted)}
.services-index .service-card-copy strong{display:flex;align-items:center;gap:10px;margin-top:22px;color:var(--navy)}
.services-index .service-card-copy strong span{font-size:1.3rem;transition:transform .2s}
.services-index .service-card:hover .service-card-copy strong span{transform:translateX(4px)}
@media(max-width:700px){.services-index .service-card{grid-template-columns:1fr}.services-index .service-card:nth-child(even) img{order:0}.services-index .service-card>img{min-height:220px;max-height:300px}}
`;
