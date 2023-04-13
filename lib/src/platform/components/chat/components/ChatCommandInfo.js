import * as React from "react";
import { getMatchingCommands } from "../../../modules/chat/commands";
import Style from "./ChatCommandInfo.scss";
class ChatCommandInfo extends React.Component {
    render() {
        const { message } = this.props;
        const matchingCommands = getMatchingCommands(message);
        if (message.length === 0 || matchingCommands.length === 0) {
            return null;
        }
        return (React.createElement("div", { className: Style.chatCommandInfo }, matchingCommands.map((x) => (React.createElement("div", { key: x.name, className: Style.command },
            React.createElement("span", null,
                x.name,
                " ",
                x.params),
            React.createElement("span", null, x.description))))));
    }
}
export default ChatCommandInfo;
//# sourceMappingURL=ChatCommandInfo.js.map