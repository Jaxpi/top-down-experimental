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
    c.drawImage(image, -1250, -450);
    c.drawImage(playerImage, canvas.width/2 - playerImage.width/3, canvas.height/2);
}
```
*playerImage.width / number of sprites in that row*