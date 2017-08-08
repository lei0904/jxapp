var Vue = require('vue');

var V = require('../vee-validate/index.js');
V.init();


var _index = require('index');
var _exercise = require('exercise');
var _reserved = require('reserved');
var _personal = require('personal');
var _exams = require('exams');
var _examsDir = require('examsDir');
var _examsLocal = require('examsLocal');
var _login = require('login');
var _register = require('register');
var _forgotPassword = require('forgotPassword');
var _success = require('success');
var _comboDetail = require('comboDetail');
var _bespeakList = require('bespeakList');
var _shuttleList = require('shuttleList');
var _promise = require('promise');
var _notice = require('notice');
var _problem = require('problem');
var _process = require('process');


var index = Vue.extend(_index);
var exercise = Vue.extend(_exercise);
var reserved = Vue.extend(_reserved);
var personal = Vue.extend(_personal);
var exams = Vue.extend(_exams);
var examsDir = Vue.extend(_examsDir);
var examsLocal = Vue.extend(_examsLocal);
var login = Vue.extend(_login);
var register = Vue.extend(_register);
var forgotPassword = Vue.extend(_forgotPassword);
var success = Vue.extend(_success);
var comboDetail = Vue.extend(_comboDetail);
var bespeakList = Vue.extend(_bespeakList);
var shuttleList = Vue.extend(_shuttleList);
var promise = Vue.extend(_promise);
var notice = Vue.extend(_notice);
var problem = Vue.extend(_problem);
var process = Vue.extend(_process);


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
            value:'2',
            fullScreen:false,
            showToolBar:false
        }
    },
    {
        path: '/forgotPassword',
        component: forgotPassword,
        meta: {
            title: '忘记密码',
            backable: true,
            searchable: false,
            showLogo:false,
            value:'2',
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
            backable: false,
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
            backable: false,
            searchable: false,
            showLogo:false,
            value:'1',
            fullScreen:false,
            showToolBar:true
        }
    },
    {
        path: '/success',
        component: success,
        meta: {
            title: '考试结果',
            backable: true,
            searchable: false,
            showLogo:false,
            value:'1',
            fullScreen:false,
            showToolBar:true
        }
    },
    {
        path: '/comboDetail',
        component: comboDetail,
        meta: {
            title: '套餐详情',
            backable: true,
            searchable: false,
            showLogo:false,
            value:'1',
            fullScreen:true,
            showToolBar:true
        }
    },
    {
        path: '/bespeakList',
        component: bespeakList,
        meta: {
            title: '预约记录',
            backable: true,
            searchable: false,
            showLogo:false,
            value:'1',
            fullScreen:false,
            showToolBar:true
        }
    },
    {
        path: '/shuttleList',
        component: shuttleList,
        meta: {
            title: '接送记录',
            backable: true,
            searchable: false,
            showLogo:false,
            value:'1',
            fullScreen:false,
            showToolBar:true
        }
    },
    {
        path: '/examsLocal',
        component: examsLocal,
        meta: {
            title: '我的收藏',
            backable: true,
            searchable: false,
            showLogo:false,
            value:'1',
            fullScreen:false,
            showToolBar:true
        }
    },
    {
        path: '/promise',
        component: promise,
        meta: {
            title: '服务承诺',
            backable: true,
            searchable: false,
            showLogo:false,
            value:'2',
            fullScreen:true,
            showToolBar:true
        }
    },
    {
        path: '/notice',
        component: notice,
        meta: {
            title: '报名须知',
            backable: true,
            searchable: false,
            showLogo:false,
            value:'2',
            fullScreen:true,
            showToolBar:true
        }
    },
    {
        path: '/problem',
        component: problem,
        meta: {
            title: '常见问题',
            backable: true,
            searchable: false,
            showLogo:false,
            value:'2',
            fullScreen:true,
            showToolBar:true
        }
    },
    {
        path: '/process',
        component: process,
        meta: {
            title: '学车流程',
            backable: true,
            searchable: false,
            showLogo:false,
            value:'2',
            fullScreen:true,
            showToolBar:true
        }
    }



];

module.exports = {
    routes : routes
};


