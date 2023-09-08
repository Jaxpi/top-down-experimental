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
    // responds: false,
    name: "Player",
    dialogues: [dialogues.Greeting, dialogues.Order, dialogues.Request, dialogues.Goodbye],
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
    // responds: true,
    name: "Friend",
    dialogues: [dialogues.Greeting, dialogues.Request, dialogues.Goodbye],
  },

  Shopkeep: {
    position: {
      x: 500,
      y: 100,
    },
    image:  {
      src: './imgs/darkling-enemy-red.png'
    },
    frames: {
      max: 3,
      hold: 20,
    },
    animate: true,
    // responds: true,
    name: "Shopkeep",
    dialogues: [dialogues.Welcome, dialogues.OrderResponse, dialogues.Goodbye],
  },

  Doctor: {
    position: {
      x: 500,
      y: 100,
    },
    image:  {
      src: './imgs/darkling-enemy-blue.png'
    },
    frames: {
      max: 3,
      hold: 20,
    },
    animate: true,
    // responds: true,
    name: "Doctor",
    dialogues: [dialogues.Welcome, dialogues.OrderResponse, dialogues.Goodbye],
  },

  TavernOwner: {
    position: {
      x: 500,
      y: 100,
    },
    image:  {
      src: './imgs/darkling-enemy-blue.png'
    },
    frames: {
      max: 3,
      hold: 20,
    },
    animate: true,
    // responds: true,
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
      max: 3,
      hold: 20,
    },
    animate: true,
    // responds: true,
    name: "Grocer",
    dialogues: [dialogues.Welcome, dialogues.OrderResponse, dialogues.Goodbye],
  },

  IceBoss: {
    position: {
      x: 500,
      y: 100,
    },
    image:  {
      src: './imgs/iceBoss.png'
    },
    frames: {
      max: 3,
      hold: 20,
    },
    animate: true,
    // responds: true,
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
      hold: 20,
    },
    animate: true,
    // responds: true,
    name: "Sage",
    dialogues: [dialogues.Welcome, dialogues.Request, dialogues.Goodbye],
  },
};
