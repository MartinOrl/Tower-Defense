class Text{
    constructor(text,font, fontSize, x, y,ctx){
        this.text = text;
        this.context = ctx ? ctx : document.querySelector("#text").getContext("2d");
        this.position = {
            x,y
        }
        this.font = font;
        this.fontSize = `${fontSize}px`
    }
}

class HeadingText extends Text{
    constructor(text,font, fontSize, x,y,ctx=false){
        super(text,font, fontSize, x,y,ctx)
        
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
    constructor(text,font, fontSize, x,y,ctx=false){
        super(text,font, fontSize, x,y,ctx)
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