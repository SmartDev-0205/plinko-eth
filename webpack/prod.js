const webpack = require("webpack");
const { merge } = require("webpack-merge");
const SitemapPlugin = require("sitemap-webpack-plugin").default;
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const common = require("./common");
const config = require("./config");

const Paths = [
    "/",
    "/games/dice",
    "/games/chooseFrom12",
    "/games/flipACoin",
    "/games/keno",
    "/games/wheel",
    "/games/plinko",
    "/faq",
    "/hallOfFame/weekly",
    "/hallOfFame/monthly",
    "/hallOfFame/all",
];

module.exports = merge(common, {
    mode: "production",
    
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production"),
                SENTRY_LOGGING: true,
                REDUX_LOGGING: false,
                CONTRACT_ADDRESS: JSON.stringify(config.contractAddress),
                SERVER_ADDRESS: JSON.stringify(config.serverAddress),
                API_URL: JSON.stringify(config.apiUrl),
                SOCKET_URL: JSON.stringify(config.websocketUrl),
                CHAIN_ID: JSON.stringify(config.chainId),
                VERSION: JSON.stringify(config.version),
                BUILD_DATE: JSON.stringify(new Date().toISOString()),
            },
        }),
        new webpack.SourceMapDevToolPlugin({
            filename: "[file].map",
        }),
        new CleanWebpackPlugin(),
    ],
    performance: {
        maxAssetSize: 512000, // Adjust the size in bytes as needed
        maxEntrypointSize: 512000, // Adjust the size in bytes as needed
        hints: false // Set to 'error' to treat these warnings as errors, or false to disable
    },
    optimization: {
        minimize: true,
    },
});
