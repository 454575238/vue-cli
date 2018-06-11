/*
* @Author: Marte
* @Date:   2018-06-08 16:27:02
* @Last Modified by:   Marte
* @Last Modified time: 2018-06-08 16:38:06
*/

'use strict';

import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

const hello = r =>
require.ensure([],()=>r(require("../page/HelloVue")),"hello");

export default new Router({
    routes:[
        {
            path:'/',
            redirect:'/hello'
        },
        {
            path:"/hello",
            name:"hello",
            component:hello
        }
    ]
});
