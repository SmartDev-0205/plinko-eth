import * as types from "../../../app/constants";
const initialState = {
    notification: null,
    nightMode: localStorage.getItem("night") === "night",
};
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case types.CHANGE_NOTIFICATION:
            return Object.assign(Object.assign({}, state), { notification: action.notification });
        case types.TOGGLE_THEME:
            localStorage.setItem("night", action.nightMode ? "night" : "day");
            return Object.assign(Object.assign({}, state), { nightMode: action.nightMode });
        default:
            return state;
    }
}
//# sourceMappingURL=reducer.js.map