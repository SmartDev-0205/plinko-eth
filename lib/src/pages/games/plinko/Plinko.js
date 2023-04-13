var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { GameType, maxBet } from "@dicether/state-channel";
import * as React from "react";
import { connect } from "react-redux";
import { KELLY_FACTOR, MIN_BANKROLL, MIN_BET_VALUE } from "../../../config/config";
import { addNewBet } from "../../../platform/modules/bets/asyncActions";
import { toggleHelp } from "../../../platform/modules/games/info/actions";
import { placeBet, validChainId } from "../../../platform/modules/games/state/asyncActions";
import { showErrorMessage } from "../../../platform/modules/utilities/actions";
import { catchError } from "../../../platform/modules/utilities/asyncActions";
import { popCnt } from "../../../util/math";
import { sleep } from "../../../util/time";
import sounds from "../sound";
import { canPlaceBet } from "../utilities";
import { changeNum, changeValue } from "./actions";
import Ui from "./components/Ui";
import { Helmet } from "react-helmet";
import { playFromBegin } from "../../../util/audio";
const mapStateToProps = ({ games, account, web3, app }) => {
    const { info, gameState, plinko } = games;
    const web3Available = web3.account && web3.contract && web3.web3 && validChainId(web3.chainId);
    return {
        web3Available: web3Available === true,
        info,
        gameState,
        loggedIn: account.jwt !== null,
        plinko,
        nightMode: app.nightMode,
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
class Plinko extends React.PureComponent {
    constructor(props) {
        super(props);
        this.loadedSounds = false;
        this.ui = React.createRef();
        this.onToggleHelp = () => {
            const { toggleHelp, info } = this.props;
            toggleHelp(!info.showHelp);
        };
        this.onPlaceBet = () => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const { plinko, addNewBet, placeBet, catchError, showErrorMessage, web3Available, gameState, loggedIn } = this.props;
            const safeBetValue = Math.round(plinko.value);
            const num = plinko.num;
            const gameType = GameType.PLINKO;
            console.log("GAME PLINKO=================");
            if (!this.loadedSounds) {
                // workaround for sound playback on mobile browsers: load sounds in user gesture handler
                sounds.plinkoResult.load();
                this.loadedSounds = true;
            }
            const canBet = canPlaceBet(gameType, num, safeBetValue, loggedIn, web3Available, gameState);
            if (canBet.canPlaceBet) {
                try {
                    console.log("93");
                    const result = yield placeBet(num, safeBetValue, gameType);
                    const resultNum = result.num;
                    const numBitsSet = popCnt(resultNum);
                    this.setState({
                        ballsFalling: this.state.ballsFalling + 1,
                    });
                    yield ((_b = (_a = this.ui.current) === null || _a === void 0 ? void 0 : _a.plinko.current) === null || _b === void 0 ? void 0 : _b.addBall(numBitsSet, resultNum));
                    this.setState({
                        showResult: true,
                        ballsFalling: this.state.ballsFalling - 1,
                        result,
                    });
                    addNewBet(result.bet);
                    this.playSound(sounds.plinkoResult);
                    yield sleep(5000);
                    this.setState({ showResult: false });
                }
                catch (error) {
                    catchError(error);
                }
            }
            else {
                showErrorMessage(canBet.errorMessage);
            }
        });
        this.onValueChange = (value) => {
            const { changeValue } = this.props;
            changeValue(value);
        };
        this.onRiskChange = (risk) => {
            // TODO: as action
            const { plinko, changeNum } = this.props;
            const { num } = plinko;
            const newNum = risk * 100 + (num % 100);
            changeNum(newNum);
        };
        this.onRowsChange = (segments) => {
            // TODO: as action
            const { plinko, changeNum } = this.props;
            const { num } = plinko;
            const newNum = Math.floor(num / 100) * 100 + segments;
            changeNum(newNum);
        };
        this.playSound = (audio) => {
            const { info } = this.props;
            const { sound } = info;
            if (sound) {
                playFromBegin(audio);
            }
        };
        this.state = {
            showResult: false,
            ballsFalling: 0,
            result: { betNum: 0, num: 0, won: false, userProfit: 0 },
        };
    }
    render() {
        const { nightMode, info, gameState, plinko } = this.props;
        const { num, value } = plinko;
        const { ballsFalling, showResult, result } = this.state;
        let maxBetValue = maxBet(GameType.PLINKO, num, MIN_BANKROLL, KELLY_FACTOR);
        if (gameState.status !== "ENDED") {
            const max = Math.min(gameState.stake + gameState.balance, maxBetValue);
            maxBetValue = Math.max(max, MIN_BET_VALUE);
        }
        return (React.createElement(React.Fragment, null,
            React.createElement(Helmet, null,
                React.createElement("title", null, "Plinko"),
                React.createElement("meta", { name: "description", content: "Ethereum state channel based Plinko game" })),
            React.createElement(Ui, { disableRiskRowUpdate: ballsFalling > 0, ref: this.ui, nightMode: nightMode, risk: Math.floor(num / 100), rows: num % 100, value: value, maxBetValue: maxBetValue, onValueChange: this.onValueChange, onPlaceBet: this.onPlaceBet, onRiskChange: this.onRiskChange, onRowsChange: this.onRowsChange, showResult: showResult, result: Object.assign({}, result), showHelp: info.showHelp, onToggleHelp: this.onToggleHelp })));
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Plinko);
//# sourceMappingURL=Plinko.js.map