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
    
    if(data.image.type){
        if(data.image.type == 'class'){
          
            data.context.drawImage(data.image.image,data.position.x, data.position.y, data.width, data.height)
        }
    }
    else{
        let image = new Image();
        if(data.opacity){
          
            data.context.globalAlpha = data.opacity
        }
        image.src = data.image;
        image.onload = function(){
            data.context.drawImage(image,data.position.x, data.position.y, data.width, data.height)
        }
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
    data.context.textAlign = data.align
    data.context.fillText(data.text,data.position.x,data.position.y)
}

function clearCanvas(canvas){
    canvas.getContext("2d").clearRect(0,0,canvas.width, canvas.height)
}

// function setGameBackground(url){
//     console.log(document.querySelector(".canvas_bg").style.background)
//     console.log(url)
//     document.querySelector(".canvas_bg").style.background = `url(${url})`
//     console.log(document.querySelector(".canvas_bg").style.background)
// }

function setGameBackgroundAlpha(alpha){
    document.querySelector("#board_canvas").style.zIndex = alpha ? 15 : 5
    document.querySelector("#control_canvas").style.zIndex = alpha ? 15 : 5
    document.querySelector("#text").style.zIndex = alpha ? 16 : 5
    document.querySelector(".shadow").style.zIndex = alpha ? 14 : -1
    document.querySelector(".shadow").style.opacity = alpha ? 1 : 0
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
        if(keys.includes("extraBoard")){
         
            this.data.extraBoard.forEach(board => {
                console.log(board)
                renderExtraBoard(board)
            })
        }
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

        
        
        if(keys.includes("extraGraphics")){
            this.data.extraGraphics.forEach(extra => {
                createImage(extra)
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
                        image: IMG_ASSETS_LIST.misc.board_high,
                        position: {
                            x: 371,
                            y: 70
                        },
                        width: 538,
                        height: 581
                    },
                    ropes: [
                        new Rope(467,-218),
                        new Rope(792,-218)
                    ]
                },
                textsData: [
                    new HeadingText("Tower Defense", "FredokaOne", 48, 467,172),
                    new BasicText("© Martin Orlej, 2022", "FredokaOne", 16,562,600)
                ],
                buttonsData: [
                    // new GameStateChangeButton("#control_canvas",537,252,205,78,"./Assets/Buttons/continue.webp", "game_state","play","continue_saved"),
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
                        image: IMG_ASSETS_LIST.buttons.continue
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
                        image: IMG_ASSETS_LIST.buttons.newGame
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
                        image: IMG_ASSETS_LIST.buttons.settings
                    }
                ]
            },
            settings: {
                background: {
                    boardData: {
                        context: document.querySelector("#board_canvas").getContext("2d"),
                        image: IMG_ASSETS_LIST.misc.board_med,
                        position: {
                            x: 369,
                            y: 56
                        },
                        width: 542,
                        height: 484
                    },
                    ropes: [
                        new Rope(467,-218),
                        new Rope(792,-218)
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
                        image: IMG_ASSETS_LIST.buttons.reset
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
                        image: IMG_ASSETS_LIST.buttons.done
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
                        image: IMG_ASSETS_LIST.buttons.audio_mute
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
                        image: IMG_ASSETS_LIST.buttons.audio_on
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
                        image: IMG_ASSETS_LIST.buttons.audio_decrease
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
                        image: IMG_ASSETS_LIST.buttons.audio_add
                    },

                ],
                extraGraphics: [
                    new ExtraGraphic(IMG_ASSETS_LIST.bars.bar_yellow_opaque,document.querySelector("#extra_graphics").getContext("2d"),520,242,240,14),
                    new ExtraGraphic(IMG_ASSETS_LIST.bars.bar_yellow,document.querySelector("#animations").getContext("2d"),520,242,240,14),
                    
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
                        image: IMG_ASSETS_LIST.misc.board_wide,
                        position: {
                            x: 317,
                            y: 157
                        },
                        width: 646,
                        height: 406
                    },
                    ropes: [
                        new Rope(413,-120),
                        new Rope(821,-120)
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
                        image: IMG_ASSETS_LIST.buttons.back,
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
                        image: IMG_ASSETS_LIST.buttons.resume,
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
                        image: IMG_ASSETS_LIST.buttons.settings,
                    },
                ]
            }
        }

        this.animationFrame;
       
    }

    updateAudioBarWidth(volume,step){
        
        this.menuData.settings.extraGraphics[1].width += step;
  
        this.rerenderExtra("animations")
        
        if(this.menuData.settings.extraGraphics[1].width > 240 * volume){
            step > 0 ? this.animationFrame  = cancelAnimationFrame(this.animationFrame) : this.animationFrame = requestAnimationFrame(this.updateAudioBarWidth.bind(this,volume,step))
        }
        else{
            step > 0 ? this.animationFrame = requestAnimationFrame(this.updateAudioBarWidth.bind(this,volume,step)) : this.animationFrame  = cancelAnimationFrame(this.animationFrame)
        }
        
    }

    setAudioBarWidth(volume,force=false){
       
        let oldWidth = this.menuData.settings.extraGraphics[1].width
        let newWidth = 240 * volume;
        let diff = newWidth - oldWidth;
     
        let step = diff / 8;

        console.log({
            oldVolume: this.parent.mainAudio.oldVolume,
            currentVolume: this.parent.mainAudio.player.volume,
            width: this.menuData.settings.extraGraphics[1].width,
            newWidth:newWidth,
            diff: diff,
            step: step
        })
        
        if(!force){
            console.log("Animating")
            this.animationFrame = requestAnimationFrame(this.updateAudioBarWidth.bind(this,volume,step))
        }
        else{
            this.menuData.settings.extraGraphics[1].width = 240 * volume
            this.menuData.settings.extraGraphics[1].image.image.width = 240 * volume
        }
       
    }

    
  

    setActiveMenuWindow(window){
        if(window == 'return'){
            this.activeMenuWindow = this.windowsHistory[this.windowsHistory.length - 1]
            if(this.activeMenuWindow == 'settings'){
                this.rerenderExtra(["animations","extra_graphics"])
            }
        }

        else if(window != this.activeMenuWindow){
            this.windowsHistory.push(this.activeMenuWindow)
            this.activeMenuWindow = window
            if(this.activeMenuWindow == 'settings'){
                this.rerenderExtra(["animations","extra_graphics"])
            }
        }

        if(this.activeMenuWindow){
            this.data = this.menuData[this.activeMenuWindow]
            
            if(this.data){
                this.renderMenu()
                this.createHTML()
            }
            if(this.activeMenuWindow == 'settings'){
                this.rerenderExtra(["animations","extra_graphics"])
            }
        }
    }
    rerenderExtra(targets){
 
        if(!Array.isArray(targets)){
            targets = [targets]
        }

        targets.forEach(target => {
            let canvas = "#" + target
      
            clearCanvas(document.querySelector(canvas))
        })
        if(Object.keys(this.data).includes("extraGraphics")){
            this.data.extraGraphics.forEach(extra => {
    
                targets.forEach(target => {
                   
                    if(target == extra.context.canvas.id ){
                        console.log("Rerendering canvas:",target)
                        createImage(extra)
                    }
                })
            })
        }
    }
    renderMenu(){
        clearCanvas(document.querySelector("#text"))
        clearCanvas(document.querySelector("#board_canvas"))
        clearCanvas(document.querySelector("#control_canvas"))
        clearCanvas(document.querySelector("#animations"))
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
                    image: IMG_ASSETS_LIST.buttons.pause
                },
            ],
            abilitiesData:[
                {
                    context: this.canvasTarget.getContext("2d"),
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
                    context: this.canvasTarget.getContext("2d"),
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
                    context: this.canvasTarget.getContext("2d"),
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
                    context: this.canvasTarget.getContext("2d"),
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
            ],
            textsData: [
            
                new BasicText("Coins", "TitanOne", 16,56,69, document.querySelector("#level_text").getContext("2d")),
                new BasicText("XP Points", "TitanOne", 16,56,151, document.querySelector("#level_text").getContext("2d")),
                new BasicText("Mana", "TitanOne", 16,56,234, document.querySelector("#level_text").getContext("2d")),
                new BasicText("0", "TitanOne", 16,268,105, document.querySelector("#animations").getContext("2d")),
                new BasicText("0", "TitanOne", 16,268,188, document.querySelector("#animations").getContext("2d")),
                new BasicText("150", "TitanOne", 16,280,234, document.querySelector("#animations").getContext("2d"),"end"),
    
            ],
            extraGraphics: [
                new ExtraGraphic(IMG_ASSETS_LIST.misc.gem,this.canvasTarget.getContext("2d", {alpha: false}),72,89,25,25),
                new ExtraGraphic(IMG_ASSETS_LIST.misc.star,this.canvasTarget.getContext("2d", {alpha: false}),72,171,25,25),
                new ExtraGraphic(IMG_ASSETS_LIST.bars.bar_blue_opaque,this.canvasTarget.getContext("2d", {alpha: false}),56,246,240,14),
                new ExtraGraphic(IMG_ASSETS_LIST.bars.bar_blue,document.querySelector("#animations").getContext("2d", {alpha: false}),56,246,0,14),
            ],
            extraBoard: [
                new ExtraBoard(this.canvasTarget.getContext("2d", {alpha: false}),56,82,240,40,'#3d291a'),
                new ExtraBoard(this.canvasTarget.getContext("2d", {alpha: false}),56,164,240,40,'#3d291a'),
                new ExtraBoard(this.canvasTarget.getContext("2d", {alpha: false}),24,24,304,268,'rgba(61, 41, 26, 0.65)'),
            ]
        }
        this.animationFrame;
    }

    get getAnimationFrame(){
        return this.animationFrame
    }

    cancelAnimationFrame(){
        this.animationFrame = cancelAnimationFrame(this.animationFrame)
    }

    

    animate(coef, step){
        let flag = 0
        this.data.extraGraphics[3].width += step
        if(this.data.extraGraphics[3].width >= 240*coef){
            this.data.extraGraphics[3].width = 240*coef
            this.data.textsData[5].text = this.parent.playerEventManager.state.maxMana
            this.animationFrame = this.cancelAnimationFrame(this.animationFrame)
            flag = 1
            return
        }

        clearCanvas(document.querySelector("#animations"))

        this.data.textsData.forEach(text => {
            if(text.context.canvas.id == 'animations'){
                createText(text)
            }
        })
        this.data.extraGraphics.forEach(graphic =>{
            if(graphic.context.canvas.id == 'animations'){
                createImage(graphic)
            }
        })
        if(!flag){
            this.animationFrame = requestAnimationFrame(this.animate.bind(this,coef,step))
        }
       
    }

    renderUpdate(forceQuit=false){
        if(forceQuit){
            this.cancelAnimationFrame()
            return
        }
        if(this.parent.getMana <= this.parent.playerEventManager.state.maxMana){
            this.data.textsData[5].text = this.parent.getMana.toFixed(0)

        }
      
        let coef = Number((this.parent.getMana / this.parent.playerEventManager.state.maxMana).toPrecision(4))
   
        let step = 1/10

        this.animate(coef,step)

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
                    image: IMG_ASSETS_LIST.misc.board_wide,
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
                    image: IMG_ASSETS_LIST.buttons.undo
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
                    image: IMG_ASSETS_LIST.buttons.done
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
                    image: IMG_ASSETS_LIST.buttons.close
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
                    image: IMG_ASSETS_LIST.buttons.upgrade
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
                new ExtraGraphic(IMG_ASSETS_LIST.bars.bar_red,document.querySelector("#extra_graphics").getContext("2d", {alpha: false}),641,237,240,14),
                new ExtraGraphic(IMG_ASSETS_LIST.bars.bar_yellow,document.querySelector("#extra_graphics").getContext("2d", {alpha: false}),641,301,240,14),
                new ExtraGraphic(IMG_ASSETS_LIST.bars.bar_yellow,document.querySelector("#extra_graphics").getContext("2d", {alpha: false}),641,365,240,14),
                new ExtraGraphic(IMG_ASSETS_LIST.bars.bar_yellow,document.querySelector("#extra_graphics").getContext("2d", {alpha: false}),641,429,240,14),
            
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
                    image: IMG_ASSETS_LIST.misc.board_high,
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
                    image: IMG_ASSETS_LIST.buttons.upgrade
                },
                {
                    clickEventData: {
                        action: ActionTypes.GAME_STATE_SET,
                        stateTarget: 'game_state',
                        stateChange: 'unpause',
                        playState: 'continue'
                    },
                    context: this.canvasTarget.getContext("2d", {alpha: false}),
                    position: {
                        x: 580,
                        y: 560
                    },
                    width: 121,
                    height: 72,
                    image: IMG_ASSETS_LIST.buttons.done
                },
                {
                    clickEventData: {
                        action: ActionTypes.UPGRADE_PLAYER_SPEC,
                        upgradeTarget: "bonusGold"
                    },
                    context: this.canvasTarget.getContext("2d", {alpha: false}),
                    image: IMG_ASSETS_LIST.misc.price,
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
                        upgradeTarget: "bonusMana"
                    },
                    context: this.canvasTarget.getContext("2d", {alpha: false}),
                    image: IMG_ASSETS_LIST.misc.price,
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
                        upgradeTarget: "maxMana"
                    },
                    context: this.canvasTarget.getContext("2d", {alpha: false}),
                    image: IMG_ASSETS_LIST.misc.price,
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
                    image: IMG_ASSETS_LIST.buttons.close
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

                new BasicText("0","TitanOne",16,835,235),
                new BasicText("0","TitanOne",16,835,305),
                new BasicText("100","TitanOne",16,816,375),
           

            ],
            extraGraphics: [
                new ExtraGraphic(IMG_ASSETS_LIST.misc.player,document.querySelector("#extra_graphics").getContext("2d", {alpha: false}), 336,189,187,227),
                new ExtraGraphic(IMG_ASSETS_LIST.bars.bar_yellow,document.querySelector("#animations").getContext("2d", {alpha: false}), 611,250,240,14),
                new ExtraGraphic(IMG_ASSETS_LIST.bars.bar_blue,document.querySelector("#animations").getContext("2d", {alpha: false}), 611,320,240,14),
                new ExtraGraphic(IMG_ASSETS_LIST.bars.bar_blue,document.querySelector("#animations").getContext("2d", {alpha: false}), 611,390,240,14),
                new ExtraGraphic(IMG_ASSETS_LIST.bars.bar_yellow_opaque,this.canvasTarget.getContext("2d", {alpha: false}), 611,250,240,14),
                new ExtraGraphic(IMG_ASSETS_LIST.bars.bar_blue_opaque,this.canvasTarget.getContext("2d", {alpha: false}), 611,320,240,14),
                new ExtraGraphic(IMG_ASSETS_LIST.bars.bar_blue_opaque,this.canvasTarget.getContext("2d", {alpha: false}), 611,390,240,14),

                
         
            ],
            extraBoard: [
                new ExtraBoard(this.canvasTarget.getContext("2d", {alpha: false}),580,192,370,250)
           
            ]
        }
        this.animationFrame;
    }

    animate(target,step,limit){
        clearCanvas(document.querySelector("#animations"))

       
        let flag = 0
        
        this.data.extraGraphics.forEach(graphic => {
            if(graphic.context.canvas.id == 'animations'){
               
                if(graphic === target){
                
                    
                    graphic.width += step
                   
                    if(graphic.width >= 240*limit){
                        graphic.width = 240*limit
                        cancelAnimationFrame(this.animationFrame)
                        flag = 1
                    }
                    

                }
                createImage(graphic)
            }
            
        })

        if(!flag){
            this.animationFrame = requestAnimationFrame(this.animate.bind(this,target,step,limit))

        }
        
        
    }
    
    renderUpdate(){
        
        let updateTarget = false;
        let step = false;
        let limit = false

        

        
        let playerDataState = this.parent.eventManagers[1].state
        let playerDataMax = this.parent.eventManagers[1].maxValues

       

        if(this.data.extraGraphics[1].width != 240 * (playerDataState.bonusGold/5)){
            updateTarget = this.data.extraGraphics[1]
            step = (240 * (playerDataState.bonusGold/5)) / 48
            limit = (playerDataState.bonusGold/5)
        }
        if(this.data.extraGraphics[2].width != 240 * (playerDataState.bonusMana/5)){
            updateTarget = this.data.extraGraphics[2]
            step = (240 * (playerDataState.bonusMana/5)) / 48
            limit = (playerDataState.bonusMana/5)
        }
        if(this.data.extraGraphics[3].width != 240 * ((playerDataState.maxMana/playerDataMax.maxMana).toFixed(4))){
            updateTarget = this.data.extraGraphics[3]
            step = (240 * ((playerDataState.maxMana/playerDataMax.maxMana).toFixed(4))) / 48
            limit = ((playerDataState.maxMana/playerDataMax.maxMana).toFixed(4))
        }

        if(!updateTarget){
            return
        }

        
        
        // this.data.extraGraphics[1].width = 240*(playerDataState.bonusGold/5)
        // this.data.extraGraphics[2].width = 240*(playerDataState.bonusMana/5)
        // this.data.extraGraphics[3].width = 240*((playerDataState.maxMana/playerDataMax.maxMana).toFixed(4))
        
        this.data.textsData[9].text = playerDataState.bonusGold
        this.data.textsData[10].text = playerDataState.bonusMana
        this.data.textsData[11].text = playerDataState.maxMana

        clearCanvas(document.querySelector("#text"))
        
       
        this.data.textsData.forEach(text => {
            createText(text)
        })

        this.animate(updateTarget,step, limit)
     

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
                    image: IMG_ASSETS_LIST.misc.board_wide,
                    position: {
                        x: 156,
                        y: 56
                    },
                    width: 968,
                    height: 552
                },
                ropes: [
                    new Rope(467,-218),
                    new Rope(792,-218)
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
                    image: IMG_ASSETS_LIST.buttons.play
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
                        image: IMG_ASSETS_LIST.misc.board_high,
                        position: {
                            x: 371,
                            y: 70
                        },
                        width: 538,
                        height: 581
                    },
                    ropes: [
                     
                        new Rope(467,-218),
                        new Rope(792,-218)
                      
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
                        image: IMG_ASSETS_LIST.buttons.menu,
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
                        image: IMG_ASSETS_LIST.buttons.nextLevel,
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
                        image: IMG_ASSETS_LIST.buttons.upgrade
                    },
                ],
                textsData: [
                
                    new HeadingText("+ 5", "FredokaOne", 48,572,415)
                ],
                extraGraphics: [
                    new ExtraGraphic(IMG_ASSETS_LIST.misc.win_star, this.canvasTarget.getContext("2d", {alpha: false}),515,181,250,138),
                    new ExtraGraphic(IMG_ASSETS_LIST.misc.win, this.canvasTarget.getContext("2d", {alpha: false}),515,69,250,102),
                    new ExtraGraphic(IMG_ASSETS_LIST.misc.star, this.canvasTarget.getContext("2d", {alpha: false}),655,372,48,48),
                ]
            },
            lose: {
                background: {
                    boardData: {
                        context: document.querySelector("#board_canvas").getContext("2d"),
                        image: IMG_ASSETS_LIST.misc.board_high,
                        position: {
                            x: 371,
                            y: 70
                        },
                        width: 538,
                        height: 581
                    },
                    ropes: [
                        new Rope(467,-218),
                        new Rope(792,-218)
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
                        image: IMG_ASSETS_LIST.buttons.menu,
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
                        image: IMG_ASSETS_LIST.buttons.resetLevel,
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
                        image: IMG_ASSETS_LIST.buttons.upgrade
                    },
                ],
                extraGraphics: [
                    new ExtraGraphic(IMG_ASSETS_LIST.misc.lose_star,this.canvasTarget.getContext("2d", {alpha: false}),515,181,250,138),
                    new ExtraGraphic(IMG_ASSETS_LIST.misc.lose,this.canvasTarget.getContext("2d", {alpha: false}),515,69,250,102),
                    new ExtraGraphic(IMG_ASSETS_LIST.misc.star,this.canvasTarget.getContext("2d", {alpha: false}),655,372,48,48),
           
                ]
            }
        }
    }
    setStatus(status){
        this.data = this.statusData[status]
    }
}