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
        console.warn(event)
        if(event.action == ActionTypes.WINDOW_SET){
            let modifier;
            console.warn(this.stateManager.getGameStatus)
            if(event.windowChange == 'return'){
                if(this.stateManager.getGameStatus == 'main'){
                    modifier = 'main'
                }
                if(this.stateManager.getGameStatus == 'pause'){
                    modifier = 'menu'
                }
            }
            this.stateManager.updateState({
                currentGameWindow: event.windowChange == 'return' ? modifier : event.windowChange
            })
        }
        else if(event.action == ActionTypes.TOWER_UPGRADE){
            let tower = this.stateManager.state.selectedTower
            if(tower.level < 3){
                tower.upgrade()
                console.warn(tower)
                this.stateManager.updateState({
                    selectedTower: tower
                })
            }
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

   
        this.level;
        this.towersManager;
        this.enemiesManager;
   
    }

    linkTowerManager(manager){
        this.towersManager = manager
    }

  

    setPositions(level){
        this.towersPositions = TOWER_PLACE_POSITIONS[`level_${level}`]

    }

    getNotification(data){
        console.log("Level Manager Update", data)
        if(!Array.isArray(data) &&  data.currentGameLevel){
      
            this.setPositions(data.currentGameLevel);
        } 
        
    }

    updatePositions(level){
        this.towersPositions = TOWER_PLACE_POSITIONS[`level_${level}`]
        this.createExtraHTML(this.towersPositions)
    }

    createHTML(){

        console.log("Creating tower html")
        let target = document.querySelector(".actions")

        this.towersPositions.forEach((position,i) => {

            let {x,y} = position
            let newHTMLElement = document.createElement("span")
            newHTMLElement.id = `towerEvent_${i}`
            newHTMLElement.style.left = `${x - this.basicProperties.width}px`;
            newHTMLElement.style.top = `${y - this.basicProperties.height}px`;
            newHTMLElement.style.width = `${this.basicProperties.width*2}px`;
            newHTMLElement.style.height = `${this.basicProperties.height*2}px`;
            newHTMLElement.addEventListener("click", () => {
             
                this.towersManager.callTowerClick(x,y,i)
                
                
            })
            target.appendChild(newHTMLElement)
        })
    }

    createExtraHTML(buildPaths){
        console.log("Creating tower html")
        let target = document.querySelector(".actions")
        
        buildPaths.forEach((position,i) => {

            let {x,y} = position
            let newHTMLElement = document.createElement("span")
            newHTMLElement.classList.add(`towerEventExtra`)
            newHTMLElement.style.left = `${x}px`;
            newHTMLElement.style.top = `${y}px`;
            newHTMLElement.style.width = `48px`;
            newHTMLElement.style.height = `48px`;
            newHTMLElement.addEventListener("click", () => {
                let tower = i == 0 ? 'archer' : i == 1 ? "magic" : "bombard"
  
                this.towersManager.buildTower(tower)
            })
            target.appendChild(newHTMLElement)
        })
    }

    deleteExtraHTML(){
        document.querySelectorAll(".towerEventExtra").forEach(extra => {
            extra.remove()
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
    constructor(url){
        this.audioPlayer = new Audio(url)

        this.oldVolume = localStorage.getItem("audio-cfg") != null ? localStorage.getItem("audio-cfg") : 0.3;
        this.volume = localStorage.getItem("audio-cfg") != null ? localStorage.getItem("audio-cfg") : 0.3;

        //? Basic configuration
        this.audioPlayer.volume = 1
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

    play(){
        console.warn("Play Toggle")
        this.audioPlayer.play()
    }
    stop(){
        this.audioPlayer.pause()
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