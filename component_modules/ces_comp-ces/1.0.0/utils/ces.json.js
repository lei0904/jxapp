var JSON = (function () {

    return {
        serialize: function (item) {
            return JSON.stringify(item);
        },
        // fix for "illegal access" error on Android when JSON.parse is
        // passed null
        deserialize: function (data) {
            return data && JSON.parse(data);
        }
    }
})();

module.exports = JSON;