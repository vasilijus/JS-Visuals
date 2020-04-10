(() => {
    
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    let cw, ch, cx, cy;

    function resizeCanvas() {
        cw = canvas.width = innerWidth;
        ch = canvas.height= innerHeight;
        cx = cw / 2;
        cy = ch / 2;
    }

    window.addEventListener('resize', resizeCanvas() );

    const config = {
        hue         : `0`,
        bgFillColor : `rgba(50,50,50,.05)`,
        dirsCount   : 6,
        stepsToTurn : 10,
        dotSize     : 3,
        dotsCount   : 300,
        dotVelocity : 2, //  dot movesdistance
        distance    : 170, // dot dies
        gradientlen : 15,
        gridAngle   : 45,
    }

    function drawRect(color, x, y, w, h, shadowColor, shadowBlur, gco) {
        ctx.globalCompositeOperation    = gco;
        ctx.shadowColor                 = shadowColor || 'black';
        ctx.shadowBlur                  = shadowBlur  || 1 ;
        ctx.fillStyle                   = color;
        ctx.fillRect(x, y, w, h);
    }

    class Dot {
        constructor() {
            this.pos    = { x: cx, y: cy }; // ch
            // instead of shooting in 6 directions,  we put them in 3
            this.dir    = config.dirsCount === 6 ? (Math.random() * 3 | 0) * 2 : Math.random() * config.dirsCount | 0;
            this.step   = 0;
        }

        redrawDot() {
            let xy      = Math.abs(this.pos.x - cx) + Math.abs(this.pos.y - cy);
            let makeHue = (config.hue + xy / config.gradientlen) % 360;
            let color   = `hsl(${ makeHue }, 100%, 50%)`;
            let size    = config.dotSize - Math.sin(xy / 9) * 2 - Math.sin(xy / 2);
            let blur    = config.dotSize - Math.sin(xy / 8) * 2 - Math.sin(xy / 2);
            let x       = this.pos.x - size / 2;
            let y       = this.pos.y - size / 2;

            drawRect(color, x, y, size, size, color, blur);
        }

        moveDot() {
            this.step++;
            this.pos.x  += dirsList[this.dir].x * config.dotVelocity;
            this.pos.y  += dirsList[this.dir].y * config.dotVelocity; // config.dotVelocity -1
        }

        changeDir() {
            if( this.step % config.stepsToTurn === 0 ) {
                // console.log('change dir')
                this.dir = Math.random() > 0.5 ? (this.dir + 1) % config.dirsCount : (this.dir + config.dirsCount - 1) % config.dirsCount;
            }
        }

        killDot(id) {
            let percent = Math.random() * Math.exp(this.step / config.distance);
            if( percent > 100 ) {
                dotsList.splice(id, 1);
            }
        }
    }

    let dirsList = [];
    function createDirs() {
        for (let i = 0; i < 360; i += 360 / config.dirsCount) {
            let angle = config.gridAngle + i;
            let x = Math.cos(angle * Math.PI / 180);
            let y = Math.sin(angle * Math.PI / 180);
            dirsList.push({x: x, y: y});
        }
    }
    createDirs();


    let dotsList = [];
    function addDots() {
        if( dotsList.length < config.dotsCount ) {
            dotsList.push( new Dot() );
            config.hue = (config.hue + 1) % 360;
            // console.log(dotsList.length);
        }
    }
    

    function refreshDots() {
        dotsList.forEach(( el, id )=> {
            el.moveDot();
            el.redrawDot();
            el.changeDir();
            el.killDot(id);
        })
    }

    // let dot = new Dot();


    function loop() {
        drawRect(config.bgFillColor, 0, 0, cw, ch, 0, 0, `normal`);
        addDots();
        refreshDots();

        requestAnimationFrame(loop);
    }
    loop();

})();

// Math.cos(0);           // 1
// Math.cos(1);           // 0.5403023058681398

// Math.cos(Math.PI);     // -1
// Math.cos(2 * Math.PI); // 1

// Math.sin(0);           // 0
// Math.sin(1);           // 0.8414709848078965

// Math.sin(Math.PI / 2); // 1