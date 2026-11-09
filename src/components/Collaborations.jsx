const collaborators = [
  { id: 'vajra-gold', kind: 'gold', name: 'Vajra' },
  { id: 'vajra', kind: 'box', name: 'VAJRA', sub: 'For Better Living' },
  { id: 'muppa', kind: 'muppa', name: 'muppa', sub: 'Inspired Living!' },
  { id: 'navanaami', kind: 'nav', name: 'NAVANAAMI' },
  { id: 'prosperiti', kind: 'pros', name: 'prosperiti', sub: 'HOMES' },
  { id: 'rajapushpa', kind: 'raja', name: 'Rajapushpa' },
];

function Logo({ collaborator }) {
  return (
    <div className={`co-logo co-${collaborator.kind}`} aria-label={collaborator.name}>
      <span className="co-name">{collaborator.name}</span>
      {collaborator.sub && <small>{collaborator.sub}</small>}
    </div>
  );
}

export default function Collaborations() {
  const loop = [...collaborators, ...collaborators];

  return (
    <>
      <style>{CSS}</style>
      <section className="collab" aria-labelledby="collab-heading">
        <div className="container head">
          <h2 id="collab-heading">Our Collaborations</h2>
          <p className="lead">Trusted partnerships with Hyderabad’s leading developers.</p>
        </div>
        <div className="co-viewport">
          <div className="co-track">
            {loop.map((collaborator, index) => (
              <div
                className="co-item"
                key={`${collaborator.id}-${index}`}
                aria-hidden={index >= collaborators.length ? 'true' : undefined}
              >
                <Logo collaborator={collaborator} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

const CSS = `
.collab{padding:0;background:transparent;overflow:hidden}
.collab .head{margin-bottom:clamp(30px,5vw,52px)}
.collab h2{color:#1b2b40}
.co-viewport{position:relative;overflow:hidden;-webkit-mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent);mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)}
.co-track{display:flex;width:max-content;animation:co-scroll 38s linear infinite}
.co-viewport:hover .co-track{animation-play-state:paused}
@keyframes co-scroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}
.co-item{flex:none;width:250px;height:120px;display:grid;place-items:center;padding:0 10px}
.co-logo{display:grid;justify-items:center;gap:6px;text-align:center;transition:transform .3s}
.co-item:hover .co-logo{transform:scale(1.08)}
.co-logo small{font-size:.72rem;letter-spacing:.04em;color:#5d6f84}
.co-gold .co-name{font-family:Arial,Helvetica,sans-serif;font-size:2rem;font-weight:700;color:#b49a63}
.co-box .co-name{background:#2b82a8;color:#fff;font-family:Arial,Helvetica,sans-serif;font-weight:700;font-size:1.35rem;padding:14px 22px;letter-spacing:.01em}
.co-muppa .co-name{font-family:Georgia,serif;font-size:1.9rem;color:#2b82a8;line-height:1}
.co-nav .co-name{font-family:var(--serif);font-weight:600;letter-spacing:.12em;font-size:1.15rem;color:#4a4a4a}
.co-pros .co-name{font-family:var(--sans);font-weight:700;font-size:1.45rem;color:#363b5e;letter-spacing:-.01em;line-height:1}
.co-pros small{font-size:.62rem;letter-spacing:.2em}
.co-raja .co-name{font-family:var(--serif);font-weight:600;font-size:1.5rem;color:#b5384c}
@media(max-width:640px){.co-item{width:190px;height:100px}.co-track{animation-duration:30s}}
@media(prefers-reduced-motion:reduce){.co-track{animation:none}.co-viewport{overflow-x:auto}}
`;
