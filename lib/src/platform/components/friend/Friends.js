import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { acceptFriendRequest, cancelFriendRequest, declineFriendRequest } from "../../modules/friends/asyncActions";
import FriendList from "./FriendList";
import FriendRequests from "./FriendRequests";
import Style from "./Friends.scss";
const mapStateToProps = ({ friend }) => {
    const { friends, receivedFriendRequests, sentFriendRequests } = friend;
    return {
        friends,
        receivedFriendRequests,
        sentFriendRequests,
    };
};
const mapDispatchToProps = (dispatch) => bindActionCreators({
    acceptFriendRequest,
    declineFriendRequest,
    cancelFriendRequest,
}, dispatch);
class Friends extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { acceptFriendRequest, declineFriendRequest, cancelFriendRequest, friends, receivedFriendRequests, sentFriendRequests, } = this.props;
        return (React.createElement("div", { className: Style.friends },
            React.createElement(FriendList, { friends: friends }),
            React.createElement(FriendRequests, { sentFriendRequests: sentFriendRequests, receivedFriendRequests: receivedFriendRequests, onAcceptFriendRequest: (address) => {
                    acceptFriendRequest(address);
                }, onDeclineFriendRequest: (address) => {
                    declineFriendRequest(address);
                }, onCancelFriendRequest: (address) => {
                    cancelFriendRequest(address);
                } })));
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Friends);
//# sourceMappingURL=Friends.js.map