import * as React from "react";
import { withTranslation } from "react-i18next";
import { Button, Container } from "../../../reusable";
import Style from "./Overview.scss";
const Overview = ({ loggedIn, showRegisterModal, t }) => (React.createElement("div", { className: Style.overview },
    React.createElement(Container, null,
        React.createElement("div", { className: Style.jumbotron + " rounded px-3 px-sm-4 py-3 py-sm-5" },
            React.createElement("h1", null, t("theStateChannelCasino")),
            !loggedIn && (React.createElement(Button, { color: "primary", size: "lg", onClick: showRegisterModal }, t("JoinNow"))),
            React.createElement("span", { className: Style.info }, t("noDetailsRequired"))))));
export default withTranslation()(Overview);
//# sourceMappingURL=Overview.js.map