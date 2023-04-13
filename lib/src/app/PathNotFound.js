import * as React from "react";
import { Container } from "../reusable";
const PathNotFound = ({ insideContainer = false }) => insideContainer ? (React.createElement(Container, null,
    React.createElement("h1", { className: "text-danger text-center" }, "404 Oops, this path does not exist!"))) : (React.createElement("h1", { className: "text-danger text-center" }, "404 Oops, this path does not exist!"));
export default PathNotFound;
//# sourceMappingURL=PathNotFound.js.map