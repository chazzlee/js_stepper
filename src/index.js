import * as Tone from "tone";
import { $, $$ } from "./app/utils";

export const DEFAULT_SAMPLE_PACK = {
  0: {
    label: "Open Hat 1",
    name: "openhat-1",
    path: "./assets/s1/Hihats/open-hihat-1.wav",
  },
  1: {
    label: "Closed Hat 1",
    name: "closedhat-1",
    path: "./assets/s1/Hihats/closed-hihat-1.wav",
  },
  2: {
    label: "Percussion 1",
    name: "percussion-1",
    path: "./assets/s1/Percussion/percussion-9.wav",
  },
  3: {
    label: "Percussion 2",
    name: "percussion-2",
    path: "./assets/s1/Percussion/percussion1.wav",
  },
  4: {
    label: "Percussion 3",
    name: "percussion-3",
    path: "./assets/s1/Percussion/Cymatics x S1 - Percussion 4.wav",
  },
  5: {
    label: "Snare 1",
    name: "snare-1",
    path: "./assets/s1/Snares/Cymatics x S1 - Snare 6.wav",
  },
  6: {
    label: "Snare 2",
    name: "snare-2",
    path: "./assets/s1/Snares/snare8.wav",
  },
  7: { label: "Kick 1", name: "kick-1", path: "./assets/s1/Kicks/kick-5.wav" },
};

function setBpm(value) {
  const $bpmValue = $("#bpm-value");
  $bpmValue.textContent = value;
}

//TODO: max min default start (ui)
function setVolume(value) {
  const $volumeValue = $("#volume-value");
  $volumeValue.textContent = value;
}

function bootstrap() {
  $("#sequencer-container").addEventListener("contextmenu", (e) => {
    e.preventDefault();
    return false;
  });

  setBpm(Tone.Transport.bpm.value);
  setVolume(Tone.Destination.volume.value);
}
bootstrap();

function createPlayersFromSamples(samples) {
  return Object.values(samples).map((sample) =>
    new Tone.Player({ url: sample.path }).toDestination()
  );
}

const players = createPlayersFromSamples(DEFAULT_SAMPLE_PACK);
const metronome = new Tone.MembraneSynth({
  volume: -8,
  envelope: { attack: 0.05 },
}).toDestination();

function playNote(source, time, note = "C4", duration = "8n") {
  if (source instanceof Tone.Player) {
    source.start(time, 0, duration);
  } else {
    source.triggerAttackRelease(note, duration, time);
  }
}

function createLooper(count = 16, value = null) {
  return new Array(count).fill(value);
}

//--------------------------------------------------------------//

// DOM Elements

// Keyboard
const $sideKeyboardContainer = $("#side-keyboard");
const $sideKeyboardKeys = Array.from($sideKeyboardContainer.children);
$sideKeyboardKeys.forEach(($key, index) => {
  $key.textContent = DEFAULT_SAMPLE_PACK[index].label;
  $key.dataset.name = DEFAULT_SAMPLE_PACK[index].name;

  $key.addEventListener("mousedown", () => {
    const now = Tone.now();
    playNote(players[index], now);
  });
});

function extractPosition(position) {
  return JSON.parse(position);
}

function placeMarker($cell, row) {
  const $marker = document.createElement("div");
  $marker.classList.add("marker", `${row}`);
  $cell.append($marker);
}
function removeMarker($cell) {
  $cell.removeChild($cell.lastElementChild);
}
function hasMarker($cell) {
  return $cell.hasChildNodes();
}

function createLoopManager(players) {
  let loopers = players.map((_player) => createLooper());
  let sequences = {};

  return {
    updateLoop(position, note = "C4") {
      let [row, col] = position;
      loopers[row][col] = note;
    },
    resetLoops() {
      loopers = players.map((_player) => createLooper());
    },
    createSequences() {
      players.forEach((player, index) => {
        if (sequences[index]) {
          sequences[index].dispose();
        }
        sequences[index] = new Tone.Sequence((time, note) => {
          playNote(player, time, note);
        }, loopers[index]).start(0);
      });
    },
    getSequences() {
      return sequences;
    },
    start() {
      Tone.Transport.start();
    },
  };
}

const $sequencerGrid = $("#sequencer-grid");
const $cells = Array.from($sequencerGrid.children);

const loopManager = createLoopManager(players);

const $playButton = $("#btn-play");
$playButton.addEventListener("click", () => {
  if (Tone.Transport.state !== "started") {
    loopManager.createSequences();
    loopManager.start();
  }
});

const $stopButton = $("#btn-stop");
$stopButton.addEventListener("click", () => {
  if (Tone.Transport.state === "started") {
    Tone.Transport.stop();
  }
});

// Grid
const LEFT_BUTTON = 0;
const RIGHT_BUTTON = 2;

$cells.forEach(($cell) => {
  let [row, col] = extractPosition($cell.dataset.pos);
  $cell.dataset.name = DEFAULT_SAMPLE_PACK[row].name;

  $cell.addEventListener("mousedown", (e) => {
    if (e.button === LEFT_BUTTON) {
      const now = Tone.now();
      playNote(players[row], now);

      if (!hasMarker($cell)) {
        placeMarker($cell, row);
        loopManager.updateLoop([row, col]);
      }
    } else if (e.button === RIGHT_BUTTON && hasMarker($cell)) {
      removeMarker($cell);
      loopManager.updateLoop([row, col], null);
    }
  });
});

// BPM Slider
const $bpmSlider = $("#bpm-slider");
$bpmSlider.addEventListener("input", (e) => {
  const value = parseInt(e.target.value, 10);
  Tone.Transport.bpm.set({ value });
  setBpm(value);
});

const $volumeSlider = $("#volume-slider");
$volumeSlider.addEventListener("input", (e) => {
  const value = parseInt(e.target.value, 10);
  Tone.Destination.volume.set({ value });
  setVolume(value);
});

const $clearButton = $("#btn-clear");
$clearButton.addEventListener("click", () => {
  const $cells = Array.from($("#sequencer-grid").children);
  $cells.forEach(($cell) => {
    if ($cell.hasChildNodes()) {
      $cell.removeChild($cell.lastElementChild);
    }
  });
  loopManager.resetLoops();
});

const $muteButton = $("#btn-mute");
const $unmuteButton = $("#btn-unmute");
$muteButton.addEventListener("click", () => {
  if (!Tone.Destination.mute) {
    $muteButton.classList.add("hide");
    $unmuteButton.classList.remove("hide");
    Tone.Destination.mute = true;
  }
});
$unmuteButton.addEventListener("click", () => {
  if (Tone.Destination.mute) {
    $unmuteButton.classList.add("hide");
    $muteButton.classList.remove("hide");
    Tone.Destination.mute = false;
  }
});
