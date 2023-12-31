const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
let doorwayNameSpot;

canvas.width = 1024;
canvas.height = 576;

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

const offset = {
  x: -618,
  y: -1240,
};

const enemyBattle = {
  initiated: false,
};

// NAV BAR

let signedIn;
let signInButton = document.querySelector("#signInButton");
signInButton.addEventListener("click", () => {
  if (!signedIn) {
    signInButton.innerHTML = "login";
    signedIn = false;
  } else { signInButton.innerHTML = "logout"; signedIn = true}
});

let mute = true;
let muteButton = document.querySelector("#muteButton");
muteButton.addEventListener("click", () => {
  if (mute) {
    muteButton.innerHTML = "music_note";
    mute = false; audio.Map.play();;
  } else { muteButton.innerHTML = "music_off"; mute = true; audio.Map.stop();}
});

// DATA MAPS

const boundaryMap = [];
for (let i = 0; i < collisions.length; i += 50) {
  boundaryMap.push(collisions.slice(i, 50 + i));
}

const fireEnemyZoneMap = [];
for (let i = 0; i < fireEnemyZoneData.length; i += 50) {
  fireEnemyZoneMap.push(fireEnemyZoneData.slice(i, 50 + i));
}

const iceEnemyZoneMap = [];
for (let i = 0; i < iceEnemyZoneData.length; i += 50) {
  iceEnemyZoneMap.push(iceEnemyZoneData.slice(i, 50 + i));
}

const doorwayNameMap = [];
for (let i = 0; i < doorwaysData.length; i += 50) {
  doorwayNameMap.push(doorwaysData.slice(i, 50 + i));
}

// IMAGES

const worldMapimage = new Image();
worldMapimage.src = "./imgs/world-map-1.png";

const playerUpImage = new Image();
playerUpImage.src = "./imgs/elf-player-up-sm.png";

const playerDownImage = new Image();
playerDownImage.src = "./imgs/elf-player-down-sm.png";

const playerLeftImage = new Image();
playerLeftImage.src = "./imgs/elf-player-left-sm.png";

const playerRightImage = new Image();
playerRightImage.src = "./imgs/elf-player-right-sm.png";

const foregroundImage = new Image();
foregroundImage.src = "./imgs/world-map-1-foreground.png";

const hitboxImage = new Image();
hitboxImage.src = "./imgs/hitbox.png";

// SPRITES

const player = new Sprite({
  position: {
    x: canvas.width / 2 - 130 / 3 / 2,
    y: canvas.height / 2,
  },
  image: playerDownImage,
  frames: {
    max: 3,
    hold: 10,
  },
  sprites: {
    up: playerUpImage,
    down: playerDownImage,
    left: playerLeftImage,
    right: playerRightImage,
  },
});

const playerHitBox = new Sprite({
  position: {
    x: player.position.x + 10,
    y: player.position.y + 25,
  },
  image: hitboxImage,
  frames: {
    max: 1,
  },
});

const background = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: worldMapimage,
});

const foreground = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: foregroundImage,
});

// BOUNDARY ARRAYS

const boundaries = [];
boundaryMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 3432)
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

const doorwayName = [];
doorwayNameMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol !== 0) {
      doorwayName.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
          symbol: symbol,
        })
      );
    }
  });
});

const fireEnemyZone = [];
fireEnemyZoneMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 3432)
      fireEnemyZone.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
        })
      );
  });
});

const iceEnemyZone = [];
iceEnemyZoneMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 3432)
      iceEnemyZone.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
        })
      );
  });
});

// MOVABLES

const movables = [
  background,
  ...boundaries,
  foreground,
  ...fireEnemyZone,
  ...iceEnemyZone,
  ...doorwayName,
];

// RECTANGULAR COLLISIONS
// Removing + rectangle2.height will allow character to walk more "into" the doorway before initializing interaction (if the doorway is above the character)

function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y
  );
}

// MAIN WORLD ANIMATE FUNCTION

