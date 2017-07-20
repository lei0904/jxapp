/**
 * Created by lei on 2017/7/13.
 */
var Ces = require('ces');
var Cui = require('cui');

module.exports = {
    template: __inline('examMock.ftl'),
    data: function () {
        return {
            list:{},
            answer:'',  //选择答案
            checklist:'', //多选题答案
            explainShow:false, //解释
            rightAnswer:[], //正确答案
            questionId:1,  //序列号
            nextQuestionId:1,
            totalAnswer:0,
            showNext:true,//是否显示下一题
            chapterDesc:'', //专项训练
            score:0,  // 模拟分数
            step:1,    //步长
            isDisabled:false  //是否禁用
        }
    },
    methods: {
        nextAnswer:function(){
            var _ths =this;
            var params =JSON.parse(sessionStorage.getItem('topic'));
            params.questions = _ths.nextQuestionId;
            params.start=false;

            var nextParams = [parseInt(params.subject),{'type':params.type,'question':parseInt(params.questions),'chapterDesc':params.chapterDesc,'start':params.start}];

            if(_ths.questionId >= 100){
                if(_ths.answer != _ths.rightAnswer[0]){
                    _ths.explainShow = true;
                }else{
                    _ths.explainShow = false
                }
                _ths.showNext =false;
                Cui.MessageBox('你的分数', _ths.score);
                console.log('score===',_ths.score)
            }else{

                if( (_ths.answer !="" &&  _ths.explainShow)||
                    (_ths.answer != _ths.rightAnswer[0] &&  _ths.explainShow)||
                     _ths.answer == _ths.rightAnswer[0]  ){
                    Ces.Plugins.nativeApi.questions(nextParams,function (rets) {
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
                            _ths.nextQuestionId= _ths.nextQuestionId + _ths.step;

                            if( _ths.answer == _ths.rightAnswer[0] ){
                                _ths.score = _ths.score + 1;
                                console.log('_ths.score==',_ths.score);
                            }
                            _ths.explainShow = false;
                            _ths.answer ="";
                        }else{
                            Cui.Toast({
                                message:rets.message,
                                position:'bottom'
                            })
                        }

                    });
                }else{
                    _ths.explainShow = true;
                }
            }

        }
    },
    mounted(){
        console.log('mounted');
    },
    activated(){
        console.log('activated');
        var params =JSON.parse(sessionStorage.getItem('topic'));
        var _ts =this;

        var nativeRes = [parseInt(params.subject),{'type':params.type,'question':parseInt(params.questions),'chapterDesc':params.chapterDesc,'start':params.start}];
        _ts.explainShow = false;
        _ts.score =0;
        Ces.Plugins.nativeApi.questions(nativeRes,function(rets){
            if(rets.status == 1){
                    _ts.showNext= true;
                    params.start =false;
                    params.questions = 0;
                    _ts.questionId =1;
                     _ts.totalAnswer = rets.data.length;
                    console.log("_ts.totalAnswer==",_ts.totalAnswer);
                    if(params.type == 4){
                        console.log("模拟考试");
                        var seqStart = parseInt((Math.random()* (_ts.totalAnswer / 4) + 1),10);
                        console.log('seqStart===',seqStart);

                            _ts.step = _ts.totalAnswer / 40;
                        var nextMockId = seqStart + _ts.step;

                        if(nextMockId < _ts.totalAnswer ){
                            params.questions = nextMockId;
                        }else{
                            params.questions = Math.floor(nextMockId/_ts.totalAnswer);
                        }
                    }
                    nativeRes =[parseInt(params.subject),{'type':params.type,'question':parseInt(params.questions),'chapterDesc':params.chapterDesc,'start':params.start}];
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
                        _ts.nextQuestionId= _ts.nextQuestionId +_ts.step;
                    })
            }else{
                Cui.Toast({
                    message:rets.message,
                    position:'bottom'
                })
            }

        })
    }
};