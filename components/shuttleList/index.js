module.exports = {
    template: __inline('index.ftl'),
    data: function () {
        return {
            list: [],
            empty:false
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
                        if(data.length == 0){
                            _this.empty = true ;
                        }
                    } else {
                        _this.list = [];
                        _this.empty = true ;
                    }
                });
            })
    }
};