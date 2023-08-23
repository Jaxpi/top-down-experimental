const canvas = document.querySelector('canvas');
const c = canvas.getContext("2d");

canvas.width = 1024
canvas.height = 576

c.fillStyle = 'white';
c.fillRect(0, 0, canvas.width, canvas.height);

const image = new Image();
image.src = "./imgs/top-down-experimental-map.png";

const playerImage = new Image();
playerImage.src = "./imgs/elf-player.png";

const offset = {
    x: -1240,
    y: -450,
};

class Sprite {
    constructor({
        position,
        image
    }) {
        this.position = position,
        this.image = image
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y);
    }
}

const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y,
    },
    image: image
})

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

function animate() {
    window.requestAnimationFrame(animate);
    background.draw();
    c.drawImage(
        playerImage,
        0,
        0,
        playerImage.width / 3,
        playerImage.height / 4,
        canvas.width / 2 - (playerImage.width / 3) / 2,
        canvas.height / 2,
        playerImage.width / 3,
        playerImage.height / 4,
    );

    if (keys.ArrowUp.pressed && lastKey === "ArrowUp") {
        background.position.y += 3
    } else if (keys.ArrowDown.pressed && lastKey === "ArrowDown") {
        background.position.y -= 3
    } else if (keys.ArrowLeft.pressed && lastKey === "ArrowLeft") {
        background.position.x += 3
    } else if (keys.ArrowRight.pressed && lastKey === "ArrowRight") {
        background.position.x -= 3
    }
};

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

