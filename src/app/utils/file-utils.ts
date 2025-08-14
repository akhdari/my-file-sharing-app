// src/app/utils/file-utils.ts

/**
 * Opens a given URL in a new browser tab.
 * @param url The URL to open.
 */
export function openFile(url: string): void {
  window.open(url, '_blank');
}
