let win_width = 400;
let win_height = 400; //
let cell_size = 20; //cell size
let run = true;
var food;


function setup() {
    createCanvas(win_width, win_height);
    s = new Snake();
    food = createVector(Math.floor(random(win_width / cell_size)) * cell_size, Math.floor(random(win_height / cell_size)) * cell_size);
    frameRate(8);
}

function creat_food() {
    food = createVector(Math.floor(random(win_width / cell_size)) * cell_size, Math.floor(random(win_height / cell_size)) * cell_size);

}

////////////////////////////////////DRAW
function draw() {
    background(51);
    draw_grid();

    s.update();
    s.checkCollision();
    if (s.eat(food)) {
        creat_food();
    }
    s.draw();

    // console.log('GAME OVER');
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


function keyPressed() {  // отслеживание нажатий клавиш
    if (keyCode === UP_ARROW) { s.dir(0, -1); }
    if (keyCode === DOWN_ARROW) { s.dir(0, 1); }
    if (keyCode === RIGHT_ARROW) { s.dir(1, 0); }
    if (keyCode === LEFT_ARROW) { s.dir(-1, 0); }
}


function distanse(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function Snake(n = 0) {  // класс змеи,  n - длинна хвоста
    this.x = 0;
    this.y = 0;

    this.xspeed = 1;
    this.yspeed = 0;

    this.total = n; // длинна змейки
    this.tail = []; // массив для хвоста змейки 
    if (this.total >= 1) {
        for (var i = 0; i < this.total; i++) {

            this.tail[i] = createVector(this.x, this.y);
        }
    }

    this.dir = function (x, y) {
        this.xspeed = x;
        this.yspeed = y;
    }

    this.update = function () {
        if (this.total === this.tail.length) {
            for (var i = 0; i < this.tail.length - 1; i++) {
                this.tail[i] = this.tail[i + 1];
            }
        }

        this.tail[this.total - 1] = createVector(this.x, this.y);

        this.x = this.x + this.xspeed * cell_size;
        this.y = this.y + this.yspeed * cell_size;


        if (this.x < 0) { this.x = 0; }
        if (this.x > win_width - cell_size) { this.x = win_width - cell_size };
        if (this.y < 0) { this.y = 0 };
        if (this.y > win_height - cell_size) { this.y = win_height - cell_size };
    }

    this.checkCollision = function () {  //проверка столкновения головы с телом
        for (var i = 0; i < this.tail.length; i++) {
            var pos = this.tail[i];
            var d = distanse(this.x, this.y, pos.x, pos.y);
            if (d < 1) {
                this.tail = [];
                this.total = 0;
                console.log('GAME OVER');
            }

        }

    }
    this.eat = function (pos) {   // функция проверяет находится ли голова над едой
        var d = distanse(this.x, this.y, pos.x, pos.y);
        if (d < 1) {
            this.total++;
            return true;
        } else {
            return false;
        }
    }

    this.draw = function () {  // функция отрисовки поля

        fill(255);
        for (i = 0; i < this.tail.length; i++) {

            rect(this.tail[i].x, this.tail[i].y, cell_size, cell_size);
        }
        rect(this.x, this.y, cell_size, cell_size);

        fill(0, 255, 0);
        text(this.x / cell_size + ' ' + this.y / cell_size, this.x, this.y);
        fill(255, 0, 0);
        rect(food.x, food.y, cell_size, cell_size);

    }
}