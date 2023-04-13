import { addReceivedFriendRequest, removeReceivedFriendRequest, toggleFriendOnline } from "./actions";
import { addFriend, declinedFriendRequest } from "./asyncActions";
const listeners = {
    addFriend: (dispatch) => (friend) => {
        dispatch(addFriend(friend));
    },
    friendRequest: (dispatch) => (friendRequest) => {
        dispatch(addReceivedFriendRequest(friendRequest));
    },
    declineFriendRequest: (dispatch) => (address) => {
        dispatch(declinedFriendRequest(address));
    },
    cancelFriendRequest: (dispatch) => (address) => {
        dispatch(removeReceivedFriendRequest(address));
    },
    toggleFriendOnline: (dispatch) => (address, online) => {
        dispatch(toggleFriendOnline(address, online));
    },
};
export default listeners;
//# sourceMappingURL=socketListeners.js.map