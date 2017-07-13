
px = py = 200;
xv = yv = 0;
grav = 0.5;
holdleft = holdright = false;
onG = false;
onP = false;
plats = [];
obstacles = [];
framesPerSecond = 40;
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
    player.x += xv;
    player.y += yv;


    if (onG) {
        xv *= 0.8;
        if(onP){
        player.x +=3;
        }              // adding friction when onG
    } else {
        yv += grav;            // add gravity while not onG
    }

    onG = false;                //on ground set false by default

    // check whether player is in a platform
    for(i = 0 ; i < plats.length ; i++){
    if (player.x >= plats[i].x && player.x < (plats[i].x + plats[i].width) && player.y >= plats[i].y && player.y < (plats[i].y + plats[i].height)) {
        player.y = plats[i].y;
        onG = true;
        if(i>0){
        onP = true;
        }
    }
    }
    if (frameNo % 50 == 0) {
        obstacles.push(new component(100, (canv.height / 2) - Math.floor(Math.random()*(300 - 100)), "#ecf0f1", 100, 10));
        obstacles.push(new component(100, (canv.height / 2) - Math.floor(Math.random()*(300 - 100)+100), "black", 3, 3));
    }

    

    background.update();
    ctx.fillStyle = "red";
    ctx.fillRect(300,100,40,40);
    platform.update();
    //player.newPos();
    player.update();

    for(i = 0 ; i< obstacles.length ; i++){
        obstacles[i].x += 3;
        obstacles[i].update();
        plats.push(obstacles[i]);
    }
    
    //drawEverything();

}

function component(x, y, color, width, height) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.update = function () {
        //ctx = canv.getContext('2d');
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;        
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

    player = new component(200, 200, "#f1c40f", 20, -20);
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