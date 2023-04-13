import * as types from "./constants";
import { assertNever, fixedLengthAddElementFront } from "../../../util/util";
const initialState = {
    allBets: [],
    myBets: [],
};
export default function games(state = initialState, action) {
    switch (action.type) {
        case types.CHANGE_BETS:
            return Object.assign(Object.assign({}, state), { allBets: action.bets });
        case types.ADD_BET:
            return Object.assign(Object.assign({}, state), { allBets: fixedLengthAddElementFront(state.allBets, action.bet, 20) });
        case types.CHANGE_MY_BETS:
            return Object.assign(Object.assign({}, state), { myBets: action.myBets });
        case types.ADD_MY_BET:
            return Object.assign(Object.assign({}, state), { myBets: fixedLengthAddElementFront(state.myBets, action.myBet, 20) });
        default:
            assertNever(action);
            return state;
    }
}
//# sourceMappingURL=reducer.js.map