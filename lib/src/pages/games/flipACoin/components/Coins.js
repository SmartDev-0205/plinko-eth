import ClassNames from "classnames";
import * as React from "react";
import Style from "./Coins.scss";
import CoinHead from "assets/images/inline/coinHead.svg";
import CoinNumber from "assets/images/inline/coinNumber.svg";
const coins = [React.createElement(CoinHead, { key: 1, width: "100%", heigth: "auto" }), React.createElement(CoinNumber, { key: 2, width: "100%", heigth: "auto" })];
const Coin = ({ num, won, selected, onClick }) => {
    const classNames = ClassNames(Style.coin, {
        [Style.coin_selected]: selected && won === undefined,
        [Style.coin_won]: won === true,
        [Style.coin_lost]: won === false,
        [Style.button]: onClick !== undefined,
    });
    return onClick ? (React.createElement("button", { className: classNames, onClick: () => onClick(num) }, coins[num])) : (React.createElement("span", { className: classNames }, coins[num]));
};
function wonStatus(num, result, showResult) {
    if (!showResult || num !== result.num) {
        return undefined;
    }
    return result.won;
}
const Coins = ({ selectedCoin, result, showResult, onClick }) => {
    return (React.createElement("div", { className: Style.coins },
        React.createElement(Coin, { num: 0, selected: selectedCoin === 0, won: wonStatus(0, result, showResult), onClick: onClick }),
        React.createElement(Coin, { num: 1, selected: selectedCoin === 1, won: wonStatus(1, result, showResult), onClick: onClick })));
};
export default Coins;
//# sourceMappingURL=Coins.js.map