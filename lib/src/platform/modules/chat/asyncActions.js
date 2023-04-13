import axios from "axios";
import jwtDecode from "jwt-decode";
import { showInfoMessage, showSuccessMessage } from "../utilities/actions";
import { catchError } from "../utilities/asyncActions";
import { addMessage, changeMessages } from "./actions";
import { executeCommands } from "./commands";
export function loadMessages() {
    return (dispatch) => {
        axios
            .get("/chat/messages")
            .then((response) => {
            const messages = response.data;
            dispatch(changeMessages(messages));
        })
            .catch((error) => catchError(error, dispatch));
    };
}
export function sendMessage(message) {
    return (dispatch) => {
        // check if special message
        if (executeCommands(dispatch, message)) {
            return;
        }
        axios
            .post("/chat/sendMessage", {
            message,
        })
            .catch((error) => catchError(error, dispatch));
    };
}
export function mute(address) {
    return (dispatch) => {
        axios
            .post("/chat/muteUser", {
            address,
        })
            .then(() => {
            dispatch(showSuccessMessage("Muted player!"));
        })
            .catch((error) => catchError(error, dispatch));
    };
}
export function deleteMessage(messageId) {
    return (dispatch) => {
        axios
            .post("/chat/deleteMessage", {
            messageId,
        })
            .catch((error) => catchError(error, dispatch));
    };
}
export function addNewMessage(message) {
    return (dispatch, getState) => {
        const messages = getState().chat.messages;
        if (messages.length > 0 && messages[messages.length - 1].id + 1 !== message.id) {
            return dispatch(loadMessages());
        }
        const jwt = getState().account.jwt;
        const userName = jwt ? jwtDecode(jwt).username : undefined;
        const msg = message.message;
        if (message.user.username !== userName &&
            (msg.includes("@everybody") || (userName && msg.includes(`@${userName}`)))) {
            dispatch(showInfoMessage(`You were mentioned by ${message.user.username} in the chat!`));
        }
        dispatch(addMessage(message));
    };
}
//# sourceMappingURL=asyncActions.js.map