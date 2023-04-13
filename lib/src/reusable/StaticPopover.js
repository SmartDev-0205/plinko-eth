import ClassNames from "classnames";
import * as React from "react";
import Style from "./StaticPopover.scss";
const StaticPopover = ({ placement, children, className }) => {
    const popoverClassName = ClassNames("popover", { "bs-popover-top": placement === "top" }, { "bs-popover-bottom": placement === "bottom" }, { "bs-popover-right": placement === "right" }, { "bs-popover-left": placement === "left" }, Style.staticPopover, className);
    const arrowClassName = ClassNames("arrow", { [Style.staticPopover__arrow_top]: placement === "bottom" }, { [Style.staticPopover__arrow_bottom]: placement === "top" }, { [Style.staticPopover__arrow_right]: placement === "left" }, { [Style.staticPopover__arrow_left]: placement === "right" });
    return (React.createElement("div", { className: popoverClassName },
        React.createElement("div", { className: arrowClassName }),
        React.createElement("div", { className: "popover-body" }, children)));
};
export default StaticPopover;
//# sourceMappingURL=StaticPopover.js.map