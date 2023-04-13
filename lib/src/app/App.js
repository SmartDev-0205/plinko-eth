import * as React from "react";
import { connect } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { bindActionCreators } from "redux";
import { ACCOUNT_BALANCE_POLL_INTERVAL } from "../config/config";
import Layout from "../layout/Layout";
import Account from "../pages/account/Account";
import Faq from "../pages/faq/Faq";
import Game from "../pages/games/Game";
import GameSession from "../pages/gameSession/GameSession";
import HallOfFame from "../pages/hallOfFame/HallOfFame";
import Modals from "../platform/components/modals/Modals";
import StateLoader from "../platform/components/state/StateLoader";
import { initUser, loadDefaultData } from "../platform/modules/account/asyncActions";
import { getUser } from "../platform/modules/account/selectors";
import LogoutRoute from "../platform/modules/utilities/LogoutRoute";
import { fetchAccountBalance, fetchAllWeb3, registerAccountChainIdListener, unregisterAccounChainIdListener, } from "../platform/modules/web3/asyncActions";
import TermsOfUse from "../termsOfUse/TermsOfUse";
import RequireAuth from "./RequireAuth";
import BeforeUnload from "./BeforeUnload";
import Notification from "./Notification";
import PathNotFound from "./PathNotFound";
import { Helmet } from "react-helmet";
export const mapStateToProps = (state) => {
    const { account, app, web3, games } = state;
    const { gameState } = games;
    const { notification, nightMode } = app;
    const jwt = account.jwt;
    return {
        jwt,
        userAuth: getUser(state),
        defaultAccount: web3.account,
        notification,
        nightMode,
        gameState,
        web3: web3.web3,
    };
};
const mapDispatchToProps = (dispatch) => (Object.assign(Object.assign({}, bindActionCreators({ fetchAllWeb3, fetchAccountBalance, registerAccountChainIdListener }, dispatch)), { initUser: (address) => initUser(dispatch, address), loadDefaultData: () => loadDefaultData(dispatch) }));
class App extends React.Component {
    constructor(props) {
        super(props);
        this.accountBalanceTimer = null;
        this.setTheme = (nightMode) => {
            if (nightMode) {
                document.documentElement.setAttribute("data-bs-theme", "dark");
            }
            else {
                document.documentElement.setAttribute("data-bs-theme", "light");
            }
        };
        this.state = { web3Timer: null };
        const { jwt, initUser } = this.props;
        if (jwt !== null) {
            initUser(jwt);
        }
    }
    componentDidMount() {
        const { fetchAllWeb3, fetchAccountBalance, loadDefaultData, registerAccountChainIdListener } = this.props;
        loadDefaultData();
        fetchAllWeb3();
        this.accountBalanceTimer = window.setInterval(() => fetchAccountBalance(), ACCOUNT_BALANCE_POLL_INTERVAL);
        registerAccountChainIdListener();
        this.setTheme(this.props.nightMode);
    }
    componentDidUpdate(prevProps) {
        if (prevProps.nightMode !== this.props.nightMode) {
            this.setTheme(this.props.nightMode);
        }
        this.props.fetchAllWeb3();
    }
    componentWillUnmount() {
        unregisterAccounChainIdListener();
        if (this.accountBalanceTimer !== null) {
            clearInterval(this.accountBalanceTimer);
        }
    }
    render() {
        const { userAuth, notification, defaultAccount, gameState } = this.props;
        const logout = userAuth !== null && userAuth.address !== defaultAccount && defaultAccount !== null;
        return (React.createElement(React.Fragment, null,
            React.createElement(Helmet, null,
                React.createElement("title", null, "Plink"),
                React.createElement("meta", { name: "description", content: "Dicether is an Ethereum dice game. It uses a smart contract based state channel implementation to provide a fast, secure and provably fair gambling experience." })),
            React.createElement(Layout, null,
                logout && React.createElement(Navigate, { replace: true, to: "/logout" }),
                React.createElement(Routes, null,
                    React.createElement(Route, { path: "/", element: React.createElement(Game, null) }),
                    React.createElement(Route, { path: "/faq", element: React.createElement(Faq, null) }),
                    React.createElement(Route, { path: "/hallOfFame/*", element: React.createElement(HallOfFame, null) }),
                    React.createElement(Route, { path: "/termsOfUse", element: React.createElement(TermsOfUse, null) }),
                    React.createElement(Route, { path: "/logout", element: React.createElement(LogoutRoute, null) }),
                    React.createElement(Route, { path: "/account/*", element: React.createElement(RequireAuth, { authenticated: userAuth !== null },
                            React.createElement(Account, null)) }),
                    React.createElement(Route, { path: "/gameSession/:gameId", element: React.createElement(GameSession, null) }),
                    React.createElement(Route, { path: "*", element: React.createElement(PathNotFound, { insideContainer: true }) })),
                React.createElement(Modals, null),
                React.createElement(BeforeUnload, { gameState: gameState }),
                React.createElement(Notification, { notification: notification }),
                React.createElement(StateLoader, null))));
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
//# sourceMappingURL=App.js.map