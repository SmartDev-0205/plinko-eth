import * as React from "react";
import { InputGroup } from "reactstrap";
import Button from "./Button";
import NumericInput from "./NumericInput";
const ETHER_DIV = 1e9;
export default class ValueInput extends React.PureComponent {
    constructor(props) {
        super(props);
        this.onValueChange = (value) => {
            const { onChange, min, max, step } = this.props;
            let newVal = Math.round(value * ETHER_DIV);
            if (newVal < min) {
                newVal = min;
            }
            else if (newVal > max) {
                newVal = max;
            }
            if (step !== undefined) {
                newVal = Math.round(newVal / step) * step;
            }
            onChange(newVal);
        };
        this.onValueDouble = (value) => {
            const { max, onChange, step } = this.props;
            let newVal = value * 2;
            if (step !== undefined) {
                newVal = Math.round(newVal / step) * step;
            }
            if (newVal > max) {
                newVal = max;
            }
            onChange(newVal);
        };
        this.onValueHalf = (value) => {
            const { min, onChange, step } = this.props;
            let newVal = value / 2;
            if (step !== undefined) {
                newVal = Math.round(newVal / step) * step;
            }
            if (newVal < min) {
                newVal = min;
            }
            onChange(newVal);
        };
    }
    render() {
        const { value, min, max } = this.props;
        return (React.createElement(InputGroup, null,
            React.createElement(NumericInput, { className: "form-control", step: min / ETHER_DIV, min: min / ETHER_DIV, max: max / ETHER_DIV, number: value / ETHER_DIV, onNumber: this.onValueChange }),
            React.createElement(Button, { color: "primary", onClick: () => this.onValueHalf(value) }, "1/2"),
            React.createElement(Button, { color: "primary", onClick: () => this.onValueDouble(value) }, "2X")));
    }
}
//# sourceMappingURL=ValueInput.js.map