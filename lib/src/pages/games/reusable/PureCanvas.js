import * as React from "react";
export default class PureCanvas extends React.Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.height !== this.props.height || nextProps.width !== this.props.height;
    }
    render() {
        const { width, height } = this.props;
        return (React.createElement("canvas", { style: { width: "100%" }, width: width, height: height, ref: (node) => (node ? this.props.contextRef(node.getContext("2d")) : null) }));
    }
}
//# sourceMappingURL=PureCanvas.js.map