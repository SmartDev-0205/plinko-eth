import * as React from "react";
class BeforeUnload extends React.Component {
    constructor() {
        super(...arguments);
        this.handleBeforeUnload = (event) => {
            const { gameState } = this.props;
            if (gameState.status === "ACTIVE") {
                const message = "You need to end the game session before leaving!";
                event.returnValue = message;
                return message;
            }
            return undefined;
        };
    }
    componentDidMount() {
        window.addEventListener("beforeunload", this.handleBeforeUnload);
    }
    componentWillUnmount() {
        window.removeEventListener("beforeunload", this.handleBeforeUnload);
    }
    render() {
        return null;
    }
}
export default BeforeUnload;
//# sourceMappingURL=BeforeUnload.js.map