/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function() {

eval("// 12 x 16\nconst ROW_SIZE = 12;\nconst COL_SIZE = 16;\nconst OCTAVES = [5, 4, 3];\nconst KEYS = [{\n  note: \"C\",\n  sharp: false\n}, {\n  note: \"C#\",\n  sharp: true\n}, {\n  note: \"D\",\n  sharp: false\n}, {\n  note: \"D#\",\n  sharp: true\n}, {\n  note: \"E\",\n  sharp: false\n}, {\n  note: \"F\",\n  sharp: false\n}, {\n  note: \"F#\",\n  sharp: true\n}, {\n  note: \"G\",\n  sharp: false\n}, {\n  note: \"G#\",\n  sharp: true\n}, {\n  note: \"A\",\n  sharp: false\n}, {\n  note: \"A#\",\n  sharp: true\n}, {\n  note: \"B\",\n  sharp: false\n}].reverse();\nfunction makeGrid(octave) {\n  const grid = document.createElement(\"div\");\n  grid.classList.add(\"grid\");\n  for (let row = 0; row < ROW_SIZE; row++) {\n    for (let col = 0; col < COL_SIZE; col++) {\n      const cell = document.createElement(\"div\");\n      cell.classList.add(\"cell\");\n      cell.dataset.note = KEYS[row].note;\n      cell.dataset.octave = octave;\n      if (KEYS[row].sharp) {\n        cell.classList.add(\"sharp\");\n      }\n      cell.addEventListener(\"mousedown\", e => {\n        const note = e.target.dataset.note;\n        const octave = e.target.dataset.octave;\n        console.log(note + octave);\n      });\n      grid.append(cell);\n    }\n  }\n  return grid;\n}\nconst innerContainer = document.getElementById(\"inner-container\");\nconst sequencer = document.createElement(\"div\");\nsequencer.setAttribute(\"id\", \"sequencer\");\nconst grid = makeGrid(4);\nsequencer.append(grid);\ninnerContainer.append(sequencer);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguanMuanMiLCJuYW1lcyI6WyJST1dfU0laRSIsIkNPTF9TSVpFIiwiT0NUQVZFUyIsIktFWVMiLCJub3RlIiwic2hhcnAiLCJyZXZlcnNlIiwibWFrZUdyaWQiLCJvY3RhdmUiLCJncmlkIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwicm93IiwiY29sIiwiY2VsbCIsImRhdGFzZXQiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInRhcmdldCIsImNvbnNvbGUiLCJsb2ciLCJhcHBlbmQiLCJpbm5lckNvbnRhaW5lciIsImdldEVsZW1lbnRCeUlkIiwic2VxdWVuY2VyIiwic2V0QXR0cmlidXRlIl0sInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qc190ZXN0Ly4vc3JjL2luZGV4LmpzP2I2MzUiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gMTIgeCAxNlxuY29uc3QgUk9XX1NJWkUgPSAxMjtcbmNvbnN0IENPTF9TSVpFID0gMTY7XG5jb25zdCBPQ1RBVkVTID0gWzUsIDQsIDNdO1xuY29uc3QgS0VZUyA9IFtcbiAgeyBub3RlOiBcIkNcIiwgc2hhcnA6IGZhbHNlIH0sXG4gIHsgbm90ZTogXCJDI1wiLCBzaGFycDogdHJ1ZSB9LFxuICB7IG5vdGU6IFwiRFwiLCBzaGFycDogZmFsc2UgfSxcbiAgeyBub3RlOiBcIkQjXCIsIHNoYXJwOiB0cnVlIH0sXG4gIHsgbm90ZTogXCJFXCIsIHNoYXJwOiBmYWxzZSB9LFxuICB7IG5vdGU6IFwiRlwiLCBzaGFycDogZmFsc2UgfSxcbiAgeyBub3RlOiBcIkYjXCIsIHNoYXJwOiB0cnVlIH0sXG4gIHsgbm90ZTogXCJHXCIsIHNoYXJwOiBmYWxzZSB9LFxuICB7IG5vdGU6IFwiRyNcIiwgc2hhcnA6IHRydWUgfSxcbiAgeyBub3RlOiBcIkFcIiwgc2hhcnA6IGZhbHNlIH0sXG4gIHsgbm90ZTogXCJBI1wiLCBzaGFycDogdHJ1ZSB9LFxuICB7IG5vdGU6IFwiQlwiLCBzaGFycDogZmFsc2UgfSxcbl0ucmV2ZXJzZSgpO1xuXG5mdW5jdGlvbiBtYWtlR3JpZChvY3RhdmUpIHtcbiAgY29uc3QgZ3JpZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGdyaWQuY2xhc3NMaXN0LmFkZChcImdyaWRcIik7XG5cbiAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgUk9XX1NJWkU7IHJvdysrKSB7XG4gICAgZm9yIChsZXQgY29sID0gMDsgY29sIDwgQ09MX1NJWkU7IGNvbCsrKSB7XG4gICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZChcImNlbGxcIik7XG4gICAgICBjZWxsLmRhdGFzZXQubm90ZSA9IEtFWVNbcm93XS5ub3RlO1xuICAgICAgY2VsbC5kYXRhc2V0Lm9jdGF2ZSA9IG9jdGF2ZTtcbiAgICAgIGlmIChLRVlTW3Jvd10uc2hhcnApIHtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKFwic2hhcnBcIik7XG4gICAgICB9XG5cbiAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCAoZSkgPT4ge1xuICAgICAgICBjb25zdCBub3RlID0gZS50YXJnZXQuZGF0YXNldC5ub3RlO1xuICAgICAgICBjb25zdCBvY3RhdmUgPSBlLnRhcmdldC5kYXRhc2V0Lm9jdGF2ZTtcbiAgICAgICAgY29uc29sZS5sb2cobm90ZSArIG9jdGF2ZSk7XG4gICAgICB9KTtcbiAgICAgIGdyaWQuYXBwZW5kKGNlbGwpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZ3JpZDtcbn1cbmNvbnN0IGlubmVyQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbm5lci1jb250YWluZXJcIik7XG5jb25zdCBzZXF1ZW5jZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuc2VxdWVuY2VyLnNldEF0dHJpYnV0ZShcImlkXCIsIFwic2VxdWVuY2VyXCIpO1xuY29uc3QgZ3JpZCA9IG1ha2VHcmlkKDQpO1xuc2VxdWVuY2VyLmFwcGVuZChncmlkKTtcbmlubmVyQ29udGFpbmVyLmFwcGVuZChzZXF1ZW5jZXIpO1xuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBLE1BQU1BLFFBQVEsR0FBRyxFQUFFO0FBQ25CLE1BQU1DLFFBQVEsR0FBRyxFQUFFO0FBQ25CLE1BQU1DLE9BQU8sR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3pCLE1BQU1DLElBQUksR0FBRyxDQUNYO0VBQUVDLElBQUksRUFBRSxHQUFHO0VBQUVDLEtBQUssRUFBRTtBQUFNLENBQUMsRUFDM0I7RUFBRUQsSUFBSSxFQUFFLElBQUk7RUFBRUMsS0FBSyxFQUFFO0FBQUssQ0FBQyxFQUMzQjtFQUFFRCxJQUFJLEVBQUUsR0FBRztFQUFFQyxLQUFLLEVBQUU7QUFBTSxDQUFDLEVBQzNCO0VBQUVELElBQUksRUFBRSxJQUFJO0VBQUVDLEtBQUssRUFBRTtBQUFLLENBQUMsRUFDM0I7RUFBRUQsSUFBSSxFQUFFLEdBQUc7RUFBRUMsS0FBSyxFQUFFO0FBQU0sQ0FBQyxFQUMzQjtFQUFFRCxJQUFJLEVBQUUsR0FBRztFQUFFQyxLQUFLLEVBQUU7QUFBTSxDQUFDLEVBQzNCO0VBQUVELElBQUksRUFBRSxJQUFJO0VBQUVDLEtBQUssRUFBRTtBQUFLLENBQUMsRUFDM0I7RUFBRUQsSUFBSSxFQUFFLEdBQUc7RUFBRUMsS0FBSyxFQUFFO0FBQU0sQ0FBQyxFQUMzQjtFQUFFRCxJQUFJLEVBQUUsSUFBSTtFQUFFQyxLQUFLLEVBQUU7QUFBSyxDQUFDLEVBQzNCO0VBQUVELElBQUksRUFBRSxHQUFHO0VBQUVDLEtBQUssRUFBRTtBQUFNLENBQUMsRUFDM0I7RUFBRUQsSUFBSSxFQUFFLElBQUk7RUFBRUMsS0FBSyxFQUFFO0FBQUssQ0FBQyxFQUMzQjtFQUFFRCxJQUFJLEVBQUUsR0FBRztFQUFFQyxLQUFLLEVBQUU7QUFBTSxDQUFDLENBQzVCLENBQUNDLE9BQU8sRUFBRTtBQUVYLFNBQVNDLFFBQVEsQ0FBQ0MsTUFBTSxFQUFFO0VBQ3hCLE1BQU1DLElBQUksR0FBR0MsUUFBUSxDQUFDQyxhQUFhLENBQUMsS0FBSyxDQUFDO0VBQzFDRixJQUFJLENBQUNHLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLE1BQU0sQ0FBQztFQUUxQixLQUFLLElBQUlDLEdBQUcsR0FBRyxDQUFDLEVBQUVBLEdBQUcsR0FBR2QsUUFBUSxFQUFFYyxHQUFHLEVBQUUsRUFBRTtJQUN2QyxLQUFLLElBQUlDLEdBQUcsR0FBRyxDQUFDLEVBQUVBLEdBQUcsR0FBR2QsUUFBUSxFQUFFYyxHQUFHLEVBQUUsRUFBRTtNQUN2QyxNQUFNQyxJQUFJLEdBQUdOLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLEtBQUssQ0FBQztNQUMxQ0ssSUFBSSxDQUFDSixTQUFTLENBQUNDLEdBQUcsQ0FBQyxNQUFNLENBQUM7TUFDMUJHLElBQUksQ0FBQ0MsT0FBTyxDQUFDYixJQUFJLEdBQUdELElBQUksQ0FBQ1csR0FBRyxDQUFDLENBQUNWLElBQUk7TUFDbENZLElBQUksQ0FBQ0MsT0FBTyxDQUFDVCxNQUFNLEdBQUdBLE1BQU07TUFDNUIsSUFBSUwsSUFBSSxDQUFDVyxHQUFHLENBQUMsQ0FBQ1QsS0FBSyxFQUFFO1FBQ25CVyxJQUFJLENBQUNKLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLE9BQU8sQ0FBQztNQUM3QjtNQUVBRyxJQUFJLENBQUNFLGdCQUFnQixDQUFDLFdBQVcsRUFBR0MsQ0FBQyxJQUFLO1FBQ3hDLE1BQU1mLElBQUksR0FBR2UsQ0FBQyxDQUFDQyxNQUFNLENBQUNILE9BQU8sQ0FBQ2IsSUFBSTtRQUNsQyxNQUFNSSxNQUFNLEdBQUdXLENBQUMsQ0FBQ0MsTUFBTSxDQUFDSCxPQUFPLENBQUNULE1BQU07UUFDdENhLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDbEIsSUFBSSxHQUFHSSxNQUFNLENBQUM7TUFDNUIsQ0FBQyxDQUFDO01BQ0ZDLElBQUksQ0FBQ2MsTUFBTSxDQUFDUCxJQUFJLENBQUM7SUFDbkI7RUFDRjtFQUNBLE9BQU9QLElBQUk7QUFDYjtBQUNBLE1BQU1lLGNBQWMsR0FBR2QsUUFBUSxDQUFDZSxjQUFjLENBQUMsaUJBQWlCLENBQUM7QUFDakUsTUFBTUMsU0FBUyxHQUFHaEIsUUFBUSxDQUFDQyxhQUFhLENBQUMsS0FBSyxDQUFDO0FBQy9DZSxTQUFTLENBQUNDLFlBQVksQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDO0FBQ3pDLE1BQU1sQixJQUFJLEdBQUdGLFFBQVEsQ0FBQyxDQUFDLENBQUM7QUFDeEJtQixTQUFTLENBQUNILE1BQU0sQ0FBQ2QsSUFBSSxDQUFDO0FBQ3RCZSxjQUFjLENBQUNELE1BQU0sQ0FBQ0csU0FBUyxDQUFDIn0=\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ }),

/***/ "./src/index.scss":
/*!************************!*\
  !*** ./src/index.scss ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguc2Nzcy5qcyIsIm1hcHBpbmdzIjoiO0FBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qc190ZXN0Ly4vc3JjL2luZGV4LnNjc3M/OTc0NSJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/index.scss\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	__webpack_modules__["./src/index.js"](0, {}, __webpack_require__);
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.scss"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;