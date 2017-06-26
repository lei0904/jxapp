var Utils = (function () {

    var class2type = {};
    var toString = class2type.toString;
    var hasOwn = class2type.hasOwnProperty;

    'Boolean Number String Function Array Date RegExp Object Error'.split(' ').forEach(function(name) {
        class2type['[object ' + name + ']'] = name.toLowerCase();
    });

    return {
        extend: function(obj, props) {
            for (var key in props) {
                if (props.hasOwnProperty(key)) {
                    obj[key] = props[key];
                }
            }
            return obj;
        },
        type: function (obj) {
            if (obj == null) {
                return obj + '';
            }
            // Support: Android<4.0, iOS<6 (functionish RegExp)
            return typeof obj === 'object' ||
            typeof obj === 'function' ? class2type[toString.call(obj)] || 'object' : typeof obj;
        },
        isPlainObject: function (obj) {
            // Not plain objects:
            // - Any object or value whose internal [[Class]] property is not "[object Object]"
            // - DOM nodes
            // - window
            if (Utils.type(obj) !== 'object' || obj.nodeType || (obj != null && obj === obj.window)) {
                return false;
            }
            if (obj.constructor && !hasOwn.call(obj.constructor.prototype, 'isPrototypeOf')) {
                return false;
            }
            // If the function hasn't returned already, we're confident that
            // |obj| is a plain object, created by {} or constructed with new Object
            return true;
        }
    }
})();

module.exports = Utils;