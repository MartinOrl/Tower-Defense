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
  },
  gameOver: {
    board: {
      type: "image",
      data: [
        {
          image: IMG_ASSETS_LIST.misc.board_high,
          position: {
              x: 371,
              y: 70
          },
          width: 538,
          height: 581
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
        new ExtraGraphic(IMG_ASSETS_LIST.misc.lose_star,515,181,250,138),
        new ExtraGraphic(IMG_ASSETS_LIST.misc.lose,515,69,250,102),
        new ExtraGraphic(IMG_ASSETS_LIST.misc.star,655,372,48,48)

      ]
    },
    extraText: {
      type: "text",
      data: [
        new HeadingText("+ 0", "FredokaOne",48,572,415),
      ]
    },
    controls: {
      type: "button",
      data: [
        {
          clickEventData: {
              action: ActionTypes.GAME_STATE_SET,
              stateTarget: 'game_state',
              stateChange: 'main',
          },
          position: {
              x: 511,
              y: 582
          },
          width: 96,
          height: 96,
          image: IMG_ASSETS_LIST.buttons.menu
        },
        {
          clickEventData: {
              action: ActionTypes.GAME_STATE_SET,
              stateTarget: 'game_state',
              stateChange: 'play',
          },
          position: {
              x: 672,
              y: 582
          },
          width: 96,
          height: 96,
          image: IMG_ASSETS_LIST.buttons.resetLevel
        },
        {
          clickEventData: {
              action: ActionTypes.GAME_STATE_SET,
              stateTarget: 'game_state',
              stateChange: 'player_upgrade',
          },
          position: {
              x: 543,
              y: 457
          },
          width: 194,
          height: 80,
          image: IMG_ASSETS_LIST.buttons.upgrade
        },
      ]
    }
  },
  gameWin: {
    board: {
      type: "image",
      data: [
        {
          image: IMG_ASSETS_LIST.misc.board_high,
          position: {
              x: 371,
              y: 70
          },
          width: 538,
          height: 581
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
        new ExtraGraphic(IMG_ASSETS_LIST.misc.win_star,515,181,250,138),
        new ExtraGraphic(IMG_ASSETS_LIST.misc.win,515,69,250,102),
        new ExtraGraphic(IMG_ASSETS_LIST.misc.star,655,372,48,48)

      ]
    },
    extraText: {
      type: "text",
      data: [
        new HeadingText("+ 5", "FredokaOne",48,572,415),
      ]
    },
    controls: {
      type: "button",
      data: [
        {
          clickEventData: {
              action: ActionTypes.GAME_STATE_SET,
              stateTarget: 'game_state',
              stateChange: 'main',
          },
          position: {
              x: 511,
              y: 582
          },
          width: 96,
          height: 96,
          image: IMG_ASSETS_LIST.buttons.menu
        },
        {
          clickEventData: {
              action: ActionTypes.GAME_STATE_SET,
              stateTarget: 'game_state',
              stateChange: 'level_change',
          },
          position: {
              x: 672,
              y: 582
          },
          width: 96,
          height: 96,
          image: IMG_ASSETS_LIST.buttons.nextLevel
        },
        {
          clickEventData: {
              action: ActionTypes.GAME_STATE_SET,
              stateTarget: 'game_state',
              stateChange: 'player_upgrade',
          },
          position: {
              x: 543,
              y: 457
          },
          width: 194,
          height: 80,
          image: IMG_ASSETS_LIST.buttons.upgrade
        },
      ]
    }
  },
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
        new ExtraGraphic(IMG_ASSETS_LIST.bars.bar_blue_opaque,56,246,240,14),
        new ExtraGraphic(IMG_ASSETS_LIST.misc.board_info,536,0,208,49),
        new ExtraGraphic(IMG_ASSETS_LIST.misc.heart,608,8,27,24)
      ],
    },
  },
  dataAnimations: {
    texts: {
      type: "text",
      data: [
        new BasicText("0", "TitanOne", 16, 280, 107,"end"),
        new BasicText("0", "TitanOne", 16, 268, 188),
        new BasicText("0", "TitanOne", 16, 280, 234, "end"),
        new BasicText("20", "TitanOne", 16,651, 24)
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
      new BasicText("1/3", "TitanOne", 24, 465, 463),
      new BasicText("1", "TitanOne", 16, 876, 221,"end"),
      new BasicText("1", "TitanOne", 16, 876, 285,"end"),
      new BasicText("1", "TitanOne", 16, 876, 349,"end"),
      new BasicText("1", "TitanOne", 16, 876, 413,"end"),
    ],
  },
  extraGraphics: {
    type: "extra",
    data: [
      new ExtraGraphic(IMG_ASSETS_LIST.bars.bar_red_opaque, 641, 237, 240, 14),
      new ExtraGraphic(IMG_ASSETS_LIST.bars.bar_yellow_opaque, 641, 301, 240, 14),
      new ExtraGraphic(IMG_ASSETS_LIST.bars.bar_yellow_opaque, 641, 365, 240, 14),
      new ExtraGraphic(IMG_ASSETS_LIST.bars.bar_red, 641, 237, 240, 14),
      new ExtraGraphic(IMG_ASSETS_LIST.bars.bar_yellow, 641, 301, 240, 14),
      new ExtraGraphic(IMG_ASSETS_LIST.bars.bar_yellow, 641, 365, 240, 14),
      new ExtraGraphic(IMG_ASSETS_LIST.bars.bar_yellow, 641, 429, 240, 14),
    ],
  },
};



