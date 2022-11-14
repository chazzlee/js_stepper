import * as Tone from "tone";

module.hot.accept();

/**
 * @param {string} selector
 * @returns HTMLElement|null
 */
function $(selector) {
  let symbol = selector[0];
  if (symbol === "#") {
    return document.getElementById(selector.slice(1));
  }
  return document.querySelector(selector);
}

/**
 * @param {string} selector
 * @returns NodeListOf<Element>
 */
function $$(selector) {
  return document.querySelectorAll(selector);
}

$("#context").addEventListener("click", async () => {
  console.log("context status: ", Tone.context.state);
  await Tone.start();
  console.log("Audio is ready...", Tone.context.state);
});

$("#sequencer-container").addEventListener("contextmenu", (e) => {
  e.preventDefault();
  return false;
});

// Quick Drum Synth Samples
const kickDrum = new Tone.MembraneSynth({ volume: 2 }).toDestination();
const snareDrum = new Tone.Player({
  url: "./assets/s1/Snares/snare8.wav",
}).toDestination();

const tomtomDrum = new Tone.Player({
  url: "./assets/s1/Percussion/percussion1.wav",
}).toDestination();

const hihatCymbal = new Tone.Player({
  url: "./assets/s1/Hihats/closed-hihat-1.wav",
}).toDestination();

const $playButton = $(".play-btn");
const $stopButton = $(".stop-btn");
const $clearButton = $(".clear-btn");
console.log(Tone.Transport.bpm.value);

const kickLoop = new Array(4).fill(null);
const snareLoop = new Array(4).fill(null);
const tomtomLoop = new Array(4).fill(null);
const hihatLoop = new Array(4).fill(null);

let kickSeq;
let snareSeq;
let hihatSeq;
let tomtomSeq;
$playButton.addEventListener("click", () => {
  console.log("context:", Tone.context.state);
  console.log("transport:", Tone.context.state);

  if (kickSeq) {
    kickSeq.dispose();
  }

  if (snareSeq) {
    snareSeq.dispose();
  }

  if (hihatSeq) {
    hihatSeq.dispose();
  }

  if (tomtomSeq) {
    tomtomSeq.dispose();
  }

  if (Tone.Transport.state === "paused" || Tone.Transport.state === "stopped") {
    console.log("context:", Tone.context.state);
    // createSequences();

    kickSeq = new Tone.Sequence((time, note) => {
      playSample(kickDrum, time, note);
    }, kickLoop).start(0);

    snareSeq = new Tone.Sequence((time, note) => {
      playSample(snareDrum, time, note);
    }, snareLoop).start(0);

    hihatSeq = new Tone.Sequence((time, note) => {
      playSample(hihatCymbal, time, note);
    }, hihatLoop).start(0);

    tomtomSeq = new Tone.Sequence((time, note) => {
      playSample(tomtomDrum, time, note);
    }, tomtomLoop).start(0);

    Tone.Transport.start();
    console.log("Transport started...");
    console.log("context:", Tone.context.state);
    console.log("transport:", Tone.context.state);
  }
});
$stopButton.addEventListener("click", () => {
  if (Tone.Transport.state === "started") {
    Tone.Transport.stop();
    console.log("Transport stopped...");
    // TODO: is this paused or stopped/reset?
  }
});
$clearButton.addEventListener("click", () => {
  const grid = $("#grid");
  Array.from(grid.children).forEach((cell) => {
    if (cell.hasChildNodes()) {
      cell.removeChild(cell.lastElementChild);
    }
  });
  resetLoops();
});

function resetLoops() {
  console.log("NOT YET IMPLEMENTED!");
}

/**
 * @param {Tone.Source} sample
 * @returns {void}
 */
function playSample(sample, time, note = "C2") {
  console.log("playing sample...");
  if (sample instanceof Tone.Player) {
    sample.start(time);
  } else {
    sample.triggerAttackRelease(note, "4n", time); //TODO:
  }
}

/**
 * @param {Tone.Source} sample
 * @param {} options
 * @returns {void}
 */
function handleNotePress(sample, options) {
  const [row, col] = JSON.parse(options.element.dataset.pos);

  if (options.button === 0) {
    playSample(sample, Tone.now());
    if (!options.element.childElementCount) {
      options.loop[col] = "C2";
      console.log(options.element.dataset.note, options.loop);

      const marker = document.createElement("div");
      marker.classList.add("marker");
      options.element.append(marker);
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
    handleNotePress(kickDrum, {
      button: e.button,
      element: $kick,
      loop: kickLoop,
    });
  });
});

const $snareDrums = $$("[data-note='snare']");
Array.from($snareDrums).forEach(($snare) => {
  $snare.addEventListener("mousedown", (e) =>
    handleNotePress(snareDrum, {
      button: e.button,
      element: $snare,
      loop: snareLoop,
    })
  );
});

const $tomtomDrums = $$("[data-note='tomtom'");
Array.from($tomtomDrums).forEach(($tomtom) => {
  $tomtom.addEventListener("mousedown", (e) =>
    handleNotePress(tomtomDrum, {
      button: e.button,
      element: $tomtom,
      loop: tomtomLoop,
    })
  );
});

const $hihatCymbals = $$("[data-note='hihat'");
Array.from($hihatCymbals).forEach(($hihat) => {
  $hihat.addEventListener("mousedown", (e) =>
    handleNotePress(hihatCymbal, {
      button: e.button,
      element: $hihat,
      loop: hihatLoop,
    })
  );
});
