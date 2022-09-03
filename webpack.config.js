const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
    entry: {
        main: path.resolve(__dirname, './js/main.js'),
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'deploy')
    },
    devServer: {
        contentBase: './deploy',
        open: true
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          },
          { 
            test: /\.css$/, 
            use: ["style-loader", "css-loader"] 
          },
          { 
            test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
            type: 'asset/resource',
          },
        ],
    },
    devServer:{
        static:{
            directory:path.resolve(__dirname,'deploy')
        },
        port:3001,
        open:true,
        hot: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Webpack Output",
            filename:'index.html',
            template:'./html/index.html'
        }),
        new HtmlWebpackPlugin({
            title: "NFT",
            filename:'filteredResults.html',
            template:'./html/filteredResults.html'
        }),
    ],
};
