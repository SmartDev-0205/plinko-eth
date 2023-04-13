import * as React from "react";
import { withTranslation } from "react-i18next";
import { Button, FontAwesomeIcon } from "../../../../reusable/index";
import Style from "./OpenButton.scss";
const OpenButton = ({ onOpen, t }) => (React.createElement(Button, { color: "primary", className: Style.openButton + " d-none d-md-block", onClick: onOpen },
    React.createElement(FontAwesomeIcon, { icon: "comments" }),
    " ",
    t("openChat")));
export default withTranslation()(OpenButton);
//# sourceMappingURL=OpenButton.js.map