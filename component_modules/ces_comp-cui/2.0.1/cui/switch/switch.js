/**
 * cui-switch
 * @module components/switch
 * @desc 切换按钮
 * @param {boolean} [value] - 绑定值，支持双向绑定
 * @param {slot} - 显示内容
 *
 * @example
 * <cui-switch v-model="value"></cui-switch>
 */
module.exports = {
    name: 'cui-switch',

    template: __inline('switch.ftl'),

    props: {
        value: Boolean
    },

    data: function() {
        console.log(this.value);
        return {
            currentValue: this.value
        };
    },

    methods: {
        currentValueChange: function () {
            this.currentValue = !this.value;
        }
    },

    watch: {
        value: function(val) {
            this.currentValue = val;
        },

        currentValue: function(val) {
            this.$emit('input', val);
        }
    }
};