/**
 * Leaflet divIcon factories for asset pins. HTML strings styled by the
 * .ub-pin rules in globals.css (Leaflet-injected DOM, outside React).
 * The --pin-c custom property carries the APWA utility color — data, not
 * styling (see web/README design notes).
 */
import type { Asset } from "@/lib/types";
import { UTILITY_META } from "@/lib/utility-meta";

export function assetPinHtml(asset: Asset): string {
  const color = UTILITY_META[asset.utility].color;
  const suspect =
    asset.status !== "active" || asset.provenance.lastVerified === null;
  return (
    `<div class="ub-pin${suspect ? " ub-pin--suspect" : ""}" style="--pin-c:${color}" ` +
    `role="button" aria-label="${asset.label} ${UTILITY_META[asset.utility].label}">` +
    `<span class="ub-pin-dot"></span>` +
    `<span class="ub-pin-label">${asset.label}</span>` +
    `</div>`
  );
}

export function setPinActive(el: HTMLElement | undefined, active: boolean) {
  const pin = el?.querySelector(".ub-pin");
  if (!pin) return;
  pin.classList.toggle("ub-pin--active", active);
}
