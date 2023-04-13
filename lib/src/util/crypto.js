import { bufferToHex } from "ethereumjs-util";
export function generateSeed() {
    const buffer = Buffer.alloc(32);
    const crypto = window.crypto || window.msCrypto;
    crypto.getRandomValues(buffer);
    return bufferToHex(buffer);
}
//# sourceMappingURL=crypto.js.map