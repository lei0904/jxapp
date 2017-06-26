var JSBridge = require('../core/ces.jsbridge.js');

var Scan = (function () {

    return {
        call: function (callback) {
            JSBridge.callHandler('CesErWeiPlugin', ['1'], function (rets) {
                callback && callback(rets);
            });
        }
    }
})();

module.exports = Scan;