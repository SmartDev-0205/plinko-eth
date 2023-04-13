import * as React from "react";
import { HOUSE_EDGE, HOUSE_EDGE_DIVISOR, MIN_BET_VALUE } from "../../../../config/config";
import { Button, Col, FormGroup, Input, Label, Modal, Row, ValueInput } from "../../../../reusable";
import { formatEth } from "../../../../reusable/Ether";
import Coins from "./Coins";
import HowToPlay from "./HowToPlay";
import Style from "./Ui.scss";
class Ui extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { value, maxBetValue, showHelp, result, showResult, num, onToggleHelp, onValueChange, onPlaceBet, onClick, } = this.props;
        const houseEdgeFactor = 1 - HOUSE_EDGE / HOUSE_EDGE_DIVISOR;
        const payout = 2 * value * houseEdgeFactor;
        return (React.createElement("div", { className: Style.dice },
            React.createElement("div", { className: Style.ui },
                React.createElement(Coins, { selectedCoin: num, result: result, showResult: showResult, onClick: onClick }),
                React.createElement("div", { className: "row", style: { alignItems: "flex-end" } },
                    React.createElement(Col, { sm: 6, xs: 12 },
                        React.createElement(FormGroup, { className: "games__form-group" },
                            React.createElement(Label, null, "Bet Amount (ETH)"),
                            React.createElement(ValueInput, { value: value, min: MIN_BET_VALUE, step: MIN_BET_VALUE, max: maxBetValue, onChange: onValueChange }))),
                    React.createElement(Col, { sm: 6, xs: 12 },
                        React.createElement(FormGroup, { className: "games__form-group" },
                            React.createElement(Label, null, "Profit on win (ETH)"),
                            React.createElement(Input, { disabled: true, readOnly: true, value: formatEth(payout - value) })))),
                React.createElement(Row, { noGutters: true },
                    React.createElement(Button, { className: "betButton", block: true, color: "success", onClick: onPlaceBet }, "Flip the coin")),
                React.createElement(Modal, { isOpen: showHelp, toggle: onToggleHelp },
                    React.createElement(HowToPlay, null)))));
    }
}
export default Ui;
//# sourceMappingURL=Ui.js.map