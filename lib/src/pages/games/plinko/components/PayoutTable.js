import { PLINKO_PAYOUT_DIVIDER } from "@dicether/state-channel";
import ClassNames from "classnames";
import * as React from "react";
import Style from "./PayoutTable.scss";
const PayoutInfo = ({ showResult, colorClass, multiplier }) => {
    const classNamesColorStrip = ClassNames(Style.colorStrip, colorClass, { [Style.colorStrip_show]: showResult });
    const classNamesEntry = ClassNames(Style.resultEntry, { [Style.resultEntry_show]: showResult });
    return (React.createElement("div", { className: classNamesEntry },
        React.createElement("div", { className: classNamesColorStrip }),
        React.createElement("span", { className: Style.multiplier }, `${multiplier}x`)));
};
const PayoutTable = ({ payout, showResult, resultColumn }) => {
    const len = payout.length;
    const totalPayout = [...payout.slice(1).reverse(), ...payout];
    const color = [...Array(len).keys()].map((x) => Style[`colorStrip-${(len - 1) * 2}-${x}`]);
    const totalColor = [...color.slice(1).reverse(), ...color];
    return (React.createElement("div", { className: Style.payoutTable }, totalPayout.map((value, index) => (React.createElement(PayoutInfo, { key: `${len}-${index}`, showResult: showResult && resultColumn === index, multiplier: value / PLINKO_PAYOUT_DIVIDER, colorClass: totalColor[index] })))));
};
export default PayoutTable;
//# sourceMappingURL=PayoutTable.js.map