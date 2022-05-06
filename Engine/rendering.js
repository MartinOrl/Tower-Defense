class Renderer{
    constructor(canvasSelectorString){
        this.canvas = document.querySelector(canvasSelectorString)
        this.context = document.querySelector(canvasSelectorString).getContext("2d");
        this.eventManagers = {

        }
    }

    clearCanvas(){
        this.context.clearRect(0,0,this.canvas.width, this.canvas.height)
    }


    setEventManager(manager){
        this.eventManagers[manager.type] = manager.manager
    }
    createImage(imageData){
        const {position, width, height} = imageData
        const {image} = imageData.image
       
        this.context.drawImage(image,position.x, position.y, width,height);
    }

    createText(textData){

        //? Destructuring values that do not rely on existence
        let {text, position, font, fontSize} = textData

        //? Handling gradients
        if(textData.gradientData){
            let gradient = this.context.createLinearGradient(...textData.gradientData.angles)
            textData.gradientData.steps.forEach(step => {
                gradient.addColorStop(...step)
            })
            this.context.fillStyle = gradient
        }
        else{
            this.context.fillStyle = textData.fill
        }

        
        //? Handling shadows
        this.context.shadowBlur = textData.shadow ? textData.shadow.blur : 0
        this.context.shadowOffsetX = textData.shadow ? textData.shadow.offsetX : 0
        this.context.shadowOffsetY = textData.shadow ? textData.shadow.offsetY : 0
        this.context.shadowColor = textData.shadow ? textData.shadow.color : 'rgba(0,0,0,0)'

        //? Setting font and creating text at position x,y
        this.context.font = `${fontSize} ${font}`
        this.context.textAlign = textData.align ? textData.align : "start"
        this.context.fillText(text, position.x, position.y)

    }

    createExtraBoard(boardData){
        const {position, width, height} = boardData

        this.context.beginPath();
        this.context.strokeStyle = '#956134'
        this.context.fillStyle = boardData.fill ? boardData.fill : "#3D291A";
        this.context.roundRect(position.x, position.y, width,height,8).fill();
        this.context.borderThick(position.x, position.y, width, height,8,3).stroke();
        this.context.closePath();
    }

    
}

class EnemiesRenderer extends Renderer{
    constructor(canvasSelectorString){
        super(canvasSelectorString)
        this.data = []
        this.frame = 0;

        this.stateRef;
    }

    useRef(ref){
        this.stateRef = ref
    }

    getNotification(data){
        console.warn("ENEMIES RENDERER NOTIFICATION")
        this.data = data
        this.render()
    }

    advancedCreateImage(imageData){
      
            const {position, width, height} = imageData
            const {image} = imageData.image
            
            this.context.drawImage(image, imageData.spriteWidthMultiplier*width, imageData.spriteHeightMultiplier*height, width, height, position.x,  position.y, width, height);
    }

    animate(){
        this.clearCanvas();
        this.frame += 1;
        let delTargets = []
        this.data.forEach(enemy => {
            enemy.updateSprite();
            enemy.move();
            if(enemy.positionIndex == LEVEL_1_PATHS.basic.data.length-1 ){
                console.warn("EMOTIONAL DAMAGE")
                delTargets.push(enemy.id)
            }
            this.advancedCreateImage(enemy)
        })
        this.data = this.data.filter(enemy => !delTargets.includes(enemy.id))
        
        setTimeout(() => {
            requestAnimationFrame(this.animate.bind(this))
        }, 50)
    }

    render(){
      
        if(this.stateRef?.getGameStatus == 'play'){
            console.warn("Rendering Enemies")
            this.clearCanvas()
            this.data.forEach(enemy => {
                
                this.advancedCreateImage(enemy)
            })
            
            // this.animate()
        }
        
    }

}

class StaticGraphicsRenderer extends Renderer{
    constructor(canvasSelectorString,data){
        super(canvasSelectorString)
        this.canvas = document.querySelector(canvasSelectorString)
        this.context = document.querySelector(canvasSelectorString).getContext("2d");
        this.data = data
        this.rendererType = 'static'
    }


