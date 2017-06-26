module.exports = {
    computed: {
        spinnerColor: function() {
            return this.color || this.$parent.color || '#ccc';
        },

        spinnerSize: function() {
            var d = ((this.size || this.$parent.size || 28) / 2) * window.dpr  + 'px';
            // var d = (this.size || this.$parent.size || 28)  + 'px';
            // return px2rem(d);
            return d;
        }
    },

    props: {
        size: Number,
        color: String
    }
};