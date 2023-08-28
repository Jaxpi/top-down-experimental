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

- Create map in Tiled, zoom to desired size, hide boundary and other layers you don't want visible and export as image to app folder


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
- *playerImage.width / number of sprites in that row*

### Create Character Frames and Looping From Sprite Sheet (this example is 3x4)

- *c.drawImage(
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

- Keydown Event Listener:

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

- Move image.onload Code to Animate Function (add call function to see it on live server):

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

- Create Sprite Class to Function as a Reference For All New Created Interactables:

- Replace offset coordinates with a constant:
```
const offset = {
    x: -1240,
    y: -450,
};
```

- Declare Sprite Class With Constructor (what to put) and draw (where to put) Functions:
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

- Make Background a Sprite:
```
const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y,
    },
    image: image
})
```

- Set Keys to False and Add Keyup Function to Stop Movement:

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

- Declare and Call Animate Function With If Statement to Move Background on Keydown Event:
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

- Alter Code to Use Last Key Pressed With New Let and Altered If Statement:

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

### Character Boundaries

- In Tiled, Export As .json File to App Folder
- Open the File and Find the Array Related to Boundaries
- Copy and Paste the Array as a New Const in a New File Called collisions.js in a New Folder Named Data
- Delete fillStyle and fillRect Codes
- Create for loop For Boundaries Array

```
const boundaryMap = [];
for (let i = 0; i < collisions.length; i += 50) {
  boundaryMap.push(collisions.slice(i, 50 + i));
}
```

- Create New Class Called Boundary and Set Width and Height to Tiled Tile Size Times the Zoom Level (tile size is 16 and zoom level is 300% in this example, so width and height are 48 (16x3))
- Create Draw Function to See it in Browser

```
class Boundary {
    static width = 48;
    static height = 48;
    constructor({position}) {
        this.position = position,
        this.width = 48,
        this.height = 48
    }
    draw() {
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}
```

- Create const boundaries to Declare a New Array
- Push Into the Array Wherever There is a Symbol That Denotes a Boundary

```
const boundaries = []

boundaryMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        boundaries.push(new Boundary({
            position: {
                x: j * Boundary.width + offset.x,
                y: i * Boundary.height + offset.y
            }
        }))
    })
})
```

- Draw Boundaries in Animate Function
```
function animate() {
  window.requestAnimationFrame(animate);
    background.draw();
    boundaries.forEach(boundary => {
        boundary.draw()
    });
  c.drawImage(
```

- Tie Boundaries to Map By Creating a Const Called movables and Adding Background and Boundaries to That, Then Altering Key Press if/else Statement to Match
```
const movables = [background, ...boundaries];

if (keys.ArrowUp.pressed && lastKey === "ArrowUp") {
      movables.forEach(movable => movable.position.y += 3);
  } else if (keys.ArrowDown.pressed && lastKey === "ArrowDown") {
    movables.forEach(movable => movable.position.y -= 3);
  } else if (keys.ArrowLeft.pressed && lastKey === "ArrowLeft") {
    movables.forEach(movable => movable.position.x += 3);
  } else if (keys.ArrowRight.pressed && lastKey === "ArrowRight") {
    movables.forEach(movable => movable.position.x -= 3);
```

- Move c.drawImage for Player to the Sprite Class and Change playerImage to this.image
- Add playerImage.height = playerImage.height/4 to have only the first row (need to know how to use 2D sprite sheets to fix this issue properly)
- Create player const as New Sprite With Position X as canvas.width/2 - the width of the sprite sheet being used for that character / # of frames in the row / 2 and Frames With a Max Set to # of Frames in the Row

```
  draw() {
    c.drawImage(
      this.image,
      0,
      0,
      this.image.width / this.frames.max,
      this.image.height,
      this.position.x,
      this.position.y,
      this.image.width / this.frames.max,
      this.image.height
    );
  }
}

const player = new Sprite({
  position: {
    x: canvas.width / 2 - 144 / 3 / 2,
    y: canvas.height / 2,
  },
  image: playerImage,
  frames: {
    max: 3,
  },
});
```

- Create New Rectangular Collisions Function to Hold Properties of Player/Boundary Positions

```
const movables = [background, ...boundaries];

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
    boundary.draw()
    if (
      rectangularCollision({
        rectangle1: player,
        rectangle2: boundary,
      })
    ) {
      console.log("colliding");
    }
  });
```
- Clear Boundary Appearance in Boundary Class

```
 draw() {
    c.fillStyle = "rgba(0, 0, 0, 0)";
```

- Declare Character Interaction With Boundaries

```
let moving = true;

  if (keys.ArrowUp.pressed && lastKey === "ArrowUp") {
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
```

## Foreground Image and New Class File:

### Create Foreground Image

- In Tiled, Have Only the Foreground Objects Layer Visible Then Export as Image at the Same Zoom Level as the Background Image
- Import the Image to the Code and Create a New Sprite for the Foreground Image

```
const foregroundImage = new Image();
image.src = "./imgs/top-down-experimental-map-foreground.png";

const foreground = new Sprite({
    position: {
      x: offset.x,
      y: offset.y,
    },
    image: foregroundImage,
  });
```

### Create New File for Classes:

- In index.html Create a Script Source For classes.js Above index.js

```
<head>
  <style>
    body {
      background-color: black;
    }
  </style>
</head>

<canvas> </canvas>
<script src="data/collisions.js"></script>
<script src="classes.js"></script>
<script src="index.js"></script>
```

- Copy and Paste the Class for Sprite and the Class for Boundary Into the New classes.js file

### Animate Foreground Objects

- Add foreground to the Moveables Array and Add foreground.draw(); to the Animate Function Directly After player.draw();

```
const movables = [background, ...boundaries, foreground];

player.draw();
foreground.draw();
```

## Character Sprite Animation:

### Alter Sprite Class Code to Include Frame Changes

- Change this.frames to Include a val Object
```
    this.frames = { ...frames, val: 0 };
```
- Change Draw Code to Include New Changes in X and Y Positions and Add If Statement to Loop Through Frames
```
  draw() {
    c.drawImage(
      this.image,
      this.frames.val * this.width,
      0,
      this.image.width / this.frames.max,
      this.image.height,
      this.position.x,
      this.position.y,
      this.image.width / this.frames.max,
      this.image.height
    );
    if (this.frames.val < this.frames.max - 1) this.frames.val++
    else this.frames.val = 0;
  }
```

- Slow Down Sprite Frame Animation Loop to Fit Walking Speed
```
    this.frames = { ...frames, val: 0, elapsed: 0 };

        if (this.frames.max > 1) {
      this.frames.elapsed++;
    }
    if (this.frames.elapsed % 10 === 0) {
      if (this.frames.val < this.frames.max - 1) this.frames.val++;
      else this.frames.val = 0;
    }
```

- Add this.moving = false to Sprite Class and Enclose Frame Animation Loop in an If Statement to Only Occur When Moving Above the Frame Loop
```
this.moving = false;

 if (!this.moving) return;
```

### Alter Animation Function to Include moving = true For Player on Keydowns

- Under let moving = true, add player.moving = false
- Inside Each If Statement for Key Press Add player.moving = true as the First Code

```
let moving = true;
    player.moving = false;

  if (keys.ArrowUp.pressed && lastKey === "ArrowUp") {
      player.moving = true;
```

### Alter Animation Function to Include Changing of Image For Different Movement Directions

- Until You Know How to Use 2D Sprite Sheets For This - Create 4 Different Sprite Sheets, One For Each Movement Direction and Add to Game

```
const playerUpImage = new Image();
playerUpImage.src = "./imgs/elf-player-up.png";

const playerDownImage = new Image();
playerDownImage.src = "./imgs/elf-player-down.png";

const playerLeftImage = new Image();
playerLeftImage.src = "./imgs/elf-player-left.png";

const playerRightImage = new Image();
playerRightImage.src = "./imgs/elf-player-right.png";
```

- In Sprite Class, Add Sprites as a New Property
```
class Sprite {
  constructor({ position, image, frames = { max: 1 }, sprites }) {
    this.position = position;
    this.image = image;
    this.frames = { ...frames, val: 0, elapsed: 0 };
    this.image.onload = () => {
      this.width = this.image.width / this.frames.max;
      this.height = this.image.height;
    };
    this.moving = false;
    this.sprites = sprites;
  }
```

- In const player, Add Property Called Sprites and Add the Different Images
```
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
  },
});
```

- In Animate Function, Add Image Property to Each Key Press For the Correct Image Desired
```
  if (keys.ArrowUp.pressed && lastKey === "ArrowUp") {
    player.moving = true;
    player.image = player.sprites.up;
```

## Character Interactions:

### Use Tiled Layer Data in JSON File

- Find the Layer Data Array For BattleZones, Doorways, Etc and Create a New .js File in the Data Folder With a New const For Whatever it is

```
const interactions = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,...
```

### Use New Data Array in index.js File

- Below const boundaryMap, Create a New const For interactionsMap, Keeping Width and Length the Same Since the Map Is The Same Size

```
const interactionsMap = [];
for (let i = 0; i < interactionsData.length; i += 50) {
  interactionsMap.push(interactionsData.slice(i, 50 + i));
}
```
Below the const boundaries and boundaryMap.forEach Codes, Do the Same For Interactions, Making Sure to Use Whatever Symbol Code is in the json File For That Array
- Interactions Will Still Be a New Boundary

```
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
```

- Add interactions to the Moveables Array
```
const movables = [background, ...boundaries, foreground, ...interactions];
```

- Create Animation Function Code For What to Do When Interaction Collision Occurs
- For Doorways You Can Leave This in The if (keys.ArrowUp.pressed... Section 
```

```
- For Other Interactions Like Randomized Battle Interactions While Moving Through a Certain Area, Use the Code Below foreground.draw()
```
if (keys.ArrowUp.pressed || keys.ArrowDown.pressed || keys.ArrowLeft.pressed|| keys.ArrowRight.pressed) {
      for (let i = 0; i < interactions.length; i++) {
      const interaction = interactions[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: interaction
        })
      ) {
        console.log("doorway")
        break;
      }
    }
}
```