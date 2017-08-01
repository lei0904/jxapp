var Ces = require('ces');
var Cui = require('cui');
var Api = require('api');
var moment = require('moment');
var Helper = require('../helper/helper.js');


module.exports = {
    template: __inline('index.ftl'),
    data: function () {
        return {
            cars: [],
            timetable_am: [],
            timetable_pm: [],

            checkedCar:'',
            timeValue:'',
            dateValue:'',
            address:'',

            timetable:[],
            switchValue:true,
            startDate: new Date(moment().add(1, 'd')),
            endDate: new Date(moment().endOf('week').add(7, 'd'))
        }
    },
    watch: {
        dateValue: function (value) {
            this.dateValue = value;
            if (this.checkedCar) {
                this.timetableList();
            }
        },
        checkedCar: function (value) {
            this.checkedCar = value;
            if (this.dateValue) {
                this.timetableList();
            }
        }
    },
    methods: {
        timetableList: function () {
            var _this = this;
            _this.timetable = [];
            var d = document.querySelectorAll('.checkItem');
            for(var i = 0, l = d.length; i < l; i++) {
                var t = d[i];
                Helper.removeClass(t, 'checked');
            }
            _this.$api.get('api/biz/timetable/list',{
                car: _this.checkedCar,
                date: _this.dateValue
            }).then(function (rets) {
                var data = rets.data;
                if (data && data.length > 0) {
                    var am = [];
                    var pm = [];
                    for (var i = 0, l = data.length; i < l; i++) {
                        var t = data[i];
                        var start_time = t['start_time'];
                        var s = parseInt(start_time);
                        if (s <= 12) {
                            am.push(t);
                        } else {
                            pm.push(t);
                        }
                    }
                    _this.timetable_am = am;
                    _this.timetable_pm = pm;
                } else {
                    _this.timetable_am = [];
                    _this.timetable_pm = [];
                }
            });
        },
        checkCar:function (e, car) {
            var car_item = document.querySelectorAll('.car_item');
            for(var i = 0, l = car_item.length; i < l; i++) {
                var t = car_item[i];
                t.setAttribute('class', 'car_item item');
            }
            var target = e.target;
            target.setAttribute('class', 'car_item item checked');
            this.checkedCar = car.id;

        },
        timetableSelect:function (item) {
            var _this = this;
            var el = document.getElementById(item.id);
            if (Helper.contains(_this.timetable, item.id)) {
                Helper.remove(_this.timetable, item.id)
                Helper.removeClass(el, 'checked');
            } else {
                _this.timetable.push(item.id);
                Helper.addClass(el, 'checked');
            }
        },
        open: function(picker) {
            this.$refs[picker].open();
        },

        handleChange1: function(value) {
            this.timeValue = value;
        },
        handleChange2: function(value) {
            this.dateValue = moment(value).format('YYYY-MM-DD');

        },
        submit: function () {
            var _this = this;
            if (!_this.timetable || _this.timetable.length <= 0) {
                Helper.toast('请选择预约班次');
                return;
            }
            if (_this.switchValue) {
                if (!_this.timeValue || !_this.address) {
                    Helper.toast('请填写接送信息');
                    return;
                }
            }

            _this.$api.post('api/biz/bespeak', {
                timetable: _this.timetable.join(','),
                shuttle: _this.switchValue ? 1 : 0,
                shuttle_date: _this.dateValue,
                shuttle_time: _this.timeValue,
                shuttle_address: _this.address
            }).then(function (rets) {
                _this.$api.process(rets, function (rets) {
                    Helper.toast('预约成功，请等待审核');
                    _this.$router.push({ path: '/bespeakList' });
                })
            })
        }
    },
    filters: {
        formatTime: function (d) {
            if (d) {
                var arr = (d + "").split(':');
                return arr[0] + ":" + arr[1];
            }
            return '';
        }
    },
    activated:function () {
        var _this = this;
        _this.dateValue = new moment(_this.startDate).format('YYYY-MM-DD');
        _this.$api.get('api/biz/car/list', {}).then(function (rets) {
            _this.$api.process(rets, function (rets) {
                _this.cars = rets.data;
                if (_this.cars && _this.cars.length > 0) {
                    _this.$nextTick(function () {
                        _this.checkCar({
                            target : document.querySelectorAll('.car_item')[0]
                        }, _this.cars[0]);
                    })
                }
            })
        })
        // console.log(this.endDate)

        // sevenDayAgo.setTime(new Date(val).getTime() - 3600 * 1000 * 24 * 6);
    }
};