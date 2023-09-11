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

class InteractionCharacters extends Sprite {
  constructor({
    position,
    image,
    frames = { max: 1, hold: 10 },
    sprites,
    animate = false,
    rotation = 0,
    isNPC = false,
    name,
    dialogues,
  }) {
    super({
      position,
      image,
      frames,
      sprites,
      animate,
      rotation,
    });
    (this.isNPC = isNPC), (this.name = name), (this.dialogues = dialogues);
  }

  dialogue({ dialogue }) {
    document.querySelector("#dialogueBox").style.display = "block";
    document.querySelector("#dialogueBox").style.padding = "50";
    document.querySelector("#dialogueBox").innerHTML = dialogue.words;

    const dialogueTimeline = gsap.timeline();
    let talkMotion = 5;
    if (this.isNPC) talkMotion = -5;

    switch (dialogue.name) {
      case "Greet":
      case "Welcome":
      case "Order":
      case "Order Response":
      case "Request":
        dialogueTimeline
          .to(this.position, {
            x: this.position.x + talkMotion,
          })
          .to(this.position, {
            x: this.position.x - talkMotion,
            duration: 0.5,
          });
        break;
      case "Goodbye":
        dialogueTimeline
          .to(this.position, {
            x: this.position.x + talkMotion,
          })
          .to(this.position, {
            x: this.position.x - talkMotion,
            duration: 0.5,
          })
          .to(this, { opacity: 0, duration: 1.5 });
        break;
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
    attacks,
  }) {
    super({
      position,
      image,
      frames,
      sprites,
      animate,
      rotation,
    });
    (this.isEnemy = isEnemy),
      (this.health = 100),
      (this.name = name),
      (this.attacks = attacks);
  }

  faint() {
    document.querySelector("#dialogueBox").innerHTML = this.name + " fainted!";
    gsap.to(this.position, {
      y: this.position.y + 20,
    });
    gsap.to(this, {
      opacity: 0,
    });
    audio.Victory.play();
    audio.Battle.stop();
  }

  attack({ attack, recipient, renderedSprites }) {
    document.querySelector("#dialogueBox").style.display = "block";
    document.querySelector("#dialogueBox").innerHTML =
      this.name + " used " + attack.name;

    let healthBar = "#enemyHealthBar";
    if (this.isEnemy) healthBar = "#playerHealthBar";

    let rotation = 1;
    if (this.isEnemy) rotation = -2.5;

    recipient.health -= attack.damage;

    switch (attack.name) {
      case "Shadow":
        audio.InitFireball.play();
        const shadowImage = new Image();
        shadowImage.src = "./imgs/Smoke2.png";

        let shadowOrigin = this.position.x + 100;
        if (this.isEnemy) shadowOrigin = this.position.x - 50;

        const shadow = new Sprite({
          position: {
            x: shadowOrigin,
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
            audio.FireballHit.play();
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
            renderedSprites.splice(1, 1);
          },
        });

        break;
      case "Burn":
        audio.InitFireball.play();
        const fireballImage = new Image();
        fireballImage.src = "./imgs/fireball.png";

        let fireballOrigin = this.position.x + 200;
        if (this.isEnemy) fireballOrigin = this.position.x + 50;

        const fireball = new Sprite({
          position: {
            x: fireballOrigin,
            y: this.position.y + 50,
          },
          image: fireballImage,
          frames: {
            max: 4,
            hold: 2,
          },
          animate: true,
          rotation,
        });

        // in position 1, removing 0 items, add fireball to array
        renderedSprites.splice(1, 0, fireball);

        gsap.to(fireball.position, {
          x: recipient.position.x + recipient.width / 3,
          y: recipient.position.y + recipient.height / 5,
          duration: 1,
          onComplete: () => {
            audio.FireballHit.play();
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
            renderedSprites.splice(1, 1);
          },
        });

        break;
      case "Freeze":
        audio.InitFireball.play();
        const iceballImage = new Image();
        iceballImage.src = "./imgs/iceball.png";

        let iceballOrigin = this.position.x + 200;
        if (this.isEnemy) iceballOrigin = this.position.x + 50;

        const iceball = new Sprite({
          position: {
            x: iceballOrigin,
            y: this.position.y + 50,
          },
          image: iceballImage,
          frames: {
            max: 4,
            hold: 2,
          },
          animate: true,
          rotation,
        });

        // in position 1, removing 0 items, add iceball to array
        renderedSprites.splice(1, 0, iceball);

        gsap.to(iceball.position, {
          x: recipient.position.x + recipient.width / 3,
          y: recipient.position.y + recipient.height / 5,
          duration: 1,
          onComplete: () => {
            audio.FireballHit.play();
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
              audio.TackleHit.play();
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
      case "Poison":
        audio.InitFireball.play();
        const poisonImage = new Image();
        poisonImage.src = "./imgs/Poison.png";

        let poisonOrigin = this.position.x + 100;
        if (this.isEnemy) poisonOrigin = this.position.x - 50;

        const poison = new Sprite({
          position: {
            x: poisonOrigin,
            y: this.position.y,
          },
          image: poisonImage,
          frames: {
            max: 1,
            hold: 10,
          },
          animate: true,
        });

        // in position 1, removing 0 items, add poison to array
        renderedSprites.splice(1, 0, poison);

        gsap.to(poison.position, {
          x: recipient.position.x,
          y: recipient.position.y,
          duration: 1,
          onComplete: () => {
            audio.FireballHit.play();
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
            renderedSprites.splice(1, 1);
          },
        });
        break;
      case "Haunt":
        const tl = gsap.timeline();

        let moveDistance = 20;
        if (this.isEnemy) moveDistance = -20;
        this.rotation = 5.5;
        tl.to(this.position, {
          x: this.position.x - moveDistance,
        })
          .to(this.position, {
            x: this.position.x + moveDistance * 2,
            duration: 0.1,
            onComplete: () => {
              audio.TackleHit.play();
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
              this.rotation = 0;
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
  constructor({ position, symbol }) {
    (this.position = position),
      (this.width = 48),
      (this.height = 48),
      (this.symbol = symbol);
  }
  draw() {
    c.fillStyle = "rgba(0, 0, 0, 0)";
    //   c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
