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
import { Button as BootstrapButton } from "reactstrap";
import "./Button.scss";
const Button = (_a) => {
    var { block, children, size, color = "secondary", outline = false, active, disabled = false, onClick, variant } = _a, rest = __rest(_a, ["block", "children", "size", "color", "outline", "active", "disabled", "onClick", "variant"]);
    return (React.createElement(BootstrapButton, Object.assign({ className: variant === "dropdown" ? "dropdown-item" : "", block: block, size: size, color: color, outline: outline, active: active, disabled: disabled, onClick: onClick }, rest), children));
};
export default Button;
//# sourceMappingURL=Button.js.map