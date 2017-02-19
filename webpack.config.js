var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/main.ts',
    output: {
        path: './dist',
        filename: 'app.bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loaders: ['ts', 'angular2-template-loader']
            },
            {
                test: /\.scss$/,
                loaders: ['to-string-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
            },
            {
                test: /\.html$/,
                loader: 'raw-loader'
            },
            {
                test: /\.json$/,
                exclude: /node_modules/,
                loader: 'file'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.ts']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
};