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
import { Popover as BootstrapPopover, PopoverBody } from "reactstrap";
import "./Popover.scss";
const Popover = (_a) => {
    var { id, isOpen, toggle, children, container, placement = "auto", target } = _a, rest = __rest(_a, ["id", "isOpen", "toggle", "children", "container", "placement", "target"]);
    return (React.createElement(BootstrapPopover, Object.assign({ id: id, isOpen: isOpen, toggle: toggle, container: container, placement: placement, style: { zIndex: 20000, maxWidth: "100rem" } }, rest, { target: target }),
        React.createElement(PopoverBody, null, children)));
};
export default Popover;
//# sourceMappingURL=Popover.js.map