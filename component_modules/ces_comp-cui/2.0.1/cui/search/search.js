var XCell = require('../cell/cell.js');

/**
 * cui-search
 * @module components/search
 * @desc 搜索框
 * @param {string} value - 绑定值
 * @param {string} [cancel-text=取消] - 取消按钮文字
 * @param {string} [placeholder=取消] - 搜索框占位内容
 * @param {string[]} [result] - 结果列表
 * @param {slot} 结果列表
 *
 * @example
 * <cui-search :value.sync="value" :result.sync="result"></cui-search>
 * <cui-search :value.sync="value">
 *   <cui-cell v-for="item in result" :title="item"></cui-cell>
 * </cui-search>
 */
module.exports = {
    name: 'cui-search',

    template: __inline('search.ftl'),

    data: function() {
        return {
            visible: false,
            currentValue: this.value
        };
    },

    components: {
        'x-cell': XCell
    },

    watch: {
        currentValue: function(val) {
            this.$emit('input', val);
        }
    },

    props: {
        value: String,
        cancelText: {
            default: '取消'
        },
        placeholder: {
            default: '搜索'
        },
        result: Array
    }
};