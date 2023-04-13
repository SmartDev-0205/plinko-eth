import * as React from "react";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Ether from "../../../../reusable/Ether";
import { Table } from "../../../../reusable/index";
import Style from "./GameSessions.scss";
const GameSessionRow = ({ gameId, balance, roundId }) => (React.createElement("tr", { className: "text-center" },
    React.createElement("td", null,
        React.createElement(Link, { to: `/gameSession/${gameId}` }, gameId)),
    React.createElement("td", null, roundId),
    React.createElement("td", null,
        React.createElement(Ether, { gwei: balance, colored: true, showCurrencySymbol: true }))));
const GameSessions = ({ gameSessions, t }) => (React.createElement("div", { style: { marginTop: "4em" } },
    React.createElement("h4", { className: "text-center" }, t("yourGameSessions")),
    React.createElement("div", { className: Style.gameSessionsWrapper },
        React.createElement(Table, { hover: true, noBorders: true },
            React.createElement("thead", null,
                React.createElement("tr", { className: "text-center" },
                    React.createElement("th", null, t("gameId")),
                    React.createElement("th", null, t("#bets")),
                    React.createElement("th", null, t("profitInEth")))),
            React.createElement("tbody", { className: Style.gamseSessionEntries }, gameSessions.slice().map((gameSession) => (React.createElement(GameSessionRow, Object.assign({ key: gameSession.gameId }, gameSession)))))))));
export default withTranslation()(GameSessions);
//# sourceMappingURL=GameSessions.js.map