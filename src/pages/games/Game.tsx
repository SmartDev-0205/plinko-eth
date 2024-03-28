import * as React from "react";
import {connect} from "react-redux";
import {Route, RouteProps, Routes} from "react-router-dom";

import {bindActionCreators} from "redux";
import Stats from "../../platform/components/bet/Stats";
import {toggleExpertView, toggleHelp, toggleSound} from "../../platform/modules/games/info/actions";
import {
    conflictEnd,
    createGame,
    endGame,
    forceEnd,
    manualRequestSeed,
} from "../../platform/modules/games/state/asyncActions";
import {catchError} from "../../platform/modules/utilities/asyncActions";
import {Container, Section} from "../../reusable";
import {State} from "../../rootReducer";
import {Dispatch} from "../../util/util";
import Plinko from "./plinko/Plinko";

import Style from "./Game.scss";

const mapStateToProps = ({games, web3, account}: State) => {
    const {gameState, info} = games;

    return {
        gameState,
        info,
        web3State: web3,
        loggedIn: account.jwt !== null,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
    ...bindActionCreators(
        {
            toggleExpertView,
            toggleHelp,
            toggleSound,
        },
        dispatch
    ),
    createGame: (value: number, seed: string) => dispatch(createGame(value, seed)),
    endGame: () => dispatch(endGame()),
    manualRequestSeed: () => dispatch(manualRequestSeed()),
    conflictEnd: () => dispatch(conflictEnd()),
    forceEnd: () => dispatch(forceEnd()),
    catchError: (error: Error) => catchError(error, dispatch),
});

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & RouteProps;

class Game extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    createGame = (value: number, seed: string) => {
        const {createGame, catchError} = this.props;
        createGame(value, seed).catch(catchError);
    };

    endGame = () => {
        const {endGame, catchError} = this.props;
        endGame().catch(catchError);
    };

    requestSeed = () => {
        const {manualRequestSeed, catchError} = this.props;
        manualRequestSeed().catch(catchError);
    };

    conflictEnd = () => {
        const {conflictEnd, catchError} = this.props;
        conflictEnd().catch(catchError);
    };

    forceEnd = () => {
        const {forceEnd, catchError} = this.props;
        forceEnd().catch(catchError);
    };

    onToggleHelp = (show: boolean) => {
        const {toggleHelp} = this.props;
        toggleHelp(show);
    };

    onToggleExpertView = (show: boolean) => {
        const {toggleExpertView} = this.props;
        toggleExpertView(show);
    };

    onToggleSound = (enabled: boolean) => {
        const {toggleSound} = this.props;
        toggleSound(enabled);
    };

    render() {
        const {gameState, info, web3State, loggedIn} = this.props;
        const {showHelp, showExpertView, sound} = info;

        return (
            <div>
                <Section gray>
                    <Container>
                        <div className={Style.wrapper}>
                            <div className={Style.gameWrapper}>
                                <Plinko />
                            </div>
                        </div>
                    </Container>
                </Section>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);
