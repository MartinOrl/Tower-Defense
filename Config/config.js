const GAME_CONFIG = {
    INITIAL_COINS: 250,
    INITIAL_MANA: 0,
    MAX_MANA: 100
}

const ActionTypes = {
    WINDOW_SET: 'WINDOW_SET',
    GAME_STATE_SET: 'GAME_STATE_SET',
    CONFIG_RESET: 'CONFIG_RESET',
    CONFIG_MODIFY: 'CONFIG_MODIFY',
    ABILITY_USE: 'ABILITY_USE',
    TOWER_UPGRADE: 'TOWER_UPGRADE',
    TOWER_LEVELUP_UNDO: 'TOWER_LEVELUP_UNDO',
    PLAYER_UPGRADE: 'PLAYER_UPGRADE',
    UPGRADE_PLAYER_SPEC: 'UPGRADE_PLAYER_SPEC'
}

class IMG_ASSET{
    constructor(url, opacity = false){
        this.type = 'class'
        this.image = new Image()
        this.image.src = url
        this.image.style.opacity = opacity ? 0.4 : 1
        this.status = 0
        this.image.onload = () => {
            this.status = 1
        }
    }
}


const IMG_ASSETS_LIST = {
    abilities: {
        ability_fire: new IMG_ASSET("./Assets/Abilities/fire.webp"),
        ability_freeze: new IMG_ASSET("./Assets/Abilities/freeze.webp"),
        ability_poison: new IMG_ASSET("./Assets/Abilities/poison.webp"),
        ability_rocks: new IMG_ASSET("./Assets/Abilities/rock.webp"),
    },
    bars: {
        bar_blue: new IMG_ASSET("./Assets/Bars/bar_blue.webp"),
        bar_yellow: new IMG_ASSET("./Assets/Bars/bar_yellow.webp"),
        bar_red: new IMG_ASSET("./Assets/Bars/bar_red.webp"),
        bar_blue_opaque: new IMG_ASSET("./Assets/Bars/bar_blue_transparent.webp",true),
        bar_yellow_opaque: new IMG_ASSET("./Assets/Bars/bar_yellow_transparent.webp",true),
       
    },
    buttons: {
        audio_add: new IMG_ASSET("./Assets/Buttons/audio_add.webp"),
        audio_decrease: new IMG_ASSET("./Assets/Buttons/audio_decrease.webp"),
        audio_mute: new IMG_ASSET("./Assets/Buttons/audio_mute.webp"),
        audio_on: new IMG_ASSET("./Assets/Buttons/audio_on.webp"),
        back: new IMG_ASSET("./Assets/Buttons/back.webp"),
        close: new IMG_ASSET("./Assets/Buttons/close.webp"),
        continue: new IMG_ASSET("./Assets/Buttons/continue.webp"),
        done: new IMG_ASSET("./Assets/Buttons/done.webp"),
        menu: new IMG_ASSET("./Assets/Buttons/menu.webp"),
        newGame: new IMG_ASSET("./Assets/Buttons/newGame.webp"),
        next: new IMG_ASSET("./Assets/Buttons/next.png"),
        nextLevel: new IMG_ASSET("./Assets/Buttons/nextLevel.webp"),
        pause: new IMG_ASSET("./Assets/Buttons/pause.webp"),
        play: new IMG_ASSET("./Assets/Buttons/play.png"),
        reset: new IMG_ASSET("./Assets/Buttons/reset.webp"),
        resetLevel: new IMG_ASSET("./Assets/Buttons/resetLevel.webp"),
        resume: new IMG_ASSET("./Assets/Buttons/resume.webp"),
        settings: new IMG_ASSET("./Assets/Buttons/settings.webp"),
        undo: new IMG_ASSET("./Assets/Buttons/undo.webp"),
        upgrade: new IMG_ASSET("./Assets/Buttons/upgrade.webp"),
    },
    levels: {
        level_1: new IMG_ASSET("./Assets/Levels/level_1.webp"),
        level_2: new IMG_ASSET("./Assets/Levels/level_2.webp"),
        level_3: new IMG_ASSET("./Assets/Levels/level_3.webp"),
    },
    misc: {
        board_high: new IMG_ASSET("./Assets/Misc/board_high.webp"),
        board_med: new IMG_ASSET("./Assets/Misc/board_med.webp"),
        board_wide: new IMG_ASSET("./Assets/Misc/board_wide.webp"),
        gem: new IMG_ASSET("./Assets/Misc/gem.png"),
        lose_star: new IMG_ASSET("./Assets/Misc/lose_star.webp"),
        lose: new IMG_ASSET("./Assets/Misc/lose.webp"),
        player: new IMG_ASSET("./Assets/Misc/player.webp"),
        price: new IMG_ASSET("./Assets/Misc/price.webp"),
        rope: new IMG_ASSET("./Assets/Misc/rope.webp"),
        star: new IMG_ASSET("./Assets/Misc/Star.png"),
        win_star: new IMG_ASSET("./Assets/Misc/win_star.webp"),
        win: new IMG_ASSET("./Assets/Misc/win.webp")
    },
    upgrades: {
        tower: {
            archer1: new IMG_ASSET("./Assets/Upgrade/Tower/archer1.webp"),
            archer2: new IMG_ASSET("./Assets/Upgrade/Tower/archer2.webp"),
            archer3: new IMG_ASSET("./Assets/Upgrade/Tower/archer3.webp"),
        }
    },
    towers: {
        build: new IMG_ASSET("./Assets/Towers/build.png"),
        archer: {
            level_1: new IMG_ASSET("./Assets/Towers/Archer_1.webp"),
            level_2: new IMG_ASSET("./Assets/Towers/Archer_2.webp"),
            level_3: new IMG_ASSET("./Assets/Towers/Archer_3.webp"),
        },
        mage: {
            level_1: new IMG_ASSET("./Assets/Towers/Mage_1.png"),
            level_2: new IMG_ASSET("./Assets/Towers/Mage_2.png"),
            level_3: new IMG_ASSET("./Assets/Towers/Mage_3.png")
        },
        bombard: {
            level_1: new IMG_ASSET("./Assets/Towers/bombard_1.png"),
            level_2: new IMG_ASSET("./Assets/Towers/bombard_2.png"),
            level_3: new IMG_ASSET("./Assets/Towers/bombard_3.png")
        }


    }

}

