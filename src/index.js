import * as Tone from "tone";

module.hot.accept();

/**
 * @param {string} selector
 * @returns {(HTMLElement|null)}
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
 * @returns {NodeListOf<Element>}
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

const $bpmValue = $("#bpm-value");
const $bpmSlider = $("#bpm-slider");
$bpmValue.textContent = Tone.Transport.bpm.value;
$bpmSlider.value = Tone.Transport.bpm.value;

$bpmSlider.addEventListener("input", (e) => {
  const value = parseInt(e.target.value, 10);
  $bpmValue.textContent = value;
  Tone.Transport.bpm.set({
    value,
  });
});

Tone.Destination.volume.set({ value: -15 });

const $volumeValue = $("#volume-value");
const $volumeSlider = $("#volume-slider");
$volumeValue.textContent = Math.floor(Tone.Destination.volume.value);
$volumeSlider.value = Math.floor(Tone.Destination.volume.value);
$volumeSlider.addEventListener("input", (e) => {
  const value = parseInt(e.target.value, 10);
  $volumeValue.textContent = value;
  Tone.Destination.volume.set({ value });
});

let isMetronomeOn = true;
const $metronome = $(".metronome-btn");
const $metronomeStatus = $("#metronome-status");
$metronomeStatus.textContent = isMetronomeOn ? "on" : "off";
$metronome.addEventListener("click", () => {
  if (isMetronomeOn) {
    isMetronomeOn = false;
    $metronomeStatus.textContent = "off";
  } else {
    isMetronomeOn = true;
    $metronomeStatus.textContent = "on";
  }
});

// Quick Drum Synth Samples
const metronome = new Tone.MembraneSynth({ volume: 2 }).toDestination();
const kickDrum = new Tone.MembraneSynth({ volume: 2 }).toDestination();
const snareDrum = new Tone.Player({
  url: "./samples/snares/Cymatics x S1 - Snare 2.wav",
}).toDestination();

const tomtomDrum = new Tone.Player({
  url: "./samples/percussion/Cymatics x S1 - Percussion 4.wav",
  volume: 0.3,
}).toDestination();

const hihatCymbal = new Tone.Player({
  url: "./samples/hihats/closed/Cymatics x S1 - Closed Hihat 4.wav",
}).toDestination();
const openhatCymbal = new Tone.Player({
  url: "./samples/hihats/open/Cymatics x S1 - Open Hihat 3.wav",
}).toDestination();

const samples = {
  row_0: openhatCymbal,
  row_1: hihatCymbal,
  row_2: tomtomDrum,
  row_3: snareDrum,
  row_4: kickDrum,
};

const $keyboardKeys = Array.from($$(".key"));
$keyboardKeys.forEach(($key) => {
  $key.addEventListener("click", (e) => {
    const row = $key.dataset.row;
    playSample(samples[row], Tone.now());
  });
});

const $playButton = $(".play-btn");
const $stopButton = $(".stop-btn");
const $clearButton = $(".clear-btn");
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

/**
 * @param {number?} count
 * @param {T?} initialValue
 * @returns {Array<T>}
 */
function createEmptyLoop(count = 8, initialValue = null) {
  return new Array(count).fill(initialValue);
}

let kickLoop = createEmptyLoop();
let snareLoop = createEmptyLoop();
let tomtomLoop = createEmptyLoop();
let hihatLoop = createEmptyLoop();
let openhatLoop = createEmptyLoop();

let kickSeq;
let snareSeq;
let hihatSeq;
let tomtomSeq;
let openhatSeq;
let metronomeSeq;

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

  if (tomtomSeq) {
    tomtomSeq.dispose();
  }

  if (Tone.Transport.state === "paused" || Tone.Transport.state === "stopped") {
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

    tomtomSeq = new Tone.Sequence((time, note) => {
      playSample(tomtomDrum, time, note);
    }, tomtomLoop).start(0);

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
$stopButton.addEventListener("click", () => {
  if (Tone.Transport.state === "started") {
    Tone.Transport.stop();
    console.log("Transport stopped...");
    // TODO: is this paused or stopped/reset?
    $playButton.disabled = false;
    $stopButton.disabled = true;
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

//TODO: get rid of globals
function resetLoops() {
  kickLoop = createEmptyLoop();
  snareLoop = createEmptyLoop();
  tomtomLoop = createEmptyLoop();
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

  if (tomtomSeq) {
    tomtomSeq.dispose();
  }
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
    playSample(sample, Tone.now());
    if (!options.element.childElementCount) {
      options.loop[col] = "C2";
      console.log(options.element.dataset.note, options.loop);

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

const $tomtomDrums = $$("[data-note='tomtom']");
Array.from($tomtomDrums).forEach(($tomtom) => {
  $tomtom.addEventListener("mousedown", (e) =>
    handleNotePress(tomtomDrum, {
      button: e.button,
      element: $tomtom,
      loop: tomtomLoop,
    })
  );
});

const $hihatCymbals = $$("[data-note='hihat']");
Array.from($hihatCymbals).forEach(($hihat) => {
  $hihat.addEventListener("mousedown", (e) =>
    handleNotePress(hihatCymbal, {
      button: e.button,
      element: $hihat,
      loop: hihatLoop,
    })
  );
});

const $openhatCymbals = $$("[data-note='openhat']");
Array.from($openhatCymbals).forEach(($openhat) => {
  $openhat.addEventListener("mousedown", (e) =>
    handleNotePress(openhatCymbal, {
      button: e.button,
      element: $openhat,
      loop: openhatLoop,
    })
  );
});
