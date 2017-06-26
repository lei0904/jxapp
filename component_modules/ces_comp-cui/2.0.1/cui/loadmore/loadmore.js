var spinner = require('../spinner/spinner.js');

module.exports = {
    name: 'cui-loadmore',

    template: __inline('loadmore.ftl'),

    components: {
        'spinner': spinner
    },

    props: {
        autoFill: {
            type: Boolean,
            default: true
        },
        distanceIndex: {
            type: Number,
            default: 2
        },
        topPullText: {
            type: String,
            default: '下拉刷新'
        },
        topDropText: {
            type: String,
            default: '释放更新'
        },
        topLoadingText: {
            type: String,
            default: '加载中...'
        },
        topDistance: {
            type: Number,
            default: 70
        },
        topMethod: {
            type: Function
        },
        bottomPullText: {
            type: String,
            default: '上拉刷新'
        },
        bottomDropText: {
            type: String,
            default: '释放更新'
        },
        bottomLoadingText: {
            type: String,
            default: '加载中...'
        },
        bottomDistance: {
            type: Number,
            default: 70
        },
        bottomMethod: {
            type: Function
        },
        bottomAllLoaded: {
            type: Boolean,
            default: false
        }
    },

    data: function() {
        return {
            uuid: null,
            translate: 0,
            translateValue: '0rem',
            scrollEventTarget: null,
            containerFilled: false,
            topText: '',
            topDropped: false,
            bottomText: '',
            bottomDropped: false,
            bottomReached: false,
            direction: '',
            startY: 0,
            startScrollTop: 0,
            currentY: 0,
            topStatus: '',
            bottomStatus: ''
        };
    },

    watch: {
        translate: function () {
            if (window.dpr) {
                this.translateValue = (this.translate / 2 * window.dpr) + 'px';
            } else {
                this.translateValue = (this.translate) + 'px';
            }
        },
        topStatus: function(val) {
            this.$emit('top-status-change', val);
            switch (val) {
                case 'pull':
                    this.topText = this.topPullText;
                    break;
                case 'drop':
                    this.topText = this.topDropText;
                    break;
                case 'loading':
                    this.topText = this.topLoadingText;
                    break;
            }
        },

        bottomStatus: function(val) {
            this.$emit('bottom-status-change', val);
            switch (val) {
                case 'pull':
                    this.bottocuiext = this.bottomPullText;
                    break;
                case 'drop':
                    this.bottocuiext = this.bottomDropText;
                    break;
                case 'loading':
                    this.bottocuiext = this.bottomLoadingText;
                    break;
            }
        }
    },

    methods: {
        onTopLoaded: function(id) {
            if (id === this.uuid) {
                this.translate = 0;
                var _this = this;
                setTimeout(function() {
                    _this.topStatus = 'pull';
                }, 200);
            }
        },

        onBottomLoaded: function(id) {
            this.bottomStatus = 'pull';
            this.bottomDropped = false;
            if (id === this.uuid) {
                var _this = this;
                this.$nextTick(function() {
                    if (_this.scrollEventTarget === window) {
                        document.body.scrollTop += 100;
                    } else {
                        _this.scrollEventTarget.scrollTop += 100;
                    }
                    _this.translate = 0;
                });
            }
            if (!this.bottomAllLoaded && !this.containerFilled) {
                this.fillContainer();
            }
        },

        getScrollEventTarget: function(element) {
            var currentNode = element;
            while (currentNode && currentNode.tagName !== 'HTML' && currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
                var overflowY = document.defaultView.getComputedStyle(currentNode).overflowY;
                if (overflowY === 'scroll' || overflowY === 'auto') {
                    return currentNode;
                }
                currentNode = currentNode.parentNode;
            }
            return window;
        },

        getScrollTop: function(element) {
            if (element === window) {
                return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop);
            } else {
                return element.scrollTop;
            }
        },

        bindTouchEvents: function() {
            this.$el.addEventListener('touchstart', this.handleTouchStart);
            this.$el.addEventListener('touchmove', this.handleTouchMove);
            this.$el.addEventListener('touchend', this.handleTouchEnd);
        },

        init: function() {
            this.topStatus = 'pull';
            this.bottomStatus = 'pull';
            this.topText = this.topPullText;
            this.scrollEventTarget = this.getScrollEventTarget(this.$el);
            if (typeof this.bottomMethod === 'function') {
                this.fillContainer();
                this.bindTouchEvents();
            }
            if (typeof this.topMethod === 'function') {
                this.bindTouchEvents();
            }
        },

        fillContainer: function() {
            if (this.autoFill) {
                var _this = this;
                this.$nextTick(function() {
                    if (this.scrollEventTarget === window) {
                        _this.containerFilled = _this.$el.getBoundingClientRect().bottom >= document.documentElement.getBoundingClientRect().bottom;
                    } else {
                        _this.containerFilled = _this.$el.getBoundingClientRect().bottom >= _this.scrollEventTarget.getBoundingClientRect().bottom;
                    }
                    if (!_this.containerFilled) {
                        _this.bottomStatus = 'loading';
                        _this.bottomMethod(_this.uuid);
                    }
                });
            }
        },

        checkBottomReached: function() {

            if (this.scrollEventTarget === window) {
                return document.body.scrollTop + document.documentElement.clientHeight === document.body.scrollHeight;
            } else {
                /*console.log(this.$el);
                console.log(this.scrollEventTarget);
                console.log('this.$el.getBoundingClientRect().bottom == ' + this.$el.getBoundingClientRect().bottom);
                console.log('this.scrollEventTarget.getBoundingClientRect().bottom == ' + this.scrollEventTarget.getBoundingClientRect().bottom);*/
                return parseInt(this.$el.getBoundingClientRect().bottom - 10) <= parseInt(this.scrollEventTarget.getBoundingClientRect().bottom);
            }
        },

        handleTouchStart: function(event) {
            this.startY = event.touches[0].clientY;
            this.startScrollTop = this.getScrollTop(this.scrollEventTarget);
            this.bottomReached = false;

            if (this.topStatus !== 'loading') {
                this.topStatus = 'pull';
                this.topDropped = false;
            }
            if (this.bottomStatus !== 'loading') {
                this.bottomStatus = 'pull';
                this.bottomDropped = false;
            }
        },

        handleTouchMove: function(event) {
            if (this.startY < this.$el.getBoundingClientRect().top && this.startY > this.$el.getBoundingClientRect().bottom) {
                return;
            }
            this.currentY = event.touches[0].clientY;
            var distance = (this.currentY - this.startY) / this.distanceIndex;
            this.direction = distance > 0 ? 'down' : 'up';

            if (typeof this.topMethod === 'function' &&
                this.direction === 'down' &&
                this.getScrollTop(this.scrollEventTarget) === 0 &&
                this.topStatus !== 'loading') {
                event.preventDefault();
                event.stopPropagation();
                this.translate = distance - this.startScrollTop;
                if (this.translate < 0) {
                    this.translate = 0;
                }
                this.topStatus = this.translate >= this.topDistance ? 'drop' : 'pull';
            }

            if (this.direction === 'up') {
                this.bottomReached = this.bottomReached || this.checkBottomReached();
            }

            /*if (this.direction === 'up') {
                console.log(typeof this.bottomMethod === 'function');
                console.log(this.direction === 'up');
                console.log(this.bottomReached);
                console.log(this.bottomStatus !== 'loading');
                console.log(!this.bottomAllLoaded);
            }*/

            if (typeof this.bottomMethod === 'function' &&
                this.direction === 'up' &&
                this.bottomReached &&
                this.bottomStatus !== 'loading' &&
                !this.bottomAllLoaded) {
                event.preventDefault();
                event.stopPropagation();
                this.translate = this.getScrollTop(this.scrollEventTarget) - this.startScrollTop + distance;
                if (this.translate > 0) {
                    this.translate = 0;
                }
                this.bottomStatus = -this.translate >= this.bottomDistance ? 'drop' : 'pull';
            }
        },

        handleTouchEnd: function() {
            if (this.direction === 'down' && this.getScrollTop(this.scrollEventTarget) === 0 && this.translate > 0) {
                this.topDropped = true;
                if (this.topStatus === 'drop') {
                    this.translate = '100';
                    this.topStatus = 'loading';
                    this.topMethod(this.uuid);
                } else {
                    this.translate = '0';
                    this.topStatus = 'pull';
                }
            }
            if (this.direction === 'up' && this.bottomReached && this.translate < 0) {
                this.bottomDropped = true;
                this.bottomReached = false;
                if (this.bottomStatus === 'drop') {
                    this.translate = '-100';
                    this.bottomStatus = 'loading';
                    this.bottomMethod(this.uuid);
                } else {
                    this.translate = '0';
                    this.bottomStatus = 'pull';
                }
            }
            this.direction = '';
        }
    },

    mounted: function() {
        this.uuid = Math.random().toString(36).substring(3, 8);
        this.init();
    }
};