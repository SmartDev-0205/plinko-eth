import BN from "bn.js";
import * as React from "react";
import Tile from "./Tile";
import Style from "./Grid.scss";
function wonStatus(tileNum, betNum, resultNum, showResult) {
    const resultNumBn = new BN(resultNum);
    const tileBit = new BN(1).shln(tileNum);
    if (!showResult || resultNumBn.and(tileBit).toNumber() === 0) {
        return undefined;
    }
    const betNumBn = new BN(betNum);
    return betNumBn.and(resultNumBn).and(tileBit).toNumber() !== 0;
}
const tileNums = [...Array(40).keys()];
const Grid = ({ selectedTiles, result, showResult, onClick }) => (React.createElement("div", { className: Style.grid },
    React.createElement("div", { className: Style.tiles }, tileNums.map((num) => (React.createElement(Tile, { key: num, num: num, onClick: onClick, selected: selectedTiles[num], won: wonStatus(num, result.betNum, result.num, showResult) }))))));
export default Grid;
//# sourceMappingURL=Grid.js.map