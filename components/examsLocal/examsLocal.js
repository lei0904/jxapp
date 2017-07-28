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
            showStart:true,
            qLength:0,
            localParams:{}
        }
    },
    methods: {
        removeQ:function(){
            if(this.showStart){
                this.showStart =false;
                //todo  取消收藏此问题
                Collect.removeQ(this.list,this.localParams);
                this.qLength =Collect.getQLength(this.localParams);
                if(this.qLength>0){
                    this.loadQ(this.indexId);
                }else{
                    Cui.Toast({
                        message: "没有收藏题目",
                        position: 'bottom'
                    });
                    this.$route.push({'path':'/exercise'})
                }
                this.showStart=true;
            }
        },
        loadQ:function (indexId) {
            if(this.qLength > indexId){
                this.list =  Collect.getQ(indexId,this.localParams);
            }
        },
        nextAnswer:function(){
                if( this.list.answer == this.checklist.sort().join(",") || this.list.answer == this.answer || this.explainShow ){
                    this.answer ='';
                    this.checklist =[];
                  //  Collect.removeQ(this.list,this.localParams);
                    if(this.qLength> this.indexId ){
                        this.indexId = this.indexId +1;
                        this.loadQ(this.indexId);
                        this.showStart=true;
                        this.explainShow =false;

                    }else{
                        Cui.Toast({
                            message: "最后一题了",
                            position: 'bottom'
                        });
                    }

                }else{
                    this.explainShow =true;
                }
        },
        upAnswer:function(){
            if(this.indexId >0 && this.qLength > 0){
                this.indexId = this.indexId - 1;
                this.loadQ(this.indexId);
                this.showStart=true;
                this.explainShow =false;
            }else{
                    Cui.Toast({
                        message: "已经是第一题了",
                        position: 'bottom'
                    });
            }
        },
    },
    activated: function(){
        this.showStart=true;
        this.localParams = this.$route.query;
        this.indexId =this.localParams.questions ;
        this.qLength=0;
        this.qLength =Collect.getQLength(this.localParams);
        console.log("======",this.localParams);
        this.loadQ(this.indexId);
    }
};