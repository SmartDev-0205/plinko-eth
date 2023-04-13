import axios from "axios";
import { catchError } from "../utilities/asyncActions";
import { addFriendS, addSentFriendRequest, changeFriends, changeReceivedFriendRequests, changeSentFriendRequests, removeReceivedFriendRequest, removeSentFriendRequest, } from "./actions";
export function sendFriendRequest(address) {
    return (dispatch) => {
        return axios
            .post("/chat/sendFriendRequest", {
            address,
        })
            .then((response) => dispatch(addSentFriendRequest(response.data)))
            .catch((error) => catchError(error, dispatch));
    };
}
export function declineFriendRequest(address) {
    return (dispatch) => {
        return axios
            .post("/chat/declineFriendRequest", {
            address,
        })
            .then(() => dispatch(removeReceivedFriendRequest(address)))
            .catch((error) => catchError(error, dispatch));
    };
}
export function addFriend(friend) {
    return (dispatch) => {
        dispatch(removeReceivedFriendRequest(friend.user.address));
        dispatch(removeSentFriendRequest(friend.user.address));
        dispatch(addFriendS(friend));
    };
}
export function declinedFriendRequest(address) {
    return (dispatch) => {
        dispatch(removeSentFriendRequest(address));
    };
}
export function cancelFriendRequest(address) {
    return (dispatch) => {
        return axios
            .post("/chat/cancelFriendRequest", {
            address,
        })
            .then(() => dispatch(removeSentFriendRequest(address)))
            .catch((error) => catchError(error, dispatch));
    };
}
export function acceptFriendRequest(address) {
    return (dispatch) => {
        return axios
            .post("/chat/acceptFriendRequest", {
            address,
        })
            .then((response) => {
            dispatch(addFriend(response.data));
            dispatch(removeReceivedFriendRequest(address));
        })
            .catch((error) => catchError(error, dispatch));
    };
}
export function loadFriendRequests(_address) {
    return (dispatch) => {
        return axios
            .get("/chat/friendRequests")
            .then((response) => {
            const data = response.data;
            dispatch(changeSentFriendRequests(data.sentFriendRequests));
            dispatch(changeReceivedFriendRequests(data.receivedFriendRequests));
        })
            .catch((error) => catchError(error, dispatch));
    };
}
export function loadFriends(_address) {
    return (dispatch) => {
        return axios
            .get("/chat/friends")
            .then((response) => dispatch(changeFriends(response.data)))
            .catch((error) => catchError(error, dispatch));
    };
}
//# sourceMappingURL=asyncActions.js.map