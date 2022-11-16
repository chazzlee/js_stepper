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

function bootstrap() {
  $("#sequencer-container").addEventListener("contextmenu", (e) => {
    e.preventDefault();
    return false;
  });
}
bootstrap();

function createPlayersFromSamples(samples) {
  return Object.values(samples).map((sample) =>
    new Tone.Player({ url: sample.path }).toDestination()
  );
}

const players = createPlayersFromSamples(DEFAULT_SAMPLE_PACK);

function playNote(source, time, note = "C4", duration = "8n") {
  if (source instanceof Tone.Player) {
    source.start(time, 0, duration);
  } else {
    source.triggerAttackRelease(note, duration, time);
  }
}

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

function extractRowIndex(row) {
  return parseInt(row.split("_")[1], 10);
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

// Grid
const LEFT_BUTTON = 0;
const RIGHT_BUTTON = 2;
const $sequencerGrid = $("#sequencer-grid");
const $cells = Array.from($sequencerGrid.children);
$cells.forEach(($cell) => {
  let row = extractRowIndex($cell.dataset.note);
  $cell.dataset.name = DEFAULT_SAMPLE_PACK[row].name;

  $cell.addEventListener("mousedown", (e) => {
    if (e.button === LEFT_BUTTON) {
      const now = Tone.now();
      playNote(players[row], now);

      if (!hasMarker($cell)) {
        placeMarker($cell, row);
      }
    } else if (e.button === RIGHT_BUTTON && hasMarker($cell)) {
      removeMarker($cell);
    }
  });
});

// BPM Slider
