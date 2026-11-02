/**
 * Canonical project identifiers.
 *
 * Kept here so that src/lib/project-lookup.ts can import the `ProjectId` type
 * without pulling in the full route table.
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
  'periodic-table',
] as const;

export type ProjectId = (typeof PROJECT_IDS)[number];
