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
import logoImg from "../assets/images/logo.png";

import {useAccount, useConnect, useDisconnect, useNetwork, useSwitchNetwork} from "wagmi";

import {formatUnits, parseEther, parseUnits} from "viem";
import {type WalletClient, useWalletClient} from "wagmi";
import {useWeb3Modal} from "@web3modal/react";

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

const chainId = 1;

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

    const {open} = useWeb3Modal();
    const {isConnected} = useAccount();
    const {chain} = useNetwork();
    const {disconnect} = useDisconnect();
    const {connect} = useConnect();
    const {switchNetwork} = useSwitchNetwork();

    return (
        <div id="app" className={className}>
            <div className="main-container fixed inset-0 h-full w-full opacity-10 object-cover z-0" />
            <div className="connect-wallet-container d-flex z-3">
                <img src={logoImg} alt="logo" className="logo" loading="lazy" />
                <div className="d-flex align-items-center  gap-8">
                    {isConnected ? (
                        chain?.id === Number(chainId) ? (
                            <button className="connect-wallet font-weight-bold text-md" onClick={() => disconnect()}>
                                Disconnect
                            </button>
                        ) : (
                            <button
                                className="connect-wallet font-weight-bold text-md"
                                onClick={() => switchNetwork?.(Number(chainId))}
                            >
                                Switch network
                            </button>
                        )
                    ) : (
                        <button className="connect-wallet font-weight-bold text-md " onClick={() => open()}>
                            Connect Wallet
                        </button>
                    )}
                </div>
            </div>

            {/* <Header
                showChat={showChat}
                authenticated={authenticated}
                nightMode={nightMode}
                connected={connected}
                toggleChat={() => toggleChat(true)}
                authenticate={authenticate}
                toggleTheme={toggleTheme}
                showRegisterModal={showRegisterModal}
            /> */}

            {children}
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
