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
    this.image = image;
    this.frames = { ...frames, val: 0, elapsed: 0 };
    this.image.onload = () => {
      this.width = this.image.width / this.frames.max;
      this.height = this.image.height;
    };
    this.animate = animate;
    this.sprites = sprites;
    this.opacity = 1;
    this.rotation = rotation;
  }

  draw() {
    c.save();
    c.translate(
      this.position.x + this.width / 2,
      this.position.y + this.height / 2
    );
    c.rotate(this.rotation);
    c.translate(
      -this.position.x - this.width / 2,
      -this.position.y - this.height / 2
    );
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
}

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
  }) {
    super({
      position,
      image,
      frames,
      sprites,
      animate,
      rotation,
    });
    (this.isEnemy = isEnemy), (this.health = 100), (this.name = name);
  }

  attack({ attack, recipient, renderedSprites }) {
    document.querySelector("#dialogueBox").style.display = "block";
    document.querySelector("#dialogueBox").innerHTML =
      this.name + " used " + attack.name;

    let healthBar = "#enemyHealthBar";
    if (this.isEnemy) healthBar = "#playerHealthBar";

    let rotation = 1;
    if (this.isEnemy) rotation = -2.5;

    this.health -= attack.damage;

    switch (attack.name) {
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
          rotation,
        });

        // in position 1, removing 0 items, add shadow to array
        renderedSprites.splice(1, 0, shadow);

        gsap.to(shadow.position, {
          x: recipient.position.x,
          y: recipient.position.y,
          duration: 1,
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
            // in position 1, remove 1 item from the array
            renderedSprites.splice(1, 1);
          },
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
        break;
    }
  }
}

class Boundary {
  static width = 48;
  static height = 48;
  constructor({ position }) {
    (this.position = position), (this.width = 48), (this.height = 48);
  }
  draw() {
    c.fillStyle = "rgba(0, 0, 0, 0)";
    //   c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
