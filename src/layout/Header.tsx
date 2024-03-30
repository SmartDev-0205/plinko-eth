import ClassName from "classnames";
import * as React from "react";
import {WithTranslation, withTranslation} from "react-i18next";
import {NavLink as RRNavLink} from "react-router-dom";
import {Collapse, Container, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from "reactstrap";

import {CONTRACT_URL} from "../config/config";
import {IconButton} from "../reusable/index";

import Style from "./Header.scss";

const logo = require("assets/images/logoTop.svg");

import {useWeb3Modal} from "@web3modal/react";
import {useAccount, useConnect, useDisconnect, useNetwork, useSwitchNetwork} from "wagmi";

interface Props extends WithTranslation {
    authenticated: boolean;
    showChat: boolean;
    nightMode: boolean;
    connected: boolean;
    toggleChat(show: boolean): void;
    authenticate(): void;
    showRegisterModal(): void;
    toggleTheme(nightMode: boolean): void;
}

type State = {
    isOpen: boolean;
    showRegister: boolean;
};

class Header extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isOpen: false,
            showRegister: false,
        };
    }

    closeMenu = () => {
        if (this.state.isOpen) {
            this.setState({
                isOpen: !this.state.isOpen,
            });
        }
    };

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    };

    onToggleChat = () => {
        const {showChat, toggleChat} = this.props;
        toggleChat(!showChat);
        this.closeMenu();
    };

    onToggleTheme = () => {
        const {nightMode, toggleTheme} = this.props;
        toggleTheme(!nightMode);
    };

    render() {
        const {authenticated, showRegisterModal, showChat, connected, nightMode, t} = this.props;
        const {isOpen} = this.state;

        const className = ClassName({
            "container-chat-open": showChat,
        });

        return (
            <Navbar id="header" expand="md" dark color="dark" container={false}>
                <Container className={className}>
                    <NavbarBrand className={Style.brand} tag={RRNavLink} to="/" onClick={this.closeMenu}>
                        <div className={Style.brandImageContainer}>
                            <img className={Style.brandImage} src={logo} />
                        </div>
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav navbar></Nav>
                        <Nav className="ms-auto" navbar>
                            <NavItem>
                                <NavLink>
                                    <IconButton
                                        icon={"lightbulb"}
                                        color={nightMode ? "yellow" : "secondary"}
                                        onClick={this.onToggleTheme}
                                    />
                                </NavLink>
                            </NavItem>
                            {/* <NavItem key="2">
                                <NavLink href="#" onClick={open}>
                                    Open web3 modals
                                </NavLink>
                            </NavItem> */}
                            ,
                            {authenticated
                                ? [
                                      <NavItem key="2">
                                          <NavLink tag={RRNavLink} to="/logout">
                                              {t("logout")}
                                          </NavLink>
                                      </NavItem>,
                                  ]
                                : [
                                      <NavItem key="2">
                                          {connected ? (
                                              <NavLink href="#"></NavLink>
                                          ) : (
                                              <NavLink href="#" onClick={this.props.authenticate}>
                                                  {t("Connect")}
                                              </NavLink>
                                          )}
                                      </NavItem>,
                                  ]}
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        );
    }
}

export default withTranslation()(Header);
