import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

/**
 * Shared layout shell for every route.
 *
 * Replaces the current inline header markup in App.tsx. The header and footer
 * are rendered once, and the page content is rendered by the child `Outlet`.
 */
export function Layout(): React.JSX.Element {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-[100] focus:rounded-br-xl focus:bg-accent focus:px-5 focus:py-3 focus:font-bold focus:text-slate-950"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main" className="mx-auto max-w-6xl px-4 sm:px-6 bg-depth">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
