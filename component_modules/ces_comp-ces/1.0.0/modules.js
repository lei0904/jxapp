module.exports = function (Ces) {
    /* ----------- core ----------- */
    var Config = require('core/ces.config.js');
    var JSBridge = require('core/ces.jsbridge.js');
    var WebCache = require('core/ces.webcache.js');
    var Page = require('core/ces.page.js');

    Ces.Config = Config;
    Ces.JSBridge = JSBridge;
    Ces.WebCache = WebCache;
    Ces.Page = Page;


    /* ----------- plugins ----------- */
    var Plugins = require('plugins/ces.plugins.js');

    Ces.Plugins = Plugins;

    /*-------------- vue-touch ------------*/
    var vueTouch = require('vue-touch/vue-touch.js');

    Ces.vueTouch = vueTouch;

    /* ----------- utils ----------- */
    var DateTime = require('utils/ces.datetime.js');
    var Utils = require('utils/ces.utils.js');

    Ces.DateTime = DateTime;
    Ces.Utils = Utils;
};

