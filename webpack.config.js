const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'tunaweza.js',
        clean: true,
    },
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({
            title: 'toDoList',
            template: './src/index.html',
        })
    ]

}