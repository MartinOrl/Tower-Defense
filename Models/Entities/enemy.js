class Enemy{
    constructor(){
        this.image = ''
        this.type = 'basic'
        this.id = Math.random()*4095 + 1
        this.position = {
            x: 0,
            y: 0
        }
        this.spriteWidthMultiplier = 0;
        this.spriteHeightMultiplier = 0
        this.position = {
            x: 0,
            y: 0
        }
        this.moveVector = false
        this.steps = {
            x: 0,
            y: 0
        }
        this.selfIndex = 0;
        this.positionIndex = this.selfIndex;

        this.stats = {
            health: 100,
            maxHealth: 100
        }

        this.stateRef = {

        };
        this.gameLevel = 1;
        this.rotation = 0;

        this.healthbar = new ExtraGraphic(IMG_ASSETS_LIST.bars.healthBar, this.position.x,this.position.y,48,8)
       
        
    }

    getHit(damage){
  
        this.stats.health -= damage
        this.updateHealthbar()
    }

    updateHealthbar(){
        this.healthbar.position = {...this.position}
        this.healthbar.position.x = this.healthbar.position.x + this.width/2 - 24
    
        this.healthbar.width = (this.stats.health / this.stats.maxHealth) * 48
    }

    setSelfIndex(index){
        this.selfIndex = index;
        this.positionIndex = 20-index;
        this.position = {
            x: LEVEL_PATHS[`level_${this.gameLevel}`].basic.data[this.positionIndex][0],
            y: LEVEL_PATHS[`level_${this.gameLevel}`].basic.data[this.positionIndex][1] - this.height*0.8
        }
        console.log("Enemy position",this.position)
      
        this.updateHealthbar()
    }

   
   

    move(){
        
        if(this.positionIndex < LEVEL_PATHS[`level_${this.gameLevel}`].basic.data.length-1){
            if(this.moveVector){
              
                this.image = this.moveVector[0] < 0 ? IMG_ASSETS_LIST.enemies[this.type][`${this.type}_1_sprite_rev`] : IMG_ASSETS_LIST.enemies[this.type][`${this.type}_1_sprite`]
                this.rotation = this.moveVector[0] < 0 ? -1 : 1
                this.position.x += this.steps.x
                this.position.y += this.steps.y

                this.moveVector[0] -= this.steps.x
                this.moveVector[1] -= this.steps.y

                this.updateHealthbar()

                if(Math.abs(this.moveVector[0]) <= 1 && Math.abs(this.moveVector[1]) <= 1){
                    
                    this.moveVector = false
                }
            }
            else{
                this.positionIndex += 1;
                let {x,y} = this.position
                let newX = LEVEL_PATHS[`level_${this.gameLevel}`].basic.data[this.positionIndex][0]
                let newY = LEVEL_PATHS[`level_${this.gameLevel}`].basic.data[this.positionIndex][1] - this.height*0.8
                let vector = [newX - x, newY - y]
                this.moveVector = vector
      
                this.steps = {
                    x: vector[0]/(30/this.speed),
                    y: vector[1]/(30/this.speed)
                }
           
            }
        }
        else{
            this.stateRef.raiseGateEvent(this.id,this.gateDamage)
        }
        
    }
    updateSprite(){
        this.spriteWidthMultiplier += 1
        if(this.spriteWidthMultiplier == 10){
            this.spriteWidthMultiplier = 0;
            this.spriteHeightMultiplier += 1;
            if(this.spriteHeightMultiplier == 2){
                this.spriteWidthMultiplier = 0;
                this.spriteHeightMultiplier = 0;
            }
        }
    }

    get getHealth(){
        return this.stats.health
    }
}

class Boss extends Enemy{
    constructor(level){
        super()
        this.gameLevel = level
        this.image = IMG_ASSETS_LIST.enemies.boss.boss_1
        this.stats.health = 800
        this.stats.maxHealth = 800
        this.speed = 0.8
        this.position = {
            x: LEVEL_PATHS.level_1.boss.data[0][0],
            y: LEVEL_PATHS.level_1.boss.data[0][1],

        }
        this.width = 165
        this.height = 144
        this.gateDamage = 20

    }
    move(){
        if(this.positionIndex < LEVEL_PATHS[`level_${this.gameLevel}`].boss.data.length-1){
            if(this.moveVector){
                
                this.image = this.moveVector[0] < 0 ? IMG_ASSETS_LIST.enemies.boss.boss_1_rev : IMG_ASSETS_LIST.enemies.boss.boss_1
                this.rotation = this.moveVector[0] < 0 ? -1 : 1
                this.position.x += this.steps.x
                this.position.y += this.steps.y

                this.moveVector[0] -= this.steps.x
                this.moveVector[1] -= this.steps.y

                this.updateHealthbar()

                if(Math.abs(this.moveVector[0]) <= 2 && Math.abs(this.moveVector[1]) <= 2){
                    
                    this.moveVector = false
                }
            }
            else{
                this.positionIndex += 1;
                let {x,y} = this.position
                let newX = LEVEL_PATHS[`level_${this.gameLevel}`].boss.data[this.positionIndex][0]
                let newY = LEVEL_PATHS[`level_${this.gameLevel}`].boss.data[this.positionIndex][1] - this.height*0.8
                let vector = [newX - x, newY - y]
                this.moveVector = vector
      
                this.steps = {
                    x: vector[0]/(30),
                    y: vector[1]/(30)
                }
            }
        }
        else{
            this.stateRef.raiseGateEvent(this.id, this.gateDamage)
        }
        
    }
}

class HeavyEnemy extends Enemy{
    constructor(){
        super()
        this.image = IMG_ASSETS_LIST.enemies.heavy.heavy_1_sprite
        this.width = 64
        this.height = 87
        this.speed = 3
        this.coinsValue = 25
        this.gateDamage = 3
        this.type = 'heavy'
    }

    
}

class BasicEnemy extends Enemy{
    constructor(){
        super()
        this.image = IMG_ASSETS_LIST.enemies.basic.basic_1_sprite
        this.width = 72
        this.height = 72
        this.speed = 3
        this.coinsValue = 10
        this.type = 'basic'
        this.gateDamage = 1
    }
}