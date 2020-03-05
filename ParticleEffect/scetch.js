
let listOfParticles = [];
numOfParticle = Math.round((window.innerWidth + window.innerHeight) / 20);

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);

    for (let i = 0; i < numOfParticle; i++) {
        listOfParticles.push(new Particle());
    }
}

function draw() {
    background(55, 100, 144);
    listOfParticles.forEach((p, index) => {
        p.draw();
        p.update();
        p.checkConnectParticles(listOfParticles.slice(index));

    });
    chekMouse();
}

function chekMouse() {  // проверка нажатия клавиш, если левая то добавить круг, если правая то удалить
    if (mouseIsPressed == true) {
        if (mouseButton == LEFT) {
            listOfParticles.push(new Particle());
            console.log('push particle')
        }
        else if (mouseButton == RIGHT) {
            listOfParticles.pop();
        }
    }
}


class Particle {
    constructor() {
        // POsition
        this.pos = createVector(random(window.innerWidth), random(window.innerHeight)); // случайная векторная позиция шара
        this.vel = createVector(random(-2, 2), random(-2, 2)) // случайная вектораня скорость шара
        this.size = random(5, 20); // случайный размер шара
        this.color = color(random(0, 255), random(0, 255), random(0, 255)); // случайны цвет шара
    }

    draw() {
        noStroke();
        fill(this.color);
        circle(this.pos.x, this.pos.y, this.size);

    }

    update() {
        this.pos.add(this.vel);
        this.edges();

    }
    edges() {
        if (this.pos.x < 0 || this.pos.x > window.innerWidth) { this.vel.x *= -1 }
        if (this.pos.y < 0 || this.pos.y > window.innerHeight) { this.vel.y *= -1 }

    }

    checkConnectParticles(listOfParticles) {
        listOfParticles.forEach(element => {
            const distance = dist(this.pos.x, this.pos.y, element.pos.x, element.pos.y);
            if (distance < 120) {
                var lineWeight = 1 - distance / 150;

                stroke(255, 255, 255, 100);
                strokeWeight(lineWeight * 5);
                line(this.pos.x, this.pos.y, element.pos.x, element.pos.y);
            }
        });


    }
}
