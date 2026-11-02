import { useParams } from 'react-router-dom';
import { PROJECTS } from '../data/portfolio';
import type { ProjectId } from '../lib/routes';

/** Build a map from project ID to project record for O(1) lookup. */
const projectById = new Map<ProjectId, typeof PROJECTS[number]>();
for (const project of PROJECTS) {
  const id = project.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  projectById.set(id as ProjectId, project);
}

/**
 * Resolve a project by URL slug.
 *
 * The `:projectId` param matches the canonical ID from src/data/portfolio.ts
 * (e.g. `wit-barcode`). This resolver mirrors the card/modal slug used for the
 * in-page anchor, so the two address the same case study.
 */
export function resolveProject(id: string): typeof PROJECTS[number] | null {
  return projectById.get(id as ProjectId) ?? null;
}

export function useProject(): typeof PROJECTS[number] {
  const params = useParams();
  const project = resolveProject(params.projectId ?? '');
  if (!project) {
    throw new Response('Not Found', { status: 404 });
  }
  return project;
}
