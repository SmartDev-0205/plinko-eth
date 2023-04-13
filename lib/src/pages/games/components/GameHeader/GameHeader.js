import * as React from "react";
import Countdown from "react-countdown";
import { COINBASE_WALLET_URL, MAX_GAME_SESSION_VALUE, METAMASK_URL, MIN_GAME_SESSION_VALUE, NETWORK_NAME, SESSION_TIMEOUT, TRUST_WALLET_URL, } from "../../../../config/config";
import { validChainId } from "../../../../platform/modules/games/state/asyncActions";
import { Ether, Tooltip } from "../../../../reusable";
import { Button, FontAwesomeIcon } from "../../../../reusable/index";
import CreateGameModal from "./CreateGameModal";
import Style from "./GameHeader.scss";
const ForceEndRender = ({ hours, minutes, seconds, completed, onForceEnd }) => {
    if (completed) {
        return (React.createElement("div", null,
            React.createElement("span", null, "The server didn't respond. You can force the game session termination!"),
            React.createElement(Button, { size: "sm", onClick: onForceEnd }, "Force Termination")));
    }
    else {
        return (React.createElement("div", null,
            React.createElement("span", null,
                "You created a game session dispute. If the server doesn't respond, you can force the termination of the game session in ",
                hours,
                ":",
                minutes,
                ":",
                seconds,
                ".")));
    }
};
const ForceEnd = ({ endTime, onForceEnd }) => {
    const sessionTimeout = SESSION_TIMEOUT * 3600 * 1000 + new Date(endTime).getTime(); // convert to milliseconds
    return (React.createElement(Countdown, { renderer: (props) => React.createElement(ForceEndRender, Object.assign({}, props, { onForceEnd: onForceEnd })), date: sessionTimeout }));
};
export default class GameHeader extends React.Component {
    constructor(props) {
        super(props);
        this.onClose = () => {
            this.setState({ modalIsOpen: false });
        };
        this.onShow = () => {
            this.setState({ modalIsOpen: true });
        };
        this.state = {
            modalIsOpen: false,
        };
        this.endTransactionRef = React.createRef();
    }
    render() {
        const { gameState, onStartGame, onEndGame, web3State, onSeedRequest, onConflictEnd, onForceEnd } = this.props;
        const { modalIsOpen } = this.state;
        // special case creating: handle as ended as long as we didn't get transaction hash
        const status = gameState.status;
        const isGameEnded = status === "ENDED" || (status === "CREATING" && !gameState.createTransactionHash);
        const isGameActive = gameState.status === "ACTIVE";
        const isGameCreating = gameState.status === "CREATING" && gameState.createTransactionHash;
        const placedBet = gameState.status === "PLACED_BET";
        const lastGameTransactionHash = gameState.endTransactionHash;
        const serverInitiatedEnd = gameState.status === "SERVER_CONFLICT_ENDED";
        const isUserConflictEnded = gameState.status === "USER_CONFLICT_ENDED";
        const isConflictEnding = gameState.status === "USER_INITIATED_CONFLICT_END";
        const isForceEnding = gameState.status === "USER_INITIATED_FORCE_END";
        const transactionUrlNetPrefix = NETWORK_NAME === "Main" ? "" : `${NETWORK_NAME}.`;
        const transactionUrl = `https://${transactionUrlNetPrefix}etherscan.io/tx/${lastGameTransactionHash}`;
        const spinner = React.createElement(FontAwesomeIcon, { color: "dark", icon: "spinner", spin: true, size: "lg" });
        if (!web3State.web3) {
            return (React.createElement("div", { className: Style.gameHeader },
                React.createElement("span", { className: "text-danger" },
                    "You need a web3 enabled browser for playing (e.g. ",
                    React.createElement("a", { href: METAMASK_URL }, "MetaMask"),
                    ",",
                    " ",
                    React.createElement("a", { href: TRUST_WALLET_URL }, "Trust Wallet"),
                    " or ",
                    React.createElement("a", { href: COINBASE_WALLET_URL }, "Coinbase Wallet"),
                    ")")));
        }
        else if (!web3State.account) {
            return (React.createElement("div", { className: Style.gameHeader },
                React.createElement("span", { className: "text-danger" }, "Please log in to your Wallet!")));
        }
        else if (!validChainId(web3State.chainId)) {
            return (React.createElement("div", { className: Style.gameHeader },
                React.createElement("span", { className: "text-danger" },
                    "Please select the ",
                    NETWORK_NAME,
                    " network!")));
        }
        return (React.createElement("div", { className: Style.gameHeader },
            isConflictEnding && React.createElement("span", null,
                "Conflict Ending... ",
                spinner),
            isForceEnding && React.createElement("span", null,
                "Force Ending... ",
                spinner),
            isUserConflictEnded && gameState.conflictEndTime && (React.createElement(ForceEnd, { endTime: gameState.conflictEndTime, onForceEnd: onForceEnd })),
            placedBet && (React.createElement(Button, { size: "sm", color: "primary", onClick: onSeedRequest }, "Request seed!")),
            isGameActive && (React.createElement(Button, { key: "1", size: "sm", color: "secondary", onClick: onEndGame }, "End Game Session")),
            (isGameActive || placedBet) && [
                React.createElement("div", { key: "1", className: Style.gameHeader__entry },
                    React.createElement("span", { className: Style.gameHeader__entryHeader, key: "2" }, "Funds left"),
                    React.createElement(Ether, { gwei: gameState.stake + gameState.balance })),
                React.createElement("div", { key: "2", className: "hidden-xs-down " + Style.gameHeader__entry },
                    React.createElement("span", { className: Style.gameHeader__entryHeader, key: "2" }, "Balance"),
                    React.createElement(Ether, { gwei: gameState.balance })),
            ],
            isGameCreating && React.createElement("span", null,
                "Creating Game Session... ",
                spinner),
            serverInitiatedEnd && (React.createElement("div", null,
                React.createElement("span", { className: "text-danger" },
                    "Server initiated end! Should only happen if you didn't play for ",
                    SESSION_TIMEOUT,
                    " hours!"),
                React.createElement(Button, { size: "sm", onClick: onConflictEnd }, "Conflict End"))),
            isGameEnded && (React.createElement("div", null,
                React.createElement(Button, { size: "sm", color: "primary", onClick: this.onShow }, "Start Game Session"),
                React.createElement(CreateGameModal, { isOpen: modalIsOpen, minValue: MIN_GAME_SESSION_VALUE, maxValue: MAX_GAME_SESSION_VALUE, onClose: this.onClose, onCreateGame: onStartGame, web3State: web3State }),
                lastGameTransactionHash !== undefined && [
                    React.createElement("a", { key: "1", ref: this.endTransactionRef, rel: "noreferrer", style: { marginLeft: "1em" }, target: "_blank", href: transactionUrl }, "End Transaction"),
                    React.createElement(Tooltip, { key: "2", target: () => this.endTransactionRef.current }, "Show last game session end transaction"),
                ]))));
    }
}
//# sourceMappingURL=GameHeader.js.map