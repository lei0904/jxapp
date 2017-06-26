module.exports =  {
    name: 'cui-swipe-item',

    template: __inline('swipe-item.ftl'),

    mounted: function() {
        this.$parent && this.$parent.swipeItemCreated(this);
    },

    destroyed: function() {
        this.$parent && this.$parent.swipeItemDestroyed(this);
    }
};