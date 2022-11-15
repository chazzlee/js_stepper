import { $ } from "../utils";
import { playSample } from "../audio/playSample";
import * as Tone from "tone";

/**
 * @param {Object.<string, object>} samples //TODO: type { label: string, source: Tone.Source }
 * @param {number} rowSize
 * @returns {void}
 */
export function buildKeyboard(samples, rowSize) {
  const $keyboard = $("#keyboard");

  if ($keyboard && !$keyboard.hasChildNodes()) {
    for (let i = 0; i < rowSize; i++) {
      const $key = document.createElement("div");
      $key.classList.add("key");
      $key.dataset.row = `row_${i}`;

      const $keyName = document.createElement("p");
      $keyName.textContent = samples[`row_${i}`].label;

      $key.append($keyName);
      $keyboard.append($key);

      $key.addEventListener("click", () => {
        /** @type {string} row */
        const row = $key.dataset.row;
        playSample(samples[row].source, Tone.now());
      });
    }
  }
}
