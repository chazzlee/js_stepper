import * as Tone from "tone";
import { $ } from "../utils";

/**
 * @param {boolean} isMetronomeOn
 * @returns {void}
 */
//TODO:!!!
export function initializePlayButton(isMetronomeOn = true) {
  const $playButton = $(".play-btn");
  const $stopButton = $(".stop-btn");

  $playButton.addEventListener("click", async () => {
    console.log("context:", Tone.context.state);
    console.log("transport:", Tone.Transport.state);
    if (Tone.context.state !== "running") {
      await Tone.start();
      console.log("context after:", Tone.context.state);
    }

    if (metronomeSeq) {
      metronomeSeq.dispose();
    }

    if (kickSeq) {
      kickSeq.dispose();
    }

    if (snareSeq) {
      snareSeq.dispose();
    }

    if (hihatSeq) {
      hihatSeq.dispose();
    }

    if (openhatSeq) {
      openhatSeq.dispose();
    }

    if (percussionSeq) {
      percussionSeq.dispose();
    }

    if (
      Tone.Transport.state === "paused" ||
      Tone.Transport.state === "stopped"
    ) {
      console.log("context:", Tone.context.state);

      kickSeq = new Tone.Sequence((time, note) => {
        playSample(kickDrum, time, note);
      }, kickLoop).start(0);

      snareSeq = new Tone.Sequence((time, note) => {
        playSample(snareDrum, time, note);
      }, snareLoop).start(0);

      hihatSeq = new Tone.Sequence((time, note) => {
        playSample(hihatCymbal, time, note);
      }, hihatLoop).start(0);

      openhatSeq = new Tone.Sequence((time, note) => {
        playSample(openhatCymbal, time, note);
      }, openhatLoop).start(0);

      percussionSeq = new Tone.Sequence((time, note) => {
        playSample(percussionDrum, time, note);
      }, percussionLoop).start(0);

      if (isMetronomeOn) {
        metronomeSeq = new Tone.Sequence(
          (time, note) => {
            playSample(metronome, time, note, "8n");
          },
          ["C5", null, "C5", null, "C5", null, "C5", null]
        ).start(0);
      }
      // Tone.Draw.schedule(() => {}, Tone.now()).start(0);

      Tone.Transport.start();

      $playButton.disabled = true;
      $stopButton.disabled = false;
      // const $playheadMarker = $("#playhead-marker");
      // $playheadMarker.classList.add("playing");

      console.log("Transport started...");
      console.log("context:", Tone.context.state);
      console.log("transport:", Tone.context.state);
    }
  });
}
