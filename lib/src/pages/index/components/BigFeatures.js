import ClassNames from "classnames";
import * as React from "react";
import i8n from "../../../i18n";
import { Col, Container, Row, Section } from "../../../reusable";
import Style from "./BigFeatures.scss";
const anonymous = require("assets/images/anonymous.svg");
const fair = require("assets/images/fair.svg");
const fast = require("assets/images/fast.svg");
const entries = [
    {
        img: fair,
        heading: i8n.t("bigFeatures.fair.shortDescription"),
        text: i8n.t("bigFeatures.fair.longDescription"),
    },
    {
        img: fast,
        heading: i8n.t("bigFeatures.fast.shortDescription"),
        text: i8n.t("bigFeatures.fast.longDescription"),
    },
    {
        img: anonymous,
        heading: i8n.t("bigFeatures.anonymous.shortDescription"),
        text: i8n.t("bigFeatures.anonymous.longDescription"),
    },
];
const Entry = ({ idx, entry }) => {
    const classNameImgCol = ClassNames("text-center mb-4 mb-sm-0", { "order-sm-last": idx % 2 === 0 });
    return (React.createElement(Row, { className: Style.entry },
        React.createElement(Col, { md: 6, className: classNameImgCol },
            React.createElement("img", { src: entry.img, width: 150 })),
        React.createElement(Col, { md: 6 },
            React.createElement("h3", { className: "text-center" }, entry.heading),
            React.createElement("p", null, entry.text))));
};
const BigFeatures = () => (React.createElement(Section, { className: Style.features },
    React.createElement(Container, null,
        React.createElement("h2", { className: "text-center" }, "Fast, Secure and Fair"),
        entries.map((entry, idx) => (React.createElement(Entry, { key: idx, entry: entry, idx: idx }))))));
export default BigFeatures;
//# sourceMappingURL=BigFeatures.js.map