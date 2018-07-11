$(window).on('load', function() {

    //Constants
    let map1 = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    ];
    let badmap = [
        [1, 1, 1, 1, 1],
        [1, 2, 2, 2, 1],
        [1, 2, 2, 2, 1],
        [1, 2, 2, 2, 1],
        [1, 2, 2, 2, 1],
        [1, 2, 2, 2, 1],
        [1, 2, 3, 2, 1],
        [1, 1, 1, 1, 1]
    ];
    let map = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 2, 2, 2, 2, 2, 1],
        [1, 1, 1, 1, 1, 1, 1, 1]
    ];

    let start = [1, 6];
    //var start = [16, 2];
    let current = start.slice();
    let canvas = document.getElementById('canvas');

    //Game state
    let currGameLevel = 0;

    // resize the canvas to fill browser window dynamically
    window.addEventListener('resize', resizeCanvas, false);
    resizeCanvas();
    document.onkeydown = move;


    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        if(currGameLevel === 0){
            drawTutorial();
        } else if(currGameLevel === 1){
            drawLess();
        }
    }

    function move(e) {
        var timeout = 150;
        e = e || window.event;
        if (e.keyCode === 37) {
            // left arrow
            if(map[current[0]-1][current[1]] === 1){
                if(!(currGameLevel === 0)){
                    flash(1);
                }
                setTimeout(function(){
                    resizeCanvas();
                }, timeout);
            } else if(map[current[0]-1][current[1]] === 2){
                current[0] = current[0] - 1;
                if(!(currGameLevel === 0)){
                    flash(2);
                }
                setTimeout(function(){
                    resizeCanvas();
                }, timeout);
            } else if(map[current[0]-1][current[1]] === 3){
                if(currGameLevel === 1){
                    window.location = "http://arewefullyet.com/images/2013/05/you-win.jpg";
                }
                current = start.slice();
                currGameLevel = 1;
                if(!(currGameLevel === 0)){
                    flash(3);
                }
                setTimeout(function(){
                    resizeCanvas();
                }, timeout);
            }
        }
        else if (e.keyCode === 38) {
            // up arrow
            if(map[current[0]][current[1] - 1] === 1) {
                if(!(currGameLevel === 0)){
                    flash(1);
                }
                setTimeout(function(){
                    resizeCanvas();
                }, timeout);
            } else if(map[current[0]][current[1] - 1] === 2){
                current[1] = current[1] - 1;
                if(!(currGameLevel === 0)){
                    flash(2);
                }
                setTimeout(function(){
                    resizeCanvas();
                }, timeout);
            } else if(map[current[0]][current[1] - 1] === 3){
                if(currGameLevel === 1){
                    window.location = "http://arewefullyet.com/images/2013/05/you-win.jpg";
                }
                current = start.slice();
                currGameLevel = 1;
                if(!(currGameLevel === 0)){
                    flash(3);
                }
                setTimeout(function(){
                    resizeCanvas();
                }, timeout);
            }
        }
        else if (e.keyCode === 39) {
            // right arrow
            if(map[current[0] + 1][current[1]] === 1){
                if(!(currGameLevel === 0)){
                    flash(1);
                }
                setTimeout(function(){
                    resizeCanvas();
                }, timeout);
            } else if(map[current[0] + 1][current[1]] === 2){
                current[0] = current[0] + 1;
                if(!(currGameLevel === 0)){
                    flash(2);
                }
                setTimeout(function(){
                    resizeCanvas();
                }, timeout);
            } else if(map[current[0] + 1][current[1]] === 3){
                if(currGameLevel === 1){
                    window.location = "http://arewefullyet.com/images/2013/05/you-win.jpg";
                }
                current = start.slice();
                currGameLevel = 1;
                if(!(currGameLevel === 0)){
                    flash(3);
                }
                setTimeout(function(){
                    resizeCanvas();
                }, timeout);
            }
        }
        else if (e.keyCode === 40) {
            // down arrow
            if(map[current[0]][current[1] + 1] === 1){
                if(!(currGameLevel === 0)){
                    flash(1);
                }
                setTimeout(function(){
                    resizeCanvas();
                }, timeout);
            } else if(map[current[0]][current[1] + 1] === 2){
                current[1] = current[1] + 1;
                if(!(currGameLevel === 0)){
                    flash(2);
                }
                setTimeout(function(){
                    resizeCanvas();
                }, timeout);
            } else if(map[current[0]][current[1] + 1] === 3){
                if(currGameLevel === 1){
                    window.location = "http://arewefullyet.com/images/2013/05/you-win.jpg";
                }
                current = start.slice();
                currGameLevel = 1;
                if(!(currGameLevel === 0)){
                    flash(3);
                }
                setTimeout(function(){
                    resizeCanvas();
                }, timeout);
            }
        }

    }

    function flash(colorInt) {
        //Board and square location definitions
        var winHeight = window.innerHeight;
        var winWidth = window.innerWidth;
        var squareSize;
        var boardZeroX;
        var boardZeroY;
        if(currGameLevel === 0){
            if(winWidth >= winHeight){
                squareSize = winHeight*0.25;
                boardZeroY = winHeight*0.125 + squareSize + (squareSize*0.03);
                boardZeroX = (winWidth*0.5) - (squareSize*1.5) + squareSize + (squareSize*0.03);
            } else {
                squareSize = winWidth*0.25;
                boardZeroX = winWidth*0.125 + squareSize + (squareSize*0.03);
                boardZeroY = (winHeight*0.5) - (squareSize*1.5) + squareSize + (squareSize*0.03);
            }
        } else if(currGameLevel === 1){
            squareSize = Math.min(winHeight/4, winWidth/4);
            boardZeroX = winWidth/2 - (squareSize/2);
            boardZeroY = winHeight/2 - (squareSize/2);
        }

        //begin drawing system
        var ctx = canvas.getContext("2d");
        var imgData=ctx.createImageData(squareSize,squareSize);
        var r;
        var g;
        var b;
        if( colorInt === 1){
            r = 255;
            g = 0;
            b = 0;
        } else if( colorInt === 2){
            r = 255;
            g = 255;
            b = 0;
        } else if(colorInt === 3){
            r = 0;
            g = 0;
            b = 255;
        } else if(colorInt === 4){
            r = 0;
            g = 255;
            b = 0;
        } else {
            r = 0;
            g = 0;
            b = 0;
        }
        for (var k = 0; k < imgData.data.length; k += 4) {
            imgData.data[k] = r;
            imgData.data[k + 1] = g;
            imgData.data[k + 2] = b;
            imgData.data[k + 3] = 255;
        }
        ctx.putImageData(imgData, boardZeroX, boardZeroY);
    }

    function drawLess() {
        //Board and square location definitions
        var winHeight = window.innerHeight;
        var winWidth = window.innerWidth;
        var squareSize = Math.min(winHeight/4, winWidth/4);
        var boardZeroX = winWidth/2 - (squareSize/2);
        var boardZeroY = winHeight/2 - (squareSize/2);

        //begin drawing system
        var ctx = canvas.getContext("2d");
        ctx.font = "30px Impact";
        ctx.fillStyle = "gray";
        ctx.fillText("Hard mode",winWidth*0.05,winHeight*0.5);
        var imgData=ctx.createImageData(squareSize,squareSize);
        for (var k = 0; k < imgData.data.length; k += 4) {
            imgData.data[k] = 0;
            imgData.data[k + 1] = 255;
            imgData.data[k + 2] = 0;
            imgData.data[k + 3] = 255;
        }
        ctx.putImageData(imgData, boardZeroX, boardZeroY);
    }

    function drawTutorial() {
        //Board and square location definitions
        var winHeight = window.innerHeight;
        var winWidth = window.innerWidth;
        var squareSize;
        var boardZeroX;
        var boardZeroY;
        var ctx = canvas.getContext("2d");
        if(winWidth >= winHeight){
            ctx.font = "30px Impact";
            ctx.fillStyle = "gray";
            ctx.fillText("Vision fading... Blue is the way out...",winWidth*0.05,winHeight*0.5);

            let base_image = new Image();
            base_image.src = 'img/keys.png';
            base_image.onload = function(){
                ctx.drawImage(base_image, winWidth*0.075, winHeight*0.55);
            };

            squareSize = (winHeight*0.25)*0.33;
            boardZeroY = (winHeight*0.6);
            boardZeroX = (winWidth*0.5) - (squareSize*1.5);
        } else {
            squareSize = (winHeight*0.25)*0.33;
            boardZeroY = (winHeight*0.6);
            boardZeroX = (winWidth*0.5) - (squareSize*1.5);
        }

        //begin drawing system

        var imgData=ctx.createImageData(squareSize,squareSize);
        var r;
        var g;
        var b;
        for(var i = -5; i < 3; i++){
            for(var j = 0; j < 3; j++){
                var colorInt = map[current[0]-1+j][current[1]-1+i];
                if( colorInt === 1){
                    r = 255;
                    g = 0;
                    b = 0;
                } else if( colorInt === 2){
                    r = 255;
                    g = 255;
                    b = 0;
                } else if(colorInt === 3){
                    r = 0;
                    g = 0;
                    b = 255;
                } else if(colorInt === 4){
                    r = 0;
                    g = 255;
                    b = 0;
                } else {
                    r = 0;
                    g = 0;
                    b = 0;
                }
                //draw middle square green always
                if(i === 1 && j === 1){
                    r = 0;
                    g = 255;
                    b = 0;
                }
                for (var k = 0; k < imgData.data.length; k += 4) {
                    imgData.data[k] = r;
                    imgData.data[k + 1] = g;
                    imgData.data[k + 2] = b;
                    imgData.data[k + 3] = 255;
                }

                ctx.putImageData(imgData, boardZeroX + squareSize*j + (squareSize*j*0.03), boardZeroY + squareSize*i + (squareSize*i*0.03));
            }
        }
    }

    function drawStuff() {
        //Board and square location definitions
        var winHeight = window.innerHeight;
        var winWidth = window.innerWidth;
        var squareSize;
        var boardZeroX;
        var boardZeroY;
        var ctx = canvas.getContext("2d");
        if(winWidth >= winHeight){
            ctx.font = "30px Impact";
            ctx.fillStyle = "gray";
            ctx.fillText("⇧",winWidth*0.0725,winHeight*0.3);
            ctx.fillText("⇦",winWidth*0.05,winHeight*0.3 + (winHeight*0.05));
            ctx.fillText("⇩",winWidth*0.0725,winHeight*0.3 + (winHeight*0.05));
            ctx.fillText("⇨",winWidth*0.09,winHeight*0.3 + (winHeight*0.05));
            ctx.fillText("Easy mode",winWidth*0.05,winHeight*0.5);
            ctx.fillText("Find blue",winWidth*0.05,winHeight*0.55);

            squareSize = winHeight*0.25;
            boardZeroY = winHeight*0.125;
            boardZeroX = (winWidth*0.5) - (squareSize*1.5);
        } else {
            squareSize = winWidth*0.25;
            boardZeroX = winWidth*0.125;
            boardZeroY = (winHeight*0.5) - (squareSize*1.5);
        }

        //begin drawing system

        var imgData=ctx.createImageData(squareSize,squareSize);
        var r;
        var g;
        var b;
        for(var i = 0; i < 3; i++){
            for(var j = 0; j < 3; j++){
                var colorInt = map[current[0]-1+j][current[1]-1+i];
                if( colorInt === 1){
                    r = 255;
                    g = 0;
                    b = 0;
                } else if( colorInt === 2){
                    r = 255;
                    g = 255;
                    b = 0;
                } else if(colorInt === 3){
                    r = 0;
                    g = 0;
                    b = 255;
                } else if(colorInt === 4){
                    r = 0;
                    g = 255;
                    b = 0;
                } else {
                    r = 0;
                    g = 0;
                    b = 0;
                }
                //draw middle square green always
                if(i === 1 && j === 1){
                    r = 0;
                    g = 255;
                    b = 0;
                }
                for (var k = 0; k < imgData.data.length; k += 4) {
                    imgData.data[k] = r;
                    imgData.data[k + 1] = g;
                    imgData.data[k + 2] = b;
                    imgData.data[k + 3] = 255;
                }

                ctx.putImageData(imgData, boardZeroX + squareSize*j + (squareSize*j*0.03), boardZeroY + squareSize*i + (squareSize*i*0.03));
            }
        }

    }
});
