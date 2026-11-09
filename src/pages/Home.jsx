import HeroSection from './home/HeroSection.jsx';
import ProjectsSection from './home/ProjectsSection.jsx';
import ServicesSection from './home/ServicesSection.jsx';
import './home/home.css';

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProjectsSection />
      <ServicesSection />
    </>
  );
}
