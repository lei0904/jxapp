var JSBridge = require('../core/ces.jsbridge.js');
var Utils = require('../utils/ces.utils.js');

var Camera = (function () {
    var defOpts = {
        width: 200,
        height: 200
    };
    var _type = {
        base64: 'base64',
        path: 'path'
    };

    var _take = function (callback, params, opts) {
        opts = opts || {};
        params = Utils.extend(defOpts, opts);
        params = [params, {type: opts.type || _type.base64, name: opts.name || ''}];

        JSBridge.callHandler('CesPluginsCamera', params, callback);
    };

    return {
        name: "Ces.Plugins.Camera",
        type: _type,
        take: _take
    }
})();

module.exports = Camera;