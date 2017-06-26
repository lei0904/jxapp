module.exports = {
    name: 'cui-index-section',

    template: __inline('index-section.ftl'),

    props: {
        index: {
            type: String,
            required: true
        }
    },

    mounted: function() {
        this.$parent.sections.push(this);
    },

    beforeDestroy: function() {
        var index = this.$parent.sections.indexOf(this);
        if (index > -1) {
            this.$parent.sections.splice(index, 1);
        }
    }
};