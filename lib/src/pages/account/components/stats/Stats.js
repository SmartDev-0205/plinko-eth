import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loadGameSessions, loadStats } from "../../../../platform/modules/account/asyncActions";
import { getUser } from "../../../../platform/modules/account/selectors";
import GameSessions from "./GameSessions";
import GameStats from "./GameStats";
const mapStateToProps = (state) => {
    const { stats, gameSessions } = state.account;
    return {
        userAuth: getUser(state),
        stats,
        gameSessions,
    };
};
const mapDispatchToProps = (dispatch) => bindActionCreators({
    loadStats,
}, dispatch);
class Stats extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        const { loadStats, userAuth } = this.props;
        if (userAuth) {
            loadStats(userAuth.address);
            loadGameSessions(userAuth.address);
        }
    }
    render() {
        const { stats, gameSessions } = this.props;
        return (React.createElement("div", null,
            React.createElement(GameStats, { stats: stats }),
            React.createElement(GameSessions, { gameSessions: gameSessions })));
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Stats);
//# sourceMappingURL=Stats.js.map