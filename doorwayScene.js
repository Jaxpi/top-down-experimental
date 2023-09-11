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
iceDungeonImg.src = "./imgs/ice-dungeon-1-crop.jpeg";
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
let interactionSprite;
let interactionAnimationID;
let next;

function initDoorway() {
  document.querySelector("#userInterface").style.display = "block";
  document.querySelector("#dialogueBox").style.display = "none";
  document.querySelector("#npcName").innerHTML = "Friend";
  document.querySelector("#enemyStats").style.width = 100;
  document.querySelector("#playerStats").style.right = 475;
  document.querySelector("#enemyStats").style.left = 875;
  document.querySelector("#playerStats").style.width = 100;
  document.querySelector("#enemyHealthBar").style.display = "none";
  document.querySelector("#playerHealthBar").style.display = "none";
  document.querySelector("#enemyBackgroundBar").style.height = "auto";
  document.querySelector("#playerBackgroundBar").style.height = "auto";
  document.querySelector("#attacksBox").replaceChildren();

  interactionChar = new InteractionCharacters(interactionCharacters.Player);
  friend = new InteractionCharacters(interactionCharacters.Friend);
  interactionSprite = [friend, interactionChar];
  next = [];

  interactionChar.dialogues.forEach((dialogue) => {
    const button = document.createElement("button");
    button.innerHTML = dialogue.name;
    document.querySelector("#attacksBox").append(button);
    //console.log("I am here 1" + dialogue.name);
  });

  document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", (e) => {
      const selectedDialogue = dialogues[e.currentTarget.innerHTML];
      interactionChar.dialogue({
        dialogue: selectedDialogue,
        recipient: friend,
        interactionSprite,
      });

      // if player selects greet, npc responds with welcome, if player selects order npc = orderresponse, player = goodbye npc = goodbye and onclick return to map
      if (selectedDialogue.name === "Greet") {
        next.push(() => {
          friend.dialogue({
            dialogue: dialogues.Welcome,
            recipient: interactionChar,
            interactionSprite,
          });
        });
      } else if (selectedDialogue.name === "Order") {
        next.push(() => {
          friend.dialogue({
            dialogue: dialogues.OrderResponse,
            recipient: interactionChar,
            interactionSprite,
          });
        });
      } else if (selectedDialogue.name === "Goodbye") {
        next.push(() => {
          friend.dialogue({
            dialogue: dialogues.Goodbye,
            recipient: interactionChar,
            interactionSprite,
          });
        });
            next.push(() => {
              gsap.to("#overlappingDiv", {
                opacity: 1,
                onComplete: () => {
                  cancelAnimationFrame(interactionAnimationID);
                  animate();
                  document.querySelector("#userInterface").style.display = "none";
                  gsap.to("#overlappingDiv", {
                    opacity: 0,
                  });
    
                  enemyBattle.initiated = false;
                  // adding this to prevent reinitialization in enemyBattle
                  player.position.y += 20;
                  playerHitBox.position.y += 20;
                  audio.Map.play();
                },
              });
            });
      }
    });

    button.addEventListener("mouseenter", (e) => {
      const selectedDialogue = dialogues[e.currentTarget.innerHTML];
      document.querySelector("#attackType").innerHTML = selectedDialogue.name;
    });
  });
}

function animateDoorway() {
  // if symbol === ? animate x background and x sprite, else if y then y back and y sprite, else z...

  //let doorwayName = doorway array symbol
  // use doorwayName in code and link doorwayName to the sprites and background

  interactionAnimationID = window.requestAnimationFrame(animateDoorway);
  friendHomeBackground.draw();

  interactionSprite.forEach((sprite) => {
    sprite.draw();
  });
}

document.querySelector("#dialogueBox").addEventListener("click", (e) => {
  if (next.length > 0) {
    next[0]();
    next.shift();
  } else e.currentTarget.style.display = "none";
});
