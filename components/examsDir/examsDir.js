/**
 * Created by lei on 2017/7/17.
 */
var Ces = require('ces');
var Cui = require('cui');
var Api = require('api');

module.exports = {
    template: __inline('examsDir.ftl'),
    data: function () {
        return {
             list:[]
        }
    },
    methods: {
        toExams:function(item){
            var topic =JSON.parse(sessionStorage.getItem('topic'));
                topic.questions=1;
                topic.start=true;
                topic.chapterDesc = item.name;
                topic.totalAnswer = item.length;
            sessionStorage.setItem('topic',JSON.stringify(topic));

            this.$router.push({'path':'/exams'})
        }
    },
    activated: function(){
        var params =JSON.parse(sessionStorage.getItem('topic'));

        var nativeRes = [parseInt(params.subject),{'type':params.type,'question':0,'chapterDesc':params.chapterDesc,'start':params.start}];

        console.log("nativeRes====",nativeRes);

        var _ts =this;
        Ces.Plugins.nativeApi.questions(nativeRes,function(rets){
            console.log(" 第一次进入==",rets);
            _ts.list=rets.data
        })
    }
};