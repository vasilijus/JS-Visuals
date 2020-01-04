// Window Size
var w = svgWidth = window.innerWidth;
var h = svgHeight= window.innerHeight;

var circle = createCircle(document.querySelector('#circle'), {
    centerX: 5,    centerY: 5,
    minRadius: 5, maxRadius: 20,
    x: 40,         y: 50
})
var point1 = createCircle(document.querySelector('#p1'), {
    centerX: 5,    centerY: 5,
    minRadius: 5, maxRadius: 5,
    x: 0+10,         y: getRandomInt(0,svgHeight)
})
var point2 = createCircle(document.querySelector('#p2'), {
    centerX: 5,    centerY: 5,
    minRadius: 5, maxRadius: 5,
    x: svgWidth-10,         y: getRandomInt(0,svgHeight)
})

var p1x = parseFloat(document.getElementById("p1").getAttribute("cx"));
var p1y = parseFloat(document.getElementById("p1").getAttribute("cy"));
var p2x = parseFloat(document.getElementById("p2").getAttribute("cx"));
var p2y = parseFloat(document.getElementById("p2").getAttribute("cy"));

var mpx = (p2x + p1x) * 0.5;
var mpy = (p2y + p1y) * 0.5;
// angle of perpendicular to line:
var theta = Math.atan2(p2y - p1y, p2x - p1x) - Math.PI / 2;

function inOutCurve() {
  var val = Math.floor(Math.random() * 2)? -50 : 50;
  return val;
}
var offset = inOutCurve();

//location of control point 
var c1x = mpx + offset * Math.cos(theta);
var c1y = mpy + offset * Math.sin(theta);

//show control point 
var cp = document.getElementById('cp');
cp.setAttribute('cx', c1x);
cp.setAttribute('cy', c1y);

// draw curve
var curve = "M" + p1x + " " + p1y + " Q " + c1x + " " + c1y + " " + p2x + " " + p2y;
var curveEl = document.getElementById('curve')
curveEl.setAttribute('d', curve);

function getRandomInt(min, max) {
  return Math.random() *(max - min + 1) + min;
}


function createCircle(item, options) {
    // setInterval(function() {
      item.setAttribute('r', getRandomInt(options.minRadius, options.maxRadius));
      item.setAttribute('cx', options.x);
      item.setAttribute('cy', options.y);
    // }, 1000);
}

