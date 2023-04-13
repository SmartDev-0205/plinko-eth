import dayjs from "dayjs";
import * as React from "react";
import { Link } from "react-router-dom";
import { Ether, Table } from "../../../reusable/index";
import { gameTypeToLink, gameTypeToName } from "./util";
import Style from "./BetList.scss";
const LastBetRow = ({ bet, showUser, showBetModal, showUserModal }) => {
    const { timestamp, user, value, profit } = bet;
    const { gameType } = bet;
    return (React.createElement("tr", null,
        React.createElement("td", { className: Style.tdGameType },
            React.createElement("div", { className: Style.gameType },
                React.createElement(Link, { className: Style.gameLink, to: gameTypeToLink(gameType) }, gameTypeToName(gameType)),
                React.createElement("button", { className: Style.infoButton, key: "1", color: "link", onClick: () => showBetModal(bet) }, "Info"))),
        showUser && (React.createElement("td", { className: Style.center },
            React.createElement("div", { className: Style.entry },
                React.createElement("button", { className: Style.userButton, onClick: () => showUserModal(user) }, user.username)))),
        React.createElement("td", { className: Style.center + " d-none d-sm-table-cell" },
            React.createElement("div", { className: Style.entry }, dayjs(timestamp).format("LT"))),
        React.createElement("td", { className: Style.center + " d-none d-sm-table-cell" },
            React.createElement("div", { className: Style.entry },
                React.createElement(Ether, { gwei: value, showCurrencySymbol: true }))),
        React.createElement("td", { className: Style.profit },
            React.createElement("div", { className: Style.entry },
                React.createElement(Ether, { gwei: profit, showCurrencySymbol: true, colored: true })))));
};
const BetsList = ({ bets, showUser = true, showBetModal, showUserModal }) => {
    return (React.createElement(Table, { className: Style.table, hover: true, noBorders: true, responsive: true },
        React.createElement("thead", { className: Style.head },
            React.createElement("tr", null,
                React.createElement("th", null, "Game"),
                showUser && React.createElement("th", { className: Style.center }, "User"),
                React.createElement("th", { className: Style.center + " d-none d-sm-table-cell" }, "Time"),
                React.createElement("th", { className: Style.center + " d-none d-sm-table-cell" }, "Bet"),
                React.createElement("th", { className: Style.profitHeader }, "Profit"))),
        React.createElement("tbody", { className: Style.entries }, bets.slice().map((bet) => (React.createElement(LastBetRow, { key: bet.id, bet: bet, showUser: showUser, showBetModal: showBetModal, showUserModal: showUserModal }))))));
};
export default BetsList;
//# sourceMappingURL=BetsList.js.map