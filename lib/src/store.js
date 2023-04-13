var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import * as Sentry from "@sentry/react";
import { applyMiddleware, createStore, compose } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { VERSION } from "./config/config";
import rootReducer from "./rootReducer";
import { truncate } from "./util/util";
const middlewares = [thunkMiddleware];
function filterState(state) {
    // remove chat, bets, account from state
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { chat, bets, account, web3 } = state, newState = __rest(state, ["chat", "bets", "account", "web3"]);
    // remove hashChain from state
    return Object.assign(Object.assign({}, newState), { games: Object.assign(Object.assign({}, newState.games), { gameState: Object.assign(Object.assign({}, newState.games.gameState), { hashChain: undefined }) }) });
}
function filterAction(action) {
    // Remove data from action
    const type = action === null || action === void 0 ? void 0 : action.type;
    return { type };
}
if (process.env.SENTRY_LOGGING) {
    Sentry.init({
        dsn: "https://551f6a44d9a54cfe9c18e976685f8234@o103499.ingest.sentry.io/227657",
        tunnel: "/sentry",
        release: `dicether@${VERSION}`,
        normalizeDepth: 10,
        maxBreadcrumbs: 20,
        beforeBreadcrumb(breadcrumb, hint) {
            var _a;
            if (breadcrumb.category === "xhr") {
                const response = (_a = hint === null || hint === void 0 ? void 0 : hint.xhr) === null || _a === void 0 ? void 0 : _a.response;
                const truncatedResponse = response !== undefined ? truncate(response, 100) : undefined;
                breadcrumb.data = Object.assign(Object.assign({}, breadcrumb.data), { response: truncatedResponse });
            }
            return breadcrumb;
        },
    });
}
if (process.env.REDUX_LOGGING) {
    middlewares.push(createLogger());
}
const sentryReduxEnhancer = Sentry.createReduxEnhancer({
// Optionally pass options listed below
});
export const store = createStore(rootReducer, compose(applyMiddleware(...middlewares)));
//# sourceMappingURL=store.js.map