const MENU_DATA = {
    main: {
        board:{
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
                 
                },
            ]
        },
        extraGraphics: {
            type: "extra",
            data: [
                new Rope(467,-218),
                new Rope(792,-218)
            ],
        },
        extraText: {
            type: 'text',
            data: [
                new HeadingText("Tower Defense", "FredokaOne", 48, 467,172),
                new BasicText("© Martin Orlej, 2022", "FredokaOne", 16,562,600)
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
                        playState: 'continue_saved'
                    },
                    position: {
                        x: 537,
                        y: 252
                    },
                    width: 205,
                    height: 78,
                    image: IMG_ASSETS_LIST.buttons.continue
                },
                {
                    clickEventData: {
                        action: ActionTypes.GAME_STATE_SET,
                        stateTarget: 'game_state',
                        stateChange: 'play',
                        playState: 'new_game'
                    },
             
                    position: {
                        x: 515,
                        y: 354
                    },
                    width: 249,
                    height: 78,
                    image: IMG_ASSETS_LIST.buttons.newGame
                },
                {
                    clickEventData: {
                        action: ActionTypes.WINDOW_SET,
                        windowTarget: 'menu',
                        windowChange: 'settings'
                    },
                    position: {
                        x: 591,
                        y: 456
                    },
                    width: 96,
                    height: 96,
                    image: IMG_ASSETS_LIST.buttons.settings
                }
            ]
        }
    },
    settings: {
        board: {
            type: "image",
            data: [
                {
                    image: IMG_ASSETS_LIST.misc.board_med,
                    position: {
                        x: 369,
                        y: 56
                    },
                    width: 542,
                    height: 484
                },
            ]
        },
        extraGraphics: {
            type: "extra",
            data: [
                new Rope(467,-218),
                new Rope(792,-218),
                new ExtraGraphic(IMG_ASSETS_LIST.bars.bar_yellow_opaque,520,242,240,14),
                new ExtraGraphic(IMG_ASSETS_LIST.bars.bar_yellow,520,242,240,14),
                

            ],
        },
        extraText: {
            type: "text",
            data: [
                new HeadingText("Settings", "TitanOne", 48,530,150),
                new BasicText("Audio Volume", "TitanOne",16,581,230)
            ]
        },
        controls: {
            type: "button",
            data: [
                {
                    clickEventData: {
                        action: ActionTypes.CONFIG_RESET
                    },
                    position: {
                        x: 487,
                        y: 497
                    },
                    width: 121,
                    height: 72,
                    image: IMG_ASSETS_LIST.buttons.reset
                },
                {
                    clickEventData: {
                        action: ActionTypes.WINDOW_SET,
                        windowTarget: 'menu',
                        windowChange: 'return'
                    },
                    position: {
                        x: 672,
                        y: 497
                    },
                    width: 121,
                    height: 72,
                    image: IMG_ASSETS_LIST.buttons.done
                },
                {
                    clickEventData: {
                        action: ActionTypes.CONFIG_MODIFY,
                        target: 'audio',
                        type: 'mute',
                    },
                    position: {
                        x: 552,
                        y: 400
                    },
                    width: 64,
                    height: 64,
                    image: IMG_ASSETS_LIST.buttons.audio_mute
                },
                {
                    clickEventData: {
                        action: ActionTypes.CONFIG_MODIFY,
                        target: 'audio',
                        type: 'activate',
                    },
                    position: {
                        x: 664,
                        y: 400
                    },
                    width: 64,
                    height: 64,
                    image: IMG_ASSETS_LIST.buttons.audio_on
                },
                {
                    clickEventData: {
                        action: ActionTypes.CONFIG_MODIFY,
                        target: 'audio',
                        type: 'decrease',         
                    },
                    position: {
                        x: 472,
                        y: 229
                    },
                    width: 24,
                    height: 24,
                    image: IMG_ASSETS_LIST.buttons.audio_decrease
                },
                {
                    clickEventData: {
                        action: ActionTypes.CONFIG_MODIFY,
                        target: 'audio',
                        type: 'increase', 
                    },
                    position: {
                        x: 784,
                        y: 229
                    },
                    width: 24,
                    height: 24,
                    image: IMG_ASSETS_LIST.buttons.audio_add
                },
            ]
        }
    },
    menu: {
        board: {
            type: 'image',
            data: [
                {
                    image: IMG_ASSETS_LIST.misc.board_wide,
                    position: {
                        x: 317,
                        y: 157
                    },
                    width: 646,
                    height: 406
                },
            ]
        },
        extraGraphics: {
            type: 'extra',
            data: [
                new Rope(413,-120),
                new Rope(821,-120)
            ]
        },
        extraText: {
            type: "text",
            data: [
                new HeadingText("Tower Defense", "FredokaOne",48,460,260)
            ]
        },
        controls: {
            type: 'button',
            data: [
                {
                    clickEventData: {
                        action: ActionTypes.GAME_STATE_SET,
                        stateTarget: 'game_state',
                        stateChange: 'main'
                    },
                    position: {
                        x: 424,
                        y: 341
                    },
                    width: 96,
                    height: 96,
                    image: IMG_ASSETS_LIST.buttons.back,
                },
                {
                    clickEventData: {
                        action: ActionTypes.GAME_STATE_SET,
                        stateTarget: 'game_state',
                        stateChange: 'resume',
                    },
                    position: {
                        x: 592,
                        y: 341
                    },
                    width: 96,
                    height: 96,
                    image: IMG_ASSETS_LIST.buttons.resume,
                },
                {
                    clickEventData: {
                        action: ActionTypes.WINDOW_SET,
                        windowTarget: 'menu',
                        windowChange: 'settings'
                    },
                    position: {
                        x: 760,
                        y: 341
                    },
                    width: 96,
                    height: 96,
                    image: IMG_ASSETS_LIST.buttons.settings,
                },
            ]
        }

    }
}

