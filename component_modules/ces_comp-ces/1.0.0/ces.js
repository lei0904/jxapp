var Ces = {
    name: 'Ces',
    description: 'Ces Js framework',
    author: 'Jerry Ou',
    email: 'oyp@cesgroup.com.cn'
};

require('modules.js')(Ces);

/**
 * {
 *      name: 'CesCachePlugin'
 *      options: [
 *          {
 *              method: 'save'
 *              data: function() {} || {},
 *              callback: function(rets) {}
 *          },
 *          {
 *              method: 'get'
 *              data: function() {} || {},
 *              callback: function(rets) {}
 *          }
 *      ]
 *      ||
 *      {
 *              method: 'get'
 *              data: function() {} || {},
 *              callback: function(rets) {}
 *          }
 * }
 * @param plugin
 */
Ces.register = function(plugin) {
    var defaultCallback = function (rets) {
        console.log(rets)
    };
    var name = plugin['name'];
    var options = plugin['options'];

    if ((!name || typeof name != 'string')) {
        throw new Error('the register plugin must provide name property of string')
    }
    if (!options) {
        throw new Error('the register plugin must provide options property')
    }
    Ces.Plugins[name] = {};
    if (!Array.isArray(options)) {
        options = [options];
    }

    options.forEach(function (item) {
        var method = item.method;
        if (!method) {
            throw new Error('the register plugin must provide method property in every option');
        }
        Ces.Plugins[name][method] = (function (item) {

            return function () {
                var data = item.data;
                var callback = item.callback || defaultCallback;
                if (data && typeof data == 'function') {
                    data = data();
                }
                var param;
                if (data) {
                    param = [method, data];
                } else {
                    param = [method];
                }
                Ces.JSBridge.callHandler(name, param, callback)
            };

        })(item);
    });
};

Ces.ready = function (callback) {
    if (Ces.Config.debug) {
        window.onload = function () {
            Ces.Page.init(callback);
        };
        // document.addEventListener("DOMContentLoaded", function () {
        //     callback && callback();
        // }, false);
    } else {
        if (window.WebViewJavascriptBridge) {
            if (!Ces.__bridge__) {
                WebViewJavascriptBridge.init(function () {
                    console.log('init messageHandler');
                });
                Ces.__bridge__ = WebViewJavascriptBridge;
            }
            Ces.Page.init(callback);
        } else {
            document.addEventListener('WebViewJavascriptBridgeReady', function () {
                WebViewJavascriptBridge.init(function () {
                    console.log('init messageHandler');
                });
                Ces.__bridge__ = WebViewJavascriptBridge;
                Ces.Page.init(callback);
            }, false);
        }
    }
};

module.exports = Ces;