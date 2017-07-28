module.exports = {
    template: __inline('index.ftl'),
    data: function () {
        return {
            list: []
        }
    },
    methods: {

    },
    activated: function () {
        var _this = this;
        _this.$api.get('api/biz/shuttle/mine', {})
            .then(function (rets) {
                _this.$api.process(rets, function (rets) {
                    var data = rets.data;
                    if (data) {
                        _this.list = data;
                    } else {
                        _this.list = [];
                    }
                });
            })
    }
};