const LAYERS = {
    layer1: "levelBoard",
    layer2: "enemies",  
    layer3: "towers", 
    layer4: "levelDataBoard", 
    layer5: "levelDataStationary",  
    layer6: "levelDataAnimations", 
    layer7: "levelControls", 
    layer8: "masterControlBoard",  
    layer9: "masterExtraGraphics",  
    layer10: "masterExtraText",  
    layer11: "masterControls"
}

const TOWER_PLACE_POSITIONS = {
    level_1: [
        {
            x: 200,
            y: 600
        },
        {
            x: 548,
            y: 485
        },
        {
            x: 842,
            y: 512
        },
        {
            x: 1104,
            y: 300
        },
    ]
}

CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    this.beginPath();
    this.moveTo(x+r, y);
    this.arcTo(x+w, y,   x+w, y+h, r);
    this.arcTo(x+w, y+h, x,   y+h, r);
    this.arcTo(x,   y+h, x,   y,   r);
    this.arcTo(x,   y,   x+w, y,   r);
    this.closePath();
    return this;
}

CanvasRenderingContext2D.prototype.borderThick = function (x, y, w, h, r,th) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    this.beginPath();
    this.lineWidth = th;
    this.moveTo(x+r, y);
    this.arcTo(x+w, y,   x+w, y+h, r);
    this.arcTo(x+w, y+h, x,   y+h, r);
    this.arcTo(x,   y+h, x,   y,   r);
    this.arcTo(x,   y,   x+w, y,   r);
    this.closePath();
    return this;
}