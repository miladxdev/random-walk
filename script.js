let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ctx = canvas.getContext("2d");

class Pixel {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.opacity = 1;
    this.hue = 255;
  }

  draw() {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = `hsla(${this.hue}, 100%, 40%, ${this.opacity})`;
    ctx.fill();
    ctx.closePath();

    this.update();
  }

  update() {
    this.opacity -= 0.0005;
    this.hue++;
  }
}

let pixels = [];

let pixel_size = 8;
let offset = 0;

let x = canvas.width / 2;
let y = canvas.height / 2;

function createPixel() {
  if (Math.random() < 0.5) {
    if (Math.random() < 0.5) {
      x += pixel_size + offset;
    } else {
      x -= pixel_size + offset;
    }
  } else {
    if (Math.random() < 0.5) {
      y += pixel_size + offset;
    } else {
      y -= pixel_size + offset;
    }
  }

  pixels.push(new Pixel(x, y, pixel_size, pixel_size));

  for (let i = 0; i < pixels.length; i++) {
    pixels[i].draw();

    if (pixels[i].opacity < 0) {
      pixels.shift();
    }
  }

  console.log(pixels.length);
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  createPixel();
}

let interval = setInterval(render, 1);
