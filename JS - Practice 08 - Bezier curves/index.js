const config = {
    waveSpeed   : 1,
    wavesToBlend    : 4,
}

class WaveNoise {
    constructor() {
        this.waveSet = [];
    }
    addWaves( requiredWaves ) {
        for ( let i = 0; i < requiredWaves; ++i ) {
            let randomAngle = Math.random() * 360;
            this.waveSet.push(randomAngle);
        }
    }
    getWave() {
        let blendedWave = 0;
        for ( let e of this.waveSet ) {
            blendedWave += Math.sin( e / 180 * Math.PI );
        }
        return (blendedWave / this.waveSet.length + 1) / 2; // result = 0 - 1 
    }
    update() {
        this.waveSet.forEach( (e, i) => {
            let r = Math.random() * (i + 1) * config.waveSpeed;
            this.waveSet[i] = (e + r) % 360;
        })
    }
}

class Animation {
    constructor() {
        this.canvas         = null;
        this.context        = null;
        this.size           = { w: 0, h: 0, cx: 0, cy: 0 };
        this.controls       = [];
        this.controlsNum    = 3; // x1, y1 ,x2
    }

    init() {
        this.createCanvas();
        this.createControls();
        this.updateAnimation();
    }
    createCanvas() {
        this.canvas     = document.createElement('canvas');
        this.context    = this.canvas.getContext('2d');
        this.setCanvasSize();
        document.body.appendChild(this.canvas);

        window.addEventListener( `resize`,  () => { this.setCanvasSize() } );
    }
    setCanvasSize() {
        this.size.w = this.canvas.width = window.innerWidth;
        this.size.h = this.canvas.height = window.innerHeight;
        this.size.cx= this.size.w / 2;
        this.size.cy= this.size.h / 2;
    }

    createControls() {
        for ( let i = 0; i < this.controlsNum; ++i ) {
            let control = new WaveNoise();
            control.addWaves( config.wavesToBlend );
            this.controls.push( control );
        }
    } // STOPED HERE

    updateCurves() {
        let c = this.controls;
        // console.log( c );
        let _controlX1 = c[0].getWave() * this.size.w;
        let curveParam = {
            startX      : 0,
            startY      : 0,
            control_X1  : _controlX1,
            control_Y1  : 0,
            control_X2  : this.size.cx,
            control_Y2  : this.size.h,
            endX        : this.size.w,
            endY        : this.size.h,
        }
        // console.log(curveParam);
        this.drawCurve( curveParam );
    }

    // Nado zaciklit updateAnimation

    drawCurve({ startX, startY, control_X1, control_Y1, control_X2, control_Y2, endX, endY }) {
        this.context.strokeStyle = `white`;
        this.context.beginPath();
        this.context.moveTo(startX, startY);
        this.context.bezierCurveTo(control_X1, control_Y1, control_X2, control_Y2, endX, endY);
        this.context.stroke();
    }
    updateCanvas() {
        this.context.fillStyle = `rgb(22,22,25)`;
        this.context.fillRect(0, 0, this.size.w, this.size.h);
    }
    updateControls() {
        this.controls.forEach( e => e.update() );
    }
    updateAnimation() {
        this.updateCanvas();
        this.updateCurves();
        
        window.requestAnimationFrame( () => { this.updateAnimation } );

    }
}

document.addEventListener('DOMContentLoaded', function(){
    var Anim =  new Animation();  
    Anim.init();
})

// window.onload = () => {
//     new Animation().init() // issue
// }