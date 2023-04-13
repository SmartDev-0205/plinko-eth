import * as React from "react";
import { MAX_GAME_SESSION_VALUE, MIN_GAME_SESSION_VALUE } from "../../../config/config";
import { Ether } from "../../../reusable";
import Style from "./HowToPlayBase.scss";
const HowToPlayBase = ({ children }) => (React.createElement("div", { className: Style.howToPlay },
    React.createElement("h3", { className: "text-center" }, "How to play?"),
    React.createElement("h5", null, "Start game session"),
    React.createElement("p", null,
        "Press ",
        React.createElement("em", null, "Start Game Session"),
        " and deposit your desired amount of Ether (between",
        " ",
        React.createElement(Ether, { gwei: MIN_GAME_SESSION_VALUE, precision: 2 }),
        " and",
        " ",
        React.createElement(Ether, { gwei: MAX_GAME_SESSION_VALUE, precision: 2 }),
        " ETH)."),
    children,
    React.createElement("h5", null, "End game session"),
    React.createElement("p", null,
        "Click ",
        React.createElement("em", null, "End Game Session"),
        " to receive your profit.")));
export default HowToPlayBase;
//# sourceMappingURL=HowToPlayBase.js.map