// Download links come from public/downloads/manifest.json, written by ../scripts/package_tools.py.
import manifest from "../../public/downloads/manifest.json";

export const DOWNLOADS = manifest.files;

export function downloadFor(id) {
  return DOWNLOADS.find((d) => d.tool === id) || null;
}

export function sizeLabel(bytes) {
  return bytes >= 1024 * 1024 ? (bytes / 1024 / 1024).toFixed(1) + " MB" : Math.round(bytes / 1024) + " KB";
}
