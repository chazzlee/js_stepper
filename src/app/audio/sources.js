import * as Tone from "tone";

export function configureSources(metronome) {
  const sources = [];

  return {
    add(source) {
      sources.push(source);
      return this;
    },
    build() {
      sources.push(metronome);
      return sources;
    },
    generateSamples() {
      return sources.reduce((acc, curr, index) => {
        acc[curr];
        return acc;
      }, {});
    },
  };
}
