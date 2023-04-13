import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { authenticate } from "../platform/modules/account/asyncActions";
import { toggleChat } from "../platform/modules/chat/actions";
import { showRegisterModal } from "../platform/modules/modals/actions";
import { toggleTheme } from "../platform/modules/utilities/actions";
import Footer from "./Footer";
import Header from "./Header";
const mapStateToProps = ({ chat, account, app }) => {
    const show = chat.show;
    const jwt = account.jwt;
    return {
        showChat: show,
        authenticated: jwt !== null,
        nightMode: app.nightMode,
    };
};
const mapDispatchToProps = (dispatch) => bindActionCreators({
    toggleChat,
    authenticate,
    toggleTheme,
    showRegisterModal,
}, dispatch);
const Layout = ({ children, showChat, authenticated, nightMode, toggleChat, authenticate, toggleTheme, showRegisterModal, }) => {
    const className = showChat ? "chat-open" : "";
    return (React.createElement("div", { id: "app", className: className },
        React.createElement(Header, { showChat: showChat, authenticated: authenticated, nightMode: nightMode, toggleChat: () => toggleChat(true), authenticate: authenticate, toggleTheme: toggleTheme, showRegisterModal: showRegisterModal }),
        children,
        React.createElement(Footer, { showChat: showChat })));
};
export default connect(mapStateToProps, mapDispatchToProps)(Layout);
//# sourceMappingURL=Layout.js.map