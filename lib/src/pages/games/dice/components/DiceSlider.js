import * as React from "react";
import { MAX_NUMBER_DICE_1, MIN_NUMBER_DICE_1 } from "../../../../config/config";
import { Slider } from "../../../../reusable/index";
import sounds from "../../sound";
import ResultSlider from "./ResultSlider";
import Ticks from "./Ticks";
import Style from "./DiceSlider.scss";
import { playFromBegin } from "../../../../util/audio";
export default class DiceSlider extends React.PureComponent {
    constructor(props) {
        super(props);
        this.onChange = (newNum) => {
            if (newNum >= MIN_NUMBER_DICE_1 && newNum <= MAX_NUMBER_DICE_1) {
                const { sound, num } = this.props;
                if (sound) {
                    if (newNum > num) {
                        playFromBegin(sounds.menuUp);
                    }
                    else if (newNum < num) {
                        playFromBegin(sounds.menuDown);
                    }
                }
                this.props.onNumberChange(newNum);
            }
        };
    }
    render() {
        const { result, showResult, reversedRoll, num } = this.props;
        const lowColor = reversedRoll ? "danger" : "success";
        const highColor = reversedRoll ? "success" : "danger";
        return (React.createElement("div", { style: { position: "relative", width: "100%", marginTop: "3em" } },
            React.createElement("div", { className: Style.wrapper },
                React.createElement(Ticks, null)),
            React.createElement("div", { className: Style.sliderWrapper1 },
                React.createElement("div", { className: Style.sliderWrapper2 },
                    React.createElement(Slider, { min: 0, max: 100, value: num, onValue: this.onChange, lowColor: lowColor, highColor: highColor }))),
            React.createElement("div", { className: Style.wrapper },
                React.createElement(ResultSlider, { result: result, showResult: showResult }))));
    }
}
//# sourceMappingURL=DiceSlider.js.map