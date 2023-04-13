import { GameType, maxBet } from "@dicether/state-channel";
import * as React from "react";
import { connect } from "react-redux";
import { HOUSE_EDGE, HOUSE_EDGE_DIVISOR, KELLY_FACTOR, MAX_BET_VALUE, MIN_BANKROLL, MIN_BET_VALUE, RANGE, } from "../../../config/config";
import { addNewBet } from "../../../platform/modules/bets/asyncActions";
import { toggleHelp } from "../../../platform/modules/games/info/actions";
import { placeBet, validChainId } from "../../../platform/modules/games/state/asyncActions";
import { showErrorMessage } from "../../../platform/modules/utilities/actions";
import { catchError } from "../../../platform/modules/utilities/asyncActions";
import sounds from "../sound";
import { canPlaceBet } from "../utilities";
import { changeNum, changeRollMode, changeValue } from "./actions";
import DiceUi from "./components/DiceUi";
import { Helmet } from "react-helmet";
import { playFromBegin } from "../../../util/audio";
function calcNumberFromPayOutMultiplier(multiplier, reversedRoll) {
    const houseEdgeFactor = 1 - HOUSE_EDGE / HOUSE_EDGE_DIVISOR;
    const n = (RANGE / multiplier) * houseEdgeFactor;
    const num = reversedRoll ? RANGE - 1 - n : n;
    return Math.round(num);
}
const mapStateToProps = ({ games, account, web3 }) => {
    const { gameState, info, dice } = games;
    const web3Available = web3.account && web3.contract && web3.web3 && validChainId(web3.chainId);
    return {
        web3Available: web3Available === true,
        gameState,
        info,
        dice,
        loggedIn: account.jwt !== null,
    };
};
const mapDispatchToProps = (dispatch) => ({
    addNewBet: (bet) => dispatch(addNewBet(bet)),
    placeBet: (num, value, gameType) => dispatch(placeBet(num, value, gameType)),
    changeNum: (num) => dispatch(changeNum(num)),
    changeValue: (value) => dispatch(changeValue(value)),
    changeRollMode: (reverse) => dispatch(changeRollMode(reverse)),
    toggleHelp: (t) => dispatch(toggleHelp(t)),
    catchError: (error) => catchError(error, dispatch),
    showErrorMessage: (message) => dispatch(showErrorMessage(message)),
});
class Dice extends React.Component {
    constructor(props) {
        super(props);
        this.loadedSounds = false;
        this.onToggleHelp = () => {
            const { toggleHelp, info } = this.props;
            toggleHelp(!info.showHelp);
        };
        this.onNumberChange = (num) => {
            const { changeNum } = this.props;
            changeNum(num);
        };
        this.onValueChange = (value) => {
            const { changeValue } = this.props;
            changeValue(value);
        };
        this.onMultiplierChange = (multiplier) => {
            const { dice, changeNum } = this.props;
            const num = calcNumberFromPayOutMultiplier(multiplier, dice.reverseRoll);
            changeNum(num);
        };
        this.onChanceChange = (chance) => {
            const { dice, changeNum } = this.props;
            const num = dice.reverseRoll ? RANGE - 1 - RANGE * chance : RANGE * chance;
            changeNum(num);
        };
        this.onReverseRoll = () => {
            const { dice, changeRollMode } = this.props;
            changeRollMode(!dice.reverseRoll);
            changeNum(RANGE - 1 - dice.num);
        };
        this.onPlaceBet = () => {
            const { info, dice, addNewBet, placeBet, catchError, showErrorMessage, web3Available, gameState, loggedIn } = this.props;
            const safeBetValue = Math.round(dice.value);
            const num = dice.num;
            const gameType = dice.reverseRoll ? GameType.DICE_HIGHER : GameType.DICE_LOWER;
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
            result: { num: 1, won: false },
        };
    }
    componentWillUnmount() {
        window.clearTimeout(this.resultTimeoutId);
    }
    componentWillReceiveProps(nextProps) {
        const { gameState, dice, changeValue } = this.props;
        if (gameState.balance !== nextProps.gameState.balance) {
            // if the balance changes, we need to check if user has enough funds for current bet value
            const leftStake = nextProps.gameState.stake + nextProps.gameState.balance;
            if (dice.value > leftStake) {
                changeValue(Math.max(leftStake, MIN_BET_VALUE));
            }
        }
    }
    render() {
        const { result, showResult } = this.state;
        const { info, gameState, dice } = this.props;
        let maxBetValue = Math.min(maxBet(dice.reverseRoll ? 2 : 1, dice.num, MIN_BANKROLL, KELLY_FACTOR), MAX_BET_VALUE);
        if (gameState.status !== "ENDED") {
            const max = Math.min(gameState.stake + gameState.balance, maxBetValue);
            maxBetValue = Math.max(max, MIN_BET_VALUE);
        }
        return (React.createElement(React.Fragment, null,
            React.createElement(Helmet, null,
                React.createElement("title", null, "Dice - Dicether"),
                React.createElement("meta", { name: "description", content: "Ethereum state channel based Dice game" })),
            React.createElement(DiceUi, { num: dice.num, value: dice.value, onNumberChange: this.onNumberChange, onValueChange: this.onValueChange, onReverseRoll: this.onReverseRoll, onPlaceBet: this.onPlaceBet, reverseRoll: dice.reverseRoll, result: result, showResult: showResult, sound: info.sound, showHelp: info.showHelp, onToggleHelp: this.onToggleHelp, maxBetValue: maxBetValue })));
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dice);
//# sourceMappingURL=Dice.js.map