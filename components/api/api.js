
var Axios = require('axios');
var Promise = require('es6-promise');

Axios.interceptors.request.use(function (config) {
    config.headers['special_group_device_id'] = '1a0018970aaaf1ad7c4';
    config.headers['special_group_client_type'] = 'help';
    return config;
}, function (error) {
    return Promise.reject(error);
});

var Cui = require("cui");
var Ces = require('ces');
var Config = Ces.Config;

var _getUrl = function (type) {
    type = type || Config.service;
    var url;
    switch (type) {
        case "native":
        case "http":
            var defaultProtocol, serverIp, serverPort, serverContext;
            defaultProtocol = Config.Server.defaultProtocol;
            serverIp = Config.Server.serverIp;
            serverPort = Config.Server.serverPort;
            serverContext = Config.Server.serverContext;

            url = defaultProtocol + '://' + serverIp + ':' + serverPort + "/" + (serverContext ? serverContext + "/" : "");
            break;
        case "static":
            url = "data/" + api + ".json";
            break;
        /*case "native":
         //url = api + ".json";
         var defaultProtocol, serverIp, serverPort, serverContext;
         defaultProtocol = Config.Server.defaultProtocol;
         serverIp = Config.Server.serverIp;
         serverPort = Config.Server.serverPort;
         serverContext = Config.Server.serverContext;

         url = defaultProtocol + '://' + serverIp + ':' + serverPort + "/" + (serverContext ? serverContext + "/" : "") + api + ".json";
         break;*/
    }
    return url;
};

var Vue = require("vue");
var VueResource = require("vue-resource");

Vue.use(VueResource);

Vue.http.headers['special_group_device_id'] = '1a0018970aaaf1ad7c4';
Vue.http.headers['special_group_client_type'] = 'help';

var CesVueResource = require('ces-vue-resource');

module.exports = {
    get: function (api, params, success, error, autoLoading) {
        CesVueResource.get(api, params, function (data) {
            if (data['status'] === 'FORBIDDEN' || data['status'] === 'NOLOGIN') {
                Cui.MessageBox.alert('登录已过期，请您重新登录！', '系统提示', {
                    callback: function () {
                        //跳转到登录页面
                        if (Ces.Config.service != 'native') {
                            Ces.Page.load('../index/index.html');
                        } else {
                            Ces.JSBridge.callHandler('redirectLoginPage', []);
                        }
                    }
                });
            } else {
                success && success(data)
            }
        }, error, autoLoading);
    },
    post: function (api, params, success, error, autoLoading) {
        CesVueResource.post(api, params, function (data) {
            if (data['status'] === 'FORBIDDEN' || data['status'] === 'NOLOGIN') {
                Cui.MessageBox.alert('登录已过期，请您重新登录！', '系统提示', {
                    callback: function () {
                        //跳转到登录页面
                        if (Ces.Config.service != 'native') {
                            Ces.Page.load('../../index.html');
                        } else {
                            Ces.JSBridge.callHandler('redirectLoginPage', []);
                        }
                    }
                });
            } else {
                success && success(data)
            }
        }, error, autoLoading);
    },


    process: function (rets, success, failed) {
        success = success || function (rets) {
            Cui.MessageBox.alert(rets.message);
        };
        failed = failed || function (rets) {
            Cui.MessageBox.alert(rets.message);
        };

        if (rets['status'] == 'OK') {
            success(rets);
        } else{
            failed(rets);
        }
    },

    basePath: _getUrl(),

    attachmentPath:  _getUrl() + "api/sys/attachment/",

    login: 'api/login' //登录接口

};



/*
 var CesVueAxios = require('ces-vue-axios');
 module.exports = CesVueAxios;*/
