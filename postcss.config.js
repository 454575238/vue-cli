/*
* @Author: Marte
* @Date:   2018-06-08 09:49:23
* @Last Modified by:   Marte
* @Last Modified time: 2018-06-08 16:21:44
*/

'use strict';
module.exports = {
  plugins: [
    require("autoprefixer")({
      browsers: ["iOS >= 7", "Android >= 4.1"]
    })
  ]
};