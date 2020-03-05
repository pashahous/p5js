
let win_width = 800;
let win_height = 600;
var cell_size = 20;
var grid = [];
var cols, rows;

var stack = [];
var current; // текущая клетка



function setup() { // функция начальной установки
    createCanvas(win_width, win_height);
    background(50)
    cols = floor(win_width / cell_size)  // вычисление кол колонок в зависимости от размера окна и размера ячейки
    rows = floor(win_height / cell_size) // выч еол строк
    // frameRate(20)
    for (let j = 0; j < rows; j++) {
        for (var i = 0; i < cols; i++) {
            var cell = new Cell(i, j)
            grid.push(cell)
        }

    }

    current = grid[index(0, 0)]; // текущая клетка


}

function index(i, j) { // индекс элмента в одномерном массиве
    if (i < 0 || j < 0 || i > cols - 1 || j > cols - 1) {
        return -1
    }
    return i + j * cols
}

function draw() {  // основная функция рисования
    // grid()
    for (var i = 0; i < grid.length; i++) {
        grid[i].show();
    }

    current.visited = true;
    draw_stack();
    current.highlight();
    //STEP 1
    next = current.checkNeighbors();
    if (next) {
        next.visited = true;
        // STEP 2
        stack.push(current); // кладем текущую ячейку в стек
        // STEP 3
        removeWalls(current, next);
        //STEP 4
        current = next;
    } else if (stack.length > 0) {
        current = stack.pop();
    }

}
function draw_stack() {
    for (var i = 0; i < stack.length; i++) {
        cell = stack[i]
        var x = cell.i * cell_size;
        var y = cell.j * cell_size;
        noStroke();
        fill(0, 255, 0, 100);
        rect(x, y, cell_size, cell_size);

    }
}
function Cell(i, j) {  // Class of Cell
    this.i = i;
    this.j = j;
    this.walls = [true, true, true, true];
    this.visited = false;

    this.checkNeighbors = function () {
        var neighbors = [];
        var top = grid[index(i, j - 1)];
        var right = grid[index(i + 1, j)];
        var bottom = grid[index(i, j + 1)];
        var left = grid[index(i - 1, j)];

        if (top && !top.visited) {
            neighbors.push(top);
        }
        if (right && !right.visited) {
            neighbors.push(right);
        }
        if (bottom && !bottom.visited) {
            neighbors.push(bottom);
        }
        if (left && !left.visited) {
            neighbors.push(left);
        }

        if (neighbors.length > 0) {
            var r = floor(random(0, neighbors.length));
            return neighbors[r];

        } else {
            return undefined;
        }

    }

    this.highlight = function () {  // highlight current cell подсветка текущей клетки
        var x = this.i * cell_size;
        var y = this.j * cell_size;
        noStroke();
        fill(0, 0, 255, 100);
        rect(x, y, cell_size, cell_size);

    }

    this.show = function () {  // функция отрисовки 4х границ  ячейки
        var x = this.i * cell_size;
        var y = this.j * cell_size;
        stroke(255);

        if (this.walls[0]) {
            line(x, y, x + cell_size, y);
        }

        if (this.walls[1]) {
            line(x + cell_size, y, x + cell_size, y + cell_size);
        }

        if (this.walls[2]) {
            line(x + cell_size, y + cell_size, x, y + cell_size);
        }

        if (this.walls[3]) {
            line(x, y + cell_size, x, y);
        }
        if (this.visited) {  //  видимость клетки
            noStroke();
            fill(255, 0, 255, 100);
            rect(x, y, cell_size, cell_size);

        }
    }


}


function removeWalls(a, b) { // функция удаления соседних стен 2х ячеек
    var x = a.i - b.i;
    if (x === 1) {
        a.walls[3] = false;
        b.walls[1] = false;
    } else if (x === -1) {
        a.walls[1] = false;
        b.walls[3] = false;
    }
    var y = a.j - b.j;
    if (y === 1) {
        a.walls[0] = false;
        b.walls[2] = false;
    } else if (y === -1) {
        a.walls[2] = false;
        b.walls[0] = false;
    }
}



