class Enemy{
    constructor(){
        this.image = ''

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

        
    }
    setSelfIndex(index){
        // this.selfIndex = index;
        // this.positionIndex = 25-index;
        // this.position = {
        //     x: LEVEL_1_PATHS.basic.data[this.positionIndex][0],
        //     y: LEVEL_1_PATHS.basic.data[this.positionIndex][1] - this.height*0.8
        // }
        this.position = {
            x: 512,
            y: 512
        }
    }


    move(){
        
        if(this.positionIndex < LEVEL_1_PATHS.basic.data.length-1){
            if(this.moveVector){
                
                this.position.x += this.steps.x
                this.position.y += this.steps.y

                this.moveVector[0] -= this.steps.x
                this.moveVector[1] -= this.steps.y

                if(this.moveVector[0] <= 0){
                    this.moveVector = false
                }
            }
            else{
                this.positionIndex += 1;
                let {x,y} = this.position
                let newX = LEVEL_1_PATHS.basic.data[this.positionIndex][0]
                let newY = LEVEL_1_PATHS.basic.data[this.positionIndex][1] - this.height*0.8
                let vector = [newX - x, newY - y]
                this.moveVector = vector
      
                this.steps = {
                    x: vector[0]/10,
                    y: vector[1]/10
                }
            }
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
}

class HeavyEnemy extends Enemy{
    constructor(){
        super()
        this.image = IMG_ASSETS_LIST.enemies.heavy.heavy_1_sprite
        this.width = 64
        this.height = 87
    }

    
}

class BasicEnemy extends Enemy{
    constructor(){
        super()
        this.image = IMG_ASSETS_LIST.enemies.basic.basic_1_sprite
        this.width = 72
        this.height = 72
        
    }
}