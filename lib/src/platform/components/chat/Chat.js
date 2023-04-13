import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getUser } from "../../modules/account/selectors";
import { addMessage, toggleChat } from "../../modules/chat/actions";
import { sendMessage } from "../../modules/chat/asyncActions";
import { showBetModal, showUserModal } from "../../modules/modals/actions";
import { showErrorMessage } from "../../modules/utilities/actions";
import Friends from "../friend/Friends";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MessageList from "./components/MessageList";
import OpenButton from "./components/OpenButton";
import Style from "./Chat.scss";
const MAX_MESSAGE_LENGTH = 140;
const mapStateToProps = (state) => {
    const { show, messages, numUsers } = state.chat;
    const { friends } = state.friend;
    return {
        userAuth: getUser(state),
        show,
        messages,
        numUsers,
        friends,
    };
};
const mapDispatchToProps = (dispatch) => bindActionCreators({
    showErrorMessage,
    sendMessage,
    addMessage,
    toggleChat,
    showBetModal,
    showUserModal,
}, dispatch);
class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.toggleFriends = (showFriends) => {
            this.setState({ showFriends });
        };
        this.onMessageSend = (message) => {
            const { showErrorMessage, sendMessage, userAuth } = this.props;
            if (message.length === 0) {
                return;
            }
            if (!userAuth) {
                showErrorMessage("You need to log in to chat!");
                return;
            }
            sendMessage(message);
        };
        this.state = { showFriends: false };
    }
    render() {
        const { toggleChat, show, messages, numUsers, friends, showBetModal, showUserModal } = this.props;
        const { showFriends } = this.state;
        return (React.createElement("div", { id: "chat-components" }, show ? (React.createElement("div", { className: Style.chat },
            React.createElement(Header, { onClose: () => {
                    toggleChat(false);
                }, onToggleFriends: this.toggleFriends }),
            showFriends ? (React.createElement(Friends, null)) : (React.createElement(MessageList, { messages: messages, friends: friends, showBetModal: (betId) => showBetModal({ betId }), showUserModal: (userName) => showUserModal({ userName }) })),
            React.createElement(Footer, { maxMessageLength: MAX_MESSAGE_LENGTH, numUsers: numUsers, onMessageSend: this.onMessageSend }))) : (React.createElement(OpenButton, { onOpen: () => {
                toggleChat(true);
            } }))));
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
//# sourceMappingURL=Chat.js.map