(function(){
    const props = {
        spaceDiameter   : 80,
    }
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    let w = canvas.width    = innerWidth;
    let h = canvas.height   = innerHeight;

    let dotsList;

    canvas.style.background = 'rgba(17,17,23,1)';
    document.querySelector('body').appendChild(canvas);

    class Dot{
        constructor(x,y){
            this.x = x;
            this.h = y;
        }

        draw() {
            ctx.beginPath();
            // x, y, radius , startAngle 0 radius , endAngle 2*PI radius , (anticlockwise:bool)
            ctx.arc(w/2, h/2, 30, 0, Math.PI * 2, false); 
            ctx.closePath();
            ctx.fillStyle = 'rgba(255, 0, 0, 1)';
            ctx.fill();
        }
    }
    

    init();
    
    function init(){
        dotsList = [new Dot(0, 0)];
        dotsList[0].draw();
    }
})()