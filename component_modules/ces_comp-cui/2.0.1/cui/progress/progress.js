module.exports = {
    name: 'cui-progress',

    template: __inline('progress.ftl'),

    props: {
        value: Number,
        barHeight: {
            type: Number,
            default: 3
        }
    }
};