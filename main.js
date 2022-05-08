var TowerDefense;
function setGameBackground(url){
    console.log(document.querySelector(".canvas_bg").style.background)
    console.log(url)
    document.querySelector(".canvas_bg").style.background = `url(${url})`
    console.log(document.querySelector(".canvas_bg").style.background)
}

window.addEventListener("load", () => {

    let image = IMG_ASSETS_LIST.levels[`level_3`].image.src
    document.querySelector(".level").style.background = `url(${image})`
    TowerDefense = new Engine()
    TowerDefense.boot()

})

let pathHelperContainer = document.createElement("div")
pathHelperContainer.id = 'pathHelper'
document.querySelector(".canvas-container").appendChild(pathHelperContainer)

// let paths = LEVEL_PATHS.level_3.basic.data

// paths.forEach(path => {
//     let dot = document.createElement("span")
//     dot.classList.add("path_dot")
//     dot.classList.add("history")
//     dot.style.left = path[0] + "px"
//     dot.style.top = path[1] + "px"
//     pathHelperContainer.appendChild(dot);
// })

// paths = LEVEL_PATHS.level_3.boss.data

// paths.forEach(path => {
//     let dot = document.createElement("span")
//     dot.classList.add("path_dot")
//     dot.classList.add("boss")
//     dot.style.left = path[0] + "px"
//     dot.style.top = path[1] + "px"
//     pathHelperContainer.appendChild(dot);
// })

