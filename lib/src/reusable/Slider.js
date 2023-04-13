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
import RcSlider from "rc-slider";
import * as React from "react";
import "rc-slider/assets/index.css"; // tslint:disable-line:no-submodule-imports
import "./Slider.scss";
import Style from "./Slider.scss";
const Slider = (_a) => {
    var { lowColor, highColor, onValue } = _a, props = __rest(_a, ["lowColor", "highColor", "onValue"]);
    const trackStyle = lowColor !== undefined ? { backgroundColor: Style[lowColor] } : {};
    const railStyle = highColor !== undefined ? { backgroundColor: Style[highColor] } : {};
    return React.createElement(RcSlider, Object.assign({ onChange: onValue }, props, { trackStyle: trackStyle, railStyle: railStyle }));
};
export default Slider;
//# sourceMappingURL=Slider.js.map