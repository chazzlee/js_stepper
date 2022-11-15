/**
 * @param {string} selector
 * @returns {(HTMLElement|null)}
 */
export function $(selector) {
  let symbol = selector[0];
  if (symbol === "#") {
    return document.getElementById(selector.slice(1));
  }
  return document.querySelector(selector);
}
