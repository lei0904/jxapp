var XCell =require('../cell/cell.js') ;

/**
 * cui-radio
 * @module components/radio
 * @desc 单选框列表，依赖 cell 组件
 *
 * @param {string[], object[]} options - 选项数组，可以传入 [{label: 'label', value: 'value', disabled: true}] 或者 ['ab', 'cd', 'ef']
 * @param {string} value - 选中值
 * @param {string} title - 标题
 * @param {string} [align=left] - checkbox 对齐位置，`left`, `right`
 *
 * @example
 * <cui-radio v-model="value" :options="['a', 'b', 'c']"></cui-radio>
 */
module.exports =  {
    name: 'cui-radio',

    template: __inline('radio.ftl'),

    props: {
        title: String,
        align: String,
        options: {
            type: Array,
            required: true
        },
        value: String
    },

    data:function() {
        return {
            currentValue: this.value
        };
    },

    watch: {
        value:function(val) {
            this.currentValue = val;
        },

        currentValue:function(val) {
            this.$emit('input', val);
        }
    },

    components: {
        XCell : XCell
    }
};