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

image.onload = () => {
    c.drawImage(image, -1240, -450);
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
}

window.addEventListener("keydown", (e) => {
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

// const offset = {
//     x: -1240,
//     y: -450,
//   };