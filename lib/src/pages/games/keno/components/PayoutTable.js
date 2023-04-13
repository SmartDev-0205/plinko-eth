import ClassNames from "classnames";
import { KENO_DIVIDER, KENO_PAY_OUT } from "@dicether/state-channel";
import * as React from "react";
import Style from "./PayoutTable.scss";
const Entry = ({ hits, payout, won }) => {
    const className = ClassNames(Style.entry, {
        [Style.entry_won]: won === true,
        [Style.entry_lost]: won === false,
    });
    return (React.createElement("div", { className: className },
        React.createElement("span", null,
            hits,
            " Hits"),
        React.createElement("span", null,
            payout,
            "x")));
};
const PayoutTable = ({ selectedTiles, numHits }) => {
    return (React.createElement("div", { className: Style.payoutTable }, [...Array(selectedTiles + 1).keys()].map((t) => (React.createElement(Entry, { key: t, hits: t, payout: KENO_PAY_OUT[selectedTiles][t] / KENO_DIVIDER, won: numHits === t ? KENO_PAY_OUT[selectedTiles][numHits] > 0 : undefined })))));
};
export default PayoutTable;
//# sourceMappingURL=PayoutTable.js.map