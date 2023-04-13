import * as React from "react";
import { SESSION_TIMEOUT } from "../../../../config/config";
import { Button, Ether, Form, FormGroup, Input, Label, Modal, ValueInput } from "../../../../reusable";
import { generateSeed } from "../../../../util/crypto";
function roundValue(value, step) {
    return Math.floor(value / step) * step;
}
export default class CreateGameModal extends React.Component {
    constructor(props) {
        super(props);
        this.createGame = (e) => {
            const { onCreateGame, onClose } = this.props;
            const { value, seed } = this.state;
            onCreateGame(value, seed);
            onClose();
            e.preventDefault();
        };
        this.onValueChange = (value) => {
            this.setState({ value });
        };
        const balance = props.web3State.balance;
        const val = balance !== null ? Math.min(props.maxValue, balance) : props.maxValue;
        this.state = {
            value: roundValue(val, props.minValue),
            seed: generateSeed(),
        };
    }
    static getDerivedStateFromProps(props, state) {
        const balance = props.web3State.balance;
        return balance === null || balance >= state.value ? null : { value: roundValue(balance, props.minValue) };
    }
    render() {
        const { minValue, maxValue, isOpen, onClose, web3State } = this.props;
        const { value, seed } = this.state;
        const accountBalance = web3State.balance;
        let toLowBalance = false;
        let max = maxValue;
        if (accountBalance !== null) {
            toLowBalance = accountBalance < minValue;
            max = roundValue(Math.min(maxValue, accountBalance), minValue);
        }
        return (React.createElement(Modal, { isOpen: isOpen, toggle: onClose },
            React.createElement("h3", { className: "text-center" }, "Create Game Session"),
            accountBalance === null ? (React.createElement("p", { className: "text-warning" }, "Failed reading your account balance!")) : (React.createElement("p", null,
                "Your Balance: ",
                React.createElement(Ether, { gwei: accountBalance }),
                " ETH")),
            toLowBalance ? (React.createElement("p", { className: "text-danger" },
                "Too low balance on your account! You need at least ",
                React.createElement(Ether, { gwei: minValue, precision: 2 }),
                " ETH")) : (React.createElement(Form, { onSubmit: this.createGame },
                React.createElement(FormGroup, null,
                    React.createElement(Label, { for: "value" },
                        "Amount to deposit (between ",
                        React.createElement(Ether, { gwei: minValue, precision: 2 }),
                        "and ",
                        React.createElement(Ether, { gwei: max, precision: 2 }),
                        " ETH)"),
                    React.createElement(ValueInput, { id: "value", min: minValue, max: max, step: minValue, value: value, onChange: this.onValueChange })),
                React.createElement(FormGroup, null,
                    React.createElement(Label, { for: "seed" }, "Your seed used to generate the hash chain"),
                    React.createElement(Input, { disabled: true, value: seed })),
                React.createElement(FormGroup, { className: "text-warning" },
                    "The data required for the game session is stored local on your browser. So",
                    " ",
                    React.createElement("em", null, "don't clear your browser history"),
                    " as long as the game session is active. If your are done with playing you must end the game session. If you don't end the game session, we will end it after waiting ",
                    SESSION_TIMEOUT,
                    " hours and you will need to pay a fine!"),
                React.createElement(FormGroup, null,
                    React.createElement(Button, { type: "submit", color: "primary", disabled: toLowBalance }, "Deposit"))))));
    }
}
//# sourceMappingURL=CreateGameModal.js.map