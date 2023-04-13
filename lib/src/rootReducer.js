import { combineReducers } from "redux";
import { reducer as modal } from "redux-modal";
import account from "./platform/modules/account/reducer";
import bets from "./platform/modules/bets/reducer";
import chat from "./platform/modules/chat/reducer";
import friend from "./platform/modules/friends/reducer";
import games from "./platform/modules/games/reducer";
import app from "./platform/modules/utilities/reducer";
import web3 from "./platform/modules/web3/reducer";
const appReducer = combineReducers({
    account,
    chat,
    friend,
    web3,
    app,
    games,
    bets,
    modal,
});
function rootReducer(state, action) {
    if (action.type === "USER_LOGOUT") {
        state = undefined;
    }
    return appReducer(state, action);
}
export default rootReducer;
//# sourceMappingURL=rootReducer.js.map