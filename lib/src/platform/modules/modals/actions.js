import { hide, show } from "redux-modal";
export function showMissingWalletModal() {
    return show("missingWallet");
}
export function hideMissingWalletModal() {
    return hide("missingWallet");
}
function showRegisterModalInternal() {
    return show("register");
}
export function hideRegisterModal() {
    return hide("register");
}
export function showBetModal({ bet, betId }) {
    return show("bet", { bet, betId });
}
export function hideBetModal() {
    return hide("bet");
}
export function showUserModal({ user, userName }) {
    return show("user", { user, userName });
}
export function hideUserModal() {
    return hide("user");
}
export function showRegisterModal() {
    return (dispatch, getState) => {
        if (!getState().web3.web3) {
            dispatch(showMissingWalletModal());
        }
        else {
            dispatch(showRegisterModalInternal());
        }
    };
}
//# sourceMappingURL=actions.js.map