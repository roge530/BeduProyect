const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
    entry: {
      main: path.resolve(__dirname, './js/main.js'),
      filteredResults: path.resolve(__dirname, './js/filteredResults.js'),
      recipe: path.resolve(__dirname, './js/recipe.js'),
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'deploy')
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
            hash: true,
            title: "THE RECIPE BOOK",
            filename:'index.html',
            template: path.resolve(__dirname, './html/index.html'),
            chunks: ['main'],
        }),
        new HtmlWebpackPlugin({
            hash: true,
            title: "Filtered results",
            filename:'filteredResults.html',
            template:path.resolve(__dirname, './html/filteredResults.html'),
            chunks: ['filteredResults'],
        }),
        new HtmlWebpackPlugin({
          hash: true,
          title: "Recipe",
          filename: 'recipe.html',
          template:path.resolve(__dirname, './html/recipe.html'),
          chunks: ['recipe'],
        }),
    ],
};
