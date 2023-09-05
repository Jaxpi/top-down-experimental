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

battleChar.attacks.forEach((attack) => {
  const button = document.createElement('button')
  button.innerHTML = attack.name
  document.querySelector('#attacksBox').append(button)
})

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

    const randomAttack = darkling.attacks[Math.floor(Math.random() * darkling.attacks.length)]

    queue.push(() => {
      darkling.attack({
        attack: randomAttack,
        recipient: battleChar,
        renderedSprites,
      });
    })
  });
  button.addEventListener('mouseenter', (e) => {
    const selectedAttack = attacks[e.currentTarget.innerHTML];
    document.querySelector('#attackType').innerHTML = selectedAttack.type
    document.querySelector('#attackType').style.color = selectedAttack.color
  })
});

document.querySelector("#dialogueBox").addEventListener("click", (e) => {
  if (queue.length > 0) {
    queue[0]()
    queue.shift()
  } else e.currentTarget.style.display = "none";
});
