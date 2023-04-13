export function fixedLengthAddElement(array, element, maxLength) {
    if (array.length >= maxLength) {
        return [...array.slice(array.length - maxLength + 1), element];
    }
    else {
        return [...array, element];
    }
}
export function fixedLengthAddElementFront(array, element, maxLength) {
    if (array.length >= maxLength) {
        return [element, ...array.slice(0, maxLength - 1)];
    }
    else {
        return [element, ...array];
    }
}
export function createConstant(p, prefix) {
    const res = prefix + "/" + p;
    return res;
}
export function assertNever(t) {
    return t;
}
export function isLocalStorageAvailable() {
    const mod = "test";
    try {
        localStorage.setItem(mod, mod);
        localStorage.removeItem(mod);
        return true;
    }
    catch (e) {
        return false;
    }
}
export function isSessionStorageAvailable() {
    const mod = "test";
    try {
        sessionStorage.setItem(mod, mod);
        sessionStorage.removeItem(mod);
        return true;
    }
    catch (e) {
        return false;
    }
}
export function truncate(str, n) {
    if (n < 3) {
        throw new Error("n needs to be at least 3");
    }
    return str.length > n ? str.substr(0, n - 3) + "..." : str;
}
//# sourceMappingURL=util.js.map