import type { Site } from "./types";

/**
 * Compress a list of site ids into human ranges: "1–14, 22, CB1–CB4".
 * Numeric labels are range-compressed; non-numeric labels listed as-is.
 */
export function formatSiteList(siteIds: string[], sites: Site[]): string {
  const byId = new Map(sites.map((s) => [s.id, s]));
  const labels = siteIds
    .map((id) => byId.get(id)?.label)
    .filter((l): l is string => Boolean(l));

  const nums = labels
    .filter((l) => /^\d+$/.test(l))
    .map(Number)
    .sort((a, b) => a - b);
  const others = labels.filter((l) => !/^\d+$/.test(l));

  const parts: string[] = [];
  let start = -1;
  let prev = -1;
  for (const n of nums) {
    if (start === -1) {
      start = prev = n;
      continue;
    }
    if (n === prev + 1) {
      prev = n;
      continue;
    }
    parts.push(start === prev ? `${start}` : `${start}–${prev}`);
    start = prev = n;
  }
  if (start !== -1) {
    parts.push(start === prev ? `${start}` : `${start}–${prev}`);
  }
  return [...parts, ...others].join(", ");
}
