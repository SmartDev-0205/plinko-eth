import { getSetBits } from "@dicether/state-channel";
import * as React from "react";
import Grid from "../../../../pages/games/keno/components/Grid";
const KenoBetInfo = ({ betNum, resultNum }) => {
    const selectedTiles = getSetBits(betNum);
    return React.createElement(Grid, { selectedTiles: selectedTiles, showResult: true, result: { num: resultNum, betNum } });
};
export default KenoBetInfo;
//# sourceMappingURL=KenoBetInfo.js.map