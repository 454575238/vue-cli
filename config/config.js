/*
* @Author: Marte
* @Date:   2018-06-08 10:40:09
* @Last Modified by:   Marte
* @Last Modified time: 2018-06-08 16:11:18
*/
const _path = require("path");
const ExtracTextPlugn = require("extract-text-webpack-plugin");
//vue-loader基本配置
const baseVueLoaderConf = {
    //引入postcss
    postcss:{
        config:{
            path:_path.resolve("../")
        }
    },
    transfromToRequire:{
        video:"src",
        source:"src",
        img:"src",
        image:"xlink:href"
    }
};
//vue-loader开发环境配置
//
const devVueLoaderConf = Object.assign({},baseVueLoaderConf,{
    //loaders
    loaders:{
        css:["vue-style-loader","css-loader"],
        less:["vue-style-loader","css-loader","postcss-loader","less-loader"]
    },
    cssSourceMap:true
});
//vue-loader 生产环境配置
const buildVueLoaderConf = Object.assign({},baseVueLoaderConf,{
    loaders:ExtracTextPlugn.extract({
        use:["css-loader","postcss-loader","less-loader"],
        fallback:"vue-style-loader",
    }),
    cssSourceMap:false
});
//开发/生产环境 配置参数!
//
//
module.exports = {
    dev:{
        publicPath:"/",
        devtoolType:"cheap-module-eval-source-map",
        vueloaderConf:devVueLoaderConf,
        host:"localhost",
        port:"8090",
        proxyTable:{}
    },
    build:{
        publicPath:"/",
        devtoolType:"source-map",
        vueloaderConf:buildVueLoaderConf,
        staticPath:"static"
    }
};


