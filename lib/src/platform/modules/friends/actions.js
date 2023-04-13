import * as types from "./constants";
const ca = (a) => a;
export const changeFriends = ca((friends) => {
    return { type: types.CHANGE_FRIENDS, friends };
});
export const addFriendS = ca((friend) => {
    return { type: types.ADD_FRIEND, friend };
});
export const changeReceivedFriendRequests = ca((receivedFriendRequests) => {
    return { type: types.CHANGE_RECEIVED_FRIEND_REQUESTS, receivedFriendRequests };
});
export const addReceivedFriendRequest = ca((receivedFriendRequest) => {
    return { type: types.ADD_RECEIVED_FRIEND_REQUEST, receivedFriendRequest };
});
export const changeSentFriendRequests = ca((sentFriendRequests) => {
    return { type: types.CHANGE_SENT_FRIEND_REQUESTS, sentFriendRequests };
});
export const addSentFriendRequest = ca((sentFriendRequest) => {
    return { type: types.ADD_SENT_FRIEND_REQUEST, sentFriendRequest };
});
export const removeReceivedFriendRequest = ca((address) => {
    return { type: types.REMOVE_RECEIVED_FRIEND_REQUEST, address };
});
export const removeSentFriendRequest = ca((address) => {
    return { type: types.REMOVE_SENT_FRIEND_REQUEST, address };
});
export const toggleFriendOnline = ca((address, online) => {
    return { type: types.TOGGLE_FRIEND_ONLINE, status: { address, online } };
});
//# sourceMappingURL=actions.js.map