import dayjs from "dayjs";
import * as React from "react";
import { CopyToClipBoard, Ether } from "../../../../reusable/index";
import Style from "./Overview.scss";
const Overview = ({ bet, showUserModal }) => (React.createElement("div", { className: Style.overview },
    React.createElement("h3", null,
        "Bet:",
        bet.id,
        " ",
        React.createElement(CopyToClipBoard, { message: "Copied! Paste in Chat!", content: `Bet:${bet.id}` })),
    React.createElement("span", null, dayjs(bet.timestamp).format("lll")),
    React.createElement("span", null,
        "Placed by",
        " ",
        React.createElement("button", { className: Style.userName, onClick: () => showUserModal(bet.user) }, bet.user.username)),
    React.createElement("div", { className: Style.stats },
        React.createElement("div", { className: Style.statEntry },
            React.createElement("span", { className: Style.entryHeader }, "Wagered"),
            React.createElement(Ether, { gwei: bet.value })),
        React.createElement("div", { className: Style.statEntry },
            React.createElement("span", { className: Style.entryHeader }, "Profit"),
            React.createElement(Ether, { colored: true, gwei: bet.profit })))));
export default Overview;
//# sourceMappingURL=Overview.js.map