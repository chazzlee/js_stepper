import * as Tone from "tone";

/**
 * @param {Tone.Source} sample
 * @param {number} time
 * @param {string?} note
 * @param {string?} duration
 * @returns {void}
 */
export function playSample(sample, time, note = "C2", duration = "8n") {
  if (sample instanceof Tone.Player) {
    sample.start(time, undefined, duration);
  } else {
    sample.triggerAttackRelease(note, duration, time);
  }
}
