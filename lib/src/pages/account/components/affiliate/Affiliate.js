import axios from "axios";
import * as React from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { showSuccessMessage } from "../../../../platform/modules/utilities/actions";
import { catchError } from "../../../../platform/modules/utilities/asyncActions";
import Balance from "./Balance";
import Campaigns from "./Campaigns";
import CreateCampaign from "./CreateCampaign";
import { CHAIN_ID } from "../../../../config/config";
const mapDispatchToProps = (dispatch) => ({
    catchError: (error) => catchError(error, dispatch),
    showSuccessMessage: (message) => dispatch(showSuccessMessage(message)),
});
const DESCRIPTION_LINK = "https://medium.com/@dicether/how-to-create-a-dicether-affiliate-campaign-705f4be06c54";
class Affiliate extends React.Component {
    constructor(props) {
        super(props);
        this.fetchData = () => {
            const { catchError } = this.props;
            axios
                .get("/affiliate/campaigns")
                .then((response) => {
                this.setState({
                    campaigns: response.data.campaigns,
                    balance: response.data.balances[CHAIN_ID] || 0,
                });
            })
                .catch((error) => catchError(error));
        };
        this.createCampaign = (id, name) => {
            const { catchError, showSuccessMessage } = this.props;
            axios
                .post("/affiliate/createCampaign", { id, name })
                .then((response) => {
                const campaign = response.data;
                this.setState({
                    campaigns: [...this.state.campaigns, campaign],
                });
                showSuccessMessage(`Created new campaign ${name}!`);
            })
                .catch((error) => catchError(error));
        };
        this.withdrawBalance = () => {
            const { catchError, showSuccessMessage } = this.props;
            axios
                .post("/affiliate/withdraw")
                .then(() => {
                this.setState({
                    balance: 0,
                });
                showSuccessMessage("Balance withdrawn!");
            })
                .catch((error) => catchError(error));
        };
        this.state = {
            campaigns: [],
            balance: 0,
        };
    }
    componentDidMount() {
        this.fetchData();
    }
    render() {
        const { campaigns, balance } = this.state;
        const { t } = this.props;
        return (React.createElement("div", null,
            React.createElement("div", null,
                React.createElement("p", null,
                    t("AffiliateDescription"),
                    React.createElement("a", { rel: "noreferrer", target: "_blank", href: DESCRIPTION_LINK }, t("AffiliateManualLink")),
                    ".")),
            React.createElement(Balance, { balance: balance, withDrawBalance: this.withdrawBalance }),
            React.createElement(CreateCampaign, { onCreateCampaign: this.createCampaign }),
            React.createElement(Campaigns, { campaigns: campaigns })));
    }
}
export default withTranslation()(connect(null, mapDispatchToProps)(Affiliate));
//# sourceMappingURL=Affiliate.js.map