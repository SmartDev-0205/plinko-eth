import { GameType } from "@dicether/state-channel";
import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { showUserModal } from "../../../modules/modals/actions";
import ChooseFrom12BetInfo from "./ChooseFrom12BetInfo";
import DiceBetInfo from "./DiceBetInfo";
import FlipACoinBetInfo from "./FlipACoinBetInfo";
import KenoBetInfo from "./KenoBetInfo";
import Overview from "./Overview";
import PlinkoBetInfo from "./PlinkoBetInfo";
import VerificationInfo from "./VerificationInfo";
import WheelBetInfo from "./WheelBetInfo";
const GameSpecificInfo = ({ gameType, betNum, resultNum }) => {
    switch (gameType) {
        case GameType.DICE_LOWER:
        case GameType.DICE_HIGHER:
            return React.createElement(DiceBetInfo, { betNum: betNum, resultNum: resultNum, gameType: gameType });
        case GameType.CHOOSE_FROM_12:
            return React.createElement(ChooseFrom12BetInfo, { betNum: betNum, resultNum: resultNum });
        case GameType.FLIP_A_COIN:
            return React.createElement(FlipACoinBetInfo, { betNum: betNum, resultNum: resultNum });
        case GameType.KENO:
            return React.createElement(KenoBetInfo, { betNum: betNum, resultNum: resultNum });
        case GameType.WHEEL:
            return React.createElement(WheelBetInfo, { betNum: betNum, resultNum: resultNum });
        case GameType.PLINKO:
            return React.createElement(PlinkoBetInfo, { betNum: betNum, resultNum: resultNum });
        default:
            return null;
    }
};
const mapDispatchToProps = (dispatch) => bindActionCreators({
    showUserModal,
}, dispatch);
class BetInfo extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { bet, showUserModal } = this.props;
        return (React.createElement("div", null,
            React.createElement(Overview, { bet: bet, showUserModal: (user) => showUserModal({ user }) }),
            React.createElement(GameSpecificInfo, { betNum: bet.num, resultNum: bet.resultNum, gameType: bet.gameType }),
            React.createElement(VerificationInfo, { bet: bet })));
    }
}
export default connect(null, mapDispatchToProps)(BetInfo);
//# sourceMappingURL=index.js.map