import { About } from './components/About';
import { BackToTop } from './components/BackToTop';
import { Certifications } from './components/Certifications';
import { ComputerEngineering } from './components/ComputerEngineering';
import { Contact } from './components/Contact';
import { Education } from './components/Education';
import { Experience } from './components/Experience';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { ParticleField } from './components/ParticleField';
import { Projects } from './components/Projects';
import { Resume } from './components/Resume';
import { Skills } from './components/Skills';
import { ThemeProvider } from './theme/ThemeContext';

export function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-[100] focus:rounded-br-xl focus:bg-accent focus:px-5 focus:py-3 focus:font-bold focus:text-slate-950"
      >
        Skip to main content
      </a>
      <ParticleField />
      <Navbar />
      <main id="main" className="mx-auto max-w-6xl px-4 sm:px-6">
        <Hero />
        <About />
        <ComputerEngineering />
        <Projects />
        <Skills />
        <Education />
        <Experience />
        <Certifications />
        <Resume />
        <Contact />
        <Footer />
      </main>
      <BackToTop />
    </ThemeProvider>
  );
}
