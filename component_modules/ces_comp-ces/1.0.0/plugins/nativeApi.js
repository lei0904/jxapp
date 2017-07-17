/**
 * Created by lei on 2017/7/13.
 */
var JSBridge = require('../core/ces.jsbridge.js');

var nativeApi = (function () {

    var _questions = function (params,callback) {
        JSBridge.callHandler('question', params,function (rets) {
            callback && callback(rets);
        });
    }

    return {
        questions:_questions
    }
})();

module.exports = nativeApi;