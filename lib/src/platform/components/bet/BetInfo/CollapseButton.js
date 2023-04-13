import * as React from "react";
import Icon from "../../../../reusable/FontAwesomeIcon";
import { Button } from "../../../../reusable/index";
import Style from "./CollapsButton.scss";
const CollapseButton = ({ name, isOpen, onClick }) => {
    return (React.createElement(Button, { color: "link", block: true, onClick: onClick },
        React.createElement("span", null, name),
        React.createElement(Icon, { className: Style.arrow, icon: "angle-down", size: "lg", rotation: isOpen ? 180 : undefined })));
};
export default CollapseButton;
//# sourceMappingURL=CollapseButton.js.map