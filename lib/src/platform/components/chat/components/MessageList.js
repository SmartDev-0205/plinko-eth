import * as React from "react";
import Message from "./Message";
import Style from "./MessageList.scss";
class MessageList extends React.PureComponent {
    constructor(props) {
        super(props);
        this.shouldScrollBottom = true;
        this.messageList = null;
    }
    scrollToBottom() {
        window.requestAnimationFrame(() => {
            if (this.messageList !== null) {
                const node = this.messageList;
                node.scrollTop = node.scrollHeight;
            }
        });
    }
    componentDidMount() {
        this.scrollToBottom();
    }
    componentWillUpdate() {
        if (this.messageList !== null) {
            const node = this.messageList;
            this.shouldScrollBottom = Math.abs(node.scrollTop + node.offsetHeight - node.scrollHeight) < 2;
        }
    }
    componentDidUpdate() {
        if (this.shouldScrollBottom) {
            this.scrollToBottom();
        }
    }
    render() {
        const { messages, friends, showBetModal, showUserModal } = this.props;
        return (React.createElement("div", { ref: (ref) => (this.messageList = ref), className: Style.messageList }, messages.slice().map((message) => (React.createElement(Message, { key: message.id, message: message, friends: friends, showBetModal: showBetModal, showUserModal: showUserModal })))));
    }
}
export default MessageList;
//# sourceMappingURL=MessageList.js.map