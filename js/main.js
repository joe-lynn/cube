/*
* TODO: MAJOR - Move the start, current spot, map, assignments into the draw functions (keep initialization global) with a new state variable for checking that it is the first time the board is drawn
* TODO: MAJOR - Flashing on lvl 3 is currently throwing a strange js error
* BASIC ARCHITECTURE
* - The game starts by drawing the board in the functions that start with 'draw'. They are called by resizeCanvas()
* - The draw functions first attempt to initialize the level, then define the environment based on the window and add
*   text to the window, then it creates the squares, then places them on the canvas
* - If a move is made, move is called. move first checks what key was pressed, then checks what is in the space in the
*   direction of that key
* - Move then determines whether to flash, then a wall space updates the player location, finish sets the level to the
*   next one, and walls do nothing. They all then redraw the canvas by calling resizeCanvas which calls the draw
*   function
*
*
* */

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

$(window).on('load', function() {
    //Constants
    let map = [];
    let start = [];
    let current = [];
    let shouldFlash = false;
    let canvas = document.getElementById('canvas');

    //Game state
    let currGameLevel = 0;
    let finalLevel = false;
    let hasInitialized = false;

    // resize the canvas to fill browser window dynamically
    window.addEventListener('resize', resizeCanvas, false);
    resizeCanvas();

    //listener for key presses
    document.onkeydown = move;


    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        if(currGameLevel === 0){
            drawTutorial();
        } else if(currGameLevel === 1){
            drawTwo();
        } else if(currGameLevel === 2){
            finalLevel = true;
            drawLess();
        }
    }

    function move(e) {
        var timeout = 150;
        e = e || window.event;
        //left arrow
        if (e.keyCode === 37) {
            //wall
            if(map[current[0]-1][current[1]] === 1){
                //checks that not level tutorial
                if(shouldFlash){
                    flash(1);
                }
                //
                setTimeout(function(){
                    resizeCanvas();
                }, timeout);
                //floor
            } else if(map[current[0]-1][current[1]] === 2){
                //assign the player to the new spot on the map
                current[0] = current[0] - 1;
                if(shouldFlash){
                    flash(2);
                }
                setTimeout(function(){
                    resizeCanvas();
                }, timeout);
                //finish
            } else if(map[current[0]-1][current[1]] === 3){
                if(finalLevel){
                    window.location = "http://arewefullyet.com/images/2013/05/you-win.jpg";
                }
                current = start.slice();
                if(shouldFlash){
                    flash(3);
                }
                currGameLevel += 1;
                hasInitialized = false;
                setTimeout(function(){
                    resizeCanvas();
                }, timeout);
            }
        }
        // up arrow
        else if (e.keyCode === 38) {
            //wall
            if(map[current[0]][current[1] - 1] === 1) {
                if(shouldFlash){
                    flash(1);
                }
                setTimeout(function(){
                    resizeCanvas();
                }, timeout);
                //floor
            } else if(map[current[0]][current[1] - 1] === 2){
                current[1] = current[1] - 1;
                if(shouldFlash){
                    flash(2);
                }
                setTimeout(function(){
                    resizeCanvas();
                }, timeout);
                //finish
            } else if(map[current[0]][current[1] - 1] === 3){
                if(finalLevel){
                    window.location = "http://arewefullyet.com/images/2013/05/you-win.jpg";
                }
                current = start.slice();
                if(shouldFlash){
                    flash(3);
                }
                currGameLevel += 1;
                hasInitialized = false;
                setTimeout(function(){
                    resizeCanvas();
                }, timeout);
            }
        }
        // right arrow
        else if (e.keyCode === 39) {
            //wall
            if(map[current[0] + 1][current[1]] === 1){
                if(shouldFlash){
                    flash(1);
                }
                setTimeout(function(){
                    resizeCanvas();
                }, timeout);
                //floor
            } else if(map[current[0] + 1][current[1]] === 2){
                current[0] = current[0] + 1;
                if(shouldFlash){
                    flash(2);
                }
                setTimeout(function(){
                    resizeCanvas();
                }, timeout);
                //finish
            } else if(map[current[0] + 1][current[1]] === 3){
                if(finalLevel){
                    window.location = "http://arewefullyet.com/images/2013/05/you-win.jpg";
                }
                current = start.slice();
                if(shouldFlash){
                    flash(3);
                }
                currGameLevel += 1;
                hasInitialized = false;
                setTimeout(function(){
                    resizeCanvas();
                }, timeout);
            }
        }
        // down arrow
        else if (e.keyCode === 40) {
            //wall
            if(map[current[0]][current[1] + 1] === 1){
                if(shouldFlash){
                    flash(1);
                }
                setTimeout(function(){
                    resizeCanvas();
                }, timeout);
                //floor
            } else if(map[current[0]][current[1] + 1] === 2){
                current[1] = current[1] + 1;
                if(shouldFlash){
                    flash(2);
                }
                setTimeout(function(){
                    resizeCanvas();
                }, timeout);
                //finish
            } else if(map[current[0]][current[1] + 1] === 3){
                if(finalLevel){
                    window.location = "http://arewefullyet.com/images/2013/05/you-win.jpg";
                }
                current = start.slice();
                if(shouldFlash){
                    flash(3);
                }
                currGameLevel += 1;
                hasInitialized = false;
                setTimeout(function(){
                    resizeCanvas();
                }, timeout);
            }
        }

    }

    function flash(colorInt) {
        //Board and square location definitions
        canvas = document.getElementById('canvas');
        var ctx = canvas.getContext("2d");
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

        var imgData = ctx.createImageData(squareSize,squareSize);
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
        //INITIALIZATION - checks, then initializes
        console.log('has initialized? ' + hasInitialized)
        if(!hasInitialized){
            start = [1, 6];
            current = start.slice();
            shouldFlash = true;
            map = [
                [1, 1, 1, 1, 1, 1, 1, 1],
                [1, 3, 2, 2, 2, 2, 2, 1],
                [1, 1, 1, 1, 1, 1, 1, 1]
            ];
            hasInitialized = true;
        }
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
        //INITIALIZATION - checks, then initializes
        if(!hasInitialized){
            start = [1, 6];
            current = start.slice();
            map = [
                [1, 1, 1, 1, 1, 1, 1, 1],
                [1, 3, 2, 2, 2, 2, 2, 1],
                [1, 1, 1, 1, 1, 1, 1, 1]
            ];
            hasInitialized = true;
        }
        //Board and square location definitions
        var winHeight = window.innerHeight;
        var winWidth = window.innerWidth;
        var squareSize;
        var boardZeroX;
        var boardZeroY;
        var ctx = canvas.getContext("2d");
        //INSTRUCTIONS - check horizontal or vertical screen for instrcutions
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

        //begin board drawing system
        var imgData=ctx.createImageData(squareSize,squareSize);
        var r;
        var g;
        var b;
        for(var i = -5; i < 3; i++){
            for(var j = 0; j < 3; j++){
                var colorInt = map[current[0]-1+j][current[1]-1+i];
                //red
                if( colorInt === 1){
                    r = 255;
                    g = 0;
                    b = 0;
                //yellow
                } else if( colorInt === 2){
                    r = 255;
                    g = 255;
                    b = 0;
                //blue
                } else if(colorInt === 3){
                    r = 0;
                    g = 0;
                    b = 255;
                //green
                } else if(colorInt === 4){
                    r = 0;
                    g = 255;
                    b = 0;
                //clear?
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

    function drawTwo() {
        //INITIALIZATION - checks, then initializes
        if(!hasInitialized){
            start = [1, 6];
            current = start.slice();
            map = [
                [1, 1, 1, 1, 1, 1, 1, 1],
                [1, 3, 2, 2, 2, 2, 2, 1],
                [1, 1, 1, 1, 1, 1, 1, 1]
            ];
            hasInitialized = true;
        }

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
            ctx.fillText("9 squares isn't so bad",winWidth*0.05,winHeight*0.5);

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
