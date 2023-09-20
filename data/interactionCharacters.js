const interactionCharacters = {
  Player: {
    position: {
      x: 50,
      y: 120,
    },
    image: {
      src: './imgs/interactionChar.png'
    },
    frames: {
      max: 1,
    },
    animate: true,
    isNPC: false,
    name: "Player",
    dialogues: [dialogues.Greet, dialogues.Order, dialogues.Request, dialogues.Goodbye],
  },

  Staff: {
    position: {
        x: 580,
        y: 270,
      },
    image: {
        src: './imgs/chalice-icon-L.png'
      },
      frames: {
        max: 8,
        hold: 20,
      },
    animate: true,
    isNPC: true,
    name: "Staff",
    dialogues: [dialogues.Greet]
},

  Friend: {
    position: {
      x: 500,
      y: 50,
    },
    image:  {
      src: './imgs/friend.png'
    },
    frames: {
      max: 1,
    },
    animate: true,
    isNPC: true,
    name: "Friend",
    dialogues: [dialogues.Greet, dialogues.Request, dialogues.Goodbye],
  },

  Friend2: {
    position: {
      x: 500,
      y: 50,
    },
    image:  {
      src: './imgs/friend2.png'
    },
    frames: {
      max: 1,
    },
    animate: true,
    isNPC: true,
    name: "Friend",
    dialogues: [dialogues.Greet, dialogues.Request, dialogues.Goodbye],
  },

  Friend3: {
    position: {
      x: 500,
      y: 50,
    },
    image:  {
      src: './imgs/friend3.png'
    },
    frames: {
      max: 1,
    },
    animate: true,
    isNPC: true,
    name: "Friend",
    dialogues: [dialogues.Greet, dialogues.Request, dialogues.Goodbye],
  },

  Shopkeep: {
    position: {
      x: 500,
      y: 28,
    },
    image:  {
      src: './imgs/shopkeep.png'
    },
    frames: {
      max: 1,
      hold: 20,
    },
    animate: true,
    isNPC: true,
    name: "Shopkeep",
    dialogues: [dialogues.Welcome, dialogues.OrderResponse, dialogues.Goodbye],
  },

  Doctor: {
    position: {
      x: 500,
      y: 30,
    },
    image:  {
      src: './imgs/doctor.png'
    },
    frames: {
      max: 1,
      hold: 20,
    },
    animate: true,
    isNPC: true,
    name: "Doctor",
    dialogues: [dialogues.Welcome, dialogues.OrderResponse, dialogues.Goodbye],
  },

  TavernOwner: {
    position: {
      x: 500,
      y: 100,
    },
    image:  {
      src: ''
    },
    frames: {
      max: 1,
      hold: 20,
    },
    animate: true,
    isNPC: true,
    name: "Tavern Owner",
    dialogues: [dialogues.Welcome, dialogues.OrderResponse, dialogues.Goodbye],
  },

  Grocer: {
    position: {
      x: 500,
      y: 100,
    },
    image:  {
      src: './imgs/grocer.png'
    },
    frames: {
      max: 1,
      hold: 20,
    },
    animate: true,
    isNPC: true,
    name: "Grocer",
    dialogues: [dialogues.Welcome, dialogues.OrderResponse, dialogues.Goodbye],
  },

  IceBoss: {
    position: {
      x: 700,
      y: 200,
    },
    image:  {
      src: './imgs/iceBoss.png'
    },
    frames: {
      max: 3,
      hold: 40,
    },
    animate: true,
    isNPC: true,
    name: "Ice Boss",
    dialogues: [dialogues.Welcome, dialogues.Goodbye],
  },

  Sage: {
    position: {
      x: 500,
      y: 100,
    },
    image:  {
      src: './imgs/fire-sage.png'
    },
    frames: {
      max: 3,
      hold: 40,
    },
    animate: true,
    isNPC: true,
    name: "Sage",
    dialogues: [dialogues.Welcome, dialogues.Request, dialogues.Goodbye],
  },

  Blank: {
    position: {
      x: 500,
      y: 100,
    },
    image:  {
      src: ''
    },
    frames: {
      max: 3,
      hold: 40,
    },
    animate: true,
    isNPC: true,
    name: "",
    dialogues: [dialogues.Welcome, dialogues.Request, dialogues.Goodbye],
  },
};
