/**
 * JSBridge 操作组件
 * @type {{registerHandler, send, callHandler}}
 *
 * callback函数返回参数约定
 *
 * {
 *  status: '1', //1 -- 成功, 0 -- 失败
 *  message: '提示信息'
 *  data: {
 *      o1:{}
 *      o2:
 *  }
 *
 * }
 *
 */

var JSBridge = function () {

    /**
     * 注册一个名为 [handler] 的处理器，并定义用于响应的处理逻辑
     */
    var _registerHandler = function (handler, callback) {
        WebViewJavascriptBridge.registerHandler(handler, callback);
    };

    /**
     * 发送消息给native端, 并定义回调函数
     */
    var _send = function (params, callback) {
        WebViewJavascriptBridge.send(params, callback);
    };

    /**
     * 调用名为 [handler] 的native端处理器，并传递参数，同时设置回调处理逻辑
     */
    var _callHandler = function (handler, params, callback) {
        WebViewJavascriptBridge.callHandler(handler, params, callback);
    };

    return {
        module: 'JSBridge',
        registerHandler: _registerHandler,
        send: _send,
        callHandler: _callHandler
    }
}();

module.exports = JSBridge;