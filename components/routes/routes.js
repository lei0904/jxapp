var Vue = require('vue');

var _index = require('index');
v



var index = Vue.extend(_index);


var routes = [
    {
        path: '/index',
        component: index,
        meta: {
            title: '特群云',
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


