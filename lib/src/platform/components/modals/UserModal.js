import * as React from "react";
import { connectModal } from "redux-modal";
import { Modal } from "../../../reusable";
import User from "../user/User";
const UserModal = ({ show, handleHide, user, userName }) => (React.createElement(Modal, { toggle: handleHide, isOpen: show },
    React.createElement(User, { userName: userName, user: user })));
export default connectModal({ name: "user" })(UserModal);
//# sourceMappingURL=UserModal.js.map