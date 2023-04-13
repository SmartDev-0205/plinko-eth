import * as React from "react";
import { Button, Modal } from "../../../reusable";
class ClearState extends React.Component {
    constructor(props) {
        super(props);
        this.onToggleModal = () => {
            this.setState({ showModal: !this.state.showModal });
        };
        this.onClearState = () => {
            this.props.clearState();
            this.onToggleModal();
        };
        this.state = {
            showModal: false,
        };
    }
    render() {
        return (React.createElement("span", null,
            React.createElement(Button, { size: "sm", color: "primary", onClick: this.onToggleModal }, "Clear State"),
            React.createElement(Modal, { isOpen: this.state.showModal, toggle: this.onToggleModal },
                React.createElement("p", null, "Do you really want to delete you local game state! This should be only done if you know what you are doing!"),
                React.createElement("div", null,
                    React.createElement(Button, { color: "danger", onClick: this.onClearState }, "Clear State"),
                    " ",
                    React.createElement(Button, { color: "secondary", onClick: this.onToggleModal }, "Cancel")))));
    }
}
export default ClearState;
//# sourceMappingURL=ClearState.js.map