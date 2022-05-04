class Tower{
    constructor(){
        this.type;
        this.image;
    }
}

class ArcherTower extends Tower{
    constructor(x,y){
        super()
        this.type = 'Archer'
        this.image = IMG_ASSETS_LIST.towers.archer.level_1
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
}