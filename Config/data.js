const MENU_DATA = {
  main: {
    board: {
      type: "image",
      data: [
        {
          image: IMG_ASSETS_LIST.misc.board_high,
          position: {
            x: 371,
            y: 70,
          },
          width: 538,
          height: 581,
        },
      ],
    },
    extraBoard: {
      type: "board",
      data: [],
    },
    extraGraphics: {
      type: "extra",
      data: [
        new Rope(467, -218), 
        new Rope(792, -218)],
    },
    extraText: {
      type: "text",
      data: [
        new HeadingText("Tower Defense", "FredokaOne", 48, 467, 172),
        new BasicText("© Martin Orlej, 2022", "FredokaOne", 16, 562, 600),
      ],
    },
    controls: {
      type: "button",
      data: [
        {
          clickEventData: {
            action: ActionTypes.GAME_STATE_SET,
            stateTarget: "game_state",
            stateChange: "continue",
            playState: "continue_saved",
          },
          position: {
            x: 537,
            y: 252,
          },
          width: 205,
          height: 78,
          image: IMG_ASSETS_LIST.buttons.continue,
        },
        {
          clickEventData: {
            action: ActionTypes.WINDOW_SET,
            windowTarget: "menu",
            windowChange: "instructions",
            
          },

          position: {
            x: 515,
            y: 354,
          },
          width: 249,
          height: 78,
          image: IMG_ASSETS_LIST.buttons.newGame,
        },
        {
          clickEventData: {
            action: ActionTypes.WINDOW_SET,
            windowTarget: "menu",
            windowChange: "settings",
          },
          position: {
            x: 591,
            y: 456,
          },
          width: 96,
          height: 96,
          image: IMG_ASSETS_LIST.buttons.settings,
        },
      ],
    },
  },
  settings: {
    board: {
      type: "image",
      data: [
        {
          image: IMG_ASSETS_LIST.misc.board_med,
          position: {
            x: 369,
            y: 56,
          },
          width: 542,
          height: 484,
        },
      ],
    },
    extraBoard: {
      type: "board",
      data: [new ExtraBoard(435, 190, 400, 187, "rgba(61, 41, 26, 0.65)")],
    },
    extraGraphics: {
      type: "extra",
      data: [
        new Rope(467, -218),
        new Rope(792, -218),
        new ExtraGraphic(
          IMG_ASSETS_LIST.bars.bar_yellow_opaque,
          520,
          242,
          240,
          14
        ),
        new ExtraGraphic(IMG_ASSETS_LIST.bars.bar_yellow, 520, 242, 240, 14),
      ],
    },
    extraText: {
      type: "text",
      data: [
        new HeadingText("Settings", "TitanOne", 48, 530, 150),
        new BasicText("Audio Volume", "TitanOne", 16, 581, 230),
      ],
    },
    controls: {
      type: "button",
      data: [
        {
          clickEventData: {
            action: ActionTypes.CONFIG_RESET,
          },
          position: {
            x: 487,
            y: 497,
          },
          width: 121,
          height: 72,
          image: IMG_ASSETS_LIST.buttons.reset,
        },
        {
          clickEventData: {
            action: ActionTypes.WINDOW_SET,
            windowTarget: "menu",
            windowChange: "return",
          },
          position: {
            x: 672,
            y: 497,
          },
          width: 121,
          height: 72,
          image: IMG_ASSETS_LIST.buttons.done,
        },
        {
          clickEventData: {
            action: ActionTypes.CONFIG_MODIFY,
            target: "audio",
            type: "mute",
          },
          position: {
            x: 552,
            y: 400,
          },
          width: 64,
          height: 64,
          image: IMG_ASSETS_LIST.buttons.audio_mute,
        },
        {
          clickEventData: {
            action: ActionTypes.CONFIG_MODIFY,
            target: "audio",
            type: "activate",
          },
          position: {
            x: 664,
            y: 400,
          },
          width: 64,
          height: 64,
          image: IMG_ASSETS_LIST.buttons.audio_on,
        },
        {
          clickEventData: {
            action: ActionTypes.CONFIG_MODIFY,
            target: "audio",
            type: "decrease",
          },
          position: {
            x: 472,
            y: 229,
          },
          width: 24,
          height: 24,
          image: IMG_ASSETS_LIST.buttons.audio_decrease,
        },
        {
          clickEventData: {
            action: ActionTypes.CONFIG_MODIFY,
            target: "audio",
            type: "increase",
          },
          position: {
            x: 784,
            y: 229,
          },
          width: 24,
          height: 24,
          image: IMG_ASSETS_LIST.buttons.audio_add,
        },
      ],
    },
  },
  menu: {
    board: {
      type: "image",
      data: [
        {
          image: IMG_ASSETS_LIST.misc.board_wide,
          position: {
            x: 317,
            y: 157,
          },
          width: 646,
          height: 406,
        },
      ],
    },
    extraBoard: {
      type: "board",
      data: [],
    },
    extraGraphics: {
      type: "extra",
      data: [new Rope(413, -120), new Rope(821, -120)],
    },
    extraText: {
      type: "text",
      data: [new HeadingText("Tower Defense", "FredokaOne", 48, 460, 260)],
    },
    controls: {
      type: "button",
      data: [
        {
          clickEventData: {
            action: ActionTypes.GAME_STATE_SET,
            stateTarget: "game_state",
            stateChange: "main",
          },
          position: {
            x: 424,
            y: 341,
          },
          width: 96,
          height: 96,
          image: IMG_ASSETS_LIST.buttons.back,
        },
        {
          clickEventData: {
            action: ActionTypes.GAME_STATE_SET,
            stateTarget: "game_state",
            stateChange: "resume",
          },
          position: {
            x: 592,
            y: 341,
          },
          width: 96,
          height: 96,
          image: IMG_ASSETS_LIST.buttons.resume,
        },
        {
          clickEventData: {
            action: ActionTypes.WINDOW_SET,
            windowTarget: "menu",
            windowChange: "settings",
          },
          position: {
            x: 760,
            y: 341,
          },
          width: 96,
          height: 96,
          image: IMG_ASSETS_LIST.buttons.settings,
        },
      ],
    },
  },
  instructions: {
    board: {
      type: "image",
      data: [
        {
          image: IMG_ASSETS_LIST.misc.board_wide,
          position: {
              x: 156,
              y: 56
          },
          width: 968,
          height: 552
        }
      ]
    },
    extraBoard: {
      type: "board",
      data: []
    },
    extraGraphics: {
      type: "extra",
      data: [
        new Rope(467,-218),
        new Rope(792,-218),
        new ExtraGraphic(IMG_ASSETS_LIST.towers.archer.level_1,289,239,137,153),
        new ExtraGraphic(IMG_ASSETS_LIST.towers.archer.level_3,831,239,137,153),
        new ExtraGraphic(IMG_ASSETS_LIST.enemies.heavy.heavy_1,563,244,108,147)

      ]
    },
    extraText: {
      type: "text",
      data: [
        new HeadingText("Instructions", "TitanOne",48,478,164),
        new BasicText("Build Towers","TitanOne",24,272,440),
        new BasicText("Kill Enemies","TitanOne",24,539,440),
        new BasicText("Upgrade Towers","TitanOne",24,791,440),
      ]
    },
    controls: {
      type: "button",
      data: [
        {
          clickEventData: {
              action: ActionTypes.GAME_STATE_SET,
              stateTarget: 'game_state',
              stateChange: 'play',
          },
          position: {
              x: 537,
              y: 565
          },
          width: 205,
          height: 67,
          image: IMG_ASSETS_LIST.buttons.play
      },
      ]
    }
  }
};

