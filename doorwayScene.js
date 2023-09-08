const generalStoreImg = new Image();
generalStoreImg.src = "./imgs/general-store-3.jpg";
const generalStoreBackground = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  image: generalStoreImg,
});

const tavernImg = new Image();
tavernImg.src = "./imgs/interior-tavern-1-crop.png";
const tavernBackground = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  image: tavernImg,
});

const grocerImg = new Image();
grocerImg.src = "./imgs/grocery-store-1.jpeg";
const grocerBackground = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  image: grocerImg,
});

const medicalImg = new Image();
medicalImg.src = "./imgs/interior-medical-2-crop.jpeg";
const medicalBackground = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  image: medicalImg,
});

const sageImg = new Image();
sageImg.src = "./imgs/interior-fire-sage-1-crop.jpeg";
const sageBackground = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  image: sageImg,
});

const iceDungeonImg = new Image();
iceDungeonImg.src = "./imgs/iceDungeon-1-crop.jpeg";
const iceDungeonBackground = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  image: iceDungeonImg,
});

const homeImg = new Image();
homeImg.src = "./imgs/interior-home-16-crop.jpeg";
const homeBackground = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  image: homeImg,
});

const friendHomeImg = new Image();
friendHomeImg.src = "./imgs/interior-home-11-crop.jpeg";
const friendHomeBackground = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  image: friendHomeImg,
});


let interactionChar;
let friend;
let sage;
let tavernOwner;
let doctor;
let shopkeep;
let grocer;
let iceBoss;
let renderedSprites;
let interactionAnimationID;
let queue;

function initDoorway() {
  document.querySelector("#userInterface").style.display = "block";
  document.querySelector("#dialogueBox").style.display = "none";
  document.querySelector("#enemyHealthBar").style.width = "100%";
  document.querySelector("#playerHealthBar").style.width = "100%";
  document.querySelector("#attacksBox").replaceChildren();

  interactionChar = new interactionCharacters(interactionCharacters.Player);
  friend = new interactionCharacters(interactionCharacters.Friend);
  renderedSprites = [friend, interactionChar];
  queue = [];

  interactionChar.dialogues.forEach((dialogue) => {
    const button = document.createElement("button");
    button.innerHTML = dialogue.name;
    document.querySelector("#attacksBox").append(button);
  });

  document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", (e) => {
      const selectedDialogue = dialogues[e.currentTarget.innerHTML];
      interactionChar.dialogue({
        dialogue: selectedDialogue,
        recipient: friend,
        renderedSprites,
      });

        if (selectedDialogue === "Greet", () => {
            queue.push(() => {
                friend.dialogue({
                  dialogue: Welcome,
                  recipient: interactionChar,
                  renderedSprites,
                });
        })
        
      if (friend.health <= 0) {
        queue.push(() => {
          friend.faint();
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

              enemyBattle.initiated = false
              // adding this to prevent reinitialization in enemyBattle
              player.position.y += 20
              playerHitBox.position.y += 20
              audio.Map.play();

            },
          });
        });
      }

      });
    });

    button.addEventListener("mouseenter", (e) => {
      const selectedDialogue = dialogues[e.currentTarget.innerHTML];
      document.querySelector("#attackType").innerHTML = selectedDialogue.name;
    });
  });
}

function animateDoorway() {

    // if symbol === ? animate x background and x sprite, else if y then y back and y sprite, else z...

  interactionAnimationID = window.requestAnimationFrame(animateDoorway);
  friendHomeImg.draw();

  renderedSprites.forEach((sprite) => {
    sprite.draw();
  });
}

document.querySelector("#dialogueBox").addEventListener("click", (e) => {
    if (queue.length > 0) {
      queue[0]();
      queue.shift();
    } else e.currentTarget.style.display = "none";
  });