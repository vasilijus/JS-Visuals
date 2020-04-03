( () => {

    const config = {
        dotMinRad   : 6,
        dotMaxRad   : 20,
        massFactor  : 0.002,
        defColor    : `rgba(250,30,30,0.60)`,
    }

    const TWO_PI = 2 * Math.PI;

    const canvas = document.querySelector('canvas');
    const ctx    = canvas.getContext("2d");

    let w, h, mouse, dots; // dots = []

    class Dot {
       
        constructor() {
            this.pos    = { x: mouse.x, y: mouse.y }
            this.vel    = { x: 0, y: 0 }
            this.rad    = random( config.dotMinRad, config.dotMaxRad ) 
            this.mass   = this.rad * config.massFactor; 
            this.color  = config.defColor;
        }
        draw() {
            createCircle(this.pos.x, this.pos.y, this.rad, true, this.color );
            createCircle(this.pos.x, this.pos.y, this.rad, false, config.defColor );
        }
    }

    function createCircle(x, y, rad, fill, color) {
        console.log("createCircle-start")
        ctx.fillStyle = ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, rad, 0, TWO_PI );
        ctx.closePath();
        fill ? ctx.fill() : ctx.stroke();
    }

    function random(min, max) {
        console.log("random-start")
        return Math.random() * (max - min) + min;
    }

    function init() {
        console.log("init-start")

        w = canvas.width    = innerWidth;
        h = canvas.height   = innerHeight;

        mouse = { 
            x: w / 2,
            y: h / 2, 
            down: false 
        }

        dots = [];

    }

    function loop() {
        ctx.clearRect(0, 0, w, h);

        if ( mouse.down ) { 
            console.log("mouse down");
            dots.push( new Dot() ); 
        }

        dots.map( el => el.draw() );

        window.requestAnimationFrame(loop);
    }

    init();
    loop();

    function setPos({LayerX, LayerY}) {

        [mouse.x, mouse.y] = [LayerX, LayerY];
    }

    function isDown() {
        console.log("isDown-start")

        mouse.down = !mouse.down;
    }


    canvas.addEventListener('mousemove', setPos );
    canvas.addEventListener('mousedown', isDown );
    canvas.addEventListener('mouseup', isDown );


})();