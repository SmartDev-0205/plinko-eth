import * as React from "react";
import { Ether } from "../../reusable";
import Style from "./StatsRow.scss";
const StatsRow = ({ index, stat, showUserModal }) => {
    return (React.createElement("tr", null,
        React.createElement("td", null, index),
        React.createElement("td", null,
            React.createElement("button", { className: Style.userButton, onClick: () => showUserModal(stat.user) }, stat.user.username)),
        React.createElement("td", null,
            React.createElement(Ether, { showCurrencySymbol: false, gwei: stat.value }))));
};
export default StatsRow;
//# sourceMappingURL=StatsRow.js.map