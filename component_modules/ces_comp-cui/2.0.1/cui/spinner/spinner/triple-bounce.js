var common = require('./common.js');

module.exports = {
    name: 'triple-bounce',

    template: __inline('triple-bounce.ftl'),

    mixins: [common],

    computed: {
        spinnerSize: function() {
            return ((this.size || this.$parent.size || 28) / 3) + 'px';
        },

        bounceStyle: function() {
            return {
                width: this.spinnerSize,
                height: this.spinnerSize,
                backgroundColor: this.spinnerColor
            };
        }
    }
};