import * as React from "react";
import PayoutTable from "./PayoutTable";
import AnimatedWheel from "./WheelAnimation";
import Style from "./WheelGrid.scss";
import DayColors from "./WheelDayColors.scss";
import NightColors from "./WheelNightColors.scss";
class WheelGrid extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { nightMode, segments, angle, payout } = this.props;
        const segmentColorsLookup = WheelGrid.calcSegmentColors(segments, nightMode);
        const segmentColors = segments.map((x) => segmentColorsLookup[x]);
        const color = segmentColorsLookup[payout.multiplier];
        const payoutTable = Object.entries(segmentColorsLookup)
            .map(([value, color]) => ({
            value: Number.parseInt(value, 10),
            color,
        }))
            .sort((x1, x2) => x1.value - x2.value);
        return (React.createElement("div", { className: Style.wrapper },
            React.createElement("div", { className: Style.wheelGrid },
                React.createElement(AnimatedWheel, { nightMode: nightMode, segmentColors: segmentColors, position: angle, payout: Object.assign(Object.assign({}, payout), { multiplier: payout.multiplier, color }) }),
                React.createElement(PayoutTable, { payoutTable: payoutTable, showMultiplier: payout.show, multiplier: payout.multiplier }))));
    }
}
WheelGrid.calcSegmentColors = (segments, nightMode) => {
    const colors = nightMode ? NightColors : DayColors;
    let curColorIdx = 0;
    const colorLookup = {};
    for (const segment of segments) {
        if (!(segment in colorLookup)) {
            const color = colors[`color${curColorIdx % 6}`];
            colorLookup[segment] = color;
            curColorIdx += 1;
        }
    }
    return colorLookup;
};
export default WheelGrid;
//# sourceMappingURL=WheelGrid.js.map