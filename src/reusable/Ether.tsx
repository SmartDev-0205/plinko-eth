import ClassNames from "classnames";
import * as React from "react";

import Style from "./Ether.scss";

export function formatEth(gwei: number, precision = 9) {
    return (gwei / 1e9).toFixed(precision);
}

export type Props = {
    gwei: number;
    showCurrencySymbol?: boolean;
    colored?: boolean;
    precision?: number;
};

const Ether = ({gwei, precision = 9, showCurrencySymbol = false, colored = false}: Props) => {
    const ether = formatEth(gwei, precision);
    const classNames = ClassNames(
        Style.ether,
        {[Style.ether_positiv]: colored && gwei > 0},
        {[Style.ether_negativ]: colored && gwei < 0}
    );

    return <span className={classNames}></span>;
};

export default Ether;
