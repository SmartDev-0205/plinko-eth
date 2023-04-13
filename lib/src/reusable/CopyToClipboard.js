import * as React from "react";
import ReactCopyToClipboard from "react-copy-to-clipboard";
import IconButton from "./IconButton";
import Popover from "./Popover";
class CopyToClipboard extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = () => {
            this.setState({ showMessage: false });
        };
        this.onCopy = () => {
            this.setState({ showMessage: true });
            setTimeout(() => {
                this.setState({ showMessage: false });
            }, 1000);
        };
        this.state = {
            showMessage: false,
        };
        this.ref = React.createRef();
    }
    render() {
        const { showMessage } = this.state;
        const { content, message } = this.props;
        return (React.createElement("span", null,
            React.createElement(ReactCopyToClipboard, { text: content, onCopy: this.onCopy },
                React.createElement("span", { ref: this.ref },
                    " ",
                    React.createElement(IconButton, { icon: "share", onClick: () => {
                            return;
                        } }),
                    " ")),
            this.ref.current && (React.createElement(Popover, { isOpen: showMessage, target: this.ref.current, toggle: this.toggle },
                React.createElement("span", { className: "text-success" }, message ? message : "Copied!")))));
    }
}
export default CopyToClipboard;
//# sourceMappingURL=CopyToClipboard.js.map