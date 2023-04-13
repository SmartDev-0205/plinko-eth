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
import ClassName from "classnames";
import * as React from "react";
import FontAwesomeIcon from "./FontAwesomeIcon";
import "./IconButton.scss";
const IconButton = (_a) => {
    var { onClick, color = "primary", id, buttonClassName } = _a, rest = __rest(_a, ["onClick", "color", "id", "buttonClassName"]);
    const buttonClassNames = ClassName("iconButton", "iconButton_" + color, buttonClassName);
    return (React.createElement("button", { className: buttonClassNames, onClick: onClick, id: id },
        React.createElement(FontAwesomeIcon, Object.assign({}, rest))));
};
export default IconButton;
//# sourceMappingURL=IconButton.js.map