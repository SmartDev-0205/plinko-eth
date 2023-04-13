import * as React from "react";
import { Link } from "react-router-dom";
import { ButtonToolbar } from "reactstrap"; // FIXME: Remove
import GameState from "../../../platform/components/state/State";
import { Button, FancyIconButton, Popover, Switch } from "../../../reusable/index";
import Style from "./GameFooter.scss";
export default class GameFooter extends React.Component {
    constructor(props) {
        super(props);
        this.toggleSettingsPopover = () => {
            this.setState({
                showSettingsPopover: !this.state.showSettingsPopover,
            });
        };
        this.state = {
            showSettingsPopover: false,
        };
    }
    render() {
        const { authenticated, showHelp, onToggleHelp, showExpertView, onToggleExpertView, sound, onToggleSound } = this.props;
        const { showSettingsPopover } = this.state;
        return (React.createElement("div", { className: Style.gameFooter },
            React.createElement(ButtonToolbar, null,
                React.createElement(FancyIconButton, { color: "400", id: "settingsPopover", icon: "cog", onClick: this.toggleSettingsPopover }),
                React.createElement(Popover, { target: "settingsPopover", placement: "top", isOpen: showSettingsPopover, toggle: this.toggleSettingsPopover },
                    React.createElement("ul", { className: Style.settings },
                        React.createElement("li", { className: Style.settings__setting },
                            React.createElement("span", { className: Style.settings__key }, "Expert View"),
                            React.createElement(Switch, { size: "sm", enabled: showExpertView, onToggle: onToggleExpertView })),
                        React.createElement("li", { className: Style.settings__setting },
                            React.createElement("span", { className: Style.settings__key }, "Sound"),
                            React.createElement(Switch, { size: "sm", enabled: sound, onToggle: onToggleSound })))),
                React.createElement(FancyIconButton, { color: "400", icon: "question", onClick: () => onToggleHelp(!showHelp) }),
                authenticated && (React.createElement(Button, { tag: Link, to: "/account/affiliate", color: "400", size: "sm" }, "Refer friends"))),
            showExpertView && (React.createElement("div", { className: Style.state },
                React.createElement(GameState, null)))));
    }
}
//# sourceMappingURL=GameFooter.js.map