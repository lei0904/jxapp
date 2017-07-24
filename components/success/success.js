var Ces = require('ces');
var Cui = require('cui');
var Api = require('api');

module.exports = {
    template: __inline('success.ftl'),
    data: function () {
        return {
            score:0,
            dis:'',
            pass:false
        }
    },
    methods:{
    },
    activated:function(){
        console.log("=======",this.$route);
        this.score=this.$route.query.score;

        if( parseInt(this.score) >= 60){
            this.dis = "合格";
            this.pass = true
        }else{
            this.dis = "不合格";
            this.pass = false
        }
    }
};