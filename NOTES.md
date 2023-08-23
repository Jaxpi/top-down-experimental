# Notes

## Basic HTML Code for Canvas Game Area:

### Index.html

```
<head>
  <style>
    body {
      background-color: black;
    }
  </style>
</head>

<canvas> </canvas>
<script src="index.js"></script>
```

## Index.js Code Below

## Basic Background Image w/Zoomed-In Area Centered:

### DEFINE CANVAS IN HTML
```
const canvas = document.querySelector('canvas');
const c = canvas.getContext("2d");
```

### DEFINE CANVAS SIZE
```
canvas.width = 1024;
canvas.height = 576;
```

### DEFINE CANVAS APPEARANCE
```
c.fillStyle = 'white';
c.fillRect(0, 0, canvas.width, canvas.height);
```

### DEFINE BACKGROUND IMAGE AND SOURCE
```
const image = new Image();
image.src = "./imgs/top-down-experimental-map.png";
```

### DRAW IMAGE WHEN LOADED AND OFFSET TO BE CENTERED IF LARGER THAN CANVAS DIMENSIONS
```
image.onload = () => {
    c.drawImage(image, -1250, -450);
}
```

## Character Animation:

### Create Character Image and Load After Background Loads
```
const playerImage = new Image();
playerImage.src = "./imgs/elf-player.png";

image.onload = () => {
    c.drawImage(image, -1240, -450);
    c.drawImage(playerImage, canvas.width/2 - playerImage.width/3, canvas.height/2);
}
```
*playerImage.width / number of sprites in that row*

### Create Character Frames and Looping From Sprite Sheet (this example is 3x4)

*c.drawImage(
    playerImage,
    x position to crop,
    y position to crop,
    crop width (playerImage.width / # of sprites in row),
    crop height (playerImage.height / # of sprites in column),
    placement on x axis,
    placement on y axis,
    drawn image width,
    drawn image height
    );*

```
    c.drawImage(
    playerImage,
    0,
    0,
    playerImage.width/3,
    playerImage.height/4,
    canvas.width/2 - (playerImage.width/3 / 2),
    canvas.height/2,
    playerImage.width/3,
    playerImage.height/4
    );
```

### Character Movement

Keydown Event Listener:

```
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
```

Move image.onload Code to Animate Function (add call function to see it on live server):

```
function animate() {
    window.requestAnimationFrame(animate);
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
};

animate();
```

Create Sprite Class to Function as a Reference For All New Created Interactables:


Replace offset coordinates with a constant: