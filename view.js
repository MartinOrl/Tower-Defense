CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    this.beginPath();
    this.moveTo(x+r, y);
    this.arcTo(x+w, y,   x+w, y+h, r);
    this.arcTo(x+w, y+h, x,   y+h, r);
    this.arcTo(x,   y+h, x,   y,   r);
    this.arcTo(x,   y,   x+w, y,   r);
    this.closePath();
    return this;
}

CanvasRenderingContext2D.prototype.borderThick = function (x, y, w, h, r,th) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    this.beginPath();
    this.lineWidth = th;
    this.moveTo(x+r, y);
    this.arcTo(x+w, y,   x+w, y+h, r);
    this.arcTo(x+w, y+h, x,   y+h, r);
    this.arcTo(x,   y+h, x,   y,   r);
    this.arcTo(x,   y,   x+w, y,   r);
    this.closePath();
    return this;
}

function createImage(data){

    let image = new Image();
    if(data.opacity){
        console.log("Setting opacity for image")
        data.context.globalAlpha = data.opacity
    }
    image.src = data.image;
    image.onload = function(){
        data.context.drawImage(image,data.position.x, data.position.y, data.width, data.height)
    }
}

function renderExtraBoard(data){
    console.log(data)
    const {position, context} = data;
    
    context.beginPath();
    context.strokeStyle = "#956134";
    context.fillStyle = data.fill ? data.fill : "#3D291A";
    context.roundRect(position.x, position.y, data.width, data.height,8).fill();
    context.borderThick(position.x, position.y, data.width, data.height,8,3).stroke();
    context.closePath();
}

function createText(data){
    if(data.gradientData){
        let gradient = data.context.createLinearGradient(...data.gradientData.angles)
        data.gradientData.steps.forEach(step => {
            gradient.addColorStop(...step)
        })
        data.context.fillStyle = gradient
    }
    else{
        data.context.fillStyle = data.fill
    }
    if(data.shadow){
        data.context.shadowBlur = data.shadow.blur;
        data.context.shadowOffsetX = data.shadow.offsetX
        data.context.shadowOffsetY = data.shadow.offsetY
        data.context.shadowColor = data.shadow.color
    } else{
        data.context.shadowBlur = 0
        data.context.shadowOffsetX = 0
        data.context.shadowOffsetY = 0
        data.context.shadowColor = 'rgba(0,0,0,0)'
    }
   
    data.context.font = `${data.fontSize} ${data.font}`
    data.context.fillText(data.text,data.position.x,data.position.y)
}

function clearCanvas(canvas){
    canvas.getContext("2d").clearRect(0,0,canvas.width, canvas.height)
}

function setGameBackground(url){
    document.querySelector(".canvas_bg").style.background = `url(${url})`
}

function setGameBackgroundAlpha(alpha){
    document.querySelector("#board_canvas").style.zIndex = alpha ? 15 : 5
    document.querySelector("#control_canvas").style.zIndex = alpha ? 15 : 5
    document.querySelector("#text").style.zIndex = alpha ? 16 : 5
    document.querySelector(".shadow").style.zIndex = alpha ? 14 : -1
    document.querySelector(".shadow").style.opacity = alpha ? 1 : 0
}

class Text{
    constructor(text,font, fontSize, x, y,ctx){
        this.text = text;
        this.context = ctx ? ctx : document.querySelector("#text").getContext("2d");
        this.position = {
            x,y
        }
        this.font = font;
        this.fontSize = `${fontSize}px`
    }
}

class HeadingText extends Text{
    constructor(text,font, fontSize, x,y,ctx=false){
        super(text,font, fontSize, x,y,ctx)
        
        this.gradientData = {
            angles: [0,180,0,0],
            steps: [
                [0,'#FAE90F'],
                [0.4406, '#FAE90F'],
                [1, '#F7BB1F']
            ]
        }
        this.shadow = {
            color: '#C43D1C',
            offsetY: 3,
            offsetX: 0,
            blur: 0
        }

    }
}

class BasicText extends Text{
    constructor(text,font, fontSize, x,y,ctx=false){
        super(text,font, fontSize, x,y,ctx)
        this.fill = '#fff'
    }
}

class ExtraGraphic{
    constructor(url,ctx,x,y,w,h){
        this.image = url
        this.context = ctx
        this.position = {
            x,y
        }
        this.width = w
        this.height = h

    }
}

class ExtraBoard{
    constructor(ctx, x,y,w,h,fill=false){
        this.context = ctx
        this.position = {
            x,y
        }
        this.width = w
        this.height = h
        this.fill = fill
    }
}


class Renderer{
    constructor(parent, targetCanvas="", data=false){
        this.targetCanvas = targetCanvas ? targetCanvas : ''
        this.parent = parent
        this.data = data ? data : {
            buttonsData: [],
            abilitiesData: [],
            textsData: [],
            background: {
                boardData: {

                },
                ropes: [
    
                ]
            }
        }
        this.eventManager = false
    }

    setEventManager(manager){
        this.eventManager = manager
    }

    createHTML(){
        let target = document.querySelector(".actions")
        target.innerHTML = ''

        let data = [
            ...this.data.buttonsData
        ]

        if(Object.keys(this.data).includes("abilitiesData")){
            data = [
                ...data,
                ...this.data.abilitiesData
            ]
        }

        data.forEach(element => {
 
            let {position, width, height} = element
            let newHTMLElement = document.createElement("span")
            newHTMLElement.style.left = `${position.x}px`;
            newHTMLElement.style.top = `${position.y}px`;
            newHTMLElement.style.width = `${width}px`;
            newHTMLElement.style.height = `${height}px`;
            newHTMLElement.addEventListener("click", () => {
                this.eventManager.fireEvent(element.clickEventData)
            })
            target.appendChild(newHTMLElement)
        })
        
    }

    render(){
        let keys = Object.keys(this.data)
        this.data.buttonsData.forEach(button => {
            createImage(button)
        })

        if(keys.includes("textsData")){
            this.data.textsData.forEach(text => {
                createText(text)
            })
        }
 
        if(keys.includes("abilitiesData")){
            this.data.abilitiesData.forEach(ability => {
                createImage(ability)
            })
        }

        if(keys.includes("background")){
            if(Object.keys(this.data.background).length != 0){
                clearCanvas(document.querySelector("#board_canvas"))
                createImage(this.data.background.boardData)
                if(Object.keys(this.data.background).includes("ropes")){
                    this.data.background.ropes.forEach(rope => {
                        createImage(rope)
                    })
                }
            }
        }
        if(keys.includes("extraGraphics")){
            this.data.extraGraphics.forEach(extra => {
                createImage(extra)
            })
        }
        if(keys.includes("extraBoard")){
         
            this.data.extraBoard.forEach(board => {
                console.log(board)
                renderExtraBoard(board)
            })
        }

    }

}


class MenuRenderer extends Renderer{
    constructor(parent){
        super(parent)
        this.canvasTarget = document.querySelector("#control_canvas")
        this.activeMenuWindow = 'main'
        this.windowsHistory = ['main']
        this.menuData = {
            main: {
                background: {
                    boardData: {
                        context: document.querySelector("#board_canvas").getContext("2d"),
                        image: './Assets/Misc/board_high.webp',
                        position: {
                            x: 371,
                            y: 70
                        },
                        width: 538,
                        height: 581
                    },
                    ropes: [
                        {
                            context: this.canvasTarget.getContext("2d"),
                            image: './Assets/Misc/rope.webp',
                            position: {
                                x: 467,
                                y: -218
                            },
                            width: 21,
                            height: 317
                        },
                        {
                            context: this.canvasTarget.getContext("2d"),
                            image: './Assets/Misc/rope.webp',
                            position: {
                                x: 792,
                                y: -218
                            },
                            width: 21,
                            height: 317
                        }
                    ]
                },
                textsData: [
                    new HeadingText("Tower Defense", "FredokaOne", 48, 467,172),
                    new BasicText("© Martin Orlej, 2022", "FredokaOne", 16,562,600)
                ],
                buttonsData: [
                    {
                        clickEventData: {
                            action: ActionTypes.GAME_STATE_SET,
                            stateTarget: 'game_state',
                            stateChange: 'play',
                            playState: 'continue_saved'
                        },
                        context: this.canvasTarget.getContext("2d", {alpha: false}),
                        position: {
                            x: 537,
                            y: 252
                        },
                        width: 205,
                        height: 78,
                        image: './Assets/Buttons/continue.webp'
                    },
                    {
                        clickEventData: {
                            action: ActionTypes.GAME_STATE_SET,
                            stateTarget: 'game_state',
                            stateChange: 'play',
                            playState: 'new_game'
                        },
                        context: this.canvasTarget.getContext("2d", {alpha: false}),
                        position: {
                            x: 515,
                            y: 354
                        },
                        width: 249,
                        height: 78,
                        image: './Assets/Buttons/newGame.webp'
                    },
                    {
                        clickEventData: {
                            action: ActionTypes.WINDOW_SET,
                            windowTarget: 'menu',
                            windowChange: 'settings'
                        },
                        context: this.canvasTarget.getContext("2d", {alpha: false}),
                        position: {
                            x: 591,
                            y: 456
                        },
                        width: 96,
                        height: 96,
                        image: './Assets/Buttons/settings.webp'
                    }
                ]
            },
            settings: {
                background: {
                    boardData: {
                        context: document.querySelector("#board_canvas").getContext("2d"),
                        image: './Assets/Misc/board_med.webp',
                        position: {
                            x: 369,
                            y: 56
                        },
                        width: 542,
                        height: 484
                    },
                    ropes: [
                        {
                            context: this.canvasTarget.getContext("2d"),
                            image: './Assets/Misc/rope.webp',
                            position: {
                                x: 467,
                                y: -218
                            },
                            width: 21,
                            height: 317
                        },
                        {
                            context: this.canvasTarget.getContext("2d"),
                            image: './Assets/Misc/rope.webp',
                            position: {
                                x: 792,
                                y: -218
                            },
                            width: 21,
                            height: 317
                        }
                    ]
                },
                textsData: [
                    new HeadingText("Settings", "TitanOne", 48,530,150),
                    new BasicText("Audio Volume", "TitanOne",16,581,230)
                ],
                buttonsData: [
                    {
                        clickEventData: {
                            action: ActionTypes.CONFIG_RESET
                        },
                        context: this.canvasTarget.getContext("2d", {alpha: false}),
                        position: {
                            x: 487,
                            y: 497
                        },
                        width: 121,
                        height: 72,
                        image: './Assets/Buttons/reset.webp'
                    },
                    {
                        clickEventData: {
                            action: ActionTypes.WINDOW_SET,
                            windowTarget: 'menu',
                            windowChange: 'return'
                        },
                        context: this.canvasTarget.getContext("2d", {alpha: false}),
                        position: {
                            x: 672,
                            y: 497
                        },
                        width: 121,
                        height: 72,
                        image: './Assets/Buttons/done.webp'
                    },
                    {
                        clickEventData: {
                            action: ActionTypes.CONFIG_MODIFY,
                            target: 'audio',
                            type: 'mute',
                        },
                        context: this.canvasTarget.getContext("2d", {alpha: false}),
                        position: {
                            x: 552,
                            y: 400
                        },
                        width: 64,
                        height: 64,
                        image: './Assets/Buttons/audio_mute.webp'
                    },
                    {
                        clickEventData: {
                            action: ActionTypes.CONFIG_MODIFY,
                            target: 'audio',
                            type: 'activate',
                        },
                        context: this.canvasTarget.getContext("2d", {alpha: false}),
                        position: {
                            x: 664,
                            y: 400
                        },
                        width: 64,
                        height: 64,
                        image: './Assets/Buttons/audio_on.webp'
                    },
                    {
                        clickEventData: {
                            action: ActionTypes.CONFIG_MODIFY,
                            target: 'audio',
                            type: 'decrease',         
                        },
                        context: this.canvasTarget.getContext("2d", {alpha: false}),
                        position: {
                            x: 472,
                            y: 229
                        },
                        width: 24,
                        height: 24,
                        image: './Assets/Buttons/audio_decrease.webp'
                    },
                    {
                        clickEventData: {
                            action: ActionTypes.CONFIG_MODIFY,
                            target: 'audio',
                            type: 'increase', 
                        },
                        context: this.canvasTarget.getContext("2d", {alpha: false}),
                        position: {
                            x: 784,
                            y: 229
                        },
                        width: 24,
                        height: 24,
                        image: './Assets/Buttons/audio_add.webp'
                    },

                ],
                extraGraphics: [
                    new ExtraGraphic('./Assets/Bars/bar_yellow_transparent.png',document.querySelector("#extra_graphics").getContext("2d"),520,242,240,14),
                    new ExtraGraphic('./Assets/Bars/bar_yellow.png',document.querySelector("#extra_graphics").getContext("2d"),520,242,240,14),
                    
                ],
                extraBoard: [
                    {
                        context: this.canvasTarget.getContext("2d"),
                        position: {
                            x: 435,
                            y: 190
                        },
                        width: 400,
                        height: 187
                    }
                ]
            },
            menu: {
                background: {
                    boardData: {
                        context: document.querySelector("#board_canvas").getContext("2d"),
                        image: './Assets/Misc/board_wide.webp',
                        position: {
                            x: 317,
                            y: 157
                        },
                        width: 646,
                        height: 406
                    },
                    ropes: [
                        {
                            context: this.canvasTarget.getContext("2d"),
                            image: './Assets/Misc/rope.webp',
                            position: {
                                x: 413,
                                y: -120
                            },
                            width: 21,
                            height: 317
                        },
                        {
                            context: this.canvasTarget.getContext("2d"),
                            image: './Assets/Misc/rope.webp',
                            position: {
                                x: 840,
                                y: -120
                            },
                            width: 21,
                            height: 317
                        }
                    ]
                },
                textsData: [
                    new HeadingText("Tower Defense", "FredokaOne",48,460,260)
                ],
                buttonsData: [
                    {
                        clickEventData: {
                            action: ActionTypes.GAME_STATE_SET,
                            stateTarget: 'game_state',
                            stateChange: 'main_menu',
                        },
                        context: this.canvasTarget.getContext("2d", {alpha: false}),
                        position: {
                            x: 424,
                            y: 341
                        },
                        width: 96,
                        height: 96,
                        image: './Assets/Buttons/back.webp',
                    },
                    {
                        clickEventData: {
                            action: ActionTypes.GAME_STATE_SET,
                            stateTarget: 'game_state',
                            stateChange: 'unpause',
                        },
                        context: this.canvasTarget.getContext("2d", {alpha: false}),
                        position: {
                            x: 592,
                            y: 341
                        },
                        width: 96,
                        height: 96,
                        image: './Assets/Buttons/resume.webp',
                    },
                    {
                        clickEventData: {
                            action: ActionTypes.WINDOW_SET,
                            windowTarget: 'menu',
                            windowChange: 'settings'
                        },
                        context: this.canvasTarget.getContext("2d", {alpha: false}),
                        position: {
                            x: 760,
                            y: 341
                        },
                        width: 96,
                        height: 96,
                        image: './Assets/Buttons/settings.webp',
                    },
                ]
            }
        }
    }

    setAudioBarWidth(volume){
        this.menuData.settings.extraGraphics[1].width = 240 * volume;
        this.rerenderExtra()
        
    }
    setActiveMenuWindow(window){
        if(window == 'return'){
            this.activeMenuWindow = this.windowsHistory[this.windowsHistory.length - 1]
            if(this.activeMenuWindow == 'settings'){
                this.rerenderExtra()
            }
        }

        else if(window != this.activeMenuWindow){
            this.windowsHistory.push(this.activeMenuWindow)
            this.activeMenuWindow = window
            if(this.activeMenuWindow == 'settings'){
                this.rerenderExtra()
            }
        }

        if(this.activeMenuWindow){
            this.data = this.menuData[this.activeMenuWindow]
            
            if(this.data){
                this.renderMenu()
                this.createHTML()
            }
            if(this.activeMenuWindow == 'settings'){
                this.rerenderExtra()
            }
        }
    }
    rerenderExtra(){
        clearCanvas(document.querySelector("#extra_graphics"))
        if(Object.keys(this.data).includes("extraGraphics")){
            this.data.extraGraphics.forEach(extra => {
                createImage(extra)
            })
        }
    }
    renderMenu(){
        clearCanvas(document.querySelector("#text"))
        clearCanvas(document.querySelector("#board_canvas"))
        clearCanvas(document.querySelector("#control_canvas"))
        clearCanvas(document.querySelector("#extra_graphics"))
        this.data = this.menuData[this.activeMenuWindow]
        this.render()
        this.createHTML()
    }
    
}


class LevelDataRenderer extends Renderer{
    constructor(parent){
        super(parent)
        this.canvasTarget = document.querySelector("#level_canvas")
        this.data = {
            buttonsData: [
                {
                    context: this.canvasTarget.getContext("2d"),
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
                    image: './Assets/Buttons/pause.webp'
                },
            ],
            abilitiesData:[
                {
                    context: this.canvasTarget.getContext("2d"),
                    clickEventData: {
                        action: ActionTypes.ABILITY_USE,
                        abilityTarget: 'rock',
                        fill: 'rgba(24, 23, 20, 0.45)'
                    },
                   
                    position: {
                        x: 1168,
                        y: 616
                    },
                    width: 80,
                    height: 80,
                    image: './Assets/Abilities/rock.webp'
                },
                {
                    context: this.canvasTarget.getContext("2d"),
                    clickEventData: {
                        action: ActionTypes.ABILITY_USE,
                        abilityTarget: 'poison',
                        fill: 'rgba(66, 255, 0, 0.3)'
                    },
                   
                    position: {
                        x: 1072,
                        y: 616
                    },
                    width: 80,
                    height: 80,
                    image: './Assets/Abilities/poison.webp'
                },
                {
                    context: this.canvasTarget.getContext("2d"),
                    clickEventData: {
                        action: ActionTypes.ABILITY_USE,
                        abilityTarget: 'freeze',
                        fill: 'rgba(0, 209, 255, 0.3)'
                    },
                   
                    position: {
                        x: 976,
                        y: 616
                    },
                    width: 80,
                    height: 80,
                    image: './Assets/Abilities/freeze.webp'
                },
                {
                    context: this.canvasTarget.getContext("2d"),
                    clickEventData: {
                        action: ActionTypes.ABILITY_USE,
                        abilityTarget: 'fire',
                        fill: 'rgba(255, 31, 0, 0.3)'
                    },
                   
                    position: {
                        x: 880,
                        y: 616
                    },
                    width: 80,
                    height: 80,
                    image: './Assets/Abilities/fire.webp'
                },
            ],
            textsData: [
            
                new BasicText("Coins", "TitanOne", 16,56,69, document.querySelector("#level_text").getContext("2d")),
                new BasicText("XP Points", "TitanOne", 16,56,151, document.querySelector("#level_text").getContext("2d")),
                new BasicText("Mana", "TitanOne", 16,56,234, document.querySelector("#level_text").getContext("2d")),
                new BasicText("0", "TitanOne", 16,268,105, document.querySelector("#level_text").getContext("2d")),
                new BasicText("0", "TitanOne", 16,268,188, document.querySelector("#level_text").getContext("2d")),
                new BasicText("150", "TitanOne", 16,268,234, document.querySelector("#level_text").getContext("2d")),
    
            ],
            extraGraphics: [
                new ExtraGraphic('./Assets/Misc/gem.png',this.canvasTarget.getContext("2d", {alpha: false}),72,89,25,25),
                new ExtraGraphic('./Assets/Misc/star.png',this.canvasTarget.getContext("2d", {alpha: false}),72,171,25,25),
                new ExtraGraphic('./Assets/Bars/bar_blue_transparent.png',this.canvasTarget.getContext("2d", {alpha: false}),56,246,240,14),
                new ExtraGraphic('./Assets/Bars/bar_blue.png',this.canvasTarget.getContext("2d", {alpha: false}),56,246,156,14),
            ],
            extraBoard: [
                new ExtraBoard(this.canvasTarget.getContext("2d", {alpha: false}),56,82,240,40,'#3d291a'),
                new ExtraBoard(this.canvasTarget.getContext("2d", {alpha: false}),56,164,240,40,'#3d291a'),
                new ExtraBoard(this.canvasTarget.getContext("2d", {alpha: false}),24,24,304,268,'rgba(61, 41, 26, 0.65)'),
            ]
        }
    }
}

class TowerLevelUpRenderer extends Renderer{
    constructor(parent){
        super(parent)
        this.canvasTarget = document.querySelector("#control_canvas")
        this.data = {
            background: {
                boardData: {
                    context: document.querySelector("#board_canvas").getContext("2d"),
                    image: './Assets/Misc/board_wide.webp',
                    position: {
                        x: 274,
                        y: 56
                    },
                    width: 732,
                    height: 588
                },
            },
            textsData: [
          
                new HeadingText("Archer Tower","TitanOne",48,459,144),
            
                new BasicText("Level:", "TitanOne",16,403,460),
                new BasicText("1/3", "TitanOne",24,462,463),

                new BasicText("Strength", "TitanOne",16,641,223),
                new BasicText("Attack Speed", "TitanOne",16,641,285),
                new BasicText("Range", "TitanOne",16,641,349),
                new BasicText("Archers", "TitanOne",16,641,413),

                new BasicText("1", "TitanOne",16,864,221),
                new BasicText("1", "TitanOne",16,864,285),
                new BasicText("1", "TitanOne",16,864,349),
                new BasicText("1", "TitanOne",16,864,413),
            
            ],
            buttonsData: [
                {
                    clickEventData: {
                        action: ActionTypes.TOWER_LEVELUP_UNDO,
                    },
                    context: this.canvasTarget.getContext("2d", {alpha: false}),
                    position: {
                        x: 487,
                        y: 601
                    },
                    width: 121,
                    height: 72,
                    image: './Assets/Buttons/undo.webp'
                },
                {
                    clickEventData: {
                        action: ActionTypes.GAME_STATE_SET,
                        stateTarget: 'game_state',
                        stateChange: 'play',
                        playState: 'unpause'
                    },
                    context: this.canvasTarget.getContext("2d", {alpha: false}),
                    position: {
                        x: 672,
                        y: 601
                    },
                    width: 121,
                    height: 72,
                    image: './Assets/Buttons/done.webp'
                },
                {
                    clickEventData: {
                        action: ActionTypes.GAME_STATE_SET,
                        stateTarget: 'game_state',
                        stateChange: 'play',
                        playState: 'unpause'
                    },
                    context: this.canvasTarget.getContext("2d", {alpha: false}),
                    position: {
                        x: 953,
                        y: 31
                    },
                    width: 72,
                    height: 72,
                    image: './Assets/Buttons/close.webp'
                },
                {
                    clickEventData: {
                        action: ActionTypes.TOWER_UPGRADE,
                    },
                    context: this.canvasTarget.getContext("2d", {alpha: false}),
                    position: {
                        x: 382,
                        y: 502
                    },
                    width: 155,
                    height: 62,
                    image: './Assets/Buttons/upgrade.webp'
                },
                {
                    clickEventData: {
                        action: ActionTypes.TOWER_EXTRA_UPGRADE,
                    },
                    context: this.canvasTarget.getContext("2d", {alpha: false}),
                    position: {
                        x: 619,
                        y: 502
                    },
                    width: 73,
                    height: 66,
                    image: './Assets/Upgrade/Tower/archer1.webp'
                },
                {
                    clickEventData: {
                        action: ActionTypes.TOWER_EXTRA_UPGRADE,
                    },
                    context: this.canvasTarget.getContext("2d", {alpha: false}),
                    position: {
                        x: 724,
                        y: 502
                    },
                    width: 73,
                    height: 66,
                    image: './Assets/Upgrade/Tower/archer2.webp'
                },
                {
                    clickEventData: {
                        action: ActionTypes.TOWER_EXTRA_UPGRADE,
                    },
                    context: this.canvasTarget.getContext("2d", {alpha: false}),
                    position: {
                        x: 829,
                        y: 502
                    },
                    width: 73,
                    height: 66,
                    image: './Assets/Upgrade/Tower/archer3.webp'
                },
            ],
            extraGraphics: [
                new ExtraGraphic('./Assets/Towers/Archer_1.webp',document.querySelector("#extra_graphics").getContext("2d", {alpha: false}),366,211,187,227),
                new ExtraGraphic('./Assets/Bars/bar_red.png',document.querySelector("#extra_graphics").getContext("2d", {alpha: false}),641,237,240,14),
                new ExtraGraphic('./Assets/Bars/bar_yellow.png',document.querySelector("#extra_graphics").getContext("2d", {alpha: false}),641,301,240,14),
                new ExtraGraphic('./Assets/Bars/bar_yellow.png',document.querySelector("#extra_graphics").getContext("2d", {alpha: false}),641,365,240,14),
                new ExtraGraphic('./Assets/Bars/bar_yellow.png',document.querySelector("#extra_graphics").getContext("2d", {alpha: false}),641,429,240,14),
            
            ],
            extraBoard: [
                new ExtraBoard(this.canvasTarget.getContext("2d", {alpha: false}),609,189,304,280),
                
            ]
        }
    }
}

class PlayerLevelUpRenderer extends Renderer{
    constructor(parent){
        super(parent)
        this.canvasTarget = document.querySelector("#control_canvas")
        this.data = {
            background: {
                boardData: {
                    context: document.querySelector("#board_canvas").getContext("2d"),
                    image: './Assets/Misc/board_high.webp',
                    position: {
                        x: 274,
                        y: 56
                    },
                    width: 732,
                    height: 546
                },
            },
            buttonsData: [
                {
                    clickEventData: {
                        action: ActionTypes.TOWER_UPGRADE,
                    },
                    context: this.canvasTarget.getContext("2d", {alpha: false}),
                    position: {
                        x: 556,
                        y: 470
                    },
                    width: 167,
                    height: 66,
                    image: './Assets/Buttons/upgrade.webp'
                },
                {
                    clickEventData: {
                        action: ActionTypes.GAME_STATE_SET,
                        stateTarget: 'game_state',
                        stateChange: 'play',
                        playState: 'unpause'
                    },
                    context: this.canvasTarget.getContext("2d", {alpha: false}),
                    position: {
                        x: 580,
                        y: 560
                    },
                    width: 121,
                    height: 72,
                    image: './Assets/Buttons/done.webp'
                },
                {
                    clickEventData: {
                        action: ActionTypes.UPGRADE_PLAYER_SPEC,
                    },
                    context: this.canvasTarget.getContext("2d", {alpha: false}),
                    image: './Assets/Misc/price.webp',
                    position: {
                        x: 876,
                        y: 230
                    },
                    width: 55,
                    height: 29
                },
                {
                    clickEventData: {
                        action: ActionTypes.UPGRADE_PLAYER_SPEC,
                    },
                    context: this.canvasTarget.getContext("2d", {alpha: false}),
                    image: './Assets/Misc/price.webp',
                    position: {
                        x: 876,
                        y: 298
                    },
                    width: 55,
                    height: 29
                },
                {
                    clickEventData: {
                        action: ActionTypes.UPGRADE_PLAYER_SPEC,
                    },
                    context: this.canvasTarget.getContext("2d", {alpha: false}),
                    image: './Assets/Misc/price.webp',
                    position: {
                        x: 876,
                        y: 362
                    },
                    width: 55,
                    height: 29
                },
                {
                    clickEventData: {
                        action: ActionTypes.GAME_STATE_SET,
                        stateTarget: 'game_state',
                        stateChange: 'play',
                        playState: 'unpause'
                    },
                    context: this.canvasTarget.getContext("2d", {alpha: false}),
                    position: {
                        x: 953,
                        y: 31
                    },
                    width: 72,
                    height: 72,
                    image: './Assets/Buttons/close.webp'
                },
                
            ],
            textsData: [
        
                new HeadingText("Player Upgrade","TitanOne",48,454,152),

                new BasicText("Level:","TitanOne",16,380,420),
                new BasicText("1/10","TitanOne",24,440,422),
                new BasicText("1","TitanOne",14,889,249),
                new BasicText("1","TitanOne",14,889,317),
                new BasicText("1","TitanOne",14,889,381),
                new BasicText("Bonus Gold","TitanOne",16,611,235),
                new BasicText("Bonus Mana","TitanOne",16,611,305),
                new BasicText("Max Mana","TitanOne",16,611,375),

                new BasicText("1","TitanOne",16,835,235),
                new BasicText("1","TitanOne",16,835,305),
                new BasicText("1","TitanOne",16,835,375),
           

            ],
            extraGraphics: [
                new ExtraGraphic('./Assets/Misc/player.webp',this.canvasTarget.getContext("2d", {alpha: false}), 336,189,187,227),
                new ExtraGraphic('./Assets/Bars/bar_yellow.png',this.canvasTarget.getContext("2d", {alpha: false}), 611,250,240,14),
                new ExtraGraphic('./Assets/Bars/bar_blue.png',this.canvasTarget.getContext("2d", {alpha: false}), 611,320,240,14),
                new ExtraGraphic('./Assets/Bars/bar_blue.png',this.canvasTarget.getContext("2d", {alpha: false}), 611,390,240,14),
         
            ],
            extraBoard: [
                new ExtraBoard(this.canvasTarget.getContext("2d", {alpha: false}),580,192,370,250)
           
            ]
        }
    }
}



class InstructionsRenderer extends Renderer{
    constructor(parent){
        super(parent)
        this.canvasTarget = document.querySelector("#control_canvas")
        this.data = {
            background: {
                boardData: {
                    context: document.querySelector("#board_canvas").getContext("2d"),
                    image: './Assets/Misc/board_wide.webp',
                    position: {
                        x: 156,
                        y: 56
                    },
                    width: 968,
                    height: 552
                },
                ropes: [
                    {
                        context: this.canvasTarget.getContext("2d"),
                        image: './Assets/Misc/rope.webp',
                        position: {
                            x: 467,
                            y: -218
                        },
                        width: 21,
                        height: 317
                    },
                    {
                        context: this.canvasTarget.getContext("2d"),
                        image: './Assets/Misc/rope.webp',
                        position: {
                            x: 792,
                            y: -218
                        },
                        width: 21,
                        height: 317
                    }
                ]
            },
            buttonsData: [
                {
                    clickEventData: {
                        action: ActionTypes.GAME_STATE_SET,
                        stateTarget: 'game_state',
                        stateChange: 'play',
                        playState: 'unpause'
                    },
                    context: this.canvasTarget.getContext("2d", {alpha: false}),
                    position: {
                        x: 537,
                        y: 565
                    },
                    width: 205,
                    height: 67,
                    image: './Assets/Buttons/play.png'
                },
                
            ],
            textsData: [
                new HeadingText("Instructions", "TitanOne",48,478,164),
                new BasicText("Build Towers","TitanOne",24,272,440),
                new BasicText("Kill Enemies","TitanOne",24,539,440),
                new BasicText("Upgrade Towers","TitanOne",24,791,440),


            ],
            extraGraphics: [
                new ExtraGraphic("./Assets/Towers/Archer_1.webp",this.canvasTarget.getContext("2d", {alpha: false}),289,239,137,153),
                new ExtraGraphic("./Assets/Towers/Archer_3.webp",this.canvasTarget.getContext("2d", {alpha: false}),831,239,137,153),
                new ExtraGraphic("./Assets/Enemies/heavy_1.png",this.canvasTarget.getContext("2d", {alpha: false}),563,244,108,147)
            ],
        }
    }
}

