var Popup = require('../../vue-popup/vue-popup.js');
var bus = require('../../vue-event-bus/vue-event-bus.js');

module.exports = {
    name: 'cui-actionsheet',

    template: __inline('actionsheet.ftl'),

    mixins: [Popup],

    props: {
        modal: {
            default: true
        },

        modalFade: {
            default: false
        },

        lockScroll: {
            default: false
        },

        closeOnClickModal: {
            default: true
        },

        cancelText: {
            type: String,
            default: '取消'
        },

        actions: {
            type: Array,
            default: []
        }
    },

    data: function () {
        return {
            currentValue: false
        };
    },

    created: function () {
        var _this = this;
        bus.$on('doClose', function () {
            _this.currentValue = false;
        })
    },

    watch: {
        currentValue: function (val) {
            this.visible = val;
            this.$emit('input', val);
        },

        value: function (val) {
            this.currentValue = val;
        }
    },

    methods: {
        itemClick: function (item) {
            if (item.method && typeof item.method === 'function') {
                item.method();
            }
            this.currentValue = false;
        }
    }
};