    render(){
        this.clearCanvas()
        Object.keys(this.data).forEach(dataKey => {
           
            if(this.data[dataKey].type == 'board'){
                this.data[dataKey].data.forEach(item => {
                    this.createExtraBoard(item)
                })
            }
            else if(this.data[dataKey].type == 'image'){
                this.data[dataKey].data.forEach(item => {
                    this.createImage(item)
                })
            
            }
            else if(this.data[dataKey].type == 'text'){
                this.data[dataKey].data.forEach(item => {
                    this.createText(item)
                })
            
            }
            
        })
    }
}

class AnimationsRenderer extends Renderer{
    constructor(canvasSelectorString,data){
        super(canvasSelectorString)
        this.rendererType = 'animations'
        this.data = data
        this.animationFrame;
        this.animationStatus = 0;
        this.stateManager;
        this.animationData = {
            step: 0,
            width: 0
        }
     
    }

    linkStateManager(manager){
        this.stateManager = manager
    }


    haltAnimation(){
        this.animationStatus = 0;
    }

    animate(){

        this.data.texts.data[2].text = this.stateManager.getMana

        this.data.bars.data[0].width = 240 * (this.stateManager.getMana / this.stateManager.getMaxMana)


        this.clearCanvas()
        Object.keys(this.data).forEach(dataKey => {
            if(this.data[dataKey].type == 'text'){
                this.data[dataKey].data.forEach(item => {
                    this.createText(item)
                })
            }
            else if(this.data[dataKey].type == 'image'){
                this.data[dataKey].data.forEach(item => {
                    this.createImage(item)
                })
        }
            
        })

        if(this.animationStatus){
            setTimeout(() => {
                this.animationFrame = requestAnimationFrame(this.animate.bind(this))
            }, 1000);
        }
   

    }

    render(){
        this.clearCanvas()
        this.animationStatus = 1;

        Object.keys(this.data).forEach(dataKey => {
           
            if(this.data[dataKey].type == 'text'){
                this.data[dataKey].data.forEach(item => {
                    this.createText(item)
                })
            }
            else if(this.data[dataKey].type == 'image'){
                this.data[dataKey].data.forEach(item => {
                    this.createImage(item)
                })
                    
            
            }
            
        })
        this.animate()
    }

}


class SubRenderer extends Renderer{
    constructor(canvasSelectorString,data=false){

        super(canvasSelectorString)
        this.type;
        this.rendererType = 'sub'
        this.data;

        if(data.data){
            this.data = data.data
            this.type = data.type
        }
        else{
            this.data = data
            this.type = ''
        }
    }
    getNotification(data){
        this.data = data.data
        this.type = data.type
     
        this.render()
    }

    createHTML(){
        
        let target = document.querySelector(".actions")
        target.innerHTML = ''

        let data = [
            ...this.data
        ]

        data.forEach(element => {
 
            let {position, width, height} = element
            let newHTMLElement = document.createElement("span")
            newHTMLElement.style.left = `${position.x}px`;
            newHTMLElement.style.top = `${position.y}px`;
            newHTMLElement.style.width = `${width}px`;
            newHTMLElement.style.height = `${height}px`;
            newHTMLElement.addEventListener("click", () => {
                // this.eventManager.fireEvent(element.clickEventData)
                this.eventManagers.click.fireEvent(element.clickEventData)
            })
            target.appendChild(newHTMLElement)
        })
    }

    render(){
        this.clearCanvas()
        
        if(this.type == 'text'){
            this.data.forEach(text => {
                this.createText(text)
            })
        }
        else if(this.type == 'image'){
            this.data.forEach(image => {
                
                this.createImage(image)
            })
        }
        else if(this.type == 'extra'){
            this.data.forEach(extra => {
                
                this.createImage(extra)
            })
        }
        else if(this.type == 'button'){
            this.data.forEach(button => {
                this.createImage(button)
                
            })
            this.createHTML()
        }
        else if(this.type == 'board'){
            this.data.forEach(board => {
                this.createExtraBoard(board)
            })
        }
    }
}

