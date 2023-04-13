import * as types from "./constants";
import { assertNever } from "../../../util/util";
const initialState = {
    web3: null,
    account: null,
    chainId: null,
    contract: null,
    balance: null,
};
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case types.CHANGE_WEB3:
            return Object.assign(Object.assign({}, state), { web3: action.web3 });
        case types.CHANGE_ACCOUNT:
            return Object.assign(Object.assign({}, state), { account: action.account });
        case types.CHANGE_NETWORK:
            return Object.assign(Object.assign({}, state), { chainId: action.chainId });
        case types.CHANGE_CONTRACT:
            return Object.assign(Object.assign({}, state), { contract: action.contract });
        case types.CHANGE_BALANCE:
            return Object.assign(Object.assign({}, state), { balance: action.balance });
        default:
            assertNever(action);
            return state;
    }
}
//# sourceMappingURL=reducer.js.map