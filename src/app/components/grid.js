import { $ } from "../utils";

/**
 * @param {number} rowSize
 * @param {number} colSize
 * @param {Array.<string>} notes
 * @returns {void}
 */
export function buildGrid(rowSize, colSize, notes) {
  const $grid = $("#grid");

  if ($grid && !$grid.hasChildNodes()) {
    for (let row = 0; row < rowSize; row++) {
      for (let col = 0; col < colSize; col++) {
        const $cell = document.createElement("div");
        $cell.classList.add("cell");
        $cell.dataset.pos = JSON.stringify([row, col]);
        $cell.dataset.note = notes[row];

        $grid.append($cell);
      }
    }
  }
}
