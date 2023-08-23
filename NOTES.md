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
```
const offset = {
    x: -1240,
    y: -450,
};
```

Declare Sprite Class With Constructor (what to put) and draw (where to put) Functions:
```
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
```

Make Background a Sprite:
```
const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y,
    },
    image: image
})
```

Set Keys to False and Add Keyup Function to Stop Movement:

```
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

window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowUp":
          keys.ArrowUp.pressed = true;
          break;
    
        case "ArrowDown":
          keys.ArrowDown.pressed = true;
          break;
    
        case "ArrowLeft":
          keys.ArrowLeft.pressed = true;
          break;
    
        case "ArrowRight":
          keys.ArrowRight.pressed = true;
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
```

Declare and Call Animate Function With If Statement to Move Background on Keydown Event:
```
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

    if (keys.ArrowUp.pressed) {
        background.position.y += 3
    } else if (keys.ArrowDown.pressed) {
        background.position.y -= 3
    } else if (keys.ArrowLeft.pressed) {
        background.position.x += 3
    } else if (keys.ArrowRight.pressed) {
        background.position.x -= 3
    }
};

animate();
```

Alter Code to Use Last Key Pressed With New Let and Altered If Statement:

```
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
```