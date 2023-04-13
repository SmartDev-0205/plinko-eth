import * as types from "./constants";
const ca = (a) => a;
export const changeBets = ca((bets) => {
    return { type: types.CHANGE_BETS, bets };
});
export const addBet = ca((bet) => {
    return { type: types.ADD_BET, bet };
});
export const changeMyBets = ca((myBets) => {
    return { type: types.CHANGE_MY_BETS, myBets };
});
export const addMyBet = ca((myBet) => {
    return { type: types.ADD_MY_BET, myBet };
});
//# sourceMappingURL=actions.js.map