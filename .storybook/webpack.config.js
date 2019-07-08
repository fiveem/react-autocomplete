var path = require("path");

module.exports = {

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }, {
                test: /\.(css|scss)$/,
                use: [
                    'style-loader',
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            modules: true,
                            localIdentName: '[local]'
                        }
                    },
                    'sass-loader'
                ]
            }
        ]
    }
};