/**
 * cui-badge
 * @module components/badge
 * @desc 徽章
 * @param {string} [type=primary] 组件样式，可选 primary, error, success, warning
 * @param {string} [color] - 传入颜色值
 * @param {string} [size=normal] - 尺寸，接受 normal, small, large
 *
 * @example
 * <cui-badge color="error">错误</cui-badge>
 * <cui-badge color="#333">30</cui-badge>
 */
module.exports = {
    name: 'cui-badge',

    template: __inline('badge.ftl'),

    props: {
        color: String,
        type: {
            type: String,
            default: 'primary'
        },
        size: {
            type: String,
            default: 'normal'
        }
    }
};