import * as React from "react";
import { connect } from "react-redux";
import Plinko from "../../../../pages/games/plinko/components/Plinko";
import { popCnt } from "../../../../util/math";
const mapStateToProps = (state) => {
    const { app } = state;
    return {
        nightMode: app.nightMode,
    };
};
const PlinkoBetInfo = ({ nightMode, betNum, resultNum }) => {
    const risk = Math.floor(betNum / 100);
    const rows = betNum % 100;
    const resultColumn = popCnt(resultNum);
    return React.createElement(Plinko, { nightMode: nightMode, rows: rows, risk: risk, showResult: true, resultColumn: resultColumn });
};
export default connect(mapStateToProps)(PlinkoBetInfo);
//# sourceMappingURL=PlinkoBetInfo.js.map