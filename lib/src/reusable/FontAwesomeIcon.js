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
import { library } from "@fortawesome/fontawesome-svg-core";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ClassNames from "classnames";
import * as React from "react";
import Style from "./FontAwesomeIcon.scss";
library.add(fas, far);
const Icon = (_a) => {
    var { color, className } = _a, rest = __rest(_a, ["color", "className"]);
    const classNames = ClassNames(className, {
        [Style[`icon-${color}`]]: color !== undefined,
    });
    return React.createElement(FontAwesomeIcon, Object.assign({}, rest, { className: classNames }));
};
export default Icon;
//# sourceMappingURL=FontAwesomeIcon.js.map