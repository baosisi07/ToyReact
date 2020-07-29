const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('webpack-clean-plugin')
module.exports = {
    mode: 'development',
    entry: {
        'app':'./src/index.js'
    },
    output: {
        filename:'[name].[contenthash:8].js'
    },
    module: {
        rules: [
            {
                test:/\.js$/,
                use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: [[
                        '@babel/plugin-transform-react-jsx',
                        {pragma:"MyReact.createElement"} // 定义createElement
                    ]]
                }
                }
            },
            {
                test:/\.css$/,
                use: ['style-loader','css-loader']
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),

        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
}