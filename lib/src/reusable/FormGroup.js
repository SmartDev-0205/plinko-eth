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
import { FormGroup as BootstrapFormGroup } from "reactstrap";
const FormGroup = (_a) => {
    var { children, className } = _a, rest = __rest(_a, ["children", "className"]);
    return (React.createElement(BootstrapFormGroup, Object.assign({ className: className }, rest), children));
};
export default FormGroup;
//# sourceMappingURL=FormGroup.js.map