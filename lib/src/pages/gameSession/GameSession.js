import * as React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import BetsList from "../../platform/components/bet/BetsList";
import { showBetModal, showUserModal } from "../../platform/modules/modals/actions";
import { Container, DataLoader } from "../../reusable";
import Ether from "../../reusable/Ether";
import Style from "./GameSession.scss";
import PathNotFound from "../../app/PathNotFound";
const mapDispatchToProps = (dispatch) => bindActionCreators({
    showBetModal,
    showUserModal,
}, dispatch);
const GameSession = (props) => {
    const { showBetModal, showUserModal } = props;
    const params = useParams();
    const gameIdString = params.gameId;
    if (!gameIdString) {
        return React.createElement(PathNotFound, null);
    }
    const gameId = gameIdString.match(/\d+/);
    if (!gameId) {
        return React.createElement(PathNotFound, null);
    }
    return (React.createElement(Container, null,
        React.createElement(DataLoader, { url: `/stateChannel/gameState/${gameId}`, success: (gameState) => (React.createElement("div", { className: Style.header },
                React.createElement("h3", null,
                    "Game session:",
                    gameId),
                React.createElement("span", null,
                    "Created by",
                    " ",
                    React.createElement("button", { className: Style.userButton, onClick: () => showUserModal({ user: gameState.user }) }, gameState.user.username)),
                React.createElement("span", null,
                    gameState.status === "ENDED" ? gameState.roundId - 1 : gameState.roundId,
                    " Bets"),
                React.createElement(Ether, { colored: true, gwei: gameState.balance }))) }),
        React.createElement(DataLoader, { url: `/bets/gameId/${gameId}`, success: (data) => (React.createElement(BetsList, { bets: data.bets, showUser: false, showBetModal: (bet) => showBetModal({ bet }), showUserModal: (user) => showUserModal({ user }) })) })));
};
export default connect(null, mapDispatchToProps)(GameSession);
//# sourceMappingURL=GameSession.js.map