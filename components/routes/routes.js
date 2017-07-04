var Vue = require('vue');

var _index = require('index');


var index = Vue.extend(_index);


var routes = [
    {
        path: '/index',
        component: index,
        meta: {
            title: '驾校首页',
            backable: false,
            savable: false,
            searchable: false,
            navable: true,
            keepAlive: true,
            value:'1'
        }
    }

];

module.exports = {
    routes : routes
};


