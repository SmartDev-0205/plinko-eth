import * as React from "react";
import { withTranslation } from "react-i18next";
import { COINBASE_WALLET_URL, METAMASK_URL, TRUST_WALLET_URL } from "../config/config";
import Style from "./MissingWallet.scss";
const MetaMaskFox = require("assets/images/metamask-fox.svg");
const TrustWalletLogo = require("assets/images/trustwallet-logo.svg");
const CoinbaseWalletLogo = require("assets/images/coinbasewallet-logo.svg");
const MissingWallet = ({ t }) => (React.createElement("div", null,
    React.createElement("h4", { className: Style.heading }, "You need a Web3-compatible wallet!"),
    React.createElement("div", { className: "hidden-sm-down " + Style.entry },
        React.createElement("img", { className: Style.logo, src: MetaMaskFox }),
        React.createElement("span", null,
            t("install"),
            " ",
            React.createElement("a", { href: METAMASK_URL }, "MetaMask"))),
    React.createElement("div", { className: "hidden-md-up " + Style.mobileDevice },
        React.createElement("div", { className: Style.entry },
            React.createElement("img", { className: Style.logo, src: TrustWalletLogo }),
            React.createElement("span", null,
                t("use"),
                " ",
                React.createElement("a", { href: TRUST_WALLET_URL }, "Trust Wallet"))),
        React.createElement("span", { className: "text-center" }, t("or")),
        React.createElement("div", { className: Style.entry },
            React.createElement("img", { className: Style.logo, src: CoinbaseWalletLogo }),
            React.createElement("span", null,
                t("use"),
                " ",
                React.createElement("a", { href: COINBASE_WALLET_URL }, "Coinbase Wallet"))))));
export default withTranslation()(MissingWallet);
//# sourceMappingURL=MissingWallet.js.map