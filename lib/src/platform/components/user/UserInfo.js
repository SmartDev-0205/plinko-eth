import * as React from "react";
import GameStats from "../../../pages/account/components/stats/GameStats";
import { Address, CopyToClipBoard, DataLoader } from "../../../reusable";
import Style from "./UserInfo.scss";
export default class UserInfo extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        const { user } = this.props;
        return (React.createElement("div", { className: Style.userInfo },
            React.createElement("h3", { className: "text-center" },
                user.username,
                React.createElement(CopyToClipBoard, { message: "Copied! Paste in Chat!", content: `User:${user.username}` })),
            React.createElement(Address, { address: user.address }),
            React.createElement(DataLoader, { url: `/stats/user/${user.address}`, success: (stats) => React.createElement(GameStats, { stats: stats }) })));
    }
}
//# sourceMappingURL=UserInfo.js.map