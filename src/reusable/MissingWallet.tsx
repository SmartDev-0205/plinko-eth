import * as React from "react";
import {WithTranslation, withTranslation} from "react-i18next";

import {COINBASE_WALLET_URL, METAMASK_URL, TRUST_WALLET_URL} from "../config/config";

import Style from "./MissingWallet.scss";

const MissingWallet = ({t}: WithTranslation) => <div></div>;

export default withTranslation()(MissingWallet);
