import * as React from "react";
import { Button, Modal } from "../../../reusable";
class UserEndGame extends React.Component {
    constructor(props) {
        super(props);
        this.onToggleModal = () => {
            this.setState({ showModal: !this.state.showModal });
        };
        this.onUserEndGame = () => {
            this.props.userEndGame();
            this.onToggleModal();
        };
        this.state = {
            showModal: false,
        };
    }
    render() {
        return (React.createElement("span", null,
            React.createElement(Button, { size: "sm", color: "primary", onClick: this.onToggleModal }, "Send userEndGame transaction"),
            React.createElement(Modal, { isOpen: this.state.showModal, toggle: this.onToggleModal },
                React.createElement("p", null, "It should be almost never needed to do this. Normally the server sends the end transaction. But you can send the transaction, too."),
                React.createElement("div", null,
                    React.createElement(Button, { color: "danger", onClick: this.onUserEndGame }, "Send userEndGame transaction"),
                    " ",
                    React.createElement(Button, { color: "secondary", onClick: this.onToggleModal }, "Cancel")))));
    }
}
export default UserEndGame;
//# sourceMappingURL=UserEndGame.js.map