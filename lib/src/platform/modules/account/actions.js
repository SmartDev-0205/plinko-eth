import * as types from "./constants";
const ca = (a) => a;
export const changeFirstVisitedS = ca((firstVisited) => {
    return { type: types.CHANGE_FIRST_VISITED, firstVisited };
});
export const changeJWTS = ca((jwt) => {
    return { type: types.CHANGE_JWT, jwt };
});
export const changeMyStats = ca((stats) => {
    return { type: types.CHANGE_USER_STATS, stats };
});
export const changeMyGameSessions = ca((gameSessions) => {
    return { type: types.CHANGE_GAME_SESSIONS, gameSessions };
});
//# sourceMappingURL=actions.js.map