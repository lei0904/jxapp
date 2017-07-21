var Storage = (function () {
    var Storage = function (type) {
        this.storage = null;
        if (typeof('type') === 'undefined' || type === 'local')
            this.storage = window.localStorage;
        else if (type === 'session')
            this.storage = window.sessionStorage;
    };

    Storage.prototype.set = function (key, value) {
        this.storage.setItem(key, escape(value));
    };
    Storage.prototype.get = function (key) {
        return unescape(this.storage.getItem(key));
    };
    Storage.prototype.remove = function (key) {
        this.storage.removeItem(key);
    };
    Storage.prototype.clear = function () {
        this.storage.clear();
    };
    Storage.prototype.key = function (index) {
        return this.storage.key(index);
    };
    Storage.prototype.hasKey = function (key) {
        for (var i in this.storage) {
            if (i === key) {
                return true;
            }
        }
        return false;
    };
    Storage.prototype.hasVal = function (value) {
        for (var i in this.storage) {
            if (unescape(this.storage[i]) === value) {
                return true;
            }
        }
        return false;
    };
    Storage.stringify = function (data) {
        return JSON.stringify(data);
    };
    Storage.parse = function (data) {
        return JSON.parse(data);
    };
    Storage.support = function () {
        if (window.localStorage && window.sessionStorage) return true;
        return false;
    };
    return Storage;
})(window);

module.exports = Storage;