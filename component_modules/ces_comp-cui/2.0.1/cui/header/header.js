/**
 * cui-header
 * @module components/header
 * @desc 顶部导航
 * @param {boolean} [fixed=false] - 固定顶部
 * @param {string} [title] - 标题
 * @param {slot} [left] - 显示在左侧区域
 * @param {slot} [right] - 显示在右侧区域
 *
 * @example
 * <cui-header title="我是标题" fixed>
 *   <cui-button slot="left" icon="back" @click="handleBack">返回</cui-button>
 *   <cui-button slot="right" icon="more"></cui-button>
 * </cui-header>
 */
module.exports = {
    name: 'cui-header',

    template: __inline('header.ftl'),

    props: {
        fixed: Boolean,
        title: String
    }
};