import * as types from "./constants";
import { assertNever } from "../../../../util/util";
const initialState = {
    showHelp: false,
    showExpertView: false,
    sound: true,
};
export default function games(state = initialState, action) {
    switch (action.type) {
        case types.TOGGLE_HELP:
            return Object.assign(Object.assign({}, state), { showHelp: action.show });
        case types.TOGGLE_EXPERT_VIEW:
            return Object.assign(Object.assign({}, state), { showExpertView: action.show });
        case types.TOGGLE_SOUND:
            return Object.assign(Object.assign({}, state), { sound: action.enabled });
        default:
            assertNever(action);
            return state;
    }
}
//# sourceMappingURL=reducer.js.map