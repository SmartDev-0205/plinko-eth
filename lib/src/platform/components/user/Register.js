import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Form, FormGroup, FormText, Input } from "../../../reusable/index";
import { authenticate, register } from "../../modules/account/asyncActions";
import { isValidUserName } from "../../modules/account/util";
const mapDispatchToProps = (dispatch) => bindActionCreators({
    register,
    authenticate,
}, dispatch);
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.register = (e) => {
            const { register } = this.props;
            const { username } = this.state;
            register(username);
            e.preventDefault();
        };
        this.onUsername = (username) => {
            const isValid = this.validateUsername(username);
            this.setState({
                username,
                isValid,
            });
        };
        this.validateUsername = (username) => {
            if (isValidUserName(username)) {
                return true;
            }
            else if (username.length === 0) {
                return undefined;
            }
            else {
                return false;
            }
        };
        this.state = {
            username: "",
        };
    }
    render() {
        const { authenticate } = this.props;
        const { username, isValid } = this.state;
        return (React.createElement("div", null,
            React.createElement("h3", { className: "text-center" }, "Register"),
            React.createElement(Form, { onSubmit: this.register },
                React.createElement(FormGroup, null,
                    React.createElement(Input, { isValid: isValid, showValidation: true, value: username, placeholder: "Username", onValue: this.onUsername }),
                    React.createElement(FormText, null, "You can't change the username after registration! So choose wisely...")),
                React.createElement("p", null, "Play responsibly and do not bet what you can not afford to lose. Do not play if you are under 18. Do not play if doing so is illegal in your jurisdiction!"),
                React.createElement(Button, { color: "primary", type: "submit", disabled: isValid !== true, onClick: this.register }, "Register"),
                React.createElement(Button, { color: "link", onClick: authenticate }, "Already registered"))));
    }
}
export default connect(undefined, mapDispatchToProps)(Register);
//# sourceMappingURL=Register.js.map