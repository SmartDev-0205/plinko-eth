import { PAYOUT_DIVIDER } from "@dicether/state-channel";
export function formatMultiplier(multiplier) {
    return `${(multiplier / PAYOUT_DIVIDER).toFixed(2)}x`;
}
//# sourceMappingURL=utility.js.map