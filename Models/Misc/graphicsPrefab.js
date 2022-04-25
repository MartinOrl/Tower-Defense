class Text{
    constructor(text,font, fontSize, x, y,align,ctx){
        this.text = text;
        this.context = ctx ? ctx : document.querySelector("#text").getContext("2d");
        this.position = {
            x,y
        }
        this.font = font;
        this.align = align
        this.fontSize = `${fontSize}px`
    }
}

class HeadingText extends Text{
    constructor(text,font, fontSize, x,y,ctx=false, align="start"){
        super(text,font, fontSize, x,y,align,ctx)
        
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
    constructor(text,font, fontSize, x,y,ctx=false,align="start"){
        super(text,font, fontSize, x,y,align,ctx)
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
    constructor(ctx, x,y,w,h,fill=false){
        this.context = ctx
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
        this.context = document.querySelector("#control_canvas").getContext("2d")
        this.image = './Assets/Misc/rope.webp'
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
