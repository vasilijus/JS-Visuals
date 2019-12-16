(function(){
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    let w = canvas.width    = innerWidth;
    let h = canvas.height   = innerHeight;

    let dotsList;
    canvas.style.background = 'rgba(17,17,23,1)';

    document.querySelector('body').appendChild(canvas);

    class Dot{
        constructor(){
            this.x = w / 2;
            this.h = h / 2;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, 30, 0, Math.PI * 2, false); // x, y, radius , startAngle 0 radius , endAngle 2*PI radius , (anticlockwise:bool)
            ctx.closePath();
            ctx.fillStyle = 'red';
            ctx.fill();
        }
    }
    
    dotsList = [new Dot()];
    dotsList[0].draw();
})()