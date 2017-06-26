var SPINNERS = [
    'snake',
    'double-bounce',
    'triple-bounce',
    'fading-circle'
];
var parseSpinner = function(index) {
    if ({}.toString.call(index) === '[object Number]') {
        if (SPINNERS.length <= index) {
            console.warn(index +' spinner not found, use the default spinner.');
            index = 0;
        }
        return SPINNERS[index];
    }

    if (SPINNERS.indexOf(index) === -1) {
        console.warn(index +' spinner not found, use the default spinner.');
        index = SPINNERS[0];
    }
    return index;
};

/**
 * cui-spinner
 * @module components/spinner
 * @desc 加载动画
 * @param {(string|number)} [type=snake] - 显示类型，传入类型名或者类型 id，可选 `snake`, `dobule-bounce`, `triple-bounce`, `fading-circle`
 * @param {number} size - 尺寸
 * @param {string} color - 颜色
 *
 * @example
 * <cui-spinner type="snake"></cui-spinner>
 *
 * <!-- double-bounce -->
 * <cui-spinner :type="1"></cui-spinner>
 *
 * <!-- default snake -->
 * <cui-spinner :size="30" color="#999"></cui-spinner>
 */
module.exports = {
    name: 'cui-spinner',

    template: __inline('spinner.ftl'),

    computed: {
        spinner: function() {
            return 'spinner-'+ parseSpinner(this.type);
        }
    },

    components: {
        SpinnerSnake: require('./spinner/snake.js'),
        SpinnerDoubleBounce: require('./spinner/double-bounce.js'),
        SpinnerTripleBounce: require('./spinner/triple-bounce.js'),
        SpinnerFadingCircle: require('./spinner/fading-circle.js')
    },

    props: {
        type: {
            default: 0
        },
        size: {
            type: Number,
            default: 56
        },
        color: {
            type: String,
            default: '#ccc'
        }
    }
};