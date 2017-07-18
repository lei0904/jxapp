var Ces = require('ces');
var Cui = require('cui');
var Api = require('api');

module.exports = {
    template: __inline('index.ftl'),
    data: function () {
        return {
            checkedCars:'1',
            checkedItem1:'',
            checkedItem2:'',
            switchValue:'',
            timevalue:'',
            options1:[]
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

        handleChange: function(value) {
            this.timevalue = value;
        }
    },
    created: function () {
        this.options1 = [
            {
                label: '7:00 - 8:00  预约人数：3人',
                value: '1'
            },
            {
                label: '8:00 - 9:00  预约人数：2人',
                value: '2'
            },
            {
                label: '9:00 - 10:00  预约人数：5人',
                value: '3'
            }
        ];
    }
};