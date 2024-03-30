const {GitRevisionPlugin} = require("git-revision-webpack-plugin");

const domain = "dicether.com";

module.exports = {
    domain: domain,
    contractAddress: "0x5f2ab9103a669bb09D94D6C9883c8EEb78e676FA",
    TOKEN_ADDRESS: "0xe5f129a4770d0e955c064b5d0adecdfc7726eff8",
    serverAddress: "0x437EC7503dFF1b5F5Ab4Dab4455C45a270629f4d",
    apiUrl: `https://api.${domain}/api`,
    websocketUrl: `https://websocket.${domain}`,
    chainId: 56,
    version: new GitRevisionPlugin().commithash(),
};
