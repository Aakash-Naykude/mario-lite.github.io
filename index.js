//get canvas element and crete context
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

let spriteRunLeft = createImage(
  "https://user-images.githubusercontent.com/91772445/151645856-0d940822-3e41-4517-86cf-ed43a3aba95d.png"
);
canvas.width = 1024;
canvas.height = 576;
// console.log(c);
//create player using class
const gravity = 1;
class Player {
  constructor() {
    this.speed = 10;
    this.position = {
      x: 100,
      y: 100,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.width = 80;
    this.height = 100;
    this.image = spriteRunLeft;
    this.frams = 0;
  }
  draw() {
    c.drawImage(
      this.image,
      120 * this.frams,
      0,
      100,
      120,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
  update() {
    this.frams++;
    if (this.frams > 7) {
      this.frams = 0;
    }
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      this.velocity.y += gravity;
    }
  }
}
class Platform {
  constructor({ x, y, image }) {
    this.position = {
      x: x,
      y: y,
    };
    this.image = image;
    this.width = image.width;
    this.height = image.height;
  }
  draw() {
    c.drawImage(this.image, this.position.x, this.position.y);
  }
}
class GenericObject {
  constructor({ x, y, image }) {
    this.position = {
      x: x,
      y: y,
    };
    this.image = image;
    this.width = 5000;
    this.height = 5000;
  }
  draw() {
    c.drawImage(this.image, this.position.x, this.position.y);
  }
}

function createImage(imgSrc) {
  const image = new Image();
  image.src = imgSrc;
  return image;
}
let player = new Player();
let platformimage = createImage(
  "https://media.istockphoto.com/vectors/brick-wall-red-seamless-texture-pattern-background-vector-id1249343673?k=20&m=1249343673&s=612x612&w=0&h=tKMPMkgbxJxyQuYlRdD3H4I_Ph1K1enMGTEqov2LbkY="
);
let backgroundHills = createImage(
  "data:image/jpeg;base64,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"
);
let backgroundJumps = createImage(
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuWNA05l-W2yOv3No2mywC2oR4DuUxifdXNyAcBLVc3PySXXl-fm5LZyrOnRpbPLQv7EI&usqp=CAU"
);
let platforms = [];
let genericObject = [];
let keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
};
let scrollOffset = 0;
function init() {
  player = new Player();
  platformimage = createImage(
    "https://media.istockphoto.com/vectors/brick-wall-red-seamless-texture-pattern-background-vector-id1249343673?k=20&m=1249343673&s=612x612&w=0&h=tKMPMkgbxJxyQuYlRdD3H4I_Ph1K1enMGTEqov2LbkY="
  );
  backgroundHills = createImage(
    "data:image/jpeg;base64,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"
  );
  backgroundJumps = createImage(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuWNA05l-W2yOv3No2mywC2oR4DuUxifdXNyAcBLVc3PySXXl-fm5LZyrOnRpbPLQv7EI&usqp=CAU"
  );
  platforms = [
    new Platform({
      x:
        platformimage.width * 3 +
        450 +
        platformimage.width -
        backgroundJumps.width,
      y: 320,
      image: backgroundJumps,
    }),
    new Platform({
      x: -1,
      y: 470,
      image: platformimage,
    }),
    new Platform({
      x: platformimage.width - 2,
      y: 470,
      image: platformimage,
    }),
    new Platform({
      x: platformimage.width * 2 + 250,
      y: 470,
      image: platformimage,
    }),
    new Platform({
      x: platformimage.width * 3 + 450,
      y: 470,
      image: platformimage,
    }),
    new Platform({
      x: platformimage.width * 4 + 750,
      y: 470,
      image: platformimage,
    }),
    new Platform({
      x: platformimage.width * 5 + 1050,
      y: 470,
      image: platformimage,
    }),
  ];
  genericObject = [
    new GenericObject({
      x: -1,
      y: 325,
      image: backgroundHills,
    }),
    new GenericObject({
      x: 4 * 400,
      y: 325,
      image: backgroundHills,
    }),
  ];
  scrollOffset = 0;
}
function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = "#6096ff";
  c.fillRect(0, 0, canvas.width, canvas.height);
  genericObject.forEach((genericObject) => {
    genericObject.draw();
  });
  player.update();
  platforms.forEach((platform) => {
    platform.draw();
  });
  if (keys.right.pressed && player.position.x < 400) {
    player.velocity.x = player.speed;
  } else if (
    (keys.left.pressed && player.position.x > 100) ||
    (keys.left.pressed && scrollOffset == 0 && player.position.x > 0)
  ) {
    player.velocity.x = -player.speed;
  } else {
    player.velocity.x = 0;
    if (keys.right.pressed) {
      scrollOffset += player.speed;
      platforms.forEach((platform) => {
        platform.position.x -= player.speed;
      });
      genericObject.forEach((genericObject) => {
        genericObject.position.x -= player.speed * 0.66;
      });
    } else if (keys.left.pressed && scrollOffset > 0) {
      scrollOffset -= player.speed;
      platforms.forEach((platform) => {
        platform.position.x += player.speed;
      });
      genericObject.forEach((genericObject) => {
        genericObject.position.x += player.speed * 0.66;
      });
    }
  }
  platforms.forEach((platform) => {
    if (
      player.position.y + player.height <= platform.position.y &&
      player.position.y + player.height + player.velocity.y >=
        platform.position.y &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x + platform.width
    ) {
      player.velocity.y = 0;
    }
  });
  //winning point
  if (scrollOffset > platformimage.width * 5 + 850) {
    console.log("win");
    //alert("Congratulations ! for completing game");
  }
  //lossing point
  if (player.position.y > canvas.height) {
    init();
  }
}
animate();
init();
addEventListener("keydown", ({ keyCode }) => {
  switch (keyCode) {
    case 65:
      console.log("left");
      keys.left.pressed = true;
      break;
    case 83:
      console.log("down");
      break;
    case 68:
      console.log("right");
      keys.right.pressed = true;
      break;
    case 87:
      console.log("up");
      player.velocity.y -= 20;
      break;
  }
  console.log(keys.right.pressed);
});
addEventListener("keyup", ({ keyCode }) => {
  switch (keyCode) {
    case 65:
      console.log("left");
      keys.left.pressed = false;
      break;
    case 83:
      console.log("down");
      break;
    case 68:
      console.log("right");
      keys.right.pressed = false;
      break;
    case 87:
      console.log("up");
      break;
  }
  console.log(keys.right.pressed);
});
