import ClassNames from "classnames";
import * as React from "react";
import Style from "./ResultSlider.scss";
export default class ResultSlider extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { result, showResult } = this.props;
        const { won, num } = result;
        const classNames = ClassNames(Style.resultSlider, { [Style.resultSlider_visible]: showResult }, { [Style.resultSlider_hidden]: !showResult });
        const classNamesWrapper = ClassNames(Style.resultWrapper, { [Style.resultWrapper_hidden]: !showResult });
        const classNamesResult = ClassNames(Style.result, { [Style.result_won]: won }, { [Style.result_lost]: !won });
        return (React.createElement("div", { className: classNames, style: { transform: `translate(${num}%, -50%)` } },
            React.createElement("div", { className: classNamesWrapper },
                React.createElement("div", { className: Style.image }),
                React.createElement("span", { className: classNamesResult }, num))));
    }
}
//# sourceMappingURL=ResultSlider.js.map