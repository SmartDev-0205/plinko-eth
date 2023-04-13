import * as types from "./constants";
import { GameType, maxBet } from "@dicether/state-channel";
import { KELLY_FACTOR, MIN_BANKROLL, MIN_BET_VALUE } from "../../../config/config";
import { assertNever } from "../../../util/util";
const initialState = {
    num: 220,
    value: MIN_BET_VALUE,
};
function updateNum(state, num) {
    const maxBetValue = maxBet(GameType.WHEEL, num, MIN_BANKROLL, KELLY_FACTOR);
    const value = Math.min(maxBetValue, state.value);
    return Object.assign(Object.assign({}, state), { value, num });
}
export default function wheel(state = initialState, action) {
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