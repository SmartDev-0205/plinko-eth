import * as React from "react";
import {connect} from "react-redux";
import {bindActionCreators, Dispatch} from "redux";

import {authenticate} from "../platform/modules/account/asyncActions";
import {toggleChat} from "../platform/modules/chat/actions";
import {showRegisterModal} from "../platform/modules/modals/actions";
import {toggleTheme} from "../platform/modules/utilities/actions";
import {State} from "../rootReducer";
import Footer from "./Footer";
import Header from "./Header";

const mapStateToProps = ({chat, account, app, web3}: State) => {
    const show = chat.show;
    const jwt = account.jwt;
    return {
        showChat: show,
        authenticated: jwt !== null,
        nightMode: app.nightMode,
        connected: web3.account ? true : false,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            toggleChat,
            authenticate,
            toggleTheme,
            showRegisterModal,
        },
        dispatch
    );

type OtherProps = {
    children: React.ReactNode;
};

type ReduxProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

type Props = ReduxProps & OtherProps;

const Layout = ({
    children,
    showChat,
    authenticated,
    nightMode,
    connected,
    toggleChat,
    authenticate,
    toggleTheme,
    showRegisterModal,
}: Props) => {
    const className = showChat ? "chat-open" : "";

    console.log("connected------------------>", connected);

    return (
        <div id="app" className={className}>
            <Header
                showChat={showChat}
                authenticated={authenticated}
                nightMode={nightMode}
                connected={connected}
                toggleChat={() => toggleChat(true)}
                authenticate={authenticate}
                toggleTheme={toggleTheme}
                showRegisterModal={showRegisterModal}
            />
            {children}
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
