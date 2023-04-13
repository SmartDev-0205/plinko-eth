import * as React from "react";
import { connect } from "react-redux";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { bindActionCreators } from "redux";
import { getUser } from "../../modules/account/selectors";
import { addBet, addMyBet } from "../../modules/bets/actions";
import { loadBets, loadMyBets } from "../../modules/bets/asyncActions";
import { showBetModal, showUserModal } from "../../modules/modals/actions";
import BetsList from "./BetsList";
import Style from "./Stats.scss";
const mapStateToProps = (state) => {
    const { bets } = state;
    const { allBets, myBets } = bets;
    return {
        userAuth: getUser(state),
        allBets,
        myBets,
    };
};
const mapDispatchToProps = (dispatch) => bindActionCreators({
    loadBets,
    loadMyBets,
    addBet,
    addMyBet,
    showBetModal,
    showUserModal,
}, dispatch);
class Stats extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = (tab) => {
            if (this.state.activeTab !== tab) {
                this.setState({
                    activeTab: tab,
                });
            }
        };
        this.state = {
            activeTab: "myBets",
        };
    }
    componentWillReceiveProps(newProps) {
        if (!this.props.userAuth && newProps.userAuth) {
            this.setState({ activeTab: "myBets" });
        }
    }
    render() {
        const { allBets, myBets, showMyBets, showBetModal, showUserModal } = this.props;
        const { activeTab } = this.state;
        const curActiveTab = showMyBets ? activeTab : "allBets";
        return (React.createElement("div", { className: Style.stats },
            showMyBets && (React.createElement(Nav, { pills: true, className: Style.betSelection },
                React.createElement(NavItem, null,
                    React.createElement(NavLink, { href: "#", className: activeTab === "allBets" ? "active" : "", onClick: () => this.toggle("allBets") }, "All Bets")),
                React.createElement(NavItem, null,
                    React.createElement(NavLink, { href: "#", className: activeTab === "myBets" ? "active" : "", onClick: () => this.toggle("myBets") }, "My Bets")))),
            React.createElement(TabContent, { activeTab: curActiveTab },
                React.createElement(TabPane, { tabId: "allBets" },
                    React.createElement(BetsList, { bets: allBets, showBetModal: (bet) => showBetModal({ bet }), showUserModal: (user) => showUserModal({ user }) })),
                React.createElement(TabPane, { tabId: "myBets" },
                    React.createElement(BetsList, { bets: myBets, showUser: false, showBetModal: (bet) => showBetModal({ bet }), showUserModal: (user) => showUserModal({ user }) })))));
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Stats);
//# sourceMappingURL=Stats.js.map