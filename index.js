const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

const boundaryMap = [];
for (let i = 0; i < collisions.length; i += 50) {
  boundaryMap.push(collisions.slice(i, 50 + i));
}

const offset = {
  x: -1240,
  y: -500,
};

const image = new Image();
image.src = "./imgs/top-down-experimental-map.png";

const playerUpImage = new Image();
playerUpImage.src = "./imgs/elf-player-up.png";

const playerDownImage = new Image();
playerDownImage.src = "./imgs/elf-player-down.png";

const playerLeftImage = new Image();
playerLeftImage.src = "./imgs/elf-player-left.png";

const playerRightImage = new Image();
playerRightImage.src = "./imgs/elf-player-right.png";

const foregroundImage = new Image();
foregroundImage.src = "./imgs/top-down-experimental-map-foreground.png";

const player = new Sprite({
  position: {
    x: canvas.width / 2 - 144 / 3 / 2,
    y: canvas.height / 2,
  },
  image: playerDownImage,
  frames: {
    max: 3,
  },
  sprites: {
    up: playerUpImage,
    down: playerDownImage,
    left: playerLeftImage,
    right: playerRightImage,
  }
});

const background = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: image,
});

const foreground = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: foregroundImage,
});

const keys = {
  ArrowUp: {
    pressed: false,
  },
  ArrowDown: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
};

const boundaries = [];

boundaryMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 632)
      boundaries.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
        })
      );
  });
});

const movables = [background, ...boundaries, foreground];

function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y
  );
}

function animate() {
  window.requestAnimationFrame(animate);
  background.draw();
  boundaries.forEach((boundary) => {
    boundary.draw();
    if (
      rectangularCollision({
        rectangle1: player,
        rectangle2: boundary,
      })
    ) {
      console.log("colliding");
    }
  });
  player.draw();
  foreground.draw();

  let moving = true;
  player.moving = false;

  if (keys.ArrowUp.pressed && lastKey === "ArrowUp") {
    player.moving = true;
    player.image = player.sprites.up;
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y + 2,
            },
          },
        })
      ) {
        moving = false;
        break;
      }
    }
    if (moving)
      movables.forEach((movable) => {
        movable.position.y += 3;
      });
  } else if (keys.ArrowDown.pressed && lastKey === "ArrowDown") {
    player.moving = true;
    player.image = player.sprites.down;
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y - 2,
            },
          },
        })
      ) {
        moving = false;
        break;
      }
    }
    if (moving) movables.forEach((movable) => (movable.position.y -= 3));
  } else if (keys.ArrowLeft.pressed && lastKey === "ArrowLeft") {
    player.moving = true;
    player.image = player.sprites.left;
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x + 3,
              y: boundary.position.y,
            },
          },
        })
      ) {
        moving = false;
        break;
      }
    }
    if (moving) movables.forEach((movable) => (movable.position.x += 3));
  } else if (keys.ArrowRight.pressed && lastKey === "ArrowRight") {
    player.moving = true;
    player.image = player.sprites.right;
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x - 3,
              y: boundary.position.y,
            },
          },
        })
      ) {
        moving = false;
        break;
      }
    }
    if (moving) movables.forEach((movable) => (movable.position.x -= 3));
  }
}

animate();

let lastKey = "";
window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      keys.ArrowUp.pressed = true;
      lastKey = "ArrowUp";
      break;

    case "ArrowDown":
      keys.ArrowDown.pressed = true;
      lastKey = "ArrowDown";
      break;

    case "ArrowLeft":
      keys.ArrowLeft.pressed = true;
      lastKey = "ArrowLeft";
      break;

    case "ArrowRight":
      keys.ArrowRight.pressed = true;
      lastKey = "ArrowRight";
      break;
  }
});

window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "ArrowUp":
      keys.ArrowUp.pressed = false;
      break;

    case "ArrowDown":
      keys.ArrowDown.pressed = false;
      break;

    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      break;

    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      break;
  }
});
