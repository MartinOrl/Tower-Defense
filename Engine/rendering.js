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
    }
}

class AnimationsRenderer extends Renderer{
    constructor(canvasSelectorString,data){
        super(canvasSelectorString)
        this.rendererType = 'animations'
        this.data = data
        this.animationFrame;
        this.animationStatus = 0;
        this.mana = 0;
        this.stateManager;
        this.animationData = {
            step: 0,
            width: 0
        }
        console.log(this.data)
    }

    linkStateManager(manager){
        this.stateManager = manager
    }


    haltAnimation(){
        this.animationStatus = 0;
    }

    animate(){

        let manaDiff = this.stateManager.getMana - this.mana;
        this.mana = this.stateManager.getMana

        let manaPerSecond = 1 + this.stateManager.getBonusMana*0.5

        let timeToMax = this.stateManager.getMaxMana / manaPerSecond

        if(manaDiff > 10){

            this.animationData.step = manaPerSecond / 16.667;
            this.animationData.width = 240 * (this.stateManager.getMaxMana / this.stateManager.getMana)
        }
        else{
     
            this.animationData.step = (240 / timeToMax) / 20;
           
            this.animationData.width += this.animationData.step;
            if(this.animationData.width > 240){
                this.animationData.width = 240
            }
            
        }
        console.log(this.animationData)

        this.data.texts.data[2].text = this.mana

        this.data.bars.data[0].width = this.animationData.width


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
            }, 50);
        }
   

    }

    render(){
        this.clearCanvas()
        this.animationStatus = 1;
        
        this.animationData = {
            step: 0,
            width: 0
        }
        this.mana = 0;
        this.data.texts.data[2].text = 0
        this.data.bars.data[0].width = 0

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
        console.log("Creating html")
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
            currentGameLevel: 0
        }
        this.updates = {
            currentGameWindow: false,
            currentGameStatus: false,
            currentGameLevel: false,
            mana: 0
        }

        this.mainLoopRef;

        this.renderers = {
            level: {
                gameBoard: new SubRenderer("#levelBoard"),
                enemies: new SubRenderer("#enemies"),
                towers: new SubRenderer("#towers"),
                dataBoard: new SubRenderer("#levelDataBoard", LEVEL_DATA.dataBoard),
                dataStationary: new StaticGraphicsRenderer("#levelDataStationary",LEVEL_DATA.dataStationary ),
                dataAnimations: new AnimationsRenderer("#levelDataAnimations",LEVEL_DATA.dataAnimations),
                controls: new SubRenderer("#levelControls",LEVEL_DATA.controls)
            },
            menu: {
                board: new SubRenderer("#masterControlBoard",MENU_DATA.main.board),
                extraGraphics: new SubRenderer("#masterExtraGraphics",MENU_DATA.main.extraGraphics),
                extraText: new SubRenderer("#masterExtraText",MENU_DATA.main.extraText),
                controls: new SubRenderer("#masterControls", MENU_DATA.main.controls)
            }
        }
    }

    linkMainLoop(loop){
        this.mainLoopRef = loop;
    }

    registerEventManager(eventManager){
        this.eventManagers[eventManager.type] = eventManager.manager
    }

    boot(){
        Object.keys(this.renderers.menu).forEach(renderer =>{
            Object.keys(this.eventManagers).forEach(manager => {
                this.renderers.menu[renderer].setEventManager({
                    type: manager,
                    manager: this.eventManagers[manager]
                })
            })
            this.renderers.menu[renderer].render()
        })
        
        Object.values(this.renderers.level).forEach(renderer => {
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
        Object.keys(this.updates).forEach(update => {
            if(this.updates[update]){
                if(this.updates[update] != this.dataState[update]){
                    this.dataState[update] = this.updates[update]
                    if(update == 'currentGameStatus'){
                        if(this.updates[update] == 'play'){


                            document.querySelector(".shadow").classList.remove("shadow-show")
                            this.dataState.currentGameWindow = false
                            this.cleanBlock("menu")

                        }
                        else if(this.updates[update] == 'resume'){
                            document.querySelector(".shadow").classList.remove("shadow-show")
                            this.dataState.currentGameWindow = false
                            this.cleanBlock("menu")
                        }
                        else if(this.updates[update] == 'pause'){
                            document.querySelector(".shadow").classList.add("shadow-show")
                            Object.keys(this.renderers.menu).forEach(renderer => {
                                this.renderers.menu[renderer].getNotification({
                                    type: MENU_DATA[this.updates.currentGameWindow][renderer].type,
                                    data: MENU_DATA[this.updates.currentGameWindow][renderer].data
                                })
                            })
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

                        Object.keys(this.renderers.menu).forEach(renderer => {
                            this.renderers.menu[renderer].getNotification({
                                type: MENU_DATA[this.updates[update]][renderer].type,
                                data: MENU_DATA[this.updates[update]][renderer].data
                            })
                          
                        })
                    }
                    
                }
           
            }
        })

        this.updates = {
            currentGameWindow: false,
            currentGameStatus: false,
            currentGameLevel: false
        }
    }

    getNotification(data){
        
        Object.keys(data).forEach(updateKey => {
            if(data[updateKey] != this.dataState[updateKey]){
                this.updates[updateKey] = data[updateKey]
            }
        })
        console.log("UPDATES",this.updates)
        this.handleUpdate()
    }

}
