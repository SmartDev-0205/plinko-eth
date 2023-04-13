import * as React from "react";
import Style from "./Ticks.scss";
const Ticks = () => (React.createElement("div", { className: Style.ticks },
    React.createElement("span", { className: Style.ticks__tick, style: { left: "0%" } }, "0"),
    React.createElement("span", { className: Style.ticks__tick, style: { left: "25%" } }, "25"),
    React.createElement("span", { className: Style.ticks__tick, style: { left: "50%" } }, "50"),
    React.createElement("span", { className: Style.ticks__tick, style: { left: "75%" } }, "75"),
    React.createElement("span", { className: Style.ticks__tick, style: { left: "100%" } }, "100")));
export default Ticks;
//# sourceMappingURL=Ticks.js.map