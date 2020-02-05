( () => {
    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');

    function init() {
        ctx.height = window.height;
        ctx.width   = window.width;
    }
} )();