import { WHEEL_PAYOUT, WHEEL_RESULT_RANGE } from "@dicether/state-channel";
import * as React from "react";
import { withTranslation } from "react-i18next";
import { MIN_BET_VALUE } from "../../../../config/config";
import { Button, Col, FormGroup, Label, Modal, Row, Select, ValueInput } from "../../../../reusable";
import HowToPlay from "./HowToPlay";
import WheelGrid from "./WheelGrid";
import Style from "./Ui.scss";
class Ui extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            angle: 0,
        };
    }
    render() {
        const { disableRiskSegmentUpdate, value, segments, risk, maxBetValue, result, showResult, showHelp, nightMode, onToggleHelp, onValueChange, onRiskChange, onSegmentsChange, onPlaceBet, t, } = this.props;
        // TODO: move to wheel grid
        const angle = 2 * Math.PI - (result.num * 2 * Math.PI + Math.PI) / WHEEL_RESULT_RANGE;
        const allSegments = WHEEL_PAYOUT[risk][segments];
        const payout = {
            show: showResult,
            value: result.userProfit,
            multiplier: allSegments[Math.floor((result.num * allSegments.length) / WHEEL_RESULT_RANGE)],
        };
        return (React.createElement("div", null,
            React.createElement(Row, { noGutters: true },
                React.createElement(Col, { className: Style.wheel, lg: { size: 7, order: 2 }, xl: { size: 8, order: 2 } },
                    React.createElement(WheelGrid, { nightMode: nightMode, segments: allSegments, angle: angle, payout: payout })),
                React.createElement(Col, { lg: 5, xl: 4 },
                    React.createElement("div", { className: Style.menu },
                        React.createElement(FormGroup, { className: "games__form-group" },
                            React.createElement(Label, null, t("betAmountEth")),
                            React.createElement(ValueInput, { value: value, min: MIN_BET_VALUE, step: MIN_BET_VALUE, max: maxBetValue, onChange: onValueChange })),
                        React.createElement(Row, { noGutters: true },
                            React.createElement(Col, { xs: { size: 8 }, sm: { size: 12 } },
                                React.createElement(FormGroup, null,
                                    React.createElement(Label, null, t("risk")),
                                    React.createElement(Select, { disabled: disableRiskSegmentUpdate, value: risk.toString(), onValue: (val) => onRiskChange(Number.parseInt(val, 10)) },
                                        React.createElement("option", { value: 1 }, t("lowRisk")),
                                        React.createElement("option", { value: 2 }, t("mediumRisk")),
                                        React.createElement("option", { value: 3 }, t("highRisk"))))),
                            React.createElement(Col, { xs: { size: 4 }, sm: { size: 12 } },
                                React.createElement(FormGroup, null,
                                    React.createElement(Label, null, t("segments")),
                                    React.createElement(Select, { disabled: disableRiskSegmentUpdate, value: segments.toString(), onValue: (val) => onSegmentsChange(Number.parseInt(val, 10)) },
                                        React.createElement("option", { value: 10 }, "10"),
                                        React.createElement("option", { value: 20 }, "20"))))),
                        React.createElement(Button, { className: "betButton", block: true, color: "success", onClick: onPlaceBet }, t("bet"))))),
            React.createElement(Modal, { isOpen: showHelp, toggle: onToggleHelp },
                React.createElement(HowToPlay, null))));
    }
}
export default withTranslation()(Ui);
//# sourceMappingURL=Ui.js.map