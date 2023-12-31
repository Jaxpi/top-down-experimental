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
tavernImg.src = "./imgs/tavern.png";
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
homeImg.src = "./imgs/home.jpeg";
const homeBackground = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  image: homeImg,
});

const friendHomeImg = new Image();
friendHomeImg.src = "./imgs/friendHome.jpeg";
const friendHomeBackground = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  image: friendHomeImg,
});

const friend2HomeImg = new Image();
friend2HomeImg.src = "./imgs/friend2Home.jpeg";
const friend2HomeBackground = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  image: friend2HomeImg,
});

const friend3HomeImg = new Image();
friend3HomeImg.src = "./imgs/friend3Home.jpeg";
const friend3HomeBackground = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  image: friendHomeImg,
});

let interactionChar;
let friend;
let friend2;
let friend3;
let sage;
let tavernOwner;
let doctor;
let shopkeep;
let grocer;
let iceBoss;
let interactionSprite;
let interactionAnimationID;
let next;
let npc;
let npcCharName;
let staff;

function initDoorway() {
  document.querySelector("#attackType").innerHTML = "";
  document.querySelector("#userInterface").style.display = "block";
  document.querySelector("#dialogueBox").style.display = "none";
  document.querySelector("#enemyStats").style.width = 100;
  document.querySelector("#playerStats").style.left = 450;
  document.querySelector("#enemyStats").style.left = 875;
  document.querySelector("#playerStats").style.width = 100;
  document.querySelector("#enemyBars").style.display = "none";
  document.querySelector("#playerBars").style.display = "none";
  document.querySelector("#attacksBox").style.display = "none";
  document.querySelector("#dialogueButtonsBox").style.display = "grid";
  document.querySelector("#dialogueButtonsBox").replaceChildren();

  interactionChar = new InteractionCharacters(interactionCharacters.Player);
  friend = new InteractionCharacters(interactionCharacters.Friend);
  friend2 = new InteractionCharacters(interactionCharacters.Friend2);
  friend3 = new InteractionCharacters(interactionCharacters.Friend3);
  sage = new InteractionCharacters(interactionCharacters.Sage);
  tavernOwner = new InteractionCharacters(interactionCharacters.TavernOwner);
  doctor = new InteractionCharacters(interactionCharacters.Doctor);
  shopkeep = new InteractionCharacters(interactionCharacters.Shopkeep);
  grocer = new InteractionCharacters(interactionCharacters.Grocer);
  iceBoss = new InteractionCharacters(interactionCharacters.IceBoss);
  blank = new InteractionCharacters(interactionCharacters.Blank);
  staff = new InteractionCharacters(interactionCharacters.Staff);

  switch (doorwayNameSpot.symbol) {
    case 4267:
      friend3HomeBackground.draw();
      npc = friend3;
      npcCharName = "Red";
      break;
    case 4268:
      friend2HomeBackground.draw();
      npc = friend2;
      npcCharName = "Green";
      break;
    case 4269:
      friendHomeBackground.draw();
      npc = friend;
      npcCharName = "Friend";
      break;
    case 4270:
      homeBackground.draw();
      npc = staff;
      document.querySelector("#enemyStats").style.display = "none";
      break;
    case 4271:
      grocerBackground.draw();
      npc = grocer;
      npcCharName = "Grocer";
      break;
    case 4272:
      tavernBackground.draw();
      npc = tavernOwner;
      npcCharName = "Tavern Owner";
      break;
    case 4273:
      medicalBackground.draw();
      npc = doctor;
      npcCharName = "Doctor";
      break;
    case 4274:
      generalStoreBackground.draw();
      npc = shopkeep;
      npcCharName = "Shopkeep";
      break;
    case 4277:
      sageBackground.draw();
      npc = sage;
      npcCharName = "Sage";
      break;
    case 4278:
      iceDungeonBackground.draw();
      npc = iceBoss;
      npcCharName = "Icy Spider";
      break;
  }

  document.querySelector("#npcName").innerHTML = npcCharName;
  interactionSprite = [interactionChar, npc];
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
      });
      if (selectedDialogue.name === "Greet") {
        next.push(() => {
          npc.dialogue({
            dialogue: dialogues.Welcome,
          });
        });
      } else if (selectedDialogue.name === "Order") {
        next.push(() => {
          npc.dialogue({
            dialogue: dialogues.OrderResponse,
          });
        });
      } else if (selectedDialogue.name === "Goodbye") {
        next.push(() => {
          npc.dialogue({
            dialogue: dialogues.Goodbye,
          });
        });
        next.push(() => {
          gsap.to("#overlappingDiv", {
            opacity: 1,
            onComplete: () => {
              cancelAnimationFrame(interactionAnimationID);
              animate();
              document.querySelector("#userInterface").style.display = "none";
              document.querySelector("#dialogueBox").style.display = "none";
              gsap.to("#overlappingDiv", {
                opacity: 0,
              });

              enemyBattle.initiated = false;
              player.position.y += 20;
              playerHitBox.position.y += 20;
              player.image = player.sprites.down;
              // if (!mute) audio.Map.play();
            },
          });
        });
      }
    });

    button.addEventListener("mouseenter", (e) => {
      const selectedDialogue = dialogues[e.currentTarget.innerHTML];
      document.querySelector("#attackType").innerHTML = selectedDialogue.name;
      document.querySelector("#attackType").style.color = "black";
    });
  });
}

function animateDoorway() {
  interactionAnimationID = window.requestAnimationFrame(animateDoorway);
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
