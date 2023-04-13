import * as React from "react";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Container, Section } from "../../../reusable";
const DiceLogo = require("assets/images/diceLogo.svg");
const ChooseFrom12Logo = require("assets/images/chooseFrom12Logo.svg");
// const Question = require("assets/images/question.svg");
const FlipACoinLogo = require("assets/images/flipACoinLogo.svg");
const KenoLogo = require("assets/images/kenoLogo.svg");
const PlinkoLogo = require("assets/images/plinkoLogo.svg");
const WheelLogo = require("assets/images/wheelLogo.svg");
import Style from "./Games.scss";
const Games = ({ t }) => (React.createElement(Section, { className: Style.games },
    React.createElement(Container, null,
        React.createElement("h2", { className: "text-center" }, "Games"),
        React.createElement("div", { className: Style.gamesList },
            React.createElement(Link, { to: "/games/dice", className: Style.gameLink + " " + Style.gameLink_active },
                React.createElement("img", { src: DiceLogo, className: Style.img }),
                React.createElement("h5", { className: Style.text }, t("ClassicDice"))),
            React.createElement(Link, { to: "/games/chooseFrom12", className: Style.gameLink + " " + Style.gameLink_active },
                React.createElement("img", { src: ChooseFrom12Logo, className: Style.img }),
                React.createElement("h5", { className: Style.text }, t("ChooseFrom12"))),
            React.createElement(Link, { to: "/games/flipACoin", className: Style.gameLink + " " + Style.gameLink_active },
                React.createElement("img", { src: FlipACoinLogo, className: Style.img }),
                React.createElement("h5", { className: Style.text }, t("FlipACoin")))),
        React.createElement("div", { className: Style.gamesList },
            React.createElement(Link, { to: "/games/keno", className: Style.gameLink + " " + Style.gameLink_active },
                React.createElement("img", { src: KenoLogo, className: Style.img }),
                React.createElement("h5", { className: Style.text }, t("Keno"))),
            React.createElement(Link, { to: "/games/wheel", className: Style.gameLink + " " + Style.gameLink_active },
                React.createElement("img", { src: WheelLogo, className: Style.img }),
                React.createElement("h5", { className: Style.text }, "Wheel")),
            React.createElement(Link, { to: "/games/plinko", className: Style.gameLink + " " + Style.gameLink_active },
                React.createElement("img", { src: PlinkoLogo, className: Style.img }),
                React.createElement("h5", { className: Style.text }, t("Plinko")))))));
export default withTranslation()(Games);
//# sourceMappingURL=Games.js.map