
const circle1 = createCircle({
    element: document.querySelector('#path-circle'),
    centerX: 5,
    centerY: 5,
    minRadius: 5,
    maxRadius: 20,
    minDuration: 5,
    maxDuration: 20
})


function getRandomInt(min, max) {
  return Math.random() *(max - min + 1) + min;
}

function get2Points( ) {

}

function makeCurbe() {

}

function createCircle(options) {
    // setInterval(function() {
      options.element.setAttribute('r', getRandomInt(options.minRadius, options.maxRadius));
    // }, 1000);
}

