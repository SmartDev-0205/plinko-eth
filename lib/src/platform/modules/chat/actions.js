import * as types from "./constants";
const ca = (a) => a;
export const toggleChat = ca((show) => {
    return { type: types.TOGGLE_CHAT, show };
});
export const changeMessages = ca((messages) => {
    return { type: types.CHANGE_MESSAGES, messages };
});
export const addMessage = ca((message) => {
    return { type: types.ADD_MESSAGE, message };
});
export const deleteMessage = ca((messageId) => {
    return { type: types.DELETE_MESSAGE, messageId };
});
export const changeUsersOnline = ca((numUsers) => {
    return { type: types.CHANGE_USERS_ONLINE, numUsers };
});
//# sourceMappingURL=actions.js.map