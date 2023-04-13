import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { changeFirstVisited } from "../platform/modules/account/asyncActions";
import { Button, Modal } from "../reusable/index";
import { BUGS_URL } from "../config/config";
const mapStateToProps = ({ account }) => {
    const { firstVisited } = account;
    return {
        firstVisited,
    };
};
const mapDispatchToProps = (dispatch) => bindActionCreators({
    changeFirstVisited,
}, dispatch);
class TermsOfUseModal extends React.Component {
    constructor(props) {
        super(props);
        this.onClose = () => {
            const { changeFirstVisited } = this.props;
            changeFirstVisited(false);
        };
    }
    render() {
        const { firstVisited } = this.props;
        return (React.createElement(Modal, { isOpen: firstVisited, toggle: this.onClose },
            React.createElement("h3", { className: "text-center" }, "Welcome to Dicether"),
            React.createElement("p", null,
                "This is the beta version of dicether.com. You can try all features using the ethereum mainet. If you find any bugs, please report it to ",
                React.createElement("a", { href: `mailto:${BUGS_URL}` }, BUGS_URL),
                ".",
                React.createElement("br", null),
                "Play responsibly and do not bet what you can not afford to lose. Do not play if you are under 18. Do not play if doing so is illegal in your jurisdiction!"),
            React.createElement(Button, { color: "primary", onClick: this.onClose }, "OK")));
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TermsOfUseModal);
//# sourceMappingURL=TermsOfUseModal.js.map