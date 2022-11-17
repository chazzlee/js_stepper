# Step Sequencer

Step Sequencer is a simple beat step sequencer made with vanilla Javascript.
Users are able to place markers on different positions of the grid.
Placing a marker will produce a sound of the respective sample as well as be stored to be played back as a sequence.
Users are able to create simple loops and play back their creations.
The Step Sequencer provides sliders to control the tempo (bpm) as well as the volume.
A playhead runs when a user clicks play, keeping track of the position of the loop.
Eight default samples are provided to play with.
In the future, users will be able to load their own samples.

## Technologies

This demo application is built with HTML, SCSS, and Javascript.
Webpack is used to bundle files and assets.
Tone.js (https://tonejs.github.io/) is used for audio and sound management, as well as clock management.
Without having a background in audio, Tone.js provided powerful, flexible abstractions that hid away some of the complexities.

```js
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
```

Manages the loop and sequences created for the different instruments.

![Step Sequencer](/images/image-1.png)
![Step Sequencer](/images/image-2.png)
