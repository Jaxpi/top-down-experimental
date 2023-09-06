const generalStoreImg = new Image();
generalStoreImg.src = "./imgs/general-store-3.jpg";
const generalStoreBackground = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  image: generalStoreImg,
});

let battleChar;
let darkling;
let renderedSprites;
let interactionAnimationID;
let queue;

function initInteraction() {
  document.querySelector('#userInterface').style.display = 'block'
  document.querySelector('#dialogueBox').style.display = 'none'
  document.querySelector('#enemyHealthBar').style.width = '100%'
  document.querySelector('#playerHealthBar').style.width = '100%'
  document.querySelector('#attacksBox').replaceChildren()
  
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

function animateInteraction() {
  interactionAnimationID = window.requestAnimationFrame(animateInteraction);
  generalStoreBackground.draw();

  renderedSprites.forEach((sprite) => {
    sprite.draw();
  });
}

initInteraction();
animateInteraction();

document.querySelector("#dialogueBox").addEventListener("click", (e) => {
  if (queue.length > 0) {
    queue[0]();
    queue.shift();
  } else e.currentTarget.style.display = "none";
});
