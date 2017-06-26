var common = require('./common.js');

module.exports = {
    name: 'double-bounce',

    template: __inline('double-bounce.ftl'),

    mixins: [common]
};