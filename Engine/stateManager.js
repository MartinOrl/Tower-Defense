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

class EnemiesStateManager extends StateManager{
    constructor(){
        super()
        this.state = {
            enemies: []
        }
        this.refs = {

        }
    }
    
    generateWave(){
        let count = Math.random()*3 + 3
        for(let i = 0; i < count; i++){
            let rng = Math.random()*100 
            let newEnemy;
            if(rng > 75){
                newEnemy = new HeavyEnemy()
            }
            else{
                newEnemy = new BasicEnemy()
            }
            newEnemy.setSelfIndex(i+1)
            this.state.enemies.push(newEnemy)
        }
        console.warn("[ENEMY STATE MANAGER] Wave",this.state.enemies)
    }

    getNotification(data){
        console.warn("[ENEMY STATE MANAGER] Notification",data)
        if(data.currentGameStatus == 'play'){
            this.state.enemies = []
            this.generateWave()
            Object.keys(this.observers).forEach(observer => {
                this.notifyObserver(observer)
            })
        }
    }

    useRef(ref){
        this.refs[ref.type] = ref.target
    }

}

class TowersStateManager extends StateManager{
    constructor(){
        super()
        this.state = {
            towers: [
                
            ],
            temp: '',
            towersRef: []
        }
        this.buildStatus = 0;
        this.posRef = {
            x: 0,
            y: 0
        }

        this.stateManagersRef = {

        }
       
    }

    getNotification(data){
        console.warn("Tower State Notification",data)
    
        this.state.towers.forEach(tower => {
            tower.attackToggle()
        })
    }

    useRef(manager){
        this.stateManagersRef[manager.type] = manager.target
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

    callTowerBuild(x,y){
        this.rendererNotify("gameBoard", {
            type: 'image',
            data: [new ExtraGraphic(IMG_ASSETS_LIST.towers.build,x-129/2,y-105/2,129,105)]
        })
        let buildPositions = this.state.towersPositions
        buildPositions.push({
            x,y
        })
        this.state.towersPositions = buildPositions
        this.notifyObserver("levelManager")
    }

    toggleBuildWindow(x,y){
        this.rendererNotify("gameBoard", {
            type: 'image',
            data: [new ExtraGraphic(IMG_ASSETS_LIST.towers.build,x-129/2,y-105/2,129,105)]
        })
        let buildPaths = [
    
        ]
        buildPaths.push({
            x: x-129/2,
            y: y-129/2 + 12
        })
        buildPaths.push({
            x: x-129/2 + 39+40,
            y: y-129/2 + 12
        })
        buildPaths.push({
            x: x-129/2 + 39,
            y: y-129/2 + 12 + 56
        })
        this.observers['levelManager'][0].createExtraHTML(buildPaths)
        this.buildStatus = 1;
    }

    callTowerClick(x,y,i){
        console.warn("ClickPos:",{x,y})
        console.warn(this.state.towersRef)
        let flag = 0;
        for (let i = 0; i < this.state.towersRef.length; i++) {
            if (this.state.towersRef[i].x == x && this.state.towersRef[i].y == y) {
                flag = i+1;
                break;
            }
        }
        console.warn("FLAG",flag);
        if(flag){
            //! Case when tower already built
            console.warn("Clicked on already built tower")
            let tower = this.state.towers[flag-1]
            console.warn("Tower",tower);
            this.stateManagersRef["masterState"].updateState({
                currentGameWindow: "towerUpgrade",
                currentGameStatus: "pause",
                selectedTower: this.state.towers[flag-1]
            })
            flag = 0
        }
        else{
            if(!this.buildStatus){
                this.posRef = {x,y}
                this.toggleBuildWindow(x,y)
            }
            else if(this.buildStatus){
                if(this.posRef.x != x){
                    this.posRef = {x,y}
                    this.toggleBuildWindow(x,y)
                }
                else if(this.posRef.x == x){
                    this.rendererNotify("gameBoard", {
                        type: 'image',
                        data: []
                    })
                    this.observers['levelManager'][0].deleteExtraHTML()
                    this.buildStatus = 0;
                }
            }
            
        }
    }

    buildTower(towerType,x,y){

        let tower;
        if(towerType == 'archer'){
            tower = new ArcherTower(this.posRef.x,this.posRef.y)
        }
        else if(towerType == 'magic'){
            tower = new MagicTower(this.posRef.x,this.posRef.y)
        }
        else if(towerType == 'bombard'){
            tower = new BombardTower(this.posRef.x, this.posRef.y)
        }

        tower.setRef({
            type: "enemyState",
            target: this.stateManagersRef["enemyState"]
        })

        tower.attackToggle()

        this.state.towers.push(tower)

        let processed = []

        this.stateManagersRef["masterState"].updateState({
            coins: this.stateManagersRef["masterState"].getCoins - tower.price
        })

        this.observers['levelManager'][0].deleteExtraHTML()

        this.state.towers.forEach(tower => {
            processed.push(tower.dataForRenderer)
        })

        this.rendererNotify("towers", {
            type: 'image',
            data: processed
        })

        this.buildStatus = 0;
        this.rendererNotify("gameBoard", {
            type: "image",
            data: []
        })
        this.state.towersRef.push(this.posRef)
        this.posRef = {
            x: 0,
            y: 0
        }
     
    }

    reset(){
        this.state.towers = [
                
        ],
        this.state.temp = '',
        this.state.towersRef =  []

        Object.keys(this.observers).forEach(observer => {
            let initialData = []
            this.rendererNotify(observer,{
                type: 'image',
                data: initialData
            })
        })
    }

    get getEnemies(){
        return this.state.enemies
    }

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
            bonusMana: 4,
            maxMana: 150,
            manaLimit: 200,
            coins: GAME_CONFIG.INITIAL_COINS,
            mana: 0,
            volume: 0,
            selectedTower: false
            
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
            coins: GAME_CONFIG.INITIAL_COINS,
            mana: 0,
            volume: 0,
            selectedTower: {}
           
        }

        this.manaInterval;

        Object.keys(this.observers).forEach(observer => {
            this.notifyObserver(observer)
        })

    }

    startManaUpdate(){
        // console.log("Mana:",this.getMana + 1 + this.state.bonusMana*0.5)
        this.manaInterval = setInterval(() => {
            if(this.getMana < this.state.maxMana){
                this.updateState({
                    mana: this.getMana + 1 + this.state.bonusMana*0.5
                })
            }
        }, 1000);
    }

    fetchState(){
        console.warn("Fetching state")
        let data = localStorage.getItem("save")
        if(data){
            console.warn("Loading saved state")
            this.state = data
        }
    }
    
    

    

    updateState(val){
        console.groupCollapsed("playerStateChange |  Modifying state")
        console.log("previous state", this.state)
        // console.log(val)
        console.warn(val)
        let flag = 0;
        Object.keys(val).forEach(key => {
            if(key == 'selectedTower'){
                this.state[key] = val[key]
                flag = 1;
            }
            if(this.state[key] != val[key] || !Object.keys(this.state).includes(key)){
                this.state[key] = val[key]
           
                if(val[key] == 'continue'){
                    this.fetchState()
                }
              

                if(key == 'currentGameStatus' && ["play","resume","continue"].includes(val[key])){
                    
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
                    console.log(observer)
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
