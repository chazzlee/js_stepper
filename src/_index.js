import * as Tone from "tone";
import { $, $$ } from "./_app/utils";

import { buildGrid } from "./_app/components/grid";
import { buildKeyboard } from "./_app/components/keyboard";
import { initializeBpm } from "./_app/components/bpm";
import { initializeVolume } from "./_app/components/volume";
import { initializeMuteButton } from "./_app/components/muteButton";
import {
  initializeMetronome,
  isMetronomeOn,
} from "./_app/components/metronome";
import { initializeClearButton } from "./_app/components/clearButton";
import { initializeStopButton } from "./_app/components/stopButton";
import { configureSources } from "./_app/audio/sources";
// import { initializePlayButton } from "./app/components/playButton";
import { samplePack2 } from "./_app/utils/defaultSamples";

module.hot.accept();

$("#context").addEventListener("click", async () => {
  console.log("context status: ", Tone.context.state);
  await Tone.start();
  console.log("Audio is ready...", Tone.context.state);
});

$("#sequencer-container").addEventListener("contextmenu", (e) => {
  e.preventDefault();
  return false;
});

const config = {
  ROW_SIZE: 5,
  COL_SIZE: 16,
  DEFAULT_NOTES: ["openhat", "closedhat", "percussion", "snare", "kick"],
};

// Quick Drum Synth Samples ----TODO: move
/**
 * @param {object} samplePack //todo:
 * @returns {Object.<string, Tone.Player>}
 */
const generateDefaultPlayers = (samplePack) => {
  const players = {};
  for (let sample of Object.keys(samplePack)) {
    players[sample] = new Tone.Player({
      url: samplePack[sample],
    }).toDestination();
  }
  return players;
};

const players = generateDefaultPlayers(samplePack2);
const metronome = new Tone.MembraneSynth({ volume: -8 }).toDestination();

const sourceBuilder = configureSources(config.ROW_SIZE)
  .add({ name: "openhat", label: "Open Hi Hat", source: players.openHat })
  .add({ name: "closedhat", label: "Closed Hi Hat", source: players.closedHat })
  .add({ name: "percussion", label: "Percussion", source: players.percussion })
  .add({ name: "snare", label: "Snare", source: players.snare })
  .add({ name: "kick", label: "Kick", source: players.kick });
const keyboardSamples = sourceBuilder.generateKeyboardSamples();
const sources = sourceBuilder.build();

initializeBpm();
initializeVolume();
initializeMuteButton();
initializeMetronome();
initializeClearButton(resetLoops);
initializeStopButton();
// initializePlayButton(isMetronomeOn);
buildKeyboard(keyboardSamples, config.ROW_SIZE);
buildGrid(config.ROW_SIZE, config.COL_SIZE, config.DEFAULT_NOTES);

/**
 * @param {number?} count
 * @param {T?} initialValue
 * @returns {Array<T>}
 */
function createEmptyLoop(count = config.COL_SIZE, initialValue = null) {
  return new Array(count).fill(initialValue);
}

let kickLoop = createEmptyLoop();
let snareLoop = createEmptyLoop();
let percussionLoop = createEmptyLoop();
let hihatLoop = createEmptyLoop();
let openhatLoop = createEmptyLoop();

let kickSeq;
let snareSeq;
let hihatSeq;
let percussionSeq;
let openhatSeq;
let metronomeSeq;

