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
import ClassNames from "classnames";
import * as React from "react";
import Style from "./Section.scss";
const Section = (_a) => {
    var { gray = false, className = "" } = _a, rest = __rest(_a, ["gray", "className"]);
    const allClassNames = ClassNames(className, {
        [Style.gray]: gray,
    });
    return React.createElement("section", Object.assign({}, rest, { className: allClassNames }));
};
export default Section;
//# sourceMappingURL=Section.js.map