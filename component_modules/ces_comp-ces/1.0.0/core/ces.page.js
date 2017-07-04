'use strict';

var Config = require('./ces.config.js');
var WebCache = require('./ces.webcache.js');
var JSBridge = require('./ces.jsbridge.js');

var Utils = (function () {

    return {
        /**
         * 获取当前页面的  referrer
         *
         * @returns {string} referrer
         */
        getReferrer: function () {
            var referrer = '';

            try {
                referrer = window.top.document.referrer;
            } catch (e) {
                if (window.parent) {
                    try {
                        referrer = window.parent.document.referrer;
                    } catch (e2) {
                        referrer = '';
                    }
                }
            }
            if (referrer === '') {
                referrer = document.referrer;
            }
            return referrer;
        }
    }
})();

var Keys = {
    _s_load_key_: '_ces_page_load_key_',
    _s_back_key_: '_ces_page_back_key_'
};


var WebContext = (function () {
    var _onResumeListener = function (callback) {
        var data = WebCache.local.get(Keys._s_back_key_);
        WebCache.local.delete(Keys._s_back_key_);
        if (data && callback) {
            callback(data);
        }
    };

    var _push = function (url, data) {
        if (data) {
            //将数据保存到 localStorage 中
            var key = Keys._s_load_key_;

            WebCache.local.set(key, data);
        }
        window.location.assign(url);
    };

    var _pop = function (data) {
        if (data) {
            var key = Keys._s_back_key_;
            WebCache.local.set(key, data);
        }

        var url = Utils.getReferrer();
        if (url) {
            window.location.assign(url);
        } else {
            window.history.back();
        }
    };

    var _loadData = function (callback) {
        var data = WebCache.local.get(Keys._s_load_key_);
        callback && callback(data);
    };

    return {
        onResumeListener: _onResumeListener,
        push: _push,
        pop: _pop,
        loadData: _loadData
    }
})();

var NativeContext = (function () {
    var nativeMethod = {
        init: 'init',
        push: 'pushWindow',
        pop: 'popWindow',
        resume: "resume"
    };

    var _onResumeListener = function (callback) {
        JSBridge.registerHandler(nativeMethod.resume, callback);
    };

    var _push = function (href, data) {
        if (data) {
            //将数据保存到 localStorage 中
            var key = Keys._s_load_key_;

            WebCache.local.set(key, data);
        }
        JSBridge.callHandler(nativeMethod.push, {
            url: href
        }, function () {
        });
    };

    var  _pop = function (data) {
        JSBridge.callHandler(nativeMethod.pop, {params: data}, function () {
        });
    };

    var _loadData = function (callback) {
        // JSBridge.callHandler(nativeMethod.init, {}, function (data) {
        //     callback && callback(data);
        // });
            callback();
    };

    return {
        onResumeListener: _onResumeListener,
        push: _push,
        pop: _pop,
        loadData: _loadData
    }
})();


var Page = (function () {
    var _debug = Config.debug;

    var _onResumeListener = function (callback) {
        if (_debug) {
            WebContext.onResumeListener(callback);
        } else {
            NativeContext.onResumeListener(callback);
        }
    };

    var _open = function (href, data) {
        href = Config.basepath + href;

        if (_debug) {
            WebContext.push(href, data);
        } else {
            NativeContext.push(href, data);
        }
    };

    var _back = function (data) {
        if (_debug) {
            WebContext.pop(data);
        } else {
            NativeContext.pop(data);
        }
    };

    var _init = function (callback) {
        if (_debug) {
           WebContext.loadData(callback);
        } else {
            NativeContext.loadData(callback);
        }
    };

    var _load = function (url) {
        window.location.assign(url);
    };

    return {
        onResumeListener: _onResumeListener,
        open: _open,
        load: _load,
        back: _back,
        init: _init
    }
})();

module.exports = Page;