class GameStatusRenderer extends Renderer{
    constructor(parent){
        super(parent)
        this.canvasTarget = document.querySelector("#control_canvas")
        this.statusData = {
            win: {
                background: {
                    boardData: {
                        context: document.querySelector("#board_canvas").getContext("2d"),
                        image: './Assets/Misc/board_high.webp',
                        position: {
                            x: 371,
                            y: 70
                        },
                        width: 538,
                        height: 581
                    },
                    ropes: [
                        {
                            context: this.canvasTarget.getContext("2d"),
                            image: './Assets/Misc/rope.webp',
                            position: {
                                x: 467,
                                y: -218
                            },
                            width: 21,
                            height: 317
                        },
                        {
                            context: this.canvasTarget.getContext("2d"),
                            image: './Assets/Misc/rope.webp',
                            position: {
                                x: 793,
                                y: -218
                            },
                            width: 21,
                            height: 317
                        }
                    ]
                },
           
                buttonsData: [
                    {
                        clickEventData: {
                            action: ActionTypes.GAME_STATE_SET,
                            stateTarget: 'game_state',
                            stateChange: 'main_menu',
                        },
                        context: this.canvasTarget.getContext("2d", {alpha: false}),
                        position: {
                            x: 511,
                            y: 582
                        },
                        width: 96,
                        height: 96,
                        image: './Assets/Buttons/menu.webp',
                    },
                    {
                        clickEventData: {
                            action: ActionTypes.GAME_STATE_SET,
                            stateTarget: 'game_state',
                            stateChange: 'advance'
                        },
                        context: this.canvasTarget.getContext("2d", {alpha: false}),
                        position: {
                            x: 672,
                            y: 582
                        },
                        width: 96,
                        height: 96,
                        image: './Assets/Buttons/nextLevel.webp',
                    },
                    {
                        clickEventData: {
                            action: ActionTypes.GAME_STATE_SET,
                            stateTarget: 'game_state',
                            stateChange: 'player_upgrade'
                        },
                        context: this.canvasTarget.getContext("2d", {alpha: false}),
                        position: {
                            x: 543,
                            y: 457
                        },
                        width: 194,
                        height: 80,
                        image: './Assets/Buttons/upgrade.webp'
                    },
                ],
                textsData: [
                
                    new HeadingText("+ 5", "FredokaOne", 48,572,415)
                ],
                extraGraphics: [
                    new ExtraGraphic('./Assets/Misc/win_star.webp', this.canvasTarget.getContext("2d", {alpha: false}),515,181,250,138),
                    new ExtraGraphic('./Assets/Misc/win.webp', this.canvasTarget.getContext("2d", {alpha: false}),515,69,250,102),
                    new ExtraGraphic('./Assets/Misc/Star.png', this.canvasTarget.getContext("2d", {alpha: false}),655,372,48,48),
                ]
            },
            lose: {
                background: {
                    boardData: {
                        context: document.querySelector("#board_canvas").getContext("2d"),
                        image: './Assets/Misc/board_high.webp',
                        position: {
                            x: 371,
                            y: 70
                        },
                        width: 538,
                        height: 581
                    },
                    ropes: [
                        {
                            context: this.canvasTarget.getContext("2d"),
                            image: './Assets/Misc/rope.webp',
                            position: {
                                x: 467,
                                y: -218
                            },
                            width: 21,
                            height: 317
                        },
                        {
                            context: this.canvasTarget.getContext("2d"),
                            image: './Assets/Misc/rope.webp',
                            position: {
                                x: 793,
                                y: -218
                            },
                            width: 21,
                            height: 317
                        }
                    ]
                },
                textsData: [
                    new HeadingText("+ 0","FredokaOne",48,572,415)
                ],
                buttonsData: [
                    {
                        clickEventData: {
                            action: ActionTypes.GAME_STATE_SET,
                            stateTarget: 'game_state',
                            stateChange: 'main_menu',
                        },
                        context: this.canvasTarget.getContext("2d", {alpha: false}),
                        position: {
                            x: 511,
                            y: 582
                        },
                        width: 96,
                        height: 96,
                        image: './Assets/Buttons/menu.webp',
                    },
                    {
                        clickEventData: {
                            action: ActionTypes.GAME_STATE_SET,
                            stateTarget: 'game_state',
                            stateChange: 'level_reset',
                        },
                        context: this.canvasTarget.getContext("2d", {alpha: false}),
                        position: {
                            x: 672,
                            y: 582
                        },
                        width: 96,
                        height: 96,
                        image: './Assets/Buttons/resetLevel.webp',
                    },
                    {
                        clickEventData: {
                            action: ActionTypes.GAME_STATE_SET,
                            stateTarget: 'game_state',
                            stateChange: 'player_upgrade'
                        },
                        context: this.canvasTarget.getContext("2d", {alpha: false}),
                        position: {
                            x: 543,
                            y: 457
                        },
                        width: 194,
                        height: 80,
                        image: './Assets/Buttons/upgrade.webp'
                    },
                ],
                extraGraphics: [
                    new ExtraGraphic("./Assets/Misc/lose_star.webp",this.canvasTarget.getContext("2d", {alpha: false}),515,181,250,138),
                    new ExtraGraphic("./Assets/Misc/lose.webp",this.canvasTarget.getContext("2d", {alpha: false}),515,69,250,102),
                    new ExtraGraphic("./Assets/Misc/Star.png",this.canvasTarget.getContext("2d", {alpha: false}),655,372,48,48),
           
                ]
            }
        }
    }
    setStatus(status){
        this.data = this.statusData[status]
    }
}