import * as React from "react";
import { DataLoader } from "../../../reusable";
import BetInfo from "./BetInfo";
const Bet = ({ bet, betId }) => bet ? (React.createElement(BetInfo, { bet: bet })) : (React.createElement(DataLoader, { url: `/bets/bet/${betId}`, success: (bet) => React.createElement(BetInfo, { bet: bet }) }));
export default Bet;
//# sourceMappingURL=Bet.js.map