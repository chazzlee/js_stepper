import { $ } from "../utils";

/**
 * @param {function():void} reset
 * @return {void}
 */
export function initializeClearButton(reset) {
  const $clearButton = $(".clear-btn");
  const $grid = $("#grid");

  if ($grid) {
    $clearButton.addEventListener("click", () => {
      Array.from($grid.children).forEach((cell) => {
        if (cell.hasChildNodes()) {
          cell.removeChild(cell.lastElementChild);
        }
      });
      reset();
    });
  }
}
