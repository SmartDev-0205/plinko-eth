import {GameType} from "@dicether/state-channel";
import * as React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {Dispatch} from "../../../../util/util";
import {Bet} from "../../../modules/bets/types";
import {showUserModal} from "../../../modules/modals/actions";
import Overview from "./Overview";
import PlinkoBetInfo from "./PlinkoBetInfo";
import VerificationInfo from "./VerificationInfo";

type GameSpecificInfoProps = {
    gameType: number;
    betNum: number;
    resultNum: number;
};

const GameSpecificInfo = ({gameType, betNum, resultNum}: GameSpecificInfoProps) => {
    switch (gameType) {
        case GameType.DICE_LOWER:
        case GameType.PLINKO:
            return <PlinkoBetInfo betNum={betNum} resultNum={resultNum} />;
        default:
            return null;
    }
};

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            showUserModal,
        },
        dispatch
    );

type OtherProps = {
    bet: Bet;
};

type Props = ReturnType<typeof mapDispatchToProps> & OtherProps;

class BetInfo extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        const {bet, showUserModal} = this.props;

        return (
            <div>
                <Overview bet={bet} showUserModal={(user) => showUserModal({user})} />
                <GameSpecificInfo betNum={bet.num} resultNum={bet.resultNum} gameType={bet.gameType} />
                <VerificationInfo bet={bet} />
            </div>
        );
    }
}

export default connect(null, mapDispatchToProps)(BetInfo);
