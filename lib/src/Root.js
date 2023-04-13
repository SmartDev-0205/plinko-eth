import * as React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./app/App";
import withTracker from "./app/withTracker";
const TrackedApp = withTracker(App);
export default class Root extends React.Component {
    render() {
        return (React.createElement(Provider, { store: this.props.store },
            React.createElement(Router, null,
                React.createElement(TrackedApp, null))));
    }
}
//# sourceMappingURL=Root.js.map