const LEVEL_DATA = {
    controls: {
        type: 'button',
        data: [
            {
                clickEventData: {
                    action: ActionTypes.GAME_STATE_SET,
                    stateTarget: 'game_state',
                    stateChange: 'pause',
                },
                position: {
                    x: 1184,
                    y: 24
                },
                width: 64,
                height: 64,
                image: IMG_ASSETS_LIST.buttons.pause
            },
            {
                clickEventData: {
                    action: ActionTypes.ABILITY_USE,
                    abilityTarget: 'rock',
                    fill: 'rgba(24, 23, 20, 0.45)',
                    manaCost: 40
                },
               
                position: {
                    x: 1168,
                    y: 616
                },
                width: 80,
                height: 80,
                image: IMG_ASSETS_LIST.abilities.ability_rocks
            },
            {
                clickEventData: {
                    action: ActionTypes.ABILITY_USE,
                    abilityTarget: 'poison',
                    fill: 'rgba(66, 255, 0, 0.3)',
                    manaCost: 60
                },
               
                position: {
                    x: 1072,
                    y: 616
                },
                width: 80,
                height: 80,
                image: IMG_ASSETS_LIST.abilities.ability_poison
            },
            {
                clickEventData: {
                    action: ActionTypes.ABILITY_USE,
                    abilityTarget: 'freeze',
                    fill: 'rgba(0, 209, 255, 0.3)',
                    manaCost: 40
                },
               
                position: {
                    x: 976,
                    y: 616
                },
                width: 80,
                height: 80,
                image: IMG_ASSETS_LIST.abilities.ability_freeze
            },
            {
                clickEventData: {
                    action: ActionTypes.ABILITY_USE,
                    abilityTarget: 'fire',
                    fill: 'rgba(255, 31, 0, 0.3)',
                    manaCost: 75
                },
               
                position: {
                    x: 880,
                    y: 616
                },
                width: 80,
                height: 80,
                image: IMG_ASSETS_LIST.abilities.ability_fire
            },
        ]
    },

    dataBoard: {
        type: "board",
        data: [
            new ExtraBoard(56,82,240,40,'#3d291a'),
            new ExtraBoard(56,164,240,40,'#3d291a'),
            new ExtraBoard(24,24,304,268,'rgba(61, 41, 26, 0.65)'),

        ]
    },
    dataStationary: {
        text: {
            type: "text",
            data: [
                new BasicText("Coins", "TitanOne", 16,56,69),
                new BasicText("XP Points", "TitanOne", 16,56,151),
                new BasicText("Mana", "TitanOne", 16,56,234),
         
            ]
        },

        misc: {
            type: 'image',
            data: [
                new ExtraGraphic(IMG_ASSETS_LIST.misc.gem,72,89,25,25),
                new ExtraGraphic(IMG_ASSETS_LIST.misc.star,72,171,25,25),
                new ExtraGraphic(IMG_ASSETS_LIST.bars.bar_blue_opaque,56,246,240,14),

            ]
        }
        
    },
    dataAnimations: {
        texts: {
            type: "text",
            data: [
                new BasicText("0", "TitanOne", 16,268,105),
                new BasicText("0", "TitanOne", 16,268,188),
                new BasicText("0", "TitanOne", 16,280,234,"end"),
            ]
        },
        bars: {
            type: 'image',
            data: [
                new ExtraGraphic(IMG_ASSETS_LIST.bars.bar_blue,56,246,0,14),

            ]
        }   
    }
}