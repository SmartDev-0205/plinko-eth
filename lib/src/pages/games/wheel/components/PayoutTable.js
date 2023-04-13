import ClassNames from "classnames";
import * as React from "react";
import { formatMultiplier } from "./utility";
import Style from "./PayoutTable.scss";
const PayoutInfo = ({ multiplier, color, show }) => {
    const className = ClassNames(Style.colorStrip, { [Style.colorStrip_show]: show });
    return (React.createElement("div", { className: Style.payoutInfo },
        React.createElement("div", { className: className, style: { backgroundColor: color } }),
        React.createElement("span", { className: Style.multiplier }, formatMultiplier(multiplier))));
};
const PayoutTable = ({ payoutTable, showMultiplier, multiplier }) => {
    return (React.createElement("div", { className: Style.payoutTable }, payoutTable.map((p) => (React.createElement(PayoutInfo, { key: p.value, multiplier: p.value, color: p.color, show: showMultiplier && multiplier === p.value })))));
};
export default PayoutTable;
//# sourceMappingURL=PayoutTable.js.map