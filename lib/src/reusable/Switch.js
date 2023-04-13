import * as React from "react";
import { Button, ButtonGroup } from "reactstrap";
const Switch = ({ enabled, onToggle, size, colorOn = "success", colorOff = "danger", textOn = "On", textOff = "Off", }) => (React.createElement(ButtonGroup, null,
    React.createElement(Button, { size: size, outline: !enabled, color: enabled ? colorOn : "secondary", onClick: () => onToggle(true) }, textOn),
    React.createElement(Button, { size: size, outline: enabled, color: !enabled ? colorOff : "secondary", onClick: () => onToggle(false) }, textOff)));
export default Switch;
//# sourceMappingURL=Switch.js.map