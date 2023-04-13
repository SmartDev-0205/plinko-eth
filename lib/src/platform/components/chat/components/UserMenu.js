import * as React from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Dropdown } from "../../../../reusable/index";
import { getUser } from "../../../modules/account/selectors";
import { deleteMessage, mute } from "../../../modules/chat/asyncActions";
import { sendFriendRequest } from "../../../modules/friends/asyncActions";
import { showUserModal } from "../../../modules/modals/actions";
export const mapStateToProps = (state) => {
    const { web3, friend } = state;
    const { friends, receivedFriendRequests, sentFriendRequests } = friend;
    return {
        friends,
        receivedFriendRequests,
        sentFriendRequests,
        userAuth: getUser(state),
        defaultAccount: web3.account,
    };
};
const mapDispatchToProps = (dispatch) => bindActionCreators({
    sendFriendRequest,
    deleteMessage,
    mute,
    showUserModal,
}, dispatch);
class UserMenu extends React.Component {
    constructor(props) {
        super(props);
        this.isInvitable = (address) => {
            const { friends, receivedFriendRequests, sentFriendRequests, userAuth } = this.props;
            return (userAuth !== null &&
                address !== userAuth.address &&
                !friends.some((friend) => address === friend.user.address) &&
                !receivedFriendRequests.some((frq) => address === frq.from.address) &&
                !sentFriendRequests.some((frq) => address === frq.to.address));
        };
        this.sendInvite = () => {
            const { user, sendFriendRequest } = this.props;
            sendFriendRequest(user.address);
        };
        this.mute = () => {
            const { user, mute } = this.props;
            mute(user.address);
        };
        this.deleteMessage = () => {
            const { messageId, deleteMessage } = this.props;
            deleteMessage(messageId);
        };
        this.showUser = () => {
            const { user, showUserModal } = this.props;
            showUserModal({ user });
        };
    }
    render() {
        const { button, user, userAuth, t } = this.props;
        const { address } = user;
        const isInvitable = this.isInvitable(address);
        const specialUser = userAuth && (userAuth.userType === "MOD" || userAuth.userType === "DEV" || userAuth.userType === "ADM");
        return (React.createElement(Dropdown, { button: button },
            React.createElement(Button, { size: "sm", variant: "dropdown", onClick: this.showUser }, t("viewProfile")),
            isInvitable && (React.createElement(Button, { size: "sm", variant: "dropdown", onClick: this.sendInvite }, t("sendFriendInvitation"))),
            specialUser && (React.createElement(Button, { size: "sm", variant: "dropdown", onClick: this.mute }, t("muteUser"))),
            specialUser && (React.createElement(Button, { size: "sm", variant: "dropdown", onClick: this.deleteMessage }, t("deleteMessage")))));
    }
}
export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(UserMenu));
//# sourceMappingURL=UserMenu.js.map