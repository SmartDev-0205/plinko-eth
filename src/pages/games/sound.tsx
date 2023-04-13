const win = require("assets/sound/win.wav");
const lose = require("assets/sound/lose.wav");
const click = require("assets/sound/click.wav");

export default {
    win: new Audio(win),
    lose: new Audio(lose),
    menuUp: new Audio(click),
    menuDown: new Audio(click),
    tileSelect: new Audio(click),
    tileHit: new Audio(win),
    tileMiss: new Audio(click),
    plinkoResult: new Audio(win),
};
