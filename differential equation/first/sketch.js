let a = 1;
let b = 1;
let dt = 0.1;
let maxSteps = 50000;

function system(z) {
    let x = z[0];
    let y = z[1];
    let dxdt = Math.sin(a * y);
    let dydt = Math.sin(b * x);
    return [dxdt, dydt];
}

function RK4(z, dt) {
    let k1 = system(z).map(v => v * dt);
    let z1 = [z[0] + k1[0] / 2, z[1] + k1[1] / 2];

    let k2 = system(z1).map(v => v * dt);
    let z2 = [z[0] + k2[0] / 2, z[1] + k2[1] / 2];

    let k3 = system(z2).map(v => v * dt);
    let z3 = [z[0] + k3[0], z[1] + k3[1]];

    let k4 = system(z3).map(v => v * dt);

    let newZ = [
        z[0] + (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]) / 6,
        z[1] + (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1]) / 6
    ];

    return newZ;
}

let initialConditions = [
    [0, 1],
    [0.3, 0.7],
    [0.1, 1.2],
    [1, 4.2],
    [1, 3],
    [1, 4],
    [1, 4.5],
    [1, 5],
    [0, 0.5],
    [0, 0.4]
];

let trajectories = [];

function setup() {
    createCanvas(800, 800);
    colorMode(HSB, 255);
    background(200);
    frameRate(45);
    for (let i = 0; i < initialConditions.length; i++) {
        trajectories.push({
            z: initialConditions[i].slice(),
            trajectory: [initialConditions[i].slice()],
            hue: map(i, 0, initialConditions.length, 30, 240),
            step: 0
        });
    }
}

function draw() {
    for (let traj of trajectories) {
        if (traj.trajectory.length < maxSteps) {
            traj.z = RK4(traj.z, dt);
            traj.trajectory.push(traj.z.slice());
            traj.step++;
            let baseSize = 22;
            let amplitude = 3;
            let frequency = TWO_PI / 200;
            let dsize = baseSize + amplitude * sin(frequency * traj.step);


            let xScreen = map(traj.z[0], -10, 10, 0, width);
            let yScreen = map(traj.z[1], -10, 10, height, 0);
            fill(traj.hue, 255, 255, 150);

            ellipse(xScreen, yScreen, dsize, dsize);
            ellipse(xScreen - 460, yScreen, dsize, dsize);
            ellipse(xScreen - 230, yScreen, dsize, dsize);
            ellipse(xScreen + 230, yScreen, dsize, dsize);
            ellipse(xScreen + 460, yScreen, dsize, dsize);
            ellipse(xScreen + 115, yScreen + 170, dsize, dsize);
            ellipse(xScreen - 115, yScreen + 170, dsize, dsize);
            ellipse(xScreen - 345, yScreen + 170, dsize, dsize);
            ellipse(xScreen + 345, yScreen + 170, dsize, dsize);
            ellipse(xScreen + 345, yScreen - 170, dsize, dsize);
            ellipse(xScreen + 115, yScreen - 170, dsize, dsize);
            ellipse(xScreen - 115, yScreen - 170, dsize, dsize);
            ellipse(xScreen - 345, yScreen - 170, dsize, dsize);
            ellipse(xScreen - 230, yScreen + 340, dsize, dsize);
            ellipse(xScreen - 460, yScreen + 340, dsize, dsize);
            ellipse(xScreen + 230, yScreen + 340, dsize, dsize);
            ellipse(xScreen + 460, yScreen + 340, dsize, dsize);
            ellipse(xScreen, yScreen + 340, dsize, dsize);
            ellipse(xScreen + 345, yScreen + 510, dsize, dsize);
            ellipse(xScreen + 115, yScreen + 510, dsize, dsize);
            ellipse(xScreen - 115, yScreen + 510, dsize, dsize);
            ellipse(xScreen - 345, yScreen + 510, dsize, dsize);

            ellipse(xScreen - 230, yScreen - 340, dsize, dsize);
            ellipse(xScreen, yScreen - 340, dsize, dsize);
            ellipse(xScreen + 230, yScreen - 340, dsize, dsize);
        }
    }
    let allDone = trajectories.every(traj => traj.trajectory.length >= maxSteps);
    if (allDone) {
        noLoop();
    }
}
