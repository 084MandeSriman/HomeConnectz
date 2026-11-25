import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { CITIES, SITE, TYPES, projects, statuses } from './homeData.js';
import { Icon, Img } from './HomeShared.jsx';

function InterestDialog({ project, onClose }) {
  const upcoming = project.status === 'upcoming';
  const dialog = useRef(null);
  const nameField = useRef(null);

  useEffect(() => {
    const modal = dialog.current;
    modal.showModal();
    nameField.current.focus();
    return () => modal.close();
  }, []);

  function submit(event) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const message = [
      upcoming ? `I'd like to register interest in ${project.name}.` : `I'd like to enquire about ${project.name}.`,
      `Name: ${fields.get('name').trim()}`,
      `Mobile: ${fields.get('phone').trim()}`,
      `Email: ${fields.get('email').trim()}`,
    ].join('\n');
    window.open(`https://wa.me/${SITE.tel.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  }

  return (
    <dialog className="sp-interest-dialog" ref={dialog} aria-labelledby="sp-interest-title"
      onCancel={(event) => { event.preventDefault(); onClose(); }}>
      <button type="button" className="sp-interest-close" aria-label="Close enquiry form" onClick={onClose}>×</button>
      <h2 id="sp-interest-title">{upcoming ? 'Register Interest' : 'Project Enquiry'}</h2>
      <p className="sp-interest-project">{project.name}</p>
      <form className="sp-interest-form" onSubmit={submit}>
        <label>Full name
          <input ref={nameField} name="name" autoComplete="name" required pattern={'.*\\S.*'} />
        </label>
        <label>Mobile number
          <input name="phone" type="tel" autoComplete="tel" required pattern={'(?:\\+91 *)?[0-9](?: *[0-9]){9}'} title="Enter a 10-digit mobile number, optionally starting with +91." />
        </label>
        <label>Email
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label className="sp-interest-consent">
          <input type="checkbox" required />
          <span>I agree that HomeConnectz may contact me about this project.</span>
        </label>
        <button className="btn btn-dark" type="submit">Continue to WhatsApp <Icon name="arrow" size={18} /></button>
      </form>
    </dialog>
  );
}

function ProjectCard({ p, onRegister }) {
  const upcoming = p.status === 'upcoming';
  const details = p.details ?? [
    ['Configuration', [p.bhk, p.meta[2]].filter(Boolean).join('\n')],
    ['Project details', p.meta[1]],
    ['Stage', p.possession],
  ];
  const content = (
    <>
      <div className="sp-media">
        <span className="sp-image-placeholder" aria-hidden="true"><Icon name="building" size={36} /></span>
        <Img src={p.img} fallback={p.fallback} />
        <span className="sp-badge" data-status={p.status}>{p.status}</span>
      </div>
      <div className="sp-panel">
        <p className="sp-location"><Icon name="pin" size={15} /> {p.meta[0]}</p>
        <h3>{p.name}</h3>
        <p className="sp-sum">{p.summary}</p>
        <dl className="sp-facts">
          {details.filter(([, value]) => value).map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        {p.rera && <p className="sp-rera">TG RERA · {p.rera}</p>}
      </div>
    </>
  );
  if (upcoming) {
    return (
      <article className="sp-card sp-card-upcoming">
        {content}
        <button type="button" className="sp-register" aria-label={`Register interest in ${p.name}`} onClick={() => onRegister(p)}>
          Register Interest <Icon name="arrow" size={16} />
        </button>
      </article>
    );
  }

  return (
    <article className="sp-card">
      <Link to={p.page === false ? '/contact' : `/projects/${p.slug}`} className="sp-project-link" aria-label={`View ${p.name}`}>
        {content}
        <span className="sp-register">View project <Icon name="arrow" size={16} /></span>
      </Link>
      {p.status === 'ongoing' && (
        <button type="button" className="sp-register sp-enquire" onClick={() => onRegister(p)}>
          Enquire Now <Icon name="arrow" size={16} />
        </button>
      )}
    </article>
  );
}

export default function ProjectsSection({ status: selectedStatus, type: selectedType, onFiltersChange, standalone = false }) {
  const [city, setCity] = useState('Hyderabad');
  const [localStatus, setLocalStatus] = useState('upcoming');
  const [localType, setLocalType] = useState('all');
  const [interestProject, setInterestProject] = useState(null);

  const status = selectedStatus ?? localStatus;
  const type = selectedType ?? localType;
  const list = projects.filter((p) => p.city === city && p.status === status && (type === 'all' || p.type === type));
  const cur = statuses.find((x) => x.key === status);
  const changeStatus = (next) => {
    if (onFiltersChange) onFiltersChange(next, 'all');
    else {
      setLocalStatus(next);
      setLocalType('all');
    }
  };
  const changeType = (next) => {
    if (onFiltersChange) onFiltersChange(status, next);
    else setLocalType(next);
  };

  return (
    <section className={`sp-section${standalone ? ' sp-page' : ''}`} id="projects">
      <div className="sp-container">
        <header className="sp-heading">
          <h2>Projects we represent</h2>
          <p>Verified projects from established developers in Hyderabad, at the developer’s price. You pay us nothing.</p>
        </header>

        <div className="sp-cities" role="tablist" aria-label="Project city">
          {CITIES.map((c) => (
            <button key={c} type="button" role="tab" aria-selected={city === c}
              className={city === c ? 'on' : ''}
              onClick={() => {
                setCity(c);
                if (onFiltersChange) onFiltersChange(status, 'all');
                else setLocalType('all');
              }}>
              <Icon name="pin" size={16} /> {c}
            </button>
          ))}
        </div>

        <div className="sp-status" role="tablist" aria-label="Project status">
          {statuses.map((x) => (
            <button key={x.key} type="button" role="tab" aria-selected={status === x.key}
              className={status === x.key ? 'on' : ''}
              onClick={() => changeStatus(x.key)}>
              {x.label}
            </button>
          ))}
        </div>

        <div className="sp-types" role="tablist" aria-label="Project type">
          {TYPES.map(([key, label]) => (
            <button key={key} type="button" role="tab" aria-selected={type === key}
              className={type === key ? 'on' : ''} onClick={() => changeType(key)}>
              {label}
            </button>
          ))}
        </div>

        {list.length ? (
          <div className="sp-showcase" role="tabpanel">
            <div className="sp-track">
              {list.map((p) => <ProjectCard key={p.slug} p={p} onRegister={setInterestProject} />)}
            </div>
          </div>
        ) : (
          <div className="empty sp-empty" role="tabpanel">
            <p>{type === 'all'
              ? `No ${cur.label.toLowerCase()} projects in ${city} right now.`
              : `No ${TYPES.find((t) => t[0] === type)[1].toLowerCase()} in ${cur.label.toLowerCase()} projects in ${city} right now.`}</p>
            <Link to="/contact" className="link">Tell us what you need <Icon name="arrow" size={16} /></Link>
          </div>
        )}

        <div className="center sp-more-link">
          <Link to={`/projects?status=${status}&type=${type}`} className="btn btn-dark">View all projects</Link>
        </div>
      </div>
      {interestProject && <InterestDialog project={interestProject} onClose={() => setInterestProject(null)} />}
    </section>
  );
}
