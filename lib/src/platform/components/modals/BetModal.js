import * as React from "react";
import { connectModal } from "redux-modal";
import { Modal } from "../../../reusable";
import Bet from "../bet/Bet";
const BetModal = ({ show, handleHide, bet, betId }) => (React.createElement(Modal, { toggle: handleHide, isOpen: show },
    React.createElement(Bet, { betId: betId, bet: bet })));
export default connectModal({ name: "bet" })(BetModal);
//# sourceMappingURL=BetModal.js.map