class RenderingEngine{

    constructor(){
        this.eventManagers = {
            
        }
        this.dataState = {
            currentGameWindow: false,
            currentGameStatus: false,
            currentGameLevel: 0,
            selectedTower: false
        }
        this.updates = {
            currentGameWindow: false,
            currentGameStatus: false,
            currentGameLevel: false,
            selectedTower: false,
          
        }

        this.mainLoopRef;

        this.renderers = {
            level: {
                gameBoard: new SubRenderer("#levelBoard"),
                enemies: new EnemiesRenderer("#enemies"),
                towers: new SubRenderer("#towers"),
                dataBoard: new SubRenderer("#levelDataBoard", LEVEL_DATA.dataBoard),
                dataStationary: new StaticGraphicsRenderer("#levelDataStationary",LEVEL_DATA.dataStationary ),
                dataAnimations: new AnimationsRenderer("#levelDataAnimations",LEVEL_DATA.dataAnimations),
                controls: new SubRenderer("#levelControls",LEVEL_DATA.controls)
            },
            menu: {
                board: new SubRenderer("#masterControlBoard",MENU_DATA.main.board),
                extraBoard: new SubRenderer("#masterStationaryGraphics",MENU_DATA.main.extraBoard),
                extraGraphics: new SubRenderer("#masterExtraGraphics",MENU_DATA.main.extraGraphics),
                extraText: new SubRenderer("#masterExtraText",MENU_DATA.main.extraText),
                controls: new SubRenderer("#masterControls", MENU_DATA.main.controls)
            },
            upgrade: {
                board: new SubRenderer("#masterControlBoard", TOWER_UPGRADE.board),
                dataStationary: new StaticGraphicsRenderer("#masterStationaryGraphics", TOWER_UPGRADE.dataStationary),
                extraGraphics: new SubRenderer("#masterExtraGraphics",TOWER_UPGRADE.extraGraphics),
                extraText: new SubRenderer("#masterExtraText",TOWER_UPGRADE.extraText),
                controls: new SubRenderer("#masterControls", TOWER_UPGRADE.controls)
            }
            
        }
    }

    linkMainLoop(loop){
        this.mainLoopRef = loop;
    }

    registerEventManager(eventManager){
        this.eventManagers[eventManager.type] = eventManager.manager
    }

    upgradeRefresh(){
        this.cleanBlock("upgrade")
        Object.values(this.renderers.upgrade).forEach(renderer => {
            renderer.render()
        })
    }

    boot(){
        Object.keys(this.renderers.menu).forEach(renderer =>{
            Object.keys(this.eventManagers).forEach(manager => {
                this.renderers.menu[renderer].setEventManager({
                    type: manager,
                    manager: this.eventManagers[manager]
                })
            })
            // this.renderers.menu[renderer].render()
        })
        
        Object.values(this.renderers.level).forEach(renderer => {
            Object.keys(this.eventManagers).forEach(manager => {
                renderer.setEventManager({
                    type: manager,
                    manager: this.eventManagers[manager]
                })
            })
        })

        Object.values(this.renderers.upgrade).forEach(renderer => {
            Object.keys(this.eventManagers).forEach(manager => {
                renderer.setEventManager({
                    type: manager,
                    manager: this.eventManagers[manager]
                })
            })
        })
       
        

    }

    renderLevel(){
        Object.values(this.renderLevel.level).forEach(renderer => {
            renderer.render()
        })
    }

    renderMenu(){
        Object.values(this.renderers.menu).forEach(renderer => {
            renderer.render()
        })
    }

    cleanBlock(targetSection){
        Object.keys(this.renderers[targetSection]).forEach(renderer => {
            this.renderers[targetSection][renderer].clearCanvas()
        })
    }

