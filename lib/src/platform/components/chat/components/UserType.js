import * as React from "react";
import { Tooltip } from "../../../../reusable/index";
import Style from "./UserType.scss";
const UserType = ({ userType }) => {
    let target = null;
    if (userType === "ADM") {
        return (React.createElement("span", null,
            React.createElement("span", { ref: (t) => {
                    target = t;
                }, className: Style.userType + " " + Style.userType_adm }, "A"),
            React.createElement(Tooltip, { target: () => target }, "Admin")));
    }
    else if (userType === "DEV") {
        return (React.createElement("span", null,
            React.createElement("span", { ref: (t) => {
                    target = t;
                }, className: Style.userType + " " + Style.userType_dev }, "D"),
            React.createElement(Tooltip, { target: () => target }, "Developer")));
    }
    else if (userType === "MOD") {
        return (React.createElement("span", null,
            React.createElement("span", { ref: (t) => {
                    target = t;
                }, className: Style.userType + " " + Style.userType_mod }, "M"),
            React.createElement(Tooltip, { target: () => target }, "Moderator")));
    }
    else if (userType === "VIP") {
        return (React.createElement("span", null,
            React.createElement("span", { ref: (t) => {
                    target = t;
                }, className: Style.userType + " " + Style.userType_vip }, "V"),
            React.createElement(Tooltip, { target: () => target }, "VIP User")));
    }
    else if (userType === "BOT") {
        return (React.createElement("span", null,
            React.createElement("span", { ref: (t) => {
                    target = t;
                }, className: Style.userType + " " + Style.userType_bot }, "B"),
            React.createElement(Tooltip, { target: () => target }, "Bot")));
    }
    else {
        return null;
    }
};
export default UserType;
//# sourceMappingURL=UserType.js.map