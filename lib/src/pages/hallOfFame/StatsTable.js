import * as React from "react";
import { Table } from "../../reusable/index";
import StatsRow from "./StatsRow";
const StatsTable = ({ data, name, title, showUserModal }) => (React.createElement("div", null,
    React.createElement("h5", { className: "text-center" }, title),
    React.createElement(Table, { hover: true, striped: true },
        React.createElement("thead", null,
            React.createElement("tr", null,
                React.createElement("th", null, "#"),
                React.createElement("th", null, "User"),
                React.createElement("th", null, name))),
        React.createElement("tbody", null, data.map((stat, i) => (React.createElement(StatsRow, { key: i, index: i + 1, stat: stat, showUserModal: showUserModal })))))));
export default StatsTable;
//# sourceMappingURL=StatsTable.js.map