import * as React from "react";
import { connect } from "react-redux";
import { GameType, maxBet } from "@dicether/state-channel";
import { KELLY_FACTOR, MAX_BET_VALUE, MIN_BANKROLL, MIN_BET_VALUE } from "../../../config/config";
import { addNewBet } from "../../../platform/modules/bets/asyncActions";
import { toggleHelp } from "../../../platform/modules/games/info/actions";
import { placeBet, validChainId } from "../../../platform/modules/games/state/asyncActions";
import { showErrorMessage } from "../../../platform/modules/utilities/actions";
import { catchError } from "../../../platform/modules/utilities/asyncActions";
import sounds from "../sound";
import { canPlaceBet } from "../utilities";
import { changeNum, changeValue } from "./actions";
import Ui from "./components/Ui";
import { Helmet } from "react-helmet";
import { playFromBegin } from "../../../util/audio";
const mapStateToProps = ({ games, account, web3 }) => {
    const { info, oneDice, gameState } = games;
    const web3Available = web3.account && web3.contract && web3.web3 && validChainId(web3.chainId);
    return {
        web3Available: web3Available === true,
        info,
        oneDice,
        gameState,
        loggedIn: account.jwt !== null,
    };
};
const mapDispatchToProps = (dispatch) => ({
    addNewBet: (bet) => dispatch(addNewBet(bet)),
    placeBet: (num, value, gameType) => dispatch(placeBet(num, value, gameType)),
    changeNum: (num) => dispatch(changeNum(num)),
    changeValue: (value) => dispatch(changeValue(value)),
    toggleHelp: (t) => dispatch(toggleHelp(t)),
    showErrorMessage: (message) => dispatch(showErrorMessage(message)),
    catchError: (error) => catchError(error, dispatch),
});
class ChooseFrom12 extends React.PureComponent {
    constructor(props) {
        super(props);
        this.loadedSounds = false;
        this.resultTimeoutId = 0;
        this.onToggleHelp = () => {
            const { toggleHelp, info } = this.props;
            toggleHelp(!info.showHelp);
        };
        this.onValueChange = (value) => {
            const { changeValue } = this.props;
            changeValue(value);
        };
        this.onClick = (diceNum) => {
            const { info, oneDice, changeNum } = this.props;
            const { showResult, result } = this.state;
            const { num } = oneDice;
            if (showResult && result.num === diceNum) {
                this.setState({ showResult: false });
            }
            const newNum = (1 << diceNum) ^ num; // tslint:disable-line:no-bitwise
            if (info.sound) {
                playFromBegin(sounds.tileSelect);
            }
            changeNum(newNum);
        };
        this.onPlaceBet = () => {
            const { info, oneDice, addNewBet, placeBet, catchError, showErrorMessage, web3Available, gameState, loggedIn } = this.props;
            const safeBetValue = Math.round(oneDice.value);
            const num = oneDice.num;
            const gameType = GameType.CHOOSE_FROM_12;
            if (!this.loadedSounds) {
                // workaround for sound playback on mobile browsers: load sounds in user gesture handler
                sounds.win.load();
                sounds.lose.load();
                this.loadedSounds = true;
            }
            const canBet = canPlaceBet(gameType, num, safeBetValue, loggedIn, web3Available, gameState);
            if (canBet.canPlaceBet) {
                placeBet(num, safeBetValue, gameType)
                    .then((result) => {
                    this.setState({ result, showResult: true });
                    clearTimeout(this.resultTimeoutId);
                    this.resultTimeoutId = window.setTimeout(() => this.setState({ showResult: false }), 5000);
                    addNewBet(result.bet);
                    if (info.sound) {
                        setTimeout(() => (result.won ? playFromBegin(sounds.win) : playFromBegin(sounds.lose)), 500);
                    }
                })
                    .catch((error) => catchError(error));
            }
            else {
                showErrorMessage(canBet.errorMessage);
            }
        };
        this.state = {
            showResult: false,
            result: { num: 0, won: false },
        };
    }
    componentWillUnmount() {
        clearTimeout(this.resultTimeoutId);
    }
    render() {
        const { info, gameState, oneDice } = this.props;
        const { num, value } = oneDice;
        const { result, showResult } = this.state;
        let maxBetValue = Math.min(maxBet(GameType.CHOOSE_FROM_12, num, MIN_BANKROLL, KELLY_FACTOR), MAX_BET_VALUE);
        if (gameState.status !== "ENDED") {
            const max = Math.min(gameState.stake + gameState.balance, maxBetValue);
            maxBetValue = Math.max(max, MIN_BET_VALUE);
        }
        return (React.createElement(React.Fragment, null,
            React.createElement(Helmet, null,
                React.createElement("title", null, "Choose from 12 - Dicether"),
                React.createElement("meta", { name: "description", content: "Ethereum state channel based Choose from 12 game" })),
            React.createElement(Ui, { num: num, value: value, maxBetValue: maxBetValue, onValueChange: this.onValueChange, onClick: this.onClick, onPlaceBet: this.onPlaceBet, showResult: showResult, result: result, showHelp: info.showHelp, onToggleHelp: this.onToggleHelp })));
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChooseFrom12);
//# sourceMappingURL=ChooseFrom12.js.map