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
    c.drawImage(image, -1265, -450);
    c.drawImage(
        playerImage,
        0,
        0,
        playerImage.width / 3,
        playerImage.height / 4,
        canvas.width / 2 - playerImage.width / 3,
        canvas.height / 2,
        playerImage.width / 3,
        playerImage.height / 4,
    );
}

// const offset = {
//     x: -1265,
//     y: -450,
//   };