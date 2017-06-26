var WindDom = require('../../wind-dom/event.js');
var arrayFindIndex = require('../../array-find-index/index.js');


/**
 * cui-tab-container
 * @desc 面板，搭配 tab-container-item 使用
 * @module components/tab-container
 *
 * @param {number|string} [value] - 当前激活的 tabId
 *
 * @example
 * <cui-tab-container v-model="selected">
 *   <cui-tab-container-item id="1"> 内容A </cui-tab-container-item>
 *   <cui-tab-container-item id="2"> 内容B </cui-tab-container-item>
 *   <cui-tab-container-item id="3"> 内容C </cui-tab-container-item>
 * </cui-tab-container>
 */
module.exports = {
    name: 'cui-tab-container',

    template: __inline('tab-container.ftl'),

    props: {
        value: {},
        swipeable: Boolean
    },

    data: function() {
        return {
            start: { x: 0, y: 0 },
            swiping: false,
            swipeLeave: false,
            activeItems: [],
            pageWidth: 0,
            currentActive: this.value
        };
    },

    watch: {
        value: function(val) {
            this.currentActive = val;
        },

        currentActive: function(val, oldValue) {
            this.$emit('input', val);
            if (!this.swipeable) return;
            var lastIndex = arrayFindIndex(this.$children, function (item) {
                return item.id === oldValue
            });
            this.swipeLeaveTransition(lastIndex);
        }
    },

    mounted: function() {
        if (!this.swipeable) return;

        this.wrap = this.$refs.wrap;
        this.pageWidth = this.wrap.clientWidth;
        this.limitWidth = this.pageWidth / 4;
    },

    methods: {
        swipeLeaveTransition: function(lastIndex) {
            lastIndex = lastIndex || 0;
            if (typeof this.index !== 'number') {
                this.index = arrayFindIndex(this.$children, function (item) {
                    return item.id === this.currentActive
                });
                this.swipeMove(-lastIndex * this.pageWidth);
            }

            var _this = this;
            setTimeout(function() {
                _this.swipeLeave = true;
                _this.swipeMove(-_this.index * _this.pageWidth);

                WindDom.once(_this.wrap, 'webkitTransitionEnd', function() {
                    _this.wrap.style.webkitTransform = '';
                    _this.swipeLeave = false;
                    _this.swiping = false;
                    _this.index = null;
                });
            }, 0);
        },

        swipeMove: function(offset) {
            this.wrap.style.webkitTransform = 'translate3d(' + offset + 'px, 0, 0)';
            this.swiping = true;
        },

        startDrag: function(evt) {
            evt = evt.changedTouches ? evt.changedTouches[0] : evt;
            this.dragging = true;
            this.start.x = evt.pageX;
            this.start.y = evt.pageY;
        },

        onDrag: function(evt) {
            if (!this.dragging) return;
            var swiping;
            var e = evt.changedTouches ? evt.changedTouches[0] : evt;
            var offsetTop = e.pageY - this.start.y;
            var offsetLeft = e.pageX - this.start.x;
            var y = Math.abs(offsetTop);
            var x = Math.abs(offsetLeft);

            swiping = !(x < 5 || (x >= 5 && y >= x * 1.73));
            if (!swiping) return;
            evt.preventDefault();

            var len = this.$children.length - 1;
            var index = arrayFindIndex(this.$children, function(item) {
                return item.id === this.currentActive
            });
            var currentPageOffset = index * this.pageWidth;
            var offset = offsetLeft - currentPageOffset;
            var absOffset = Math.abs(offset);

            if (absOffset > len * this.pageWidth ||
                (offset > 0 && offset < this.pageWidth)) {
                this.swiping = false;
                return;
            }
            this.offsetLeft = offsetLeft;
            this.index = index;
            this.swipeMove(offset);
        },

        endDrag: function() {
            if (!this.swiping) return;

            var direction = this.offsetLeft > 0 ? -1 : 1;
            var isChange = Math.abs(this.offsetLeft) > this.limitWidth;

            if (isChange) {
                this.index += direction;
                var child = this.$children[this.index];
                if (child) {
                    this.currentActive = child.id;
                    return;
                }
            }

            this.swipeLeaveTransition();
        }
    }
};