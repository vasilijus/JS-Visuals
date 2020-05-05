class Animation {
    constructor() {
        this.canvas     = null;
        this.context    = null;
        this.size       = { w: 0, h: 0, cx: 0, cy: 0 }
    }

    init() {
        this.createCanvas();
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
    UpdateCurves() {
        let curveParam = {
            startX      : 0,
            startY      : 0,
            control_X1  : this.size.cx,
            control_Y1  : 0,
            control_X2  : this.size.cx,
            control_Y2  : this.size.h,
            endX        : this.size.w,
            endY        : this.size.h,
        }
        this.drawCurve( curveParam );
    }
}

document.addEventListener('DOMContentLoaded', function(){
    var Anim =  new Animation();  
    Anim.init();
})

// window.onload = () => {
//     new Animation().init() // issue
// }