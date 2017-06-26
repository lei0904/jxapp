function cleanPath(path) {
    return path.replace(/\/\//g, '/');
}

/**
 * cui-cell
 * @module components/cell
 * @desc 单元格
 * @param {string} [to] - 跳转链接
 * @param {string} [icon] - 图标，提供 more, back，或者自定义的图标（传入不带前缀的图标类名，最后拼接成 .cesui-xxx）
 * @param {string} [title] - 标题
 * @param {string} [label] - 备注信息
 * @param {boolean} [is-link=false] - 可点击的链接
 * @param {string} [value] - 右侧显示文字
 * @param {slot} - 同 value, 会覆盖 value 属性
 * @param {slot} [title] - 同 title, 会覆盖 title 属性
 * @param {slot} [icon] - 同 icon, 会覆盖 icon 属性，例如可以传入图片
 *
 * @example
 * <cui-cell title="标题文字" icon="back" is-link value="描述文字"></cui-cell>
 * <cui-cell title="标题文字" icon="back">
 *   <div slot="value">描述文字啊哈</div>
 * </cui-cell>
 */
module.exports = {
    name: 'cui-cell',

    template: __inline('cell.ftl'),

    props: {
        to: String,
        icon: String,
        title: String,
        label: String,
        isLink: Boolean,
        value: {}
    },

    computed: {
        href: function() {
            var href;

            if (this.$router && this.to) {
                const base = this.$router.history.base;
                const resolved = this.$router.match(this.to);
                const fullPath = resolved.redirectedFrom || resolved.fullPath;

                href = base ? cleanPath(base + fullPath) : fullPath;
            } else {
                href = this.to;
            }

            if (href && !this.added && this.$router) {
                var _this = this;
                _this.$nextTick(function() {
                    _this.added = true;
                    _this.$el.addEventListener('click', this.handleClick);
                });
            }
            return href;
        }
    },

    methods: {
        handleClick: function($event) {
            $event.preventDefault();
            this.$router.push(this.href);
        }
    }
};