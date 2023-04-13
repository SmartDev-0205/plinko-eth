import * as React from "react";
import { withTranslation } from "react-i18next";
import { Button, DefinitionEntry, Ether } from "../../../../reusable";
const Balance = ({ balance, withDrawBalance, t }) => (React.createElement("div", { style: { marginBottom: "2rem" } },
    React.createElement("dl", null,
        React.createElement(DefinitionEntry, { name: "Available affiliate balance:", value: React.createElement(Ether, { gwei: balance }) })),
    React.createElement(Button, { disabled: balance === 0, size: "sm", color: "primary", onClick: withDrawBalance }, t("withdrawBalance"))));
export default withTranslation()(Balance);
//# sourceMappingURL=Balance.js.map