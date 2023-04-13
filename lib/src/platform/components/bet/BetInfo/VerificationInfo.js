import * as React from "react";
import { FROM_BASE_TO_WEI } from "../../../../config/config";
import { Collapse, Output } from "../../../../reusable/index";
import CollapseButton from "./CollapseButton";
import Verification from "./Verification";
import Style from "./VerificationInfo.scss";
const Entry = ({ id, name, data }) => (React.createElement("div", { className: Style.verificationInfo__entry },
    React.createElement("span", null, name),
    React.createElement(Output, { className: Style.verificationInfo__value, id: id, value: data })));
class VerificationInfo extends React.PureComponent {
    constructor(props) {
        super(props);
        this.toggle = () => {
            this.setState({ isOpen: !this.state.isOpen });
        };
        this.state = {
            isOpen: false,
        };
    }
    render() {
        const { isOpen } = this.state;
        const { bet } = this.props;
        const value = bet.value * FROM_BASE_TO_WEI;
        const balance = bet.balance * FROM_BASE_TO_WEI;
        return (React.createElement("div", { className: Style.verificationInfo },
            React.createElement(CollapseButton, { name: "Show Verification Data", isOpen: isOpen, onClick: this.toggle }),
            React.createElement(Collapse, { isOpen: isOpen, style: { width: "100%" } },
                React.createElement("div", null,
                    React.createElement(Entry, { id: `bet_${bet.id}_roundId`, name: "Round Id", data: bet.roundId }),
                    React.createElement(Entry, { id: `bet_${bet.id}_gameType`, name: "Game Type", data: bet.gameType }),
                    React.createElement(Entry, { id: `bet_${bet.id}_num`, name: "Number", data: bet.num }),
                    React.createElement(Entry, { id: `bet_${bet.id}_betValue`, name: "Bet Value (Wei)", data: value }),
                    React.createElement(Entry, { id: `bet_${bet.id}_balance`, name: "Balance (Wei)", data: balance }),
                    React.createElement(Entry, { id: `bet_${bet.id}_serverHash`, name: "Server Hash", data: bet.serverHash }),
                    React.createElement(Entry, { id: `bet_${bet.id}_userHash`, name: "User Hash", data: bet.userHash }),
                    React.createElement(Entry, { id: `bet_${bet.id}_serverSeed`, name: "Server seed", data: bet.serverSeed }),
                    React.createElement(Entry, { id: `bet_${bet.id}_userSeed`, name: "User seed", data: bet.userSeed }),
                    React.createElement(Entry, { id: `bet_${bet.id}_gameId`, name: "Game Id", data: bet.gameId }),
                    React.createElement(Entry, { id: `bet_${bet.id}_contractAddress`, name: "Contract Address", data: bet.contractAddress }),
                    React.createElement(Entry, { id: `bet_${bet.id}_serverSig`, name: "Server Signature", data: bet.serverSig }),
                    React.createElement(Entry, { id: `bet_${bet.id}_userSig`, name: "User Signature", data: bet.userSig })),
                React.createElement(Verification, { bet: bet }))));
    }
}
export default VerificationInfo;
//# sourceMappingURL=VerificationInfo.js.map