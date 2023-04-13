import * as React from "react";
import { withTranslation } from "react-i18next";
import { FontAwesomeIcon } from "../../../../reusable/index";
import Style from "./Header.scss";
const Header = ({ onClose, onToggleFriends, t }) => (React.createElement("div", { className: Style.header },
    React.createElement("span", { className: Style.toggleFriends, onClick: () => onToggleFriends(true) },
        React.createElement(FontAwesomeIcon, { icon: "user-friends" })),
    React.createElement("span", { className: Style.title, onClick: () => onToggleFriends(false) },
        React.createElement(FontAwesomeIcon, { icon: "comments" }),
        t("chat")),
    React.createElement("button", { type: "button", className: "btn-close", "aria-label": "Close Chat", onClick: onClose })));
export default withTranslation()(Header);
//# sourceMappingURL=Header.js.map