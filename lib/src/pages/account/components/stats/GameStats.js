import * as React from "react";
import { withTranslation } from "react-i18next";
import { Ether } from "../../../../reusable/index";
import Style from "./GameStats.scss";
const StatsEntry = ({ value, name, colored = false, ether = true }) => (React.createElement("div", { className: Style.entry },
    React.createElement("dt", { className: Style.entry__header }, name),
    React.createElement("dd", null,
        " ",
        ether ? React.createElement(Ether, { colored: colored, gwei: value }) : value)));
const GameStats = ({ stats, t }) => {
    const { profit, wagered, numBets } = stats;
    return (React.createElement("dl", { className: Style.stats },
        React.createElement(StatsEntry, { value: wagered, name: t("wagered") }),
        React.createElement(StatsEntry, { colored: true, value: profit, name: t("profit") }),
        React.createElement(StatsEntry, { ether: false, value: numBets, name: t("#bets") })));
};
export default withTranslation()(GameStats);
//# sourceMappingURL=GameStats.js.map