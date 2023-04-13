import ClassNames from "classnames";
import dayjs from "dayjs";
import * as React from "react";
import Emoji from "react-emoji-render";
import { Link } from "react-router-dom";
import UserMenu from "./UserMenu";
import UserType from "./UserType";
import reactStringReplace from "react-string-replace";
import { isValidUserName } from "../../../modules/account/util";
import Style from "./Message.scss";
const BET_REGEX = /Bet:(\d+)/;
const USER_REGEX = /(?:User:(\S+))/;
const USER_MENTION_REGEX = /(?:^|\s)@(\S+)/;
const LINK_REGEX = /(https?:\/\/\S+)/;
const PORT = window.location.port ? `:${window.location.port}` : "";
const HOST = `${window.location.protocol}//${window.location.hostname}${PORT}`;
const LOCAL_LINK_REGEX = new RegExp(`${HOST}/(\\S+)`);
const ChatButton = ({ name, onClick }) => (React.createElement("button", { className: Style.message_button, onClick: onClick }, name));
function processMessage(message, showBetModal, showUserModal) {
    let res = reactStringReplace(message, BET_REGEX, (match, i) => (React.createElement(ChatButton, { key: match + i, name: `Bet:${match}`, onClick: () => showBetModal(Number.parseInt(match, 10)) })));
    res = reactStringReplace(res, USER_REGEX, (match, i) => {
        if (!isValidUserName(match)) {
            return `User:${match}`;
        }
        return React.createElement(ChatButton, { key: match + i, name: `User:${match}`, onClick: () => showUserModal(match) });
    });
    res = reactStringReplace(res, USER_MENTION_REGEX, (match, i, offset) => {
        if (!isValidUserName(match)) {
            return `@${match}`;
        }
        if (offset === 0) {
            return React.createElement(ChatButton, { key: match + i, name: `@${match}`, onClick: () => showUserModal(match) });
        }
        else {
            return [" ", React.createElement(ChatButton, { key: match + i, name: `@${match}`, onClick: () => showUserModal(match) })];
        }
    });
    res = reactStringReplace(res, LOCAL_LINK_REGEX, (match, i) => (React.createElement(Link, { key: match + i, to: `/${match}` }, `${HOST}/${match}`)));
    return reactStringReplace(res, LINK_REGEX, (match, i) => (React.createElement("a", { key: match + i, target: "_blank", href: match, rel: "noreferrer" }, match)));
}
class Message extends React.Component {
    constructor(props) {
        super(props);
        this.toggleUserPopover = () => {
            this.setState({
                showUserPopover: !this.state.showUserPopover,
            });
        };
        this.state = {
            showUserPopover: false,
        };
    }
    render() {
        const { message, friends, showBetModal, showUserModal } = this.props;
        const { user } = message;
        const messageClass = ClassNames(Style.message, {
            [Style.message_bot]: user.userType === "BOT",
        });
        const usernameClass = ClassNames(Style.username, {
            [Style.username_friend]: friends.findIndex((friend) => friend.user.address === user.address) !== -1,
        });
        const userName = React.createElement("span", { className: usernameClass },
            user.username,
            ":");
        return (React.createElement("div", { id: `messageEntry${message.timestamp}`, className: Style.messageEntry },
            React.createElement("div", { style: { minWidth: 0 } },
                React.createElement("div", { className: Style.user },
                    React.createElement(UserType, { userType: user.userType }),
                    user.userType !== "BOT" ? (React.createElement(UserMenu, { user: user, messageId: message.id, button: userName })) : (React.createElement("span", null, userName))),
                !message.deleted ? (React.createElement("span", { className: messageClass }, processMessage(message.message, showBetModal, showUserModal).map((x, i) => typeof x === "string" && x.length > 0 ? React.createElement(Emoji, { key: i, text: x }) : x))) : (React.createElement("span", null, "[removed]"))),
            React.createElement("span", { className: Style.time }, dayjs(message.timestamp).format("HH:mm"))));
    }
}
export default Message;
//# sourceMappingURL=Message.js.map