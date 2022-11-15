import * as Tone from "tone";
import { $ } from "../utils";

/**
 * @returns {void}
 */
export function initializeVolume() {
  Tone.Destination.volume.set({ value: -15 });
  const currentLevel = Tone.Destination.volume.value;

  const $volumeValue = $("#volume-value");
  $volumeValue.textContent = Math.floor(currentLevel);

  const $volumeSlider = $("#volume-slider");
  $volumeSlider.value = Math.floor(currentLevel);
  $volumeSlider.addEventListener("input", (e) => {
    const value = parseInt(e.target.value, 10);
    $volumeValue.textContent = value;
    Tone.Destination.volume.set({ value });
  });
}
