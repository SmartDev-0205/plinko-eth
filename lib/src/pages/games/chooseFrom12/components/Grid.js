import * as React from "react";
import Tile from "./Tile";
import Style from "./Grid.scss";
function wonStatus(num, result, showResult) {
    if (!showResult || num !== result.num) {
        return undefined;
    }
    return result.won;
}
const coinNums = [...Array(12).keys()];
const Grid = ({ selectedCoins, result, showResult, onClick }) => (React.createElement("div", { className: Style.grid },
    React.createElement("div", { className: Style.tiles }, coinNums.map((num) => (React.createElement(Tile, { key: num, num: num, onClick: onClick, selected: selectedCoins[num], won: wonStatus(num, result, showResult) }))))));
export default Grid;
//# sourceMappingURL=Grid.js.map