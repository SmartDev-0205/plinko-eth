import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Stats from "../../platform/components/bet/Stats";
import { showRegisterModal } from "../../platform/modules/modals/actions";
import { Container, Section } from "../../reusable";
import BigFeatures from "./components/BigFeatures";
import Games from "./components/Games";
const mapDispatchToProps = (dispatch) => bindActionCreators({
    showRegisterModal,
}, dispatch);
export const mapStateToProps = (state) => {
    return {
        loggedIn: state.account.jwt !== null,
    };
};
const Index = ({ loggedIn, showRegisterModal }) => (React.createElement("div", null,
    React.createElement(Games, null),
    React.createElement(Section, null,
        React.createElement(Container, null,
            React.createElement(Stats, { showMyBets: false }))),
    React.createElement(BigFeatures, null)));
export default connect(mapStateToProps, mapDispatchToProps)(Index);
//# sourceMappingURL=Index.js.map