    handleUpdate(){
        console.warn(this.updates)
        Object.keys(this.updates).forEach(update => {
            if(this.updates[update]){

                if(this.updates[update] != this.dataState[update]){
                    this.dataState[update] = this.updates[update]
                    if(update == 'currentGameStatus'){
                        if(this.updates[update] == 'play' || this.updates[update] == 'continue'){


                            document.querySelector(".shadow").classList.remove("shadow-show")
                            this.dataState.currentGameWindow = false
                            this.cleanBlock("menu")
                            this.cleanBlock("upgrade")
                            this.renderers.level.enemies.render()

                        }
                        else if(this.updates[update] == 'resume'){
                            document.querySelector(".shadow").classList.remove("shadow-show")
                            this.dataState.currentGameWindow = false
                            this.cleanBlock("menu")
                            this.cleanBlock("upgrade")
                            this.selectedTower = false
                        }
                        else if(this.updates[update] == 'pause'){
                            document.querySelector(".shadow").classList.add("shadow-show")
                            if(this.updates.currentGameWindow == 'towerUpgrade'){
                                
                            }
                            else{
                                Object.keys(this.renderers.menu).forEach(renderer => {
                                    this.renderers.menu[renderer].getNotification({
                                        type: MENU_DATA[this.updates.currentGameWindow][renderer].type,
                                        data: MENU_DATA[this.updates.currentGameWindow][renderer].data
                                    })
                                })
                            }
                            
                            
                        }
                        else if(this.updates[update] == 'main'){
                            this.cleanBlock("level")
                            this.cleanBlock("menu")
                            this.dataState.currentGameWindow = 'main'
                            Object.keys(this.renderers.menu).forEach(renderer => {
                                this.renderers.menu[renderer].getNotification({
                                    type: MENU_DATA[this.updates.currentGameWindow][renderer].type,
                                    data: MENU_DATA[this.updates.currentGameWindow][renderer].data
                                })
                            })
                       
                        }
                    }
                    else if(update == 'currentGameWindow'){
                        if(this.updates[update] == 'towerUpgrade'){

                            let tower = this.updates.selectedTower

                            this.renderers.upgrade["dataStationary"].data.misc.data = []
                            this.renderers.upgrade["dataStationary"].data.misc.data.push(new ExtraGraphic(tower.image,366,211,187,227))

                            this.renderers.upgrade["dataStationary"].data.text.data[0].text = tower.type
                            this.renderers.upgrade["extraText"].data[5] = new BasicText(`${tower.level}/3`,"TitanOne",24,462,463)

                            Object.values(this.renderers.upgrade).forEach(renderer => {
                                renderer.render()
                            })
                        }
                        else{
                            Object.keys(this.renderers.menu).forEach(renderer => {
                                this.renderers.menu[renderer].getNotification({
                                    type: MENU_DATA[this.updates[update]][renderer].type,
                                    data: MENU_DATA[this.updates[update]][renderer].data
                                })
                              
                            })
                        }
                        
                    }
                    
                }
                if(update == 'selectedTower' && this.dataState.currentGameWindow == 'towerUpgrade'){
                    console.log(this.dataState.selectedTower)
                    this.cleanBlock("upgrade")
                    this.renderers.upgrade["dataStationary"].data.misc.data[0] = new ExtraGraphic(this.dataState.selectedTower.image,366,211,187,227)
                    this.renderers.upgrade["extraText"].data[5] = new BasicText(`${this.dataState.selectedTower.level}/3`,"TitanOne",24,462,463)

                    Object.values(this.renderers.upgrade).forEach(renderer => {
                        renderer.render()
                    })
                }
           
            }
        })

        this.updates = {
            currentGameWindow: false,
            currentGameStatus: false,
            currentGameLevel: false,
            selectedTower: false
        }
    }

    getNotification(data){
        console.warn(data)
        Object.keys(data).forEach(updateKey => {
            if(data[updateKey] != this.dataState[updateKey]){
                this.updates[updateKey] = data[updateKey]
            }
            if(updateKey == 'selectedTower'){
                this.updates[updateKey] = data[updateKey]
            }
        })
        console.log("UPDATES",this.updates)
        this.handleUpdate()
    }

}
