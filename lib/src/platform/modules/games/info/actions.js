import * as types from "./constants";
const ca = (a) => a;
export const toggleHelp = ca((show) => {
    return { type: types.TOGGLE_HELP, show };
});
export const toggleExpertView = ca((show) => {
    return { type: types.TOGGLE_EXPERT_VIEW, show };
});
export const toggleSound = ca((enabled) => {
    return { type: types.TOGGLE_SOUND, enabled };
});
//# sourceMappingURL=actions.js.map