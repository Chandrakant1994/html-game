
px = py = 200;
xv = yv = 0;
grav = 0.5;
holdleft = holdright = false;
onG = false;
plats = [];
obstacles = [];
framesPerSecond = 30;
var platform, plat1, plat2;

window.onload = function () {
    canv = document.getElementById('cv');
    ctx = canv.getContext('2d');
    document.addEventListener("keydown", keyDown);
    document.addEventListener("keyup", keyUp);
    frameNo = 0;
    setInterval(update, 1000 / framesPerSecond);

    drawEverything();
    /* Platform generator */
    plats.push(
        {
            x: 0,
            y: canv.height / 2,
            width: canv.width,
            height: canv.height / 2
        }
    );
}

function update() {
    frameNo++;

    if (holdleft) {
        xv = -3;
    }
    if (holdright) {
        xv = 3;      
    }
    px += xv;
    py += yv;


    if (onG) {
        xv *= 0.8;              // adding friction when onG
    } else {
        yv += grav;            // add gravity while not onG
    }

    onG = false;                //on ground set false by default

    // check whether player is in a platform

    if (px > plats[0].x && px < plats[0].x + plats[0].width && py > plats[0].y && py < plats[0].y + plats[0].height) {
        py = plats[0].y;
        onG = true;
    }
/*    if (frameNo % 5 == 0) {
        obstacles.push = new component(100, (canv.height / 2) - 200, "#ecf0f1", 100, 10);
    }

    for(i = 0 ; i< obstacles.length ; i++){
        obstacles[i].x += 3;
        obstacles[i].update();
    }*/

    background.update();
    platform.update();
    //player.newPos();
    player.update();
    
    //drawEverything();

}

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.x = x;
    this.y = y;
    this.update = function () {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.width, this.height, this.x, this.y);
    };
    this.newPos = function() {
        this.x += this.xv;
        this.y += this.yv;        
    }
}

function drawEverything() {
    /*    background = new Image();
        background.src = "./background.png";
        ctx.drawImage(background, 0, 0, 800, 600)
    */
    background = new component(0, 0, "#3498db", 800, 600);
    background.update();
    

    platform = new component(0, canv.height / 2, "#ecf0f1", canv.width, canv.height / 2)
    platform.update();

    player = new component(px - 5, py - 20, "#f1c40f", 20, 20);
    player.update();

    plat1 = new component(0, (canv.height / 2) - 100, "#ecf0f1", 100, 10);
}

function keyDown(event) {
    switch (event.keyCode) {
        case 37: holdleft = true;
            break;
        case 38: if (onG) {
            yv = -10;
        }
            break;
        case 39: holdright = true;
            break;
    }
}

function keyUp(event) {
    switch (event.keyCode) {
        case 37: holdleft = false;
            break;
        case 38: if (yv < -3) {
            yv = -3;
        }
            break;
        case 39: holdright = false;
            break;
    }
}