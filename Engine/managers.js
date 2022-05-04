class ClickEventManager{
    constructor(){
        this.stateManager;
    }

    linkStateManager(manager){
        this.stateManager = manager
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

        if(event.action == ActionTypes.WINDOW_SET){
          
            this.stateManager.updateState({
                currentGameWindow: event.windowChange == 'return' ? this.stateManager.getGameStatus == 'paused' ? 'main' : 'menu' : event.windowChange
            })
        }
        else if(event.action == ActionTypes.GAME_STATE_SET){
            if(event.stateChange == 'main'){
                this.stateManager.updateState({
                    currentGameStatus: 'main',
                    currentGameWindow: 'main'
                })
                return
            }
            this.stateManager.updateState({
                currentGameStatus: event.stateChange,
                currentGameWindow: event.stateChange == 'pause' ? 'menu' : false

            })
        }
       
    }
}

class LevelManager{
    constructor(){
        this.towersPositions = []
        
        this.basicProperties = {
            width: 60,
            height: 35
        }

        this.activePositions = []
        this.level;
        this.towersManager;
    }

    linkTowerManager(manager){
        this.towersManager = manager
    }

    setPositions(level){
        this.towersPositions = TOWER_PLACE_POSITIONS[`level_${level}`]

    }

    getNotification(data){
        this.setPositions(data.currentGameLevel);
    }

    resetPositions(){
        this.activePositions = []
    }

    createHTML(){

        console.log("Creating tower html")
        let target = document.querySelector(".actions")

        this.towersPositions.forEach(position => {

            let {x,y} = position
            let newHTMLElement = document.createElement("span")
            newHTMLElement.style.left = `${x - this.basicProperties.width}px`;
            newHTMLElement.style.top = `${y - this.basicProperties.height}px`;
            newHTMLElement.style.width = `${this.basicProperties.width*2}px`;
            newHTMLElement.style.height = `${this.basicProperties.height*2}px`;
            newHTMLElement.addEventListener("click", () => {
                if(this.activePositions.includes(position) ){

                }
                else{
                    this.activePositions.push(position)
                    this.towersManager.createTower(new ArcherTower(x,y))
                }
                
                
            })
            target.appendChild(newHTMLElement)
        })

    
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