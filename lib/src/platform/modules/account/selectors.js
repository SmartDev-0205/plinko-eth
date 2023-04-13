import jwtDecode from "jwt-decode";
import { createSelector } from "reselect";
export const getUser = createSelector([(state) => state.account.jwt], (jwt) => {
    return jwt !== null ? jwtDecode(jwt) : null;
});
//# sourceMappingURL=selectors.js.map