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
            currentGameLevel: 1,
            characterLevel: 1,
            xp_points: 0,
            bonusCoins: 0,
            bonusMana: 0,
            maxMana: 100,
            manaLimit: 200,
            coins: 0,
            mana: 0,
            
        }
        this.observers = {
            
        }
    }

    stateReset(){

        console.warn("RESETING PLAYER DATA STATE")

        this.state = {
            currentGameLevel: 1,
            characterLevel: 1,
            xp_points: 0,
            bonusCoins: 0,
            bonusMana: 0,
            maxMana: 100,
            coins: 0,
            mana: 0
           
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

    createObserver(observerName, observer, dataTargets){
        if(Object.keys(this.observers).includes(observerName)){
            return
        }
        this.observers[observerName] = [observer, [...dataTargets]]
        this.notifyObserver(observerName)
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



    updateState(val){
        console.groupCollapsed("playerStateChange |  Modifying state")
        console.log("previous state", this.state)
        let flag = 0;
        Object.keys(val).forEach(key => {
            if(this.state[key] != val[key]){
                this.state[key] = val[key]
                flag = 1
            }
            else if(!Object.keys(this.state).includes(key)){
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

}
