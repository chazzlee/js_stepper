import { $ } from "../utils";
import * as Tone from "tone";

export function initializeMuteButton() {
  const $muteButton = $(".mute-btn");
  $muteButton.addEventListener("click", () => {
    if (!Tone.Destination.mute) {
      $muteButton.textContent = "Unmute";
      Tone.Destination.mute = true;
    } else {
      $muteButton.textContent = "Mute";
      Tone.Destination.mute = false;
    }
  });
}
