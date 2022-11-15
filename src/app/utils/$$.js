/**
 * @param {string} selector
 * @returns {NodeListOf<Element>}
 */
export function $$(selector) {
  return document.querySelectorAll(selector);
}
