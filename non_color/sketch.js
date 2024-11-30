let points = [];
let out_points = [];
let iner_points = [];
let dd_points = [];
let r = 50;
let speed = 0.02;
let numPoints = 150;
let numPoints_1 = 50;
let numOutPoints = 50;
let numOutPoints_2 = 50;
let delayTime = 100;
var n = 0;
var c = 10;
let d = 0.1;

let ellipses = [];

function setup() {
    createCanvas(750, 750);

    for (let i = 0; i < numPoints; i++) {
        points.push({
            t: random(TWO_PI),
            r: random(30, 120),
            speed: random(0.02, 0.03),
            id: random() > 0.5 ? 1 : -1,
            direction: random() > 0.5 ? 1 : -1,
            startTime: millis(),
        });
    }
    for (let i = 0; i < numOutPoints; i++) {
        out_points.push({
            t: random(TWO_PI),
            r: random(300, 400),
            speed: random(0.01, 0.03),
            id: random() > 0.5 ? 1 : -1,
            direction: random() > 0.5 ? 1 : -1,
            startTime: millis(),
        });
    }
    for (let i = 0; i < numOutPoints_2; i++) {
        dd_points.push({
            t: random(TWO_PI),
            r: random(450, 500),
            speed: random(0.01, 0.03),
            id: random() > 0.5 ? 1 : -1,
            direction: random() > 0.5 ? 1 : -1,
            startTime: millis(),
        });
    }
    for (let i = 0; i < numPoints_1; i++) {
        iner_points.push({
            t: random(TWO_PI),
            r: random(200, 250),
            speed: random(0.01, 0.03),
            id: random() > 0.5 ? 1 : -1,
            direction: random() > 0.5 ? 1 : -1,
            startTime: millis(),
        });
    }



    let radius = 250;
    for (let i = 0; i < 30; i++) {
        let angle = i * (TWO_PI / 30);
        let cx = width / 2 + radius * cos(angle);
        let cy = height / 2 + radius * sin(angle);

        let a = 200;
        let b = 50;
        let ellipseData = {
            cx, cy, a, b, angle, points: []
        };
        for (let j = 0; j < 10; j++) {
            ellipseData.points.push({
                t: random(TWO_PI),
                speed: random(0.01, 0.03),
                direction: random() > 0.5 ? 1 : -1,
                startTime: millis(),
            });
        }
        ellipses.push(ellipseData);
    }

    radius = 400;
    for (let i = 0; i < 20; i++) {
        let angle = i * (TWO_PI / 20);
        let cx = width / 2 + radius * cos(angle);
        let cy = height / 2 + radius * sin(angle);

        let a = 100;
        let b = 50;
        let ellipseData = {
            cx, cy, a, b, angle, points: []
        };
        for (let j = 0; j < 10; j++) {
            ellipseData.points.push({
                t: random(TWO_PI),
                speed: random(0.01, 0.03),
                direction: random() > 0.5 ? 1 : -1,
                startTime: millis(),
            });
        }
        ellipses.push(ellipseData);
    }
    background(255);
    frameRate(100);
}
function draw() {
    var a = n * 137.5;
    var r = c * sqrt(n);
    var x = r * cos(a) + width / 2;
    var y = r * sin(a) + height / 2;

    ellipse(x, y, 10, 10);

    n++;
    if (x < 0 && y < 0) {
        n = 0;
        c = 10 + d;
    }

    for (let i = 0; i < points.length; i++) {
        let p = points[i];
        let x, y;

        if (p.id === 1) {
            if (p.direction === 1) {
                x = width / 2 + p.r * cos(p.t - PI / 2);
                y = height / 2 - p.r + p.r * sin(p.t - PI / 2);
            } else {
                x = width / 2 + p.r * cos(p.t + PI / 2);
                y = height / 2 + p.r + p.r * sin(p.t + PI / 2);
            }
        } else {
            if (p.direction === 1) {
                x = width / 2 - p.r + p.r * sin(p.t - PI / 2);
                y = height / 2 + p.r * cos(p.t - PI / 2);
            } else {
                x = width / 2 + p.r + p.r * sin(p.t + PI / 2);
                y = height / 2 + p.r * cos(p.t + PI / 2);
            }
        }

        ellipse(x, y, 10, 10);

        p.t += p.speed * p.direction;
        if (p.t >= PI) {
            p.t = PI;
            p.direction = -1;
        } else if (p.t >= 2 * PI || p.t <= -PI) {
            p.t = -PI;
            p.direction = 1;
        }
    }

    // 绘制外层轨迹
    for (let i = 0; i < out_points.length; i++) {
        let p = out_points[i];
        let x, y;
        x = width / 2 + p.r * cos(p.t);
        y = height / 2 + p.r * sin(p.t);

        ellipse(x, y, 10, 10);
        p.t += p.speed * p.direction;
    }

    // 绘制最外层轨迹
    for (let i = 0; i < dd_points.length; i++) {
        let p = dd_points[i];
        let x, y;
        x = width / 2 + p.r * cos(p.t);
        y = height / 2 + p.r * sin(p.t);

        ellipse(x, y, 10, 10);
        p.t += p.speed * p.direction;
    }

    for (let i = 0; i < iner_points.length; i++) {
        let p = iner_points[i];
        let x, y;
        x = width / 2 + p.r * cos(p.t);
        y = height / 2 + p.r * sin(p.t);

        ellipse(x, y, 10, 10);
        p.t += p.speed * p.direction;
    }

    for (let e of ellipses) {
        let ellipseAngle = e.angle;

        for (let i = 0; i < e.points.length; i++) {
            let p = e.points[i];
            let x = e.cx + e.a * cos(p.t);
            let y = e.cy + e.b * sin(p.t);
            let x_rot = cos(ellipseAngle + HALF_PI) * (x - e.cx) - sin(ellipseAngle + HALF_PI) * (y - e.cy) + e.cx;
            let y_rot = sin(ellipseAngle + HALF_PI) * (x - e.cx) + cos(ellipseAngle + HALF_PI) * (y - e.cy) + e.cy;

            ellipse(x_rot, y_rot, 10, 10);

            p.t += p.speed * p.direction;
            if (p.t >= TWO_PI) {
                p.t = 0;
            } else if (p.t <= -TWO_PI) {
                p.t = 0;
            }
        }
    }
    // ellipse(mouseX, mouseY, 10, 10);
}