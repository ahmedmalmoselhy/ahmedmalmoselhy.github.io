/**
 * Entries of a folder collection edited at /admin (one JSON file per entry),
 * sorted by the `order` field the dashboard writes when entries are dragged.
 */
export const ordered = <T>(modules: Record<string, unknown>) =>
  (Object.values(modules) as (T & { order?: number })[]).sort(
    (a, b) => (a.order ?? Infinity) - (b.order ?? Infinity),
  );
