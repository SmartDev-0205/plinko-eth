const webpack = require('webpack');
const { merge }  = require('webpack-merge');

const common = require('./common');


const contractAddress = "0x309599Be23d037c6d59fC2d6d77f3dFF493d935b";
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
                'SERVER_ADDRESS': JSON.stringify(serverAddress),
                'API_URL': JSON.stringify(apiUrl),
                'SOCKET_URL': JSON.stringify(websocketUrl),
                'CHAIN_ID': JSON.stringify(chainId),
                'VERSION': JSON.stringify("dev_server")
            }
        })
    ],
});
