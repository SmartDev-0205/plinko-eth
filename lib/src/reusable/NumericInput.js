import * as React from "react";
import { filterFloat } from "../util/math";
import Input from "./Input";
export default class NumericInput extends React.Component {
    constructor(props) {
        super(props);
        this.validate = (value) => {
            const { min, max } = this.props;
            const num = filterFloat(value);
            if (Number.isNaN(num)) {
                return { valid: false, message: "Not a number!" };
            }
            else if (num < min) {
                return { valid: false, message: "To low!" };
            }
            else if (num > max) {
                return { valid: false, message: "To high!" };
            }
            else {
                return { valid: true };
            }
        };
        this.onValue = (value) => {
            const { step, onNumber } = this.props;
            let num = filterFloat(value);
            if (step !== undefined) {
                num = Math.round(num / step) * step;
            }
            onNumber(num);
        };
    }
    render() {
        const { number, precision, suffix } = this.props; // tslint:disable-line variable-name
        const value = precision !== undefined ? number.toFixed(precision) : number.toString();
        return React.createElement(Input, { suffix: suffix, value: value, validate: this.validate, onValue: this.onValue });
    }
}
NumericInput.defaultProps = {
    min: Number.MIN_VALUE,
    max: Number.MAX_VALUE,
};
//# sourceMappingURL=NumericInput.js.map