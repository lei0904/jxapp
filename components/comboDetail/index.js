var Ces = require('ces');
var Cui = require('cui');
var Api = require('api');
var moment = require('moment');

var Storage = require('../api/storage.js');
var weeks = ['一', '二', '三', '四', '五', '六', '日'];

module.exports = {
    template: __inline('index.ftl'),
    data: function () {
        return {
            combo: {},

            checkedCars:'1',
            checkedItem1:'',
            checkedItem2:'',
            switchValue:'',
            timeValue:'',
            dateValue:'',
            startDate:new Date(),
            endDate:new Date()
        }
    },
    filters: {
        showComboOrderWeeks: function (combo) {
            var str = combo['order_weeks'];
            if (!str) {
                return '';
            }
            var result = [];
            var arr = str.split(',');
            arr.forEach(function (o) {
                result.push('周' + weeks[parseInt(o)-1]);
            });
            return result.join(",");
        },
        showComboOrderTimes: function (combo) {
            return combo['order_start_time'] + ' - ' + combo['order_end_time']
        }
    },
    methods: {
        checkCars:function (i) {
            this.checkedCars = i;
        },
        checkedItema:function (i) {
            if(this.checkedItem1 == i){
                this.checkedItem1 = '';
            }else{
                this.checkedItem1 = i;
            }
        },
        checkedItemb:function (i) {
            if(this.checkedItem2 == i){
                this.checkedItem2 = '';
            }else{
                this.checkedItem2 = i;
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

        }
    },
    activated: function () {
        var s = new Storage('session');
        this.combo = Storage.parse(s.get('ComboDetail'));
        console.log(this.combo);
    },
    mounted:function () {
        this.endDate = new Date(moment().endOf('week').add(1, 'd'));
        console.log(this.endDate)
        // sevenDayAgo.setTime(new Date(val).getTime() - 3600 * 1000 * 24 * 6);
    }
};