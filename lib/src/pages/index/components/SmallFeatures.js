import * as React from "react";
import i18n from "../../../i18n";
import { Col, Container, Row, Section } from "../../../reusable";
import Icon from "../../../reusable/FontAwesomeIcon";
import Style from "./SmallFeatures.scss";
const entries = [
    {
        icon: "balance-scale",
        text: i18n.t("features.secureProvablyFair"),
    },
    {
        icon: "rocket",
        text: i18n.t("features.fastCasino"),
    },
    {
        icon: "user-secret",
        text: i18n.t("features.fullyAnonymous"),
    },
    {
        icon: "gift",
        text: i18n.t("features.recruitUsers"),
    },
    {
        icon: "comments",
        text: i18n.t("features.chatWithUsers"),
    },
    {
        icon: "wallet",
        text: i18n.t("features.supportedWallets"),
    },
];
const Entry = ({ text, icon }) => (React.createElement(Col, { sm: 6, className: Style.entry },
    React.createElement(Icon, { size: "lg", fixedWidth: true, color: "yellow", icon: icon, className: Style.entry__icon }),
    React.createElement("span", null, text)));
const SmallFeatures = () => (React.createElement(Section, { className: Style.smallFeatures },
    React.createElement(Container, null,
        React.createElement(Row, null, entries.map((entry, idx) => (React.createElement(Entry, Object.assign({ key: idx }, entry))))))));
export default SmallFeatures;
//# sourceMappingURL=SmallFeatures.js.map