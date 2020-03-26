( () => {
    const canvas = document.querySelector('canvas');
    const ctx    = canvas.getContext("2d");

    let w, h, mouse;

    class Dot {
        constructor() {
            this.pos = { 
                x,
                y 
            }
        }
    }

    function init() {
        w = canvas.width = innerWidth;
        h = canvas.height= innerHeight;

        mouse = { 
            x: w /2 ,
            y: h / 2, 
            down: false 
        }

    }

    init();

    
})();