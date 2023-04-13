import ClassNames from "classnames";
import * as React from "react";
import Style from "./Ether.scss";
const icon = require("assets/images/ETH_icon.svg");
export function formatEth(gwei, precision = 9) {
    return (gwei / 1e9).toFixed(precision);
}
const Ether = ({ gwei, precision = 9, showCurrencySymbol = false, colored = false }) => {
    const ether = formatEth(gwei, precision);
    const classNames = ClassNames(Style.ether, { [Style.ether_positiv]: colored && gwei > 0 }, { [Style.ether_negativ]: colored && gwei < 0 });
    return (React.createElement("span", { className: classNames },
        React.createElement("span", { className: Style.value }, ether),
        showCurrencySymbol && React.createElement("img", { className: Style.icon, src: icon })));
};
export default Ether;
//# sourceMappingURL=Ether.js.map