import * as React from "react";
import { Dropdown as BootstrapDropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import "./Dropdown.scss";
class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = () => {
            this.setState({
                isOpen: !this.state.isOpen,
            });
        };
        this.state = {
            isOpen: false,
        };
    }
    render() {
        const { button, children, isOpen } = this.props;
        return (React.createElement(BootstrapDropdown, { isOpen: isOpen ? isOpen : this.state.isOpen, toggle: this.toggle },
            React.createElement(DropdownToggle, { tag: "span", onClick: this.toggle, "aria-expanded": this.state.isOpen, "data-toggle": "dropdown" }, button),
            React.createElement(DropdownMenu, null, children)));
    }
}
export default Dropdown;
//# sourceMappingURL=Dropdown.js.map