/*
* @Author: Marte
* @Date:   2018-06-08 09:50:24
* @Last Modified by:   Marte
* @Last Modified time: 2018-06-08 16:12:37
*/

'use strict';
const path = require("path");
const prodConfig = require("../config/config").build;
//拼接路径
function resolve(track){
    return path.join(__dirname,"..",track);
}
//资源路径
function assetsPath(_path){
    return path.join(prodConfig.staticPath,_path);
}
//webpack 基本配置

module.exports = {
    //项目入口文件 =》webpack从此处还是构建
    entry:path.resolve(__dirname,"../src/main.js"),
    //模块如何被解析
    resolve:{
        //自动解析文件扩展名（补全文件后缀）（从左到右）
        //import hello from './hello'(!hello.js?->!hello.vue?->!hello.json)
        extensions:[".js",".vue",".json"],
        //配置别名映射
        alias:{
            // import Vue from 'vue/dist/vue.esm.js'可以写成 import Vue from 'vue'
            // 键后加上$,表示精准匹配！
            vue$:"vue/dist/vue.esm.js",
            "@":resolve('src'),
            utils:resolve("src/utils"),
            components:resolve("src/components"),
            pubulic:resolve("public")
        }
    },
    module:{
            //处理模块规则可在此处使用不同的loader来处理模块

        rules:[
            //使用babel-loader来处理src下所有js文件，就具体babel配置在。babelrc，主要用来转义es6
            {
                test:/\.js$/,
                use:{
                    loader:"babel-loader"
                },
                include:resolve("src")
            },
            {
                test:/\.(png|jpeg|gif|svg)(\?.*)?$/,
                loader:"url-loader",
                options:{
                    limit:8192,
                    name:assetsPath("img/[name].[hash:8].[ext]")
                }
            }
        ]
    }
}

