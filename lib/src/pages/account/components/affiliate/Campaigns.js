import * as React from "react";
import { withTranslation } from "react-i18next";
import { CopyToClipBoard, DefinitionEntry, Ether } from "../../../../reusable";
import { CHAIN_ID } from "../../../../config/config";
const Campaign = ({ campaign }) => (React.createElement("div", null,
    React.createElement("h4", { style: { marginTop: "1rem" } },
        campaign.name,
        " (",
        `https://dicether.com/?ref=${campaign.id}`,
        ")",
        React.createElement(CopyToClipBoard, { message: "Copied! You can paste it now!", content: `https://dicether.com/?ref=${campaign.id}` })),
    React.createElement("dl", null,
        React.createElement(DefinitionEntry, { name: "Hits:", value: campaign.hits }),
        React.createElement(DefinitionEntry, { name: "Registrations:", value: campaign.referred }),
        React.createElement(DefinitionEntry, { name: "Profit:", value: React.createElement(Ether, { gwei: campaign.balances[CHAIN_ID] || 0 }) }),
        React.createElement(DefinitionEntry, { name: "Commission:", value: `${campaign.commission * 100}%` }))));
const Campaigns = ({ campaigns, t }) => (React.createElement("div", { style: { marginTop: "2rem" } },
    React.createElement("h3", null, t("campaigns")),
    React.createElement("div", null, campaigns.map((campaign, i) => (React.createElement(Campaign, { key: i, campaign: campaign }))))));
export default withTranslation()(Campaigns);
//# sourceMappingURL=Campaigns.js.map