const LEVEL_PATHS = {
  level_1: {
    basic: {
      data: [
        [1628,148],
        [1618,148],
        [1608,148],
        [1598,148],
        [1588,148],
        [1578,148],
        [1568,148],
        [1558,148],
        [1548,148],
        [1538,148],
        [1528,148],
        [1518,148],
        [1508,148],
        [1498,148],
        [1488,148],
        [1478,148],
        [1468,148],
        [1458,148],
        [1448,148],
        [1438,148],
        [1428,148],
        [1418,148],
        [1408,148],
        [1398,148],
        [1388,148],
        [1378,148],
        [1368,148],
        [1358,148],
        [1348,148],
        [1338,148],
        [1328,148],
        [1318,148],
        [1308,148],
        [1298,148],
        [1288,148],
        [1278, 148],
        [1248, 149],
        [1218, 151],
        [1188, 151],
        [1158, 151],
        [1128, 151],
        [1098, 151],
        [1068, 151],
        [1038, 151],
        [1008, 151],
        [978, 151],
        [948, 151],
        [918, 151],
        [888, 151],
        [858, 151],
        [828, 151],
        [798, 151],
        [768, 151],
        [738, 151],
        [708, 151],
        [678, 151],
        [648, 151],
        [618, 152],
        [588, 153],
        [558, 153],
        [528, 153],
        [499, 161],
        [478, 182],
        [461, 207],
        [445, 232],
        [441, 261],
        [443, 290],
        [449, 319],
        [470, 340],
        [497, 350],
        [525, 358],
        [554, 365],
        [582, 374],
        [608, 388],
        [634, 401],
        [652, 424],
        [663, 451],
        [670, 479],
        [678, 507],
        [670, 536],
        [641, 546],
        [611, 551],
        [582, 559],
        [557, 575],
        [535, 596],
        [519, 621],
        [516, 650],
        [513, 679],
        [513, 709],
      ]
    },
    boss: {
      data: [
        [
          974,
          371
        ],
        [
          997,
          352
        ],
        [
          1010,
          325
        ],
        [
          1008,
          295
        ],
        [
          1002,
          265
        ],
        [
          989,
          237
        ],
        [
          967,
          216
        ],
        [
          941,
          200
        ],
        [
          912,
          189
        ],
        [
          886,
          172
        ],
        [
          857,
          162
        ],
        [
          827,
          157
        ],
        [
          797,
          156
        ],
        [
          767,
          154
        ],
        [
          737,
          154
        ],
        [
          707,
          153
        ],
        [
          677,
          151
        ],
        [
          647,
          151
        ],
        [
          617,
          151
        ],
        [
          587,
          150
        ],
        [
          557,
          151
        ],
        [
          527,
          157
        ],
        [
          498,
          166
        ],
        [
          474,
          185
        ],
        [
          458,
          210
        ],
        [
          444,
          236
        ],
        [
          440,
          265
        ],
        [
          441,
          294
        ],
        [
          448,
          323
        ],
        [
          469,
          344
        ],
        [
          494,
          359
        ],
        [
          518,
          375
        ],
        [
          547,
          381
        ],
        [
          576,
          385
        ],
        [
          605,
          392
        ],
        [
          631,
          406
        ],
        [
          648,
          430
        ],
        [
          663,
          455
        ],
        [
          671,
          483
        ],
        [
          672,
          512
        ],
        [
          657,
          538
        ],
        [
          628,
          548
        ],
        [
          600,
          559
        ],
        [
          572,
          570
        ],
        [
          547,
          586
        ],
        [
          527,
          609
        ],
        [
          519,
          638
        ],
        [
          514,
          667
        ],
        [
          514,
          697
        ],
        [
          515,
          726
        ]
      ]
    }
  },
  level_2: {
    basic: {
      data: [
        [959,-521],
        [959,-506],
        [959,-491],
        [959,-476],
        [959,-461],
        [959,-446],
        [959,-431],
        [959,-416],
        [959,-401],
        [959,-386],
        [959,-371],
        [959,-356],
        [959,-341],
        [959,-326],
        [959,-311],
        [959,-296],
        [959,-281],
        [959,-266],
        [959,-251],
        [959,-236],
        [959,-221],
        [959,-206],
        [959,-191],
        [959,-176],
        [959,-161],
        [959,-146],
        [959,-131],
        [959,-116],
        [959,-101],
        [959,-86],
        [959,-71],
        [959,-56],
        [959,-41],
        [959,-26],
        [959,-11],
        [959, 4],
        [958, 33],
        [957, 62],
        [957, 92],
        [957, 121],
        [957, 151],
        [957, 181],
        [957, 211],
        [957, 241],
        [957, 271],
        [957, 300],
        [957, 330],
        [957, 360],
        [957, 390],
        [957, 420],
        [958, 449],
        [956, 478],
        [947, 506],
        [921, 521],
        [891, 526],
        [861, 527],
        [831, 525],
        [802, 515],
        [776, 499],
        [755, 477],
        [741, 450],
        [738, 420],
        [735, 390],
        [738, 360],
        [738, 330],
        [739, 300],
        [736, 270],
        [727, 241],
        [716, 212],
        [698, 187],
        [675, 166],
        [648, 151],
        [618, 147],
        [588, 145],
        [558, 137],
        [528, 138],
        [498, 138],
        [468, 139],
        [438, 142],
        [409, 150],
        [385, 168],
        [367, 192],
        [350, 217],
        [341, 245],
        [333, 273],
        [320, 300],
        [306, 326],
        [288, 350],
        [260, 361],
        [230, 367],
        [202, 377],
        [176, 392],
        [152, 411],
        [137, 437],
        [126, 464],
        [122, 493],
        [124, 522],
        [131, 550],
        [149, 573],
        [176, 584],
        [204, 591],
        [233, 595],
        [262, 602],
        [287, 617],
        [306, 639],
        [321, 664],
        [327, 693],
        [329, 722],
        
      ]
    },
    boss: {
      data: [
        [
          1278,
          529
        ],
        [
          1248,
          529
        ],
        [
          1218,
          529
        ],
        [
          1188,
          529
        ],
        [
          1158,
          529
        ],
        [
          1128,
          529
        ],
        [
          1098,
          529
        ],
        [
          1068,
          529
        ],
        [
          1038,
          529
        ],
        [
          1008,
          529
        ],
        [
          978,
          529
        ],
        [
          948,
          529
        ],
        [
          918,
          529
        ],
        [
          888,
          530
        ],
        [
          858,
          529
        ],
        [
          828,
          525
        ],
        [
          799,
          517
        ],
        [
          773,
          501
        ],
        [
          751,
          480
        ],
        [
          736,
          453
        ],
        [
          734,
          423
        ],
        [
          735,
          393
        ],
        [
          732,
          363
        ],
        [
          729,
          333
        ],
        [
          728,
          303
        ],
        [
          726,
          273
        ],
        [
          723,
          243
        ],
        [
          716,
          213
        ],
        [
          703,
          185
        ],
        [
          681,
          164
        ],
        [
          654,
          150
        ],
        [
          625,
          141
        ],
        [
          595,
          137
        ],
        [
          565,
          136
        ],
        [
          535,
          135
        ],
        [
          505,
          135
        ],
        [
          475,
          135
        ],
        [
          445,
          135
        ],
        [
          416,
          143
        ],
        [
          388,
          155
        ],
        [
          371,
          180
        ],
        [
          355,
          205
        ],
        [
          344,
          233
        ],
        [
          339,
          262
        ],
        [
          328,
          290
        ],
        [
          313,
          316
        ],
        [
          288,
          333
        ],
        [
          263,
          349
        ],
        [
          234,
          359
        ],
        [
          205,
          369
        ],
        [
          177,
          381
        ],
        [
          153,
          399
        ],
        [
          135,
          423
        ],
        [
          121,
          449
        ],
        [
          116,
          478
        ],
        [
          116,
          507
        ],
        [
          121,
          536
        ],
        [
          141,
          557
        ],
        [
          168,
          569
        ],
        [
          196,
          579
        ],
        [
          225,
          584
        ],
        [
          254,
          591
        ],
        [
          281,
          603
        ],
        [
          299,
          626
        ],
        [
          317,
          649
        ],
        [
          326,
          677
        ],
        [
          331,
          706
        ]
      ]
    }
  },
  level_3: {
    basic: {
      data: [
        [-520,488],
        [-505,488],
        [-490,488],
        [-475,488],
        [-460,488],
        [-445,488],
        [-430,488],
        [-415,488],
        [-400,488],
        [-385,488],
        [-370,488],
        [-355,488],
        [-340,488],
        [-325,488],
        [-310,488],
        [-295,488],
        [-280,488],
        [-265,488],
        [-250,488],
        [-235,488],
        [-220,488],
        [-205,488],
        [-190,488],
        [-175,488],
        [-160,488],
        [-145,488],
        [-130,488],
        [-115,488],
        [-100,488],
        [-85,488], 
        [-70,488], 
        [-55,488], 
        [-40,488], 
        [-25,488], 
        [-10,488], 
        [5, 488],  
        [34, 489], 
        [63, 487], 
        [93, 487], 
        [122, 488],
        [151, 493],
        [179, 501],
        [206, 513],
        [232, 527],
        [256, 543],
        [285, 548],
        [315, 548],
        [343, 539],
        [371, 530],
        [400, 531],
        [428, 539],
        [456, 547],
        [485, 552],
        [514, 554],
        [543, 559],
        [573, 559],
        [603, 559],
        [632, 557],
        [661, 555],
        [690, 556],
        [719, 560],
        [748, 553],
        [776, 544],
        [800, 526],
        [823, 506],
        [840, 481],
        [844, 451],
        [844, 421],
        [831, 393],
        [810, 371],
        [784, 354],
        [755, 345],
        [725, 342],
        [695, 338],
        [665, 334],
        [635, 333],
        [605, 331],
        [575, 327],
        [545, 323],
        [515, 315],
        [485, 307],
        [461, 288],
        [439, 267],
        [426, 239],
        [423, 209],
        [430, 179],
        [446, 153],
        [469, 134],
        [496, 121],
        [525, 113],
        [554, 105],
        [584, 105],
        [613, 102],
        [642, 100],
        [671, 100],
        [700, 101],
        [730, 101],
        [759, 102],
        [788, 101],
        [817, 100],
        [847, 100],
        [877, 100],
        [907, 100],
        [937, 100],
        [966, 100],
        [995, 100],
        [1024, 100],
        [1053, 100],
        [1082, 100],
        [1111, 100],
        [1140, 100],
        [1169, 100],
        [1198, 100],
        [1227, 100],
        [1256, 101],
        [1285, 102],
        
      ]
    },
    boss: {
      data:[
        [
          1011,
          617
        ],
        [
          984,
          630
        ],
        [
          955,
          639
        ],
        [
          925,
          640
        ],
        [
          895,
          640
        ],
        [
          865,
          640
        ],
        [
          835,
          640
        ],
        [
          805,
          640
        ],
        [
          775,
          640
        ],
        [
          745,
          639
        ],
        [
          716,
          628
        ],
        [
          691,
          610
        ],
        [
          683,
          580
        ],
        [
          699,
          555
        ],
        [
          728,
          557
        ],
        [
          757,
          551
        ],
        [
          783,
          537
        ],
        [
          807,
          520
        ],
        [
          828,
          498
        ],
        [
          839,
          470
        ],
        [
          840,
          440
        ],
        [
          834,
          410
        ],
        [
          814,
          387
        ],
        [
          793,
          365
        ],
        [
          764,
          356
        ],
        [
          734,
          351
        ],
        [
          704,
          346
        ],
        [
          674,
          344
        ],
        [
          644,
          342
        ],
        [
          614,
          339
        ],
        [
          584,
          335
        ],
        [
          554,
          328
        ],
        [
          524,
          320
        ],
        [
          496,
          306
        ],
        [
          470,
          290
        ],
        [
          447,
          270
        ],
        [
          439,
          240
        ],
        [
          436,
          210
        ],
        [
          439,
          180
        ],
        [
          450,
          152
        ],
        [
          472,
          131
        ],
        [
          498,
          117
        ],
        [
          526,
          108
        ],
        [
          555,
          102
        ],
        [
          584,
          102
        ],
        [
          613,
          99
        ],
        [
          642,
          99
        ],
        [
          671,
          99
        ],
        [
          700,
          97
        ],
        [
          729,
          97
        ],
        [
          758,
          97
        ],
        [
          787,
          98
        ],
        [
          816,
          100
        ],
        [
          845,
          97
        ],
        [
          875,
          97
        ],
        [
          904,
          99
        ],
        [
          933,
          97
        ],
        [
          962,
          99
        ],
        [
          991,
          99
        ],
        [
          1020,
          97
        ],
        [
          1049,
          99
        ],
        [
          1078,
          102
        ],
        [
          1107,
          101
        ],
        [
          1136,
          98
        ],
        [
          1165,
          100
        ],
        [
          1194,
          101
        ],
        [
          1223,
          99
        ],
        [
          1252,
          100
        ],
        [
          1281,
          103
        ]
      ]
    }
  }
}

