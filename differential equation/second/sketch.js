let a = 1;
let b = 1;
let dt = 0.1;
let maxSteps = 5000;

// 定义微分方程系统
function system(z) {
    let x = z[0];
    let y = z[1];
    let dxdt = Math.sin(a * y);
    let dydt = Math.sin(b * x);
    return [dxdt, dydt];
}

// RK4 方法实现
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
    [0, 0],
    [1, 0],
    [0, 1],
    [1, 1],
    [-1, -1],
    [-1, 1],
    [1, -1],
    [-0.5, 0.5],
    [0.5, -0.5],
    [0.3, 0.7],
    [-0.7, -0.3],
    [0.6, -0.6]
];

let trajectories = [];

let scaleFactor = 15;
let offsetX, offsetY;

let cols, rows;

let hueStep = 0.05;

function setup() {
    createCanvas(1200, 800);
    colorMode(HSB, 255);
    background(255);
    strokeWeight(2);
    noFill();

    scaleFactor = 15;
    offsetX = 0;
    offsetY = 0;

    let imageSize = 7 * scaleFactor * 2;
    cols = ceil(width / imageSize);
    rows = ceil(height / imageSize);

    for (let i = 0; i < initialConditions.length; i++) {
        trajectories.push({
            z: initialConditions[i].slice(),
            trajectory: [initialConditions[i].slice()],
            hue: map(i, 0, initialConditions.length, 0, 255)
        });
    }
}

function draw() {
    updateTrajectories();
    for (let i = -1; i < cols; i++) {
        let dy = 0;
        for (let j = 0; j < rows; j++) {
            let d = 0, h = 0;
            if (j % 2 == 1) d = 110;
            if (j % 2 == 1) h = -50;
            if (j % 2 == 0 && j != 0) dy = -100;
            push();
            let xOffset = i * 7 * scaleFactor * 2 + 117 + d;
            let yOffset = j * 7 * scaleFactor * 2 + 117 + h + dy;
            translate(xOffset, yOffset);
            scale(scaleFactor);
            let hueOffset = j * 20 + frameCount * 0.1;
            drawTrajectories(hueOffset);
            pop(); // 恢复坐标系
        }
    }
    let allDone = trajectories.every(traj => traj.trajectory.length >= maxSteps);
    if (allDone) {
        noLoop();
    }
}

function updateTrajectories() {
    for (let traj of trajectories) {
        if (traj.trajectory.length < maxSteps) {
            traj.z = RK4(traj.z, dt);
            traj.trajectory.push(traj.z.slice());
        }
    }
}

function drawTrajectories(hueOffset) {
    for (let traj of trajectories) {
        if (traj.trajectory.length < maxSteps) {
            let x = traj.z[0];
            let y = traj.z[1];

            let dynamicHue = (traj.hue + hueOffset + traj.trajectory.length * hueStep) % 255;

            stroke(dynamicHue, 255, 255, 150);
            ellipse(x, y, 1, 1);
            ellipse(-x, y, 1, 1);
            ellipse(x, -y, 1, 1);
            ellipse(-x, -y, 1, 1);
        }
    }
}
