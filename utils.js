

var pathArray = []

const computeVectorLength = (sx,sy,tx,ty) => {
    return Math.sqrt((sx - tx)**2 + (sy-ty)**2)
}

const getVector = (sx,sy,tx,ty) => {
    return [(tx-sx),(ty-sy)]
}

const calcCoef = (posStart,posTarget) => {
    let sx = posStart[0]
    let sy = posStart[1]
    let tx = posTarget[0]
    let ty = posTarget[1]
    let vector = getVector(sx,sy,tx,ty)
    let vectorLen = computeVectorLength(sx,sy,tx,ty)
    
    vector[0] = Math.floor((30 / vectorLen) * vector[0])
    vector[1] = Math.floor((30 / vectorLen) * vector[1])
   
    return [sx+vector[0], sy+vector[1]]

}

document.querySelector(".canvas-container").addEventListener("click",(e) => {

    let x_coef = 0;
    let y_coef = 0;
    if(pathArray.length > 0){
        let new_pos = calcCoef(pathArray[pathArray.length-1], [e.layerX,e.layerY])
        x_coef = new_pos[0]
        y_coef = new_pos[1]
    }
    else{
        x_coef = e.layerX
        y_coef = e.layerY
    }

    let pathHelperContainer = document.querySelector("#pathHelper")
    let dot = document.createElement("span")
    dot.classList.add("path_dot")
    dot.style.left = x_coef + "px"
    dot.style.top = y_coef + "px"
    pathHelperContainer.appendChild(dot);
    pathArray.push([x_coef, y_coef])
    console.log(pathArray)
})


