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
            {collaborators.map((collaborator) => (
              <div
                className="co-item"
                key={collaborator.id}
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
.collab h2{color:var(--navy)}
.collab .lead{color:var(--muted)}
.home-main ~ .collab{padding-top:0;padding-bottom:64px}
.home-main ~ .collab .head{margin-bottom:32px}
@media(max-width:760px){.home-main ~ .collab{padding-bottom:48px}.home-main ~ .collab .head{margin-bottom:24px}}

.co-viewport{width:min(1000px,100% - 40px);margin-inline:auto}
.co-track{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));align-items:center;gap:clamp(24px,5vw,72px);padding:16px 0}
.co-item{min-width:0;display:grid;place-items:center}
.co-logo{display:grid;place-items:center;width:100%;height:110px;background:transparent;border:0;box-shadow:none;text-align:center}
.co-logo img{display:block;width:auto;height:auto;max-width:100%;max-height:90px;object-fit:contain;mix-blend-mode:multiply}
.co-name{font-family:var(--sans);font-weight:600;font-size:1.2rem;color:var(--navy)}
@media(max-width:640px){.co-viewport{width:calc(100% - 32px)}.co-track{gap:20px}.co-logo{height:80px}.co-logo img{max-height:64px}.co-name{font-size:13px}}
@media(max-width:380px){.co-track{grid-template-columns:1fr;gap:20px}.co-logo{height:76px;max-width:220px}}
`;
