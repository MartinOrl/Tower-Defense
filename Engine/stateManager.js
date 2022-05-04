class StateManager{
    constructor(){
        this.state = {
  
        }

        this.observers = {

        }
    }

    setState(object){
        this.state = {
            ...object
        }
    }

    createObserver(observerName, observer, dataTargets){
        
        if(Object.keys(this.observers).includes(observerName)){
            return
        }
        this.logInfo(`Observer added: ${observerName}`)
        this.observers[observerName] = [observer, [...dataTargets]]
        this.notifyObserver(observerName)
    }

    notifyObserver(observer){
        if(observer){
            let data = {
            }
            this.observers[observer][1].forEach(tmp => {
                data[tmp] = this.state[tmp]
            })
         
            this.observers[observer][0].getNotification(data)
        }
    }

    rendererNotify(observer, formattedData){
        this.observers[observer][0].getNotification(formattedData)
    }

    createObserver(observerName, observer, dataTargets){
        
        if(Object.keys(this.observers).includes(observerName)){
            return
        }
        this.logInfo(`Observer added: ${observerName}`)
        this.observers[observerName] = [observer, [...dataTargets]]
        this.notifyObserver(observerName)
    }

    
}

class TowersStateManager extends StateManager{
    constructor(){
        super()
        this.state = {
            towers: [
                
            ]
        }
    }

    logInfo(info,type=""){
        if(this.logging){
            if(type == 'warn'){
                console.warn("[TOWER_STATE_MANAGER]:",info)
                return
            }
            console.log("[TOWER_STATE_MANAGER]:",info)
            return
        }
    }

    createTower(towerData){
        console.groupCollapsed("towerStateChange |  Modifying state")
        console.log("previous state", this.state)
        this.state.towers.push(towerData)
        

        Object.keys(this.observers).forEach(observer => {
            let initialData = []

            this.state.towers.forEach(tower => {
                initialData.push(tower.dataForRenderer)
            })
            this.rendererNotify(observer,{
                type: 'image',
                data: initialData
            })
        })
        console.log("next state", this.state)
        console.groupEnd()
        
    
    }
    reset(){
        this.state.towers = []
        Object.keys(this.observers).forEach(observer => {
            let initialData = []
            this.rendererNotify(observer,{
                type: 'image',
                data: initialData
            })
        })
    }

    // updateState(val){
    //     console.groupCollapsed("towerStateChange |  Modifying state")
    //     console.log("previous state", this.state)
    //     console.log(val)

    //     let flag = 0;
    //     Object.keys(val).forEach(key => {
    //         if(this.state[key] != val[key] || !Object.keys(this.state).includes(key)){
    //             this.state[key] = val[key]
    //             flag = 1
    //         }
            
    //     })
    //     if(flag){
            
    //         Object.keys(this.observers).forEach(observer => {
    //             let match = 0;
    //             Object.keys(val).forEach(key => {
    //                 if(this.observers[observer][1].includes(key)){
    //                     match = 1
    //                 }
    //             })
    //             if(match){
    //                 this.notifyObserver(observer)
    //             }
                
    //         })
    //     }
    //     console.log("new state", this.state)
    //     console.groupEnd()
        
    // }
}


class PlayerStateManager extends StateManager{
    constructor(){
        super()

        this.state = {
            currentGameWindow: "main",
            currentGameStatus: 'pause',
            currentGameLevel: 1,
            characterLevel: 1,
            xp_points: 0,
            bonusCoins: 0,
            bonusMana: 0,
            maxMana: 100,
            manaLimit: 200,
            coins: 0,
            mana: 0,
            volume: 0
            
        }
   
        this.logging = true

        Object.keys(this.state).forEach(stateKey => {
            if(document.querySelector(`#${stateKey}`)){
                document.querySelector(`#${stateKey}`).innerHTML = this.state[stateKey]
            }
        })

        console.log(this.state)
    }

    saveStateToMemory(){
        let data = this.state
        data.coins = 0;
        data.mana = 0;
        localStorage.setItem("save", data)
    }



    logInfo(info,type=""){
        if(this.logging){
            if(type == 'warn'){
                console.warn("[PLAYER_STATE_MANAGER]:",info)
                return
            }
            console.log("[PLAYER_STATE_MANAGER]:",info)
            return
        }
    }

    


    

    // bootNotification(){
    //     Object.keys(this.observers).forEach(observerKey => {
    //         this.notifyObserver(observerKey)
    //     })  
    // }


    stateReset(){

        this.logInfo("RESETING PLAYER DATA STATE","warn")

        this.state = {
            currentGameWindow: "main",
            currentGameStatus: 'pause',
            currentGameLevel: 1,
            characterLevel: 1,
            xp_points: 0,
            bonusCoins: 0,
            bonusMana: 0,
            maxMana: 100,
            manaLimit: 200,
            coins: 0,
            mana: 0,
            volume: 0
           
        }

        this.manaInterval;

        Object.keys(this.observers).forEach(observer => {
            this.notifyObserver(observer)
        })

    }

    startManaUpdate(){
        this.manaInterval = setInterval(() => {
            if(this.getMana < this.state.maxMana){
                this.updateState({
                    mana: this.getMana + 1 + this.state.bonusMana*0.5
                })
            }
        }, 1000);
    }
    
    

    

    updateState(val){
        console.groupCollapsed("playerStateChange |  Modifying state")
        console.log("previous state", this.state)
        console.log(val)

        let flag = 0;
        Object.keys(val).forEach(key => {
            if(this.state[key] != val[key] || !Object.keys(this.state).includes(key)){
                this.state[key] = val[key]
                if((key == 'currentGameStatus' && val[key] == 'play') || (key == 'currentGameStatus' && val[key] == 'resume')){
                    this.startManaUpdate()
                }
                else if(key == 'currentGameStatus' && val[key] == 'pause'){
                    console.log("Pausing interval")
                    clearInterval(this.manaInterval)
                }
               
                flag = 1
            }
            
        })
        if(flag){
            
            Object.keys(this.observers).forEach(observer => {
                let match = 0;
                Object.keys(val).forEach(key => {
                    if(this.observers[observer][1].includes(key)){
                        match = 1
                    }
                })
                if(match){
                    this.notifyObserver(observer)
                }
                
            })
        }
        console.log("new state", this.state)
        console.groupEnd()


        Object.keys(this.state).forEach(stateKey => {
            if(document.querySelector(`#${stateKey}`)){
                document.querySelector(`#${stateKey}`).innerHTML = this.state[stateKey]
            }
        })
    }

    get getGameStatus(){
        return this.state.currentGameStatus
    }

    get getGameLevel(){
        return this.state.currentGameLevel
    }

    get getCharacterLevel(){
        return this.state.characterLevel
    }

    get getXPPoints(){
        return this.state.xp_points
    }

    get getUpgrades(){
        
        return {
            bonusCoins: this.state.bonusCoins,
            bonusMana: this.state.bonusMana,
            maxMana: this.state.bonusMana
        }
    }

    get getCurrentLevelStats(){
        return {
            coins: this.state.coins,
            mana: this.state.mana,        
        }
    }

    get getCoins(){
        return this.state.coins
    }

    get getMana(){
        return this.state.mana
    }

    get getMaxMana(){
        return this.state.maxMana
    }

    get getBonusMana(){
        return this.state.bonusMana
    }



    

}
