import { addNewBet } from "./asyncActions";
const listeners = {
    bet: (dispatch) => (bet) => {
        dispatch(addNewBet(bet));
    },
};
export default listeners;
//# sourceMappingURL=socketListeners.js.map