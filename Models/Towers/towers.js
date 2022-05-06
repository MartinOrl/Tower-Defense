class Tower{
    constructor(){
        this.type;
        this.image;
        this.level = 1;
        this.positionRef = {

        }
        this.enemyTarget = false

        this.refs = {

        }

        this.attack = false
        
    }

    setRef(ref){
        this.refs[ref.type] = ref.target
    }

    attackToggle(){
        console.warn("Tower Status Toggled")
        this.attack = !this.attack
        if(this.attack){
            console.warn("Attacking")
            if(this.enemyTarget){

            }
            else{
                let enemies = this.refs["enemyState"].getEnemies()
                enemies.for
            }
        }
        else{
            console.warn("Stopping attack")
        }
    }

    
}

class ArcherTower extends Tower{
    constructor(x,y){
        super()
        this.type = 'Archer Tower'
        this.image = IMG_ASSETS_LIST.towers.archer.level_1
        this.price = 50


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
            image: this.image
        }
    }

    upgrade(){
        if(this.level < 3){
            this.level += 1;
            this.image = IMG_ASSETS_LIST.towers.archer[`level_${this.level}`]
            this.dataForRenderer.image = this.image
        }
    }
}

class MagicTower extends Tower{
    constructor(x,y){
        super()
        this.type = 'Magic Tower'
        this.image = IMG_ASSETS_LIST.towers.mage.level_1
        this.price = 100
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
            image: this.image
        }
    }
    upgrade(){
        if(this.level < 3){
            this.level += 1;
            this.image = IMG_ASSETS_LIST.towers.mage[`level_${this.level}`]
            this.dataForRenderer.image = this.image
        }
    }
}

class BombardTower extends Tower{
    constructor(x,y){
        super()
        this.type = 'Bombard Tower'
        this.image = IMG_ASSETS_LIST.towers.bombard.level_1
        this.price = 150
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
            image: this.image
        }
    }
    upgrade(){
        if(this.level < 3){
            this.level += 1;
            this.image = IMG_ASSETS_LIST.towers.bombard[`level_${this.level}`]
            this.dataForRenderer.image = this.image
        }
    }
}