const path = require('path')

const htmlWebpackPlugin = require('html-webpack-plugin')

const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    entry: path.join(__dirname,'./src/main.js'),
    output:{ 
        path: path.join(__dirname,'./dist'),
        filename: 'bundle.js', 
        
    },
    mode: 'development',
    plugins: [ 
        new htmlWebpackPlugin({ 
            template: path.join(__dirname, './src/index.html'),
            filename: 'index.html' 
        }),
        new VueLoaderPlugin()
    ],
    module: { //这个节点，用于配置所有的第三方模块加载器
        rules: [ //所有第三方模块的匹配规则
            // test属性是正则，匹配.css结尾的文件，use为需要使用loader
            { test: /\.css$/, use:['style-loader','css-loader']}, //配置处理.css文件的第三方loader规则
            // 处理less文件的loader
            { test: /\.less$/, use:['style-loader','css-loader','less-loader']}, // 配置处理.less文件的第三方loader规则
            // 处理scss文件的loader
            { test: /\.scss$/, use:['style-loader','css-loader','sass-loader']}, // 配置处理.scss文件的第三方规则
            // 处理图片路径的loader
            { test: /\.(jpg|png|bmp|gif|jpeg)$/, use: 'url-loader?limit=7000&name=[hash:8]-[name].[ext]'},
            // limit 指定的值是图片的大小，单位是byte ，如果引用的图片大小大于或等于 给定的limit值，则不会被转为base64格式的字符串，如果图片小于给定的limit值，则会转为base64的字符串

            // 处理字体文件的loader
            { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader'},

            // 配置babel来转换高级的ES语法
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/},

            // 处理.vue文件的loader
            { test: /\.vue$/, use: 'vue-loader'}
        ]

    },
    resolve: {
        alias: { //修改Vue被导入时候的包的路径
            // 'vue$': "vue/dist/vue.js"
        }
    }
}

