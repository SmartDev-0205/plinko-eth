import { getSetBits } from "@dicether/state-channel";
import * as React from "react";
import Grid from "../../../../pages/games/chooseFrom12/components/Grid";
const ChooseFrom12BetInfo = ({ betNum, resultNum }) => {
    const selectedCoins = getSetBits(betNum);
    return React.createElement(Grid, { selectedCoins: selectedCoins, showResult: true, result: { num: resultNum, won: selectedCoins[resultNum] } });
};
export default ChooseFrom12BetInfo;
//# sourceMappingURL=ChooseFrom12BetInfo.js.map