import * as React from "react";
import { withTranslation } from "react-i18next";
import { MIN_BET_VALUE } from "../../../../config/config";
import { Button, Col, FormGroup, Label, Modal, Row, Select, ValueInput } from "../../../../reusable";
import { popCnt } from "../../../../util/math";
import HowToPlay from "./HowToPlay";
import Plinko from "./Plinko";
import Style from "./Ui.scss";
class Ui extends React.PureComponent {
    constructor(props) {
        super(props);
        this.plinko = React.createRef();
        /* tslint:disable:no-unused-variable */
        this.onSimulate = () => {
            var _a;
            (_a = this.plinko.current) === null || _a === void 0 ? void 0 : _a.simulate();
        };
        this.state = {
            angle: 0,
        };
    }
    render() {
        const { disableRiskRowUpdate, value, rows, risk, maxBetValue, result, showResult, showHelp, nightMode, onToggleHelp, onValueChange, onRiskChange, onRowsChange, onPlaceBet, t, } = this.props;
        const resultCol = popCnt(result.num); // TODO: Move up to plinko?
        return (React.createElement("div", null,
            React.createElement(Row, { noGutters: true },
                React.createElement(Col, { className: Style.plinko, lg: { size: 7, order: 2 }, xl: { size: 8, order: 2 } },
                    React.createElement(Plinko, { ref: this.plinko, rows: rows, risk: risk, nightMode: nightMode, showResult: showResult, resultColumn: resultCol })),
                React.createElement(Col, { lg: 5, xl: 4 },
                    React.createElement("div", { className: Style.menu },
                        React.createElement(FormGroup, { className: "games__form-group" },
                            React.createElement(Label, null, t("betAmountEth")),
                            React.createElement(ValueInput, { value: value, min: MIN_BET_VALUE, step: MIN_BET_VALUE, max: maxBetValue, onChange: onValueChange })),
                        React.createElement(Row, { noGutters: true },
                            React.createElement(Col, { xs: { size: 8 }, sm: { size: 12 } },
                                React.createElement(FormGroup, null,
                                    React.createElement(Label, null, t("risk")),
                                    React.createElement(Select, { disabled: disableRiskRowUpdate, value: risk.toString(), onValue: (val) => onRiskChange(Number.parseInt(val, 10)) },
                                        React.createElement("option", { value: 1 }, t("lowRisk")),
                                        React.createElement("option", { value: 2 }, t("mediumRisk")),
                                        React.createElement("option", { value: 3 }, t("highRisk"))))),
                            React.createElement(Col, { xs: { size: 4 }, sm: { size: 12 } },
                                React.createElement(FormGroup, null,
                                    React.createElement(Label, null, t("rows")),
                                    React.createElement(Select, { disabled: disableRiskRowUpdate, value: rows.toString(), onValue: (val) => onRowsChange(Number.parseInt(val, 10)) },
                                        React.createElement("option", { value: 8 }, "8"),
                                        React.createElement("option", { value: 12 }, "12"),
                                        React.createElement("option", { value: 16 }, "16"))))),
                        React.createElement(Button, { className: "betButton", block: true, color: "success", onClick: onPlaceBet }, t("bet"))))),
            React.createElement(Modal, { isOpen: showHelp, toggle: onToggleHelp },
                React.createElement(HowToPlay, null))));
    }
}
export default withTranslation("translation", { withRef: true })(Ui);
//# sourceMappingURL=Ui.js.map