import * as React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { deauthenticate } from "../account/asyncActions";
const mapDispatchToProps = (dispatch) => ({
    deauthenticate: () => dispatch(deauthenticate()),
});
class LogoutRoute extends React.Component {
    componentWillMount() {
        const { deauthenticate } = this.props;
        deauthenticate();
    }
    render() {
        return React.createElement(Navigate, { replace: true, to: "/" });
    }
}
export default connect(null, mapDispatchToProps)(LogoutRoute);
//# sourceMappingURL=LogoutRoute.js.map