/**
 * Created by lei on 2017/7/13.
 */
var Ces = require('ces');
var Cui = require('cui');

module.exports = {
    template: __inline('exams.ftl'),
    data: function () {
        return {
            list:{},
            answer:'',  //选择答案
            checklist:'', //多选题答案
            explainShow:false, //解释
            rightAnswer:[], //正确答案
            questionId:0,  //序列号
            nextQuestionId:1,
            totalAnswer:0,
            chapterDesc:'' //专项训练

        }
    },
    methods: {
        nextAnswer:function(){
            var _ths =this;
            var params =JSON.parse(sessionStorage.getItem('topic'));
                params.questions = _ths.nextQuestionId;
                params.start=false;

            var nextParams = [parseInt(params.subject),{'type':params.type,'question':parseInt(params.questions),'chapterDesc':params.chapterDesc,'start':params.start}];

                if(_ths.nextQuestionId>_ths.totalAnswer){
                    Cui.Toast({
                        message: "已是最后一题",
                        position: 'bottom'
                    });
                }else{
                    if(( _ths.list.optiontype == "1" || _ths.list.optiontype == "0") && _ths.answer == _ths.rightAnswer[0] || _ths.explainShow){
                        Ces.Plugins.nativeApi.questions(nextParams,function (rets) {
                            _ths.list= rets.data;
                            _ths.rightAnswer = _ths.list.answer_arr;
                            if(params.chapterDesc){
                                _ths.nextQuestionId = Number(_ths.list.chapterid);
                            }else{
                                _ths.nextQuestionId = Number(_ths.list.questionid);
                            }
                            var options=[];
                            for(var i=0;i<_ths.list.answers.length;i++){
                                var item = {};
                                item.label=_ths.list.answers[i];
                                var j= i+1;
                                item.value = j.toString();
                                options.push(item)
                            }
                            _ths.list.options =options;
                        });
                        _ths.explainShow = false;
                        _ths.answer ="";
                    }else if( _ths.list.optiontype == "3"  && _ths.checklist.sort().toString() == _ths.rightAnswer.sort().toString()){
                        Ces.Plugins.nativeApi.questions(nextParams,function (rets) {
                            _ths.list= rets.data;
                            var options=[];
                            for(var i=0;i<_ths.list.answers.length;i++){
                                var item = {};
                                item.label=_ths.list.answers[i];
                                var j= i+1;
                                item.value = j.toString();
                                options.push(item)
                            }
                            _ths.list.options =options;
                            _ths.rightAnswer = _ths.list.answer_arr;
                            if(params.chapterDesc){
                                _ths.nextQuestionId = Number(_ths.list.chapterid);
                            }else{
                                _ths.nextQuestionId = Number(_ths.list.questionid);
                            }
                        });
                        _ths.explainShow = false;
                        _ths.checklist =[];
                    }else{
                        _ths.explainShow = true;
                    }
                }

        }
    },
    mounted(){
    },
    activated(){
        var params =JSON.parse(sessionStorage.getItem('topic'));

        console.log("nativeRes====",nativeRes);

        var nativeRes = [parseInt(params.subject),{'type':params.type,'question':parseInt(params.questions),'chapterDesc':params.chapterDesc,'start':params.start}];


        var _ts =this;
        _ts.chapterDesc =  params.chapterDesc;
         if(params.chapterDesc){
             _ts.nextQuestionId = 1;
         }
        Ces.Plugins.nativeApi.questions(nativeRes,function(rets){

            _ts.totalAnswer = rets.data.length;
            if(params.start){

                params.start =false;

                params.questions = 0;

                nativeRes =[parseInt(params.subject),{'type':params.type,'question':parseInt(params.questions),'chapterDesc':params.chapterDesc,'start':params.start}];

                Ces.Plugins.nativeApi.questions(nativeRes,function (rets) {
                        _ts.list= rets.data;
                        console.log('11111',rets);
                        var options=[];
                        for(var i=0;i<_ts.list.answers.length;i++){
                            var item = {};
                            item.label=_ts.list.answers[i];
                            var j= i+1;
                            item.value = j.toString();
                            options.push(item)
                        }
                        _ts.list.options =options;
                        _ts.rightAnswer = _ts.list.answer_arr;
                        if(params.chapterDesc){
                            _ts.nextQuestionId = Number(_ts.list.chapterid);
                        }else{
                            _ts.nextQuestionId = Number(_ts.list.questionid);
                        }
                        console.log("nextQuestionId=",_ts.nextQuestionId)
                })

            }else{
                _ts.list= rets.data;
                var options=[];
                for(var i=0;i<_ts.list.answers.length;i++){
                    var item = {};
                    item.label=_ts.list.answers[i];
                    var j= i+1;
                    item.value = j.toString();
                    options.push(item)
                }
                _ts.list.options =options;
                _ts.rightAnswer = _ts.list.answer_arr;
                if(params.chapterDesc){
                    _ts.nextQuestionId = Number(_ts.list.chapterid);
                }else{
                    _ts.nextQuestionId = Number(_ts.list.questionid);
                }
                console.log("nextQuestionId=",_ts.nextQuestionId)
            }
        })
    }
};