( () => {
    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');

    function init() {                                   // Step 1
        canvas.height  = innerHeight;
        canvas.width   = innerWidth;
        console.info('screen updated');
    }
    init();

    const numOfRings = 1;

    function updateRings() {                            // Step 4
        for ( let i = 0; i < numOfRings ; i++ ) {
            drawRing();
        }
    }

    const centerX = canvas.width /2;
    const centerY = canvas.height/2;

    function drawRing() {                               // Step 5
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 9;
        ctx.beginPath();
        ctx.moveTo(centerX,centerY);
        for( let j = 0; j < 360; j++ ) {

            // setInterval(function(){
            //     ctx.lineTo(100,300);
            //     console.log(j);
            // },1000)
            
        }
        
        ctx.closePath();
        ctx.stroke();
    }

    function loop() {                                   // Step 3
        canvas.width |= 0; // ctx.clearRect(0, 0, canvas.width, canvas.height) //4
        drawRing() // 2
        requestAnimationFrame(loop); // 1
    }
    loop();

    addEventListener('resize' , init );                 // Step 2

} ) ();