import * as React from "react";
import {connect} from "react-redux";

import {useParams} from "react-router-dom";
import {bindActionCreators} from "redux";
import {User as UserType} from "../../platform/modules/account/types";
import {showBetModal, showUserModal} from "../../platform/modules/modals/actions";
import {Container, DataLoader} from "../../reusable";
import Ether from "../../reusable/Ether";
import {Dispatch} from "../../util/util";

import Style from "./GameSession.scss";
import PathNotFound from "../../app/PathNotFound";

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            showBetModal,
            showUserModal,
        },
        dispatch
    );

type MatchParams = {
    gameId: string;
};

type Props = ReturnType<typeof mapDispatchToProps>;

type GameState = {
    status: string;
    user: UserType;
    balance: number;
    roundId: number;
};

const GameSession = (props: Props) => {
    const {showBetModal, showUserModal} = props;
    const params = useParams<MatchParams>();

    const gameIdString = params.gameId;
    if (!gameIdString) {
        return <PathNotFound />;
    }

    const gameId = gameIdString.match(/\d+/);
    if (!gameId) {
        return <PathNotFound />;
    }

    return (
        <Container>
            <DataLoader<GameState>
                url={`/stateChannel/gameState/${gameId}`}
                success={(gameState) => (
                    <div className={Style.header}>
                        <h3>
                            Game session:
                            {gameId}
                        </h3>
                        <span>
                            Created by{" "}
                            <button className={Style.userButton} onClick={() => showUserModal({user: gameState.user})}>
                                {gameState.user.username}
                            </button>
                        </span>
                        <span>{gameState.status === "ENDED" ? gameState.roundId - 1 : gameState.roundId} Bets</span>
                        <Ether colored gwei={gameState.balance} />
                    </div>
                )}
            />
        </Container>
    );
};

export default connect(null, mapDispatchToProps)(GameSession);
