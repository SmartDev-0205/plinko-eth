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
import { Input } from "reactstrap";
class Select extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = (event) => {
            const { onValue } = this.props;
            const target = event.target;
            const val = target.value;
            target.blur();
            onValue(val);
        };
    }
    render() {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _a = this.props, { value, onValue } = _a, rest = __rest(_a, ["value", "onValue"]);
        return React.createElement(Input, Object.assign({ value: value, type: "select", onChange: this.handleChange }, rest));
    }
}
export default Select;
//# sourceMappingURL=Select.js.map