const LEVEL_DATA = {
  controls: {
    type: "button",
    data: [
      {
        clickEventData: {
          action: ActionTypes.GAME_STATE_SET,
          stateTarget: "game_state",
          stateChange: "pause",
        },
        position: {
          x: 1184,
          y: 24,
        },
        width: 64,
        height: 64,
        image: IMG_ASSETS_LIST.buttons.pause,
      },
      {
        clickEventData: {
          action: ActionTypes.ABILITY_USE,
          abilityTarget: "rock",
          fill: "rgba(24, 23, 20, 0.45)",
          manaCost: 40,
        },

        position: {
          x: 1168,
          y: 616,
        },
        width: 80,
        height: 80,
        image: IMG_ASSETS_LIST.abilities.ability_rocks,
      },
      {
        clickEventData: {
          action: ActionTypes.ABILITY_USE,
          abilityTarget: "poison",
          fill: "rgba(66, 255, 0, 0.3)",
          manaCost: 60,
        },

        position: {
          x: 1072,
          y: 616,
        },
        width: 80,
        height: 80,
        image: IMG_ASSETS_LIST.abilities.ability_poison,
      },
      {
        clickEventData: {
          action: ActionTypes.ABILITY_USE,
          abilityTarget: "freeze",
          fill: "rgba(0, 209, 255, 0.3)",
          manaCost: 40,
        },

        position: {
          x: 976,
          y: 616,
        },
        width: 80,
        height: 80,
        image: IMG_ASSETS_LIST.abilities.ability_freeze,
      },
      {
        clickEventData: {
          action: ActionTypes.ABILITY_USE,
          abilityTarget: "fire",
          fill: "rgba(255, 31, 0, 0.3)",
          manaCost: 75,
        },

        position: {
          x: 880,
          y: 616,
        },
        width: 80,
        height: 80,
        image: IMG_ASSETS_LIST.abilities.ability_fire,
      },
    ],
  },

  dataBoard: {
    type: "board",
    data: [
      new ExtraBoard(56, 82, 240, 40, "#3d291a"),
      new ExtraBoard(56, 164, 240, 40, "#3d291a"),
      new ExtraBoard(24, 24, 304, 268, "rgba(61, 41, 26, 0.65)"),
    ],
  },
  dataStationary: {
    text: {
      type: "text",
      data: [
        new BasicText("Coins", "TitanOne", 16, 56, 69),
        new BasicText("XP Points", "TitanOne", 16, 56, 151),
        new BasicText("Mana", "TitanOne", 16, 56, 234),
      ],
    },

    misc: {
      type: "image",
      data: [
        new ExtraGraphic(IMG_ASSETS_LIST.misc.gem, 72, 89, 25, 25),
        new ExtraGraphic(IMG_ASSETS_LIST.misc.star, 72, 171, 25, 25),
        new ExtraGraphic(
          IMG_ASSETS_LIST.bars.bar_blue_opaque,
          56,
          246,
          240,
          14
        ),
      ],
    },
  },
  dataAnimations: {
    texts: {
      type: "text",
      data: [
        new BasicText("0", "TitanOne", 16, 268, 105),
        new BasicText("0", "TitanOne", 16, 268, 188),
        new BasicText("0", "TitanOne", 16, 280, 234, "end"),
      ],
    },
    bars: {
      type: "image",
      data: [new ExtraGraphic(IMG_ASSETS_LIST.bars.bar_blue, 56, 246, 0, 14)],
    },
  },
};

