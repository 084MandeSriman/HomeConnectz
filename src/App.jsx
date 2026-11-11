import { useEffect, useState } from 'react';
import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import Loader from './components/Loader.jsx';
import { Navbar, MobileBar } from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Projects from './pages/Projects.jsx';
import Services from './pages/Services.jsx';
import Granite from './pages/services/Granite.jsx';
import Residential from './pages/services/Residential.jsx';
import Solar from './pages/services/Solar.jsx';
import Contact from './pages/Contact.jsx';
import SrivariMeadows from './pages/SrivariMeadows.jsx';
import MeridianResidences from './pages/MeridianResidences.jsx';
import PraneetaSingaporeTown from './pages/PraneetaSingaporeTown.jsx';

// Each page / component file holds its own data and its own design (CSS).
// This file only holds the routes and the site-wide base design (colours, fonts, buttons).

// ==========================================================================
//  1. ROUTES
// ==========================================================================

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    requestAnimationFrame(() => {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({ behavior: 'smooth' });
    });
  }, [pathname, hash]);
  return null;
}

const NotFound = () => (
  <section className="section container center">
    <h1>Page not found</h1>
    <p className="lead">The page you are looking for does not exist.</p>
    <Link className="btn btn-dark" to="/">Back to home</Link>
  </section>
);

// ==========================================================================
//  2. APP
// ==========================================================================

export default function App() {
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();
  const padded = !(pathname === '/' || pathname.startsWith('/projects'));
  return (
    <>
      <style>{CSS}</style>
      {loading && <Loader onDone={() => setLoading(false)} />}
      <ScrollToTop />
      <Navbar />
      <main className={padded ? 'pad-nav' : ''}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/meridian-residences" element={<MeridianResidences />} />
          <Route path="/projects/sapphire-residences" element={<Navigate to="/projects/meridian-residences" replace />} />
          <Route path="/projects/srivari-meadows" element={<SrivariMeadows />} />
          <Route path="/projects/praneeta-singapore-town-phase-ii" element={<PraneetaSingaporeTown />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/granite" element={<Granite />} />
          <Route path="/services/residential" element={<Residential />} />
          <Route path="/services/solar" element={<Solar />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}

// ==========================================================================
//  DESIGN. SITE-WIDE BASE DESIGN
//  All styling for this file lives here (injected with <style>).
// ==========================================================================
const CSS = `
:root{--bg:#e9e8e6; --navy:#21456f; --ink:#1b2b40; --muted:#5d6f84; --tan:#b8a088; --cream:#f9f0e8; --white:#fff;
  --line:rgba(33,69,111,.14); --shadow:0 10px 30px rgba(33,69,111,.10);
  --nav-h:66px;--nav-top:16px;--deep:#0f2238;--deep2:#14233b;--gold:#d2b88f;--paper:#f6f1e7; --serif:'DM Sans', system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif; --sans:'DM Sans', system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif;}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
html,body{font-family:var(--sans)}
body{background:var(--bg) url('/images/paper-bg.jpg') repeat;background-size:800px 800px;color:var(--ink);line-height:1.65;font-size:16px;-webkit-font-smoothing:antialiased}
img{max-width:100%;display:block}
a{color:inherit;text-decoration:none}
button,input,select,textarea{font:inherit;font-family:inherit;color:inherit}
h1,h2,h3{font-family:var(--sans);font-weight:500;line-height:1.15;color:var(--ink)}
h1{font-size:clamp(2.4rem,5vw,3.8rem)}
h2{font-size:clamp(2rem,4vw,3rem)}
h3{font-size:1.55rem}
:focus-visible{outline:3px solid var(--navy);outline-offset:3px}
.container{width:min(1200px,100% - 40px);margin-inline:auto}
.section{padding:clamp(48px,8vw,96px) 0}
.page-top{padding-top:clamp(40px,6vw,72px)}
.center{text-align:center}
.narrow{max-width:820px}
.mt{margin-top:40px}
.muted{color:var(--muted)}
.lead{color:var(--muted);font-size:1.05rem;max-width:560px;margin:10px auto 0}
.head{text-align:center;margin-bottom:44px}
.statement{font-family:var(--sans);font-style:italic;font-size:clamp(1.4rem,2.6vw,2rem);line-height:1.4}
.row{display:flex;gap:12px;flex-wrap:wrap;justify-content:center}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:12px 24px;border-radius:999px;font-weight:600;font-size:.95rem;border:1.5px solid transparent;cursor:pointer;transition:background .2s,color .2s,border-color .2s}
.btn-dark{background:var(--navy);color:#fff}
.btn-dark:hover{background:var(--ink)}
.btn-light{background:#fff;color:var(--ink)}
.btn-light:hover{background:var(--cream)}
.btn-ghost{border-color:#fff;color:#fff}
.btn-ghost:hover{background:#fff;color:var(--ink)}
.link{display:inline-flex;align-items:center;gap:6px;color:var(--navy);font-weight:600;font-size:.95rem}
.link:hover{color:var(--tan)}
.btn-sm{padding:9px 18px;font-size:.88rem}
.btn-block{width:100%;padding:16px}
.btn[disabled]{background:#c9d4e2;color:#fff;cursor:not-allowed}
.small{font-size:.9rem}
@media (max-width:760px){
  body{padding-bottom:56px}
}
@media (prefers-reduced-motion:reduce){
  *{animation-duration:.01ms!important;transition-duration:.01ms!important}
}
em{font-style:italic}
.btn-gold{background:var(--gold);color:var(--deep);border-color:var(--gold)}
.btn-gold:hover{background:#fff;border-color:#fff}
.btn-outline-light{border-color:rgba(255,255,255,.55);color:#fff}
.btn-outline-light:hover{background:#fff;color:var(--deep);border-color:#fff}
.btn-line{border-color:rgba(33,69,111,.3);color:var(--navy);background:transparent}
.btn-line:hover{background:var(--navy);color:#fff;border-color:var(--navy)}
.eyebrow{display:inline-flex;align-items:center;gap:14px;text-transform:uppercase;letter-spacing:.26em;font-size:.74rem;font-weight:700;color:var(--tan);margin-bottom:14px}
.eyebrow span,.eyebrow::after{content:'';width:34px;height:1px;background:currentColor}
.head h2 em{color:var(--navy)}
main.pad-nav{padding-top:calc(var(--nav-top) + var(--nav-h) + 10px)}
@media (max-width:900px){
  :root{--nav-h:58px;--nav-top:10px}
}
@media (max-width:640px){
  .container{width:min(1200px,100% - 32px)}
}
`;
