var WindDom = require('../../wind-dom/event.js');
var XCell = require('../cell/cell.js');
var Clickoutside = require('../../clickoutside/clickoutside.js');

/**
 * cui-cell-swipe
 * @desc 类似 iOS 滑动 Cell 的效果
 * @module components/cell-swipe
 *
 * @example
 * <cui-cell-swipe
 *   :left=[
 *     {
 *       content: 'text',
 *       style: {color: 'white', backgroundColor: 'red'},
 *       handler(e) => console.log(123)
 *     }
 *   ]
 *   :right=[{ content: 'allowed HTML' }]>
 *   swipe me
 * </cui-cell-swipe>
 */
module.exports = {
    name: 'cui-cell-swipe',

    template: __inline('cell-swipe.ftl'),

    components: {
        'x-cell': XCell
    },

    directives: {
        Clickoutside: Clickoutside
    },

    props: {
        left: Array,
        right: Array,
        icon: String,
        title: String,
        label: String,
        isLink: Boolean,
        value: {}
    },

    data: function() {
        return {
            start: { x: 0, y: 0 }
        };
    },

    mounted: function() {
        this.wrap = this.$refs.cell.$el.querySelector('.cui-cell-wrapper');
        this.leftElm = this.$refs.left;
        this.rightElm = this.$refs.right;
        this.leftWrapElm = this.leftElm.parentNode;
        this.rightWrapElm = this.rightElm.parentNode;
        this.leftWidth = this.leftElm.getBoundingClientRect().width;
        this.rightWidth = this.rightElm.getBoundingClientRect().width;

        this.leftDefaultTransform = this.translate3d(-this.leftWidth - 1);
        this.rightDefaultTransform = this.translate3d(this.rightWidth);

        this.rightWrapElm.style.webkitTransform = this.rightDefaultTransform;
        this.leftWrapElm.style.webkitTransform = this.leftDefaultTransform;
    },

    methods: {
        translate3d: function(offset) {
            return 'translate3d(' + offset + 'px, 0, 0)';
        },

        swipeMove: function(offset) {
            offset = offset || 0;
            this.wrap.style.webkitTransform = this.translate3d(offset);
            this.rightWrapElm.style.webkitTransform = this.translate3d(this.rightWidth + offset);
            this.leftWrapElm.style.webkitTransform = this.translate3d(-this.leftWidth + offset);
            this.swiping = true;
        },

        swipeLeaveTransition: function(direction) {
            var _this = this;
            setTimeout(function() {
                _this.swipeLeave = true;

                // left
                if (direction > 0 && -_this.offsetLeft > _this.rightWidth * 0.4) {
                    _this.swipeMove(-_this.rightWidth);
                    _this.swiping = false;
                    _this.opened = true;
                    return;
                    // right
                } else if (direction < 0 && _this.offsetLeft > _this.leftWidth * 0.4) {
                    _this.swipeMove(_this.leftWidth);
                    _this.swiping = false;
                    _this.opened = true;
                    return;
                }

                this.swipeMove(0);
                WindDom.once(_this.wrap, 'webkitTransitionEnd', function () {
                        _this.wrap.style.webkitTransform = '';
                    this.rightWrapElm.style.webkitTransform = this.rightDefaultTransform;
                    this.leftWrapElm.style.webkitTransform = this.leftDefaultTransform;
                    this.swipeLeave = false;
                    this.swiping = false;
                });
            }, 0);
        },

        startDrag: function(evt) {
            evt = evt.changedTouches ? evt.changedTouches[0] : evt;
            this.dragging = true;
            this.start.x = evt.pageX;
            this.start.y = evt.pageY;
        },

        onDrag: function(evt) {
            if (this.opened) {
                !this.swiping && this.swipeMove(0);
                this.opened = false;
                return;
            }
            if (!this.dragging) return;
            var swiping;
            var e = evt.changedTouches ? evt.changedTouches[0] : evt;
            var offsetTop = e.pageY - this.start.y;
            var offsetLeft = this.offsetLeft = e.pageX - this.start.x;

            if ((offsetLeft < 0 && -offsetLeft > this.rightWidth) ||
                (offsetLeft > 0 && offsetLeft > this.leftWidth) ||
                (offsetLeft > 0 && !this.leftWidth) ||
                (offsetLeft < 0 && !this.rightWidth)) {
                return;
            }

            var y = Math.abs(offsetTop);
            var x = Math.abs(offsetLeft);

            swiping = !(x < 5 || (x >= 5 && y >= x * 1.73));
            if (!swiping) return;
            evt.preventDefault();

            this.swipeMove(offsetLeft);
        },

        endDrag: function() {
            if (!this.swiping) return;
            this.swipeLeaveTransition(this.offsetLeft > 0 ? -1 : 1);
        }
    }
};