const TOWER_UPGRADE = {
  controls: {
    type: "button",
    data: [
      {
        clickEventData: {
          action: ActionTypes.TOWER_LEVELUP_UNDO,
        },

        position: {
          x: 487,
          y: 601,
        },
        width: 121,
        height: 72,
        image: IMG_ASSETS_LIST.buttons.undo,
      },
      {
        clickEventData: {
          action: ActionTypes.GAME_STATE_SET,
          stateTarget: "game_state",
          stateChange: "resume",
        },

        position: {
          x: 672,
          y: 601,
        },
        width: 121,
        height: 72,
        image: IMG_ASSETS_LIST.buttons.done,
      },
      {
        clickEventData: {
          action: ActionTypes.GAME_STATE_SET,
          stateTarget: "game_state",
          stateChange: "resume",
        },

        position: {
          x: 953,
          y: 31,
        },
        width: 72,
        height: 72,
        image: IMG_ASSETS_LIST.buttons.close,
      },
      {
        clickEventData: {
          action: ActionTypes.TOWER_UPGRADE,
        },

        position: {
          x: 382,
          y: 502,
        },
        width: 155,
        height: 62,
        image: IMG_ASSETS_LIST.buttons.upgrade,
      },
      {
        clickEventData: {
          action: ActionTypes.TOWER_EXTRA_UPGRADE,
        },

        position: {
          x: 619,
          y: 502,
        },
        width: 73,
        height: 66,
        image: IMG_ASSETS_LIST.upgrades.tower.archer1,
      },
      {
        clickEventData: {
          action: ActionTypes.TOWER_EXTRA_UPGRADE,
        },

        position: {
          x: 724,
          y: 502,
        },
        width: 73,
        height: 66,
        image: IMG_ASSETS_LIST.upgrades.tower.archer2,
      },
      {
        clickEventData: {
          action: ActionTypes.TOWER_EXTRA_UPGRADE,
        },

        position: {
          x: 829,
          y: 502,
        },
        width: 73,
        height: 66,
        image: IMG_ASSETS_LIST.upgrades.tower.archer3,
      },
    ],
  },

  dataStationary: {
    text: {
      type: "text",
      data: [new HeadingText("Archer Tower", "TitanOne", 48, 459, 144)],
    },

    board: {
      type: "board",
      data: [new ExtraBoard(609, 189, 304, 280, "rgba(61, 41, 26, 0.65)")],
    },

    misc: {
      type: "image",
      data: [],
    },
  },

  // dataAnimations: {
  //     text: {
  //         type: "text",
  //         data: [
  //             new BasicText("1", "TitanOne",16,864,221),
  //             new BasicText("1", "TitanOne",16,864,285),
  //             new BasicText("1", "TitanOne",16,864,349),
  //             new BasicText("1", "TitanOne",16,864,413),
  //         ]
  //     },
  //     misc: {
  //         type: "image",
  //         data: [

  //         ]
  //     }
  // },

  board: {
    type: "image",
    data: [
      {
        image: IMG_ASSETS_LIST.misc.board_wide,
        position: {
          x: 274,
          y: 56,
        },
        width: 732,
        height: 588,
      },
    ],
  },
  extraText: {
    type: "text",
    data: [
      new BasicText("Level:", "TitanOne", 16, 403, 460),
      new BasicText("Strength", "TitanOne", 16, 641, 223),
      new BasicText("Attack Speed", "TitanOne", 16, 641, 285),
      new BasicText("Range", "TitanOne", 16, 641, 349),
      new BasicText("Archers", "TitanOne", 16, 641, 413),
      new BasicText("1/3", "TitanOne", 24, 462, 463),
      new BasicText("1", "TitanOne", 16, 864, 221),
      new BasicText("1", "TitanOne", 16, 864, 285),
      new BasicText("1", "TitanOne", 16, 864, 349),
      new BasicText("1", "TitanOne", 16, 864, 413),
    ],
  },
  extraGraphics: {
    type: "extra",
    data: [
      new ExtraGraphic(IMG_ASSETS_LIST.bars.bar_red, 641, 237, 240, 14),
      new ExtraGraphic(IMG_ASSETS_LIST.bars.bar_yellow, 641, 301, 240, 14),
      new ExtraGraphic(IMG_ASSETS_LIST.bars.bar_yellow, 641, 365, 240, 14),
      new ExtraGraphic(IMG_ASSETS_LIST.bars.bar_yellow, 641, 429, 240, 14),
    ],
  },
};

