function broadcast(componentName, eventName, params) {
    this.$children.forEach(function(child) {
        var name = child.$options.componentName;

        if (name === componentName) {
            child.$emit.apply(child, [eventName].concat(params));
        } else {
            broadcast.apply(child, [componentName, eventName].concat(params));
        }
    });
}
module.exports = {
    methods: {
        dispatch: function(componentName, eventName, params) {
            var parent = this.$parent;
            var name = parent.$options.componentName;

            while (parent && (!name || name !== componentName)) {
                parent = parent.$parent;

                if (parent) {
                    name = parent.$options.componentName;
                }
            }
            if (parent) {
                parent.$emit.apply(parent, [eventName].concat(params));
            }
        },
        broadcast: function(componentName, eventName, params) {
            broadcast.call(this, componentName, eventName, params);
        }
    }
};
