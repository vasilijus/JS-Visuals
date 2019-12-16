(function(){
    const props = {
        spaceDiameter   : 20,
        dotDiameter     : 10,
        waveLength      : 50,
        velocity        : 0.01,
        direction       : 1,
    }
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    let w = canvas.width    = innerWidth;
    let h = canvas.height   = innerHeight;

    let dotsList;

    canvas.style.background = 'rgba(17,17,23,1)';
    canvas.style.backgroundImage = 'linear-gradient(141deg, #9fb8ad 0%, #1fc8db 51%, #2cb5e8 75%)';
    document.querySelector('body').appendChild(canvas);

    window.onresize = function(){
        w = canvas.width    = innerWidth;
        h = canvas.height   = innerHeight;
        init();
    }

    class Dot{
        constructor(x,y){
            this.x = x;
            this.y = y;
            this.radius = props.dotDiameter / 2;
            this.scale = getDistance(x,y)/ props.waveLength;
        }

        update() {
            this.resize();
            this.draw();
        }

        resize() {
            this.scale = this.scale - props.velocity * props.direction;
        }

        draw() {
            let r = this.radius * (1 - Math.abs(Math.sin(this.scale)) );
            ctx.beginPath();
            // x, y, radius , startAngle 0 radius , endAngle 2*PI radius , (anticlockwise:bool)
            ctx.arc(this.x, this.y, r, 0, Math.PI * 2, false); 
            ctx.closePath();
            ctx.fillStyle = 'rgba(210, 210, 210, 1)';
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
        ctx.clearRect(0,0,w,h);
        for(let a in dotsList){
            dotsList[a].update();
        }

        requestAnimationFrame(loop);
    }

    function getDistance(x , y){
        let dx = w /2 -x; // дельта икс и игрик
        let dy = h /2- y;
        return Math.sqrt((dx * dx) + (dy * dy));
    }
})()