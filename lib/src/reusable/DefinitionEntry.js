import * as React from "react";
import Style from "./DefinitionEntry.scss";
const DefinitionEntry = ({ name, value }) => (React.createElement("div", { className: Style.definitionEntry },
    React.createElement("dt", { className: Style.definitionEntry__key }, name),
    React.createElement("dd", { className: Style.definitionEntry__value }, value)));
export default DefinitionEntry;
//# sourceMappingURL=DefinitionEntry.js.map