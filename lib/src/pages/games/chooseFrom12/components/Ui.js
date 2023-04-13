import * as React from "react";
import { withTranslation } from "react-i18next";
import { CHOOSE_FROM_12_NUMS, getSetBits } from "@dicether/state-channel";
import { HOUSE_EDGE, HOUSE_EDGE_DIVISOR, MIN_BET_VALUE } from "../../../../config/config";
import { Button, Col, FormGroup, Input, Label, Modal, Row, ValueInput } from "../../../../reusable";
import { formatEth } from "../../../../reusable/Ether";
import Grid from "./Grid";
import HowToPlay from "./HowToPlay";
import Style from "./Ui.scss";
class Ui extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        const { value, num, maxBetValue, result, showResult, showHelp, onToggleHelp, onValueChange, onClick, onPlaceBet, t, } = this.props;
        const selectedCoinsArray = getSetBits(num);
        const numSelected = selectedCoinsArray.filter((x) => x === true).length;
        const chance = numSelected / CHOOSE_FROM_12_NUMS;
        const houseEdgeFactor = 1 - HOUSE_EDGE / HOUSE_EDGE_DIVISOR;
        const payout = (1 / chance) * value * houseEdgeFactor;
        return (React.createElement("div", null,
            React.createElement(Row, { noGutters: true },
                React.createElement(Col, { lg: { size: 7, order: 2 }, xl: { size: 8, order: 2 } },
                    React.createElement(Grid, { onClick: onClick, selectedCoins: selectedCoinsArray, result: result, showResult: showResult })),
                React.createElement(Col, { lg: 5, xl: 4 },
                    React.createElement("div", { className: Style.menu },
                        React.createElement(FormGroup, { className: "games__form-group" },
                            React.createElement(Label, null, t("betAmountEth")),
                            React.createElement(ValueInput, { value: value, min: MIN_BET_VALUE, step: MIN_BET_VALUE, max: maxBetValue, onChange: onValueChange })),
                        React.createElement(FormGroup, { className: "games__form-group" },
                            React.createElement(Label, null, t("profitOnWinEth")),
                            React.createElement(Input, { disabled: true, readOnly: true, value: formatEth(payout - value) })),
                        React.createElement(FormGroup, { className: "games__form-group hidden-xs-down" },
                            React.createElement(Label, null, t("winChance")),
                            React.createElement(Input, { disabled: true, readOnly: true, value: Math.round(chance * 100).toString(), suffix: "%" })),
                        React.createElement(Button, { className: "betButton", block: true, color: "success", onClick: onPlaceBet }, t("bet"))))),
            React.createElement(Modal, { isOpen: showHelp, toggle: onToggleHelp },
                React.createElement(HowToPlay, null))));
    }
}
export default withTranslation()(Ui);
//# sourceMappingURL=Ui.js.map