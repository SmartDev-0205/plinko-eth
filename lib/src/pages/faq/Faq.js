import * as React from "react";
import { Trans, withTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { BUGS_URL, COINBASE_WALLET_URL, CONTACT_URL, CONTRACT_URL, GITHUB_URL, METAMASK_URL, TRUST_WALLET_URL, } from "../../config/config";
import { Container } from "../../reusable";
import Style from "./Faq.scss";
const Faq = ({ t }) => (React.createElement(React.Fragment, null,
    React.createElement(Helmet, null,
        React.createElement("title", null, "Faq - Dicether"),
        React.createElement("meta", { name: "description", content: "What is Dicether? Why is Dicether better than other casinos?" })),
    React.createElement(Container, null,
        React.createElement("h2", { className: Style.heading }, t("FAQ")),
        React.createElement("div", { className: Style.entry },
            React.createElement("h5", { className: Style.subheading }, t("faq.whatIsDicether.question")),
            React.createElement("p", null, t("faq.whatIsDicether.answer"))),
        React.createElement("div", { className: Style.entry },
            React.createElement("h5", { className: Style.subheading }, t("faq.betterThanOtherSolution.question")),
            React.createElement("p", null, t("faq.betterThanOtherSolution.answer"))),
        React.createElement("div", { className: Style.entry },
            React.createElement("h5", { className: Style.subheading }, t("faq.whatIsSecure.question")),
            React.createElement(Trans, { i18nKey: "faq.whatIsSecure.answer" },
                React.createElement("p", null, "When you start a game session we and you, the customer, generate a hash chain and send the last entry to the smart contract. Additional to the hash value, you send your funds for playing, which will be securely locked in the smart contract (we can not access your money). For every round playing dice a previous entry of your and our hash chain is combined and from that the resulting dice roll generated! The result is verified and, if everything is ok, signed by you and us. The next round can start. If you are finished with playing the final result is signed and send to contract, which sends back your funds plus your profit or minus your loss."),
                React.createElement("p", null, "So the only interaction with the blockchain is happening during starting and ending the game session. Between you can play as many games as you want. No blockchain interaction is necessary!"),
                React.createElement("p", null,
                    "The smart contract is verified at ",
                    React.createElement("a", { href: CONTRACT_URL }, "Etherscan"),
                    ". So you can check yourself that everything is working as described. To have a look at our front-end source code you can visit our ",
                    React.createElement("a", { href: GITHUB_URL }, "github"),
                    " repositories."))),
        React.createElement("div", { className: Style.entry },
            React.createElement("h5", { className: Style.subheading }, t("faq.houseEdge.question")),
            React.createElement("p", null, t("faq.houseEdge.answer"))),
        React.createElement("div", { className: Style.entry },
            React.createElement("h5", { className: Style.subheading }, t("faq.howToRegister.question")),
            React.createElement("p", null, t("faq.howToRegister.answer"))),
        React.createElement("div", { className: Style.entry },
            React.createElement("h5", { className: Style.subheading }, t("faq.cantPlaceBet.question")),
            React.createElement("p", null,
                React.createElement(Trans, { i18nKey: "faq.cantPlaceBet.answer" },
                    "To play you need to be logged in and you need to have installed",
                    React.createElement("a", { href: METAMASK_URL }, "Metamask"),
                    ", use ",
                    React.createElement("a", { href: TRUST_WALLET_URL }, "Trust Wallet"),
                    " or use",
                    React.createElement("a", { href: COINBASE_WALLET_URL }, "Coinbase Wallet (Toshi)"),
                    "."))),
        React.createElement("div", { className: Style.entry },
            React.createElement("h5", { className: Style.subheading }, t("faq.howToBecomeAffiliate.question")),
            React.createElement("p", null,
                React.createElement(Trans, { i18nKey: "faq.howToBecomeAffiliate.answer" },
                    "We have created a short article describing, how to generate referral links. See",
                    React.createElement("a", { href: "https://medium.com/@dicether/how-to-create-a-dicether-affiliate-campaign-705f4be06c54" }, "How to generate a affiliate campaign"),
                    "for a short description."))),
        React.createElement("div", { className: Style.entry },
            React.createElement("h5", null, t("faq.iFoundABug.question")),
            React.createElement("p", null,
                React.createElement(Trans, { i18nKey: "faq.iFoundABug.answer" },
                    "Please report it to ",
                    React.createElement("a", { href: `mailto:${BUGS_URL}` }, BUGS_URL),
                    "."))),
        React.createElement("div", { className: Style.entry },
            React.createElement("h5", { className: Style.subheading }, t("faq.contact.question")),
            React.createElement("p", null,
                React.createElement(Trans, { i18nKey: "faq.contact.answer" },
                    "You can mail us: ",
                    React.createElement("a", { href: `mailto:${CONTACT_URL}` }, CONTACT_URL),
                    "."))))));
export default withTranslation()(Faq);
//# sourceMappingURL=Faq.js.map