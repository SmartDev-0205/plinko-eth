import { calcResultNumber, verifySeed, verifySignature } from "@dicether/state-channel";
import * as React from "react";
import { CHAIN_ID, SERVER_ADDRESS } from "../../../../config/config";
import { FontAwesomeIcon } from "../../../../reusable/index";
import Style from "./Verification.scss";
const OLD_SERVER_ADDRESS = "0xCef260a5Fed7A896BBE07b933B3A5c17aEC094D8";
const Valid = ({ valid }) => valid ? React.createElement(FontAwesomeIcon, { icon: "check", color: "success" }) : React.createElement(FontAwesomeIcon, { icon: "times", color: "danger" });
class Verification extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        const { bet } = this.props;
        const validUserSeed = verifySeed(bet.userSeed, bet.userHash);
        const validServerSeed = verifySeed(bet.serverSeed, bet.serverHash);
        const signatureVersion = 2;
        const serverAddress = bet.gameId < 5246 ? OLD_SERVER_ADDRESS : SERVER_ADDRESS;
        const validUserSig = verifySignature(bet, CHAIN_ID, bet.contractAddress, bet.userSig, bet.user.address, signatureVersion);
        const validServerSig = verifySignature(bet, CHAIN_ID, bet.contractAddress, bet.serverSig, serverAddress, signatureVersion);
        const resultNum = calcResultNumber(bet.gameType, bet.serverSeed, bet.userSeed, bet.num);
        const validResultNum = bet.resultNum === resultNum;
        return (React.createElement("div", { className: Style.verification },
            React.createElement("div", { className: Style.entry },
                React.createElement("code", null, "keccak(userSeed) == userHash"),
                React.createElement(Valid, { valid: validUserSeed })),
            React.createElement("div", { className: Style.entry },
                React.createElement("code", null, "keccak(serverSeed) == serverHash"),
                React.createElement(Valid, { valid: validServerSeed })),
            React.createElement("div", { className: Style.entry },
                React.createElement("code", null, "userSignature is valid"),
                React.createElement(Valid, { valid: validUserSig })),
            React.createElement("div", { className: Style.entry },
                React.createElement("code", null, "serverSignature is valid"),
                React.createElement(Valid, { valid: validServerSig })),
            React.createElement("div", { className: Style.entry },
                React.createElement("code", null, "ResultNum is valid"),
                React.createElement(Valid, { valid: validResultNum }))));
    }
}
export default Verification;
//# sourceMappingURL=Verification.js.map