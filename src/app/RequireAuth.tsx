import * as React from "react";
import {Navigate, RouteProps} from "react-router-dom";

type Props = RouteProps & {
    children: any;
    authenticated: boolean;
};

const RequireAuth = ({children, authenticated}: Props) => (authenticated ? children : <Navigate replace to="/" />);

export default RequireAuth;
