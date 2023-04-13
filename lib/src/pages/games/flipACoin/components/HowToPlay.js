import * as React from "react";
import { Ether } from "../../../../reusable/index";
import { GameType, maxBet } from "@dicether/state-channel";
import { KELLY_FACTOR, MIN_BANKROLL, MIN_BET_VALUE } from "../../../../config/config";
import HowToPlayBase from "../../reusable/HowToPlayBase";
const HowToPlay = () => (React.createElement(HowToPlayBase, null,
    React.createElement("h5", null, "Flip a coin"),
    React.createElement("h6", null, "Step1"),
    React.createElement("p", null,
        "Choose your bet amount (between ",
        React.createElement(Ether, { gwei: MIN_BET_VALUE, precision: 5 }),
        " and",
        " ",
        React.createElement(Ether, { gwei: maxBet(GameType.FLIP_A_COIN, 0, MIN_BANKROLL, KELLY_FACTOR), precision: 5 }),
        " ETH)."),
    React.createElement("h6", null, "Step2"),
    React.createElement("p", null, "Choose heads or tails."),
    React.createElement("h6", null, "Step 3"),
    React.createElement("p", null,
        "Click the ",
        React.createElement("em", null, "Flip the Coin"),
        " button. If you have chosen the correct side, you have won!")));
export default HowToPlay;
//# sourceMappingURL=HowToPlay.js.map