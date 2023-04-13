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
    const { info, flipACoin, gameState } = games;
    const web3Available = web3.account && web3.contract && web3.web3 && validChainId(web3.chainId);
    return {
        web3Available: web3Available === true,
        info,
        flipACoin,
        gameState,
        loggedIn: account.jwt !== null,
    };
};
const mapDispatchToProps = (dispatch) => ({
    placeBet: (num, value, gameType) => dispatch(placeBet(num, value, gameType)),
    addNewBet: (bet) => dispatch(addNewBet(bet)),
    changeNum: (num) => dispatch(changeNum(num)),
    changeValue: (value) => dispatch(changeValue(value)),
    toggleHelp: (t) => dispatch(toggleHelp(t)),
    showErrorMessage: (message) => dispatch(showErrorMessage(message)),
    catchError: (error) => catchError(error, dispatch),
});
class FlipACoin extends React.PureComponent {
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
        this.onClick = (num) => {
            const { changeNum, flipACoin } = this.props;
            const { showResult, result } = this.state;
            if (showResult && result.num === num) {
                this.setState({ showResult: false });
            }
            const newNum = flipACoin.num === num ? 1 - num : num;
            changeNum(newNum);
        };
        this.onPlaceBet = () => {
            const { info, flipACoin, addNewBet, placeBet, catchError, showErrorMessage, web3Available, gameState, loggedIn } = this.props;
            const { value, num } = flipACoin;
            const safeBetValue = Math.round(value);
            const gameType = GameType.FLIP_A_COIN;
            if (!this.loadedSounds) {
                // workaround for sound playback on mobile browsers: load sounds in user gesture handler
                sounds.win.load();
                sounds.lose.load();
                this.loadedSounds = true;
            }
            const canBet = canPlaceBet(gameType, num, safeBetValue, loggedIn, web3Available, gameState);
            if (canBet.canPlaceBet) {
                this.setState({ showResult: false });
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
    render() {
        const { info, gameState, flipACoin } = this.props;
        const { num, value } = flipACoin;
        const { result, showResult } = this.state;
        let maxBetValue = Math.min(maxBet(GameType.FLIP_A_COIN, num, MIN_BANKROLL, KELLY_FACTOR), MAX_BET_VALUE);
        if (gameState.status !== "ENDED") {
            const max = Math.min(gameState.stake + gameState.balance, maxBetValue);
            maxBetValue = Math.max(max, MIN_BET_VALUE);
        }
        return (React.createElement(React.Fragment, null,
            React.createElement(Helmet, null,
                React.createElement("title", null, "Flip a Coin - Dicether"),
                React.createElement("meta", { name: "description", content: "Ethereum state channel based Flip a Coin game" })),
            React.createElement(Ui, { num: num, value: value, maxBetValue: maxBetValue, onValueChange: this.onValueChange, onClick: this.onClick, onPlaceBet: this.onPlaceBet, showResult: showResult, result: result, showHelp: info.showHelp, onToggleHelp: this.onToggleHelp })));
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FlipACoin);
//# sourceMappingURL=FlipACoin.js.map