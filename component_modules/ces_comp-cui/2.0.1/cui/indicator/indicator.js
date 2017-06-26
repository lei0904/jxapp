var Vue = require('vue');
var Spinner = require('../spinner/spinner.js');

var Indicator = Vue.extend({
    template: __inline('indicator.ftl'),

    data: function() {
        return {
            visible: false
        };
    },

    components: {
        Spinner: Spinner
    },

    computed: {
        convertedSpinnerType: function () {
            switch (this.spinnerType) {
                case 'double-bounce':
                    return 1;
                case 'triple-bounce':
                    return 2;
                case 'fading-circle':
                    return 3;
                default:
                    return 0;
            }
        }
    },

    props: {
        text: String,
        spinnerType: {
            type: String,
            default: 'snake'
        }
    }
});

var instance;
var timer;

module.exports = {
    open: function(options) {
        options = options || {};
        if (!instance) {
            instance = new Indicator({
                el: document.createElement('div')
            });
        }
        if (instance.visible) return;
        instance.text = typeof options === 'string' ? options : options.text || '';
        instance.spinnerType = options.spinnerType || 'snake';
        document.body.appendChild(instance.$el);
        if (timer) {
            clearTimeout(timer);
        }

        Vue.nextTick(function() {
            instance.visible = true;
        });
    },

    close: function() {
        if (instance) {
            Vue.nextTick(function(){
                instance.visible = false;
                timer = setTimeout(function(){
                        if (instance.$el) {
                        instance.$el.style.display = 'none';
                    }
                }, 400);
            });
        }
    }
};