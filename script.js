
const $ = (selector) => document.querySelector(selector);

// Usage:
// Allow direction (e.g., xl, xr, yt, yb)
resibar($(".resizer.left"), $(".left-sidebar"), "xl"); // resize left sidebar

resibar($(".resizer.right"), $(".right-sidebar"), "xr"); // resize right sidebar