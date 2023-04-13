import * as React from "react";
import { Ether } from "../../../../reusable/index";
import { MAX_BET_VALUE, MIN_BET_VALUE } from "../../../../config/config";
import HowToPlayBase from "../../reusable/HowToPlayBase";
const HowToPlay = () => (React.createElement(HowToPlayBase, null,
    React.createElement("h5", null, "Roll the dice"),
    React.createElement("h6", null, "Step1"),
    React.createElement("p", null,
        "Choose your bet amount (between ",
        React.createElement(Ether, { gwei: MIN_BET_VALUE, precision: 5 }),
        " and",
        " ",
        React.createElement(Ether, { gwei: MAX_BET_VALUE, precision: 5 }),
        "ETH)."),
    React.createElement("h6", null, "Step2"),
    React.createElement("p", null, "Adjust the slider for higher or lower win reward."),
    React.createElement("h6", null, "Step 3"),
    React.createElement("p", null, "Click Roll Dice. If the roll is in the green region, you win!")));
export default HowToPlay;
//# sourceMappingURL=HowToPlay.js.map