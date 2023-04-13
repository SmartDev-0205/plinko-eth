import * as React from "react";
import { withTranslation } from "react-i18next";
import { Button } from "../../../reusable/index";
import Style from "./FriendRequests.scss";
const FriendRequests = ({ receivedFriendRequests, sentFriendRequests, onAcceptFriendRequest, onDeclineFriendRequest, onCancelFriendRequest, t, }) => (React.createElement("div", null,
    React.createElement("h5", null,
        t("sentFriendRequests"),
        " (",
        sentFriendRequests.length,
        ")"),
    React.createElement("ul", { className: Style.list }, sentFriendRequests.map((friendRequest) => (React.createElement("li", { className: Style.entry, key: friendRequest.to.address },
        React.createElement("span", null, `${friendRequest.to.username} ${friendRequest.date}`),
        " ",
        React.createElement(Button, { color: "secondary", size: "sm", onClick: () => onCancelFriendRequest(friendRequest.to.address) }, t("cancel")))))),
    React.createElement("h5", null,
        t("receivedFriendRequests"),
        " (",
        receivedFriendRequests.length,
        ")"),
    React.createElement("ul", { className: Style.list }, receivedFriendRequests.map((friendRequest) => (React.createElement("li", { className: Style.entry, key: friendRequest.from.address },
        React.createElement("span", null, `${friendRequest.to.username} ${friendRequest.date}`),
        " ",
        React.createElement(Button, { color: "primary", size: "sm", onClick: () => onAcceptFriendRequest(friendRequest.from.address) }, "Accept"),
        " ",
        React.createElement(Button, { color: "secondary", size: "sm", onClick: () => onDeclineFriendRequest(friendRequest.from.address) }, t("reject"))))))));
export default withTranslation()(FriendRequests);
//# sourceMappingURL=FriendRequests.js.map