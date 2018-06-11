/*
* @Author: Marte
* @Date:   2018-06-08 09:50:24
* @Last Modified by:   Marte
* @Last Modified time: 2018-06-08 16:16:37
*/

'use strict';
const path = require("path");
const webpack = require("webpack");
const devConfig = require("../config/config").dev;

const baseConf = require("./webpack.base.conf");

const merge = require("webpack-merge");//webpack配置合并模块类似于Object.assign

const HtmlWebpackPlugin = require("html-webpack-plugin");//创建HTML入口文件的插件

const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");

const notifier = require("node-notifier");
//讲webpack基本配置与开发环境配置合并！
//
const devConf = merge(baseConf,{
    output:{
        filename:"[name].js",
        publicPath:devConfig.publicPath
    },
    devtool:devConfig.devtoolType,
    //启动一个express服务器，使我们本地开发
    devServer:{
        // clinetLogLevel:"warning",//控制台log等级
        hot:true,
        inline:true,//自动刷新
        open:true,//自佛那个打开浏览器
        historyApiFallback:true,//依赖于h5 history Api 所有跳转都指向index
        host:devConfig.host,
        port:devConfig.port,
        proxy:devConfig.proxyTable,
        compress:true,//压缩你的代码
        overlay:{
            errors:true,
            warnings:false
        },


    },
    module:{
    //处理模块的规则(可在此处使用不同的loader来处理模块！)
    rules: [
        //使用vue-loader处理以vue结尾的文件！
        {
            test: /\.vue$/,
            loader: "vue-loader",
            options: devConfig.vueloaderConf
        },
        //使用vue-style-loader!css-loader!postcss-loader处理以css结尾的文件！
        {
            test: /\.css$/,
            use: [
                "vue-style-loader",
                {
                    loader: "css-loader",
                    options: {
                        sourceMap: true
                    }
                },
                {
                    loader: "postcss-loader",
                    options: {
                        sourceMap: true
                    }
                }
            ]
        },
        //使用vue-style-loader!css-loader!postcss-loader处理以less结尾的文件！
        {
            test: /\.less$/,
            use: [
                "vue-style-loader",
                {
                    loader: "css-loader",
                    options: {
                        sourceMap: true
                    }
                },
                {
                    loader: "less-loader",
                    options: {
                        sourceMap: true
                    }
                },
                {
                    loader: "postcss-loader",
                    options: {
                        sourceMap: true
                    }
                }
            ]
        }
    ]
},
    plugins: [
        //开启HMR(热替换功能,替换更新部分,不重载页面！)
        new webpack.HotModuleReplacementPlugin(),
        //显示模块相对路径
        new webpack.NamedModulesPlugin(),
        //编译出错时,该插件可跳过输出,确保输出资源不会包含错误!
        // new webpack.NoEmitOnErrorsPlugin(),
        //配置html入口信息
        new HtmlWebpackPlugin({
            title: "hello,xc-cli!",
            filename: "index.html",
            template: "index.html",
            //js资源插入位置,true表示插入到body元素底部
            inject: true
        }),
        //编译提示插件
        new FriendlyErrorsPlugin({
            //编译成功提示！
            compilationSuccessInfo: {
                messages: [
                    `Your application is running here: http://${devConfig.host}:${devConfig.port}`
                ]
            },
            //编译出错！
            onErrors: function(severity, errors) {
                if (severity !== "error") {
                    return;
                }
                const error = errors[0];
                const filename = error.file.split("!").pop();
                //编译出错时,右下角弹出错误提示！
                notifier.notify({
                    title: "xc-cli",
                    message: severity + ": " + error.name,
                    subtitle: filename || "",
                    icon: path.join(__dirname, "xc-cli.png")
                });
            }
        })
    ]
});
module.exports = devConf;