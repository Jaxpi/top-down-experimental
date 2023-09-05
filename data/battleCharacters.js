const battleCharImg = new Image();
battleCharImg.src = "./imgs/elf-player-up-lg.png";

const darklingImg = new Image();
darklingImg.src = "./imgs/darkling-enemy-1.png";

const battleCharacters = {
  Player: {
    position: {
      x: 100,
      y: 220,
    },
    image: battleCharImg,
    frames: {
      max: 3,
    },
    animate: true,
    name: "Player",
    attacks: [attacks.Tackle, attacks.Shadow],
  },

  Darkling: {
    position: {
      x: 500,
      y: 100,
    },
    image: darklingImg,
    frames: {
      max: 3,
      hold: 20,
    },
    animate: true,
    isEnemy: true,
    name: "Enemy",
    attacks: [attacks.Shadow],
  },
};
