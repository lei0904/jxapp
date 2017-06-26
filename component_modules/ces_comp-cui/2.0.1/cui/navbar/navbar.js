/**
 * cui-navbar
 * @module components/navbar
 * @desc 顶部 tab，依赖 tab-item
 *
 * @param {boolean} [fixed=false] - 固定底部
 * @param {*} selected - 返回 item component 传入的 value
 *
 * @example
 * <cui-navbar :selected.sync="selected">
 *   <cui-tab-item value="订单">
 *     <span slot="label">订单</span>
 *   </cui-tab-item>
 * </cui-navbar>
 *
 * <cui-navbar :selected.sync="selected" fixed>
 *   <cui-tab-item :value="['传入数组', '也是可以的']">
 *     <span slot="label">订单</span>
 *   </cui-tab-item>
 * </cui-navbar>
 *
 */

module.exports = {
    name: 'cui-navbar',

    template: __inline('navbar.ftl'),

    props: {
        fixed: Boolean,
        value: {}
    }
};