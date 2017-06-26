var Ces = require('ces');

var Vue = require('vue');
var VueResource = require('vue-resource');
Vue.use(VueResource);

var Config = Ces.Config;

var CesVueResource = (function () {

    var _getUrl = function (api, type) {
        type = type || Config.service;
        var url;
        switch (type) {
            case "native":
            case "http":
                var defaultProtocol, serverIp, serverPort, serverContext;
                //TODO 如果是在客户端,通过插件取服务器配置地址
                defaultProtocol = Config.Server.defaultProtocol;
                serverIp = Config.Server.serverIp;
                serverPort = Config.Server.serverPort;
                serverContext = Config.Server.serverContext;

                url = defaultProtocol + '://' + serverIp + ':' + serverPort + "/" + (serverContext ? serverContext + "/" : "") + api + ".json";
                break;
            case "static":
                url = "data/" + api + ".json";
                break;
            /*case "native":
                //url = api + ".json";
                var defaultProtocol, serverIp, serverPort, serverContext;
                //TODO 如果是在客户端,通过插件取服务器配置地址
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
        var options = {
            params: params,
            timeout: Config.Server.timeOut || 30000
        };

        success = success || function () {
                alert('请求成功');
            };

        error = error || function () {
                alert('请求失败');
            };

        var url = _getUrl(api);

        if (Config.service != 'native') {
            switch (method) {
                case 'GET':
                    Vue.http.get(url, options).then(function (response) {
                        success(response.body);
                    }, function (response) {
                        error(response);
                    });
                    break;
                case 'POST':
                    Vue.http.post(url, options).then(function (response) {
                        success(response.body);
                    }, function (response) {
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

module.exports = CesVueResource;