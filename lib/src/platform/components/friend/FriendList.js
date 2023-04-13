import ClassNames from "classnames";
import * as React from "react";
import { withTranslation } from "react-i18next";
import Style from "./FriendList.scss";
const FriendList = ({ friends, t }) => {
    const friendsOnline = friends.filter((friend) => friend.online);
    const friendsOffline = friends.filter((friend) => !friend.online);
    const onlineFriendClass = ClassNames(Style.onlineStatus, Style.onlineStatus_online);
    const offlineFriendClass = ClassNames(Style.onlineStatus, Style.onlineStatus_offline);
    return (React.createElement("div", null,
        React.createElement("h5", null,
            t("friendsOnline"),
            " (",
            friendsOnline.length,
            ")"),
        React.createElement("ul", { className: Style.list }, friendsOnline.map((friend) => (React.createElement("li", { className: Style.friend, key: friend.user.address },
            React.createElement("span", { className: onlineFriendClass }),
            friend.user.username)))),
        React.createElement("h5", null,
            t("friendsOffline"),
            " (",
            friendsOffline.length,
            ")"),
        React.createElement("ul", { className: Style.list }, friendsOffline.map((friend) => (React.createElement("li", { className: Style.friend, key: friend.user.address },
            React.createElement("div", { className: offlineFriendClass }),
            friend.user.username))))));
};
export default withTranslation()(FriendList);
//# sourceMappingURL=FriendList.js.map