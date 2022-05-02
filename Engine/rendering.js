class SubRenderer{
    constructor(canvasSelectorString,data=false){
        this.canvas = document.querySelector(canvasSelectorString)
        this.context = document.querySelector(canvasSelectorString).getContext("2d");
        this.type = data ? data.type : ''
        this.data = data ? data.data : []

    }


    setEventManager(manager){
        this.eventManager = manager;
    }

    getNotification(){

    }


    clearCanvas(){
        this.context.clearRect(0,0,this.canvas.width, this.canvas.height)
    }

    createImage(imageData){
        const {image, position, width, height} = imageData
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
        const {position, context, width, height} = boardData

        context.beginPath();
        context.strokeStyle = '#956134'
        context.fillStyle = data.fill ? data.fill : "#3D291A";
        context.roundRect(position.x, position.y, width,height,8).fill();
        context.borderThick(position.x, position.y, width, height,8,3).stroke();
        context.closePath();
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
    }

}

class RenderingEngine{

    constructor(){
        
        this.dataState = {
            currentGameWindow: 'main',
            currentGameStatus: 'paused',
            currentGameLevel: 1
        }
        this.updates = {
            currentGameWindow: false,
            currentGameStatus: false,
            currentGameLevel: false
        }

        this.renderers = {
            level: {
                gameBoard: new SubRenderer("#levelBoard"),
                enemies: new SubRenderer("#enemies"),
                towers: new SubRenderer("#towers"),
                dataBoard: new SubRenderer("#levelDataBoard"),
                dataStationary: new SubRenderer("#levelDataStationary"),
                dataAnimations: new SubRenderer("#levelDataAnimations"),
                controls: new SubRenderer("#levelControls")
            },
            menu: {
                board: new SubRenderer("#masterControlBoard",MENU_DATA.main.board),
                extraGraphics: new SubRenderer("#masterExtraGraphics",MENU_DATA.main.ropes),
                extraText: new SubRenderer("#masterExtraText",MENU_DATA.main.text),
                controls: new SubRenderer("#masterControls", MENU_DATA.main.buttons)
            }
        }
    }

    boot(){
        Object.keys(this.renderers.menu).forEach(renderer =>{
            this.renderers.menu[renderer].render()
        })
    }

    cleanBlock(targetSection){
        Object.keys(this.renderers[targetSection]).forEach(renderer => {
            renderer.clearCanvas()
        })
    }

    handleUpdate(){
        Object.keys(this.updates).forEach(update => {
            if(update){
                if(update == 'currentGameStatus'){
                    if(this.updates[update] == 'play'){
                        this.cleanBlock("menu")
                    }
                    else{
                        this.cleanBlock("level")
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
                this.dataState[updateKey] = data[updateKey]
            }
        })
    }

}
