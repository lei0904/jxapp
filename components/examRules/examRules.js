var Ces = require('ces');
var Cui = require('cui');
var Api = require('api');
var moment = require('moment');

module.exports = {
    template: __inline('examRules.ftl'),
    data: function () {
        return {
            subject1:true,
            subject2:false,
            subject3:false,
            subject4:false
        }
    },
    methods: {
    },
    activated: function () {
     if( this.$route.query == 7){
         this.subject1 = true;
         this.subject4 = false;
     }else{
         this.subject1 = false;
         this.subject4 = true;
     }
         },
    mounted:function () {
    }
};