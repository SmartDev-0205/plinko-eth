import {combineReducers} from "redux";

import plinko, {State as PlinkoState} from "../../../pages/games/plinko/reducer";
import info, {State as InfoState} from "./info/reducer";
import gameState, {State as GameState} from "./state/reducer";

export type State = {
    info: InfoState;
    gameState: GameState;
    plinko: PlinkoState;
};

const reducers = combineReducers({
    info,
    gameState,
    plinko,
});

export default reducers;
