import { catchError } from "../../utilities/asyncActions";
import { loadContractGameState, serverActiveGame } from "./asyncActions";
const listeners = {
    gameSessionActive: (dispatch) => ({ gameId, serverHash, userHash }) => {
        dispatch(serverActiveGame(gameId, serverHash, userHash));
    },
    gameSessionConflictEnded: (dispatch) => () => {
        dispatch(loadContractGameState()).catch((error) => catchError(error, dispatch));
    },
    gameSessionEnded: (dispatch) => () => {
        dispatch(loadContractGameState()).catch((error) => catchError(error, dispatch));
    },
};
export default listeners;
//# sourceMappingURL=socketListeners.js.map