var common = require('./common.js');

module.exports = {
    name: 'snake',

    template: __inline('snake.ftl'),

    mixins: [common]
}