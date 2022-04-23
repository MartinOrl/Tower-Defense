var ActionTypes = {
    WINDOW_SET: 'WINDOW_SET',
    GAME_STATE_SET: 'GAME_STATE_SET',
    CONFIG_RESET: 'CONFIG_RESET',
    CONFIG_MODIFY: 'CONFIG_MODIFY',
    ABILITY_USE: 'ABILITY_USE',
    TOWER_LEVELUP_UNDO: 'TOWER_LEVELUP_UNDO',
    PLAYER_UPGRADE: 'PLAYER_UPGRADE',
    UPGRADE_PLAYER_SPEC: 'UPGRADE_PLAYER_SPEC'
}


class GameManager{
    constructor(parent){
        this.gameCore = parent
        this.renderers = {

        }
        this.abilityUseStatus = ''
    }

    registerRenderer(id,renderer){
        this.renderers[id] = renderer
    }

    setRenderers(renderersGroup){
        this.renderers = renderersGroup
    }

    fireEvent(data){
        if(this.gameCore.mainAudio.player.paused){
     
            this.gameCore.mainAudio.player.play()
        }
        let { action } = data

        console.groupCollapsed(`action ${action}`)
        console.table(data)
        
        if(action == ActionTypes.WINDOW_SET){
            
            if(data.windowTarget == 'menu'){
                console.log("previous State ", this.renderers.menu.activeMenuWindow)
                this.renderers.menu.setActiveMenuWindow(data.windowChange)
                console.log("new State ", this.renderers.menu.activeMenuWindow)
            }
            if(data.windowTarget == 'return'){

            }
        }
        else if(action == ActionTypes.ABILITY_USE){
            let old = this.abilityUseStatus
            this.abilityUseStatus = data.abilityTarget
            let context = document.querySelector("#ability_use").getContext("2d")
            if(this.abilityUseStatus != old){
                onmousemove = function(e){
                    let box = document.querySelector("#ability_use").getBoundingClientRect()
                    let mousePos = {
                        x: e.clientX - box.x,
                        y: e.clientY - box.y
                    }
    
                    context.clearRect(0,0,document.querySelector("#ability_use").width, document.querySelector("#ability_use").height)
    
                    // let gradient = context.createRadialGradient()
    
                    context.beginPath()
                    
                    context.fillStyle = data.fill
                    context.arc(mousePos.x, mousePos.y, 60, 0, Math.PI*2)
                    context.fill()
                    context.closePath()
                }

                let htmlTarget = document.querySelector(".actions")
                
                let abilityElement = document.createElement("span")
                abilityElement.classList.add("ability-event")
                abilityElement.style.left = '0px'
                abilityElement.style.top = '0px'
                abilityElement.style.width = '1280px'
                abilityElement.style.height = '720px'
                abilityElement.style.zIndex = '120'
                abilityElement.addEventListener("click", () => {
                    console.log("Ability used!")
                    if(document.querySelector(".ability-event")){
                        document.querySelector(".ability-event").remove()
                    }
                    this.fireEvent({
                        action: ActionTypes.ABILITY_USE,
                        abilityTarget: data.abilityTarget
                    })
                })
                htmlTarget.appendChild(abilityElement)

            }
            else{
                if(document.querySelector(".ability-event")){
                    document.querySelector(".ability-event").remove()
                }
                this.abilityUseStatus = ''
                context.clearRect(0,0,document.querySelector("#ability_use").width, document.querySelector("#ability_use").height)
                onmousemove = function(){}
            }
            
        }
        else if(action == ActionTypes.GAME_STATE_SET){
            if(data.stateTarget == 'game_state'){
                if(data.stateChange == 'play'){
                    if(data.playState == 'new_game'){
                        clearCanvas(document.querySelector("#text"))
                        clearCanvas(document.querySelector("#board_canvas"))
                        clearCanvas(document.querySelector("#control_canvas"))
                        clearCanvas(document.querySelector("#level_canvas"))
                        clearCanvas(document.querySelector("#extra_graphics"))
                        clearCanvas(document.querySelector("#level_text"))
                        this.renderers.instructions.render()
                        this.renderers.instructions.createHTML()
                        this.gameCore.setGameMode('pause')
    
                        setGameBackgroundAlpha(1)
    
                        document.querySelector(".option_active").classList.remove("option_active")
                        document.querySelectorAll(".option").forEach(option => {
                            if(option.innerHTML == 'Instructions'){
                                option.classList.add("option_active")
                            }
                        })
                    }
                    else{
                        clearCanvas(document.querySelector("#text"))
                        clearCanvas(document.querySelector("#board_canvas"))
                        clearCanvas(document.querySelector("#control_canvas"))
                        clearCanvas(document.querySelector("#level_canvas"))
                        clearCanvas(document.querySelector("#extra_graphics"))
                        clearCanvas(document.querySelector("#level_text"))
                        this.renderers.levelData.render()
                        this.renderers.levelData.createHTML()
                        this.gameCore.setGameMode('playing')

                        setGameBackgroundAlpha(0)

                        document.querySelector(".option_active").classList.remove("option_active")
                        document.querySelectorAll(".option").forEach(option => {
                            if(option.innerHTML == 'Level'){
                                option.classList.add("option_active")
                            }
                        })
                    }
                    
                   
                }
                else if(data.stateChange == 'pause'){
                    clearCanvas(document.querySelector("#extra_graphics"))
                    this.renderers.menu.setActiveMenuWindow("menu")
                    this.gameCore.setGameMode('pause')

                    setGameBackgroundAlpha(1)

                    document.querySelector(".option_active").classList.remove("option_active")
                    document.querySelectorAll(".option").forEach(option => {
                        if(option.innerHTML == 'Menu'){
                            option.classList.add("option_active")
                        }
                    })
    
                }
                else if(data.stateChange == 'unpause'){
                    clearCanvas(document.querySelector("#text"))
                    clearCanvas(document.querySelector("#board_canvas"))
                    clearCanvas(document.querySelector("#control_canvas"))
                    clearCanvas(document.querySelector("#extra_graphics"))
                    clearCanvas(document.querySelector("#level_canvas"))
                    clearCanvas(document.querySelector("#level_text"))
                    this.renderers.levelData.render()
                    this.renderers.levelData.createHTML()

                    setGameBackgroundAlpha(0)

                    document.querySelector(".option_active").classList.remove("option_active")
                    document.querySelectorAll(".option").forEach(option => {
                        if(option.innerHTML == 'Level'){
                            option.classList.add("option_active")
                        }
                    })
              
                }
                else if(data.stateChange == 'main_menu'){
                    clearCanvas(document.querySelector("#text"))
                    clearCanvas(document.querySelector("#board_canvas"))
                    clearCanvas(document.querySelector("#control_canvas"))
                    clearCanvas(document.querySelector("#extra_graphics"))
                    clearCanvas(document.querySelector("#tower_canvas"))
                    clearCanvas(document.querySelector("#level_canvas"))
                    clearCanvas(document.querySelector("#enemies_canvas"))
                    clearCanvas(document.querySelector("#level_text"))
             
                    this.renderers.menu.setActiveMenuWindow("main")

                    document.querySelector(".option_active").classList.remove("option_active")
                    document.querySelectorAll(".option").forEach(option => {
                        if(option.innerHTML == 'Main Menu'){
                            option.classList.add("option_active")
                        }
                    })
                }
                else if(data.stateChange == 'upgrade'){
                    clearCanvas(document.querySelector("#text"))
                    clearCanvas(document.querySelector("#board_canvas"))
                    clearCanvas(document.querySelector("#control_canvas"))
                    clearCanvas(document.querySelector("#extra_graphics"))

                    this.renderers.towerLevelUp.render()
                    this.renderers.towerLevelUp.createHTML()

                    setGameBackgroundAlpha(1)
                }
                else if(data.stateChange == 'player_upgrade'){
                    clearCanvas(document.querySelector("#text"))
                    clearCanvas(document.querySelector("#board_canvas"))
                    clearCanvas(document.querySelector("#control_canvas"))
                    clearCanvas(document.querySelector("#extra_graphics"))

                    this.renderers.playerLevelUp.render()
                    this.renderers.playerLevelUp.createHTML()

                    setGameBackgroundAlpha(1)
                }
                else if(data.stateChange == 'level_status'){
                    clearCanvas(document.querySelector("#text"))
                    clearCanvas(document.querySelector("#board_canvas"))
                    clearCanvas(document.querySelector("#control_canvas"))
                    clearCanvas(document.querySelector("#extra_graphics"))
                    if(data.changeType == 'win'){
                        this.renderers.gameStatus.setStatus('win')
                        this.renderers.gameStatus.render()
                        this.renderers.gameStatus.createHTML()
                    }
                    else if(data.changeType == 'lose'){
                        this.renderers.gameStatus.setStatus('lose')
                        this.renderers.gameStatus.render()
                        this.renderers.gameStatus.createHTML()
                    }
                }
                else if(data.stateChange == 'instructions'){
                    clearCanvas(document.querySelector("#text"))
                    clearCanvas(document.querySelector("#board_canvas"))
                    clearCanvas(document.querySelector("#control_canvas"))
                    clearCanvas(document.querySelector("#extra_graphics"))

                    this.renderers.instructions.render()
                    this.renderers.instructions.createHTML()
                }
        
            }
        }
        else if(action == ActionTypes.CONFIG_MODIFY){
            if(data.target == 'audio'){
                // let interval = 0;
                if(data.type == 'mute'){
                    let bitPiece = this.gameCore.mainAudio.player.volume / 60;

                    if(this.gameCore.mainAudio.player.volume != 0){

                        this.gameCore.mainAudio.oldVolume = this.gameCore.mainAudio.player.volume
                    }
                    
                    this.gameCore.mainAudio.player.volume = 0
                    this.gameCore.mainAudio.player.pause()

                    //! FADE OUT
                    // interval = setInterval(() => {
                    //     if(this.gameCore.mainAudio.player.volume < bitPiece){
                    //         this.gameCore.mainAudio.player.volume = 0;
                    //         this.gameCore.mainAudio.player.pause()
                    //         clearInterval(interval);
                    //     } else{
                    //         this.gameCore.mainAudio.player.volume -= bitPiece;
                    //     }

                    // }, 1)
                    localStorage.setItem("audio-cfg",0);
                    this.gameCore.renderers.menu.setAudioBarWidth(0);
                }
                else if(data.type == 'activate'){
                    if(this.gameCore.mainAudio.oldVolume == 0){
                        this.gameCore.mainAudio.oldVolume = 0.2;
                    }
                    // console.log(this.gameCore.mainAudio.oldVolume)
                    // let bitPiece = this.gameCore.mainAudio.oldVolume / 60
                    // console.log("Bitpiece:",bitPiece)

                    this.gameCore.mainAudio.player.volume = this.gameCore.mainAudio.oldVolume
                    this.gameCore.mainAudio.player.play()
                    //! FADE IN
                    // interval = setInterval(() => {
                    //     this.
                    //     if(this.gameCore.mainAudio.player.volume > this.gameCore.mainAudio.oldVolume){
                    //         this.gameCore.mainAudio.player.volume = this.gameCore.mainAudio.oldVolume;
                    //         this.gameCore.mainAudio.player.play()
                 
                    //         console.log(this.gameCore.mainAudio.player)
                    //         clearInterval(interval);
                            
                    //     } else{
                    //         if(this.gameCore.mainAudio.player.volume + bitPiece > 1){
                    //             this.gameCore.mainAudio.player.volume = 1
                    //         }
                    //         else{
                    //             this.gameCore.mainAudio.player.volume = (this.gameCore.mainAudio.player.volume + bitPiece).toFixed(2);
                    //         }
                            
                    //     }
                        
                    // }, 1)
                    console.log(this.gameCore.mainAudio.player.volume)
                    localStorage.setItem("audio-cfg",this.gameCore.mainAudio.player.volume);
                    this.gameCore.renderers.menu.setAudioBarWidth(this.gameCore.mainAudio.oldVolume);
                }
                else if(data.type == 'decrease'){
                    if(this.gameCore.mainAudio.player.volume > 0){
                        this.gameCore.mainAudio.oldVolume = this.gameCore.mainAudio.player.volume
                        this.gameCore.mainAudio.player.volume = (this.gameCore.mainAudio.player.volume - 0.1).toFixed(2);
                        this.gameCore.renderers.menu.setAudioBarWidth(this.gameCore.mainAudio.player.volume);
                        localStorage.setItem("audio-cfg",this.gameCore.mainAudio.player.volume);

                    }
                }
                else if(data.type == 'increase'){
                    if(this.gameCore.mainAudio.player.volume < 1){
                        this.gameCore.mainAudio.oldVolume = this.gameCore.mainAudio.player.volume
                        console.log(this.gameCore.mainAudio.player.volume)
                        if(this.gameCore.mainAudio.player.volume +0.1 > 1){
                            this.gameCore.mainAudio.player.volume = 1;
                        }
                        else{
                            this.gameCore.mainAudio.player.volume = (this.gameCore.mainAudio.player.volume + 0.1).toFixed(2);
                            this.gameCore.mainAudio.oldVolume = this.gameCore.mainAudio.player.volume
                        }
                        this.gameCore.renderers.menu.setAudioBarWidth(this.gameCore.mainAudio.player.volume);
                        localStorage.setItem("audio-cfg",this.gameCore.mainAudio.player.volume);

                        if(this.gameCore.mainAudio.player.paused){
                            this.gameCore.mainAudio.player.play()
                        }
                    }
                }

            }
        }
        else if(action == ActionTypes.CONFIG_RESET){
            this.gameCore.mainAudio.player.volume = 0.3;
            localStorage.setItem("audio-cfg",0.3);
            this.gameCore.mainAudio.player.play()
            this.gameCore.renderers.menu.setAudioBarWidth(0.3)
        }

        console.groupEnd()
        // if(action == ActionTypes.GAME_STATE_SET){

        // }
    }
}