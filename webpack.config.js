// PACKAGES //
var webpack = require('webpack'),
    path    = require('path');

module.exports = {
    devtool: 'inline-source-map',
    devServer: {
        publicPath: "/",
        contentBase: "./client",
        hot: true,
        host: '0.0.0.0',
        port: 9090
    },
    entry: [
        // 'webpack-dev-server/client?http://127.0.0.1:9090/',
        'webpack/hot/only-dev-server',
        './client/src/index.js'
    ],
    output: {
        path: path.join(__dirname, 'client/build'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /.jsx?$/,
            loaders: ['react-hot-loader/webpack', 'babel-loader?presets[]=react,presets[]=es2015'],
            exclude: /node_modules/
        },
        {
            test: /\.css$/,
            loader: 'style-loader!css-loader',
        },
        {
            test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
            loader: 'file-loader',
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
}
