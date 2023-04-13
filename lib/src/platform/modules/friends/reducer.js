import * as types from "./constants";
import { assertNever } from "../../../util/util";
export const initialState = {
    friends: [],
    sentFriendRequests: [],
    receivedFriendRequests: [],
};
function updateFriendStatus(friend, online) {
    return Object.assign(Object.assign({}, friend), { online });
}
export default function (state = initialState, action) {
    switch (action.type) {
        case types.CHANGE_FRIENDS:
            return Object.assign(Object.assign({}, state), { friends: action.friends });
        case types.ADD_FRIEND:
            return Object.assign(Object.assign({}, state), { friends: [...state.friends, action.friend] });
        case types.CHANGE_RECEIVED_FRIEND_REQUESTS:
            return Object.assign(Object.assign({}, state), { receivedFriendRequests: action.receivedFriendRequests });
        case types.ADD_RECEIVED_FRIEND_REQUEST:
            return Object.assign(Object.assign({}, state), { receivedFriendRequests: [...state.receivedFriendRequests, action.receivedFriendRequest] });
        case types.REMOVE_RECEIVED_FRIEND_REQUEST: {
            const address = action.address;
            return Object.assign(Object.assign({}, state), { receivedFriendRequests: state.receivedFriendRequests.filter((friendReq) => friendReq.from.address !== address) });
        }
        case types.CHANGE_SENT_FRIEND_REQUESTS:
            return Object.assign(Object.assign({}, state), { sentFriendRequests: action.sentFriendRequests });
        case types.ADD_SENT_FRIEND_REQUEST:
            return Object.assign(Object.assign({}, state), { sentFriendRequests: [...state.sentFriendRequests, action.sentFriendRequest] });
        case types.REMOVE_SENT_FRIEND_REQUEST: {
            const address = action.address;
            return Object.assign(Object.assign({}, state), { sentFriendRequests: state.sentFriendRequests.filter((friendReq) => friendReq.to.address !== address) });
        }
        case types.TOGGLE_FRIEND_ONLINE: {
            const status = action.status;
            return Object.assign(Object.assign({}, state), { friends: state.friends.map((friend) => status.address === friend.user.address ? updateFriendStatus(friend, status.online) : friend) });
        }
        default:
            assertNever(action);
            return state;
    }
}
//# sourceMappingURL=reducer.js.map