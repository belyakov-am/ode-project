let alpha = 0.3;
let beta = 0.1;
let gamma = 0.7;
let delta = 0.3;
let x_0 = 10;
let y_0 = 5;

let points_count = 1000;
let point_per_tick = 10;
let dt = 0.05;

let points = [];


class Boat {
    constructor(t, x, y) {
        this.t = t;
        this.x = x;
        this.y = y;
    }


    static dx_dt(x, y) {
        return (alpha - beta * y) * x;
    }


    static dy_dt(x, y) {
        return (-gamma + delta * x) * y;
    }


    move_points() {
        let prev_x = this.x;
        let prev_y = this.y;

        this.t += dt;
        this.x += dt * Boat.dx_dt(prev_x, prev_y);
        this.y += dt * Boat.dy_dt(prev_x, prev_y);
    }
}

let boat = null;

function setup() {
    let canvas = createCanvas(704, 704, WEBGL);
    background(0);
    canvas.parent(select("#sketch"));

    colorMode(RGB);

    boat = new Boat(0, x_0, y_0);
}


function draw() {
    background(0);
    scale(8);
    orbitControl();

    for (let i = 0; i < point_per_tick; ++i) {
        points.push(new p5.Vector(boat.t, boat.x, boat.y));
        boat.move_points();
    }

    // while (points.length >= points_count) {
    //     points.shift();
    // }

    noFill();
    stroke(255, 0, 0, 255);
    beginShape();
    for (let i = 0; i < points.length; ++i) {
        vertex(points[i].x, points[i].y, points[i].z);
    }
    endShape();
}