var XCell =require('../cell/cell.js');

/**
 * cui-checklist
 * @module components/checklist
 * @desc 复选框列表，依赖 cell 组件
 *
 * @param {(string[]|object[])} options - 选项数组，可以传入 [{label: 'label', value: 'value', disabled: true}] 或者 ['ab', 'cd', 'ef']
 * @param {string[]} value - 选中值的数组
 * @param {string} title - 标题
 * @param {number} [max] - 最多可选的个数
 * @param {string} [align=left] - checkbox 对齐位置，`left`, `right`
 *
 *
 * @example
 * <cui-checklist :v-model="value" :options="['a', 'b', 'c']"></cui-checklist>
 */
module.exports = {
    name: 'cui-checklist',

    template: __inline('checklist.ftl'),

    props: {
        max: Number,
        title: String,
        align: String,
        options: {
            type: Array,
            required: true
        },
        value: Array
    },

    components: {
        XCell: XCell
    },

    data: function() {
        return {
            currentValue: this.value
        };
    },

    computed: {
        limit: function() {
            return this.max < this.currentValue.length;
        }
    },

    watch: {
        value: function(val) {
            this.currentValue = val;
        },

        currentValue: function(val) {
            if (this.limit) {
                val.pop();
            }
            this.$emit('input', val);
        }
    }
};