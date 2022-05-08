class Tower{
    constructor(){
        this.type;
        this.image;
        this.level = 1;
        this.damage = 20;
        this.attackSpeed = 1
        this.range = 350
        this.audioManager
        
        
        this.positionRef = {

        }
        this.enemyTarget = false

        this.refs = {

        }

        this.attack = false

        this.attackInterval = false
        this.attackTimeout = false

        this.upgradeCosts = [100,150]
        
    }

    setRef(ref){
        this.refs[ref.type] = ref.target
    }

    seekEnemy(){
 
        let enemies = this.refs["enemyState"].getEnemies
        let vectorRef = [9999,-1]
        for(let i = 0; i < enemies.length; i++){
            let enemyTarget = enemies[i]
            let vector = computeVectorLength(this.position.x, this.position.y, enemyTarget.position.x, enemyTarget.position.y)
            if(vector < vectorRef[0]){
                vectorRef = [vector,i]
            }
        }
    
        if(vectorRef[1] > -1 && vectorRef[0] <= this.range){
            console.warn("Setting target", vectorRef)
            this.enemyTarget = enemies[vectorRef[1]]
            this.attackInterval = setInterval(() => {
                if(this.enemyTarget.getHealth <= 0){
                    
                    this.enemyTarget = false;
                    this.audioManager.stop()
                    clearInterval(this.attackInterval)
                    this.seekEnemy()
                    return
                }
                console.warn("Attacking",this.enemyTarget)
                if(this.enemyTarget){
                    this.audioManager.play()
                    this.enemyTarget.getHit(this.damage)
                    if(this.enemyTarget.getHealth <= 0 ){
                        this.refs["enemyState"].enemyKill(this.enemyTarget.id)
                        this.refs["masterState"].updateState({
                            coins: this.refs["masterState"].getCoins + this.enemyTarget.coinsValue
                        })
                        this.audioManager.stop()
                        this.enemyTarget = false;
                        clearInterval(this.attackInterval)
                        this.seekEnemy()
                        return
        
                    }
                    let vector = computeVectorLength(this.position.x, this.position.y, this.enemyTarget.position.x, this.enemyTarget.position.y)
                    if(vector > this.range){
                        this.enemyTarget = false;
                        this.audioManager.stop()
                        clearInterval(this.attackInterval)
                        this.seekEnemy()
                    }
                }
                else{
                    this.audioManager.stop()
                }
                
            }, 1000/this.attackSpeed)
        }
        else{
            
            this.attackTimeout = setTimeout(() => {
                this.seekEnemy()
            },500)
        }
    }

    destroy(){
        this.audioManager.stop()
        clearInterval(this.attackInterval)
        clearTimeout(this.attackTimeout)
    }

    attackToggle(){
        console.warn("Tower Status Toggled")
        this.attack = !this.attack
        if(this.attack){
            this.seekEnemy()
        }
        else{
            console.warn("Stopping attack")
        }
    }

    toggleUpgradeButton(){
        let target = this.refs["masterState"].observers["renderEngine"][0].renderers.upgrade.controls
        if(this.level < 3){
            let template = {
                clickEventData: {
                  action: ActionTypes.TOWER_UPGRADE,
                },
        
                position: {
                  x: 382,
                  y: 502,
                },
                width: 155,
                height: 62,
                image: IMG_ASSETS_LIST.buttons.upgrade,
              }
            let match = false;
            target.data.forEach(button => {
                if(button.clickEventData.action == ActionTypes.TOWER_UPGRADE){
                    match = true
                }
            })
            console.warn("Button match",match)
            if(!match){
                target.data.push(template)
            }
        }
        else{
            console.warn("Deleting upgrade button")
            target.data = TOWER_UPGRADE.controls.data.filter(button => button.clickEventData.action != ActionTypes.TOWER_UPGRADE)
        }
    }

    
}

