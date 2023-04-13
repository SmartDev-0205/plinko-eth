import * as React from "react";
import Style from "./Address.scss";
const Address = ({ address }) => (React.createElement("a", { rel: "noreferrer", target: "_blank", href: `https://etherscan.io/address/${address}`, className: Style.address }, address));
export default Address;
//# sourceMappingURL=Address.js.map