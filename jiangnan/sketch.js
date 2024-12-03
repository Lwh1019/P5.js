let num = 500;
let rain = [];
let bgImage;
let logo;
let logoAlpha = 0;  // Logo的透明度

let word1, word2;

let boat;
let boatX = 0;
let boatY;
let boatSpeed = 2;

let points = [];
let numPoints = 5;
let pointHistory = [];

let other_ponits = [];
let outPoints = 5;
let outH = [];

let hui;
let radius = 0;
let speed = 0.5;
let maxHistoryLength = 10000;



let jiangX = 0, jiangY = 0;
let nanX = 200, nanY = 0;
let daX = 1500, daY = 0;
let xueX = 1920, xueY = 0;

let targetJiangX = 680, targetJiangY = 320;
let targetNanX = 780, targetNanY = 230;
let targetDaX = 940, targetDaY = 230;
let targetXueX = 1060, targetXueY = 320;

let jiangAlpha = 0;
let nanAlpha = 0;
let daAlpha = 0;
let xueAlpha = 0;

let Lx = 300, Ly = 1080;
let Dx = 960, Dy = 540;
let circleAlpha = 0;


function preload() {
    bgImage = loadImage('back.jpg');
    logo = loadImage('word.png');  // 载入logo
    boat = loadImage('boat.png');
    jiang = loadImage('jiang.png');
    nan = loadImage('nan.png');
    da = loadImage('da.png');
    xue = loadImage('xue.png');
    hui = loadImage('hui.png');


    soundFormats('mp3', 'ogg');
    mySound = loadSound('music.ogg');
}

function setup() {
    angleMode(DEGREES);
    createCanvas(1920, 1080);
    boatY = height - boat.height;

    for (let i = 0; i < num; i++) {
        rain[i] = new Raindrop();
    }

    mySound.play();
    mySound.setVolume(0.5);
    boatX = -boat.width;


    for (let i = 0; i < numPoints; i++) {
        points.push({
            t: random(TWO_PI),  // 初始角度
            r: 275,  // 半径
            speed: random(0.2, 0.4),  // 角速度
            id: random() > 0.5 ? 1 : -1,  // 随机设置方向
            direction: random() > 0.5 ? 1 : -1,  // 顺时针或逆时针
            startTime: millis(),
        });
        pointHistory.push([]);  // 初始化每个点的历史轨迹
    }
    for (let i = 0; i < outPoints; i++) {
        other_ponits.push({
            t: random(TWO_PI),  // 初始角度
            r: 290,  // 半径
            speed: random(0.2, 0.4),  // 角速度
            id: random() > 0.5 ? 1 : -1,  // 随机设置方向
            direction: random() > 0.5 ? 1 : -1,  // 顺时针或逆时针
            startTime: millis(),
        });
        outH.push([]);  // 初始化每个点的历史轨迹
    }
}

function draw() {
    tint(255);
    blendMode(BLEND);
    image(bgImage, 0, 0, width, height);  // 背景

    push();
    rotate(2);
    for (let i = 0; i < num; i++) {
        rain[i].update();
        rain[i].draw();
    }
    pop();

    blendMode(MULTIPLY);
    let c1 = color(0, 77, 128, 255);
    let c2 = color(178, 200, 209, 0);
    setGradient(0, 0, width, 90, c1, c2);  // 渐变背景

    // 逐渐增加logo的透明度
    logoAlpha = min(logoAlpha + 0.1, 255);
    tint(255, logoAlpha);
    image(logo, logo.width / 2, logo.height / 2);  // logo显示

    // 小船的运动和透明度变化
    boatOpacity = map(boatX, 0, width, 255, 0);
    boatX += boatSpeed;

    tint(255);
    image(boat, boatX, boatY);

    blendMode(BLEND);

    jiangAlpha = min(jiangAlpha + 0.5, 255);
    nanAlpha = min(nanAlpha + 0.5, 255);
    daAlpha = min(daAlpha + 0.5, 255);
    xueAlpha = min(xueAlpha + 0.5, 255);

    jiangX = lerp(jiangX, targetJiangX, 0.01);
    jiangY = lerp(jiangY, targetJiangY, 0.01);
    nanX = lerp(nanX, targetNanX, 0.01);
    nanY = lerp(nanY, targetNanY, 0.01);
    daX = lerp(daX, targetDaX, 0.01);
    daY = lerp(daY, targetDaY, 0.01);
    xueX = lerp(xueX, targetXueX, 0.01);
    xueY = lerp(xueY, targetXueY, 0.01);

    // 渐变显示图像
    tint(255, jiangAlpha);
    image(jiang, jiangX, jiangY);
    tint(255, nanAlpha);
    image(nan, nanX, nanY);
    tint(255, daAlpha);
    image(da, daX, daY);
    tint(255, xueAlpha);
    image(xue, xueX, xueY);


    tint(255);
    if (boatX > 3 * width) {
        boatX = 0 - boat.width;
    }
    blendMode(BLEND);
    fill(0, 93, 125);
    noStroke();

    for (let i = 0; i < points.length; i++) {
        let p = points[i];
        p.t += p.speed * p.direction;
        let x = width / 2 + p.r * cos(p.t);
        let y = height / 2 + p.r * sin(p.t);
        if (pointHistory[i].length < maxHistoryLength) {
            pointHistory[i].push(createVector(x, y));
        }

        for (let j = 0; j < pointHistory[i].length; j++) {
            let alpha = map(j, 0, pointHistory[i].length, 0, 255);
            fill(0, 93, 125);
            ellipse(pointHistory[i][j].x, pointHistory[i][j].y, 10, 10);
        }
        fill(0, 93, 125);
        ellipse(x, y, 10, 10);
    }
    fill(0, 93, 125);
    noStroke();

    for (let i = 0; i < other_ponits.length; i++) {
        let p = other_ponits[i];
        p.t += p.speed * p.direction;
        let x = width / 2 + p.r * cos(p.t);
        let y = height / 2 + p.r * sin(p.t);
        if (outH[i].length < maxHistoryLength) {
            outH[i].push(createVector(x, y));
        }

        for (let j = 0; j < outH[i].length; j++) {
            let alpha = map(j, 0, outH[i].length, 0, 255);
            fill(0, 93, 125);
            ellipse(outH[i][j].x, outH[i][j].y, 3, 3);
        }
        fill(0, 93, 125);
        ellipse(x, y, 3, 3);
    }

    circleAlpha = min(circleAlpha + 1, 255);
    Lx = lerp(Lx, Dx, 0.01);
    Ly = lerp(Ly, Dy, 0.01);
    tint(255, circleAlpha);
    image(hui, Lx - 255, Ly - 255, 510, 510);
}

class Raindrop {
    constructor() {
        this.x = random(width);
        this.y = random(-height);
        this.w = random(1, 2);
        this.h = random(80, 120);
        this.c = color(random(100, 180));
        this.v = random(6, 9);
    }

    update() {
        this.y += this.v;
        if (this.y > height) {
            this.x = random(width);
            this.y = random(-height);
            this.v = random(6, 9);
        }
    }

    draw() {
        fill(this.c);
        noStroke();
        rect(this.x, this.y, this.w, this.h);
    }
}

function setGradient(x, y, w, h, c1, c2) {
    noFill();
    for (let i = y; i <= y + h; i++) {
        let inter = map(i, y, y + h, 0, 1);
        let c = lerpColor(c1, c2, inter);
        stroke(c);
        line(x, i, x + w, i);
    }
}    