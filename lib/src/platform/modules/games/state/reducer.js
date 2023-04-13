import { keccak } from "@dicether/state-channel";
import * as Sentry from "@sentry/browser";
import { assertNever } from "../../../../util/util";
import * as types from "./constants";
import { CHAIN_ID } from "../../../../config/config";
const initialState = {
    chainId: CHAIN_ID,
    status: "ENDED",
    hashChain: [],
    stake: 0,
    roundId: 0,
    gameType: 0,
    num: 0,
    betValue: 0,
    balance: 0,
    oldBalance: 0,
};
function placeBet(state, bet, serverSig, userSig) {
    if (state.status === "ACTIVE" && state.roundId + 1 === bet.roundId) {
        return Object.assign(Object.assign({}, state), { status: "PLACED_BET", roundId: bet.roundId, gameType: bet.gameType, num: bet.num, betValue: bet.value, balance: bet.balance, serverHash: bet.serverHash, userHash: bet.userHash, serverSig,
            userSig });
    }
    else {
        Sentry.captureMessage("Unexpected place bet in reducer!");
        return state;
    }
}
function revealSeed(state, serverSeed, userSeed, balance) {
    if (state.status === "PLACED_BET" && state.userHash === keccak(userSeed)) {
        return Object.assign(Object.assign({}, state), { status: "ACTIVE", serverHash: serverSeed, userHash: userSeed, oldBalance: state.balance, balance });
    }
    else {
        Sentry.captureMessage("Unexpected reveal seed in reducer!");
        return state;
    }
}
export default function state(state = initialState, action) {
    switch (action.type) {
        case types.CREATING_GAME:
            return Object.assign(Object.assign({}, initialState /* sic! */), { status: "CREATING", hashChain: action.hashChain, stake: action.value, userHash: action.hashChain[0], serverHash: action.serverEndHash, createTransactionHash: action.createTransactionHash });
        case types.GAME_CREATED:
            return Object.assign(Object.assign({}, state), { status: "ACTIVE", gameId: action.gameId });
        case types.ENDED_GAME:
            return Object.assign(Object.assign({}, state), { status: "ENDED", reasonEnded: "REGULAR_ENDED", endTransactionHash: action.endTransactionHash, roundId: action.roundId, gameType: 0, num: 0, betValue: 0, serverHash: action.serverHash, userHash: action.userHash, serverSig: action.serverSig, userSig: action.userSig });
        case types.PLACE_BET:
            return placeBet(state, action.bet, action.serverSig, action.userSig);
        case types.END_BET:
            return revealSeed(state, action.serverSeed, action.userSeed, action.balance);
        case types.ENDED_WITH_REASON:
            return Object.assign(Object.assign({}, state), { status: "ENDED", reasonEnded: action.reason });
        case types.USER_INITIATE_CONFLICT_END:
            return Object.assign(Object.assign({}, state), { status: "USER_INITIATED_CONFLICT_END", conflictEndTransactionHash: action.transactionHash, previousState: state.status });
        case types.USER_ABORT_CONFLICT_END:
        case types.USER_ABORT_FORCE_END:
            return Object.assign(Object.assign({}, state), { status: state.previousState, previousState: undefined });
        case types.USER_CONFLICT_END:
            return Object.assign(Object.assign({}, state), { status: "USER_CONFLICT_ENDED", conflictEndTime: action.time });
        case types.USER_INITIATE_FORCE_END:
            return Object.assign(Object.assign({}, state), { status: "USER_INITIATED_FORCE_END", forceEndTransactionHash: action.transactionHash, previousState: state.status });
        case types.SERVER_CONFLICT_END:
            return Object.assign(Object.assign({}, state), { status: "SERVER_CONFLICT_ENDED" });
        case types.RESTORE_STATE:
            return Object.assign({}, action.state);
        case types.CLEAR_STATE:
            return initialState;
        default:
            assertNever(action);
            return state;
    }
}
//# sourceMappingURL=reducer.js.map