const LEVEL_1_PATHS = {
  basic: {
    data: [
    
    
        [-1006,119],
        [-966,119],
        [-926,119],
        [-886,119],
        [-846,119],
        [-806,119],
        [-766,119],
        [-726,119],
        [-686,119],
        [-646,119],
        [-606,119],
        [-566,119],
        [-526,119],
        [-486,119],
        [-446,119],
        [-406,119],
        [-366,119],
        [-326,119],
        [-286,119],
        [-246,119],
        [-206,119],
        [-166,119],
        [-126,119],
        [-86,119],
        [-46,119],
        [-16,119],
        [6, 119],
        [12, 123],
        [18, 128],
        [25, 133],
        [32, 140],
        [38, 148],
        [44, 156],
        [46, 164],
        [49, 172],
        [50, 181],
        [53, 189],
        [54, 197],
        [58, 207],
        [60, 217],
        [62, 224],
        [65, 232],
        [66, 239],
        [70, 248],
        [74, 256],
        [80, 267],
        [83, 273],
        [90, 280],
        [96, 287],
        [103, 294],
        [111, 300],
        [120, 308],
        [130, 312],
        [142, 316],
        [154, 319],
        [166, 320],
        [177, 323],
        [190, 323],
        [204, 324],
        [215, 324],
        [229, 326],
        [242, 328],
        [256, 328],
        [273, 329],
        [286, 330],
        [302, 332],
        [317, 333],
        [334, 335],
        [350, 337],
        [365, 339],
        [380, 341],
        [394, 347],
        [409, 353],
        [422, 360],
        [435, 364],
        [452, 369],
        [466, 371],
        [479, 372],
        [492, 373],
        [507, 376],
        [521, 379],
        [535, 381],
        [551, 383],
        [562, 385],
        [578, 388],
        [595, 393],
        [610, 397],
        [623, 404],
        [635, 411],
        [646, 419],
        [657, 428],
        [666, 442],
        [674, 458],
        [681, 473],
        [688, 489],
        [693, 505],
        [697, 522],
        [700, 535],
        [704, 549],
        [710, 561],
        [719, 571],
        [730, 577],
        [742, 582],
        [754, 588],
        [770, 595],
        [786, 599],
        [803, 603],
        [821, 604],
        [836, 605],
        [853, 607],
        [867, 608],
        [886, 608],
        [904, 609],
        [919, 611],
        [937, 612],
        [952, 612],
        [969, 612],
        [985, 613],
        [1002, 617],
        [1014, 623],
        [1030, 631],
        [1041, 640],
        [1051, 650],
        [1062, 660],
        [1072, 676],
        [1080, 689],
        [1088, 704],
        [1094, 716],
        [1094, 728],
        [1094, 740],
        [1094, 752],
        [1094, 764],
        [1094, 776],
        [1094, 788],
        [1094, 800],
    ],
  },
};
