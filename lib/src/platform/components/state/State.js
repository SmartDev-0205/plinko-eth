import * as React from "react";
import { connect } from "react-redux";
import { Output } from "../../../reusable/index";
import { clearState } from "../../modules/games/state/actions";
import { canUserInitiateConflictEnd, canUserEndGame, conflictEnd, userEndGame, } from "../../modules/games/state/asyncActions";
import { catchError } from "../../modules/utilities/asyncActions";
import ClearState from "./ClearState";
import ConflictEnd from "./ConflictEnd";
import Style from "./State.scss";
import UserEndGame from "./UserEndGame";
const Entry = ({ id, name, data }) => {
    if (data) {
        return (React.createElement("div", { className: Style.gameState__entry },
            React.createElement("span", null, name),
            React.createElement(Output, { className: Style.gameState__value, id: id, value: data })));
    }
    else {
        return null;
    }
};
const mapStateToProps = ({ games }) => {
    const { gameState } = games;
    return {
        gameState,
    };
};
const mapDispatchToProps = (dispatch) => ({
    clearState: () => dispatch(clearState()),
    conflictEnd: () => dispatch(conflictEnd()),
    endGame: () => dispatch(userEndGame()),
    catchError: (error) => catchError(error, dispatch),
});
const State = ({ gameState, clearState, conflictEnd, catchError, endGame }) => {
    return (React.createElement("div", null,
        React.createElement("div", null,
            React.createElement(ClearState, { clearState: clearState }),
            " ",
            canUserInitiateConflictEnd(gameState) && (React.createElement(ConflictEnd, { conflictEnd: () => conflictEnd().catch(catchError) })),
            canUserEndGame(gameState) && React.createElement(UserEndGame, { userEndGame: () => endGame().catch(catchError) })),
        React.createElement(Entry, { id: "gameState_status", name: "Status", data: gameState.status }),
        React.createElement(Entry, { id: "gameState_reasonEnded", name: "Reason Ended", data: gameState.reasonEnded }),
        React.createElement(Entry, { id: "gameState_createTransactionHash", name: "Create Transaction Hash", data: gameState.createTransactionHash }),
        React.createElement(Entry, { id: "gameState_endTransactionHash", name: "End Transaction Hash", data: gameState.endTransactionHash }),
        React.createElement(Entry, { id: "gameState_gameId", name: "Game Id", data: gameState.gameId }),
        React.createElement(Entry, { id: "gameState_roundId", name: "Round Id", data: gameState.roundId }),
        React.createElement(Entry, { id: "gameState_gameType", name: "Game Type", data: gameState.gameType }),
        React.createElement(Entry, { id: "gameState_num", name: "Number", data: gameState.num }),
        React.createElement(Entry, { id: "gameState_betValue", name: "Bet Value", data: gameState.betValue }),
        React.createElement(Entry, { id: "gameState_balance", name: "Balance", data: gameState.balance }),
        React.createElement(Entry, { id: "gameState_serverHash", name: "Server Hash", data: gameState.serverHash }),
        React.createElement(Entry, { id: "gameState_userHash", name: "User Hash", data: gameState.userHash }),
        React.createElement(Entry, { id: "gameState_serverSig", name: "Server Signature", data: gameState.serverSig }),
        React.createElement(Entry, { id: "gameState_playerSig", name: "Player Sigature", data: gameState.userSig })));
};
export default connect(mapStateToProps, mapDispatchToProps)(State);
//# sourceMappingURL=State.js.map