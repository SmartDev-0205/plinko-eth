import { showBetModal, showUserModal } from "../modals/actions";
export const COMMANDS = [
    { name: "/user", params: "name", description: "Show user info" },
    { name: "/bet", params: "betId", description: "Show bet info" },
];
export const SHOW_BET = /^\/bet (\d+)$/;
export const SHOW_USER = /^\/user (\S+)$/;
export function getMatchingCommands(msg) {
    return COMMANDS.filter((x) => x.name.startsWith(msg) || msg.startsWith(x.name));
}
export function executeCommands(dispatch, message) {
    const betMatch = message.match(SHOW_BET);
    if (betMatch) {
        dispatch(showBetModal({ betId: Number.parseInt(betMatch[1], 10) }));
        return true;
    }
    const userMatch = message.match(SHOW_USER);
    if (userMatch) {
        dispatch(showUserModal({ userName: userMatch[1] }));
        return true;
    }
    return false;
}
//# sourceMappingURL=commands.js.map