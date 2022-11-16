import { $ } from "../utils";
//TODO:
export let isMetronomeOn = true;
/**
 * @returns {*} //todo:
 */
export function initializeMetronome() {
  const $metronomeStatus = $("#metronome-status");
  $metronomeStatus.textContent = isMetronomeOn ? "on" : "off";

  const $metronome = $(".metronome-btn");
  $metronome.addEventListener("click", () => {
    console.log("e", isMetronomeOn);
    if (isMetronomeOn) {
      isMetronomeOn = false;
      $metronomeStatus.textContent = "off";
    } else {
      isMetronomeOn = true;
      $metronomeStatus.textContent = "on";
    }
  });

  return {
    $metronome,
  };
}
