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
        bgFillColor : `rgba(50,50,50,.05)`,
        dirsCount   : 6,
        stepsToTurn : 14,
    }

    function drawRect(color, x, y, w, h, shadowColor, shadowBlur) {
        ctx.shadowColor     = shadowColor || 'black';
        ctx.shadowBlur      = shadowBlur  || 1 ;
        ctx.fillStyle   = color;
        ctx.fillRect(x, y, w, h);
    }

    class Dot {
        constructor() {
            this.pos    = { x: cx, y: cy };
            this.dir    = Math.random() * 6 | 0;
            this.step   = 0;
        }

        redrawDot() {
            let color   = `red`;
            let size    = 12;
            let x       = this.pos.x - size / 2;
            let y       = this.pos.y - size / 2;

            drawRect(color, x, y, size, size);
        }

        moveDot() {
            this.step++;
            this.pos.x  += dirsList[this.dir].x;
            this.pos.y  += dirsList[this.dir].y;
        }

        changeDir() {
            if( this.step % config.stepsToTurn === 0 ) {
                console.log('change dir')
                this.dir = Math.random() * 6 | 0;
                // this.dir = Math.random > .5 ? (this.dir + 1) % config.dirsCount : (this.dir + config.dirsCount- 1) % config.dirsCount ;
            }
        }
    }

    let dirsList = [];
    function createDirs() {
        for (let i = 0; i < 360; i += 360 / config.dirsCount) {
            let x = Math.cos(i * Math.PI / 180);
            let y = Math.sin(i * Math.PI / 180);
            dirsList.push({x: x, y: y});
        }
    }
    createDirs();

    let dot = new Dot();


    function loop() {
        // drawRect(config.bgFillColor, 0, 0, cw, ch);
        
        dot.redrawDot();        
        dot.moveDot();
        dot.changeDir();

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