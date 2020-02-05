( () => {
    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');

    function init() {                                   // Step 1
        canvas.height  = innerHeight;
        canvas.width   = innerWidth;
        console.info('screen updated');
    }
    init();

    const numOfRings    = 1;
    let angleStart      = 0;
    function updateRings() {                            // Step 4
        for ( let i = 0; i < numOfRings ; i++ ) {
            drawRing();
        }
        angleStart++;
        angleStart >= 360? angleStart = 0 : angleStart++;
    }

    const centerX = canvas.width /2;
    const centerY = canvas.height/2;
    const maxWaveAplitude = 17;
    const ringRadius = 200;

    function drawRing() {                               // Step 5
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(centerX,centerY);
        for( let j = -180; j < 180; j++ ) {
            let currentAngle = (j + angleStart) * Math.PI / 180; // (degrees to radians formula)
            let displacement = 0;
            let now = Math.abs(j);
            
            if ( now > 70 ) {
                displacement = (now-70) / 70;
            }
            if ( displacement >= 1 ) {
                displacement = 1;
            }

            let waveAmplitude = ringRadius + displacement * Math.sin(currentAngle * 7) * maxWaveAplitude;
            let x = centerX + Math.cos(currentAngle) * (waveAmplitude);
            let y = centerY + Math.sin(currentAngle) * (waveAmplitude);

            j > -180 ? ctx.lineTo(x,y) : ctx.moveTo(x,y);
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