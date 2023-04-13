import * as React from "react";
import { SESSION_TIMEOUT } from "../../../config/config";
import { Button, Modal } from "../../../reusable";
class ConflictEnd extends React.Component {
    constructor(props) {
        super(props);
        this.onToggleModal = () => {
            this.setState({ showModal: !this.state.showModal });
        };
        this.onConflictEnd = () => {
            this.props.conflictEnd();
            this.onToggleModal();
        };
        this.state = {
            showModal: false,
        };
    }
    render() {
        return (React.createElement("span", null,
            React.createElement(Button, { size: "sm", color: "primary", onClick: this.onToggleModal }, "Conflict End"),
            React.createElement(Modal, { isOpen: this.state.showModal, toggle: this.onToggleModal },
                React.createElement("p", null,
                    "It should be almost never needed to do this. It is only necessary if the server stops responding. This will push your current game state to the smart contract. If the server doesn't publish any newer game state within the next ",
                    SESSION_TIMEOUT,
                    " you can force the game session termination."),
                React.createElement("div", null,
                    React.createElement(Button, { color: "danger", onClick: this.onConflictEnd }, "Conflict End"),
                    " ",
                    React.createElement(Button, { color: "secondary", onClick: this.onToggleModal }, "Cancel")))));
    }
}
export default ConflictEnd;
//# sourceMappingURL=ConflictEnd.js.map