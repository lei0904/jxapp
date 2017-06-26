/**
 * <cui-button
 * @module components/button
 * @desc 按钮
 * @param {string} [type=default] - 显示类型，接受 default, primary, danger
 * @param {boolean} [disabled=false] - 禁用
 * @param {boolean} [plain=false] - 幽灵按钮
 * @param {string} [size=normal] - 尺寸，接受 normal, small, large
 * @param {string} [icon] - 图标，提供 more, back，或者自定义的图标（传入不带前缀的图标类名，最后拼接成 .cesui-xxx）
 * @param {slot} - 显示文本
 * @param {slot} [icon] 显示图标
 *
 * @example
 * <cui-button size="large" icon="back" type="primary">按钮</cui-button>
 */
module.exports = {
    name: 'cui-button',

    template: __inline('button.ftl'),

    props: {
        icon: String,
        disabled: Boolean,
        plain: Boolean,
        type: {
            type: String,
            default: 'default',
            validator: function(value) {
                return [
                        'default',
                        'danger',
                        'primary'
                    ].indexOf(value) > -1;
            }
        },
        size: {
            type: String,
            default: 'normal',
            validator: function(value) {
                return [
                        'small',
                        'normal',
                        'large'
                    ].indexOf(value) > -1;
            }
        }
    },

    methods: {
        handleClick: function($event) {
            if (this.disabled) {
                $event.preventDefault();
                $event.stopPropagation();
            }
        }
    }
};