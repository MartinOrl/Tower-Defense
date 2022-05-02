const MENU_DATA = {
    main: {
        board:{
            type: "image",
            data: [
                {
                    image: IMG_ASSETS_LIST.misc.board_high.image,
                    position: {
                        x: 371,
                        y: 70
                    },
                    width: 538,
                    height: 581
                 
                },
            ]
        },
        ropes: {
            type: "extra",
            data: [
                new Rope(467,-218),
                new Rope(792,-218)
            ],
        },
        text: {
            type: 'text',
            data: [
                new HeadingText("Tower Defense", "FredokaOne", 48, 467,172),
                new BasicText("© Martin Orlej, 2022", "FredokaOne", 16,562,600)
            ]
        },
        buttons: {
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
                    image: IMG_ASSETS_LIST.buttons.continue.image
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
                    image: IMG_ASSETS_LIST.buttons.newGame.image
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
                    image: IMG_ASSETS_LIST.buttons.settings.image
                }
            ]
        }
    }
}