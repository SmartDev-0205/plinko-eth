import * as React from "react";
import { DataLoader } from "../../../reusable";
import UserInfo from "./UserInfo";
const User = ({ userName, user }) => user ? (React.createElement(UserInfo, { user: user })) : (React.createElement(DataLoader, { url: `/user/name/${userName}`, success: (user) => React.createElement(UserInfo, { user: user }) }));
export default User;
//# sourceMappingURL=User.js.map