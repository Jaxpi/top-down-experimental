const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

const boundaryMap = [];
for (let i = 0; i < collisions.length; i += 50) {
  boundaryMap.push(collisions.slice(i, 50 + i));
}

const interactionsMap = [];
for (let i = 0; i < interactionsData.length; i += 50) {
  interactionsMap.push(interactionsData.slice(i, 50 + i));
}

const offset = {
  x: -1240,
  y: -500,
};

const image = new Image();
image.src = "./imgs/top-down-experimental-map.png";

const playerUpImage = new Image();
playerUpImage.src = "./imgs/elf-player-up-sm.png";

const playerDownImage = new Image();
playerDownImage.src = "./imgs/elf-player-down-sm.png";

const playerLeftImage = new Image();
playerLeftImage.src = "./imgs/elf-player-left-sm.png";

const playerRightImage = new Image();
playerRightImage.src = "./imgs/elf-player-right-sm.png";

const foregroundImage = new Image();
foregroundImage.src = "./imgs/top-down-experimental-map-foreground.png";

const player = new Sprite({
  position: {
    x: canvas.width / 2 - 130 / 3 / 2,
    y: canvas.height / 2,
  },
  image: playerDownImage,
  frames: {
    max: 3,
    hold: 10
  },
  sprites: {
    up: playerUpImage,
    down: playerDownImage,
    left: playerLeftImage,
    right: playerRightImage,
  },
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

const interactions = [];

interactionsMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 945)
      interactions.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
        })
      );
  });
});

const movables = [background, ...boundaries, foreground, ...interactions];

function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y
  );
}

const doorway = {
  initiated: false,
};

function animate() {
  const animationID = window.requestAnimationFrame(animate);
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
  interactions.forEach((interactions) => {
    interactions.draw();
  });
  player.draw();
  foreground.draw();

  let moving = true;
  player.animate = false;

  if (doorway.initiated) return;
  if (
    keys.ArrowUp.pressed ||
    keys.ArrowDown.pressed ||
    keys.ArrowLeft.pressed ||
    keys.ArrowRight.pressed
  ) {
    for (let i = 0; i < interactions.length; i++) {
      const interaction = interactions[i];
      const overlappingArea =
        (Math.min(
          player.position.x + player.width,
          interaction.position.x + interaction.width
        ) -
          Math.max(player.position.x, interaction.position.x)) *
        (Math.min(
          player.position.y + player.height,
          interaction.position.y + interaction.height
        ) -
          Math.max(player.position.y, interaction.position.y));
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: interaction,
        }) &&
        overlappingArea > (player.width * player.height) / 2
      ) {
        console.log("doorway");
        window.cancelAnimationFrame(animationID);
        doorway.initiated = true;
        gsap.to("#overlappingDiv", {
          opacity: 1,
          // repeat: 2,
          // yoyo: true,
          duration: 0.4,
          onComplete() {
            gsap.to("#overlappingDiv", {
              opacity: 1,
              duration: 0.4,
              onComplete() {
                animateInteraction();
                gsap.to("#overlappingDiv", {
                  opacity: 0,
                  duration: 0.4,
                });
              }
            });
          },
        });
        break;
      }
    }
  }

  if (keys.ArrowUp.pressed && lastKey === "ArrowUp") {
    player.animate = true;
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
    player.animate = true;
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
    player.animate = true;
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
    player.animate = true;
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

const generalStoreImg = new Image()
generalStoreImg.src = './imgs/general-store-3.jpg'
const generalStoreBackground = new Sprite({
  position: {
    x: 0,
    y:0
  },
  image: generalStoreImg
})

const battleCharImg = new Image()
battleCharImg.src = './imgs/elf-player-up-lg.png'
const darklingImg = new Image()
darklingImg.src = './imgs/darkling-enemy-1.png'
const battleChar = new Sprite({
  position: {
    x: 100,
    y: 220
  },
  image: battleCharImg,
  frames: {
    max: 3,
  }
})
const darkling = new Sprite({
  position: {
    x: 500,
    y: 100
  },
  image: darklingImg,
  frames: {
    max: 3,
    hold: 20
  },
  animate: true
})

function animateInteraction() {
  window.requestAnimationFrame(animateInteraction)
  generalStoreBackground.draw()
  darkling.draw()
  battleChar.draw()
}

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
