
/**
 * cui-tab-container-item
 * @desc 搭配 tab-container 使用
 * @module components/tab-container-item
 *
 * @param {number|string} [id] - 该项的 id
 *
 * @example
 * <cui-tab-container v-model="selected">
 *   <cui-tab-container-item id="1"> 内容A </cui-tab-container-item>
 *   <cui-tab-container-item id="2"> 内容B </cui-tab-container-item>
 *   <cui-tab-container-item id="3"> 内容C </cui-tab-container-item>
 * </cui-tab-container>
 */
module.exports = {
    name: 'cui-tab-container-item',

    template: __inline('tab-container-item.ftl'),

    props: ['id']
};
