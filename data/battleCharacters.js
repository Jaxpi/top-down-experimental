const battleCharacters = {
  Player: {
    position: {
      x: 100,
      y: 220,
    },
    image: {
      src: './imgs/elf-player-up-lg.png'
    },
    frames: {
      max: 3,
    },
    animate: true,
    name: "Player",
    attacks: [attacks.Tackle, attacks.Poison],
  },

  Darkling: {
    position: {
      x: 500,
      y: 100,
    },
    image:  {
      src: './imgs/darkling-enemy-1.png'
    },
    frames: {
      max: 3,
      hold: 20,
    },
    animate: true,
    isEnemy: true,
    name: "Enemy",
    attacks: [attacks.Shadow, attacks.Haunt],
  },
};
