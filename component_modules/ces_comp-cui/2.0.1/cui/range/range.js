var draggable = require('./draggable.js');

module.exports = {
    name: 'cui-range',

    template: __inline('range.ftl'),

    props: {
        min: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: 100
        },
        step: {
            type: Number,
            default: 1
        },
        disabled: {
            type: Boolean,
            default: false
        },
        value: {
            type: Number
        },
        barHeight: {
            type: Number,
            default: 1
        }
    },

    computed: {
        progress: function() {
            var value = this.value;
            if (typeof value === 'undefined' || value === null) return 0;
            return Math.floor((value - this.min) / (this.max - this.min) * 100);
        }
    },

    mounted: function() {
        var thumb = this.$refs.thumb;
        var content = this.$refs.content;

        var getThumbPosition = function() {
            var contentBox = content.getBoundingClientRect();
            var thumbBox = thumb.getBoundingClientRect();

            return {
                left: thumbBox.left - contentBox.left,
                top: thumbBox.top - contentBox.top
            };
        };

        var dragState = {};
        var _this = this;
        draggable(thumb, {
                start: function() {
                    if (_this.disabled) return;
                    var position = getThumbPosition();
                    dragState = {
                        thumbStartLeft: position.left,
                        thumbStartTop: position.top
                    };
                },
                drag: function(event) {
                    if (_this.disabled) return;
                    var contentBox = content.getBoundingClientRect();
                    var deltaX = event.pageX - contentBox.left - dragState.thumbStartLeft;
                    var stepCount = Math.ceil((_this.max - _this.min) / _this.step);
                    var newPosition = (dragState.thumbStartLeft + deltaX) - (dragState.thumbStartLeft + deltaX) % (contentBox.width / stepCount);

                    var newProgress = newPosition / contentBox.width;

                    if (newProgress < 0) {
                        newProgress = 0;
                    } else if (newProgress > 1) {
                        newProgress = 1;
                    }

                    _this.$emit('input', Math.round(_this.min + newProgress * (_this.max - _this.min)));
                },
                end: function() {
                    if (_this.disabled) return;
                    dragState = {};
                }
        });
    }
};
