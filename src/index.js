import * as Tone from "tone";
import { $ } from "./app/utils";
import { DEFAULT_SAMPLE_PACK_2 } from "./app/constants/DEFAULT_SAMPLE_PACK.js";

function setBpm(value) {
  const $bpmValue = $("#bpm-value");
  $bpmValue.textContent = value;
}

function setVolume(value) {
  const $volumeValue = $("#volume-value");
  $volumeValue.textContent = value;
}

function bootstrap() {
  document.addEventListener("DOMContentLoaded", async () => {
    await Tone.start();
    console.log("Audio is ready");
  });

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

const players = createPlayersFromSamples(DEFAULT_SAMPLE_PACK_2);
const metronome = new Tone.MembraneSynth({
  volume: -12,
  envelope: { attack: 0.05, sustain: 0, release: 0.1 },
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

//----------------------------------------------------------------------//

// DOM Elements
const $metronomeToggle = $("#metronome-toggle");
$metronomeToggle.addEventListener("change", (e) => {
  if (e.target.checked) {
    metronome.volume.set({ value: -12 });
  } else {
    metronome.volume.set({ value: -Infinity });
  }
});

// Keyboard
const $sideKeyboardContainer = $("#side-keyboard");
const $sideKeyboardKeys = Array.from($sideKeyboardContainer.children);
$sideKeyboardKeys.forEach(($key, index) => {
  $key.textContent = DEFAULT_SAMPLE_PACK_2[index].label;
  $key.dataset.name = DEFAULT_SAMPLE_PACK_2[index].name;

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

function convertBpmToSeconds(bpm) {
  return `${(60_000 / bpm) * 4 * 2}ms`;
}

function formatClockTime(seconds) {
  const date = new Date(null);
  date.setSeconds(seconds);
  console.log(date.toISOString());
  return date.toISOString().substring(11, 19);
}

const metronomeLoop = ["C6", null, "C6", null, "C6", null, "C6", null];
let clockInterval;

function createLoopManager(players) {
  let loopers = players.map((_player) => createLooper());
  let sequences = {
    metronome: new Tone.Sequence((time, note) => {
      playNote(metronome, time, note, "4n");
      Tone.Draw.schedule(() => {
        const $playheadMarker = $(".playhead-marker");
        $playheadMarker.classList.add("active");
        $playheadMarker.style.animationDuration = convertBpmToSeconds(
          Tone.Transport.bpm.value
        );
      }, time);
    }, metronomeLoop).start(0),
  };

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
      if (Tone.Transport.state !== "started") {
        this.createSequences();
        Tone.Transport.start();
        const $clock = $("#clock-value");
        clockInterval = setInterval(() => {
          $clock.textContent = formatClockTime(
            Tone.Transport.getSecondsAtTime()
          );
        }, 1000);
      }
    },
    stop() {
      const $playheadMarker = $(".playhead-marker");
      $playheadMarker.style.animationDuration = 0;
      $playheadMarker.classList.remove("active");
      clearInterval(clockInterval);

      const $clock = $("#clock-value");
      $clock.textContent = "00:00:00";
      Tone.Transport.stop();
    },
  };
}

const $sequencerGrid = $("#sequencer-grid");
const $cells = Array.from($sequencerGrid.children);

const loopManager = createLoopManager(players);

const $playButton = $("#btn-play");
$playButton.addEventListener("click", () => loopManager.start());

const $stopButton = $("#btn-stop");
$stopButton.addEventListener("click", () => loopManager.stop());

// Grid
const LEFT_BUTTON = 0;
const RIGHT_BUTTON = 2;

$cells.forEach(($cell) => {
  let [row, col] = extractPosition($cell.dataset.pos);
  $cell.dataset.name = DEFAULT_SAMPLE_PACK_2[row].name;

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
