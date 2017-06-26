var draggable = require('./draggable.js');
var translateUtil = require('./translate.js');
var WindDomEvent = require('../../wind-dom/event.js');
var WindDomClass = require('../../wind-dom/class.js');
var emitter = require('../../mixins/emitter.js');
// import 'raf.js';

var once = WindDomEvent.once;

var addClass = WindDomClass.addClass;
var removeClass = WindDomClass.removeClass;


var rotateElement = function (element, angle) {
    if (!element) return;
    var transformProperty = translateUtil.transformProperty;

    element.style[transformProperty] = element.style[transformProperty].replace(/rotateX\(.+?deg\)/gi, '') + ' rotateX('+ angle +'deg)';
};

var ITEM_HEIGHT = 72;
var VISIBLE_ITEMS_ANGLE_MAP = {
    3: -45,
    5: -20,
    7: -15
};

module.exports = {

    template: __inline('picker-slot.ftl'),

    props: {
        values: {
            type: Array,
            default: function () {
                return [];
            }
        },
        value: {},
        visibleItemCount: {
            type: Number,
            default: 5
        },
        rotateEffect: {
            type: Boolean,
            default: false
        },
        divider: {
            type: Boolean,
            default: false
        },
        textAlign: {
            type: String,
            default: 'center'
        },
        flex: {},
        className: {},
        content: {}
    },

    data: function () {
        return {
            currentValue: this.value,
            mutatingValues: this.values,
            dragging: false,
            animationFrameId: null
        };
    },

    mixins: [emitter],

    computed: {
        flexStyle: function () {
            return {
                'flex': this.flex,
                '-webkit-box-flex': this.flex,
                '-moz-box-flex': this.flex,
                '-ms-flex': this.flex
            };
        },
        classNames: function () {
            const PREFIX = 'picker-slot-';
            var resultArray = [];

            if (this.rotateEffect) {
                resultArray.push(PREFIX + 'absolute');
            }

            var textAlign = this.textAlign || 'center';
            resultArray.push(PREFIX + textAlign);

            if (this.divider) {
                resultArray.push(PREFIX + 'divider');
            }

            if (this.className) {
                resultArray.push(this.className);
            }

            return resultArray.join(' ');
        },
        contentHeight: function () {
            return ITEM_HEIGHT * this.visibleItemCount;
        },
        valueIndex: function () {
            return this.mutatingValues.indexOf(this.currentValue);
        },
        dragRange: function () {
            var values = this.mutatingValues;
            var visibleItemCount = this.visibleItemCount;

            return [-ITEM_HEIGHT * (values.length - Math.ceil(visibleItemCount / 2)), ITEM_HEIGHT * Math.floor(visibleItemCount / 2)];
        }
    },

    methods: {
        value2Translate: function (value) {
            var values = this.mutatingValues;
            var valueIndex = values.indexOf(value);
            var offset = Math.floor(this.visibleItemCount / 2);

            if (valueIndex !== -1) {
                return (valueIndex - offset) * -ITEM_HEIGHT;
            }
        },

        translate2Value: function (translate) {
            translate = Math.round(translate / ITEM_HEIGHT) * ITEM_HEIGHT;
            var index = -(translate - Math.floor(this.visibleItemCount / 2) * ITEM_HEIGHT) / ITEM_HEIGHT;

            return this.mutatingValues[index];
        },

        updateRotate: function (currentTranslate, pickerItems) {
            if (this.divider) return;
            var dragRange = this.dragRange;
            var wrapper = this.$refs.wrapper;

            if (!pickerItems) {
                pickerItems = wrapper.querySelectorAll('.picker-item');
            }

            if (currentTranslate === undefined) {
                currentTranslate = translateUtil.getElementTranslate(wrapper).top;
            }

            var itemsFit = Math.ceil(this.visibleItemCount / 2);
            var angleUnit = VISIBLE_ITEMS_ANGLE_MAP[this.visibleItemCount] || -20;

            [].forEach.call(pickerItems, function (item, index) {
                var itemOffsetTop = index * ITEM_HEIGHT;
                var translateOffset = dragRange[1] - currentTranslate;
                var itemOffset = itemOffsetTop - translateOffset;
                var percentage = itemOffset / ITEM_HEIGHT;

                var angle = angleUnit * percentage;
                if (angle > 180) angle = 180;
                if (angle < -180) angle = -180;

                rotateElement(item, angle);

                if (Math.abs(percentage) > itemsFit) {
                    addClass(item, 'picker-item-far');
                } else {
                    removeClass(item, 'picker-item-far');
                }
            });
        },

        planUpdateRotate: function () {
            var el = this.$refs.wrapper;
            var _this = this;
            cancelAnimationFrame(this.animationFrameId);

            _this.animationFrameId = requestAnimationFrame(function () {
                _this.updateRotate();
            });

            once(el, translateUtil.transitionEndProperty, function () {
                _this.animationFrameId = null;
                cancelAnimationFrame(_this.animationFrameId);
            });
        },

        initEvents: function () {
            var el = this.$refs.wrapper;
            var dragState = {};

            var velocityTranslate, prevTranslate, pickerItems;
            var _this = this;

            draggable(el, {
                start: function (event) {
                    cancelAnimationFrame(this.animationFrameId);
                    _this.animationFrameId = null;
                    dragState = {
                        range: _this.dragRange,
                        start: new Date(),
                        startLeft: event.pageX,
                        startTop: event.pageY,
                        startTranslateTop: translateUtil.getElementTranslate(el).top
                    };
                    pickerItems = el.querySelectorAll('.picker-item');
                },

                drag: function (event) {
                    _this.dragging = true;

                    dragState.left = event.pageX;
                    dragState.top = event.pageY;

                    var deltaY = dragState.top - dragState.startTop;
                    var translate = dragState.startTranslateTop + deltaY;

                    translateUtil.translateElement(el, null, translate);

                    velocityTranslate = translate - prevTranslate || translate;

                    prevTranslate = translate;

                    if (_this.rotateEffect) {
                        _this.updateRotate(prevTranslate, pickerItems);
                    }
                },

                end: function () {
                    this.dragging = false;

                    var momentumRatio = 7;
                    var currentTranslate = translateUtil.getElementTranslate(el).top;
                    var duration = new Date() - dragState.start;

                    var momentumTranslate;
                    if (duration < 300) {
                        momentumTranslate = currentTranslate + velocityTranslate * momentumRatio;
                    }

                    var dragRange = dragState.range;

                    _this.$nextTick(function () {
                        var translate;
                        if (momentumTranslate) {
                            translate = Math.round(momentumTranslate / ITEM_HEIGHT) * ITEM_HEIGHT;
                        } else {
                            translate = Math.round(currentTranslate / ITEM_HEIGHT) * ITEM_HEIGHT;
                        }

                        translate = Math.max(Math.min(translate, dragRange[1]), dragRange[0]);

                        translateUtil.translateElement(el, null, translate);

                        _this.currentValue = _this.translate2Value(translate);

                        if (_this.rotateEffect) {
                            _this.planUpdateRotate();
                        }
                    });

                    dragState = {};
                }
            });
        },

        doOnValueChange: function () {
            var value = this.currentValue;
            var wrapper = this.$refs.wrapper;

            translateUtil.translateElement(wrapper, null, this.value2Translate(value));
        },

        doOnValuesChange: function () {
            var el = this.$el;
            var items = el.querySelectorAll('.picker-item');
            [].forEach.call(items, function (item, index) {
                translateUtil.translateElement(item, null, ITEM_HEIGHT * index);
            });
            if (this.rotateEffect) {
                this.planUpdateRotate();
            }
        }
    },

    mounted: function () {
        this.ready = true;
        this.$emit('input', this.currentValue);

        if (!this.divider) {
            this.initEvents();
            this.doOnValueChange();
        }

        if (this.rotateEffect) {
            this.doOnValuesChange();
        }
    },

    watch: {
        values: function (val) {
            this.mutatingValues = val;
        },

        mutatingValues: function (val) {
            var _this = this;
            if (_this.valueIndex === -1) {
                _this.currentValue = (val || [])[0];
            }
            if (_this.rotateEffect) {
                _this.$nextTick(function () {
                    _this.doOnValuesChange();
                });
            }
        },
        currentValue: function (val) {
            this.doOnValueChange();
            if (this.rotateEffect) {
                this.planUpdateRotate();
            }
            this.$emit('input', val);
            this.dispatch('picker', 'slotValueChange', this);
        }
    }
};