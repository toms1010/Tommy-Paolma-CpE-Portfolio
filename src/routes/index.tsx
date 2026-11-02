import { PROJECTS } from '../data/portfolio';

/**
 * Every project ID used in the portfolio.
 *
 * These are the canonical URL slugs (e.g. `wit-barcode` -> /projects/wit-barcode).
 */
export const PROJECT_IDS = [
  'wit-barcode',
  'shadow-hunter',
  'student-transport',
  'jdajnsh',
  'marpol-ocean-adventure',
  'battle-of-bands',
  'pre-event-registration',
  'cap-order-manager',
  't-shirt-order-system',
  'campus-navigation',
  'participant-rating',
  'sports-event-manager',
] as const;

export type ProjectId = (typeof PROJECT_IDS)[number];

/** Resolve a project by its URL slug. */
export function resolveProject(id: string): (typeof PROJECTS)[number] | null {
  const idLower = id.toLowerCase();
  const match = PROJECTS.find(
    (p) => p.projectId?.toLowerCase() === idLower || idLower === p.title.toLowerCase()
  );
  return match ?? null;
}
