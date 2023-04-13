export function isValidUserName(username) {
    return username.length <= 15 && username.length >= 3 && /^[a-z0-9]+$/i.test(username);
}
//# sourceMappingURL=util.js.map