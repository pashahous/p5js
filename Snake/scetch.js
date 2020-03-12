let win_width = 400;
let win_height = 400; //
let cell_size = 20; //cell size
function setup() {
    createCanvas(win_width, win_height);
    s = new Snake();
    frameRate(10);
}

function draw() {
    background(51);
    draw_grid();
    // Snake.dir()
    s.update();
    s.draw();
}

function draw_grid() { //  рисуем сетку
    for (let x = 0; x <= win_width; x += cell_size) {
        fill(255, 0, 0);
        line(x, 0, x, win_height);
    }
    for (let y = 0; y <= win_height; y += cell_size) {
        fill(255, 0, 0);
        line(0, y, win_width, y);
    }
}

function keyPressed() {
    if (keyCode === UP_ARROW) { s.dir(0, -1) };
    if (keyCode === DOWN_ARROW) { s.dir(0, 1) };
    if (keyCode === RIGHT_ARROW) { s.dir(1, 0) };
    if (keyCode === LEFT_ARROW) { s.dir(-1, 0) };
}
function Food() {    // класс еды


}

function Snake() {  // класс змеи
    this.x = 0;
    this.y = 0;

    this.xspeed = 1;
    this.yspeed = 0;

    this.dir = function (x, y) {
        this.xspeed = x;
        this.yspeed = y;
    }

    this.update = function () {
        this.x = this.x + this.xspeed * cell_size;
        this.y = this.y + this.yspeed * cell_size;
        if (this.x < 0) { this.x = 0; }
        if (this.x > win_width) { this.x = win_width - cell_size };
        if (this.y < 0) { this.y = 0 };
        if (this.y > win_height) { this.y = win_height - cell_size };
    }
    this.draw = function () {
        fill(255);
        rect(this.x, this.y, cell_size, cell_size);

    }
}