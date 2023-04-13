import ClassNames from "classnames";
import * as React from "react";
import Style from "./Tile.scss";
const TileContent = ({ num, selected, won }) => {
    const classNames = ClassNames(Style.numContent, {
        [Style.numContent_selected]: selected,
        [Style.numContent_won]: won === true,
        [Style.numContent_lost]: won === false,
    });
    return (React.createElement("div", { className: classNames },
        React.createElement("span", { className: Style.num }, num)));
};
const Tile = ({ num, selected, won, onClick }) => {
    return onClick ? (React.createElement("button", { className: Style.button, onClick: () => onClick(num) },
        React.createElement(TileContent, { num: num, selected: selected, won: won }))) : (React.createElement("div", { className: Style.button },
        React.createElement(TileContent, { num: num, selected: selected, won: won })));
};
export default Tile;
//# sourceMappingURL=Tile.js.map