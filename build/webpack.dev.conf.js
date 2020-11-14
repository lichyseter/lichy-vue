let utils = require('./utils')
let path = require('path')
let webpack = require('webpack')
let config = require('../config')
let merge = require('webpack-merge')
let baseWebpackConfig = require('./webpack.base.conf')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
    baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

function resolveApp(relativePath) {
    return path.resolve(relativePath);
}

module.exports = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({sourceMap: config.dev.cssSourceMap})
    },
    // cheap-source-map is faster for development
    devtool: '#cheap-source-map',
    cache: true,
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.dev.env
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            'jQuery': 'jquery'
        }),
        // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            favicon: resolveApp('favicon.ico'),
            inject: true,
            path:config.dev.staticPath
        }),
        new FriendlyErrorsPlugin()
    ]
})
