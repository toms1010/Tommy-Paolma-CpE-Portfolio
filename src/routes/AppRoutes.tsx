import { Routes, Route } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { ComputerEngineering } from '../components/ComputerEngineering';
import { Projects } from '../components/Projects';
import { WITBarcode } from '../components/WITBarcode';
import { ShadowHunter } from '../components/ShadowHunter';
import { TransportSystem } from '../components/TransportSystem';
import { Skills } from '../components/Skills';
import { Education } from '../components/Education';
import { Experience } from '../components/Experience';
import { Certifications } from '../components/Certifications';
import { Resume } from '../components/Resume';
import { Contact } from '../components/Contact';
import { ProjectDetail } from './ProjectDetail';

/**
 * Application route table.
 *
 * The portfolio is a single page at `/` so every section (Home, About,
 * Projects, case studies, Skills, …, Contact) is reachable through the
 * `#`-anchors used by the navigation. Project case studies keep their own
 * dedicated route at `/projects/:projectId` for direct linking.
 */
export function AppRoutes(): React.JSX.Element {
  return (
    <Routes>
      {/* Single page: all sections render at "/" so the header's #anchors and
          the page's internal "scroll to section" links all work. */}
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <>
              <Hero />
              <About />
              <ComputerEngineering />
              <Projects />
              <WITBarcode />
              <ShadowHunter />
              <TransportSystem />
              <Skills />
              <Education />
              <Experience />
              <Certifications />
              <Resume />
              <Contact />
            </>
          }
        />
      </Route>

      <Route path="/projects/:projectId" element={<Layout />}>
        <Route index element={<ProjectDetail />} />
      </Route>
    </Routes>
  );
}
