import * as React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // tslint:disable-line:no-submodule-imports
import Style from "./Notification.scss";
const CloseButton = () => React.createElement("button", { type: "button", className: "btn-close btn-close-white", "aria-label": "Close" });
export default class Notification extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.notification !== this.props.notification && nextProps.notification !== null) {
            const notification = nextProps.notification;
            if (notification.type === "success") {
                toast.success(React.createElement("div", { style: { width: "275px", wordWrap: "break-word" } }, notification.message));
            }
            else if (notification.type === "info") {
                toast.info(React.createElement("div", { style: { width: "275px", wordWrap: "break-word" } }, notification.message));
            }
            else {
                toast.error(
                /*<div style={{width: "275px", wordWrap: "break-word"}}>{*/ notification.message /*}</div>*/);
            }
        }
    }
    render() {
        return (React.createElement(ToastContainer, { icon: false, toastClassName: Style.notification, position: "top-left", autoClose: 5000, hideProgressBar: true, closeOnClick: true, pauseOnHover: false, closeButton: React.createElement(CloseButton, null) }));
    }
}
//# sourceMappingURL=Notification.js.map