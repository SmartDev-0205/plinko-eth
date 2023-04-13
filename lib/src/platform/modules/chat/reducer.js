import { assertNever, fixedLengthAddElement } from "../../../util/util";
import * as types from "./constants";
const initialState = {
    show: window.innerWidth >= 992,
    messages: [],
    numUsers: 0,
};
const MAX_MESSAGES = 50;
export default function chat(state = initialState, action) {
    switch (action.type) {
        case types.TOGGLE_CHAT:
            return Object.assign(Object.assign({}, state), { show: action.show });
        case types.CHANGE_MESSAGES:
            return Object.assign(Object.assign({}, state), { messages: action.messages });
        case types.ADD_MESSAGE:
            return Object.assign(Object.assign({}, state), { messages: fixedLengthAddElement(state.messages, action.message, MAX_MESSAGES) });
        case types.CHANGE_USERS_ONLINE:
            return Object.assign(Object.assign({}, state), { numUsers: action.numUsers });
        case types.DELETE_MESSAGE:
            return Object.assign(Object.assign({}, state), { messages: state.messages.map((m) => (m.id === action.messageId ? Object.assign(Object.assign({}, m), { deleted: true }) : m)) });
        default:
            assertNever(action);
            return state;
    }
}
//# sourceMappingURL=reducer.js.map