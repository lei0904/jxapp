var XCell = require('../cell/cell.js');
var Clickoutside = require('../../clickoutside/clickoutside.js');

/**
 * cui-field
 * @desc 编辑器，依赖 cell
 * @module components/field
 *
 * @param {string} [type=text] - field 类型，接受 text, textarea 等
 * @param {string} [label] - 标签
 * @param {string} [rows] - textarea 的 rows
 * @param {string} [placeholder] - placeholder
 * @param {string} [disabled] - disabled
 * @param {string} [readonly] - readonly
 * @param {string} [state] - 表单校验状态样式，接受 error, warning, success
 *
 * @example
 * <cui-field v-model="value" label="用户名"></cui-field>
 * <cui-field v-model="value" label="密码" placeholder="请输入密码"></cui-field>
 * <cui-field v-model="value" label="自我介绍" placeholder="自我介绍" type="textarea" rows="4"></cui-field>
 * <cui-field v-model="value" label="邮箱" placeholder="成功状态" state="success"></cui-field>
 */
module.exports = {
    name: 'cui-field',

    template: __inline('field.ftl'),

    data: function() {
        return {
            active: false,
            currentValue: this.value
        };
    },

    directives: {
        Clickoutside: Clickoutside
    },

    props: {
        type: {
            type: String,
        default: 'text'
        },
        rows: String,
            label: String,
            placeholder: String,
            readonly: Boolean,
            disabled: Boolean,
            disableClear: Boolean,
            state: {
            type: String,
        default: 'default'
        },
        value: {},
        attr: Object
    },

    components: { 'x-cell' : XCell },

    methods: {
        doCloseActive: function() {
            this.active = false;
        },

        handleInput: function(evt) {
            this.currentValue = evt.target.value;
        },

        handleClear: function() {
            if (this.disabled || this.readonly) return;
            this.currentValue = '';
        }
    },

    watch: {
        value: function(val) {
            this.currentValue = val;
        },

        currentValue: function(val) {
            this.$emit('input', val);
        },

        attr: {
            immediate: true,
                handler: function(attrs) {
                    this.$nextTick(function() {
                        var target = [this.$refs.input, this.$refs.textarea];
                        target.forEach(function(el) {
                            if (!el || !attrs) return;
                        Object.keys(attrs).map(function(name){
                            el.setAttribute(name, attrs[name])
                        });
                    });
                });
            }
        }
    }
};