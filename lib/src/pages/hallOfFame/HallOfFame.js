import * as React from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { NavLink as RRNavLink, Route, Routes } from "react-router-dom";
import { Nav, NavItem, NavLink } from "reactstrap";
import { bindActionCreators } from "redux";
import { showUserModal } from "../../platform/modules/modals/actions";
import { Col, Container, DataLoader, Row } from "../../reusable/index";
import StatsTable from "./StatsTable";
import Style from "./HallOfFame.scss";
import { Helmet } from "react-helmet";
import PathNotFound from "../../app/PathNotFound";
const StatsEntry = ({ timeSpan, showUserModal }) => (React.createElement(DataLoader, { url: `/stats/${timeSpan}`, success: (stats) => (React.createElement(Row, null,
        React.createElement(Col, { md: 6 },
            React.createElement(StatsTable, { title: "Most Wagered", name: "Wagered", data: stats.mostWagered, showUserModal: showUserModal })),
        React.createElement(Col, { md: 6 },
            React.createElement(StatsTable, { title: "Most Profit", name: "Profit", data: stats.mostProfit, showUserModal: showUserModal })))) }));
const mapDispatchToProps = (dispatch) => bindActionCreators({
    showUserModal,
}, dispatch);
class HallOfFame extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { showUserModal, t } = this.props;
        return (React.createElement(React.Fragment, null,
            React.createElement(Helmet, null,
                React.createElement("title", null, "Hall of Fame - Dicether"),
                React.createElement("meta", { name: "description", content: "Top players at Dicether" })),
            React.createElement(Container, null,
                React.createElement("h2", { className: Style.heading }, "Hall of Fame"),
                React.createElement(Nav, { pills: true, className: Style.selection },
                    React.createElement(NavItem, null,
                        React.createElement(NavLink, { tag: RRNavLink, to: "weekly" }, t("weekly"))),
                    React.createElement(NavItem, null,
                        React.createElement(NavLink, { tag: RRNavLink, to: "monthly" }, t("monthly"))),
                    React.createElement(NavItem, null,
                        React.createElement(NavLink, { tag: RRNavLink, to: "all" }, t("all")))),
                React.createElement(Routes, null,
                    React.createElement(Route, { path: "weekly", element: React.createElement(StatsEntry, { timeSpan: "week", showUserModal: (user) => showUserModal({ user }) }) }),
                    React.createElement(Route, { path: "monthly", element: React.createElement(StatsEntry, { timeSpan: "month", showUserModal: (user) => showUserModal({ user }) }) }),
                    React.createElement(Route, { path: "all", element: React.createElement(StatsEntry, { timeSpan: "all", showUserModal: (user) => showUserModal({ user }) }) }),
                    React.createElement(Route, { path: "*", element: React.createElement(PathNotFound, null) })))));
    }
}
export default withTranslation()(connect(null, mapDispatchToProps)(HallOfFame));
//# sourceMappingURL=HallOfFame.js.map