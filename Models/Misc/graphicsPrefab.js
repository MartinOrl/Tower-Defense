class Text{
    constructor(text,font, fontSize, x, y,align){
        this.text = text;
   
        this.position = {
            x,y
        }
        this.font = font;
        this.align = align
        this.fontSize = `${fontSize}px`
    }
}

class HeadingText extends Text{
    constructor(text,font, fontSize, x,y,align="start"){
        super(text,font, fontSize, x,y,align)
        
        this.gradientData = {
            angles: [0,180,0,0],
            steps: [
                [0,'#FAE90F'],
                [0.4406, '#FAE90F'],
                [1, '#F7BB1F']
            ]
        }
        this.shadow = {
            color: '#C43D1C',
            offsetY: 3,
            offsetX: 0,
            blur: 0
        }
    }
}

class BasicText extends Text{
    constructor(text,font, fontSize, x,y,align="start"){
        super(text,font, fontSize, x,y,align)
        this.fill = '#fff'
    }
}

class ExtraGraphic{
    constructor(url,ctx,x,y,w,h){
        this.image = url
        this.context = ctx
        this.position = {
            x,y
        }
        this.width = w
        this.height = h

    }
}

class ExtraBoard{
    constructor(x,y,w,h,fill=false){
        this.position = {
            x,y
        }
        this.width = w
        this.height = h
        this.fill = fill
    }
}

class Rope{
    constructor(x,y){
        this.image = IMG_ASSETS_LIST.misc.rope.image
        this.position = {
            x,y
        }
        this.width = 21
        this.height = 317

    }
}

// class Button{
//     constructor(targetCanvas, x, y, w, h, imgUrl){
//         this.context = document.querySelector(targetCanvas).getContext("2d", {alpha: false})
//         this.position = {
//             x,y
//         }
//         this.width = w
//         this.height = h
//         this.image = imgUrl

//     }
// }

// class GameStateChangeButton extends Button{
//     constructor(targetCanvas, x,y,w,h,imgUrl,stateTarget, stateChange, playState){
//         super(targetCanvas, x,y,w,h,imgUrl)
//         this.clickEventData = {
//             stateTarget, stateChange, playState,
//             action: ActionTypes.GAME_STATE_SET
//         }
//     }
// }