const $playButton = $(".play-btn");
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

  if (Tone.Transport.state === "paused" || Tone.Transport.state === "stopped") {
    console.log("context:", Tone.context.state);
    const $stopButton = $(".stop-btn");
    kickSeq = new Tone.Sequence((time, note) => {
      playSample(players.kick, time, note);
    }, kickLoop).start(0);

    snareSeq = new Tone.Sequence((time, note) => {
      playSample(players.snare, time, note);
    }, snareLoop).start(0);

    hihatSeq = new Tone.Sequence((time, note) => {
      playSample(players.closedHat, time, note);
    }, hihatLoop).start(0);

    openhatSeq = new Tone.Sequence((time, note) => {
      playSample(players.openHat, time, note);
    }, openhatLoop).start(0);

    percussionSeq = new Tone.Sequence((time, note) => {
      playSample(players.percussion, time, note);
    }, percussionLoop).start(0);

    metronomeSeq = new Tone.Sequence(
      (time, note) => {
        playSample(metronome, time, note, "4n");
        Tone.Draw.schedule(() => {
          if (Tone.Transport.state === "started") {
            const $playheadMarker = $("#playhead-marker");
            $playheadMarker.classList.add("active");
            $playheadMarker.style.animationDuration = `${
              (60_000 / Tone.Transport.bpm.value) * 4 * 2
            }ms`;
          }
          // setTimeout(() => {
          //   $playheadMarker.classList.remove("active");
          // }, 100);
        });
      },
      ["C5", null, "C5", null, "C5", null, "C5", null]
    ).start(0);
    if (!isMetronomeOn) {
      metronome.volume.set({ value: -Infinity });
    } else {
      metronome.volume.set({ value: -12 });
    }

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

//TODO: get rid of globals
function resetLoops() {
  kickLoop = createEmptyLoop();
  snareLoop = createEmptyLoop();
  percussionLoop = createEmptyLoop();
  hihatLoop = createEmptyLoop();
  openhatLoop = createEmptyLoop();

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

  Tone.Transport.stop();

  $(".stop-btn").disabled = true;
  $(".play-btn").disabled = false;
}

/**
 * @param {Tone.Source} sample
 * @param {number} time
 * @param {string?} note
 * @param {string?} duration
 * @returns {void}
 */
function playSample(sample, time, note = "C2", duration = "4n") {
  console.log("playing sample...");
  if (sample instanceof Tone.Player) {
    sample.start(time);
  } else {
    sample.triggerAttackRelease(note, "4n", time); //TODO:
  }
}

/**
 * @param {Tone.Source} sample
 * @param {} options //TODO:
 * @returns {void}
 */
function handleNotePress(sample, options) {
  const [row, col] = JSON.parse(options.element.dataset.pos);

  if (options.button === 0) {
    options["play"] && playSample(sample, Tone.now());
    if (!options.element.childElementCount) {
      options.loop[col] = "C2";

      const marker = document.createElement("div");
      marker.classList.add("marker", col);
      marker.dataset.col = col;
      marker.dataset.row = row;
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
// -------------------------------------------------------------------------//

const $kickDrums = $$("[data-note='kick']");
Array.from($kickDrums).forEach(($kick) => {
  $kick.addEventListener("mousedown", (e) => {
    handleNotePress(players.kick, {
      button: e.button,
      element: $kick,
      loop: kickLoop,
      play: true,
    });
  });
  //TODO:
  // $kick.addEventListener("mouseover", (e) => {
  //   if (e.buttons === 1) {
  //     handleNotePress(players.kick, {
  //       button: e.button,
  //       element: $kick,
  //       loop: kickLoop,
  //       play: false,
  //     });
  //   }
  // });
});

const $snareDrums = $$("[data-note='snare']");
Array.from($snareDrums).forEach(($snare) => {
  $snare.addEventListener("mousedown", (e) =>
    handleNotePress(players.snare, {
      button: e.button,
      element: $snare,
      loop: snareLoop,
      play: true,
    })
  );
});

const $percussionDrums = $$("[data-note='percussion']");
Array.from($percussionDrums).forEach(($percussion) => {
  $percussion.addEventListener("mousedown", (e) =>
    handleNotePress(players.percussion, {
      button: e.button,
      element: $percussion,
      loop: percussionLoop,
      play: true,
    })
  );
});

const $hihatCymbals = $$("[data-note='closedhat']");
Array.from($hihatCymbals).forEach(($hihat) => {
  $hihat.addEventListener("mousedown", (e) =>
    handleNotePress(players.closedHat, {
      button: e.button,
      element: $hihat,
      loop: hihatLoop,
      play: true,
    })
  );
});

const $openhatCymbals = $$("[data-note='openhat']");
Array.from($openhatCymbals).forEach(($openhat) => {
  $openhat.addEventListener("mousedown", (e) =>
    handleNotePress(players.openHat, {
      button: e.button,
      element: $openhat,
      loop: openhatLoop,
      play: true,
    })
  );
});
