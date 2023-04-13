var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import * as React from "react";
import { Modal as BootstrapModal, ModalBody } from "reactstrap";
import Style from "./Modal.scss";
const Modal = (_a) => {
    var { isOpen, toggle, children } = _a, rest = __rest(_a, ["isOpen", "toggle", "children"]);
    return (React.createElement(BootstrapModal, Object.assign({ isOpen: isOpen, toggle: toggle }, rest),
        React.createElement(ModalBody, null,
            React.createElement("button", { type: "button", className: "btn-close " + Style.close, "aria-label": "Close", onClick: toggle }),
            React.createElement("div", { className: Style.modalWrapper }, children))));
};
export default Modal;
//# sourceMappingURL=Modal.js.map