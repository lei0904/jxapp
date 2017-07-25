/**
 * Created by lei on 2017/7/25.
 */
var Ces = require('ces');
var Cui = require('cui');
var Collect = require('examCollect');

module.exports = {
    template: __inline('examsLocal.ftl'),
    data: function () {
        return {
            list:{
                options:[]
            },
            answer:'',  //选择答案
            checklist:[], //多选题答案
            explainShow:false, //解释
            rightAnswer:'', //正确答案
            indexId:0,
            showStart:false
        }
    },
    methods: {
        removeQ:function(){
            if(!this.showStart){
                this.showStart =false;
                //todo  取消收藏此问题
                Collect.removeQ(this.list);
                this.loadQ(this.indexId);
            }
        },
        loadQ:function (indexId) {
            if( Collect.getQ(indexId) != -1){
                this.list =  Collect.getQ(indexId);
            }else{
                Cui.Toast({
                    message: "没有收藏题目了",
                    position: 'bottom'
                });
                this.$router.push({'path':'/exercise'});
            }
        },
        nextAnswer:function(){
            this.indexId = this.indexId +1;
            this.loadQ(this.indexId);
        },
        upAnswer:function(){
            this.indexId = this.indexId - 1;
            this.loadQ(this.indexId);
        },
    },
    activated: function(){
        this.indexId = 0 ;
        this.loadQ(this.indexId);
    }
};