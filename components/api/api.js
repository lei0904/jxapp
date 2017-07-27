var Storage = require("./storage.js");
var Cui = require("cui");
var Ces = require('ces');
var CesVueHttp = require('ces-vue-resource');
var Vue = require("vue");

var Promise = Promise || require('es6-promise').Promise;

var LoginData = {
    set: function (data, success, failed) {
        if (Ces.Config.plugin) {
            Ces.JSBridge.callHandler('setLoginData', [0, data], function (d) {
                if (d['status'] === 1) {
                    success && success();
                } else {
                    failed && failed();
                }
            });
        } else {
            try {
                var storage = new Storage('local');
                storage.set('loginData', Storage.stringify(data));
                success && success();
            } catch (e) {
                console.error(e);
                failed && failed();
            }
        }
    },
    get: function (cb) {
        try {
            var storage = new Storage('local');
            var data = storage.get('loginData');
            if (cb && typeof cb === 'function') {
                cb(Storage.parse(data));
                return;
            }
            return Storage.parse(data)
        } catch (e) {
            console.error(e);
            return null;
        }
    },
    remove: function () {
        new Storage('local').remove('loginData');
    }
};

Vue.http.interceptors.push(function(request, next) {
    if (Ces.Config.debug) {
        if (request.url.indexOf('api/login') > -1) {
            LoginData.remove();
        } else {
            var data = LoginData.get();
            if (data &&  data['auth_code']) {
                request.headers.set('e-drive_auth_code', data['auth_code'])
            }
        }
    }
    next(function(response) {
        return response;
    });
});

function Api() {

}

var _handlerAuthFailed = function (vm) {
    Cui.MessageBox.alert('登录已过期，请您重新登录！', '系统提示', {
        callback: function () {
            //跳转到登录页面
            if (Ces.Config.service !== 'native') {
                vm.$router.push({ path: '/login' });
            } else {
                Ces.JSBridge.callHandler('redirectLoginPage', []);
            }
        }
    });
};

var _getBasePath = function () {
    var defaultProtocol, serverIp, serverPort, serverContext;
    defaultProtocol = Ces.Config.Server.defaultProtocol;
    serverIp = Ces.Config.Server.serverIp;
    serverPort = Ces.Config.Server.serverPort;
    serverContext = Ces.Config.Server.serverContext;
    return defaultProtocol + '://' + serverIp + ':' + serverPort + "/" + (serverContext ? serverContext + "/" : "")
};

var _getUrl = function (api, type) {
    type = type || Ces.Config.service;
    var url;
    switch (type) {
        case "native":
        case "http":
            url = _getBasePath() + api;
            break;
        case "static":
            url = "data/" + api + ".json";
            break;
    }
    return url;
};

Api.install = function (Vue) {
    Object.defineProperty(Vue.prototype, '$api', {
        get:function () {
            var _this = this;

            return {
                getBasePath: _getBasePath,

                image_path: function (path) {
                    return _getUrl('api/attachment') + '?path=' + path;
                },

                process: function (rets, success, failed) {
                    success = success || function (rets) {
                        Cui.MessageBox.alert(rets.message);
                    };
                    failed = failed || function (rets) {
                        Cui.MessageBox.alert(rets.message);
                    };

                    if (rets['status'] === 'OK') {
                        success(rets);
                    } else {
                        failed(rets);
                    }
                },

                post: function (api, params, autoLoading) {
                    return new Promise(function (resolve, reject) {
                        CesVueHttp.post(api, params, function (data) {
                            if (data['status'] === 'FORBIDDEN' || data['status'] === 'NOLOGIN') {
                                _handlerAuthFailed(_this);
                            } else {
                                resolve && resolve(data)
                            }
                        }, reject, autoLoading);
                    });
                },

                get: function (api, params, autoLoading) {
                    return new Promise(function (resolve, reject) {
                        if (params) {
                            var qs = [];
                            for (var k in params) {
                                if (params.hasOwnProperty(k)) {
                                    var v = params[k];
                                    qs.push(k + '=' + encodeURIComponent(v));
                                }
                            }
                            if (api.indexOf('?') > -1) {
                                api = api + "&" + qs.join("&");
                            } else {
                                api = api + "?" + qs.join("&");
                            }
                        }

                        CesVueHttp.get(api, params, function (data) {
                            if (data['status'] === 'FORBIDDEN' || data['status'] === 'NOLOGIN') {
                                _handlerAuthFailed(_this);
                            } else {
                                resolve && resolve(data)
                            }
                        }, reject, autoLoading);
                    });
                },

                /*get: function (api, params, success, error, autoLoading) {
                    CesVueHttp.get(api, params, function (data) {
                        if (data['status'] === 'FORBIDDEN' || data['status'] === 'NOLOGIN') {
                            _handlerAuthFailed(_this);
                        } else {
                            success && success(data)
                        }
                    }, error, autoLoading);
                },*/
                /*post: function (api, params, success, error, autoLoading) {
                    CesVueHttp.post(api, params, function (data) {
                        if (data['status'] === 'FORBIDDEN' || data['status'] === 'NOLOGIN') {
                            _handlerAuthFailed(_this);
                        } else {
                            success && success(data)
                        }
                    }, error, autoLoading);
                },*/

                LoginData: LoginData
            }
        }
    });
};

module.exports = Api;
