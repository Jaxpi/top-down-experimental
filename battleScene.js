const icyGrasslandImg = new Image();
icyGrasslandImg.src = "./imgs/icy-grassland-1-crop.jpeg";
const icyGrassland = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  image: icyGrasslandImg,
});

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
let battleAnimationID;
let queue;

function initFireBattle() {
  document.querySelector("#attackType").innerHTML = "";
  document.querySelector("#userInterface").style.display = "block";
  document.querySelector("#dialogueBox").style.display = "none";
  document.querySelector("#npcName").innerHTML = "Red Darkling";
  document.querySelector("#enemyHealthBar").style.width = "100%";
  document.querySelector("#playerHealthBar").style.width = "100%";
  document.querySelector("#enemyStats").style.width = 250;
  document.querySelector("#playerStats").style.left = 724;
  document.querySelector("#enemyStats").style.left = 50;
  document.querySelector("#playerStats").style.width = 250;
  document.querySelector("#enemyBars").style.display = "block";
  document.querySelector("#playerBars").style.display = "block";
  document.querySelector("#attacksBox").style.display = "grid";
  document.querySelector("#dialogueButtonsBox").style.display = "none";
  document.querySelector("#attacksBox").replaceChildren();

  battleChar = new BattleCharacters(battleCharacters.Player);
  darklingRed = new BattleCharacters(battleCharacters.DarklingRed);
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
      console.log(queue.length + "C");
      if (darklingRed.health <= 0) {
        queue.push(() => {
          darklingRed.faint();
        });
        queue.push(() => {
          gsap.to("#overlappingDiv", {
            opacity: 1,
            onComplete: () => {
              cancelAnimationFrame(battleAnimationID);
              animate();
              document.querySelector("#attacksBox").style.display = "none";
              document.querySelector("#dialogueBox").style.display = "none";
              document.querySelector("#userInterface").style.display = "none";
              queue = [];
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

      const randomAttack =
        darklingRed.attacks[
          Math.floor(Math.random() * darklingRed.attacks.length)
        ];

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
                cancelAnimationFrame(battleAnimationID);
                animate();
                document.querySelector("#attacksBox").style.display = "none";
                document.querySelector("#dialogueBox").style.display = "none";
                document.querySelector("#userInterface").style.display = "none";
                gsap.to("#overlappingDiv", {
                  opacity: 0,
                });

                enemyBattle.initiated = false;
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

function animateFireBattle() {
  console.log("run animateFireBattle");
  battleAnimationID = window.requestAnimationFrame(animateFireBattle);
  fireRuins.draw();

  renderedSprites.forEach((sprite) => {
    sprite.draw();
  });
}

function initIceBattle() {
  console.log("run initIceBattle");
  document.querySelector("#userInterface").style.display = "block";
  document.querySelector("#dialogueBox").style.display = "none";
  document.querySelector("#npcName").innerHTML = "Blue Darkling";
  document.querySelector("#enemyStats").style.width = 250;
  document.querySelector("#playerStats").style.left = 724;
  document.querySelector("#enemyStats").style.left = 50;
  document.querySelector("#playerStats").style.width = 250;
  document.querySelector("#enemyBars").style.display = "block";
  document.querySelector("#playerBars").style.display = "block";
  document.querySelector("#attacksBox").style.display = "grid";
  document.querySelector("#enemyHealthBar").style.width = "100%";
  document.querySelector("#playerHealthBar").style.width = "100%";
  document.querySelector("#dialogueButtonsBox").style.display = "none";
  document.querySelector("#attacksBox").replaceChildren();

  battleChar = new BattleCharacters(battleCharacters.Player);
  darklingBlue = new BattleCharacters(battleCharacters.DarklingBlue);
  renderedSprites = [darklingBlue, battleChar];
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
        recipient: darklingBlue,
        renderedSprites,
      });

      if (darklingBlue.health <= 0) {
        queue.push(() => {
          darklingBlue.faint();
        });
        queue.push(() => {
          gsap.to("#overlappingDiv", {
            opacity: 1,
            onComplete: () => {
              cancelAnimationFrame(battleAnimationID);
              animate();
              document.querySelector("#userInterface").style.display = "none";
              gsap.to("#overlappingDiv", {
                opacity: 0,
              });

              enemyBattle.initiated = false;
              audio.Map.play();
            },
          });
        });
      }

      const randomAttack =
        darklingBlue.attacks[
          Math.floor(Math.random() * darklingBlue.attacks.length)
        ];

      queue.push(() => {
        darklingBlue.attack({
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
                cancelAnimationFrame(battleAnimationID);
                animate();
                document.querySelector("#userInterface").style.display = "none";
                gsap.to("#overlappingDiv", {
                  opacity: 0,
                });

                enemyBattle.initiated = false;
                player.position.y += 20;
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

function animateIceBattle() {
  console.log("run animateIceBattle");
  battleAnimationID = window.requestAnimationFrame(animateIceBattle);
  icyGrassland.draw();

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

// initFireBattle();
// animateFireBattle();
// initIceBattle();
// animateIceBattle();
