const webpack = require('webpack');
const { merge }  = require('webpack-merge');

const common = require('./common');


const contractAddress = "0x3A92FA08E717fdd59930505E3C091FE32D713AAa";
const tokenAddress = "0xd1679946ba555ebf5cb38e8b089ef1e1e5d2abb1";
const serverAddress = "0x437EC7503dFF1b5F5Ab4Dab4455C45a270629f4d";
const apiUrl = 'https://api.dicether.com/api';
const websocketUrl = 'wss://websocket.dicether.com/socket.io/?EIO=4&transport=websocket&sid=2xp0a45GUGjAGEbQAMzS';
const chainId = 1;


module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development'),
                'SENTRY_LOGGING': false,
                'REDUX_LOGGING': true,
                'CONTRACT_ADDRESS': JSON.stringify(contractAddress),
                'TOKEN_ADDRESS': JSON.stringify(tokenAddress),
                'SERVER_ADDRESS': JSON.stringify(serverAddress),
                'API_URL': JSON.stringify(apiUrl),
                'SOCKET_URL': JSON.stringify(websocketUrl),
                'CHAIN_ID': JSON.stringify(chainId),
                'VERSION': JSON.stringify("dev_server")
            }
        })
    ],
});
