var Plugins = (function () {
    return {
        module: 'Plugins'
    }
})();

var Http = require('http.js');
var Camera = require('camera.js');
var Cache = require('cache.js');
var Scan = require('scan.js');

Plugins.Http = Http;
Plugins.Camera = Camera;
Plugins.Cache = Cache;
Plugins.Scan = Scan;

module.exports = Plugins;