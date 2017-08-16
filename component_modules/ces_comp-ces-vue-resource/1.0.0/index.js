var Ces = require('ces');

var Vue = require('vue');
var VueResource = require('vue-resource');
var qs = require('./qs.js');
Vue.use(VueResource);

var Cui = require('cui');

Vue.http.interceptors.push(function(request, next) {
    console.log(request.autoLoading);
    if (request.autoLoading) {
        Cui.Indicator.open('加载中...');
    }

    next(function(response) {
        if (request.autoLoading) {
            Cui.Indicator.close();
        }
        return response;
    });
});

Vue.http.options.emulateJSON = true;
Vue.http.options.headers = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
};


var Config = Ces.Config;

var CesVueResource = (function () {
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
        }
        return url;
    };

    var _send = function (method, api, params, success, error, autoLoading) {
        if (typeof autoLoading === 'undefined') {
            autoLoading = true;
        }
        var options = {
            timeout: Config.Server.timeOut || 50000,
            autoLoading: !!autoLoading
        };

        success = success || function () {
            alert('请求成功');
        };

        error = error || function () {
            alert('请求失败');
        };

        var url = _getUrl(api);

        if (Config.service !== 'native') {
            switch (method) {
                case 'GET':
                    Vue.http.get(url, options).then(function (response) {
                        success(response.body);
                    }, function (response) {
                        error(response);
                    });
                    break;
                case 'POST':
                    Vue.http.post(url, qs.stringify(params), options).then(function (response) {
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
                        if (rets.status === 1) {
                            success(rets.data);
                        } else {
                            error && error(rets);
                        }
                    });
                    break;
                case 'POST':
                    console.log(url);
                    console.log(Ces.__bridge__);
                    Ces.Plugins.Http.post(url).setBody(params).send(function (rets) {
                        console.log(rets);
                        if (rets.status === 1) {
                            success(rets.data);
                        } else {
                            error && error(rets);
                        }
                    });
                    break;
            }
        }
    };

    return {
        VueResource: VueResource,
        type: {
            http: 'http',
            static: 'static',
            native: 'native'
        },
        get: function (api, params, success, error, autoLoading) {
            _send('GET', api, params, success, error, autoLoading);
        },
        post: function (api, params, success, error, autoLoading) {
            _send('POST', api, params, success, error, autoLoading);
        }
    }
})();

module.exports = CesVueResource;