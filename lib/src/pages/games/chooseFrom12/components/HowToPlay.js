import * as React from "react";
import { Ether } from "../../../../reusable/index";
import { GameType, maxBet } from "@dicether/state-channel";
import { KELLY_FACTOR, MIN_BANKROLL, MIN_BET_VALUE } from "../../../../config/config";
import HowToPlayBase from "../../reusable/HowToPlayBase";
const HowToPlay = () => (React.createElement(HowToPlayBase, null,
    React.createElement("h5", null, "Choose from 12 numbers"),
    React.createElement("h6", null, "Step1"),
    React.createElement("p", null,
        "Choose your bet amount (between ",
        React.createElement(Ether, { gwei: MIN_BET_VALUE, precision: 5 }),
        " and",
        " ",
        React.createElement(Ether, { gwei: maxBet(GameType.CHOOSE_FROM_12, Math.pow(2, 11) - 1, MIN_BANKROLL, KELLY_FACTOR), precision: 5 }),
        " ",
        "ETH)."),
    React.createElement("h6", null, "Step2"),
    React.createElement("p", null, "Select the numbers. You can select between 1 to 11 different numbers"),
    React.createElement("h6", null, "Step 3"),
    React.createElement("p", null, "Click the bet button. If the result is one of your selected numbers, you win!")));
export default HowToPlay;
//# sourceMappingURL=HowToPlay.js.map