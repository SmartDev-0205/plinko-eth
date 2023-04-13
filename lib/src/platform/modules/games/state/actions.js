import * as types from "./constants";
const ca = (a) => a;
export const creatingGame = ca((hashChain, serverEndHash, value, transactionHash) => {
    return { type: types.CREATING_GAME, hashChain, value, serverEndHash, createTransactionHash: transactionHash };
});
export const endedWithReason = ca((reason) => {
    return { type: types.ENDED_WITH_REASON, reason };
});
export const gameCreated = ca((gameId) => {
    return { type: types.GAME_CREATED, gameId };
});
export const addBet = ca((bet, serverSig, userSig) => {
    return { type: types.PLACE_BET, bet, serverSig, userSig };
});
export const revealSeed = ca((serverSeed, userSeed, balance) => {
    return { type: types.END_BET, serverSeed, userSeed, balance };
});
export const endedGame = ca((roundId, serverHash, userHash, serverSig, userSig, endTransactionHash) => {
    return { type: types.ENDED_GAME, roundId, serverHash, userHash, serverSig, userSig, endTransactionHash };
});
export const userInitiateConflictEnd = ca((transactionHash) => {
    return { type: types.USER_INITIATE_CONFLICT_END, transactionHash };
});
export const userAbortConflictEnd = ca(() => {
    return { type: types.USER_ABORT_CONFLICT_END };
});
export const userConflictEnd = ca((time) => {
    return { type: types.USER_CONFLICT_END, time };
});
export const userInitiateForceEnd = ca((transactionHash) => {
    return { type: types.USER_INITIATE_FORCE_END, transactionHash };
});
export const userAbortForceEnd = ca(() => {
    return { type: types.USER_ABORT_FORCE_END };
});
export const serverConflictEnd = ca(() => {
    return { type: types.SERVER_CONFLICT_END };
});
export const restoreState = ca((state) => {
    return { type: types.RESTORE_STATE, state };
});
export const clearState = ca(() => {
    return { type: types.CLEAR_STATE };
});
//# sourceMappingURL=actions.js.map