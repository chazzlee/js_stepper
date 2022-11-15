import * as Tone from "tone";

/**
 * @param {number} rowCount
 * @returns
 */
export function buildSequences(rowCount) {
  let sequences = [];
  for (let row = 0; row < rowCount; row++) {
    sequences.push({ row, name: `row_${row}` });
  }

  return {
    add() {},
    sequences,
  };
}
