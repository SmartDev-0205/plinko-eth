import * as React from "react";
import { WHEEL_PAYOUT, WHEEL_RESULT_RANGE } from "@dicether/state-channel";
import { connect } from "react-redux";
import WheelGrid from "../../../../pages/games/wheel/components/WheelGrid";
const mapStateToProps = (state) => {
    const { app } = state;
    return {
        nightMode: app.nightMode,
    };
};
const WheelBetInfo = ({ nightMode, betNum, resultNum }) => {
    const angle = 2 * Math.PI - (resultNum * 2 * Math.PI + Math.PI) / WHEEL_RESULT_RANGE;
    const risk = Math.floor(betNum / 100);
    const segments = betNum % 100;
    const allSegments = WHEEL_PAYOUT[risk][segments];
    const payout = {
        show: true,
        value: 0,
        multiplier: allSegments[Math.floor((resultNum * allSegments.length) / WHEEL_RESULT_RANGE)],
    };
    return React.createElement(WheelGrid, { nightMode: nightMode, angle: angle, segments: allSegments, payout: payout });
};
export default connect(mapStateToProps)(WheelBetInfo);
//# sourceMappingURL=WheelBetInfo.js.map