function animate() {
  const animationID = window.requestAnimationFrame(animate);
  background.draw();

  // DRAW BOUNDARIES AND DETECT COLLISIONS
  boundaries.forEach((boundary) => {
    boundary.draw();
    if (
      rectangularCollision({
        rectangle1: playerHitBox,
        rectangle2: boundary,
      })
    ) {
      console.log("colliding");
    }
  });

  // DRAW OTHERS
  fireEnemyZone.forEach((fireEnemyZone) => {
    fireEnemyZone.draw();
  });
  iceEnemyZone.forEach((iceEnemyZone) => {
    iceEnemyZone.draw();
  });
  doorwayName.forEach((doorwayName) => {
    doorwayName.draw();
  });
  player.draw();
  foreground.draw();
  // playerHitBox.draw();

  let moving = true;
  player.animate = false;

  // BATTLE INITIATION DETECTION
  if (enemyBattle.initiated) return;
  if (
    keys.ArrowUp.pressed ||
    keys.ArrowDown.pressed ||
    keys.ArrowLeft.pressed ||
    keys.ArrowRight.pressed
  ) {
    // FIRE ZONE
    for (let i = 0; i < fireEnemyZone.length; i++) {
      const fireEnemyZoneSpot = fireEnemyZone[i];
      const overlappingFireArea =
        (Math.min(
          player.position.x + player.width,
          fireEnemyZoneSpot.position.x + fireEnemyZoneSpot.width
        ) -
          Math.max(player.position.x, fireEnemyZoneSpot.position.x)) *
        (Math.min(
          player.position.y + player.height,
          fireEnemyZoneSpot.position.y + fireEnemyZoneSpot.height
        ) -
          Math.max(player.position.y, fireEnemyZoneSpot.position.y));
      if (
        rectangularCollision({
          rectangle1: playerHitBox,
          rectangle2: fireEnemyZoneSpot,
        }) &&
        overlappingFireArea > (player.width * player.height) / 2
      ) {
        window.cancelAnimationFrame(animationID);

        audio.Map.stop();
        if (!mute) {
          audio.InitBattle.play();
          audio.Battle.play();
        }

        enemyBattle.initiated = true;
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
                initFireBattle();
                animateFireBattle();
                gsap.to("#overlappingDiv", {
                  opacity: 0,
                  duration: 0.4,
                });
              },
            });
          },
        });
        break;
      }
    }

    // ICE ZONE
    for (let i = 0; i < iceEnemyZone.length; i++) {
      const iceEnemyZoneSpot = iceEnemyZone[i];
      const overlappingIceArea =
        (Math.min(
          player.position.x + player.width,
          iceEnemyZoneSpot.position.x + iceEnemyZoneSpot.width
        ) -
          Math.max(player.position.x, iceEnemyZoneSpot.position.x)) *
        (Math.min(
          player.position.y + player.height,
          iceEnemyZoneSpot.position.y + iceEnemyZoneSpot.height
        ) -
          Math.max(player.position.y, iceEnemyZoneSpot.position.y));
      if (
        rectangularCollision({
          rectangle1: playerHitBox,
          rectangle2: iceEnemyZoneSpot,
        }) &&
        overlappingIceArea > (player.width * player.height) / 2
      ) {
        window.cancelAnimationFrame(animationID);

        audio.Map.stop();
        if (!mute) {
          audio.InitBattle.play();
          audio.Battle.play();
        }

        enemyBattle.initiated = true;
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
                initIceBattle();
                animateIceBattle();
                gsap.to("#overlappingDiv", {
                  opacity: 0,
                  duration: 0.4,
                });
              },
            });
          },
        });
        break;
      }
    }

    // DOORWAYS
    for (let i = 0; i < doorwayName.length; i++) {
      doorwayNameSpot = doorwayName[i];
      const overlappingDoorArea =
        (Math.min(
          player.position.x + player.width,
          doorwayNameSpot.position.x + doorwayNameSpot.width
        ) -
          Math.max(player.position.x, doorwayNameSpot.position.x)) *
        (Math.min(
          player.position.y + player.height,
          doorwayNameSpot.position.y + doorwayNameSpot.height
        ) -
          Math.max(player.position.y, doorwayNameSpot.position.y));
      if (
        rectangularCollision({
          rectangle1: playerHitBox,
          rectangle2: doorwayNameSpot,
        }) &&
        overlappingDoorArea > (player.width * player.height) / 2
      ) {
        window.cancelAnimationFrame(animationID);

        // audio.Map.stop();
        // audio.InitBattle.play(); - replace with doorway enter sound
        // audio.Battle.play(); - replace with doorway specific music
        enemyBattle.initiated = true;
        gsap.to("#overlappingDiv", {
          opacity: 1,
          duration: 0.4,
          onComplete() {
            initDoorway();
            animateDoorway();
            gsap.to("#overlappingDiv", {
              opacity: 0,
              duration: 0.4,
            });
          },
        });
        break;
      }
    }
  }

  // COLLISION ACTIONS
  // UP
  if (keys.ArrowUp.pressed && lastKey === "ArrowUp") {
    player.animate = true;
    player.image = player.sprites.up;
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: playerHitBox,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y + 3,
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
    // DOWN
  } else if (keys.ArrowDown.pressed && lastKey === "ArrowDown") {
    player.animate = true;
    player.image = player.sprites.down;
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: playerHitBox,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y - 3,
            },
          },
        })
      ) {
        moving = false;
        break;
      }
    }
    if (moving) movables.forEach((movable) => (movable.position.y -= 3));
    // LEFT
  } else if (keys.ArrowLeft.pressed && lastKey === "ArrowLeft") {
    player.animate = true;
    player.image = player.sprites.left;
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: playerHitBox,
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
    // RIGHT
  } else if (keys.ArrowRight.pressed && lastKey === "ArrowRight") {
    player.animate = true;
    player.image = player.sprites.right;
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: playerHitBox,
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

// CALL TO ANIMATE

animate();

// LAST KEY DETECTION

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

// KEYUP LISTENER

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

// CALL TO PLAY MAIN WORLD MUSIC

// let clicked = false;
// addEventListener("click", () => {
//   if (!clicked) {
//     audio.Map.play();
//     clicked = true;
//   }
// });
