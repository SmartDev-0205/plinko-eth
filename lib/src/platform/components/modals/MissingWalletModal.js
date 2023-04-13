import * as React from "react";
import { connectModal } from "redux-modal";
import { MissingWallet, Modal } from "../../../reusable";
const MissingWalletModal = ({ show, handleHide }) => (React.createElement(Modal, { toggle: handleHide, isOpen: show },
    React.createElement(MissingWallet, null)));
export default connectModal({ name: "missingWallet" })(MissingWalletModal);
//# sourceMappingURL=MissingWalletModal.js.map