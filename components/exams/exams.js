/**
 * Created by lei on 2017/7/13.
 */
var Ces = require('ces');
var Cui = require('cui');

module.exports = {
    template: __inline('exams.ftl'),
    data: function () {
        return {
            list:{
                options:[]
            },
            answer:'',  //选择答案
            checklist:'', //多选题答案
            explainShow:false, //解释
            rightAnswer:[], //正确答案
            questionId:1,  //序列号
            nextQuestionId:1,
            totalAnswer:0,
            showNext:true,//是否显示下一题
            chapterDesc:'' //专项训练
        }
    },
    methods: {
        nextAnswer:function(){
            var _ths =this;
            var params =JSON.parse(sessionStorage.getItem('topic'));
                params.questions = _ths.nextQuestionId;
                params.start=false;


            if(params.type == 3){
                var num = Math.random()* _ths.totalAnswer + 1;
                _ths.nextQuestionId = parseInt(num, 10);
                _ths.showNext=true
            }



            var nextParams = [parseInt(params.subject),{'type':params.type,'question':parseInt(params.questions),'chapterDesc':params.chapterDesc,'start':params.start}];

                if(_ths.nextQuestionId >= _ths.totalAnswer){
                    Cui.Toast({
                        message: "已是最后一题",
                        position: 'bottom'
                    });
                    _ths.showNext =false;
                }else{
                    if(( _ths.list.optiontype == "1" || _ths.list.optiontype == "0") && _ths.answer == _ths.rightAnswer[0] || _ths.explainShow){
                        Ces.Plugins.nativeApi.questions(nextParams,function (rets) {

                            console.log('rets===',rets);

                             if(rets.status == 1){
                                _ths.list= rets.data;
                                _ths.rightAnswer = _ths.list.answer_arr;
                                var options=[];
                                for(var i=0;i<_ths.list.answers.length;i++){
                                    var item = {};
                                    var j= i+1;
                                    item.value = j.toString();
                                    item.label=j+"、"+_ths.list.answers[i];
                                    options.push(item)
                                }
                                _ths.list.options =options;
                                 _ths.questionId = _ths.questionId + 1;
                                 _ths.nextQuestionId= _ths.nextQuestionId + 1;
                             }else{
                                 Cui.Toast({
                                     message:rets.message,
                                            position:'bottom'
                                     })
                             }

                        });

                        _ths.explainShow = false;
                        _ths.answer ="";

                    }else if( _ths.list.optiontype == "3"  && _ths.checklist.sort().toString() == _ths.rightAnswer.sort().toString()){
                        Ces.Plugins.nativeApi.questions(nextParams,function (rets) {
                            _ths.list= rets.data;
                            var options=[];
                            for(var i=0;i<_ths.list.answers.length;i++){
                                var item = {};
                                var j= i+1;
                                item.value = j.toString();
                                item.label=j+"、"+_ths.list.answers[i];
                                options.push(item)
                            }
                            _ths.list.options =options;
                            console.log("============",_ths.list)
                            _ths.rightAnswer = _ths.list.answer_arr;
                        });
                        _ths.explainShow = false;
                        _ths.checklist =[];
                        _ths.questionId = _ths.questionId + 1;
                        _ths.nextQuestionId= _ths.nextQuestionId + 1;
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
        console.log('params===',params)
        var _ts =this;
        if(params.chapterDesc){
            _ts.nextQuestionId = 1;
        }
        params.questions =0;
        var nativeRes = [parseInt(params.subject),{'type':params.type,'question':parseInt(params.questions),'chapterDesc':params.chapterDesc,'start':params.start}];
        _ts.explainShow = false;
        _ts.chapterDesc =  params.chapterDesc;

        Ces.Plugins.nativeApi.questions(nativeRes,function(rets){
            if(rets.status == 1){
                if(params.start){
                    _ts.showNext= true;
                    _ts.nextQuestionId = 1;
                    _ts.questionId = 1;
                    params.start =false;
                    params.questions = 0;
                    if(!params.chapterDesc){
                        _ts.totalAnswer = rets.data.length;
                    }else{
                        _ts.totalAnswer = params.totalAnswer;
                    }
                    if(params.type == 3){
                        var num = Math.random()* _ts.totalAnswer + 1;
                        _ts.nextQuestionId = parseInt(num, 10);
                    }
                    nativeRes =[parseInt(params.subject),{'type':params.type,'question':parseInt(params.questions),'chapterDesc':params.chapterDesc,'start':params.start}];

                    console.log("_ts.nativeRes==",nativeRes);
                    Ces.Plugins.nativeApi.questions(nativeRes,function (rets) {
                        _ts.list= rets.data;
                        var options=[];
                        for(var i=0;i<_ts.list.answers.length;i++){
                            var item = {};
                            var j= i+1;
                            item.value = j.toString();
                            item.label=j+"、"+_ts.list.answers[i];
                            options.push(item)
                        }
                        _ts.list.options =options;
                        _ts.rightAnswer = _ts.list.answer_arr;
                        _ts.nextQuestionId= _ts.nextQuestionId + 1;

                    })
                }else{
                    _ts.list= rets.data;
                    var options=[];
                    for(var i=0;i<_ts.list.answers.length;i++){
                        var item = {};
                        var j= i+1;
                        item.value = j.toString();
                        item.label=j+"、"+_ts.list.answers[i];
                        options.push(item)
                    }
                    _ts.list.options =options;
                    _ts.rightAnswer = _ts.list.answer_arr;
                    _ts.nextQuestionId= _ts.nextQuestionId + 1;
                }
            }else{
                Cui.Toast({
                    message:rets.message,
                    position:'bottom'
                })
            }

        })
    }
};