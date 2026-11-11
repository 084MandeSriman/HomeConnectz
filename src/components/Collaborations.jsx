import { useState } from 'react';

const collaborators = [
  { id: 'praneeta', name: 'Praneeta', src: 'https://www.praneeta.dev/logo.png' },
  { id: 'vara-prasad', name: 'Vara Prasad Constructions', src: 'https://varaprasadconstructions.com/assets/vp_cons_images.png' },
  { id: 'cadence', name: 'Cadence Realty', src: 'https://www.cadencerealty.in/images/cadence.svg' },
];

/* If a logo can't be loaded, its name is shown instead of a blank space. */
function Logo({ collaborator }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="co-logo" aria-label={collaborator.name}>
      {failed ? (
        <span className="co-name">{collaborator.name}</span>
      ) : (
        <img
          src={collaborator.src}
          alt={collaborator.name}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

export default function Collaborations() {
  /* The three logos are repeated so the strip scrolls smoothly without gaps. */
  const half = [...collaborators, ...collaborators, ...collaborators];
  const loop = [...half, ...half];

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
.co-track{display:flex;width:max-content;animation:co-scroll 40s linear infinite}
.co-viewport:hover .co-track{animation-play-state:paused}
@keyframes co-scroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}
.co-item{flex:none;width:290px;height:140px;display:grid;place-items:center;padding:0 14px}
.co-logo{display:grid;place-items:center;width:100%;height:100px;padding:14px 22px;border:1px solid rgba(33,69,111,.1);border-radius:16px;background:#fff;box-shadow:0 10px 26px rgba(33,69,111,.08);text-align:center;transition:transform .3s,box-shadow .3s}
.co-item:hover .co-logo{transform:translateY(-3px);box-shadow:0 16px 34px rgba(33,69,111,.14)}
.co-logo img{display:block;width:auto;height:auto;max-width:100%;max-height:70px;object-fit:contain}
.co-name{font-family:var(--sans);font-weight:700;font-size:1.2rem;color:#1b2b40}
@media(max-width:640px){.co-item{width:220px;height:116px;padding:0 10px}.co-logo{height:84px;padding:10px 16px}.co-logo img{max-height:56px}.co-track{animation-duration:32s}}
@media(prefers-reduced-motion:reduce){.co-track{animation:none}.co-viewport{overflow-x:auto}}
`;