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
