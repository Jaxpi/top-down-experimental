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

- _playerImage.width / number of sprites in that row_

### Create Character Frames and Looping From Sprite Sheet (this example is 3x4)

- _c.drawImage(
  playerImage,
  x position to crop,
  y position to crop,
  crop width (playerImage.width / # of sprites in row),
  crop height (playerImage.height / # of sprites in column),
  placement on x axis,
  placement on y axis,
  drawn image width,
  drawn image height
  );_

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

- Create Animation Function Code For What to Do When Interaction Collision Occurs Below foreground.draw()

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

- Shrink the Area of Intersection so Interactions Don't Activate Unless Most of the Player is Colliding

```
if (keys.ArrowUp.pressed || keys.ArrowDown.pressed || keys.ArrowLeft.pressed|| keys.ArrowRight.pressed) {
      for (let i = 0; i < interactions.length; i++) {
      const interaction = interactions[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: interaction
        }) &&
        overlappingArea > (player.width * player.height) / 2
      ) {
        console.log("doorway")
        break;
      }
    }
}
```

- Create the overlappingArea const Beneath const interaction

```
const overlappingArea = (Math.min(player.position.x + player.width, interaction.position.x + interaction.width) - Math.max(player.position.x, interaction.position.x)) * (Math.min(player.position.y + player.height, interaction.position.y + interaction.height) - Math.max(player.position.y, interaction.position.y))
```

### Randomize Interactions for Battles

- Add an Additional Criterion to the Overlapping That Creates a Random Number and Only Starts an Interaction if That Number is Less Than a Set Value (the smaller the value, the less frequent an interaction will be initiated)

```
overlappingArea > (player.width * player.height) / 2 && Math.random() < 0.01
```

### Detect Interaction and Stop Player Movement Upon Interaction

- Stop Player From Moving by Creating a New const Above Animation Loop

```
const doorway = {
  initiated: false
}
```

- Add If Statement Above the If Statement for interactions That Says If That Const is True to Return and Not Call the Rest of the Code

```
if (doorway.initiated) return
  if (
    keys.ArrowUp.pressed ||
    keys.ArrowDown.pressed ||
    keys.ArrowLeft.pressed ||
    keys.ArrowRight.pressed
  ) {...
```

- At the Bottom of the Interaction Code Set Initiation to True

```
        }) &&
        overlappingArea > (player.width * player.height) / 2
      ) {
        console.log("doorway");
        doorway.initiated = true
        break;
```

- Move let moving = true; and player.moving = false; Codes Above the if (doorway.initiated) return Code

```
foreground.draw();

  let moving = true;
  player.moving = false;

  if (doorway.initiated) return
```

### Create Visual Transition Upon Interaction

- Create New Div in HTML For Transition Animation Area

```
<div style="display: inline-block; position: relative;">
  <div id="overlappingDiv" style="background-color: black; position: absolute; top: 0; right: 0; bottom: 0; left: 0; pointer-events: none;"></div>
  <canvas> </canvas>
</div>
```

- Import Animation Library (https://cdnjs.com/libraries/gsap), Copy Script Tag, Insert Above All Other Script Tags in index.html

```
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js" integrity="sha512-H6cPm97FAsgIKmlBA4s774vqoN24V5gSQL4yBTDOY2su2DeXZVhQPxFK4P6GPdnZqM9fg1G3cMv5wD7e6cFLZQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="data/interactions.js"></script>
```

- Add gsap Code to index.js in Interaction Initiation Code Below doorway.initiated = true

```
doorway.initiated = true
gsap.to('#overlappingDiv', {
  opacity: 1,
  repeat: 3,
  yoyo: true,
  duration: 0.4
  onComplete() {
    gsap.to('#overlappingDiv', {
      opacity: 1,
      duration: 0.4
    })
  }
})
break;
```

- Activate New Animation Loop and Deactivate Old One
- Add a New const in the Animation Function for animationID and Set it to window.requestAnimationFrame

```
function animate() {
  const animationID = window.requestAnimationFrame
```

- Cancel the Animation Just Above the Initiation of the Interaction

```
window.cancelAnimationFrame(animationID);
doorway.initiated = true;
```

- Within the onComplete Function Call a New Animation Loop

```
animateInteraction();
```

- Create the New Animation Function Below the Call For the Animate Function

```
animate();

function animateInteraction() {
  window.requestAnimationFrame(animateInteraction)
}
```

- Add a New Image and Sprite For After the Transition Above the New Function

```
animate();

const generalStoreImg = new Image()
generalStoreImg.src = './imgs/general-store-2,jpeg'
const generalStoreBackground = new Sprite({
  position: {
    x: 0,
    y:0
  },
  image: generalStoreImg
})

function animateInteraction() {...
```

- Call Draw Method on New Sprite in the New Animation Function

```
function animateInteraction() {
  window.requestAnimationFrame(animateInteraction)
  generalStoreBackground.draw()
}
```

- Remove Black Overlay After Transition by Altering the Interaction Initiation Code to Move the animateInteraction Call to Within the onComplete Function and Include Another gsap.to after the animateInteraction Function is Called

```
window.cancelAnimationFrame(animationID);
doorway.initiated = true;
gsap.to("#overlappingDiv", {
  opacity: 1,
  repeat: 3,
  yoyo: true,
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
```

## Adding Battle Interactions (or others):

### Creating Battle Sprites

- Add Images to Folder for Emeny Sprites and Attack Displays
- Above the animateInteraction Function Create a Const for the New Images and New Sprites
```
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
  }
})

function animateInteraction() {
  window.requestAnimationFrame(animateInteraction)
  generalStoreBackground.draw()
  darkling.draw()
  battleChar.draw()
}
```
- Refactor Sprite Class to Allow for Battle Animations Without Arrow Key Movement
```
class Sprite {
  constructor({ position, image, frames = { max: 1 }, sprites, animate = false }) {
    this.position = position;
    this.image = image;
    this.frames = { ...frames, val: 0, elapsed: 0 };
    this.image.onload = () => {
      this.width = this.image.width / this.frames.max;
      this.height = this.image.height;
    };
    this.animate = animate;
    this.sprites = sprites;
  }

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

    if (!this.animate) return;
```

- Change All Instances of player.moving To player.animate in index.js File
- Refactor New Sprites to Include Animate Property
```
const darkling = new Sprite({
  position: {
    x: 500,
    y: 100
  },
  image: darklingImg,
  frames: {
    max: 3,
  },
  animate: true
})
```

- Add New Sprite Property in classes.js For Frame Change Rate Called Hold and Change Sprite Class Code to Match
```
class Sprite {
  constructor({ position, image, frames = { max: 1, hold: 10 }, sprites, animate = false })...

if (!this.animate) return;

if (this.frames.max > 1) {
  this.frames.elapsed++;
}
if (this.frames.elapsed % this.frames.hold === 0) 
```

- Add Hold Property to Sprites in index.js (using larger numbers to make the animation slower)
```
const player = new Sprite({
  position: {
    x: canvas.width / 2 - 130 / 3 / 2,
    y: canvas.height / 2,
  },
  image: playerDownImage,
  frames: {
    max: 3,
    hold: 10
  },...

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
```

### Create Battle Interface

- Add a Div to index.html for battleInterface
- Add a Div for Attack Buttons
- Add a Div for Attack Type
- Alter Style Code to Improve Display
```
<head>
  <style>
    body {
      background-color: black;
      font-family: Arial, Helvetica, sans-serif;
    }
    h1 {
      margin: 0;
      font-size: 24px;
    }
    button {
      border: 0;
      font-size: 24px;
    }
    button:hover {
      background-color: lightgray;
      cursor: pointer;
    }
  </style>
</head>

<div style="display: inline-block; position: relative">
  <div
    id="overlappingDiv"
    style="
      background-color: black;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      opacity: 0;
      pointer-events: none;
    "
  ></div>
  <canvas> </canvas>

  <div
    id="battleInterface"
    style="
      background-color: white;
      height: 140px;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      border-top: 3px solid black;
      display: flex;
    "
  >
    <div
      style="
        width: 66.66%;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
      "
    >
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>4</button>
    </div>
    <div
      style="
        display: flex;
        align-items: center;
        justify-content: center;
        width: 33.33%;
        border-left: 3px solid black;
      "
    >
      <h1>Attack Type</h1>
    </div>
  </div>
</div>
```

### Adding Attack Bar and Health Bar

- Create a Div Above Canvas For the Stats Box
- Create an H1 Tag For the Name
- Create a Container Div For the Health Bar and Background Bar to Be Seen As Health Decreases
- Create Two Long Thin Rectangles to Represent the Health and Position the Green One to Overlay the Gray One
- Copy and Paste for the Player
```
<div style="display: inline-block; position: relative">
  <div
    id="overlappingDiv"
    style="
      background-color: black;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      opacity: 0;
      pointer-events: none;
    "
  ></div>

  <div id="enemyStats"
    style="
      background-color: white;
      width: 250px;
      position: absolute;
      top: 50;
      left: 50;
      border: 3px solid black;
      padding: 12px;
    "
  >
    <h1>Enemy</h1>
    <div style="position: relative">
      <div
        id="backgroundBar"
        style="
          height: 5px;
          background-color: rgb(170, 170, 170);
          margin-top: 10px;
        "
      ></div>
      <div
        id="healthBar"
        style="
          height: 5px;
          background-color: rgba(0, 204, 31, 0.794);
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
        "
      ></div>
    </div>
  </div>

  <div id="playerStats"
  style="
    background-color: white;
    width: 250px;
    position: absolute;
    top: 330;
    right: 50;
    border: 3px solid black;
    padding: 12px;
  "
>
  <h1>Player</h1>
  <div style="position: relative">
    <div
      id="backgroundBar"
      style="
        height: 5px;
        background-color: rgb(170, 170, 170);
        margin-top: 10px;
      "
    ></div>
    <div
      id="healthBar"
      style="
        height: 5px;
        background-color: rgba(0, 204, 31, 0.794);
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
      "
    ></div>
  </div>
</div>
```

### Adding a Non-Contact Physical Attack

- Add Event Listener on Battle Buttons for Clicks and Have That Initiate an Attack
```
document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", () => {
    battleChar.attack({
      attack: {
        name: "Tackle",
        damage: 10,
        type: "Normal",
      },
      recipient: darkling
    });
  });
});
```
- Add Attack Code in Sprite Class to Show Attack Animation
- Add Opacity Property in Constructor Method
- Add c.save, c.globalAlpha, and c.restore Codes to Draw Method
- Add Attack Method Code
```
    this.opacity = 1;
    this.health = 100;
    this.isEnemy = isEnemy;
  }

  draw() {
    c.save();
    c.globalAlpha = this.opacity;
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
    c.restore();
    if (!this.animate) return;

    if (this.frames.max > 1) {
      this.frames.elapsed++;
    }
    if (this.frames.elapsed % this.frames.hold === 0) {
      if (this.frames.val < this.frames.max - 1) this.frames.val++;
      else this.frames.val = 0;
    }
  }

  attack({ attack, recipient }) {
    const timeline = gsap.timeline();

    this.health -= attack.damage

    let movementDistance = 20;
    if (this.isEnemy) movementDistance = -20;

    let healthBar = "#enemyHealthBar";
    if (this.isEnemy) healthBar = "#playerHealthBar";

    timeline
      .to(this.position, {
        x: this.position.x - movementDistance,
      })
      .to(this.position, {
        x: this.position.x + movementDistance * 2,
        duration: 0.1,
        onComplete: () => {
          gsap.to(healthBar, {
            width: this.health + "%",
          });

          gsap.to(recipient.position, {
            x: recipient.position.x + 10,
            yoyo: true,
            repeat: 5,
            duration: 0.08,
          });
          gsap.to(recipient, {
            opacity: 0.5,
            repeat: 5,
            yoyo: true,
            duration: 0.08,
          });
        },
      })
      .to(this.position, {
        x: this.position.x,
      });
  }
}
```
- In index.js Add isEnemy: true property to darkling
```
const darkling = new Sprite({
  position: {
    x: 500,
    y: 100,
  },
  image: darklingImg,
  frames: {
    max: 3,
    hold: 20,
  },
  animate: true,
  isEnemy: true
});
```

### Adding a Projectile Attack

- Create a New js File in the Data Folder Called attacks.js
- Take the Attack Properties From index.js and Move Them to This File as New Const Called attacks
```
const attacks = {
  Tackle: {
    name: "Tackle",
    damage: 10,
    type: "Normal",
    },
    Shadow: {
        name: "Shadow",
        damage: 25,
        type: "Dark",
      },
};
```
- Import This in index.html
```
<script src="data/interactions.js"></script>
<script src="data/collisions.js"></script>
<script src="data/attacks.js"></script>
<script src="classes.js"></script>
<script src="index.js"></script>
```
- Change Attack Code to Represent the Selected Attack
```
document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", (e) => {
    const selectedAttack = attacks[e.currentTarget.innerHTML]
    battleChar.attack({
      attack: selectedAttack,
      recipient: darkling
    });
  });
});
```

- Refactor index.js Draw Code to Allow For Various Attack Styles
```
const renderedSprites = []

function animateInteraction() {
  window.requestAnimationFrame(animateInteraction);
  generalStoreBackground.draw();
  darkling.draw();
  battleChar.draw();
}

renderedSprites.forEach((sprite) => {
  sprite.draw()
})
```
- Refactor Attack Code in classes.js to Push New Sprite Into the Array
```
  attack({ attack, recipient, renderedSprites }) {
    switch (attack.name) {
      case "Shadow":
        const shadowImage = new Image();
        shadowImage.src = "./imgs.Smoke.png";
        const shadow = new Sprite({
          position: {
            x: this.position.x,
            y: this.position.y,
          },
          image: shadowImage,
        });

        renderedSprites.push(shadow);

        break;
      case "Tackle":
```
- Create New Animation For Second Attack
```
renderedSprites.push(shadow);

gsap.to(shadow.position, {
  x: recipient.position.x,
  y: recipient.position.y,
  duration: 1,
  onComplete: () => {
    renderedSprites.pop()
  }
});
```
- Refactor to Include Same Health Bar and Wincing Annimation and Keep healthBar and attack.damage Effects Available to All Cases
```
  attack({ attack, recipient, renderedSprites }) {
    let healthBar = "#enemyHealthBar";
    if (this.isEnemy) healthBar = "#playerHealthBar";

    recipient.health -= attack.damage;

    switch (attack.name) {
      case "Shadow":
        const shadowImage = new Image();
        shadowImage.src = "./imgs/Smoke2.png";
        const shadow = new Sprite({
          position: {
            x: this.position.x,
            y: this.position.y,
          },
          image: shadowImage,
          frames: {
            max: 4,
            hold: 10,
          },
          animate: true,
        });

        renderedSprites.push(shadow);

        gsap.to(shadow.position, {
          x: recipient.position.x,
          y: recipient.position.y,
          duration: 1,
          onComplete: () => {
            gsap.to(healthBar, {
              width: recipient.health + "%",
            });

            gsap.to(recipient.position, {
              x: recipient.position.x + 10,
              yoyo: true,
              repeat: 5,
              duration: 0.08,
            });
            gsap.to(recipient, {
              opacity: 0.5,
              repeat: 5,
              yoyo: true,
              duration: 0.08,
            });
            renderedSprites.pop()
          }
        });

        break;
      case "Tackle":
        const timeline = gsap.timeline();

        let movementDistance = 20;
        if (this.isEnemy) movementDistance = -20;

        timeline
          .to(this.position, {
            x: this.position.x - movementDistance,
          })
          .to(this.position, {
            x: this.position.x + movementDistance * 2,
            duration: 0.1,
            onComplete: () => {
              gsap.to(healthBar, {
                width: recipient.health + "%",
              });

              gsap.to(recipient.position, {
                x: recipient.position.x + 10,
                yoyo: true,
                repeat: 5,
                duration: 0.08,
              });
              gsap.to(recipient, {
                opacity: 0.5,
                repeat: 5,
                yoyo: true,
                duration: 0.08,
              });
            },
          })
          .to(this.position, {
            x: this.position.x,
          });
        break;
    }
  }
```
- Make Projectile Appear to Originate in Front of the Player by Adding battleChar and darkling Into the Rendered Sprites Array in index.js
```
const renderedSprites = [darkling, battleChar]

function animateInteraction() {
  window.requestAnimationFrame(animateInteraction);
  generalStoreBackground.draw();

  renderedSprites.forEach((sprite) => {
    sprite.draw()
  })
}
```
- Refactor classes.js Code to Utilize splice For the Array in Order to Have the Z Indexes of the Sprites in the Proper Order
```
// in position 1, removing 0 items, add shadow to array
renderedSprites.splice(1, 0, shadow)

gsap.to(shadow.position, {
  x: recipient.position.x,
  y: recipient.position.y,
  duration: 1,
  onComplete: () => {
    gsap.to(healthBar, {
      width: recipient.health + "%",
    });

    gsap.to(recipient.position, {
      x: recipient.position.x + 10,
      yoyo: true,
      repeat: 5,
      duration: 0.08,
    });
    gsap.to(recipient, {
      opacity: 0.5,
      repeat: 5,
      yoyo: true,
      duration: 0.08,
    });
    // in position 1, remove 1 item from the array
    renderedSprites.splice(1, 1)
  }
});
```
- Add Property For Rotation For Any Projectile Image That Needs Angular Rotation to Appear to Be Heading in the Right Direction
```
class Sprite {
  constructor({
    position,
    image,
    frames = { max: 1, hold: 10 },
    sprites,
    animate = false,
    isEnemy = false,
    rotation = 0
  }) {
    this.position = position;
    this.image = image;
    this.frames = { ...frames, val: 0, elapsed: 0 };
    this.image.onload = () => {
      this.width = this.image.width / this.frames.max;
      this.height = this.image.height;
    };
    this.animate = animate;
    this.sprites = sprites;
    this.opacity = 1;
    this.health = 100;
    this.isEnemy = isEnemy;
    this.rotation = rotation
  }
```
```
draw() {
    c.save();
    c.translate(this.position.x + this.width / 2, this.position.y + this.height / 2)
    c.rotate(this.rotation)
    c.translate(-this.position.x - this.width / 2, -this.position.y - this.height / 2)
    c.globalAlpha = this.opacity;
```
```
case "Shadow":
const shadowImage = new Image();
shadowImage.src = "./imgs/Smoke2.png";
const shadow = new Sprite({
  position: {
    x: this.position.x + 100,
    y: this.position.y,
  },
  image: shadowImage,
  frames: {
    max: 4,
    hold: 10,
  },
  animate: true,
  rotation: 1
});
```
- Change Rotation for When Enemy Uses That Attack
```
 attack({ attack, recipient, renderedSprites }) {
    let healthBar = "#enemyHealthBar";
    if (this.isEnemy) healthBar = "#playerHealthBar";

    let rotation = 1
    if (this.isEnemy) rotation = -2.5

```

### Adding Dialogue

- Create Dialogue Container to Overlay Attack Interface in index.html
```
 <canvas> </canvas>

  <div
    id="battleInterface"
    style="
      background-color: white;
      height: 140px;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      border-top: 3px solid black;
      display: flex;
    "
  >
    <div
      style="
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: white;
        font-size: 24px;
        padding: 12px;
        display: none;
        cursor: pointer;
      "
      id="dialogueBox"
    >
      Dialogue
    </div>
```

- In classes.js Add Name Property to Sprite Constructor
```
class Sprite {
  constructor({
    position,
    image,
    frames = { max: 1, hold: 10 },
    sprites,
    animate = false,
    isEnemy = false,
    rotation = 0,
    name
  }) {
    this.position = position;
    this.image = image;
    this.frames = { ...frames, val: 0, elapsed: 0 };
    this.image.onload = () => {
      this.width = this.image.width / this.frames.max;
      this.height = this.image.height;
    };
    this.animate = animate;
    this.sprites = sprites;
    this.opacity = 1;
    this.health = 100;
    this.isEnemy = isEnemy;
    this.rotation = rotation;
    this.name = name
  }
```
- Give Names to Sprite Characters
```
const battleCharImg = new Image();
battleCharImg.src = "./imgs/elf-player-up-lg.png";
const battleChar = new Sprite({
  position: {
    x: 100,
    y: 220,
  },
  image: battleCharImg,
  frames: {
    max: 3,
  },
  animate: true,
  name: 'Player'
});

const darklingImg = new Image();
darklingImg.src = "./imgs/darkling-enemy-1.png";
const darkling = new Sprite({
  position: {
    x: 500,
    y: 100,
  },
  image: darklingImg,
  frames: {
    max: 3,
    hold: 20,
  },
  animate: true,
  isEnemy: true,
  name: 'Enemy'
});
```
- Add Code to Unhide Dialogue Box and Populate it With Desired Text
```
attack({ attack, recipient, renderedSprites }) {
    document.querySelector("#dialogueBox").style.display = "block";
    document.querySelector("#dialogueBox").innerHTML = this.name + " used " + attack.name
```

- Refactor Code to Put All Battle Sequence Content Into a New File Called battleScene.js
```
const generalStoreImg = new Image();
generalStoreImg.src = "./imgs/general-store-3.jpg";
const generalStoreBackground = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  image: generalStoreImg,
});

const battleCharImg = new Image();
battleCharImg.src = "./imgs/elf-player-up-lg.png";
const battleChar = new Sprite({
  position: {
    x: 100,
    y: 220,
  },
  image: battleCharImg,
  frames: {
    max: 3,
  },
  animate: true,
  name: 'Player'
});

const darklingImg = new Image();
darklingImg.src = "./imgs/darkling-enemy-1.png";
const darkling = new Sprite({
  position: {
    x: 500,
    y: 100,
  },
  image: darklingImg,
  frames: {
    max: 3,
    hold: 20,
  },
  animate: true,
  isEnemy: true,
  name: 'Enemy'
});

const renderedSprites = [darkling, battleChar]

function animateInteraction() {
  window.requestAnimationFrame(animateInteraction);
  generalStoreBackground.draw();

  renderedSprites.forEach((sprite) => {
    sprite.draw()
  })
}

animateInteraction();

document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", (e) => {
    const selectedAttack = attacks[e.currentTarget.innerHTML]
    battleChar.attack({
      attack: selectedAttack,
      recipient: darkling,
      renderedSprites
    });
  });
});
```

- Import This File Into index.html
```
<script src="classes.js"></script>
<script src="index.js"></script>
<script src="battleScene.js"></script>
```

- Add Event Listener Onto Dialogue Box at the End of battleScene.js to Move On With Event Queue or Return to Attack Selection
```
document.querySelector("#dialogueBox").addEventListener("click", (e) => {
  e.currentTarget.style.display = "none";
});
```

- Provide a Queue Array so the Enemy Can Attack and Populate With Attacks for the Enemy
```
const queue = [];

document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", (e) => {
    const selectedAttack = attacks[e.currentTarget.innerHTML];
    battleChar.attack({
      attack: selectedAttack,
      recipient: darkling,
      renderedSprites,
    });

    queue.push(() => {
      darkling.attack({
        attack: attacks.Tackle,
        recipient: battleChar,
        renderedSprites,
      });
    })
    queue.push(() => {
      darkling.attack({
        attack: attacks.Shadow,
        recipient: battleChar,
        renderedSprites,
      });
    })
  });
});

document.querySelector("#dialogueBox").addEventListener("click", (e) => {
  if (queue.length > 0) {
    queue[0]()
    queue.shift()
  } else e.currentTarget.style.display = "none";
});
```
- Dynamically Populate Displayed Attack Names Based on Sprite
- In index.html Add an ID Tag to the Div That Contains the Attacks and Label it attacksBox
- In battleScene.js Add Code to Create Buttons Dynamically
```
const renderedSprites = [darkling, battleChar];

const button = document.createElement('button')
button.innerHTML = '?'
document.querySelector('#attacksBox').append()
```

- Create a New File in the Data Folder Called battleCharacters.js and Import into index.html
- Pull All Character Code From battleScene.js and Put it Into battleCharacters.js

```
const battleChar = new Sprite(battleCharacters.Player);

const darkling = new Sprite(battleCharacters.Darkling);
```

```
const battleCharImg = new Image();
battleCharImg.src = "./imgs/elf-player-up-lg.png";

const darklingImg = new Image();
darklingImg.src = "./imgs/darkling-enemy-1.png";

const battleCharacters = {
  Player: {
    position: {
      x: 100,
      y: 220,
    },
    image: battleCharImg,
    frames: {
      max: 3,
    },
    animate: true,
    name: "Player",
    attacks: [attacks.Tackle, attacks.Shadow],
  },

  Darkling: {
    position: {
      x: 500,
      y: 100,
    },
    image: darklingImg,
    frames: {
      max: 3,
      hold: 20,
    },
    animate: true,
    isEnemy: true,
    name: "Enemy",
    attacks: [attacks.Shadow],
  },
};
```

- Create New Class That Extends Sprite Called BattleCharacters and Cut and Paste the Attack Codes From Sprite Into This Class
```
class BattleCharacters extends Sprite {
  constructor({
    position,
    image,
    frames = { max: 1, hold: 10 },
    sprites,
    animate = false,
    rotation = 0,
    isEnemy = false,
    name,
    attacks
  }) {
    super({
      position,
      image,
      frames,
      sprites,
      animate,
      rotation,
    });
    this.isEnemy = isEnemy,
    this.health = 100,
    this.name = name,
    this.attacks = attacks
  }

  attack({ attack, recipient, renderedSprites }) {...
```

- Change battleScene.js Code to Dynamically Populate Attack Names
```
const renderedSprites = [darkling, battleChar];

battleChar.attacks.forEach((attack) => {
  const button = document.createElement('button')
  button.innerHTML = attack.name
  document.querySelector('#attacksBox').append(button)
})
```
### Randomize Enemy Attacks

- In battleScenes.js Add Code Within Button Click Event Listener For Attack Randomization
```
const randomAttack = darkling.attacks[Math.floor(Math.random() * darkling.attacks.length)]

    queue.push(() => {
      darkling.attack({
        attack: randomAttack,
```

- Dynamically Display Attack Type in battleScenes.js Button Event Listener
- Add id attackType to index.html
- Provide Color Properties to Attacks in attacks.js
```
    queue.push(() => {
      darkling.attack({
        attack: randomAttack,
        recipient: battleChar,
        renderedSprites,
      });
    })
  });
  button.addEventListener('mouseenter', (e) => {
    const selectedAttack = attacks[e.currentTarget.innerHTML];
    document.querySelector('#attackType').innerHTML = selectedAttack.type
    document.querySelector('#attackType').style.color = selectedAttack.color
  })
```

### Create Battle End Animation

- When All Health is Lost, Provide a Display
- Create an If Statement Within battleScene.js For If a Battle Character Faints
```
 battleChar.attack({
      attack: selectedAttack,
      recipient: darkling,
      renderedSprites,
    });

    if (darkling.health <= 0) {
      queue.push(() => {
        darkling.faint()
      });

      return
    }

    const randomAttack = darkling.attacks[Math.floor(Math.random() * darkling.attacks.length)]

    queue.push(() => {
      darkling.attack({
        attack: randomAttack,
        recipient: battleChar,
        renderedSprites,
      });

      if (battleChar.health <= 0) {
        queue.push(() => {
          battleChar.faint()
        });
  
        return
      }
```

- Add Faint Method to BattleCharacters Class Above Attack Method
```
  faint() {
    document.querySelector("#dialogueBox").innerHTML =
      this.name + " fainted!";
    gsap.to(this.position, {
      y: this.position.y + 20
    })
    gsap.to(this, {
      opacity: 0
    })
  }
```

### Create Transition Back to Main World

- In index.html Set overlappingDiv Z-Index to 10
```
<div
  id="overlappingDiv"
  style="
    background-color: black;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 0;
    pointer-events: none;
    z-index: 10;
```

- Cancel Battle Animation Loop in battleScenes.js
```
queue.push(() => {
  gsap.to('#overlappingDiv', {
    opacity: 1,
    onComplete: () => {
      cancelAnimationFrame(interactionAnimationID)
    }
```

```
let interactionAnimationID

function animateInteraction() {
  interactionAnimationID = window.requestAnimationFrame(animateInteraction);
  generalStoreBackground.draw();
```

- In index.html Wrap Everything Related to Battle Interaction Display in a Div Called userInterface and Put It All Beneath Canvas
```
 <canvas> </canvas>

  <div id="userInterface">
    <div
      id="enemyStats"
      style="
        background-color: white;
        width: 250px;
        position: absolute;
        top: 50;
        left: 50;
        border: 3px solid black;
        padding: 12px;
      "
    >
      <h1>Enemy</h1>
      <div style="position: relative">
        <div
          id="EnemyBackgroundBar"
          style="
            height: 5px;
            background-color: rgb(170, 170, 170);
            margin-top: 10px;
          "
        ></div>
        <div
          id="enemyHealthBar"
          style="
            height: 5px;
            background-color: rgba(0, 204, 31, 0.794);
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
          "
        ></div>
      </div>
    </div>

    <div
      id="playerStats"
      style="
        background-color: white;
        width: 250px;
        position: absolute;
        top: 330;
        right: 50;
        border: 3px solid black;
        padding: 12px;
      "
    >
      <h1>Player</h1>
      <div style="position: relative">
        <div
          id="playerBackgroundBar"
          style="
            height: 5px;
            background-color: rgb(170, 170, 170);
            margin-top: 10px;
          "
        ></div>
        <div
          id="playerHealthBar"
          style="
            height: 5px;
            background-color: rgba(0, 204, 31, 0.794);
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
          "
        ></div>
      </div>
    </div>
    <div
      id="battleInterface"
      style="
        background-color: white;
        height: 140px;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        border-top: 3px solid black;
        display: flex;
      "
    >
      <div
        style="
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background-color: white;
          font-size: 24px;
          padding: 12px;
          display: none;
          cursor: pointer;
        "
        id="dialogueBox"
      >
        Dialogue
      </div>
      <div
        id="attacksBox"
        style="
          width: 66.66%;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
        "
      >
        <!-- <button>Tackle</button>
      <button>Shadow</button> -->
        <!-- <button>3</button>
      <button>4</button> -->
      </div>
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: center;
          width: 33.33%;
          border-left: 3px solid black;
        "
      >
        <h1 id="attackType">Attack Type</h1>
      </div>
    </div>
  </div>
</div>
```

- In battleScene.js Add Code to Hide This Entire Div
```
if (darkling.health <= 0) {
      queue.push(() => {
        darkling.faint()
      });
      queue.push(() => {
        gsap.to('#overlappingDiv', {
          opacity: 1,
          onComplete: () => {
            cancelAnimationFrame(interactionAnimationID)
            animate()
            document.querySelector('#userInterface').style.display = 'none'
            gsap.to('#overlappingDiv', {
              opacity: 0,
            })
          }
        })
      })
    }
```

- Reinitialize Interaction/Battle Scenes to Begin a New One
- Above animateInteraction Function, Create a New Function Called initInteraction And Place All Battle Code Within That Function
```
let battleChar;
let darkling;
let renderedSprites;
let interactionAnimationID;
let queue;

function initInteraction() {
  battleChar = new BattleCharacters(battleCharacters.Player);
  darkling = new BattleCharacters(battleCharacters.Darkling);
  renderedSprites = [darkling, battleChar];
  queue = [];

  battleChar.attacks.forEach((attack) => {
    const button = document.createElement("button");
    button.innerHTML = attack.name;
    document.querySelector("#attacksBox").append(button);
  });

  document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", (e) => {
      const selectedAttack = attacks[e.currentTarget.innerHTML];
      battleChar.attack({
        attack: selectedAttack,
        recipient: darkling,
        renderedSprites,
      });

      if (darkling.health <= 0) {
        queue.push(() => {
          darkling.faint();
        });
        queue.push(() => {
          gsap.to("#overlappingDiv", {
            opacity: 1,
            onComplete: () => {
              cancelAnimationFrame(interactionAnimationID);
              animate();
              document.querySelector("#userInterface").style.display = "none";
              gsap.to("#overlappingDiv", {
                opacity: 0,
              });
            },
          });
        });
      }

      const randomAttack =
        darkling.attacks[Math.floor(Math.random() * darkling.attacks.length)];

      queue.push(() => {
        darkling.attack({
          attack: randomAttack,
          recipient: battleChar,
          renderedSprites,
        });

        if (battleChar.health <= 0) {
          queue.push(() => {
            battleChar.faint();
          });

          return;
        }
      });
    });

    button.addEventListener("mouseenter", (e) => {
      const selectedAttack = attacks[e.currentTarget.innerHTML];
      document.querySelector("#attackType").innerHTML = selectedAttack.type;
      document.querySelector("#attackType").style.color = selectedAttack.color;
    });
  });
}
```

- Add initInteraction to index.js Above animateInteraction() Within the Animate Function
- Within the initInteraction Method, Add Code to Replace/Rehide Objects Upon Reinitialization of Battle
```
function initInteraction() {
  document.querySelector('#userInterface').style.display = 'block'
  document.querySelector('#dialogueBox').style.display = 'none'
  document.querySelector('#enemyHealthBar').style.width = '100%'
  document.querySelector('#playerHealthBar').style.width = '100%'
  document.querySelector('#attacksBox').replaceChildren()
  
  battleChar = new BattleCharacters
```

- Refactor Sprite Class Constructor to Include Better Image Codes For Reinitialization of Battles
```
class Sprite {
  constructor({
    position,
    image,
    frames = { max: 1, hold: 10 },
    sprites,
    animate = false,
    rotation = 0,
  }) {
    this.position = position;
    this.image = new Image();
    this.frames = { ...frames, val: 0, elapsed: 0 };
    this.image.onload = () => {
      this.width = this.image.width / this.frames.max;
      this.height = this.image.height;
    };
    this.image.src = image.src;
    this.animate = animate;
```

- Refactor battleCharacters to Inlcude Image Source Property
```
const battleCharacters = {
  Player: {
    position: {
      x: 100,
      y: 220,
    },
    image: {
      src: './imgs/elf-player-up-lg.png'
    },
    frames: {
      max: 3,
    },
    animate: true,
    name: "Player",
    attacks: [attacks.Tackle, attacks.Shadow],
  },

  Darkling: {
    position: {
      x: 500,
      y: 100,
    },
    image:  {
      src: './imgs/darkling-enemy-1.png'
    },
    frames: {
      max: 3,
      hold: 20,
    },
    animate: true,
    isEnemy: true,
    name: "Enemy",
    attacks: [attacks.Shadow, attacks.Haunt],
  },
};
```
- Add Code to battleScene.js to Return to Main World When Player Faints and Remove Doorway Initiation By Adding doorway.initiated = false to Both Characters After Fainting to Allow For World Movement Again
- Also Add Code to Move Character Down From Doorway to Prevent Reinitialization Before Moving
```
 if (battleChar.health <= 0) {
  queue.push(() => {
    battleChar.faint();
  });
  queue.push(() => {
    gsap.to("#overlappingDiv", {
      opacity: 1,
      onComplete: () => {
        cancelAnimationFrame(interactionAnimationID);
        animate();
        document.querySelector("#userInterface").style.display = "none";
        gsap.to("#overlappingDiv", {
          opacity: 0,
        });

        doorway.initiated = false
        player.position.y += 20
```

### Add Music and Sound Effects

- Create New File in Data Folder Called audio.js
- Import Into index.html Above Others
- Create an Audio Const