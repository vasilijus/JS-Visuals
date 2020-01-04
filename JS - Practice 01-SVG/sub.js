
const circle1 = createCircle({
    element: document.querySelector('#path-circle'),
    centerX: 5,
    centerY: 5,
    minRadius: 5,
    maxRadius: 20,
    minDuration: 5,
    maxDuration: 20
})
const path1 = createPath({
    cx: 10, cy: 10
})

function createPath() {

}

function getRandomInt(min, max) {
  return Math.random() *(max - min + 1) + min;
}


function createCircle(options) {
    // setInterval(function() {
      options.element.setAttribute('r', getRandomInt(options.minRadius, options.maxRadius));
      options.element.setAttribute('cx', 50);
      options.element.setAttribute('cy', 120);
    // }, 1000);
}

