var Vue = require('vue');

var _index = require('index');
var _exercise = require('exercise');
var _reserved = require('reserved');
var _personal = require('personal');
var _exams = require('exams');
var _examsDir = require('examsDir');
var _examMock = require('examMock');
var _login = require('login');
var _register = require('register');


var index = Vue.extend(_index);
var exercise = Vue.extend(_exercise);
var reserved = Vue.extend(_reserved);
var personal = Vue.extend(_personal);
var exams = Vue.extend(_exams);
var examsDir = Vue.extend(_examsDir);
var examMock = Vue.extend(_examMock);
var login = Vue.extend(_login);
var register = Vue.extend(_register);


var routes = [
    {
        path: '/login',
        component: login,
        meta: {
            title: '登录',
            backable: false,
            searchable: false,
            showLogo:false,
            value:'1',
            fullScreen:true,
            showToolBar:false
        }
    },
    {
        path: '/register',
        component: register,
        meta: {
            title: '注册',
            backable: true,
            searchable: false,
            showLogo:false,
            value:'1',
            fullScreen:false,
            showToolBar:false
        }
    },
    {
        path: '/index',
        component: index,
        meta: {
            title: '驾校首页',
            backable: false,
            searchable: false,
            showLogo:true,
            value:'1',
            fullScreen:false,
            showToolBar:true
        }
    },
    {
        path: '/exercise',
        component: exercise,
        meta: {
            title: '模拟练习',
            backable: false,
            searchable: false,
            showLogo:false,
            value:'1',
            fullScreen:false,
            showToolBar:true
        }
    },
    {
        path: '/reserved',
        component: reserved,
        meta: {
            title: '预约练车',
            backable: false,
            searchable: false,
            showLogo:false,
            value:'1',
            fullScreen:false,
            showToolBar:true
        }
    },
    {
        path: '/personal',
        component: personal,
        meta: {
            title: '个人中心',
            backable: false,
            searchable: false,
            showLogo:false,
            value:'1',
            fullScreen:false,
            showToolBar:true
        }
    },
    {
        path: '/exams',
        component: exams,
        meta: {
            title: '考试',
            backable: true,
            searchable: false,
            showLogo:false,
            value:'1',
            fullScreen:false,
            showToolBar:true
        }
    },
    {
        path: '/examsDir',
        component: examsDir,
        meta: {
            title: '专项训练',
            backable: true,
            searchable: false,
            showLogo:false,
            value:'1',
            fullScreen:false,
            showToolBar:true
        }
    },
    {
        path:'/examMock',
        component: examMock,
        meta: {
            title: '模拟考试',
            backable: true,
            searchable: false,
            showLogo:false,
            value:'1',
            fullScreen:false,
            showToolBar:true
        }
    }

];

module.exports = {
    routes : routes
};


