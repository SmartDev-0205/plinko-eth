import * as types from "./constants";
import { maxBet } from "@dicether/state-channel";
import { KELLY_FACTOR, MIN_BANKROLL, MIN_BET_VALUE } from "../../../config/config";
import { assertNever } from "../../../util/util";
const initialState = {
    num: 50,
    value: MIN_BET_VALUE,
    reverseRoll: false,
};
function updateNum(state, num) {
    const maxBetValue = maxBet(state.reverseRoll ? 2 : 1, num, MIN_BANKROLL, KELLY_FACTOR);
    const value = Math.min(maxBetValue, state.value);
    return Object.assign(Object.assign({}, state), { value, num });
}
export default function dice(state = initialState, action) {
    switch (action.type) {
        case types.CHANGE_NUM:
            return updateNum(state, action.num);
        case types.CHANGE_VALUE:
            return Object.assign(Object.assign({}, state), { value: action.value });
        case types.CHANGE_ROLL_MODE:
            return Object.assign(Object.assign({}, state), { reverseRoll: action.reverseRoll });
        default:
            assertNever(action);
            return state;
    }
}
//# sourceMappingURL=reducer.js.map