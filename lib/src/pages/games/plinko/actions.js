import * as types from "./constants";
const ca = (a) => a;
export const changeValue = ca((value) => {
    return { type: types.CHANGE_VALUE, value };
});
export const changeNum = ca((num) => {
    return { type: types.CHANGE_NUM, num };
});
//# sourceMappingURL=actions.js.map