var Popup = require('../../vue-popup/vue-popup.js');
var bus = require('../../vue-event-bus/vue-event-bus.js');

module.exports = {
    name: 'cui-popup',

    template: __inline('popup.ftl'),

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

        popupTransition: {
            type: String,
            default: 'popup-slide'
        },

        position: {
            type: String,
            default: ''
        }
    },

    created: function () {
        var _this = this;
        bus.$on('doClose', function () {
            _this.currentValue = false;
        })
    },

    data: function() {
        return {
            currentValue: false,
            currentTransition: this.popupTransition
        };
    },

    watch: {
        currentValue: function(val) {
            this.visible = val;
            this.$emit('input', val);
        },

        value: function(val) {
            this.currentValue = val;
        }
    },

    beforeMount: function() {
        if (this.popupTransition !== 'popup-fade') {
            this.currentTransition = 'popup-slide-' + this.position;
        }
    }
};