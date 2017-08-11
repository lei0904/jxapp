var moment = require('../moment/moment.js');

module.exports = {
    template: __inline('index.ftl'),
    data: function () {
        return {
            trainee: {},
            success: [],
            pending: [],
            emptyNow:false,
            emptyPast:false
        }
    },
    methods: {

    },
    filters: {
        formatTime: function (d) {
            if (d) {
                var arr = (d + "").split(':');
                return arr[0] + ":" + arr[1];
            }
            return '';
        },
        time: function (item) {
            if (item) {
                if (item['b_status'] === 3) {
                    return '已驳回'
                }
                return item['b_period'] + '时';
                /*var d = item['t_date'];
                var s = item['t_start_time'];
                var e = item['t_end_time'];

                var start_day = moment(d + " " + s);
                var end_day = moment(d + " " + e);

                var b = end_day.diff(start_day);
                return (b / 3600000) + '时';*/
                /*var start = new Date(d + " " + s);
                var end = new Date(d + " " + e);

                var b = end.getTime() - start.getTime();

                return (b / 3600000) + '时';*/
            }
            return '0时';
        },
        traineeStatus: function (trainee) {
            var t_status = trainee['t_status'];
            return {
                0:'未缴费',
                1:'科目一',
                2:'科目二',
                3:'科目三',
                4:'科目四'
            }[t_status];
        }
    },
    activated: function () {
        var _this = this;
        _this.trainee = {};
        _this.success = [];
        _this.pending = [];
        _this.$api.get('api/biz/bespeak/mine', {})
            .then(function (rets) {
                _this.$api.process(rets, function (rets) {
                    var data = rets.data;
                    if (data) {
                        _this.trainee = data.trainee;
                        _this.success = data.success;
                        if (data.success.length == 0){
                            _this.emptyPast = true;
                        }
                        _this.pending = data.pending;
                        if (data.pending.length == 0){
                            _this.emptyNow = true;
                        }
                        console.log(_this.pending);
                    } else {
                        _this.trainee = {};
                        _this.success = [];
                        _this.pending = [];
                        _this.emptyPast = true;
                        _this.emptyNow = true;
                    }
                });
            })
    }
};