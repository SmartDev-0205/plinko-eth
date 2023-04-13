import * as types from "./constants";
import { CHOOSE_FROM_12_NUMS, GameType, maxBet } from "@dicether/state-channel";
import { KELLY_FACTOR, MIN_BANKROLL, MIN_BET_VALUE } from "../../../config/config";
import { assertNever } from "../../../util/util";
const initialState = {
    num: 1,
    value: MIN_BET_VALUE,
};
function updateNum(state, num) {
    if (num <= 0 || num >= Math.pow(2, CHOOSE_FROM_12_NUMS) - 1) {
        return state;
    }
    const maxBetValue = maxBet(GameType.CHOOSE_FROM_12, num, MIN_BANKROLL, KELLY_FACTOR);
    const value = Math.min(maxBetValue, state.value);
    return Object.assign(Object.assign({}, state), { value, num });
}
export default function dice(state = initialState, action) {
    switch (action.type) {
        case types.CHANGE_NUM:
            return updateNum(state, action.num);
        case types.CHANGE_VALUE:
            return Object.assign(Object.assign({}, state), { value: action.value });
        default:
            assertNever(action);
            return state;
    }
}
//# sourceMappingURL=reducer.js.map