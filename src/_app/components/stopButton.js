import { $ } from "../utils";
import * as Tone from "tone";

/**
 * @returns {void}
 */
export function initializeStopButton() {
  const $stopButton = $(".stop-btn");
  const $playButton = $(".play-btn");

  $stopButton.addEventListener("click", () => {
    if (Tone.Transport.state === "started") {
      Tone.Transport.stop();
      console.log("Transport stopped...");
      // TODO: is this paused or stopped/reset?
      $playButton.disabled = false;
      $stopButton.disabled = true;

      $("#playhead-marker").classList.remove("active");
    }
  });
}
