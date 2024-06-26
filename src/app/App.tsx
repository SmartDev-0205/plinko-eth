import * as React from "react";
import {connect} from "react-redux";
import {Navigate, Route, Routes} from "react-router-dom";

import {bindActionCreators} from "redux";
import {ACCOUNT_BALANCE_POLL_INTERVAL} from "../config/config";
import Layout from "../layout/Layout";
import Account from "../pages/account/Account";
import Faq from "../pages/faq/Faq";
import Game from "../pages/games/Game";
import GameSession from "../pages/gameSession/GameSession";
import HallOfFame from "../pages/hallOfFame/HallOfFame";
import Index from "../pages/index/Index";
import Modals from "../platform/components/modals/Modals";
import StateLoader from "../platform/components/state/StateLoader";
import {initUser, loadDefaultData} from "../platform/modules/account/asyncActions";
import {getUser} from "../platform/modules/account/selectors";
import {
    fetchAccountBalance,
    fetchAllWeb3,
    registerAccountChainIdListener,
    unregisterAccounChainIdListener,
} from "../platform/modules/web3/asyncActions";
import {State as RootState} from "../rootReducer";
import TermsOfUse from "../termsOfUse/TermsOfUse";
import {Dispatch} from "../util/util";
import RequireAuth from "./RequireAuth";
import BeforeUnload from "./BeforeUnload";
import Notification from "./Notification";
import PathNotFound from "./PathNotFound";
import {Helmet} from "react-helmet";

import {Web3Modal} from "@web3modal/react";
import {configureChains, createConfig, WagmiConfig} from "wagmi";
import {mainnet} from "wagmi/chains";
import {EthereumClient, w3mConnectors, w3mProvider} from "@web3modal/ethereum";

const projectId = "1e423b64330f16ace89e2629454e41a5";
console.log("projectId", projectId);
const chains = [mainnet];
const {publicClient} = configureChains(chains, [w3mProvider({projectId})]);
const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({projectId, chains}),
    publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

export const mapStateToProps = (state: RootState) => {
    const {account, app, web3, games} = state;
    const {gameState} = games;
    const {notification, nightMode} = app;
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

const mapDispatchToProps = (dispatch: Dispatch) => ({
    ...bindActionCreators({fetchAllWeb3, fetchAccountBalance, registerAccountChainIdListener}, dispatch),
    initUser: (address: string) => initUser(dispatch, address),
    loadDefaultData: () => loadDefaultData(dispatch),
});

export type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

class App extends React.Component<Props> {
    private accountBalanceTimer: number | null = null;

    constructor(props: Props) {
        super(props);
        this.state = {web3Timer: null};

        const {jwt, initUser} = this.props;

        if (jwt !== null) {
            initUser(jwt);
        }
    }

    componentDidMount() {
        const {fetchAllWeb3, fetchAccountBalance, loadDefaultData, registerAccountChainIdListener} = this.props;

        loadDefaultData();

        fetchAllWeb3();
        this.accountBalanceTimer = window.setInterval(() => fetchAccountBalance(), ACCOUNT_BALANCE_POLL_INTERVAL);
        registerAccountChainIdListener();

        this.setTheme(true);
    }

    componentDidUpdate(prevProps: Props) {
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

    private setTheme = (nightMode: boolean) => {
        if (nightMode) {
            document.documentElement.setAttribute("data-bs-theme", "dark");
        } else {
            document.documentElement.setAttribute("data-bs-theme", "light");
        }
    };

    render() {
        const {userAuth, notification, defaultAccount, gameState} = this.props;

        const logout = userAuth !== null && userAuth.address !== defaultAccount && defaultAccount !== null;

        return (
            <>
                <Helmet>
                    <title>Plink</title>
                    <meta
                        name="description"
                        content="GuardAI Plinko"
                    />
                </Helmet>
                <WagmiConfig config={wagmiConfig}>
                    <Layout>
                        <Routes>
                            <Route path="/" element={<Game />} />
                        </Routes>
                        <Modals />
                        <BeforeUnload gameState={gameState} />
                        <Notification notification={notification} />
                        <StateLoader />
                    </Layout>
                </WagmiConfig>
                <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
            </>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
