let win_width = 400;
let win_height = 400; //
let cell_size = 20; //cell size
var tail = []; // массив для хвоста змейки 
var food;


function setup() {
    createCanvas(win_width, win_height);
    s = new Snake();
    food = createVector(Math.floor(random(win_width / cell_size)) * cell_size, Math.floor(random(win_height / cell_size)) * cell_size);
    console.log(food.x + ' ' + food.y);
    frameRate(5);
}

function creat_food() {
    food = createVector(Math.floor(random(win_width / cell_size)) * cell_size, Math.floor(random(win_height / cell_size)) * cell_size);

}

////////////////////////////////////DRAW
function draw() {
    background(51);
    draw_grid();
    s.update();
    s.draw();
    if (s.eat(food)) {
        creat_food();
    }
    drawWords(20);
}
/////////////////////////////////GRAW END
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

function drawWords(x) {
    fill(255, 255, 0);
    text('Num of snake' + '1', x, 10);


}
function keyPressed() {  // отслеживание нажатий клавиш
    if (keyCode === UP_ARROW) { s.dir(0, -1); console.log('вверх'); }
    if (keyCode === DOWN_ARROW) { s.dir(0, 1); console.log('вниз'); }
    if (keyCode === RIGHT_ARROW) { s.dir(1, 0); console.log('право'); }
    if (keyCode === LEFT_ARROW) { s.dir(-1, 0); console.log('лево'); }
}
function Food() {    // класс еды


}

function distanse(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function Snake() {  // класс змеи
    this.x = 0;
    this.y = 0;

    this.xspeed = 1;
    this.yspeed = 0;

    this.total = 0; // длинна змейки


    this.dir = function (x, y) {
        this.xspeed = x;
        this.yspeed = y;
    }

    this.update = function () {
        this.x = this.x + this.xspeed * cell_size;
        this.y = this.y + this.yspeed * cell_size;
        if (this.x < 0) { this.x = 0; }
        if (this.x > win_width - cell_size) { this.x = win_width - cell_size };
        if (this.y < 0) { this.y = 0 };
        if (this.y > win_height - cell_size) { this.y = win_height - cell_size };
    }


    this.eat = function (pos) {
        var d = distanse(this.x, this.y, pos.x, pos.y);
        if (d < 1) { return true; } else { return false; }
    }

    this.draw = function () {
        fill(255);
        rect(this.x, this.y, cell_size, cell_size);
        fill(0, 255, 0);
        text(this.x / cell_size + ' ' + this.y / cell_size, this.x, this.y);
        fill(255, 0, 0);
        rect(food.x, food.y, cell_size, cell_size);
    }
}