import * as React from "react";
import { withTranslation } from "react-i18next";
import { Button, Col, Form, FormGroup, Input, Label } from "../../../../reusable";
class CreateCampaign extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = (e) => {
            const { onCreateCampaign } = this.props;
            onCreateCampaign(this.state.id, this.state.name);
            e.preventDefault();
        };
        this.onName = (name) => {
            const isNameValid = this.validateName(name);
            this.setState({ name, isNameValid });
        };
        this.onId = (id) => {
            const isIdValid = this.validateName(id);
            this.setState({ id, isIdValid });
        };
        this.validateName = (name) => {
            if (name.length <= 15 && name.length >= 3 && /^[a-z0-9]+$/i.test(name)) {
                return true;
            }
            else if (name.length === 0) {
                return undefined;
            }
            else {
                return false;
            }
        };
        this.state = {
            name: "",
            id: "",
            isIdValid: undefined,
            isNameValid: undefined,
        };
    }
    render() {
        const { t } = this.props;
        const { id, name, isNameValid, isIdValid } = this.state;
        return (React.createElement("div", null,
            React.createElement("h3", null, "Create Affiliate Campaign"),
            React.createElement(Form, { onSubmit: this.onSubmit },
                React.createElement(FormGroup, { row: true },
                    React.createElement(Label, { for: "campaignName", sm: 3 }, "Campaign Name"),
                    React.createElement(Col, { sm: 9 },
                        React.createElement(Input, { id: "campaignName", isValid: isNameValid, showValidation: true, value: name, placeholder: "e.g. myCampaign", onValue: this.onName }))),
                React.createElement(FormGroup, { row: true },
                    React.createElement(Label, { for: "campaignId", sm: 3 }, "Campaign Id"),
                    React.createElement(Col, { sm: 9 },
                        React.createElement(Input, { id: "campaignId", isValid: isIdValid, showValidation: true, value: id, placeholder: "e.g. camp123", onValue: this.onId }))),
                React.createElement(Button, { size: "sm", color: "primary", type: "submit", disabled: isNameValid !== true || isIdValid !== true, onClick: this.onSubmit }, t("CreateCampaign")))));
    }
}
export default withTranslation()(CreateCampaign);
//# sourceMappingURL=CreateCampaign.js.map