import * as React from "react";
import Coins from "../../../../pages/games/flipACoin/components/Coins";
const FlipACoinBetInfo = ({ betNum, resultNum }) => {
    return React.createElement(Coins, { selectedCoin: betNum, showResult: true, result: { num: resultNum, won: betNum === resultNum } });
};
export default FlipACoinBetInfo;
//# sourceMappingURL=FlipACoinBetInfo.js.map