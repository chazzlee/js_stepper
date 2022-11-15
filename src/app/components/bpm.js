import * as Tone from "tone";
import { $ } from "../utils";

/**
 * @returns {void}
 */
export function initializeBpm() {
  const $bpmValue = $("#bpm-value");
  $bpmValue.textContent = Tone.Transport.bpm.value;

  const $bpmSlider = $("#bpm-slider");
  $bpmSlider.value = Tone.Transport.bpm.value;
  $bpmSlider.addEventListener("input", (e) => {
    const value = parseInt(e.target.value, 10);
    $bpmValue.textContent = value;
    Tone.Transport.bpm.set({
      value,
    });
  });
}
