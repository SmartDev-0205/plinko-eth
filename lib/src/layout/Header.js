import ClassName from "classnames";
import * as React from "react";
import { withTranslation } from "react-i18next";
import { NavLink as RRNavLink } from "react-router-dom";
import { Collapse, Container, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from "reactstrap";
import { CONTRACT_URL } from "../config/config";
import { IconButton } from "../reusable/index";
import Style from "./Header.scss";
const logo = require("assets/images/logoTop.svg");
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.closeMenu = () => {
            if (this.state.isOpen) {
                this.setState({
                    isOpen: !this.state.isOpen,
                });
            }
        };
        this.toggle = () => {
            this.setState({
                isOpen: !this.state.isOpen,
            });
        };
        this.onToggleChat = () => {
            const { showChat, toggleChat } = this.props;
            toggleChat(!showChat);
            this.closeMenu();
        };
        this.onToggleTheme = () => {
            const { nightMode, toggleTheme } = this.props;
            toggleTheme(!nightMode);
        };
        this.state = {
            isOpen: false,
            showRegister: false,
        };
    }
    render() {
        const { authenticated, showRegisterModal, showChat, nightMode, t } = this.props;
        const { isOpen } = this.state;
        const className = ClassName({
            "container-chat-open": showChat,
        });
        return (React.createElement(Navbar, { id: "header", expand: "md", dark: true, color: "dark", container: false },
            React.createElement(Container, { className: className },
                React.createElement(NavbarBrand, { className: Style.brand, tag: RRNavLink, to: "/", onClick: this.closeMenu },
                    React.createElement("div", { className: Style.brandImageContainer },
                        React.createElement("img", { className: Style.brandImage, src: logo }))),
                React.createElement(NavbarToggler, { onClick: this.toggle }),
                React.createElement(Collapse, { isOpen: isOpen, navbar: true },
                    React.createElement(Nav, { navbar: true },
                        React.createElement(NavItem, null,
                            React.createElement(NavLink, { to: "/faq", tag: RRNavLink, onClick: this.closeMenu }, t("FAQ"))),
                        React.createElement(NavItem, null,
                            React.createElement(NavLink, { to: "/hallOfFame/weekly", tag: RRNavLink, onClick: this.closeMenu }, t("hallOfFame"))),
                        React.createElement(NavItem, null,
                            React.createElement(NavLink, { target: "_blank", href: CONTRACT_URL }, t("contract"))),
                        React.createElement(NavItem, { className: "d-md-none" },
                            React.createElement(NavLink, { href: "#", onClick: this.onToggleChat }, t("chat")))),
                    React.createElement(Nav, { className: "ms-auto", navbar: true },
                        React.createElement(NavItem, null,
                            React.createElement(NavLink, null,
                                React.createElement(IconButton, { icon: "lightbulb", color: nightMode ? "yellow" : "secondary", onClick: this.onToggleTheme }))),
                        authenticated
                            ? [
                                React.createElement(NavItem, { key: "1" },
                                    React.createElement(NavLink, { tag: RRNavLink, to: "/account/stats" }, t("account"))),
                                React.createElement(NavItem, { key: "2" },
                                    React.createElement(NavLink, { tag: RRNavLink, to: "/logout" }, t("logout"))),
                            ]
                            : [
                                React.createElement(NavItem, { key: "1" },
                                    React.createElement(NavLink, { id: "register", href: "#", onClick: showRegisterModal }, t("register"))),
                                React.createElement(NavItem, { key: "2" },
                                    React.createElement(NavLink, { href: "#", onClick: this.props.authenticate }, t("login"))),
                            ])))));
    }
}
export default withTranslation()(Header);
//# sourceMappingURL=Header.js.map