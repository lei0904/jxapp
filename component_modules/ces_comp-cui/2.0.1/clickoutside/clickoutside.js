/**
 * v-clickoutside
 * @desc 点击元素外面才会触发的事件
 * @example
 * ```vue
 * <div v-element-clickoutside="handleClose">
 * ```
 */
var clickoutsideContext = '@@clickoutsideContext';

module.exports = {
    bind: function(el, binding, vnode) {
        var documentHandler = function(e) {
            if (vnode.context && !el.contains(e.target)) {
                vnode.context[el[clickoutsideContext].methodName]();
            }
        };
        el[clickoutsideContext] = {
            documentHandler: documentHandler,
            methodName: binding.expression,
            arg: binding.arg || 'click'
        };
        document.addEventListener(el[clickoutsideContext].arg, documentHandler);
    },

    update: function(el, binding) {
        el[clickoutsideContext].methodName = binding.expression;
    },

    unbind: function(el) {
        document.removeEventListener(
            el[clickoutsideContext].arg,
            el[clickoutsideContext].documentHandler);
    },

    install: function(Vue) {
        Vue.directive('clickoutside', {
            bind: this.bind,
            unbind: this.unbind
        });
    }
};
