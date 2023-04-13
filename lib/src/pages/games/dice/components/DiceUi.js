import * as React from "react";
import { withTranslation } from "react-i18next";
import { HOUSE_EDGE, HOUSE_EDGE_DIVISOR, MAX_NUMBER_DICE_1, MIN_BET_VALUE, MIN_NUMBER_DICE_1, RANGE, } from "../../../../config/config";
import { formatEth } from "../../../../reusable/Ether";
import { Button, Col, FormGroup, Input, Label, Modal, NumericInput, Row, ValueInput } from "../../../../reusable/index";
import DiceSlider from "./DiceSlider";
import HowToPlay from "./HowToPlay";
import ReverseRollButton from "./ReverseRollButton";
import Style from "./DiceUi.scss";
function calcChance(num, reversedRoll) {
    return reversedRoll ? (RANGE - num - 1) / RANGE : num / RANGE;
}
function calcPayOutMultiplier(num, reversedRoll) {
    const houseEdgeFactor = 1 - HOUSE_EDGE / HOUSE_EDGE_DIVISOR;
    return reversedRoll ? (RANGE / (RANGE - num - 1)) * houseEdgeFactor : (RANGE / num) * houseEdgeFactor;
}
function calcNumberFromPayOutMultiplier(multiplier, reversedRoll) {
    const houseEdgeFactor = 1 - HOUSE_EDGE / HOUSE_EDGE_DIVISOR;
    const n = (RANGE / multiplier) * houseEdgeFactor;
    const num = reversedRoll ? RANGE - 1 - n : n;
    return Math.round(num);
}
class DiceUi extends React.Component {
    constructor(props) {
        super(props);
        this.onNumberChange = (num) => {
            this.setNumber(num);
        };
        this.onMultiplierChange = (multiplier) => {
            const { reverseRoll } = this.props;
            const num = calcNumberFromPayOutMultiplier(multiplier, reverseRoll);
            this.setNumber(num);
        };
        this.onChanceChange = (chance) => {
            const { reverseRoll } = this.props;
            const num = reverseRoll ? RANGE - 1 - RANGE * chance : RANGE * chance;
            this.setNumber(Math.round(num));
        };
    }
    setNumber(num) {
        const { onNumberChange } = this.props;
        if (num < MIN_NUMBER_DICE_1) {
            num = MIN_NUMBER_DICE_1;
        }
        else if (num > MAX_NUMBER_DICE_1) {
            num = MAX_NUMBER_DICE_1;
        }
        onNumberChange(num);
    }
    render() {
        const { num, value, reverseRoll, result, showResult, sound, showHelp, onValueChange, onReverseRoll, onToggleHelp, onPlaceBet, maxBetValue, t, } = this.props;
        const multiplier = calcPayOutMultiplier(num, reverseRoll);
        const profit = multiplier * value;
        const chance = calcChance(num, reverseRoll);
        const maxPayoutMultiplier = calcPayOutMultiplier(MIN_NUMBER_DICE_1, false);
        const minPayoutMultiplier = calcPayOutMultiplier(MAX_NUMBER_DICE_1, false);
        const reverseButton = React.createElement(ReverseRollButton, { reversed: reverseRoll, onClick: onReverseRoll });
        return (React.createElement("div", null,
            React.createElement("div", { className: Style.ui },
                React.createElement("div", { className: "row", style: { alignItems: "flex-end" } },
                    React.createElement(Col, { sm: 6, xs: 12 },
                        React.createElement(FormGroup, { className: "games__form-group" },
                            React.createElement(Label, null, t("betAmountEth")),
                            React.createElement(ValueInput, { value: value, min: MIN_BET_VALUE, step: MIN_BET_VALUE, max: maxBetValue, onChange: onValueChange }))),
                    React.createElement(Col, { sm: 6, xs: 6 },
                        React.createElement(FormGroup, { className: "games__form-group" },
                            React.createElement(Label, null, t("profitOnWinEth")),
                            React.createElement(Input, { disabled: true, readOnly: true, value: formatEth(profit - value) }))),
                    React.createElement(Col, { xs: 6, sm: 4 },
                        React.createElement(FormGroup, { className: "games__form-group" },
                            React.createElement(Label, null, reverseRoll ? t("betOver") : t("betUnder")),
                            React.createElement(NumericInput, { number: num, step: 1, min: MIN_NUMBER_DICE_1, max: MAX_NUMBER_DICE_1, onNumber: this.onNumberChange, suffix: reverseButton }))),
                    React.createElement(Col, { xs: 6, sm: 4, className: "d-none d-sm-block" },
                        React.createElement(FormGroup, { className: "games__form-group" },
                            React.createElement(Label, null, t("payOut")),
                            React.createElement(NumericInput, { number: multiplier, suffix: "x", precision: 3, min: minPayoutMultiplier, max: maxPayoutMultiplier, onNumber: this.onMultiplierChange }))),
                    React.createElement(Col, { xs: 6, sm: 4, className: "d-none d-sm-block" },
                        React.createElement(FormGroup, { className: "games__form-group" },
                            React.createElement(Label, null, t("winChance")),
                            React.createElement(NumericInput, { number: chance * 100, suffix: "%", precision: 0, min: MIN_NUMBER_DICE_1, max: MAX_NUMBER_DICE_1, step: 1, onNumber: (num) => this.onChanceChange(num / 100) })))),
                React.createElement(Row, { noGutters: true },
                    React.createElement(Button, { className: "betButton", block: true, color: "success", onClick: onPlaceBet }, t("rollDice"))),
                React.createElement(Modal, { isOpen: showHelp, toggle: onToggleHelp },
                    React.createElement(HowToPlay, null))),
            React.createElement(DiceSlider, { num: num, onNumberChange: this.onNumberChange, showResult: showResult, result: result, sound: sound, reversedRoll: reverseRoll })));
    }
}
export default withTranslation()(DiceUi);
//# sourceMappingURL=DiceUi.js.map