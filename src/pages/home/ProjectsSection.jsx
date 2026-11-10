import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CITIES, TYPES, projects, statuses } from './homeData.js';
import { Icon, Img } from './HomeShared.jsx';

function ProjectCard({ p }) {
  const config = [
    { icon: 'bed', label: p.bhk },
    { icon: 'expand', label: p.meta[2] },
    { icon: 'construction', label: p.tag },
    { icon: 'possession', label: p.possession },
  ];
  return (
    <Link to={p.page === false ? '/contact' : `/projects/${p.slug}`} className="sp-card" aria-label={`${p.name}, view project`}>
      <Img src={p.img} alt="" fallback={p.fallback} />
      <div className="sp-panel">
        <h3>{p.name}</h3>
        <p className="sp-sum">{p.summary}</p>
        <div className="sp-more">
          <div>
            <div className="sp-config">
              <p>Configuration:</p>
              <ul>
                {config.map((c) => (
                  <li key={c.icon}>
                    <Icon name={c.icon} size={26} stroke={1.35} />
                    <span>{c.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function ProjectsSection({ status: selectedStatus, type: selectedType, onFiltersChange }) {
  const [city, setCity] = useState('Hyderabad');
  const [localStatus, setLocalStatus] = useState('completed');
  const [localType, setLocalType] = useState('all');
  const [start, setStart] = useState(0);

  const status = selectedStatus ?? localStatus;
  const type = selectedType ?? localType;
  const list = projects.filter((p) => p.city === city && p.status === status && (type === 'all' || p.type === type));
  const ordered = list.map((_, n) => list[(n + start) % list.length]);
  const move = (dir) => setStart((c) => (list.length ? (c + dir + list.length) % list.length : 0));
  const cur = statuses.find((x) => x.key === status);
  const changeStatus = (next) => {
    setStart(0);
    if (onFiltersChange) onFiltersChange(next, 'all');
    else {
      setLocalStatus(next);
      setLocalType('all');
    }
  };
  const changeType = (next) => {
    setStart(0);
    if (onFiltersChange) onFiltersChange(status, next);
    else setLocalType(next);
  };

  return (
    <section className="sp-section" id="projects">
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
                setStart(0);
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

        {ordered.length ? (
          <div className="sp-showcase" role="tabpanel">
            <button type="button" className="sp-arrow prev" onClick={() => move(-1)} aria-label="Previous projects" disabled={list.length < 2}>
              <Icon name="carouselLeft" size={30} stroke={1.5} />
            </button>
            <div className={`sp-track${ordered.length === 1 ? ' single' : ''}`}>
              {ordered.map((p) => <ProjectCard key={p.slug} p={p} />)}
            </div>
            <button type="button" className="sp-arrow next" onClick={() => move(1)} aria-label="Next projects" disabled={list.length < 2}>
              <Icon name="carouselRight" size={30} stroke={1.5} />
            </button>
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
    </section>
  );
}
