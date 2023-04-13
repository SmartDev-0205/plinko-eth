import { assertNever, isLocalStorageAvailable, isSessionStorageAvailable } from "../../../util/util";
import * as types from "./constants";
function initialState() {
    // tslint:disable-line strict-type-predicates
    const jwt = isSessionStorageAvailable() ? sessionStorage.getItem("jwt") : null;
    const firstVisited = isLocalStorageAvailable() ? localStorage.getItem("visited") : null;
    return {
        firstVisited: firstVisited === null,
        jwt: jwt === null ? null : jwt,
        stats: { profit: 0, wagered: 0, numBets: 0 },
        gameSessions: [],
    };
}
export default function account(state = initialState(), action) {
    switch (action.type) {
        case types.CHANGE_FIRST_VISITED:
            return Object.assign(Object.assign({}, state), { firstVisited: action.firstVisited });
        case types.CHANGE_JWT:
            return Object.assign(Object.assign({}, state), { jwt: action.jwt });
        case types.CHANGE_USER_STATS:
            return Object.assign(Object.assign({}, state), { stats: action.stats });
        case types.CHANGE_GAME_SESSIONS:
            return Object.assign(Object.assign({}, state), { gameSessions: action.gameSessions });
        default:
            assertNever(action);
            return state;
    }
}
//# sourceMappingURL=reducer.js.map