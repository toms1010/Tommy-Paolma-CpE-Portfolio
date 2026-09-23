/** Prefix a public-dir path with the Vite base URL (works on GitHub Pages subpaths). */
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL;
  return `${base}${path.replace(/^\/+/, '')}`;
}
