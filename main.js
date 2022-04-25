
function setGameBackground(url){
    console.log(document.querySelector(".canvas_bg").style.background)
    console.log(url)
    document.querySelector(".canvas_bg").style.background = `url(${url})`
    console.log(document.querySelector(".canvas_bg").style.background)
}

window.addEventListener("load", () => {

    class Game{
        constructor(){
            this.state = {
                currentLevel: 0,
                gameMode: 'paused',
                
            }
            this.assets = IMG_ASSETS_LIST

            this.stateManagers = {
                playerState: new PlayerStateManager()
            }
     
         

            this.renderers = {
                menu: new MenuRenderer(this),
                levelData: new LevelDataRenderer(this),
                towerLevelUp: new TowerLevelUpRenderer(this),
                playerLevelUp: new PlayerLevelUpRenderer(this),
                gameStatus: new GameStatusRenderer(this),
                instructions: new InstructionsRenderer(this)
            }

            this.eventManagers = [
                new GameManager(this),
       
            ]

            this.stateManagers.playerState.createObserver("game",this.eventManagers[0],["mana","maxMana","bonusMana","bonusCoins","manaLimit"])
            this.stateManagers.playerState.createObserver("levelData",this.renderers.levelData,["mana","maxMana"])  
            this.stateManagers.playerState.createObserver("playerUpgrade",this.renderers.playerLevelUp,["maxMana","bonusMana","bonusCoins","manaLimit"])  
            


            this.renderers.menu.setEventManager(this.eventManagers[0])
            this.renderers.levelData.setEventManager(this.eventManagers[0])
            this.renderers.towerLevelUp.setEventManager(this.eventManagers[0])
            this.renderers.playerLevelUp.setEventManager(this.eventManagers[0])
            this.renderers.gameStatus.setEventManager(this.eventManagers[0])
            this.renderers.instructions.setEventManager(this.eventManagers[0])

            this.eventManagers[0].setRenderers(this.renderers)

            this.mainAudio = {
                player: new Audio("./Assets/Music/background.wav"),
                oldVolume: 0
            }
            

            this.mainAudio.player.muted = false;
            this.mainAudio.player.loop = true;
            this.mainAudio.player.addEventListener = true
            this.mainAudio.player.pause()

            this.mainAudio.player.volume = localStorage.getItem("audio-cfg") != null ? localStorage.getItem("audio-cfg") : 0.3;
            this.mainAudio.oldVolume = localStorage.getItem("audio-cfg") != null ? localStorage.getItem("audio-cfg") : 0.3;
            this.renderers.menu.setAudioBarWidth(this.mainAudio.player.volume,true)
            

        }


        setGameMode(mode){
    
            console.log("previous State ", this.state)
            this.state.gameMode = mode
            console.log("new State ", this.state)
        }
        
        boot(){

            setGameBackground('./Assets/Levels/level_1.webp')
            setGameBackgroundAlpha(1)
            this.renderers.menu.renderMenu()
            
            
       
        }
    }

    var TowerDefense = new Game()
    TowerDefense.boot()

    document.querySelectorAll(".option").forEach(option => {
        option.addEventListener("click", () => {
            
            TowerDefense.mainAudio.player.play()
            let old = document.querySelector(".option_active").innerHTML
            document.querySelector(".option_active").classList.remove("option_active")
            option.classList.add("option_active")

   
            if(old != option.innerHTML){
                if(option.innerHTML == 'Main Menu'){
                    TowerDefense.eventManagers[0].fireEvent({
                        action: ActionTypes.GAME_STATE_SET,
                        stateTarget: 'game_state',
                        stateChange: 'main_menu',
                    })

                    setGameBackgroundAlpha(1)
                }
                else if(option.innerHTML == 'Settings'){
                    TowerDefense.eventManagers[0].fireEvent({
                        action: ActionTypes.WINDOW_SET,
                        windowTarget: 'menu',
                        windowChange: 'settings'
                    })
                    
                    setGameBackgroundAlpha(1)
                }
                else if(option.innerHTML == 'Instructions'){
                    console.log("AA")
                    TowerDefense.eventManagers[0].fireEvent({
                        action: ActionTypes.GAME_STATE_SET,
                        stateTarget: 'game_state',
                        stateChange: 'instructions',
                        playState: 'pause'
                    })
                    setGameBackgroundAlpha(0.4)
                }
                else if(option.innerHTML == 'Menu'){
                    TowerDefense.eventManagers[0].fireEvent({
                        action: ActionTypes.GAME_STATE_SET,
                        stateTarget: 'game_state',
                        stateChange: 'pause',
                    })
                    setGameBackgroundAlpha(1)
                }
                else if(option.innerHTML == 'Level'){
                    TowerDefense.eventManagers[0].fireEvent({
                        action: ActionTypes.GAME_STATE_SET,
                        stateTarget: 'game_state',
                        stateChange: 'unpause',
                    })
                    setGameBackgroundAlpha(0)
                }
                else if(option.innerHTML == 'Tower LevelUp'){
                    TowerDefense.eventManagers[0].fireEvent({
                        action: ActionTypes.GAME_STATE_SET,
                        stateTarget: 'game_state',
                        stateChange: 'upgrade',
                    })

                    setGameBackgroundAlpha(1)
                }
                else if(option.innerHTML == 'Player LevelUp'){
                    TowerDefense.eventManagers[0].fireEvent({
                        action: ActionTypes.GAME_STATE_SET,
                        stateTarget: 'game_state',
                        stateChange: 'player_upgrade',
                    })

                    setGameBackgroundAlpha(1)
                }
                else if(option.innerHTML == 'Game Win'){
                    TowerDefense.eventManagers[0].fireEvent({
                        action: ActionTypes.GAME_STATE_SET,
                        stateTarget: 'game_state',
                        stateChange: 'level_status',
                        changeType: 'win'
                    })
                    
                    setGameBackgroundAlpha(1)
                }
                else if(option.innerHTML == 'Game Over'){
                    TowerDefense.eventManagers[0].fireEvent({
                        action: ActionTypes.GAME_STATE_SET,
                        stateTarget: 'game_state',
                        stateChange: 'level_status',
                        changeType: 'lose'
                    })
                    
                    setGameBackgroundAlpha(1)
                }
            }
            

        })
    })

})


