import * as types from "./constants";
const ca = (a) => a;
export const changeWeb3 = ca((web3) => {
    return { type: types.CHANGE_WEB3, web3 };
});
export const changeAccount = ca((account) => {
    return { type: types.CHANGE_ACCOUNT, account };
});
export const changeChainId = ca((chainId) => {
    return { type: types.CHANGE_NETWORK, chainId };
});
export const changeContract = ca((contract) => {
    return { type: types.CHANGE_CONTRACT, contract };
});
export const changeBalance = ca((balance) => {
    return { type: types.CHANGE_BALANCE, balance };
});
//# sourceMappingURL=actions.js.map