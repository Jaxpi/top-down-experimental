// const generalStoreImg = new Image();
// generalStoreImg.src = "./imgs/general-store-3.jpg";
// const generalStoreBackground = new Sprite({
//   position: {
//     x: 0,
//     y: 0,
//   },
//   image: generalStoreImg,
// });

// const icyGrasslandImg = new Image();
// icyGrasslandImg.src = "./imgs/icy-grassland-1-crop.jpeg";
// const icyGrassland = new Sprite({
//   position: {
//     x: 0,
//     y: 0,
//   },
//   image: icyGrasslandImg,
// });

const fireRuinsImg = new Image();
fireRuinsImg.src = "./imgs/ruins-7-crop.jpeg";
const fireRuins = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  image: fireRuinsImg,
});

let battleChar;
let darkling;
let darklingRed;
let darklingBlue;
let renderedSprites;
let interactionAnimationID;
let queue;

function initBattle() {
  document.querySelector("#userInterface").style.display = "block";
  document.querySelector("#dialogueBox").style.display = "none";
  document.querySelector("#enemyHealthBar").style.width = "100%";
  document.querySelector("#playerHealthBar").style.width = "100%";
  document.querySelector("#attacksBox").replaceChildren();

  battleChar = new BattleCharacters(battleCharacters.Player);
  darkling = new BattleCharacters(battleCharacters.Darkling);
  darklingRed = new BattleCharacters(battleCharacters.DarklingRed);
  darklingBlue = new BattleCharacters(battleCharacters.DarklingBlue);
  renderedSprites = [darklingRed, battleChar];
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
        recipient: darklingRed,
        renderedSprites,
      });

      if (darklingRed.health <= 0) {
        queue.push(() => {
          darklingRed.faint();
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

      const randomAttack =
        darklingRed.attacks[Math.floor(Math.random() * darklingRed.attacks.length)];

      queue.push(() => {
        darklingRed.attack({
          attack: randomAttack,
          recipient: battleChar,
          renderedSprites,
        });

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

                enemyBattle.initiated = false
                player.position.y += 20
                audio.Map.play();

              },
            });
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

function animateBattle() {
  interactionAnimationID = window.requestAnimationFrame(animateBattle);
  fireRuins.draw();

  renderedSprites.forEach((sprite) => {
    sprite.draw();
  });
}

initBattle();
animateBattle();

document.querySelector("#dialogueBox").addEventListener("click", (e) => {
  if (queue.length > 0) {
    queue[0]();
    queue.shift();
  } else e.currentTarget.style.display = "none";
});
