var Ces = require('ces');

var Cui = require('cui');

var Vue = require('vue');
var Axios = require('axios');
var VueAxios = require('vue-axios');

var Promise = require('es6-promise');

Vue.use(VueAxios, Axios);

var Config = Ces.Config;

var CesVueAxios = (function () {

    var _getUrl = function (api, type) {
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

                url = defaultProtocol + '://' + serverIp + ':' + serverPort + "/" + (serverContext ? serverContext + "/" : "") + api;
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

    var _send = function (method, api, params, success, error) {
        var config = {
            params: params,
            timeout: Config.Server.timeOut || 30000
        };

        // Add a request interceptor
        Axios.interceptors.request.use(function (config) {
            Cui.Indicator.open('加载中...');
            return config;
        }, function (error) {
            return Promise.reject(error);
        });

        // Add a response interceptor
        Axios.interceptors.response.use(function (response) {
            setTimeout(function () {
                Cui.Indicator.close();
            }, 200);
            return response;
        }, function (error) {
            return Promise.reject(error);
        });

        success = success || function () {
                Cui.Toast({
                    message: '请求成功',
                    position: 'bottom'
                });
            };

        error = error || function () {
                Cui.Toast({
                    message: '请求失败',
                    position: 'bottom'
                });
            };

        var url = _getUrl(api);

        if (Config.service != 'native') {
            switch (method) {
                case 'GET':
                    Vue.axios.get(url, config).then(function (response) {
                        success(response.data);
                    }, function (response) {
                        setTimeout(function () {
                            Cui.Indicator.close();
                        }, 200);
                        error(response);
                    });
                    break;
                case 'POST':
                    Vue.axios.post(url, config).then(function (response) {
                        success(response.data);
                    }, function (response) {
                        setTimeout(function () {
                            Cui.Indicator.close();
                        }, 200);
                        error(response);
                    });
                    break;
            }
        } else {
            switch (method) {
                case 'GET':
                    Ces.Plugins.Http.get(url).setBody(params).send(function (rets) {
                        if (rets.status == 1) {
                            success(rets.data);
                        } else {
                            error && error(rets);
                        }
                    });
                    break;
                case 'POST':
                    Ces.Plugins.Http.post(url).setBody(params).send(function (rets) {
                        if (rets.status == 1) {
                            success(rets.data);
                        } else {
                            error && error(rets);
                        }
                    });
                    break;
            }
        }


    };

    var _get = function (api, params, success, error) {
        _send('GET', api, params, success, error);
    };

    var _post = function (api, params, success, error) {
        _send('POST', api, params, success, error);
    };

    return {
        type: {
            http: 'http',
            static: 'static',
            native: 'native'
        },
        get: _get,
        post: _post
    }
})();

module.exports = CesVueAxios;