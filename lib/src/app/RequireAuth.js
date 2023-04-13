import * as React from "react";
import { Navigate } from "react-router-dom";
const RequireAuth = ({ children, authenticated }) => (authenticated ? children : React.createElement(Navigate, { replace: true, to: "/" }));
export default RequireAuth;
//# sourceMappingURL=RequireAuth.js.map