/**
 * cui-tabbar
 * @module components/tabbar
 * @desc 底部 tab，依赖 tab-item
 * @param {boolean} [fixed=false] - 固定底部
 * @param {*} selected - 返回 item component 传入的 id
 *
 * @example
 * <cui-tabbar :selected.sync="selected">
 *   <cui-tab-item id="订单">
 *     <img slot="icon" src="http://placehold.it/100x100">
 *     <span slot="label">订单</span>
 *   </cui-tab-item>
 * </cui-tabbar>
 *
 * <cui-tabbar :selected.sync="selected" fixed>
 *   <cui-tab-item :id="['传入数组', '也是可以的']">
 *     <img slot="icon" src="http://placehold.it/100x100">
 *     <span slot="label">订单</span>
 *   </cui-tab-item>
 * </cui-tabbar>
 */
module.exports = {
    name: 'cui-tabbar',

    template: __inline('tabbar.ftl'),

    props: {
        fixed: Boolean,
        value: {}
    }
};