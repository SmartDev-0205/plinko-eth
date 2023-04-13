import * as React from "react";
import { withTranslation } from "react-i18next";
import Textarea from "react-textarea-autosize";
import { Button } from "../../../../reusable/index";
import ChatCommandInfo from "./ChatCommandInfo";
import Style from "./Footer.scss";
import { useState } from "react";
const Footer = ({ maxMessageLength, numUsers, onMessageSend, t }) => {
    const [message, setMessage] = useState("");
    const onMessageChange = (message) => {
        if (message.length > maxMessageLength) {
            message = message.slice(0, maxMessageLength);
        }
        setMessage(message);
    };
    return (React.createElement("div", { className: Style.footer },
        React.createElement(ChatCommandInfo, { message: message }),
        React.createElement("div", { className: "form-group" },
            React.createElement(Textarea, { className: "form-control " + Style.textarea, value: message, onChange: (e) => onMessageChange(e.target.value), onKeyDown: (e) => {
                    if (e.key === "Enter") {
                        // send on enter key press
                        onMessageSend(message);
                        setMessage("");
                        e.preventDefault();
                    }
                }, placeholder: t("typeMessage"), rows: 1 })),
        React.createElement("div", { className: Style.footerFooter },
            React.createElement(Button, { color: "primary", onClick: () => onMessageSend(message) }, t("sendMessage")),
            React.createElement("span", { className: Style.online },
                "online: ",
                numUsers))));
};
export default withTranslation()(Footer);
//# sourceMappingURL=Footer.js.map