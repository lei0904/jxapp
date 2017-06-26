var InfiniteScroll = require('./directive.js');

var install = function(Vue) {
    Vue.directive('InfiniteScroll', InfiniteScroll);
};

if (window.Vue) {
    window.infiniteScroll = InfiniteScroll;
    Vue.use(install); // eslint-disable-line
}

InfiniteScroll.install = install;
module.exports = InfiniteScroll;