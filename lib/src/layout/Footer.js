import * as React from "react";
import { withTranslation } from "react-i18next";
import { NavLink as RRNavLink } from "react-router-dom";
import { Container, Nav, NavItem, NavLink } from "reactstrap";
import { CONTACT_URL, DISCORD_URL, GITHUB_URL, NAME, REDDIT_URL, TWITTER_URL, BUILD_DATE } from "../config/config";
import { Col } from "../reusable";
const logo = require("assets/images/logoTop.svg");
import Style from "./Footer.scss";
const Footer = ({ showChat, t }) => {
    const className = showChat ? "container-chat-open" : "";
    return (React.createElement("footer", { className: Style.footer },
        React.createElement("nav", { className: "navbar navbar-dark bg-dark" },
            React.createElement(Container, { className: className },
                React.createElement(Col, { className: Style.brand + " order-sm-2 my-auto", sm: { size: 4 }, xs: 12 },
                    React.createElement(NavLink, { to: "/", tag: RRNavLink },
                        React.createElement("img", { className: Style.logo, src: logo })),
                    React.createElement("span", { className: Style.copyright },
                        "\u00A9",
                        BUILD_DATE.getUTCFullYear(),
                        " ",
                        NAME,
                        ". All Rights Reserved")),
                React.createElement(Col, { className: "my-auto order-sm-1", sm: { size: 4 }, xs: 12 },
                    React.createElement(Nav, { navbar: true, style: { alignItems: "center" } },
                        React.createElement(NavItem, null,
                            React.createElement(NavLink, { href: `mailto:${CONTACT_URL}` }, t("contact"))),
                        React.createElement(NavItem, null,
                            React.createElement(NavLink, { href: GITHUB_URL }, t("GitHub"))),
                        React.createElement(NavItem, null,
                            React.createElement(NavLink, { href: "https://www.begambleaware.org" }, t("gambleAware"))))),
                React.createElement(Col, { className: "my-auto order-sm-3", sm: { size: 4 }, xs: 12 },
                    React.createElement(Nav, { navbar: true, style: { alignItems: "center" } },
                        React.createElement(NavItem, null,
                            React.createElement(NavLink, { href: TWITTER_URL }, t("twitter"))),
                        React.createElement(NavItem, null,
                            React.createElement(NavLink, { href: DISCORD_URL }, t("discord"))),
                        React.createElement(NavItem, null,
                            React.createElement(NavLink, { href: REDDIT_URL }, t("reddit")))))))));
};
export default withTranslation()(Footer);
//# sourceMappingURL=Footer.js.map