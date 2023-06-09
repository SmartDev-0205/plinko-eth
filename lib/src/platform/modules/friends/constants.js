import { createConstant } from "../../../util/util";
function c(p) {
    return createConstant(p, "chat/friends");
}
export const CHANGE_FRIENDS = c("CHANGE_FRIENDS");
export const ADD_FRIEND = c("ADD_FRIEND");
export const CHANGE_RECEIVED_FRIEND_REQUESTS = c("CHANGE_RECEIVED_FRIEND_REQUESTS");
export const ADD_RECEIVED_FRIEND_REQUEST = c("ADD_RECEIVED_FRIEND_REQUEST");
export const REMOVE_RECEIVED_FRIEND_REQUEST = c("REMOVE_RECEIVED_FRIEND_REQUEST");
export const CHANGE_SENT_FRIEND_REQUESTS = c("CHANGE_SENT_FRIEND_REQUESTS");
export const ADD_SENT_FRIEND_REQUEST = c("ADD_SENT_FRIEND_REQUEST");
export const REMOVE_SENT_FRIEND_REQUEST = c("REMOVE_SENT_FRIEND_REQUEST");
export const TOGGLE_FRIEND_ONLINE = c("TOGGLE_FRIEND_ONLINE");
//# sourceMappingURL=constants.js.map