class Animation {
    constructor() {
        this.canvas     = null;
        this.context    = null;
    }

    createCanvas() {
        this.canvas     = document.createElement('canvas');
        this.context    = canvas.getContext('2d');
        document.body.appendChild(this.canvas);
    }
}