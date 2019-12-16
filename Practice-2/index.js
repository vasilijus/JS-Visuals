// (function(){
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

    window.onresize = function(){
        w = canvas.width    = innerWidth;
        h = canvas.height   = innerHeight;
        init();
        loop();
    }

    class Dot{
        constructor(x,y){
            this.x = x;
            this.y = y;
        }

        draw() {
            ctx.beginPath();
            // x, y, radius , startAngle 0 radius , endAngle 2*PI radius , (anticlockwise:bool)
            ctx.arc(this.x, this.y, 40, 0, Math.PI * 2, false); 
            ctx.closePath();
            ctx.fillStyle = 'rgba(255, 0, 0, 1)';
            ctx.fill();
        }
    }
    

    init();
    
    function init(){
        
        dotsList = [];
        const dotsCountX = w / props.spaceDiameter | 0; // Math.floor(w/props.spaceDiameter)
        const dotsCountY = h / props.spaceDiameter | 0;

        const startX = props.spaceDiameter/2+(w - dotsCountX * props.spaceDiameter)/2;
        const startY = props.spaceDiameter/2+(h - dotsCountY * props.spaceDiameter)/2;

        for( let j = 0 ; j < dotsCountY; j++){
            let y = startY + j * props.spaceDiameter;

            for( let i = 0; i < dotsCountX; i++ ){
                let x = startX + i * props.spaceDiameter;
                dotsList.push(new Dot(x, y) );
            }
        }
    }

    loop();
    function loop(){
        for(let a in dotsList){
            dotsList[a].draw();
        }
    }
// })()