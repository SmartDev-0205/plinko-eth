import { combineReducers } from "redux";
import oneDice from "../../../pages/games/chooseFrom12/reducer";
import dice from "../../../pages/games/dice/reducer";
import flipACoin from "../../../pages/games/flipACoin/reducer";
import keno from "../../../pages/games/keno/reducer";
import plinko from "../../../pages/games/plinko/reducer";
import wheel from "../../../pages/games/wheel/reducer";
import info from "./info/reducer";
import gameState from "./state/reducer";
const reducers = combineReducers({
    info,
    gameState,
    dice,
    oneDice,
    flipACoin,
    keno,
    wheel,
    plinko,
});
export default reducers;
//# sourceMappingURL=reducer.js.map