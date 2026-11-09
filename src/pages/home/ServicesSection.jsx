import { Link } from 'react-router-dom';
import { services } from './homeData.js';
import { Icon, Img } from './HomeShared.jsx';

function ServiceCard({ s }) {
  return (
    <Link to={`/services/${s.id}`} className="svc-card" aria-label={`Explore ${s.title} services`}>
      <div className="svc-media">
        <Img src={s.img} alt={s.title} fallback={s.fallback} />
        <span className="svc-shade" />
        <span className="svc-badge"><Icon name={s.icon || 'sparkle'} size={36} /></span>
      </div>
      <div className="svc-body">
        <h3>{s.title}</h3>
        <p className="svc-text">{s.summary || s.text}</p>
        <span className="svc-link" aria-hidden="true">
          <Icon name="arrow" size={20} />
        </span>
      </div>
    </Link>
  );
}


export default function ServicesSection() {
  return (
    <section className="section container svc-section" id="services">
      <div className="head">
        <h2>Our services</h2>
        <p className="lead">From finding the property to finishing and powering it.</p>
      </div>
      <div className="grid three svc-grid">{services.map((s) => <ServiceCard key={s.id} s={s} />)}</div>
    </section>
  );
}
