import ClassNames from "classnames";
import * as React from "react";
import Style from "./Input.scss";
export default class Input extends React.Component {
    constructor(props) {
        super(props);
        this.onBlur = () => {
            const { value } = this.props;
            this.isFocus = false;
            this.setState({ inputValue: value });
        };
        this.onFocus = () => {
            this.isFocus = true;
        };
        this.onChange = (event) => {
            const val = event.target.value;
            const { onValue, validate } = this.props;
            const valid = validate !== undefined ? validate(val).valid : undefined;
            this.setState({ inputValue: val, isValid: valid });
            if (onValue && valid !== false) {
                onValue(val);
            }
        };
        if (props.isValid !== undefined && props.validate !== undefined) {
            console.error("isValid and validate cant't be used at the same time!");
        }
        this.isFocus = false;
        this.state = {
            inputValue: this.props.value,
        };
    }
    componentWillReceiveProps(nextProps) {
        const { value } = this.props;
        if (!this.isFocus && value !== nextProps.value) {
            this.setState({ inputValue: nextProps.value });
        }
    }
    render() {
        const { inputValue, isValid: isValidState } = this.state;
        const { suffix, disabled, readOnly, placeholder, showValidation, isValid: isValidProp } = this.props;
        let isValid;
        if (isValidProp !== undefined) {
            isValid = isValidProp;
        }
        else if (isValidState !== undefined) {
            isValid = isValidState;
        }
        const className = ClassNames("form-control", Style.input__input, { "is-valid": isValid === true && showValidation }, { "is-invalid": isValid === false && showValidation });
        const classNameSuffix = ClassNames("form-control", Style.input__suffix);
        return (React.createElement("div", { className: "input" },
            React.createElement("input", { placeholder: placeholder, className: className, disabled: disabled, readOnly: readOnly, value: inputValue, onBlur: this.onBlur, onChange: this.onChange, onFocus: this.onFocus }),
            suffix && (React.createElement("div", { className: classNameSuffix },
                React.createElement("span", { style: { color: "transparent" } }, inputValue),
                suffix))));
    }
}
Input.defaultProps = {
    disabled: false,
    showValidation: false,
};
//# sourceMappingURL=Input.js.map