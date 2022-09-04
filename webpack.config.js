const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: './src/js/main.js',
        filteredResults: "./src/js/filteredResults.js",
        recipe: "./src/js/recipe.js"
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'deploy'),
    },

    devServer: {
        static: {
            directory: path.resolve(__dirname, 'deploy')
        },
        port: 3000,
        open: true,
        hot: true
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/html/index.html',
            inject: true,
            chunks: ['index'],
            filename: 'index.html'
        }), 
        new HtmlWebpackPlugin({
            template: './src/html/filteredResults.html',
            inject: true,
            chunks: ['filteredResults'],
            filename: 'filteredResults.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/html/recipe.html',
            inject: true,
            chunks: ['recipe'],
            filename: 'recipe.html'
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ]
    }
};