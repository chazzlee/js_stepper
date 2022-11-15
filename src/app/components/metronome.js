import { $ } from "../utils";

export let isMetronomeOn = true;

/**
 * @returns {void}
 */
export function initializeMetronome() {
  const $metronome = $(".metronome-btn");
  $metronome.addEventListener("click", () => {
    if (isMetronomeOn) {
      isMetronomeOn = false;
      $metronomeStatus.textContent = "off";
    } else {
      isMetronomeOn = true;
      $metronomeStatus.textContent = "on";
    }
  });

  const $metronomeStatus = $("#metronome-status");
  $metronomeStatus.textContent = isMetronomeOn ? "on" : "off";
}
