
class MainGameLoop{
    constructor(){

        this.refs = {

        }

        this.renderers = {

        }
        this.animationRenderer = {

        }

        this.status = 0; //0 - paused   1 - running   2 - main
    }

    registerRef(ref){
        this.refs[ref.type] = ref.target
    }

    getNotification(data){
        if(data.currentGameStatus == 'pause' ){
            this.status = 0;
            this.stop();
        }
        else if(data.currentGameStatus == 'main'){
            this.status = 2;
            this.clear();
        }
        else{
            this.status = 1;
            this.initialize()
        }
        
    }

    linkRenderers(renderers){
        Object.keys(renderers).forEach(key =>{
            if(renderers[key].rendererType == 'animations'){
                this.animationRenderer[key] = renderers[key]
            }
            else{
                this.renderers[key] = renderers[key]
            }
        })
    }

    linkAnimationRenderer(renderer){
        this.animationRenderer[renderer.type] = renderer.target
    }

    initializeAnimationLoop(target){
        this.renderers[target].initialize()
    }

    clear(){
        Object.values(this.renderers).forEach(renderer => {
            renderer.clearCanvas()
        })
        Object.values(this.animationRenderer).forEach(renderer => {
            renderer.clearCanvas()
        })
        this.refs['levelManager'].towersManager.reset()
        this.refs['levelManager'].resetPositions()
    }

    stop(){
        Object.values(this.animationRenderer).forEach(renderer => {
            renderer.haltAnimation();
        })
    }

    initialize(){
        this.refs['stateManager'].updateState({
            mana: 0,
            coins: 0
        })
        Object.values(this.renderers).forEach(renderer => {
            renderer.render()
        })
        Object.values(this.animationRenderer).forEach(renderer => {
            renderer.render()
        })
        this.refs['levelManager'].createHTML()
        
    }





}


class Engine{

    //********************************************************* */

    //? Main engine of the game, all data passes through it

    //********************************************************* */
    constructor(){

        //? State Managers
        this.stateManager = new PlayerStateManager()
        this.towerStateManager = new TowersStateManager()

        //? Audio Managers
        this.audioManager = new AudioManager()

        //? Event Managers
        this.clickEventHandler = new ClickEventManager()
        this.levelManager = new LevelManager()
        

        //? Game Loops
        this.mainLoop = new MainGameLoop();

        //? Rendering Engine
        this.renderingEngine = new RenderingEngine()
        this.renderingEngine.registerEventManager({
            type: "click",
            manager: this.clickEventHandler
        })

        //? Linking
        this.renderingEngine.renderers.level.dataAnimations.linkStateManager(this.stateManager)
        this.renderingEngine.linkMainLoop(this.mainLoop)
        this.clickEventHandler.linkStateManager(this.stateManager)
        this.levelManager.linkTowerManager(this.towerStateManager)
        this.mainLoop.linkRenderers(this.renderingEngine.renderers.level)
        this.mainLoop.registerRef({
            type: 'stateManager',
            target: this.stateManager
        })
        this.mainLoop.registerRef({
            type: 'levelManager',
            target: this.levelManager
        })


        //? OBserver Creation
        this.stateManager.createObserver("audio", this.audioManager, ["volume"])
        this.stateManager.createObserver("renderEngine", this.renderingEngine, ["currentGameWindow","currentGameStatus","currentGameLevel"])
        this.stateManager.createObserver("gameLoop", this.mainLoop, ["currentGameStatus"])
        this.stateManager.createObserver("level", this.levelManager, ["currentGameLevel"])
        this.towerStateManager.createObserver("towers",this.renderingEngine.renderers.level.towers, ["towers"])
        // this.stateManager.bootNotification()

    }

    boot(){
        let image = IMG_ASSETS_LIST.levels[`level_${this.stateManager.getGameLevel}`].image.src
        
  
        document.querySelector(".level").style.background = `url(${image})`

        this.renderingEngine.boot()
    }


    callUpdate(){


    }
}