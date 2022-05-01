
class GameManager{
    constructor(parent){
        this.gameCore = parent
        this.renderers = {

        }
        this.abilityUseStatus = ''
        this.manaInterval;
        this.data;
    }

    getNotification(data){
        console.log("New data:",data)
        this.data = data
    }

    registerRenderer(id,renderer){
        this.renderers[id] = renderer
    }

    setRenderers(renderersGroup){
        this.renderers = renderersGroup
    }

    manaUpdate(){
        this.manaInterval = setInterval(() => {
            
            let currentMana = this.data.mana
            let maxMana = this.data.maxMana

            if(currentMana < maxMana){
            
                this.gameCore.stateManagers.playerState.updateState({
                    "mana": currentMana + 1 + this.data.bonusMana*0.1
                })
                this.gameCore.renderers.levelData.renderUpdate()

            }
            currentMana = this.data.mana
            if(currentMana > maxMana){

                this.gameCore.stateManagers.playerState.updateState({
                    "mana": maxMana
                })
                this.gameCore.renderers.levelData.data.extraGraphics[3].width = 240
                this.gameCore.renderers.levelData.renderUpdate()

                this.manaInterval = clearInterval(this.manaInterval)
                this.manaInterval = null
                return
            }
        }, 200);
        

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
                clearCanvas(document.querySelector("#animations"))
                console.log("previous State ", this.renderers.menu.activeMenuWindow)
                this.renderers.menu.setActiveMenuWindow(data.windowChange)
                console.log("new State ", this.renderers.menu.activeMenuWindow)
            }
            if(data.windowTarget == 'return'){
                clearCanvas(document.querySelector("#animations"))
            }
        }
        else if(action == ActionTypes.ABILITY_USE){
            let old = this.abilityUseStatus
            this.abilityUseStatus = data.abilityTarget
            let context = document.querySelector("#ability_use").getContext("2d")
            if(this.abilityUseStatus != old){
                if(this.data.mana >= data.manaCost){

                    onmousemove = function(e){
                        let box = document.querySelector("#ability_use").getBoundingClientRect()
                        let mousePos = {
                            x: e.clientX - box.x,
                            y: e.clientY - box.y
                        }
        
                        context.clearRect(0,0,document.querySelector("#ability_use").width, document.querySelector("#ability_use").height)
                
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
                        if(this.data.mana >= data.manaCost){
                            console.log("Ability used!")
                            if(document.querySelector(".ability-event")){
                                document.querySelector(".ability-event").remove()
                            }
                           
                            this.gameCore.stateManagers.playerState.updateState({
                                "mana": this.data.mana - data.manaCost
                            })
                            if(this.manaInterval == null){
                                this.manaUpdate()
                            }
                            
                        }
                        
                        this.fireEvent({
                            action: ActionTypes.ABILITY_USE,
                            abilityTarget: data.abilityTarget
                        })
                    })
                    htmlTarget.appendChild(abilityElement)
                }
                
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
                        this.gameCore.stateManagers.playerState.stateReset()
                        clearCanvas(document.querySelector("#text"))
                        clearCanvas(document.querySelector("#board_canvas"))
                        clearCanvas(document.querySelector("#control_canvas"))
                        clearCanvas(document.querySelector("#animations"))
                        clearCanvas(document.querySelector("#level_canvas"))
                        clearCanvas(document.querySelector("#extra_graphics"))
                        clearCanvas(document.querySelector("#level_text"))
                    
                        this.renderers.instructions.render()
                        this.renderers.instructions.createHTML()
                        this.gameCore.setGameMode('play')
    
                        setGameBackgroundAlpha(1)
    
                        document.querySelector(".option_active").classList.remove("option_active")
                        document.querySelectorAll(".option").forEach(option => {
                            if(option.innerHTML == 'Instructions'){
                                option.classList.add("option_active")
                            }
                        })
                    }
                    else{
                        this.gameCore.stateManagers.playerState.stateReset()
                        clearCanvas(document.querySelector("#text"))
                        clearCanvas(document.querySelector("#board_canvas"))
                        clearCanvas(document.querySelector("#control_canvas"))
                        clearCanvas(document.querySelector("#level_canvas"))
                        clearCanvas(document.querySelector("#animations"))
                        clearCanvas(document.querySelector("#extra_graphics"))
                        clearCanvas(document.querySelector("#level_text"))
                        this.manaUpdate()

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
                    this.gameCore.setGameMode('paused')
                    clearInterval(this.manaInterval)
                    this.gameCore.renderers.levelData.renderUpdate(true)

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
                    clearCanvas(document.querySelector("#animations"))
                    clearCanvas(document.querySelector("#level_text"))
                    this.renderers.levelData.render()
                    this.renderers.levelData.createHTML()
                    this.gameCore.setGameMode("play")
                    this.manaUpdate()
                    setGameBackgroundAlpha(0)

                    document.querySelector(".option_active").classList.remove("option_active")
                    document.querySelectorAll(".option").forEach(option => {
                        if(option.innerHTML == 'Level'){
                            option.classList.add("option_active")
                        }
                    })
              
                }
                else if(data.stateChange == 'main_menu'){
                    this.manaInterval ? clearInterval(this.manaInterval) : ""

                    this.gameCore.renderers.levelData.cancelAnimationFrame()
                    

                    clearCanvas(document.querySelector("#text"))
                    clearCanvas(document.querySelector("#board_canvas"))
                    clearCanvas(document.querySelector("#control_canvas"))
                    clearCanvas(document.querySelector("#extra_graphics"))
                    clearCanvas(document.querySelector("#tower_canvas"))
                    clearCanvas(document.querySelector("#animations"))
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
                    clearCanvas(document.querySelector("#animations"))
                    clearCanvas(document.querySelector("#extra_graphics"))
                    clearInterval(this.manaInterval)
                    this.gameCore.renderers.levelData.renderUpdate(true)

                    this.renderers.towerLevelUp.render()
                    this.renderers.towerLevelUp.createHTML()

                    setGameBackgroundAlpha(1)
                }
                else if(data.stateChange == 'player_upgrade'){
                    clearCanvas(document.querySelector("#text"))
                    clearCanvas(document.querySelector("#board_canvas"))
                    clearCanvas(document.querySelector("#control_canvas"))
                    clearCanvas(document.querySelector("#extra_graphics"))
                    clearCanvas(document.querySelector("#animations"))
                    clearInterval(this.manaInterval)
                    this.gameCore.renderers.levelData.renderUpdate(true)

                    this.renderers.playerLevelUp.render()
                    this.renderers.playerLevelUp.createHTML()

                    setGameBackgroundAlpha(1)
                }
                else if(data.stateChange == 'level_status'){
                    clearCanvas(document.querySelector("#text"))
                    clearCanvas(document.querySelector("#board_canvas"))
                    clearCanvas(document.querySelector("#control_canvas"))
                    clearCanvas(document.querySelector("#extra_graphics"))
                    clearCanvas(document.querySelector("#animations"))
                    clearInterval(this.manaInterval)
                    this.gameCore.renderers.levelData.renderUpdate(true)
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

                    clearCanvas(document.querySelector("#animations"))

                    this.renderers.instructions.render()
                    this.renderers.instructions.createHTML()
                }
                else if(data.stateChange == 'advance'){
                    this.gameCore.state.currentLevel += 1
                    this.gameCore.setGameMode("play")
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
             
                    localStorage.setItem("audio-cfg",0);
                    this.gameCore.renderers.menu.setAudioBarWidth(0);
                }
                else if(data.type == 'activate'){
                    if(this.gameCore.mainAudio.oldVolume == 0){
                        this.gameCore.mainAudio.oldVolume = 0.2;
                    }
                    this.gameCore.mainAudio.player.volume = this.gameCore.mainAudio.oldVolume
                    this.gameCore.mainAudio.player.play()
               
                    console.log(this.gameCore.mainAudio.player.volume)
                    localStorage.setItem("audio-cfg",this.gameCore.mainAudio.player.volume);
                    this.gameCore.renderers.menu.setAudioBarWidth(this.gameCore.mainAudio.player.volume);
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
                        // console.log(this.gameCore.mainAudio.player.volume)
                        if(this.gameCore.mainAudio.player.volume +0.1 > 1){
                            this.gameCore.mainAudio.player.volume = 1;
                        }
                        else{
                            this.gameCore.mainAudio.oldVolume = this.gameCore.mainAudio.player.volume
                            this.gameCore.mainAudio.player.volume = (this.gameCore.mainAudio.player.volume + 0.1).toFixed(2);
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
        else if(action == ActionTypes.UPGRADE_PLAYER_SPEC){
            console.log(data.upgradeTarget)
            console.log("Old:",this.data)

            console.log("Target:",this.data[data.upgradeTarget], data.upgradeTarget)
            if(data.upgradeTarget == "maxMana"){
                this.data[data.upgradeTarget] += this.data[data.upgradeTarget] < this.data.manaLimit ? 10 : 0
            }
            else{
                this.data[data.upgradeTarget] += this.data[data.upgradeTarget] < 5 ? 1 : 0
            }
            console.log("Upgrade:",this.data)
            this.gameCore.stateManagers.playerState.updateState(this.data)
            this.gameCore.renderers.playerLevelUp.renderUpdate()
        }

        console.groupEnd()
  
    }
}
