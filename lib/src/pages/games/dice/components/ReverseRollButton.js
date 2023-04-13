import * as React from "react";
import IconButton from "../../../../reusable/IconButton";
import Style from "./ReverseRollButton.scss";
const ReverseRollButton = ({ reversed, onClick }) => (React.createElement("span", null,
    React.createElement(IconButton, { buttonClassName: Style.reverseRollButton, className: Style.icon, color: "primary", icon: "exchange-alt", rotation: reversed ? 180 : undefined, onClick: onClick })));
export default ReverseRollButton;
//# sourceMappingURL=ReverseRollButton.js.map