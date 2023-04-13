import { getNumSetBits, getSetBits } from "@dicether/state-channel";
import BN from "bn.js";
import * as React from "react";
import { withTranslation } from "react-i18next";
import { MIN_BET_VALUE } from "../../../../config/config";
import { Button, Col, Ether, FormGroup, Label, Modal, Row, ValueInput } from "../../../../reusable";
import Grid from "./Grid";
import HowToPlay from "./HowToPlay";
import PayoutTable from "./PayoutTable";
import Style from "./Ui.scss";
class Ui extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        const { value, num, maxBetValue, result, showResult, showResultProfit, showHelp, onToggleHelp, onValueChange, onClick, onAutoPick, onClear, onPlaceBet, t, } = this.props;
        const selectedTilesArray = getSetBits(num);
        const numSelectedTiles = getNumSetBits(num);
        const hits = getNumSetBits(new BN(result.num).and(new BN(num)).toNumber());
        return (React.createElement("div", { className: Style.ui },
            React.createElement(Row, { noGutters: true },
                React.createElement(Col, { lg: { size: 7, order: 2 }, xl: { size: 8, order: 2 } },
                    React.createElement("div", { className: Style.grid },
                        React.createElement(Grid, { onClick: onClick, selectedTiles: selectedTilesArray, result: result, showResult: showResult }),
                        showResultProfit && result.userProfit > 0 && (React.createElement("div", { className: Style.resultPopover },
                            React.createElement("span", { className: Style.resultDetails },
                                hits,
                                " out of ",
                                numSelectedTiles,
                                "!"),
                            React.createElement("span", null,
                                "You have won ",
                                React.createElement(Ether, { precision: 6, gwei: result.userProfit }),
                                " ETH!")))),
                    React.createElement(PayoutTable, { selectedTiles: numSelectedTiles, numHits: showResult ? hits : undefined })),
                React.createElement(Col, { lg: 5, xl: 4 },
                    React.createElement("div", { className: Style.menu },
                        React.createElement(FormGroup, { className: "games__form-group" },
                            React.createElement(Label, null, t("betAmountEth")),
                            React.createElement(ValueInput, { value: value, min: MIN_BET_VALUE, step: MIN_BET_VALUE, max: maxBetValue, onChange: onValueChange })),
                        React.createElement("div", { className: "d-grid gap-2" },
                            React.createElement(Button, { color: "primary", onClick: onAutoPick, disabled: showResult }, t("autoPick")),
                            React.createElement(Button, { color: "primary", onClick: onClear, disabled: showResult }, t("clear")),
                            React.createElement(Button, { className: "betButton", color: "success", onClick: onPlaceBet }, t("bet")))))),
            React.createElement(Modal, { isOpen: showHelp, toggle: onToggleHelp },
                React.createElement(HowToPlay, null))));
    }
}
export default withTranslation()(Ui);
//# sourceMappingURL=Ui.js.map