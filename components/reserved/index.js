var Ces = require('ces');
var Cui = require('cui');
var Api = require('api');
var moment = require('moment');

module.exports = {
    template: __inline('index.ftl'),
    data: function () {
        return {
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
    mounted:function () {
        this.endDate = new Date(moment().endOf('week').add(1, 'd'));
        console.log(this.endDate)
        // sevenDayAgo.setTime(new Date(val).getTime() - 3600 * 1000 * 24 * 6);
    }
};