import * as React from "react";
import { NavLink as RRNavLink, Route, Routes } from "react-router-dom";
import { Nav, Navbar, NavItem, NavLink } from "reactstrap";
import { Container } from "../../reusable";
import Affiliate from "./components/affiliate/Affiliate";
import Stats from "./components/stats/Stats";
import { Helmet } from "react-helmet";
import PathNotFound from "../../app/PathNotFound";
const Account = () => (React.createElement(React.Fragment, null,
    React.createElement(Helmet, null,
        React.createElement("title", null, "Account - Dicether"),
        React.createElement("meta", { name: "description", content: "Account management" })),
    React.createElement(Container, null,
        React.createElement(Navbar, { color: "faded", light: true, expand: true, style: { marginLeft: "-1.5rem" } },
            React.createElement(Nav, { navbar: true },
                React.createElement(NavItem, null,
                    React.createElement(NavLink, { tag: RRNavLink, to: "stats" }, "Statistics")),
                React.createElement(NavItem, null,
                    React.createElement(NavLink, { tag: RRNavLink, to: "affiliate" }, "Affiliate")))),
        React.createElement(Routes, null,
            React.createElement(Route, { path: "stats", element: React.createElement(Stats, null) }),
            React.createElement(Route, { path: "affiliate", element: React.createElement(Affiliate, null) }),
            React.createElement(Route, { path: "*", element: React.createElement(PathNotFound, null) })))));
export default Account;
//# sourceMappingURL=Account.js.map