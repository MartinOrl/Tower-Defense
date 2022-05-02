class ClickEventManager{
    constructor(){

    }

    fireEvent(event){
        //* STRUCTURE  */
        //?
        //?  @action - specifies action from config
        //?  @target - specifies target
        //?  @change - specifies change
        //?
        //?
        //****************************/ 

        if(event.action == ActionTypes.GAME_STATE_SET){
            
        }
       
    }
}

class LevelManager{
    constructor(){

    }
}




class MasterManager{
    //********************************************************* */

    //? Handles menu window change requests and if to start or pause a game

    //********************************************************* */
    constructor(){
        this.stateManagerRef;
    }

    setStateManager(manager){
        this.stateManagerRef = manager
    }

    handleEvent(eventData){
        
        if(this.stateManagerRef){
            if(eventData.stateTarget == 'game_state'){
                if(["play","pause","unpause"].includes(eventData.stateChange)){
                    this.stateManagerRef.updateState({
                        currentGameStatus: eventData.stateChange == 'unpause' ? 'play' : eventData.stateChange
                    })
                }
                else{
                    this.stateManagerRef.updateState({
                        currentGameWindow: eventData.stateChange
                    })
                }
            }
        }
    }
}

class AudioManager{
    constructor(){
        this.audioPlayer = new Audio("./Assets/Music/background.wav")

        this.oldVolume = localStorage.getItem("audio-cfg") != null ? localStorage.getItem("audio-cfg") : 0.3;
        this.volume = localStorage.getItem("audio-cfg") != null ? localStorage.getItem("audio-cfg") : 0.3;

        //? Basic configuration
        this.audioPlayer.muted = false
        this.audioPlayer.loop = true
        this.audioPlayer.addEventListener = true

        this.audioPlayer.pause()

        this.observers = [];

    }

    registerObserver(observer){
        this.observers.push(observer)
    }

    notifyObservers(){
        this.observers.forEach(observer => {
            observer.notify(this.volume)
        })
    }

    modifyVolume(newVolume){
        if(newVolume != this.volume){
            this.oldVolume = this.volume
            this.audioPlayer.volume = this.volume
            this.notifyObservers()
        }
    }

    getNotification(data){
        this.modifyVolume(data.volume)
    }

    

 
}


class Engine{

    //********************************************************* */

    //? Main engine of the game, all data passes through it

    //********************************************************* */
    constructor(){

        //? State Managers
        this.stateManager = new PlayerStateManager()

        //? Audio Managers
        this.audioManager = new AudioManager()

        //? Rendering Engine
        this.renderingEngine = new RenderingEngine()

        this.stateManager.createObserver("audio", this.audioManager, ["volume"])
        this.stateManager.createObserver("renderEngine", this.renderingEngine, ["currentGameWindow","currentGameStatus","currentGameLevel"])

        // this.stateManager.bootNotification()

    }

    boot(){
        let image = IMG_ASSETS_LIST.levels[`level_${this.stateManager.getGameLevel}`].image.src
        
  
        document.querySelector(".level").style.background = `url(${image})`

        this.renderingEngine.boot()
    }


    callUpdate(){


    }
}