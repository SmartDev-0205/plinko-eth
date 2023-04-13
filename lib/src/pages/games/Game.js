import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Stats from "../../platform/components/bet/Stats";
import { toggleExpertView, toggleHelp, toggleSound } from "../../platform/modules/games/info/actions";
import { conflictEnd, createGame, endGame, forceEnd, manualRequestSeed, } from "../../platform/modules/games/state/asyncActions";
import { catchError } from "../../platform/modules/utilities/asyncActions";
import { Container, Section } from "../../reusable";
import GameFooter from "./components/GameFooter";
import GameHeader from "./components/GameHeader";
import Plinko from "./plinko/Plinko";
import Style from "./Game.scss";
const mapStateToProps = ({ games, web3, account }) => {
    const { gameState, info } = games;
    return {
        gameState,
        info,
        web3State: web3,
        loggedIn: account.jwt !== null,
    };
};
const mapDispatchToProps = (dispatch) => (Object.assign(Object.assign({}, bindActionCreators({
    toggleExpertView,
    toggleHelp,
    toggleSound,
}, dispatch)), { createGame: (value, seed) => dispatch(createGame(value, seed)), endGame: () => dispatch(endGame()), manualRequestSeed: () => dispatch(manualRequestSeed()), conflictEnd: () => dispatch(conflictEnd()), forceEnd: () => dispatch(forceEnd()), catchError: (error) => catchError(error, dispatch) }));
class Game extends React.Component {
    constructor(props) {
        super(props);
        this.createGame = (value, seed) => {
            const { createGame, catchError } = this.props;
            createGame(value, seed).catch(catchError);
        };
        this.endGame = () => {
            const { endGame, catchError } = this.props;
            endGame().catch(catchError);
        };
        this.requestSeed = () => {
            const { manualRequestSeed, catchError } = this.props;
            manualRequestSeed().catch(catchError);
        };
        this.conflictEnd = () => {
            const { conflictEnd, catchError } = this.props;
            conflictEnd().catch(catchError);
        };
        this.forceEnd = () => {
            const { forceEnd, catchError } = this.props;
            forceEnd().catch(catchError);
        };
        this.onToggleHelp = (show) => {
            const { toggleHelp } = this.props;
            toggleHelp(show);
        };
        this.onToggleExpertView = (show) => {
            const { toggleExpertView } = this.props;
            toggleExpertView(show);
        };
        this.onToggleSound = (enabled) => {
            const { toggleSound } = this.props;
            toggleSound(enabled);
        };
    }
    render() {
        const { gameState, info, web3State, loggedIn } = this.props;
        const { showHelp, showExpertView, sound } = info;
        return (React.createElement("div", null,
            React.createElement(Section, { gray: true },
                React.createElement(Container, null,
                    React.createElement("div", { className: Style.wrapper },
                        loggedIn && (React.createElement(GameHeader, { web3State: web3State, gameState: gameState, onStartGame: this.createGame, onEndGame: this.endGame, onSeedRequest: this.requestSeed, onForceEnd: this.forceEnd, onConflictEnd: this.conflictEnd })),
                        React.createElement("div", { className: Style.gameWrapper },
                            React.createElement(Plinko, null)),
                        React.createElement(GameFooter, { authenticated: loggedIn, showHelp: showHelp, onToggleHelp: this.onToggleHelp, showExpertView: showExpertView, onToggleExpertView: this.onToggleExpertView, sound: sound, onToggleSound: this.onToggleSound })))),
            React.createElement(Section, null,
                React.createElement(Container, null,
                    React.createElement(Stats, { showMyBets: loggedIn })))));
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Game);
//# sourceMappingURL=Game.js.map