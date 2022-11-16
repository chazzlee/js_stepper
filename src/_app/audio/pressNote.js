import * as Tone from "tone";
import { playSample } from "./playSample";

/**
 * @param {Tone.Source} sample
 * @param {} options //TODO:
 * @returns {void}
 */
export function pressNote(sample, options) {
  const [_row, col] = JSON.parse(options.element.dataset.pos);

  if (options.button === 0) {
    playSample(sample, Tone.now());
    if (!options.element.childElementCount) {
      options.loop[col] = "C2";

      const marker = document.createElement("div");
      marker.classList.add("marker");
      options.element.append(marker);

      //TODO: restart the loop while it's running if user adds another marker
      // if (Tone.Transport.state === "started") {
      //   Tone.Transport.stop();
      //   console.log("clicked while running...");
      //   console.log(Tone.Transport.state);
      // }
    }
  } else if (options.button === 2 && options.element.childElementCount) {
    options.loop[col] = null;
    options.element.removeChild(options.element.lastElementChild);
    console.log(options.loop);
  }
}
