import { Link } from 'react-router-dom';
import ProjectsSection from './home/ProjectsSection.jsx';
import ServicesSection from './home/ServicesSection.jsx';
import './home/home.css';

export default function Home() {
  return (
    <>
      <section className="home-video-hero" aria-labelledby="home-hero-title">
        <video src="/homecoherovideo.mp4" autoPlay muted loop playsInline aria-hidden="true" />
        <div className="container home-video-copy">
          <span className="home-video-location">HomeConnectz · Hyderabad</span>
          <h1 id="home-hero-title">Find your next property.</h1>
          <p>Residential and commercial sales, granite supply, and solar panel installation.</p>
          <div className="home-video-actions">
            <a href="#projects">Projects</a>
            <a href="#services">Services</a>
            <Link to="/contact">Contact us</Link>
          </div>
        </div>
      </section>
      <ProjectsSection />
      <ServicesSection />
    </>
  );
}
