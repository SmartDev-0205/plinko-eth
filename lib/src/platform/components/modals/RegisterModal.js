import * as React from "react";
import { connectModal } from "redux-modal";
import { Modal } from "../../../reusable";
import Register from "../user/Register";
const MissingWalletModal = ({ show, handleHide }) => (React.createElement(Modal, { toggle: handleHide, isOpen: show },
    React.createElement(Register, null)));
export default connectModal({ name: "register" })(MissingWalletModal);
//# sourceMappingURL=RegisterModal.js.map