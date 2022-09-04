const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  // https://webpack.js.org/concepts/entry-points/#multi-page-application
    entry: {
        index: './src/js/main.js',
        filteredResults: "./src/js/filteredResults.js",
        recipe: "./src/js/recipe.js"
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },

  // https://webpack.js.org/configuration/dev-server/
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist')
        },
        port: 3000,
        open: true,
        hot: true
    },

  // https://webpack.js.org/concepts/plugins/
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
            template: './src/html/demo.html',
            inject: true,
            chunks: ['recipe'],
            filename: 'demo.html'
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