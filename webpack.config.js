const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports={
    entry: {
        bundle:'./js/main.js'
    },
    output: {
        path:path.resolve(__dirname,'dist'),
        filename: '[name].js'
    },

    plugins:[
        new HtmlWebpackPlugin ({
            title: 'Webpack App',
            filename:'index.html',
            template:'./index.html'
        }),
        new HtmlWebpackPlugin ({
          filename:'test.html',
          template:'./test.html'
        }),
        new HtmlWebpackPlugin ({
          filename:'test.html',
          template:'./test.html'
      })

    ],
    //Style config 
    
    //DevServer configuration
    module: {
        rules: [
          {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
          },
          {
            test: /\.js$/,
            use:{
                loader: 'babel-loader',
                options: {
                    presets:['@babel/preset-env']
                }
            }    
          },
          {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
          },
        ],
      },

    devServer:{
        static:{
            directory:path.resolve(__dirname,'dist')
        },
        port:3001,
        open:true,
        hot: true
    }
}