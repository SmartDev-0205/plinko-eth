import ClassNames from "classnames";
import * as React from "react";
const Output = ({ id, value, className }) => {
    const classNames = ClassNames("form-control", className);
    return (React.createElement("span", { id: id, className: classNames }, value));
};
export default Output;
//# sourceMappingURL=Output.js.map