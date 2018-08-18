const path = require('path');


module.exports = {
    entry: './src/main.js',
    output: {
        filename: 'main.bundle.js',
        path: path.join(__dirname, 'build/js')
    },
    module: {
        rules:[
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options:{
                        presets: [["env", { "loose": true, "modules": false }]]
                    }
                }
            }
        ]
    },
    devtool: 'sourcemap'
}