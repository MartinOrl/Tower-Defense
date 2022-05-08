class EnemyProcessing{
    constructor(){
        this.enemyCount = 5;
        this.enemiesList = []

        this.refs = {

        }

        this.observers = {

        }

    }

    start(){
        console.warn("aaaa")
        // this.generateWave()
        // this.generateWave()
        // setInterval(() => {
        //     this.generateWave()
        // }, 10000);
    }

    generateWave(){
        for(let i = 0; i < this.enemyCount; i++){
            let rng = Math.random()*100 
            let newEnemy;
            if(rng > 75){
                newEnemy = new HeavyEnemy()
            }
            else{
                newEnemy = new BasicEnemy()
            }
            newEnemy.setSelfIndex(i+1)
            
            this.enemiesList.push(newEnemy)
        }
        
    }

    notifyObserver(observer){
        if(observer){
            this.observers[observer].getNotification(this.enemiesList)
        }
    }

    createObserver(observerName, observer){
        
        if(Object.keys(this.observers).includes(observerName)){
            return
        }
        console.log(`[ENEMY PROCESSING] Observer added: ${observerName}`)
        this.observers[observerName] = observer
    }

    useRef(ref){
        this.refs[ref.type] = ref.target
    }

}