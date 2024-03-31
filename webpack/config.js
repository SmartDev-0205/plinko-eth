const {GitRevisionPlugin} = require("git-revision-webpack-plugin");

const domain = "dicether.com";

module.exports = {
    domain: domain,
    contractAddress: "0x3A92FA08E717fdd59930505E3C091FE32D713AAa",
    TOKEN_ADDRESS: "0xd1679946ba555ebf5cb38e8b089ef1e1e5d2abb1",
    serverAddress: "0x437EC7503dFF1b5F5Ab4Dab4455C45a270629f4d",
    apiUrl: `https://api.${domain}/api`,
    websocketUrl: `https://websocket.${domain}`,
    chainId: 1,
    version: new GitRevisionPlugin().commithash(),
};
