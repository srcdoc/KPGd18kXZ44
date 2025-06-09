(function() {

"use strict";

/**
 * Enables resizable behavior on a specified element by dragging a resizer handle.
 * 
 * @param {HTMLElement} resizer resizer Element used to drag and resize the bar
 * @param {HTMLElement} bar The bar element to resize (e.g., sidebar-(left|right|top|bottom))
 * @param {String} dir The direction of resizing (e.g., xl, xr, yt, yb)
 */
function resibar(resizer, bar, dir) {
  let initPos, initVal, axis = dir.slice(0, 1).toUpperCase(),

  // Store the original cursor style
  initCursor = document.body.style.cursor,

  // Decide property to change: width for 'X', height for 'Y'
  prop = {X: "Width", Y: "Height"}[axis],

  // Check if resizing is from right or bottom (affects calculation direction)
  isRT = /^(?:r|b)$/i.test(dir.slice(1));

  // Function to stop the resize interaction
  function stopResize() {
    document.body.style.cursor = initCursor; // Restore the original cursor

    // Remove event listeners to stop resizing
    document.removeEventListener("mousemove", resize);
    document.removeEventListener("touchmove", resize);
    document.removeEventListener("touchend", stopResize);
    document.removeEventListener("mouseup", stopResize);
  }

  // Function to handle resizing while mouse/touch is moving
  function resize(e) {
    e = e.touches && e.touches[0] || e; // Normalize mouse and touch event

    // Difference from initial position
    let axisVal = e["client" + axis] - initPos;

    // Calculate new value for width/height
    let value = (initVal + (isRT ? -axisVal : axisVal));

    // Apply the new size to the element
    bar.style[prop.toLowerCase()] = value + "px";
  }

  // Function to start resizing interaction
  function startResize(e) {
    e.stopPropagation(); // Prevent event bubbling
    e.preventDefault();  // Prevent default browser behavior
    
    // Set cursor to appropriate resize style
    let cursor = {X: "ew", Y: "ns"}[axis] + "-resize";
    document.body.style.cursor = cursor;

    e = e.touches && e.touches[0] || e; // Normalize mouse and touch event

    initVal = bar["client" + prop]; // Get initial width or height
    initPos = e["client" + axis];   // Get initial mouse/touch position

    // Add listeners to track movement and end of interaction
    document.addEventListener("mousemove", resize);
    document.addEventListener("touchmove", resize);

    document.addEventListener("mouseup", stopResize);
    document.addEventListener("touchend", stopResize);
  }

  // Attach event listeners to the resizer element
  resizer.addEventListener("mousedown", startResize);
  resizer.addEventListener("touchstart", startResize, {passive: false});
}


window.resibar = resibar;
})();