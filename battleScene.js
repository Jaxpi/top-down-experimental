const generalStoreImg = new Image();
generalStoreImg.src = "./imgs/general-store-3.jpg";
const generalStoreBackground = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  image: generalStoreImg,
});

const battleChar = new BattleCharacters(battleCharacters.Player);

const darkling = new BattleCharacters(battleCharacters.Darkling);

const renderedSprites = [darkling, battleChar];

const button = document.createElement('button')
button.innerHTML = ''
document.querySelector('#attacksBox').append(button)

function animateInteraction() {
  window.requestAnimationFrame(animateInteraction);
  generalStoreBackground.draw();

  renderedSprites.forEach((sprite) => {
    sprite.draw();
  });
}

animateInteraction();

const queue = [];

document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", (e) => {
    const selectedAttack = attacks[e.currentTarget.innerHTML];
    battleChar.attack({
      attack: selectedAttack,
      recipient: darkling,
      renderedSprites,
    });

    queue.push(() => {
      darkling.attack({
        attack: attacks.Tackle,
        recipient: battleChar,
        renderedSprites,
      });
    })
    queue.push(() => {
      darkling.attack({
        attack: attacks.Shadow,
        recipient: battleChar,
        renderedSprites,
      });
    })
  });
});

document.querySelector("#dialogueBox").addEventListener("click", (e) => {
  if (queue.length > 0) {
    queue[0]()
    queue.shift()
  } else e.currentTarget.style.display = "none";
});