class ArcherTower extends Tower{
    constructor(x,y){
        super()
        this.type = 'Archer Tower'
        this.image = IMG_ASSETS_LIST.towers.archer.level_1
        this.audioManager = new AudioManager("./Assets/Audio/shoot_archer.wav")
        this.audioManager.volume = 1
        this.audioManager.loop = false
        console.warn(this.audioManager)
        this.price = 50

        this.range = 250
        this.damage = 10
        this.attackSpeed = 1.2

        this.dimensions = {
            width: 104,
            height: 113.75
        }
        this.position = {
            x: x-this.dimensions.width/2 + 4,
            y: y-this.dimensions.height/2 - 28
        };
        this.dataForRenderer = {
            position: this.position,
            width: this.dimensions.width,
            height: this.dimensions.height,
            image: this.image,
            range: this.range,
            fill: 'rgba(0,255,0,.3)'
        }
    }

    upgrade(){
        if(this.upgradeCosts[this.level-1] < this.refs["masterState"].getCoins){
            if(this.level < 3){
                this.level += 1;
                this.damage += 10
                this.range += 15
        
                this.image = IMG_ASSETS_LIST.towers.archer[`level_${this.level}`]
                this.dataForRenderer.image = this.image
                this.refs["masterState"].updateState({
                    coins: this.refs["masterState"].getCoins - this.upgradeCosts[this.level-2]
                })
            }
            this.toggleUpgradeButton()
        }
        
    }
}

class MagicTower extends Tower{
    constructor(x,y){
        super()
        this.type = 'Magic Tower'
        this.image = IMG_ASSETS_LIST.towers.mage.level_1
        this.audioManager = new AudioManager("./Assets/Audio/shoot_mage.wav")
        this.audioManager.volume = 1
        this.audioManager.loop = false
        this.price = 100
        this.dimensions = {
            width: 104,
            height: 113.75
        }

        this.range = 180
        this.damage = 30
        this.attackSpeed = 1
        this.position = {
            x: x-this.dimensions.width/2 + 4,
            y: y-this.dimensions.height/2 - 28
        };
        this.dataForRenderer = {
            position: this.position,
            width: this.dimensions.width,
            height: this.dimensions.height,
            image: this.image,
            range: this.range,
            fill: 'rgba(0,255,255,.3)'
        }
    }
    upgrade(){
        if(this.upgradeCosts[this.level-1] < this.refs["masterState"].getCoins){
            if(this.level < 3){
                this.level += 1;
                this.image = IMG_ASSETS_LIST.towers.mage[`level_${this.level}`]
                this.dataForRenderer.image = this.image
                this.refs["masterState"].updateState({
                    coins: this.refs["masterState"].getCoins - this.upgradeCosts[this.level-2]
                })
            }
        }
    }
}

class BombardTower extends Tower{
    constructor(x,y){
        super()
        this.type = 'Bombard Tower'
        this.image = IMG_ASSETS_LIST.towers.bombard.level_1
        this.audioManager = new AudioManager("./Assets/Audio/shoot_bombard.wav")
        this.audioManager.volume = 1
        this.audioManager.loop = false
        this.price = 150
        this.dimensions = {
            width: 104,
            height: 113.75
        }

        this.range = 450
        this.damage = 60
        this.attackSpeed = 0.5


        this.position = {
            x: x-this.dimensions.width/2 + 4,
            y: y-this.dimensions.height/2 - 28
        };
        this.dataForRenderer = {
            position: this.position,
            width: this.dimensions.width,
            height: this.dimensions.height,
            image: this.image,
            range: this.range,
            fill: 'rgba(255,0,0,.3)'
        }
    }
    upgrade(){
        if(this.upgradeCosts[this.level-1] < this.refs["masterState"].getCoins){
            if(this.level < 3){
                console.warn()
                this.level += 1;
                this.image = IMG_ASSETS_LIST.towers.bombard[`level_${this.level}`]
                this.dataForRenderer.image = this.image
                this.refs["masterState"].updateState({
                    coins: this.refs["masterState"].getCoins - this.upgradeCosts[this.level-2]
                })
            }
        }
    }
}