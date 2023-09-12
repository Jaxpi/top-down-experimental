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
let npc = this.npc;

function initDoorway() {
  // THIS IS LOGGING MANY TIMES
  console.log("run initDoorway");
  document.querySelector("#userInterface").style.display = "block";
  document.querySelector("#dialogueBox").style.display = "none";
  document.querySelector("#enemyStats").style.width = 100;
  document.querySelector("#playerStats").style.left = 450;
  document.querySelector("#enemyStats").style.left = 875;
  document.querySelector("#playerStats").style.width = 100;
  document.querySelector("#enemyBars").style.display = "none";
  document.querySelector("#playerBars").style.display = "none";
  document.querySelector("#attacksBox").style.display = "none";
  document.querySelector("#npcName").innerHTML = "Friend";
  document.querySelector("#dialogueButtonsBox").replaceChildren();

  interactionChar = new InteractionCharacters(interactionCharacters.Player);
  friend = new InteractionCharacters(interactionCharacters.Friend);
  // let interactionChar = new InteractionCharacters(interactionCharacters.Player);
  // let friend = new InteractionCharacters(interactionCharacters.Friend);
  // let sage = new InteractionCharacters(interactionCharacters.Sage);
  // let tavernOwner = new InteractionCharacters(interactionCharacters.TavernOwner);
  // let doctor = new InteractionCharacters(interactionCharacters.Doctor);
  // let shopkeep = new InteractionCharacters(interactionCharacters.Shopkeep);
  // let grocer = new InteractionCharacters(interactionCharacters.Grocer);
  // let iceBoss = new InteractionCharacters(interactionCharacters.IceBoss);
  interactionSprite = [interactionChar, friend];
  next = [];

  interactionChar.dialogues.forEach((dialogue) => {
    const button = document.createElement("button");
    button.innerHTML = dialogue.name;
    document.querySelector("#dialogueButtonsBox").append(button);
  });

  document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", (e) => {
      const selectedDialogue = dialogues[e.currentTarget.innerHTML];
      interactionChar.dialogue({
        dialogue: selectedDialogue,
        // recipient: friend,
        // interactionSprite,
      });
      if (selectedDialogue.name === "Greet") {
        next.push(() => {
          friend.dialogue({
            dialogue: dialogues.Welcome,
            // recipient: interactionChar,
            // interactionSprite,
          });
        });
      } else if (selectedDialogue.name === "Order") {
        next.push(() => {
          friend.dialogue({
            dialogue: dialogues.OrderResponse,
            // recipient: interactionChar,
            // interactionSprite,
          });
        });
      } else if (selectedDialogue.name === "Goodbye") {
        next.push(() => {
          friend.dialogue({
            dialogue: dialogues.Goodbye,
            // recipient: interactionChar,
            // interactionSprite,
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
              player.position.y += 20;
              playerHitBox.position.y += 20;
              player.image = player.sprites.down;
              //   audio.Map.play();
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

// function animateDoorway() {
// WHY IS THIS CALLING THOUSANDS OF TIMES PER SECOND AND NOT STOPPING AFTER DOORWAY SCENE IS OVER?
//   console.log("run animate doorway");
//   interactionAnimationID = window.requestAnimationFrame(animateDoorway);
//   let npcCharName;
//   switch (doorwayNameSpot.symbol) {
//     case 4267:
//       friendHomeBackground.draw();
//       npc = friend;
//       npcCharName = "Friend";
//       break;
//     case 4268:
//       friendHomeBackground.draw();
//       npc = friend;
//       npcCharName = "Friend";
//       break;
//     case 4269:
//       friendHomeBackground.draw();
//       npc = friend;
//       npcCharName = "Friend";
//       break;
//     case 4270:
//       homeBackground.draw();
//       document.querySelector("#enemyStats").style.display = "none";
//       break;
//     case 4271:
//       grocerBackground.draw();
//       npc = grocer;
//       npcCharName = "Grocer";
//       break;
//     case 4272:
//       tavernBackground.draw();
//       npc = tavernOwner;
//       npcCharName = "Tavern Owner";
//       break;
//     case 4273:
//       medicalBackground.draw();
//       npc = doctor;
//       npcCharName = "Doctor";
//       break;
//     case 4274:
//       generalStoreBackground.draw();
//       npc = shopkeep;
//       npcCharName = "Shopkeep";
//       break;
//     case 4278:
//       sageBackground.draw();
//       npc = sage;
//       npcCharName = "Sage";
//       break;
//     case 4279:
//       iceDungeonBackground.draw();
//       npc = iceBoss;
//       npcCharName = "Icy McIcersson";
//       break;
//   }
//   document.querySelector("#npcName").innerHTML = npcCharName;
//   interactionSprite.forEach((sprite) => {
//     sprite.draw();
//   });
// }

function animateDoorway() {
  // WHY IS THIS CALLING THOUSANDS OF TIMES PER SECOND AND NOT STOPPING AFTER DOORWAY SCENE IS OVER?
  console.log("run animate doorway");
  interactionAnimationID = window.requestAnimationFrame(animateDoorway);
  friendHomeBackground.draw();
  //   document.querySelector("#npcName").innerHTML = npcCharName;
  interactionSprite.forEach((sprite) => {
    sprite.draw();
  });
}

// sage = 4277; grocer = 4271; tavern = 4272; doctor = 4273; shop = 4274; friend 3 = 4267; friend 2 = 4268; friend 1 = 4269; home = 4270; icedungeon = 4278

// home has no dialogue - just store items, retrieve items, and change clothes (or something; maybe "play a game to pass some time" and have a match 3 or bubble shooter game)

document.querySelector("#dialogueBox").addEventListener("click", (e) => {
  if (next.length > 0) {
    next[0]();
    next.shift();
  } else e.currentTarget.style.display = "none";
});

// initDoorway();
// animateDoorway();
