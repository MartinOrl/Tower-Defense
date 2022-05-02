class StateManager{
    constructor(){
        this.state = {
  
        }
    }

    setState(object){
        this.state = {
            ...object
        }
    }
}


class PlayerStateManager extends StateManager{
    constructor(){
        super()

        this.state = {
            currentGameWindow: "main",
            currentGameStatus: 'paused',
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
        this.observers = {
            
        }

        this.logging = true
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

    // bootNotification(){
    //     Object.keys(this.observers).forEach(observerKey => {
    //         this.notifyObserver(observerKey)
    //     })  
    // }


    stateReset(){

        this.logInfo("RESETING PLAYER DATA STATE","warn")

        this.state = {
            currentGameWindow: "main",
            currentGameStatus: 'paused',
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

        Object.keys(this.observers).forEach(observer => {
            this.notifyObserver(observer)
        })

    }
    

    createObserver(observerName, observer, dataTargets){
        
        if(Object.keys(this.observers).includes(observerName)){
            return
        }
        this.logInfo(`Observer added: ${observerName}`)
        this.observers[observerName] = [observer, [...dataTargets]]
        this.notifyObserver(observerName)
    }

    updateState(val){
        console.groupCollapsed("playerStateChange |  Modifying state")
        console.log("previous state", this.state)
        let flag = 0;
        Object.keys(val).forEach(key => {
            if(this.state[key] != val[key] || !Object.keys(this.state).includes(key)){
                this.state[key] = val[key]
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



    

}
