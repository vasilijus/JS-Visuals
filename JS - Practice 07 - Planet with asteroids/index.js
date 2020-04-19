( () => {
    const canvas = document.querySelector('canvas');
    const ctx   = canvas.getContext('2d');

    const config = {
        orbsCount   : 40,
        minVelocity : 0.2,
        ringsCount  : 10,
    }

    let cw, ch, cx, cy, ph; // canvas width, canvas height | part of the height

    function resize() {
        cw = canvas.width = innerWidth;
        ch = canvas.height= innerHeight;
        cx = cw * 0.5;
        cy = ch * 0.5;
        ph = cy * 0.4;
    }

    resize();
    window.addEventListener('resize', resize);

    class Orb {
        constructor() {
            this.size   = 5;
            this.angle  = Math.random() * 360 ;
            this.impact = this.radius / ph;
            this.velocity = config.minVelocity + Math.random() * config.minVelocity;
            this.radius = (Math.random() * config.ringsCount | 0) * ph / config.ringsCount;
        }

        refresh() {
            let radian  = this.angle * Math.PI / 180;
            let cos     = Math.cos(radian);
            let sin     = Math.sin(radian);

            let x = cx + cos * (ph + this.radius);
            let y = cy + sin * (ph + this.radius);

            let optic   = sin * this.size;

            let size    = this.size + optic;

            ctx.fillStyle = `red`;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, 2 * Math.PI);
            ctx.fill();
            this.angle = (this.angle + this.velocity) % 360;
            // ctx.closePath();
        }
    }

    new Orb().refresh();

    let orbsList = [];

    function createStarDust() {
        for ( let i = 0; i < config.orbsCount; i++ ) {
            orbsList.push( new Orb() );
        }
    }
    createStarDust();
    
    function loop() {
        requestAnimationFrame(loop);
        ctx.fillStyle = `rgb(30, 30, 30)`;
        ctx.fillRect(0, 0, cw, ch);
        orbsList.map( el => el.refresh() );
    }
    
    loop();
    debugger

})()