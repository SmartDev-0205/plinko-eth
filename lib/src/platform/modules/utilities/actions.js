import * as types from "../../../app/constants";
const ca = (a) => a;
export const showErrorMessage = ca((message) => {
    const notification = { message, type: "error" };
    return { type: types.CHANGE_NOTIFICATION, notification };
});
export const showSuccessMessage = ca((message) => {
    const notification = { message, type: "success" };
    return { type: types.CHANGE_NOTIFICATION, notification };
});
export const showInfoMessage = ca((message) => {
    const notification = { message, type: "info" };
    return { type: types.CHANGE_NOTIFICATION, notification };
});
export const toggleTheme = ca((nightMode) => {
    return { type: types.TOGGLE_THEME, nightMode };
});
//# sourceMappingURL=actions.js.map