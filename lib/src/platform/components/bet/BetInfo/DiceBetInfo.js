import { GameType } from "@dicether/state-channel";
import * as React from "react";
import { ProgressBar, StaticPopover } from "../../../../reusable/index";
import Style from "./DiceBetInfo.scss";
const DiceBetInfo = ({ betNum, resultNum, gameType }) => {
    const lowColor = gameType === GameType.DICE_LOWER ? "success" : "danger";
    const highColor = gameType === GameType.DICE_LOWER ? "danger" : "success";
    return (React.createElement("div", { className: Style.diceBetInfo },
        React.createElement("div", { className: Style.diceBetInfo__wrap },
            React.createElement("div", { className: Style.diceBetInfo__betNum, style: { left: `${betNum}%` } },
                React.createElement(StaticPopover, { placement: "top" },
                    React.createElement("div", { className: Style.diceBetInfo__resultEntry },
                        React.createElement("span", { className: Style.diceBetInfo__resultHeader }, "Target"),
                        React.createElement("span", null, betNum)))),
            React.createElement(ProgressBar, { id: "progress", lowColor: lowColor, highColor: highColor, value: betNum }),
            React.createElement("div", { className: Style.diceBetInfo__resultNum, style: { left: `${resultNum}%` } },
                React.createElement(StaticPopover, { placement: "bottom" },
                    React.createElement("div", { className: Style.diceBetInfo__resultEntry },
                        React.createElement("span", { className: Style.diceBetInfo__resultHeader }, "Result"),
                        React.createElement("span", null, resultNum)))))));
};
export default DiceBetInfo;
//# sourceMappingURL=DiceBetInfo.js.map