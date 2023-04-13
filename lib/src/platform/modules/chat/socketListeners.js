import { changeUsersOnline, deleteMessage } from "./actions";
import { addNewMessage } from "./asyncActions";
const listeners = {
    usersOnline: (dispatch) => (numUsers) => {
        dispatch(changeUsersOnline(numUsers.numUsers));
    },
    message: (dispatch) => (message) => {
        dispatch(addNewMessage(message));
    },
    deleteMessage: (dispatch) => (messageId) => {
        dispatch(deleteMessage(messageId));
    },
};
export default listeners;
//# sourceMappingURL=socketListeners.js.map