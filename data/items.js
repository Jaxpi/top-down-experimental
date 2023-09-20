// need to make a class for these

// benefits of elixers lasts only for the battle being used in, weapon benefits lasts as long as equipped

const items = {
    HealthPotion: {
      name: "Health Potion",
      benefit: "Health + 25%",
        type: "elixer",
        image: {
            src: './imgs/potion-icon.png'
          },
          frames: {
            max: 8,
          },
          animate: true,
    },
    PowerPotion: {
        name: "Power Potion",
        benefit: "Damage + 25%",
        type: "elixer",
        image: {
            src: './imgs/potion-icon-red.png'
          },
          frames: {
            max: 8,
          },
          animate: true,
    },
    ShieldPotion: {
        name: "Shield Potion",
        benefit: "Defense + 25%",
        type: "elixer",
        image: {
            src: './imgs/potion-icon-blue.png'
          },
          frames: {
            max: 8,
          },
          animate: true,
    },
    Staff: {
        name: "Staff",
        benefit: "Health, Damage, and Defense + 5%",
        type: "weapon",
        image: {
            src: './imgs/chalice-icon.png'
          },
          frames: {
            max: 8,
          },
        animate: true,
    },
    Sword: {
        name: "Sword",
        benefit: "Damage + 10%, Defense + 5%",
        type: "weapon",
        image: {
            src: './imgs/sword-icon.png'
          },
          frames: {
            max: 8,
          },
          animate: true,
    },
    Axe: {
        name: "Axe",
        benefit: "Defense + 10%, Damage + 5%",
        type: "weapon",
        image: {
            src: './imgs/bow-icon.png'
          },
          frames: {
            max: 8,
          },
          animate: true,
    },
    Nomad: {
        name: "Nomad",
        benefit: "Health, Damage, and Defense + 5%",
        type: "outfit",
        image: {
            src: './imgs/interactionChar.png'
          },
          frames: {
            max: 1,
          },
          animate: true,
    },
    Warrior: {
        name: "Warrior",
        benefit: "Damage + 10%, Defense + 5%",
        type: "outfit",
        image: {
            src: './imgs/interactionChar.png'
          },
          frames: {
            max: 1,
          },
          animate: true,
    },
    Guardian: {
        name: "Guardian",
        benefit: "Defense + 10%, Damage + 5%",
        type: "outfit",
        image: {
            src: './imgs/interactionChar.png'
          },
          frames: {
            max: 1,
          },
          animate: true,
    },
    Mystic: {
        name: "Mystic",
        benefit: "Health + 10%, Damage + 2.5%, Defense + 2.5%",
        type: "outfit",
        image: {
            src: './imgs/interactionChar.png'
          },
          frames: {
            max: 1,
          },
          animate: true,
    },
  };